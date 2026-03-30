"use client";

import React from "react";
import { motion } from "framer-motion";
import StackIcon from "tech-stack-icons";

interface Skill {
  name: string;
  id: string;
  url?: string;
  invert?: boolean;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", id: "java" },
      { name: "JavaScript", id: "js" },
      { name: "TypeScript", id: "typescript" },
      { name: "C++", id: "c++" },
      { name: "Python", id: "python" }
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", id: "react" },
      { name: "HTML5", id: "html5" },
      { name: "CSS3", id: "css3" },
      { name: "Tailwind", id: "tailwindcss" },
      { name: "Bootstrap", id: "bootstrap5" },
      { name: "Vite", id: "vitejs" }
    ]
  },
  {
    title: "Backend & DB",
    skills: [
      { name: "Node.js", id: "nodejs" },
      { name: "Express", id: "expressjs", invert: true },
      { name: "MongoDB", id: "mongodb" },
      { name: "Redis", id: "redis" }
    ]
  },
  {
    title: "Tools & Deploy",
    skills: [
      { name: "Git", id: "git" },
      { name: "GitHub", id: "github", invert: true },
      { name: "VS Code", id: "vscode" },
      { name: "Postman", id: "postman" }
    ]
  }
];

export default function SkillsPage() {
  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-28 pb-24 font-plusJakartaSans min-h-screen">
      <div className="space-y-4 mb-16">
        <h2 className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] mb-2 text-glow-blue">Expertise</h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-cinzel">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_15px_rgba(0,163,255,1)]">Skill Set</span>
        </h1>
        <p className="text-gray-500 font-bold text-base md:text-lg max-w-2xl leading-relaxed">
          A comprehensive overview of my core competencies, from programming languages and frameworks to system architecture and deployment tools.
        </p>
      </div>

      <div className="space-y-24">
        {skillCategories.map((category) => (
          <div key={category.title} className="space-y-12">
            <h3 className="text-[13px] font-black uppercase tracking-[0.5em] text-blue-500/80 border-l-4 border-blue-600/20 pl-6">{category.title}</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-10">
              {category.skills.map((skill) => (
                <div key={skill.id} className="group flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center transition-all group-hover:bg-blue-500/10 group-hover:border-blue-500/40 group-hover:scale-110 shadow-2xl group-hover:shadow-[0_0_20px_rgba(0,163,255,0.2)]">
                    {skill.url ? (
                      <img src={skill.url} className="w-12 h-12 transition-all group-hover:rotate-12" alt={skill.name} />
                    ) : (
                      <StackIcon name={skill.id} className={`w-12 h-12 transition-all group-hover:rotate-12 ${skill.invert ? "invert brightness-[200%]" : ""}`} />
                    )}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors text-center truncate w-full">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
