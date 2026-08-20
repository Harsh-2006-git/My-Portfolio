"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = "https://wa.me/918305721431?text=Hi%20Harsh,%20I%20saw%20your%20portfolio!";

  return (
    <nav
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-blue-500/40 shadow-[0_4px_20px_rgba(59,130,246,0.15)]",
        scrolled
          ? "bg-black/80 backdrop-blur-md"
          : "bg-[#03000A]/40 backdrop-blur-sm text-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 cursor-pointer">
                Harsh.
              </span>
            </Link>
          </div>

          {/* Desktop Links & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span className="text-gray-300 hover:text-white hover:glow-purple transition-all px-2 py-2 rounded-md text-sm font-medium cursor-pointer">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:shadow-[0_0_22px_rgba(16,185,129,0.6)] transition-all hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect</span>
            </a>
          </div>

          {/* Mobile Connect CTA & Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Connect</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-1"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/95 backdrop-blur-xl absolute w-full left-0 border-b border-blue-500/40 shadow-2xl px-4 pt-3 pb-5 space-y-3"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                <span className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </a>
        </motion.div>
      )}
    </nav>
  );
}
