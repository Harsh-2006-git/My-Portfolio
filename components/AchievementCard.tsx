"use client";

import { motion } from "framer-motion";
import { Trophy, Code, TrendingUp, Star } from "lucide-react";

const icons = {
  Trophy: <Trophy className="w-6 h-6 text-yellow-500" />,
  Code: <Code className="w-6 h-6 text-blue-500" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-green-500" />,
  Star: <Star className="w-6 h-6 text-purple-500" />,
};

interface AchievementProps {
  title: string;
  description: string;
  date: string;
  icon: keyof typeof icons;
}

export default function AchievementCard({ title, description, date, icon }: AchievementProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative pl-8 pb-12 last:pb-0 group"
    >
      {/* Timeline Line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-transparent group-last:from-transparent" />
      
      {/* Icon Circle */}
      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#030014] border border-purple-500/50 flex items-center justify-center z-10 group-hover:border-purple-400 transition-colors">
        <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:bg-purple-400 animate-pulse" />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 ml-4 hover:border-purple-500/30 transition-all hover:bg-white/10">
        <div className="flex items-center gap-4 mb-3">
          {icons[icon]}
          <span className="text-purple-400 text-sm font-medium tracking-wider">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
