"use client";

import React, { useState } from "react";
import { Lightbulb, Volume2, Mic } from "lucide-react";
import { Button } from "../../../../_components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../_components/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../_components/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "../../../../_components/progress";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [isRecording, setIsRecording] = useState(false);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support this feature");
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add actual recording logic here
  };

  return (
    <AnimatePresence>
      {mockInterviewQuestion && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">
                Interview Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                {mockInterviewQuestion.map((_, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={
                        activeQuestionIndex === index ? "default" : "outline"
                      }
                      className="w-full"
                    >
                      Q{index + 1}
                    </Button>
                  </motion.div>
                ))}
              </div>
              <Progress
                value={
                  ((activeQuestionIndex + 1) / mockInterviewQuestion.length) *
                  100
                }
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center justify-between">
                <span>Current Question</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    textToSpeech(
                      mockInterviewQuestion[activeQuestionIndex]?.question
                    )
                  }
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                {mockInterviewQuestion[activeQuestionIndex]?.question}
              </p>
             
            </CardContent>
          </Card>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Note:</AlertTitle>
            <AlertDescription>
              Click on "Start Recording" when you're ready to answer the
              question. At the end of the interview, we'll provide feedback
              along with the correct answer for each question and your recorded
              response for comparison.
            </AlertDescription>
          </Alert>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default QuestionSection;
