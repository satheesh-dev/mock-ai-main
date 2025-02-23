"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "./_componenets/QuestionSection";
import RecordAnswerSection from "./_componenets/RecordAnswerSection";
import { Button } from "../../../_components/button";
import Link from "next/link";
import { Card, CardContent } from "../../../_components/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { Progress } from "../../../_components/progress";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    const jsonMockResp = JSON.parse(result[0]?.jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  const progress =
    ((activeQuestionIndex + 1) / mockInterviewQuestion.length) * 100;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="mb-8">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Mock Interview in Progress
          </h1>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeQuestionIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
           <div>
             <QuestionSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
            />
            <Card className="mt-0">
              <CardContent className="p-6 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    setActiveQuestionIndex(activeQuestionIndex - 1)
                  }
                  disabled={activeQuestionIndex === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {activeQuestionIndex === mockInterviewQuestion.length - 1 ? (
                  <Link
                    href={`/dashboard/interview/${interviewData?.mockId}/feedback`}
                    passHref
                  >
                    <Button>
                      End Interview <Flag className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() =>
                      setActiveQuestionIndex(activeQuestionIndex + 1)
                    }
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
           </div>
          </motion.div>
        </AnimatePresence>
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
    </motion.section>
  );
};

export default StartInterview;
