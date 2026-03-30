"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Code, Medal, ArrowRight, TrendingUp, Star, Calendar } from "lucide-react";
import Link from "next/link";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item) => {
            const IconComp = iconMap[item.icon] || Award;
            return (
              <Link href={`/achievements/${item.id}`} key={item.id} className="block group">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-[40px] bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all shadow-2xl flex flex-col justify-between h-full"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-blue-400/10 flex items-center justify-center border border-blue-400/20 group-hover:shadow-[0_0_20px_rgba(0,163,255,0.2)] transition-all">
                        <IconComp className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 flex items-center gap-2">
                         <Calendar className="w-3 h-3" /> {item.date}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">{item.title}</h3>
                      <p className="text-sm text-gray-500 font-bold leading-relaxed line-clamp-3 group-hover:text-gray-400 transition-colors">{item.description}</p>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                     <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group/link">
                        Read Full Story <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                     </span>
                     <div className="flex -space-x-2">
                        {item.images.slice(0, 3).map((img, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-[#03000A] overflow-hidden">
                             <img src={img} className="w-full h-full object-cover" />
                          </div>
                        ))}
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
