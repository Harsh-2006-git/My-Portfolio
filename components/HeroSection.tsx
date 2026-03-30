"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const roles = ["Full Stack Developer", "MERN Developer", "Backend Engineer", "UI Builder"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-black -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[120px] rounded-full animate-pulse transition-all duration-1000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/30 blur-[120px] rounded-full animate-pulse transition-all duration-1000 delay-500" />
      </div>

      <div className="z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-purple-400 font-medium mb-4 tracking-widest uppercase text-sm"
        >
          Welcome to my portfolio
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-md"
        >
          Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Harsh</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-12 flex items-center justify-center"
        >
          <span className="text-2xl md:text-4xltext-gray-300 font-light">
            I am a <span className="font-bold text-white transition-all duration-300">{roles[currentRole]}</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
        >
          Building scalable, modern, and beautiful web applications. From pixel-perfect frontends to robust backend architectures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
          >
            Explore My Work
          </a>
          <a
            href="mailto:contact@example.com"
            className="px-8 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium hover:scale-105 transition-all flex items-center justify-center"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-sm tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="text-gray-500 w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
