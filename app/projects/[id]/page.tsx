"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Github, Globe, Layers, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  photos: string[];
  techStack: string[];
  gitHubLink?: string;
  liveLink?: string;
  category?: string;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: any) => p.id.toString() === id);
        setProject(found || null);
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

  if (!project) {
    return (
      <div className="min-h-screen bg-[#03000A] flex flex-col items-center justify-center text-white space-y-6">
        <h1 className="text-4xl font-black font-cinzel text-glow-red">Project Not Found</h1>
        <Link href="/projects" className="text-blue-400 font-black uppercase tracking-widest flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[16/10] rounded-[40px] overflow-hidden border border-white/10 bg-white/5 group shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src={project.photos[activeImage]} 
                alt={project.name}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>
            
            {project.photos.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImage((prev) => (prev === 0 ? project.photos.length - 1 : prev - 1))}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={() => setActiveImage((prev) => (prev === project.photos.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </motion.div>

          {project.photos.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {project.photos.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-blue-500 scale-105 shadow-[0_0_10px_rgba(0,163,255,0.4)]' : 'border-white/5 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`${project.name} thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          <div className="space-y-3">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-[0.5em]"
             >
               <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                 <Layers className="w-4 h-4 text-blue-400" />
               </div>
               {project.category || "Featured Project"}
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter font-cinzel"
             >
               {project.name}
             </motion.h1>
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex flex-wrap gap-4 py-4 border-y border-white/5"
          >
            {project.liveLink && project.liveLink !== "#" && (
              <a href={project.liveLink} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-blue-500 transition-all shadow-xl group">
                <Globe className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                Live Preview
              </a>
            )}
            {project.gitHubLink && project.gitHubLink !== "#" && (
              <a href={project.gitHubLink} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
                <Github className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                Code Base
              </a>
            )}
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="space-y-4"
          >
            <h3 className="text-xs font-black text-white uppercase tracking-widest border-l-4 border-blue-500 pl-4">Project Overview</h3>
            <div className="text-gray-400 font-bold leading-relaxed text-base whitespace-pre-wrap">
              {project.longDescription || project.description}
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="space-y-4 pt-4 border-t border-white/5"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 flex items-center gap-3">
              <Layers className="w-4 h-4 text-blue-500" />
              Technical Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-4 py-1.5 bg-blue-500/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-blue-400 border border-blue-500/10 hover:bg-blue-500 hover:text-white transition-all cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
