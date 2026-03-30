"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";

interface CertificateProps {
  title: string;
  org: string;
  date: string;
  image: string;
}

export default function CertificateCard({ title, org, date, image }: CertificateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all"
    >
      <div className="h-40 overflow-hidden relative bg-black/40">
        <img src={image} alt={title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
        <div className="absolute top-4 right-4">
          <Award className="text-cyan-400 w-6 h-6 drop-shadow-lg" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-cyan-500 text-sm font-medium mb-3">{org}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">{date}</span>
          <button className="flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-colors py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            View Certificate <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
