"use client";

import React, { useEffect, useRef } from "react";
import StackIcon from "tech-stack-icons";

interface Skill {
  name: string;
  id: string;
  invert?: boolean;
  url?: string;
}

interface Props {
  skills: Skill[];
  speed?: number; // px per frame, default 0.5
  reverse?: boolean;
  size?: "normal" | "large";
}

export default function SkillScroller({ skills, speed = 0.5, reverse = false, size = "normal" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scroll: 0 });

  // Triple-duplicate for seamless infinite loop
  const items = [...skills, ...skills, ...skills];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Start at the middle copy
    requestAnimationFrame(() => {
      const singleW = el.scrollWidth / 3;
      el.scrollLeft = singleW;
    });

    const dir = reverse ? -1 : 1;

    const tick = () => {
      if (el && !isHovered.current && !isDragging.current) {
        el.scrollLeft += speed * dir;
        const singleW = el.scrollWidth / 3;
        if (el.scrollLeft >= singleW * 2) el.scrollLeft -= singleW;
        if (el.scrollLeft <= 0) el.scrollLeft += singleW;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [skills, speed, reverse]);

  /* Mouse drag */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, scroll: trackRef.current?.scrollLeft ?? 0 };
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = dragStart.current.x - e.clientX;
    trackRef.current.scrollLeft = dragStart.current.scroll + dx;
    const singleW = trackRef.current.scrollWidth / 3;
    if (trackRef.current.scrollLeft >= singleW * 2) trackRef.current.scrollLeft -= singleW;
    if (trackRef.current.scrollLeft <= 0) trackRef.current.scrollLeft += singleW;
  };
  const onMouseUp = () => { isDragging.current = false; };

  /* Touch / thumb */
  const onTouchStart = (e: React.TouchEvent) => {
    isHovered.current = true;
    dragStart.current = { x: e.touches[0].clientX, scroll: trackRef.current?.scrollLeft ?? 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const dx = dragStart.current.x - e.touches[0].clientX;
    trackRef.current.scrollLeft = dragStart.current.scroll + dx;
    const singleW = trackRef.current.scrollWidth / 3;
    if (trackRef.current.scrollLeft >= singleW * 2) trackRef.current.scrollLeft -= singleW;
    if (trackRef.current.scrollLeft <= 0) trackRef.current.scrollLeft += singleW;
  };
  const onTouchEnd = () => { isHovered.current = false; };

  return (
    <div
      className="relative select-none"
      style={{ overflowX: "hidden", overflowY: "visible" }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; isDragging.current = false; }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#03000A] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#03000A] to-transparent" />

      <div
        ref={trackRef}
        className="flex items-center gap-6 cursor-grab active:cursor-grabbing"
        style={{
          overflowX: "scroll",
          overflowY: "visible",
          paddingTop: 8,
          paddingBottom: 12,
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
        {items.map((skill, i) => {
          const isLarge = size === "large";
          return (
            <div
              key={`${skill.id}-${i}`}
              className="flex-shrink-0 group flex flex-col items-center gap-3"
              style={{ width: isLarge ? 96 : 72 }}
            >
              <div className={`${isLarge ? "w-20 h-20 rounded-3xl" : "w-14 h-14 rounded-2xl"} bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:border-blue-500/50 group-hover:scale-110 shadow-xl group-hover:shadow-[0_0_20px_rgba(0,163,255,0.25)]`}>
                {skill.url ? (
                  <img src={skill.url} className={isLarge ? "w-12 h-12" : "w-9 h-9"} alt={skill.name} />
                ) : (
                  <StackIcon
                    name={skill.id}
                    className={`${isLarge ? "w-12 h-12" : "w-9 h-9"} transition-all ${skill.invert ? "invert brightness-[200%]" : ""}`}
                  />
                )}
              </div>
              <span className={`${isLarge ? "text-[10.5px]" : "text-[9px]"} font-black uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors text-center leading-tight`}>{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
