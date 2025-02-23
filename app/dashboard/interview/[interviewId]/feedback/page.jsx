"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  ChevronsUpDown,
  Star,
  Check,
  X,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../dashboard/_components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../dashboard/_components/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../dashboard/_components/accordion";
import { Progress } from "../../../../dashboard/_components/progress";
import { Badge } from "../../../../dashboard/_components/badge";
import confetti from "canvas-confetti";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    GetFeedback();
  }, []);

  useEffect(() => {
    if (averageRating > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [averageRating]);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);

    if (result.length > 0) {
      const totalRating = result.reduce((sum, item) => sum + item.rating, 0);
      const avgRating = totalRating / result.length;
      const roundedAvgRating = Math.round(avgRating * 2) / 2;
      setAverageRating(roundedAvgRating);
    }
  };

  const getColorForRating = (rating) => {
    if (rating >= 8) return "text-green-500";
    if (rating >= 6) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {feedbackList?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold text-gray-500 mb-4">
              No feedback or Interview Found
            </h2>
            <Button onClick={() => router.replace("/dashboard")}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-8 bg-gradient-to-r from-green-400 to-blue-500">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-white text-center">
                Congratulations!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              <h2 className="text-2xl mb-4">Here's Your Interview Feedback</h2>
              <div className="flex justify-center items-center space-x-2 mb-4">
                <Star className="w-8 h-8 fill-current text-yellow-300" />
                <span className="text-3xl font-bold">
                  {averageRating.toFixed(1)}/10
                </span>
              </div>
              <p className="text-lg">Overall Interview Rating</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Detailed Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {feedbackList.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between items-center w-full pr-4">
                        <span className="text-left">{item.question}</span>
                        <Badge
                          variant="outline"
                          className={getColorForRating(item.rating)}
                        >
                          {item.rating}/10
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h3 className="font-semibold flex items-center text-red-700 mb-2">
                            <X className="w-4 h-4 mr-2" /> Your Answer
                          </h3>
                          <p className="text-sm text-red-900">{item.userAns}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="font-semibold flex items-center text-green-700 mb-2">
                            <Check className="w-4 h-4 mr-2" /> Correct Answer
                          </h3>
                          <p className="text-sm text-green-900">
                            {item.correctAns}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold flex items-center text-blue-700 mb-2">
                            <MessageCircle className="w-4 h-4 mr-2" /> Feedback
                          </h3>
                          <p className="text-sm text-blue-900">
                            {item.feedback}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.replace("/dashboard")}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                <ThumbsUp className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </motion.div>
          </div>
        </>
      )}
    </motion.section>
  );
};

export default Feedback;
