import React from "react";

interface ExperienceCardProps {
  title: string;
  desc: string;
  date: string;
}

export default function ExperienceCard({ title, desc, date }: ExperienceCardProps) {
  return (
    <div className="p-5 md:p-12 rounded-[24px] md:rounded-[48px] bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all space-y-4 md:space-y-6 group shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-4">
        <h3 className="text-lg md:text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors uppercase">{title}</h3>
        <span className="text-[10px] md:text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-500/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-blue-500/10 shadow-lg w-fit">{date}</span>
      </div>
      <p className="text-sm md:text-lg text-gray-400 md:text-gray-500 font-bold leading-relaxed">{desc}</p>
    </div>
  );
}
