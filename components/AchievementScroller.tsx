"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Medal, Code, TrendingUp, Star, Award } from "lucide-react";
import AutoImageScroller from "./AutoImageScroller";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  icon: string;
}

const iconMap: { [key: string]: any } = {
  Trophy,
  Medal,
  Code,
  TrendingUp,
  Star,
};

interface Props { achievements: Achievement[]; }

function AchievementCard({ item }: { item: Achievement }) {
  const IconComp = iconMap[item.icon] || Award;
  return (
    <Link 
      href={`/achievements/${item._id}`} 
      className="block group flex-shrink-0 w-[240px] sm:w-[300px] snap-center"
      draggable={false}
    >
      <div className="rounded-b-[24px] rounded-t-none bg-white/5 border border-white/10 group-hover:border-blue-500/20 transition-all shadow-xl flex flex-col justify-between overflow-hidden relative h-full">
        <div>
          <div className="relative aspect-video overflow-hidden border-b border-white/5 bg-black/40">
            <AutoImageScroller images={item.images} isStatic={true} />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <IconComp className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{item.date}</span>
            </div>
            <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors leading-snug mb-1.5 line-clamp-2">{item.title}</h3>
            <div 
              className="text-[11px] text-gray-500 font-bold leading-relaxed line-clamp-2 ach-scroll-description"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            <style jsx global>{`
              .ach-scroll-description * { margin: 0; padding: 0; }
            `}</style>
            
            <div className="mt-4 text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-2">
              View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function AchievementScroller({ achievements }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const GAP = 16;

  // Quadruple-duplicate to ensure continuity for small sets in a stepped scroll
  const items = [...achievements, ...achievements, ...achievements, ...achievements];

  useEffect(() => {
    const el = trackRef.current;
    if (!el || achievements.length === 0) return;

    const singleW = el.scrollWidth / 4;
    el.scrollLeft = singleW;

    const autoScroll = setInterval(() => {
      if (!isHovered.current) {
        const card = el.firstElementChild as HTMLElement;
        if (!card) return;
        const jumpSize = card.offsetWidth + GAP;
        
        el.scrollBy({ left: jumpSize, behavior: "smooth" });

        setTimeout(() => {
          if (!el) return;
          const currentSingleW = el.scrollWidth / 4;
          if (el.scrollLeft >= currentSingleW * 3) {
            el.style.scrollBehavior = 'auto';
            el.scrollLeft -= currentSingleW;
            el.style.scrollBehavior = 'smooth';
          }
        }, 600);
      }
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [achievements]);

  if (!achievements.length) return null;

  return (
    <div
      className="relative select-none"
      style={{ overflowX: "hidden", overflowY: "visible" }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-16 z-10 bg-gradient-to-r from-[#03000A] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-16 z-10 bg-gradient-to-l from-[#03000A] to-transparent" />

      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{
          gap: GAP,
          paddingTop: 10,
          paddingBottom: 20,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth"
        }}
      >
        {items.map((item, i) => (
          <AchievementCard key={`${item._id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
