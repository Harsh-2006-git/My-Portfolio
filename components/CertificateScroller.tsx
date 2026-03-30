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
    <Link href={`/certificates/${cert.id}`} className="block group flex-shrink-0 w-[240px] sm:w-[300px]" draggable={false}>
      <div className="rounded-b-[24px] rounded-t-none bg-white/5 border border-white/10 group-hover:border-blue-500/40 transition-all overflow-hidden shadow-xl">
        <div className="w-full bg-white" style={{ aspectRatio: "4/3", overflow: "hidden" }}>
          <img
            src={cert.images[0]}
            alt={cert.title}
            className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
            draggable={false}
          />
        </div>
        <div className="p-5 space-y-2">
          <p className="text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] truncate">{cert.issuer}</p>
          <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">{cert.title}</h3>
          <div className="pt-1.5 text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1">
            View Detail <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Unified continuous scroller ─── */
export default function CertificateScroller({ certificates }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scroll: 0 });
  const SPEED = 0.6;
  const GAP = 16;

  // Triple-duplicate for seamless loop
  const items = [...certificates, ...certificates, ...certificates];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Start at the middle copy
    requestAnimationFrame(() => {
      const singleW = el.scrollWidth / 3;
      el.scrollLeft = singleW;
    });

    const tick = () => {
      if (el && !isHovered.current && !isDragging.current) {
        el.scrollLeft += SPEED;
        const singleW = el.scrollWidth / 3;
        if (el.scrollLeft >= singleW * 2) el.scrollLeft -= singleW;
        if (el.scrollLeft <= 0) el.scrollLeft += singleW;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [certificates]);

  /* Mouse drag */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, scroll: trackRef.current?.scrollLeft ?? 0 };
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft = dragStart.current.scroll + (dragStart.current.x - e.clientX);
  };
  const onMouseUp = () => { isDragging.current = false; };

  /* Touch drag */
  const onTouchStart = (e: React.TouchEvent) => {
    isHovered.current = true;
    dragStart.current = { x: e.touches[0].clientX, scroll: trackRef.current?.scrollLeft ?? 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const dx = dragStart.current.x - e.touches[0].clientX;
    trackRef.current.scrollLeft = dragStart.current.scroll + dx;
    // wrap
    const singleW = trackRef.current.scrollWidth / 3;
    if (trackRef.current.scrollLeft >= singleW * 2) trackRef.current.scrollLeft -= singleW;
    if (trackRef.current.scrollLeft <= 0) trackRef.current.scrollLeft += singleW;
  };
  const onTouchEnd = () => { isHovered.current = false; };

  if (!certificates.length) return null;

  return (
    <div
      className="relative select-none"
      style={{ overflowX: "clip", overflowY: "visible" }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; isDragging.current = false; }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-16 z-10 bg-gradient-to-r from-[#03000A] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-16 z-10 bg-gradient-to-l from-[#03000A] to-transparent" />

      <div
        ref={trackRef}
        className="flex cursor-grab active:cursor-grabbing"
        style={{
          gap: GAP,
          paddingTop: 10,
          paddingBottom: 18,
          overflowX: "scroll",
          overflowY: "visible",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((cert, i) => (
          <CertCard key={`${cert.id}-${i}`} cert={cert} />
        ))}
      </div>
    </div>
  );
}
