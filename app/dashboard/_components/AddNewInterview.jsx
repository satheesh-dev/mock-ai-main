"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { chatSession } from "../../../utils/GeminiAiModel";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { LoaderCircle, Briefcase, FileText, Clock } from "lucide-react";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format.`;

      const result = await chatSession.sendMessage(InputPrompt);

      const MockjsonResp = await result.response.text();

      const cleanedResp = MockjsonResp.replace("```json", "").replace(
        "```",
        ""
      );
      const parsedResp = JSON.parse(cleanedResp);
      console.log(parsedResp);

      setJsonResponse(parsedResp);

      // Insert into the database
      const insertedResp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: cleanedResp,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          jobPosition: jobPosition,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted Id: ", insertedResp);
      if (insertedResp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + insertedResp[0]?.mockId);
      }
    } catch (error) {
      console.error("Error in AI response or DB operation:", error);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <section className="p-4">
      <motion.div
        className="p-10 border rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2 className="text-2xl font-bold text-center text-white">
          + Create New Interview
        </h2>
      </motion.div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl bg-gradient-to-br from-gray-50 to-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800 mb-4">
              Prepare for Your Dream Job
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Tell us about the position you're applying for
                  </h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-500" />
                      Job Role/Job Position
                    </label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-500" />
                      Job Description/ Tech Stack
                    </label>
                    <Textarea
                      placeholder="Ex. ReactJs, NextJs, NodeJs, ThreeJs, etc."
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      Years of Experience
                    </label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200"
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-200"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin" />
                        <span>Generating from AI</span>
                      </div>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AddNewInterview;
