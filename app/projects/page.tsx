"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-40 pb-24 font-plusJakartaSans min-h-screen">
      <div className="space-y-4 mb-16">
        <h2 className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] mb-2 text-glow-blue">Portfolio</h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-cinzel">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_8px_rgba(0,163,255,0.6)]">Projects</span>
        </h1>
        <p className="text-gray-500 font-bold text-base md:text-lg max-w-3xl leading-relaxed">
          A curated selection of engineering projects, from complex full-stack applications to innovative digital solutions.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[300px] rounded-[32px] md:rounded-[48px] bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <ProjectCard 
              key={project.id || project.name} 
              id={project.id}
              name={project.title || project.name} 
              techStack={project.techStack || []} 
              description={project.description} 
              longDescription={project.longDescription}
              photos={project.photos || ["/logo3.png"]}
              gitHubLink={project.gitHubLink || "#"}
              liveLink={project.liveLink || "#"}
              category={project.category}
            />
          ))}
        </div>
      )}
    </main>
  );
}
