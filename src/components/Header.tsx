"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

const menuItems = [
  {
    title: "Features",
    items: ["AI Responses", "Automation", "Analytics", "Integration"],
  },
  {
    title: "Pricing",
    items: ["Starter", "Pro", "Enterprise"],
  },
  {
    title: "About",
    items: ["Our Story", "Team", "Careers", "Press"],
  },
];

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <motion.span
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                IMA
              </motion.span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </motion.div>
                  <AnimatePresence>
                    {hoveredItem === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                      >
                        <div className="py-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem}
                              href={`#${subItem
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="mr-2">
                <Link href="/sign-in">Log In</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                Sign up
              </Button>
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="ml-2"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
