"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCad";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import { Button } from "../../dashboard/_components/button";
import Link from "next/link";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      setInterviewList(result || []);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-2xl sm:text-4xl">
            Your Mock Interviews
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        ) : interviewList.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(100vh-200px)] overflow-y-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {interviewList.map((interview, index) => (
              <motion.div key={index} variants={itemVariants}>
                <InterviewItemCard interview={interview} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mt-2 text-xl font-medium text-gray-900">
              No interviews yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new mock interview.
            </p>
            <div className="mt-6">
              <Link href="/dashboard/create-interview" passHref>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <Plus className="mr-2 h-5 w-5" /> Create Your First Interview
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InterviewList;
