"use client";

import React from "react";
import { Github, Linkedin, Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#03000A] border-t border-white/5 pt-8 md:pt-16 pb-6 md:pb-10">
      <div className="max-w-7xl mx-auto px-6 space-y-6 md:space-y-12">
        {/* Top Row: Branding and Socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 md:gap-12 text-center sm:text-left">
          <div className="space-y-4">
            <h4 className="text-xl md:text-3xl font-black font-cinzel text-white leading-none tracking-tight">Harsh Manmode</h4>
            <p className="text-blue-500 text-[9px] md:text-xs font-black uppercase tracking-[0.4em] opacity-90 drop-shadow-[0_0_10px_rgba(0,163,255,0.6)] text-glow-blue leading-relaxed">Building clean, efficient, and user-friendly digital products.</p>
            <p className="hidden md:block text-gray-500 text-xs md:text-sm max-w-sm leading-relaxed font-bold opacity-60">
              Dedicated to building high-performance products that drive real impact and growth.
            </p>
          </div>

          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center sm:justify-end">
            <a href="https://github.com/Harsh-2006-git" target="_blank" className="w-10 h-10 md:w-14 md:h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 transition-all group hover:bg-blue-600/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(0,163,255,0.15)] hover:-translate-y-1">
              <Github className="w-4 h-4 md:w-6 md:h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <a href="https://linkedin.com/in/harsh-manmode-2a0b91325" target="_blank" className="w-10 h-10 md:w-14 md:h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 transition-all group hover:bg-blue-600/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(0,163,255,0.15)] hover:-translate-y-1">
              <Linkedin className="w-4 h-4 md:w-6 md:h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <a href="mailto:harshmanmode79@gmail.com" className="w-10 h-10 md:w-14 md:h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 transition-all group hover:bg-blue-600/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(0,163,255,0.15)] hover:-translate-y-1">
              <Mail className="w-4 h-4 md:w-6 md:h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 transition-all group hover:bg-blue-600/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(0,163,255,0.15)] hover:-translate-y-1">
              <Phone className="w-4 h-4 md:w-6 md:h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/10" />

        {/* Bottom Bar: Heart signature */}
        <div className="flex justify-center items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 gap-2">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-red-500 animate-pulse" />
          <span>by Harsh Manmode</span>
        </div>
      </div>
    </footer>
  );
}
