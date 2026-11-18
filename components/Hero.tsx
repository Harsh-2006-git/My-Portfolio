"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  Code2,
  Database,
  Trophy,
} from "lucide-react";
import SmokeCursor from "@/components/SmokeCursor";

interface HeroProps {
  onExploreProjects?: () => void;
}

export default function Hero({ onExploreProjects }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll Progress Tracking for cinematic parallax & fade animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const footerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* 3D mouse parallax tracking */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNavClick = (anchor: string) => {
    if (anchor === "#projects" && onExploreProjects) {
      onExploreProjects();
      return;
    }
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-[100dvh] lg:h-screen lg:max-h-screen lg:h-[100dvh] bg-[#020408] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-24 pb-8 sm:pb-6 px-5 sm:px-10 lg:px-16 overflow-x-hidden lg:overflow-hidden select-none"
    >
      {/* Interactive Glowing Blue/Cyan Smoke Trail */}
      <SmokeCursor containerRef={heroRef} />

      {/* BACKGROUND ATMOSPHERE: Clean Dark Space with Minimal Subtle Accents */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* Very faint, minimal ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-blue-600/[0.03] blur-[150px]" />
        <div className="hidden md:block absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full bg-blue-500/[0.02] blur-[160px]" />

        {/* Concentric decorative optic rings on the right */}
        <div className="hidden lg:block absolute -top-12 -right-12 w-[650px] h-[650px] rounded-full border border-white/[0.02]" />
        <div className="hidden lg:block absolute -top-24 -right-24 w-[850px] h-[850px] rounded-full border border-white/[0.015]" />
        <div className="hidden lg:block absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full border border-white/[0.02]" />
      </div>

      {/* ========================================================================= */}
      {/* CENTER PORTRAIT: Anchored directly to the ABSOLUTE BOTTOM of the section  */}
      {/* ========================================================================= */}
      <motion.div
        style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
        className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none items-end justify-center"
      >
        {/* Soft, minimal backlight glow behind Harsh */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-blue-600/[0.06] blur-[100px] pointer-events-none" />

        <div
          className="relative w-[380px] lg:w-[460px] xl:w-[500px] h-[78vh] max-h-[780px] flex items-end justify-center"
          style={{
            transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.15}px)`,
          }}
        >
          <Image
            src="/harsh-portrait.png"
            alt="Harsh Manmode"
            fill
            priority
            unoptimized
            sizes="(max-width: 1200px) 460px, 500px"
            className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          />
        </div>
      </motion.div>

      {/* MAIN 3-COLUMN HERO GRID - Reserved channel for the center portrait */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 flex-1 min-h-0 my-auto">
        {/* ========================================================================= */}
        {/* COLUMN 1: LEFT CONTENT (Badge, Stacked Name, Tagline, Buttons, Socials)   */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start w-full"
        >
          {/* Inner Content Block: Keeps the iconic flush-left step shape, balanced on mobile */}
          <div className="flex flex-col items-start text-left w-full max-w-[340px] sm:max-w-md lg:max-w-none">
            {/* Pill Badge: Full-Stack Developer */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0a1226]/85 border border-blue-500/30 text-[11px] font-semibold text-gray-200 shadow-[0_0_15px_rgba(37,99,235,0.2)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
              <span className="tracking-wide font-plusJakartaSans">Full-Stack Developer</span>
            </div>

            {/* Stacked Step-Style Headline: HARSH + MANMODE flush-left with each other */}
            <h1
              className="mt-3 sm:mt-4 flex flex-col items-start uppercase select-none tracking-tight leading-[0.88]"
              style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif', fontWeight: 900 }}
            >
              <span className="text-[44px] sm:text-6xl md:text-7xl xl:text-[98px] tracking-tight text-white">
                HARSH
              </span>
              <span className="text-[36px] sm:text-5xl md:text-7xl xl:text-[80px] tracking-tight text-[#2563EB] mt-0.5 sm:mt-1">
                MANMODE
              </span>
            </h1>

            {/* Tagline with Left Blue Border Accent */}
            <div className="mt-4 sm:mt-5 pl-4 border-l-2 border-blue-500">
              <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed font-plusJakartaSans">
                Crafting robust digital products,
                <br />
                from <span className="text-blue-400 font-bold">code to scale</span>.
              </p>
            </div>

            {/* CTA Buttons Row */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#projects");
                }}
                className="flex items-center gap-2.5 h-10 sm:h-11 px-6 sm:px-7 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <span>View Projects</span>
                <span className="text-sm font-black transition-transform group-hover:translate-x-1">→</span>
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#about");
                }}
                className="flex items-center h-10 sm:h-11 px-6 sm:px-7 bg-white/[0.04] hover:bg-white/[0.09] text-white/90 border border-white/15 text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:border-blue-400/40 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap backdrop-blur-md"
              >
                About Me
              </a>
            </div>

            {/* Social Links Row (Desktop only - under CTA buttons) */}
            <div className="hidden lg:flex mt-5 sm:mt-6 items-center gap-2.5">
              <a
                href="https://github.com/Harsh-2006-git"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-gray-400 hover:scale-105"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/harsh-manmode-2a0b91325"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all text-gray-400 hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:harshmanmode79@gmail.com"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#ea4335] hover:text-white hover:border-[#ea4335] transition-all text-gray-400 hover:scale-105"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+918305721431"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#34a853] hover:text-white hover:border-[#34a853] transition-all text-gray-400 hover:scale-105"
                title="Call Harsh"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* COLUMN 2: CENTER CHANNEL (Reserved space on desktop, image on mobile)     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 h-full relative w-full flex items-end justify-center pointer-events-none">
          {/* Mobile-only portrait fallback with parallax */}
          <motion.div
            style={{ y: portraitY, opacity: portraitOpacity }}
            className="lg:hidden relative w-full max-w-[280px] sm:max-w-[340px] h-[360px] sm:h-[440px] flex items-end justify-center mt-6 mx-auto"
          >
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full bg-blue-600/[0.08] blur-[70px] pointer-events-none" />
            <Image
              src="/harsh-portrait.png"
              alt="Harsh Manmode"
              fill
              priority
              unoptimized
              className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
            />
          </motion.div>

          {/* Mobile Vertical Social Icons (Proper Right Corner of the screen, beside portrait) */}
          <motion.div
            style={{ y: portraitY, opacity: portraitOpacity }}
            className="lg:hidden absolute right-0 bottom-4 sm:bottom-6 z-30 flex flex-col items-center gap-3 pointer-events-auto"
          >
            <a
              href="https://github.com/Harsh-2006-git"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#0a1226]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-blue-400/50 hover:bg-[#111c38] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.6)] active:scale-90 backdrop-blur-md"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/harsh-manmode-2a0b91325"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#0a1226]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#111c38] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.6)] active:scale-90 backdrop-blur-md"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:harshmanmode79@gmail.com"
              className="w-9 h-9 rounded-full bg-[#0a1226]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#ea4335] hover:border-[#ea4335]/50 hover:bg-[#111c38] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.6)] active:scale-90 backdrop-blur-md"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+918305721431"
              className="w-9 h-9 rounded-full bg-[#0a1226]/90 border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#34a853] hover:border-[#34a853]/50 hover:bg-[#111c38] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.6)] active:scale-90 backdrop-blur-md"
              title="Call Harsh"
            >
              <Phone className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 3: RIGHT CARDS (Full Stack Apps, Backend & APIs, Hackathon Winner)  */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: cardsY, opacity: cardsOpacity }}
          className="lg:col-span-3 flex flex-col justify-center gap-3.5 w-full mt-8 lg:mt-0"
        >
          {/* Card 1: Full Stack Apps */}
          <div
            onClick={() => handleNavClick("#skills")}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#090e1d]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#0c1429]/95 transition-all duration-300 flex items-center gap-3.5 cursor-pointer group shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.2)]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors font-plusJakartaSans">
                Full Stack Apps
              </h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-normal mt-0.5 font-plusJakartaSans">
                React · Next.js · Node · MongoDB
              </p>
            </div>
          </div>

          {/* Card 2: Backend & APIs */}
          <div
            onClick={() => handleNavClick("#skills")}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#090e1d]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#0c1429]/95 transition-all duration-300 flex items-center gap-3.5 cursor-pointer group shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.2)]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors font-plusJakartaSans">
                Backend & APIs
              </h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-normal mt-0.5 font-plusJakartaSans">
                Scalable Systems · Fast REST & DBs
              </p>
            </div>
          </div>

          {/* Card 3: Hackathon Winner */}
          <div
            onClick={() => handleNavClick("#achievements")}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#090e1d]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#0c1429]/95 transition-all duration-300 flex items-center gap-3.5 cursor-pointer group shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.2)]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors font-plusJakartaSans">
                Hackathon Winner
              </h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-normal mt-0.5 font-plusJakartaSans">
                HackSetu 1.0 Winner · MITS Gwalior
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FOOTER ROW: Animated Mouse Scroll Indicator */}
      <motion.div
        style={{ opacity: footerOpacity }}
        className="relative z-30 w-full max-w-[1440px] mx-auto py-1 sm:py-2 flex items-center justify-start shrink-0 mt-8 lg:mt-0"
      >
        <a
          href="#skills"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#skills");
          }}
          className="inline-flex items-center gap-3 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer group select-none"
        >
          {/* Animated Interactive Mouse Pill */}
          <div className="w-[18px] h-7 rounded-full border border-white/25 group-hover:border-blue-400/60 flex items-start justify-center p-1 bg-white/[0.03] backdrop-blur-sm shadow-[0_0_12px_rgba(37,99,235,0.2)] transition-colors">
            <motion.div
              animate={{ y: [0, 9, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
            />
          </div>
          <span className="text-[11px] font-medium tracking-widest uppercase pl-2 border-l border-white/10 group-hover:border-blue-500/60 transition-colors">
            Scroll to explore
          </span>
        </a>
      </motion.div>
    </section>
  );
}
