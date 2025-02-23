"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import Webcam from "react-webcam";
import { eq } from "drizzle-orm";
import {
  Lightbulb,
  WebcamIcon,
  Briefcase,
  FileText,
  Clock,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../dashboard/_components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../dashboard/_components/card";
import { Badge } from "../../../dashboard/_components/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../dashboard/_components/alert";
import { Skeleton } from "../../../dashboard/_components/skeleton";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    if (result && result.length > 0) {
      setInterviewData(result[0]);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Let's Get Started
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg opacity-90">
            Prepare yourself for an immersive mock interview experience.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {interviewData ? (
            <motion.div
              key="interview-data"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary">
                    Interview Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="text-primary" />
                    <span className="font-medium">Job Position:</span>
                    <Badge variant="secondary">
                      {interviewData.jobPosition}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="text-primary" />
                    <span className="font-medium">Tech Stack:</span>
                    <span className="text-sm">{interviewData.jobDesc}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="text-primary" />
                    <span className="font-medium">Experience Required:</span>
                    <span>{interviewData.jobExperience} years</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </CardContent>
            </Card>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {webCamEnabled ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Webcam
                    onUserMedia={() => setWebCamEnabled(true)}
                    onUserMediaError={() => setWebCamEnabled(false)}
                    mirrored={true}
                    className="w-full h-[300px] object-cover"
                  />
                </motion.div>
              ) : (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 flex flex-col items-center justify-center h-[300px]">
                  <WebcamIcon className="h-24 w-24 text-white mb-4" />
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => setWebCamEnabled(true)}
                  >
                    Enable Webcam and Microphone
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Important Information</AlertTitle>
            <AlertDescription>
              To proceed with the mock interview, please enable access to your
              webcam and microphone. We never record your video. You can disable
              webcam access at any time. Turn on the webcam for a more realistic
              interview experience.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <motion.div
        className="flex justify-end mt-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={`/dashboard/interview/${params.interviewId}/start`}
          passHref
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
          >
            Start Interview
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Interview;
