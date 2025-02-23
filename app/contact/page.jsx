"use client";

import React, { useState } from "react";
import Header from "../dashboard/_components/Header";
import { motion } from "framer-motion";
import { Button } from "../dashboard/_components/button";
import { Input } from "../dashboard/_components/input";
import { Textarea } from "../dashboard/_components/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../dashboard/_components/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../dashboard/_components/accordion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl font-bold text-center text-blue-800 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div {...fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-blue-700">
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-blue-700">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-600" />
                  <span>contact@aimockinterview.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-600" />
                  <span>123 AI Street, Tech City, TC 12345</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-blue-700">
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Youtube className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-700">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How does AI Mock Interview work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our AI-powered platform simulates real interview scenarios,
                    providing personalized questions based on your profile and
                    the job you're applying for. It then analyzes your responses
                    and provides detailed feedback to help you improve.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is my data secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we take data privacy very seriously. All your
                    information and interview responses are encrypted and stored
                    securely. We never share your personal data with third
                    parties.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Can I practice for specific job roles?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our platform offers customized interview simulations for a
                    wide range of job roles and industries. You can select your
                    desired position, and the AI will tailor the questions
                    accordingly.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-700">
                Visit Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.907823018829!2d78.14619491534897!3d11.661799791380368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8575c01b24069%3A0x68cd44e5f44ea54e!2s3%20Roads%2C%20Salem%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sus!4v1629794970337!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MessageCircle className="mr-2 h-5 w-5" /> Start Chat Support
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Contact;
