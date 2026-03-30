"use client";

import React from "react";
import { Linkedin, Github, Mail, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28 py-12 md:py-24 min-h-[75vh]">
      <div className="relative shrink-0 w-full md:w-auto flex justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[200px] md:hidden bg-[#0051FF] rounded-[48px] blur-[60px] opacity-[0.08]" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[340px] bg-[#0051FF] rounded-[48px] blur-[110px] opacity-[0.2]" />

        <div className="relative w-[180px] h-[260px] md:w-[300px] md:h-[420px] rounded-[48px] overflow-hidden border border-white/10 bg-white/5 shadow-3xl group transition-all duration-500 hover:border-blue-500/40 transform hover:-translate-y-2">
          <img src="/Harsh-profile.jpeg" alt="Harsh Manmode" className="w-full h-full object-cover relative pointer-events-none group-hover:scale-105 transition-transform duration-700" />
        </div>
      </div>

      <div className="space-y-6 md:space-y-8 text-center md:text-left flex-1 max-w-xl">
        <div className="space-y-2 md:space-y-4">
          <p className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] mb-1 md:mb-2 text-glow-blue">Hii I'm</p>
          <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-none">Harsh Manmode.</h1>
          <p className="text-sm md:text-lg text-gray-400 leading-relaxed font-bold font-plusJakartaSans opacity-90 max-w-xl">
            I’m a software developer dedicated to building clean, fast, and reliable digital products that solve real-world problems.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-8 mt-4 md:mt-8">
          <div className="flex flex-row items-center gap-2 xs:gap-3 bg-white/5 p-2 rounded-full border border-white/5 shadow-2xl backdrop-blur-lg">
            <a href="#projects" className="px-5 py-2.5 md:px-8 md:py-3.5 bg-white text-black font-black uppercase text-[10px] md:text-[11px] tracking-wider rounded-full hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap">Projects</a>
            <a href="#about" className="px-5 py-2.5 md:px-8 md:py-3.5 bg-blue-500/10 border border-blue-500/20 text-white font-black uppercase text-[10px] md:text-[11px] tracking-wider rounded-full hover:bg-white hover:text-black transition-all whitespace-nowrap">About</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://linkedin.com/in/harsh-manmode-2a0b91325" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] transition-all group">
              <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a href="https://github.com/Harsh-2006-git" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:border-white transition-all group">
              <Github className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-black transition-colors" />
            </a>
            <a href="mailto:harshmanmode79@gmail.com" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#ea4335] hover:border-[#ea4335] transition-all group">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#34a853] hover:border-[#34a853] transition-all group">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
