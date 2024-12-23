"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description:
      "Perfect for small businesses just getting started with Instagram marketing.",
    features: [
      "Up to 1,000 followers",
      "Basic AI responses",
      "Comment automation",
      "24/7 support",
    ],
  },
  {
    name: "Pro",
    price: "$79",
    description:
      "Ideal for growing businesses looking to expand their Instagram presence.",
    features: [
      "Up to 10,000 followers",
      "Advanced AI responses",
      "Full automation suite",
      "Analytics dashboard",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large businesses with complex Instagram marketing needs.",
    features: [
      "Unlimited followers",
      "Custom AI model training",
      "Advanced analytics",
      "API access",
      "Dedicated account manager",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Choose the plan that&apos;s right for your business
          </p>
        </div>
        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                key={plan.name}
                className="bg-white/10 backdrop-blur-md border-0 shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {plan.price}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
