"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Github } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 w-full h-[62px] sm:h-[72px] lg:h-[96px] z-[500] flex items-center justify-between px-4 sm:px-8 lg:px-16 transition-all duration-300 border-b border-white/10 lg:border-b-0 ${scrolled ? "bg-[#020408]/95 backdrop-blur-md lg:border-b lg:border-white/5" : "bg-[#020408]/80 backdrop-blur-md lg:bg-transparent"}`}>
      <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 cursor-pointer group">
        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border border-blue-500/30 group-hover:border-blue-400 group-hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all ring-1 ring-blue-500/20 bg-blue-950/40 flex items-center justify-center">
          <img src="/logo3.png" alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <p className="text-lg sm:text-xl lg:text-[26px] font-bold tracking-tight text-white flex items-center font-plusJakartaSans">
          Harsh<span className="text-blue-500">.</span>
        </p>
      </Link>

      <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1.5 px-4 py-2 bg-[#0b1120]/80 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all relative ${
              link.name === "Home" ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }`}
          >
            <span>{link.name}</span>
            {link.name === "Home" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2.5px] bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></span>
            )}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Mobile Small "Let's Connect" Button */}
        <Link
          href="#contact"
          className="lg:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white border border-blue-500/30 bg-blue-600/15 hover:bg-blue-600/25 active:scale-95 transition-all shadow-[0_0_10px_rgba(37,99,235,0.2)]"
        >
          <span>Connect</span>
          <span className="text-blue-400 text-xs">↗</span>
        </Link>

        {/* Desktop "Let's Connect" Button */}
        <Link
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-blue-400/50 transition-all duration-300 shadow-[0_0_18px_rgba(37,99,235,0.2)] group"
        >
          <span>Let's Connect</span>
          <span className="text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sm">↗</span>
        </Link>

        {/* Mobile Compact Hamburger Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white z-[1200] shadow-[0_0_10px_rgba(0,163,255,0.25)] transition-all active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#000000] z-[1000] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%", opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 1 }}
              transition={{ type: "tween", duration: 0.35, ease: "circOut" }}
              className="fixed top-0 right-0 w-[80%] sm:w-[50%] h-full z-[1100] lg:hidden flex flex-col p-10 pt-28 border-l border-white/10 shadow-[-50px_0_100px_black]"
              style={{ backgroundColor: "#030014", opacity: 1 }}
            >
              <nav className="flex flex-col gap-6 relative z-10">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-black uppercase tracking-[0.2em] font-cinzel text-gray-400 hover:text-blue-400 transition-all flex items-center gap-5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/20 group-hover:bg-blue-400 transition-all" />
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-6 pb-10 relative z-10 border-t border-white/5 pt-10">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-1">Connect with me</p>
                <div className="flex gap-5">
                  <a href="https://github.com/Harsh-2006-git" target="_blank" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/40 transition-all group shadow-2xl">
                    <Github className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                  </a>
                  <a href="https://linkedin.com/in/harsh-manmode-2a0b91325" target="_blank" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/40 transition-all group shadow-2xl">
                    <Linkedin className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
