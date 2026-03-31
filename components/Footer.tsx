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

          <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center sm:justify-end">
            <a href="https://github.com/Harsh-2006-git" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/20 transition-all group shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white hover:shadow-[0_0_35px_white] hover:scale-110">
              <Github className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-black transition-colors" />
            </a>
            <a href="https://linkedin.com/in/harsh-manmode-2a0b91325" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-blue-500/40 flex items-center justify-center bg-[#0077b5]/20 transition-all group shadow-[0_0_20px_rgba(0,119,181,0.5)] hover:bg-[#0077b5] hover:shadow-[0_0_40px_#0077b5] hover:scale-110">
              <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-[#0077b5] group-hover:text-white transition-colors" />
            </a>
            <a href="mailto:harshmanmode79@gmail.com" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-red-500/40 flex items-center justify-center bg-[#ea4335]/20 transition-all group shadow-[0_0_20px_rgba(234,67,53,0.5)] hover:bg-[#ea4335] hover:shadow-[0_0_40px_#ea4335] hover:scale-110">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#ea4335] group-hover:text-white transition-colors" />
            </a>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-green-500/40 flex items-center justify-center bg-[#34a853]/20 transition-all group shadow-[0_0_20px_rgba(52,168,83,0.5)] hover:bg-[#34a853] hover:shadow-[0_0_40px_#34a853] hover:scale-110">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#34a853] group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/10" />

        {/* Bottom Bar: Heart signature */}
        <div className="flex justify-center items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 gap-2">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-red-500 animate-pulse" />
          <span>by Harsh Manmmode</span>
        </div>
      </div>
    </footer>
  );
}
