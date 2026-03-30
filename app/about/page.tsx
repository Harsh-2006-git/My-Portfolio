"use client";

import SkillScroller from "@/components/SkillScroller";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, Award } from "lucide-react";

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
  const experiences = [
    {
      company: "Second Brain Ventures, Noida",
      role: "Full Stack Web Developer Intern",
      period: "June 2025 – July 2025",
      type: "Internship",
      logo: "https://www.startinup.up.gov.in/crm/assets/user/images/Documents/Startup/A_STARTUP_UP_UPLC_00006623/startup_logo/168993627258128.png",
      points: [
        "Developed responsive applications using ReactJS, Tailwind CSS.",
        "Optimized backend algorithms and database queries, improving performance by 20%.",
        "Reduced page load times by 30% via efficient state management.",
      ],
    },
  ];

  const education = [
    {
      school: "Madhav Institute of Technology and Science Gwalior",
      degree: "Bachelor of Technology (B.Tech) in IT",
      period: "2024 - 2028",
      details: "Current GPA: 8.2",
      logo: "/mits-logo.png"
    },
    {
      school: "Little Flower School Pandhurna",
      degree: "Senior Secondary (Class XII)",
      period: "2023 - 2024",
      details: "CBSE Board Percentage: 90%",
      logo: "https://lfspandhurna.com/wp-content/uploads/2023/08/logo100.png"
    },
  ];

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-40 pb-24 font-plusJakartaSans min-h-screen space-y-24">
      {/* Intro Section */}
      <section className="space-y-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: heading + description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-glow-blue">Background</h2>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-cinzel">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_12px_rgba(0,163,255,0.4)]">Harsh</span>
              </h1>
            </div>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-bold text-justify">
              <p>
                I am a second-year B.Tech Information Technology student at MITS Gwalior, driven by a passion for software engineering and problem-solving.
              </p>
              <p>
                With a strong foundation in Data Structures, Algorithms, and MERN stack development, I specialize in building user-focused, scalable applications. My experience as a Full Stack Intern has refined my ability to collaborate in engineering teams and deliver high-performance solutions.
              </p>
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center md:justify-end"
          >
            {/* Always-on strong glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-full rounded-[40px] bg-blue-500/25 blur-[60px]" />
            </div>
            <div className="relative w-full max-w-[420px] overflow-hidden rounded-[40px]">
              <img
                src="/harsh.png"
                alt="Harsh Manmode"
                className="w-full h-auto block"
              />
              {/* Subtle bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#03000A]/70 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="space-y-12">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-blue-600 pl-6">Work Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Glow on hover */}
              <div className="absolute -inset-px rounded-[40px] bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              <div className="relative rounded-[40px] bg-white/[0.03] border border-white/8 group-hover:border-blue-500/20 transition-all shadow-2xl overflow-hidden">
                {/* Top accent bar */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                <div className="p-6 md:p-8">
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4">
                    {/* Logo + role */}
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div>
                        <span className="inline-block text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">{exp.type}</span>
                        <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-blue-300 transition-colors leading-tight">{exp.role}</h3>
                      </div>
                    </div>

                    {/* Period badge */}
                    <span className="text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-500/5 px-5 py-2.5 rounded-full border border-blue-500/15 w-fit flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Company */}
                  <p className="text-cyan-400/80 font-black text-sm uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-cyan-400/50" />
                    {exp.company}
                  </p>

                  {/* Points */}
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-400 font-bold leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="space-y-10">
        <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Tech Stack</h2>
          <p className="text-xs text-blue-400 uppercase tracking-widest">Drag · Swipe · Scroll</p>
        </div>
        <div className="-mx-6">
          <SkillScroller
            skills={skillCategories.flatMap(c => c.skills)}
            speed={0.5}
          />
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-12">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-blue-600 pl-6">Education</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              {/* Glow on hover */}
              <div className="absolute -inset-px rounded-[40px] bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              <div className="relative h-full rounded-[40px] bg-white/[0.03] border border-white/8 group-hover:border-blue-500/20 transition-all shadow-2xl overflow-hidden flex flex-col">
                {/* Top accent bar */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                <div className="p-6 flex-grow flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={edu.logo}
                        alt={edu.school}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <span className="text-[10px] md:text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-500/5 px-3 py-1.5 rounded-full border border-blue-500/15 flex items-center gap-1.5">
                       <Calendar className="w-3 h-3" />
                       {edu.period}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-white group-hover:text-blue-300 transition-colors leading-snug mb-2">
                    {edu.degree}
                  </h3>
                  
                  <p className="text-cyan-400/80 font-black text-xs uppercase tracking-[0.1em] mb-5 flex items-center gap-2">
                    <span className="w-3 h-px bg-cyan-400/50 flex-shrink-0" />
                    {edu.school}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/5">
                    <span className="inline-block text-[10px] font-black text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md shadow-sm">
                      {edu.details}
                    </span>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mt-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Social Profiles Section */}
      <section className="space-y-12">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-blue-600 pl-6">Connect Digitally</h2>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:border-white/30 transition-all shadow-xl flex flex-col"
          >
             <div className="p-5 md:p-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 z-10 top-0 relative">
                <div>
                   <h3 className="text-lg font-black text-white uppercase tracking-wider mb-1 group-hover:text-blue-400 transition-colors">GitHub</h3>
                   <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Explore my code</p>
                </div>
                <a 
                   href="https://github.com/Harsh-2006-git"
                   target="_blank"
                   className="px-5 py-2.5 bg-white text-black font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-xl hover:bg-gray-200 transition-all shadow-md hover:scale-105"
                >
                   Visit GitHub
                </a>
             </div>
             <div className="w-full overflow-hidden bg-black/20 p-4">
               <img src="/github.png" className="w-full h-auto object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02] shadow-xl border border-white/5" alt="GitHub Profile" />
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:border-blue-500/30 transition-all shadow-xl flex flex-col"
          >
             <div className="p-5 md:p-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 z-10 top-0 relative">
                <div>
                   <h3 className="text-lg font-black text-white uppercase tracking-wider mb-1 group-hover:text-blue-400 transition-colors">LinkedIn</h3>
                   <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Connect with me</p>
                </div>
                <a 
                   href="https://linkedin.com/in/harsh-manmode-2a0b91325"
                   target="_blank"
                   className="px-5 py-2.5 bg-[#0a66c2] text-white font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-xl hover:bg-[#004182] transition-all shadow-md hover:scale-105"
                >
                   Visit LinkedIn
                </a>
             </div>
             <div className="w-full overflow-hidden bg-white/5 p-4">
               <img src="/linkedin.png" className="w-full h-auto object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02] shadow-xl border border-white/5" alt="LinkedIn Profile" />
             </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
