"use client";

import React from "react";
import Header from "../dashboard/_components/Header";
import { motion } from "framer-motion";
import { Button } from "../dashboard/_components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../dashboard/_components/card";
import {
  Brain,
  Cpu,
  Users,
  BarChart,
  Award,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl font-bold text-center text-purple-800 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About AI Mock Interview
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
          {...fadeInUp}
        >
          <div>
            <h2 className="text-3xl font-semibold text-purple-700 mb-4">
              Revolutionizing Interview Preparation
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              AI Mock Interview is at the forefront of interview preparation
              technology. We combine cutting-edge artificial intelligence with
              years of recruitment expertise to provide you with the most
              realistic and effective interview practice experience.
            </p>
            <Button asChild>
              <Link href="/dashboard">
                Try AI Interview Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        
        </motion.div>

        <motion.div className="mb-16" {...fadeInUp}>
          <h2 className="text-3xl font-semibold text-purple-700 text-center mb-8">
            Our Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Questions",
                description:
                  "Tailored questions based on your profile and job requirements",
              },
              {
                icon: Users,
                title: "Realistic Simulations",
                description: "Experience true-to-life interview scenarios",
              },
              {
                icon: BarChart,
                title: "Detailed Analytics",
                description: "Comprehensive feedback and performance insights",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-purple-700">
                    <feature.icon className="mr-2 h-6 w-6" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div className="mb-16" {...fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-purple-700">
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {[
                  "Create your profile and select your target job",
                  "Choose from various interview types (behavioral, technical, etc.)",
                  "Engage in a realistic AI-driven interview session",
                  "Receive instant feedback and detailed performance analysis",
                  "Practice repeatedly to refine your skills and boost confidence",
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold mr-3">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="mb-16" {...fadeInUp}>
          <h2 className="text-3xl font-semibold text-purple-700 text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Cpu,
                title: "Advanced AI Technology",
                description:
                  "Our AI adapts to your responses, providing a dynamic interview experience",
              },
              {
                icon: Award,
                title: "Industry Expertise",
                description:
                  "Developed in collaboration with top recruiters and industry professionals",
              },
              {
                icon: Zap,
                title: "Continuous Improvement",
                description:
                  "Regular updates to stay current with the latest interview trends and techniques",
              },
              {
                icon: CheckCircle,
                title: "Proven Results",
                description:
                  "Thousands of users have successfully landed their dream jobs using our platform",
              },
            ].map((reason, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-purple-700">
                    <reason.icon className="mr-2 h-6 w-6" />
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-purple-700 mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Start Your AI Interview Journey{" "}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
