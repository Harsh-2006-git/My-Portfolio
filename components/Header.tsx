"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Github, Mail, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { number: "01", name: "Home", href: "/" },
  { number: "02", name: "About", href: "/about" },
  { number: "03", name: "Projects", href: "/projects" },
  { number: "04", name: "Achievements", href: "/achievements" },
  { number: "05", name: "Certificates", href: "/certificates" },
  { number: "06", name: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[70px] sm:h-[78px] lg:h-[96px] z-[500] flex items-center justify-between px-5 sm:px-8 lg:px-16 transition-all duration-300 border-b border-white/10 lg:border-b-0 ${
          scrolled
            ? "bg-[#020408]/95 backdrop-blur-md lg:border-b lg:border-white/5"
            : "bg-[#020408]/80 backdrop-blur-md lg:bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 cursor-pointer group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border border-blue-500/30 group-hover:border-blue-400 group-hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all ring-1 ring-blue-500/20 bg-blue-950/40 flex items-center justify-center">
            <img src="/logo3.png" alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <p className="text-[19px] sm:text-xl lg:text-[26px] font-bold tracking-tight text-white flex items-center font-plusJakartaSans">
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

        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Mobile Small "Connect" Button */}
          <Link
            href="#contact"
            className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold text-white border border-blue-500/30 bg-blue-600/15 hover:bg-blue-600/25 active:scale-95 transition-all shadow-[0_0_10px_rgba(37,99,235,0.2)]"
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

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white z-[1200] shadow-[0_0_10px_rgba(0,163,255,0.25)] transition-all active:scale-95"
            aria-label="Open navigation menu"
          >
            <Menu size={19} />
          </button>
        </div>
      </header>

      {/* Render Mobile Drawer via Portal directly to body to avoid containing block bugs */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Dimmed Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[99998] lg:hidden"
                />

                {/* Dark Slide-in Sidebar Drawer with Reduced Compact Width */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed top-0 right-0 w-[72%] sm:w-[55%] max-w-[280px] h-[100dvh] z-[99999] lg:hidden flex flex-col justify-between bg-[#070b16] border-l border-white/10 text-white p-5 sm:p-6 shadow-[-25px_0_60px_rgba(0,0,0,0.85)] overflow-y-auto"
                >
                  {/* Top Header: Logo + Brand + Close Button */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-blue-500/30 ring-1 ring-blue-500/20 bg-blue-950/40 flex items-center justify-center shrink-0">
                        <img src="/logo3.png" alt="Logo" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white tracking-tight leading-none font-plusJakartaSans">
                          Harsh<span className="text-blue-500">.</span>
                        </p>
                        <p className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase mt-1">
                          PORTFOLIO
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all active:scale-95 shadow-sm"
                      aria-label="Close menu"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Vertically Centered Numbered Navigation Links */}
                  <nav className="flex flex-col justify-center flex-1 my-auto py-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-3.5 border-b border-white/[0.07] group transition-all"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-[11px] font-mono font-medium text-gray-500 group-hover:text-blue-400 transition-colors">
                            {link.number}
                          </span>
                          <span className="text-[15px] font-semibold tracking-wide text-gray-200 group-hover:text-white group-hover:translate-x-1 transition-all font-plusJakartaSans">
                            {link.name}
                          </span>
                        </div>
                        <span className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all text-xs font-light">
                          →
                        </span>
                      </Link>
                    ))}
                  </nav>

                  {/* Bottom: Email, Circular Socials, CTA Button */}
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-3.5 shrink-0">
                    {/* Direct Email */}
                    <a
                      href="mailto:harshmanmode79@gmail.com"
                      className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="font-medium truncate">harshmanmode79@gmail.com</span>
                    </a>

                    {/* Circular Social Channels Row */}
                    <div className="flex items-center gap-2.5">
                      <a
                        href="https://github.com/Harsh-2006-git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-600/20 transition-all shadow-sm active:scale-95"
                        title="GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://linkedin.com/in/harsh-manmode-2a0b91325"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/20 transition-all shadow-sm active:scale-95"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="mailto:harshmanmode79@gmail.com"
                        className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-[#ea4335] hover:border-[#ea4335]/50 hover:bg-[#ea4335]/20 transition-all shadow-sm active:scale-95"
                        title="Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="tel:+918305721431"
                        className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-[#34a853] hover:border-[#34a853]/50 hover:bg-[#34a853]/20 transition-all shadow-sm active:scale-95"
                        title="Call Harsh"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Solid Dark/Blue CTA Button */}
                    <Link
                      href="#contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_18px_rgba(37,99,235,0.35)] active:scale-[0.98] transition-all font-plusJakartaSans"
                    >
                      <span>LET'S CONNECT</span>
                      <span className="text-sm">→</span>
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
