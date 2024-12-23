"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Zap } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
      <div className="lg:grid lg:grid-cols-12 lg:gap-4 items-center">
        <motion.div
          className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Automate your</span>{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 xl:inline">
              Instagram marketing
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            IMA is a conversational marketing automation platform designed to
            help businesses effortlessly engage their audience on Instagram.
            Turn engagement into opportunity with AI-driven responses and
            seamless automations.
          </p>
          <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                Get Started
              </Button>
            </motion.div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              No credit card required. Start your free trial today.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
            <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                className="w-full"
                src="https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="IMA dashboard preview"
                width={300}
                height={300}
              />
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1517153192978-b2e379ac0710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="IMA logo"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:mt-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {[
          {
            icon: Instagram,
            title: "Instagram Integration",
            description:
              "Seamlessly connect with your Instagram account for effortless management and automation.",
          },
          {
            icon: MessageCircle,
            title: "AI-Powered Responses",
            description:
              "Engage your audience with intelligent automated replies, enhancing customer interactions.",
          },
          {
            icon: Zap,
            title: "Instant Automations",
            description:
              "Set up triggers for likes, comments, and more to streamline your Instagram marketing efforts.",
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className="bg-white/100 dark:bg-gray-700/50 backdrop-blur-sm border-0 shadow-xl"
          >
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
