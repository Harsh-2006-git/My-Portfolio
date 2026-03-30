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
    <header className={`fixed top-0 left-0 w-full h-[70px] md:h-[90px] z-[500] flex items-center justify-between px-6 md:px-20 transition-all duration-300 ${scrolled ? "bg-[#03000A]/90 backdrop-blur-md" : "bg-transparent"}`}>
      <Link href="/" className="flex items-center gap-3 shrink-0 cursor-pointer group">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-blue-500/30 group-hover:border-blue-400 group-hover:scale-110 shadow-[0_0_12px_rgba(0,163,255,0.3)] transition-all ring-1 ring-blue-500/20">
          <img src="/logo3.png" alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <p className="text-lg md:text-2xl font-black tracking-widest block font-cinzel bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,163,255,0.8)] group-hover:drop-shadow-[0_0_20px_#00A3FF] transition-all">Harsh</p>
      </Link>

      <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1 p-2 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] transition-all">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] text-gray-300 hover:text-white hover:bg-white/10 transition-all relative group font-plusJakartaSans">
            <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,163,255,0.5)] transition-all">{link.name}</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 transition-all group-hover:w-[60%] shadow-[0_0_8px_#00A3FF]"></span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-11 h-11 flex items-center justify-center bg-white/5 rounded-full border border-white/10 text-white z-[1200] shadow-[0_0_12px_rgba(0,163,255,0.3)] transition-all active:scale-95"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
