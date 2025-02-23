"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAiModel";
import { UserAnswer } from "../../../../../../utils/schema";
import { db } from "../../../../../../utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../../dashboard/_components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../dashboard/_components/card";
import { Progress } from "../../../../../dashboard/_components/progress";
import { Badge } from "../../../../../dashboard/_components/badge";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 5 && !loading) {
      UpdateUserAnswer();
    }
    if (userAnswer?.length < 0) {
      setLoading(false);
      toast.error("Error while saving your answer. Please record again.");
    }
  }, [isRecording, userAnswer, loading]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
      setProgress(0);
    }
  };

  const UpdateUserAnswer = async () => {
    if (loading) return;
    setLoading(true);

    console.log(userAnswer);

    const feedbackPrompt =
      "Question: " +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer: " +
      userAnswer +
      '. Provide a rating and feedback in JSON format only, without any additional text. Example: { "rating": 1, "feedback": "..." }';

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResponse);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast.success("Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      toast.error("Error while saving answer. Please try again.");
    } finally {
      setResults([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRecording) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(oldProgress + 1, 100);
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [isRecording]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center justify-between">
          Record Your Answer
          <Badge variant={isRecording ? "destructive" : "secondary"}>
            {isRecording ? "Recording" : "Ready"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-1">
          <motion.div
            className="absolute inset-0 bg-black opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: isRecording ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <Webcam
            mirrored={true}
            className="w-full h-64 object-cover rounded-lg"
          />
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0 }}
            animate={{ scale: isRecording ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Badge variant="destructive" className="animate-pulse">
              <Camera className="w-4 h-4 mr-1" /> Live
            </Badge>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Progress value={progress} className="w-full" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            disabled={loading}
            variant={isRecording ? "destructive" : "default"}
            className="w-full py-6 text-lg font-semibold"
            onClick={StartStopRecording}
          >
            {isRecording ? (
              <span className="flex items-center justify-center gap-2">
                <StopCircle className="w-6 h-6" />
                Stop Recording
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Mic className="w-6 h-6" />
                Start Recording
              </span>
            )}
          </Button>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-primary">Processing your answer...</span>
          </div>
        )}

        {error && <p className="text-destructive text-center">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default RecordAnswerSection;
