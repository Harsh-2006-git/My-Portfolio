"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  images: string[];
}
interface Props { certificates: Certificate[]; }

/* ─── Card ─── */
function CertCard({ cert }: { cert: Certificate }) {
  return (
    <Link 
      href={`/certificates/${cert.id}`} 
      className="block group flex-shrink-0 w-[240px] sm:w-[320px] snap-center" 
      draggable={false}
    >
      <div className="h-full rounded-b-[24px] rounded-t-none bg-white/5 border border-white/10 group-hover:border-blue-500/40 transition-all overflow-hidden shadow-xl flex flex-col">
        <div className="w-full bg-white shrink-0" style={{ aspectRatio: "4/3", overflow: "hidden" }}>
          <img
            src={cert.images[0]}
            alt={cert.title}
            className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
            draggable={false}
          />
        </div>
        <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] truncate">{cert.issuer}</p>
            <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">{cert.title}</h3>
          </div>
          <div className="pt-2 text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1">
            View Detail <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Stepped Scroller ─── */
export default function CertificateScroller({ certificates }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const GAP = 16;

  // Triple-duplicate for seamless loop
  const items = [...certificates, ...certificates, ...certificates];

  useEffect(() => {
    const el = trackRef.current;
    if (!el || certificates.length === 0) return;

    // Start at middle copy
    const singleW = el.scrollWidth / 3;
    el.scrollLeft = singleW;

    const autoScroll = setInterval(() => {
      if (!isHovered.current) {
        const card = el.firstElementChild as HTMLElement;
        if (!card) return;
        const jumpSize = card.offsetWidth + GAP;
        
        el.scrollBy({ left: jumpSize, behavior: "smooth" });

        // Loop check after animation
        setTimeout(() => {
          if (!el) return;
          const currentSingleW = el.scrollWidth / 3;
          if (el.scrollLeft >= currentSingleW * 2) {
            el.style.scrollBehavior = 'auto';
            el.scrollLeft -= currentSingleW;
            el.style.scrollBehavior = 'smooth';
          }
        }, 600);
      }
    }, 2500);

    return () => clearInterval(autoScroll);
  }, [certificates]);

  if (!certificates.length) return null;

  return (
    <div
      className="relative select-none"
      style={{ overflowX: "hidden", overflowY: "visible" }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-16 z-10 bg-gradient-to-r from-[#03000A] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-16 z-10 bg-gradient-to-l from-[#03000A] to-transparent" />

      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{
          gap: GAP,
          paddingTop: 10,
          paddingBottom: 18,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth"
        }}
      >
        {items.map((cert, i) => (
          <CertCard key={`${cert.id}-${i}`} cert={cert} />
        ))}
      </div>
    </div>
  );
}
