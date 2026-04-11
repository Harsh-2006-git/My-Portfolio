"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Code, Medal, ArrowRight, TrendingUp, Star, Calendar } from "lucide-react";
import Link from "next/link";

import AutoImageScroller from "@/components/AutoImageScroller";

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  images: string[];
  icon: string;
}

const iconMap: { [key: string]: any } = {
  Trophy: Trophy,
  Medal: Medal,
  Code: Code,
  TrendingUp: TrendingUp,
  Star: Star,
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-40 pb-24 font-plusJakartaSans min-h-screen">
      <div className="space-y-4 mb-16">
        <h2 className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] mb-2 text-glow-blue">Recognitions</h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-cinzel">
          Major <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_12px_rgba(0,163,255,0.4)]">Achievements</span>
        </h1>
        <p className="text-gray-500 font-bold text-base md:text-lg max-w-2xl leading-relaxed">
          Notable milestones, awards, and recognitions earned through competitive programming and professional challenges.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-[40px] bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((item) => {
            const IconComp = iconMap[item.icon] || Award;
            return (
              <Link href={`/achievements/${item.id}`} key={item.id} className="block group">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[24px] md:rounded-[40px] bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all shadow-2xl flex flex-col overflow-hidden h-full"
                >
                  <div className="relative aspect-video overflow-hidden border-b border-white/5 bg-black/40">
                    <AutoImageScroller images={item.images} isStatic={true} />
                  </div>
                  
                  <div className="p-5 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-blue-400/10 flex items-center justify-center border border-blue-400/20 group-hover:shadow-[0_0_20px_rgba(0,163,255,0.2)] transition-all">
                          <IconComp className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
                        </div>
                        <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-600 flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> {item.date}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm md:text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">{item.title}</h3>
                        <p className="text-[11px] md:text-sm text-gray-500 font-bold leading-relaxed line-clamp-3 group-hover:text-gray-400 transition-colors">{item.description}</p>
                      </div>
                    </div>

                    <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-blue-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group/link">
                        Details <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
