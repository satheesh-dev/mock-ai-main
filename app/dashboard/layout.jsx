"use client";

import React, { useState, useEffect } from "react";
import Header from "./_components/Header";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "../dashboard/_components/scroll-area";

const DashboardLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentHeight, setContentHeight] = useState("auto");

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const availableHeight = windowHeight - headerHeight - 40; // 40px for padding
      setContentHeight(`${availableHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={{ minHeight: contentHeight }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-full rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">{children}</div>
          </ScrollArea>
        )}
      </motion.div>
    </section>
  );
};

export default DashboardLayout;
