"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight, Globe, Layers, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectProps {
  id?: number | string;
  name: string;
  description: string;
  longDescription?: string;
  photos: string[];
  liveLink?: string;
  gitHubLink?: string;
  techStack: string[];
  category?: string;
}

export default function ProjectCard({ id, name, description, longDescription, photos, liveLink, gitHubLink, techStack, category }: ProjectProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => id && router.push(`/projects/${id}`)}
      className="group relative cursor-pointer bg-[#18181A] border border-white/5 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-blue-500/30 shadow-2xl h-full flex flex-col hover:translate-y-[-4px]"
    >
        {/* Card Header Image */}
        <div className="relative">
          <div className="relative h-40 md:h-52 overflow-hidden rounded-t-[24px] bg-black/20">
            <img 
              src={photos[0] || "/placeholder-project.png"} 
              alt={name} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* Card Info Content */}
        <div className="p-4 md:p-6 space-y-3 flex-1 flex flex-col">
          <div className="space-y-2 md:space-y-3 flex-1">
            <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight uppercase">{name}</h3>
            <p className="text-[10px] md:text-sm text-gray-400 leading-relaxed font-bold line-clamp-3 opacity-90">{description}</p>
            
            <div className="flex flex-wrap gap-1 md:gap-1.5 pt-1">
              {techStack.map((tech) => (
                <span key={tech} className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] md:text-[9px] font-black text-blue-400/60 border border-white/5 uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <div className="flex items-center gap-2">
              {liveLink && (
                <a 
                  href={liveLink} 
                  target="_blank" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg font-bold uppercase text-[7px] md:text-[8px] tracking-widest hover:bg-blue-500 transition-all transition-transform active:scale-95 shadow-lg"
                >
                  <div className="flex items-center gap-1.5">
                    <ExternalLink size={10} className="rotate-[-45deg] scale-x-[-1]" />
                    <span>Live</span>
                  </div>
                </a>
              )}
              {gitHubLink && (
                <a 
                  href={gitHubLink} 
                  target="_blank" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-[#1F2022] border border-white/5 text-white rounded-lg font-bold uppercase text-[7px] md:text-[8px] tracking-widest hover:bg-white/10 transition-all transition-transform active:scale-95 shadow-md"
                >
                  <div className="flex items-center gap-1.5">
                    <Github size={10} />
                    <span>Code</span>
                  </div>
                </a>
              )}
            </div>
            
            <button 
              className="w-full flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white/5 border border-white/10 text-white rounded-lg font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] hover:bg-blue-600 hover:border-blue-600 transition-all group/btn mt-1"
            >
              View Details
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
  );
}
