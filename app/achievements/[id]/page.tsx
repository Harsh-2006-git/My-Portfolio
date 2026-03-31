"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Trophy, Medal, Code, TrendingUp, Star, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function AchievementDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a: any) => a.id.toString() === id);
        setAchievement(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#03000A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="min-h-screen bg-[#03000A] flex flex-col items-center justify-center text-white space-y-6">
        <h1 className="text-4xl font-black font-cinzel text-glow-red">Not Found</h1>
        <Link href="/achievements" className="text-blue-400 font-black uppercase tracking-widest flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Achievements
        </Link>
      </div>
    );
  }

  const IconComp = iconMap[achievement.icon] || Award;

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-24 font-plusJakartaSans min-h-screen">
      {/* Back button — fixed top right */}
      <button
        onClick={() => router.back()}
        className="fixed top-20 right-6 z-50 inline-flex items-center gap-2 md:gap-3 text-blue-400 hover:text-white bg-[#03000A]/80 backdrop-blur hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 transition-all group px-3.5 py-2 md:px-5 md:py-3 rounded-full shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[4/3] rounded-[40px] overflow-hidden border border-white/10 bg-white/5 group shadow-2xl"
          >
            <img 
              src={achievement.images[activeImage]} 
              alt={achievement.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            
            {achievement.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImage((prev) => (prev === 0 ? achievement.images.length - 1 : prev - 1))}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={() => setActiveImage((prev) => (prev === achievement.images.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </motion.div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {achievement.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === idx ? 'border-blue-500 scale-105 shadow-[0_0_15px_rgba(0,163,255,0.4)]' : 'border-white/5 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-10">
          <div className="space-y-4">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-[0.5em]"
             >
               <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                 <IconComp className="w-4 h-4 text-blue-400" />
               </div>
               Achievement Highlight
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter font-cinzel"
             >
               {achievement.title}
             </motion.h1>
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex flex-wrap gap-8 py-8 border-y border-white/5"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Category</p>
              <p className="text-white font-bold">{achievement.title.split(' ')[0]} Excellence</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Completion Date</p>
              <div className="flex items-center gap-2 text-white font-bold">
                <Calendar className="w-4 h-4 text-blue-500" />
                {achievement.date}
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="space-y-6"
          >
            <h3 className="text-sm font-black text-white uppercase tracking-widest border-l-4 border-blue-500 pl-4">Description</h3>
            <div className="text-gray-400 font-bold leading-relaxed text-lg whitespace-pre-wrap space-y-4">
              {achievement.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>
                  {paragraph.split('\n').map((line, j) => (
                    <React.Fragment key={j}>
                      {line.startsWith('### ') ? (
                        <span className="block text-xl font-black text-white mt-4 mb-2">{line.replace('### ', '')}</span>
                      ) : (
                        <span>
                          {line.split(/(\*\*.*?\*\*)/g).map((part, k) => (
                            part.startsWith('**') && part.endsWith('**') ? (
                              <strong key={k} className="text-blue-400 font-black">{part.slice(2, -2)}</strong>
                            ) : (
                              part
                            )
                          ))}
                        </span>
                      )}
                      {j < paragraph.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function Award(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}
