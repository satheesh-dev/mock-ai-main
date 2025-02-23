"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../../dashboard/_components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../dashboard/_components/card";
import { Badge } from "../../dashboard/_components/badge";
import { Briefcase, Calendar, Clock, MessageSquare, Play } from "lucide-react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <CardTitle className="text-lg font-bold text-white truncate">
            {interview?.jobPosition}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
              <span>{interview?.jobExperience} Years of Experience</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              <span>Created: {interview.createdAt}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              <span>Status: </span>
              <Badge
                variant="outline"
                className="ml-2 bg-blue-100 text-blue-800 border-blue-300"
              >
                {interview.status || "Pending"}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
          <Button
            variant="outline"
            className="flex-1 mr-2 bg-white hover:bg-blue-50 text-blue-600 border-blue-300 hover:border-blue-400 transition-colors duration-300"
            onClick={onFeedback}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Feedback
          </Button>
          <Button
            className="flex-1 ml-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            onClick={onStart}
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default InterviewItemCard;
