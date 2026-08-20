"use client";

import SkillScroller from "@/components/SkillScroller";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, Award, Code, Users, Trophy, ExternalLink, Sparkles } from "lucide-react";

const skillCategories = [
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
      { name: "MySQL", id: "mysql" },
      { name: "Redis", id: "redis" }
    ]
  },
  {
    title: "Tools & Deploy",
    skills: [
      { name: "Git", id: "git" },
      { name: "GitHub", id: "github", invert: true },
      { name: "VS Code", id: "vscode" },
      { name: "Postman", id: "postman" },
      { name: "Vercel", id: "vercel", invert: true },
      { name: "Netlify", id: "netlify" },
      { name: "Render", id: "render", invert: true }
    ]
  }
];

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const timeline = [
    {
      period: "2023 – 2024",
      title: "Senior Secondary (Class XII)",
      organization: "Little Flower School, Pandhurna",
      badge: "Schooling",
      icon: GraduationCap,
      color: "from-blue-500 to-indigo-500",
      accent: "text-blue-400",
      details: "Completed CBSE Board with 90% aggregate score. Built a solid early foundation in mathematics, physics, and computer fundamentals.",
      link: null,
    },
    {
      period: "2024 – 2028 (Present)",
      title: "B.Tech in Information Technology",
      organization: "Madhav Institute of Technology and Science (MITS), Gwalior",
      badge: "Undergraduate",
      icon: GraduationCap,
      color: "from-indigo-500 to-blue-600",
      accent: "text-indigo-400",
      details: "Current GPA: 8.2. Strong core in Data Structures & Algorithms, Object-Oriented Programming, Database Systems, and scalable full-stack development.",
      link: null,
    },
    {
      period: "Dec 2024 – Present",
      title: "Technical Team Member",
      organization: "Google Developer Groups (GDG) MITS-DU Gwalior",
      badge: "Community & Leadership",
      icon: Users,
      color: "from-emerald-500 to-cyan-500",
      accent: "text-emerald-400",
      details: "Contributing to technical community initiatives, hosting hands-on developer workshops, coordinating tech events, and mentoring peers in web development.",
      link: null,
    },
    {
      period: "Jun 2025 – Jul 2025",
      title: "Full Stack Developer Intern",
      organization: "Second Brain Ventures Pvt. Ltd., Noida",
      badge: "Internship",
      icon: Briefcase,
      color: "from-purple-500 to-blue-500",
      accent: "text-purple-400",
      details: "Engineered responsive React.js web applications, optimized backend REST APIs and database queries for 20%+ performance gains, and managed CI/CD Git workflows.",
      link: null,
    },
    {
      period: "Jan 2026 – Present",
      title: "Core Member & Lead Developer",
      organization: "Software Development Club (SDC), MITS Gwalior",
      badge: "Alumni Portal Creator",
      icon: Code,
      color: "from-blue-500 to-cyan-400",
      accent: "text-cyan-400",
      details: "Architected and built the official MITS Alumni Portal (alumni.mitsgwalior.in) adopted institute-wide. Honored with the institute's prestigious Meritocracy Award 2026.",
      link: "https://alumni.mitsgwalior.in",
    },
    {
      period: "Apr 2026 – Jun 2026",
      title: "Software Engineering Intern",
      organization: "Even Cargo Pvt. Ltd., New Delhi",
      badge: "Internship",
      icon: Briefcase,
      color: "from-amber-500 to-orange-500",
      accent: "text-amber-400",
      details: "Architected an end-to-end Apprenticeship Management Portal, built an offline-first PWA with IndexedDB and Service Workers, and deployed Prisma/Docker CI/CD pipelines.",
      link: null,
    },
    {
      period: "Key Milestones",
      title: "Hackathons & Problem Solving",
      organization: "National Competitions & Coding Platforms",
      badge: "Achievements",
      icon: Trophy,
      color: "from-yellow-400 to-amber-500",
      accent: "text-yellow-400",
      details: "Winner of HackSetu 1.0 National Hackathon, 1st Runner-Up at Technocrats Innovation Challenge 2K26, and solved 400+ DSA problems across LeetCode and GFG.",
      link: null,
    }
  ];

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-24 font-plusJakartaSans min-h-screen space-y-12 md:space-y-24">
      {/* Intro Section */}
      <section className="space-y-6 md:space-y-8">
        <div className="max-w-4xl">
          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-10"
          >
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-blue-500 text-[9px] md:text-xs font-black uppercase tracking-[0.6em] text-glow-blue">Background</h2>
              <h1 className="text-2xl md:text-6xl font-black text-white tracking-tighter leading-none font-cinzel">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_12px_rgba(0,163,255,0.4)]">Harsh</span>
              </h1>
            </div>
            <div className="space-y-4 md:space-y-6 text-gray-300/90 text-sm md:text-lg leading-relaxed font-medium text-left">
              <p>
                Third-year B.Tech (Information Technology) student with strong foundations in Data Structures & Algorithms, Object Oriented Programming, and Software Development, strengthened through two software engineering internships.
              </p>
              <p>
                Built REST APIs, authentication systems, and CI/CD pipelines in collaborative development team environments. Solved 400+ DSA problems, won 3 national-level hackathons, and eager to apply strong problem-solving skills while learning and building high-quality software.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chronological Journey Timeline Section */}
      <section id="timeline" className="space-y-8 md:space-y-12">
        <div className="space-y-2 border-l-4 border-blue-600 pl-4 sm:pl-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Journey &amp; Milestones</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-bold">Chronological path from schooling to leadership, internships, and national hackathons</p>
        </div>

        <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 before:absolute before:left-2.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-cyan-400 before:to-purple-600">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group"
              >
                {/* Milestone Node on vertical line */}
                <div className="absolute -left-[30px] sm:-left-[44px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#070514] border-2 border-blue-500/80 group-hover:border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all z-10">
                  <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.accent}`} />
                </div>

                {/* Timeline Card */}
                <div className="relative rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/10 group-hover:border-blue-500/30 transition-all p-4 sm:p-6 shadow-xl space-y-3 overflow-hidden">
                  {/* Subtle top glow */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                      <h3 className="text-sm sm:text-lg md:text-xl font-black text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-[10px] sm:text-xs font-semibold text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10 w-fit flex-shrink-0 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-blue-400" />
                      {item.period}
                    </span>
                  </div>

                  <p className="text-cyan-400 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-px bg-cyan-400/60" />
                    {item.organization}
                  </p>

                  <p className="text-xs sm:text-sm md:text-[14px] text-gray-300/90 font-medium leading-relaxed">
                    {item.details}
                  </p>

                  {item.link && (
                    <div className="pt-2">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-cyan-300 transition-colors bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg"
                      >
                        <span>Visit {item.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="space-y-6 md:space-y-10">
        <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-widest text-white">Tech Stack</h2>
          <p className="text-[9px] md:text-xs text-blue-400 uppercase tracking-widest">Drag · Swipe · Scroll</p>
        </div>
        <div className="-mx-6">
          <SkillScroller
            skills={skillCategories.flatMap(c => c.skills)}
            speed={isMobile ? 1.2 : 0.5}
            size={isMobile ? "normal" : "large"}
          />
        </div>
      </section>

      {/* Social Profiles Section */}
      <section className="space-y-8 md:space-y-12">
        <h2 className="text-xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-blue-600 pl-6">Connect Digitally</h2>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:border-white/30 transition-all shadow-xl flex flex-col"
          >
             <div className="p-4 md:p-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 z-10 top-0 relative">
                <div>
                   <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-wider mb-0.5 md:mb-1 group-hover:text-blue-400 transition-colors">GitHub</h3>
                   <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Explore my code</p>
                </div>
                <a 
                   href="https://github.com/Harsh-2006-git"
                   target="_blank"
                   className="px-4 py-2 md:px-5 md:py-2.5 bg-white text-black font-black uppercase text-[8px] md:text-[10px] tracking-widest rounded-lg md:rounded-xl hover:bg-gray-200 transition-all shadow-md hover:scale-105"
                >
                   Visit GitHub
                </a>
             </div>
             <div className="w-full overflow-hidden bg-black/20 p-3 md:p-4">
               <img src="/github.png" className="w-full h-auto object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02] shadow-xl border border-white/5" alt="GitHub Profile" />
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:border-blue-500/30 transition-all shadow-xl flex flex-col"
          >
             <div className="p-4 md:p-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 z-10 top-0 relative">
                <div>
                   <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-wider mb-0.5 md:mb-1 group-hover:text-blue-400 transition-colors">LinkedIn</h3>
                   <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Connect with me</p>
                </div>
                <a 
                   href="https://linkedin.com/in/harsh-manmode-2a0b91325"
                   target="_blank"
                   className="px-4 py-2 md:px-5 md:py-2.5 bg-[#0a66c2] text-white font-black uppercase text-[8px] md:text-[10px] tracking-widest rounded-lg md:rounded-xl hover:bg-[#004182] transition-all shadow-md hover:scale-105"
                >
                   Visit LinkedIn
                </a>
             </div>
             <div className="w-full overflow-hidden bg-white/5 p-3 md:p-4">
               <img src="/linkedin.png" className="w-full h-auto object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02] shadow-xl border border-white/5" alt="LinkedIn Profile" />
             </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
