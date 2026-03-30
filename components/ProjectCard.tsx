"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight, Globe, Layers, ArrowRight } from "lucide-react";

interface ProjectProps {
  name: string;
  description: string;
  longDescription?: string;
  photos: string[];
  liveLink?: string;
  gitHubLink?: string;
  techStack: string[];
  category?: string;
}

export default function ProjectCard({ name, description, longDescription, photos, liveLink, gitHubLink, techStack, category }: ProjectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  React.useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-active');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-active');
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.classList.remove('modal-active');
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group relative cursor-pointer bg-[#18181A] border border-white/5 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-white/10 shadow-2xl h-full flex flex-col"
      >
        {/* Card Header Image */}
        <div className="relative p-2 pb-0">
          <div className="relative h-48 md:h-52 overflow-hidden rounded-[18px]">
            <img 
              src={photos[0] || "/placeholder-project.png"} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* Card Info Content */}
        <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col">
          <div className="space-y-3 flex-1">
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{name}</h3>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-medium line-clamp-3 opacity-90">{description}</p>
            
            <div className="flex flex-wrap gap-1.5 pt-1">
              {techStack.map((tech) => (
                <span key={tech} className="px-2 py-0.5 bg-white/5 rounded text-[9px] font-bold text-gray-500 border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-bold uppercase text-[9px] tracking-widest hover:bg-blue-500 transition-all transition-transform active:scale-95 shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <ExternalLink size={12} className="rotate-[-45deg] scale-x-[-1]" />
                  <span>Live</span>
                </div>
              </a>
            )}
            {gitHubLink && (
              <a 
                href={gitHubLink} 
                target="_blank" 
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1F2022] border border-white/5 text-white rounded-lg font-bold uppercase text-[9px] tracking-widest hover:bg-white/10 transition-all transition-transform active:scale-95 shadow-md"
              >
                <div className="flex items-center gap-1.5">
                  <Github size={12} />
                  <span>Code</span>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modern Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-[#030014] rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 shadow-3xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden no-scrollbar"
            >
              {/* Close Button Mobile */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 z-[3050] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white md:hidden"
              >
                <X size={24} />
              </button>

              {/* Sidebar: Gallery */}
              <div className="w-full md:w-[55%] h-[400px] md:h-[auto] bg-white/5 relative flex flex-col">
                <div className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activePhotoIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={photos[activePhotoIndex]} 
                      className="w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                </div>
                {/* Thumbnails */}
                <div className="absolute bottom-10 left-10 flex gap-3 p-4 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 max-w-[80%] overflow-x-auto no-scrollbar">
                  {photos.map((photo, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${activePhotoIndex === idx ? "border-blue-500 scale-110 shadow-[0_0_15px_rgba(0,163,255,0.4)]" : "border-transparent opacity-50 hover:opacity-100"}`}
                    >
                      <img src={photo} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sidebar: Details */}
              <div className="flex-1 p-8 md:p-16 flex flex-col md:max-h-[85vh] h-full bg-[#030014] relative overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {/* Close Button Desktop */}
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="hidden md:flex absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white hover:bg-red-500 hover:border-red-500 hover:scale-110 transition-all cursor-pointer z-[3050]"
                >
                  <X size={24} />
                </button>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-[2px] bg-blue-500 shadow-[0_0_10px_#00A3FF]" />
                      <p className="text-blue-500 text-xs font-black uppercase tracking-[0.5em]">{category || "Project Feature"}</p>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">{name}</h2>
                  </div>

                  <div className="space-y-6">
                    <p className="text-sm md:text-base text-gray-400 font-bold leading-relaxed">{longDescription || description}</p>
                  </div>

                  {/* Links Row */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    {liveLink && (
                      <a href={liveLink} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-500 transition-all shadow-xl group">
                        <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Live Preview
                      </a>
                    )}
                    {gitHubLink && (
                      <a href={gitHubLink} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all group">
                        <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Code Base
                      </a>
                    )}
                  </div>

                  {/* Tech Stack List */}
                  <div className="space-y-6 pt-10 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 flex items-center gap-3">
                      <Layers className="w-3 h-3 text-blue-500" />
                      Built with
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {techStack.map((tech) => (
                        <span key={tech} className="px-5 py-2 bg-blue-500/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-500/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
