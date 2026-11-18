"use client";

import React, { useState, useEffect } from "react";
import StackIcon from "tech-stack-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";

// Components
import Hero from "@/components/Hero";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import AutoImageScroller from "@/components/AutoImageScroller";
import CertificateScroller from "@/components/CertificateScroller";
import AchievementScroller from "@/components/AchievementScroller";
import SkillScroller from "@/components/SkillScroller";
import Link from "next/link";
import { Award, Trophy, Code, Medal, Star, TrendingUp, Briefcase } from "lucide-react";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  icon: string;
}

interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  images: string[];
  link?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  techStack: string[];
  github?: string;
  link?: string;
  category?: string;
}

const iconMap: { [key: string]: any } = {
  Trophy: Trophy,
  Medal: Medal,
  Code: Code,
  TrendingUp: TrendingUp,
  Star: Star,
};

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

const experiences = [
  {
    company: "Even Cargo Pvt. Ltd., New Delhi",
    role: "Software Engineering Intern",
    period: "Apr 2026 – Jun 2026",
    type: "Internship",
    logo: "/evencargo.svg",
    points: [
      "Architected an end-to-end Apprenticeship Management Portal with role-based access, candidate tracking, and document verification.",
      "Built an offline-first PWA using React, Node.js, PostgreSQL, IndexedDB, and Service Workers for resilient sync in low-network zones.",
      "Developed scalable REST APIs, analytics dashboards, and automated CI/CD pipelines using Prisma ORM, Docker, and GitHub Actions.",
    ],
  },
  {
    company: "Second Brain Ventures Pvt. Ltd., Noida",
    role: "Full Stack Developer Intern",
    period: "May 2025 – Jul 2025",
    type: "Internship",
    logo: "https://www.startinup.up.gov.in/crm/assets/user/images/Documents/Startup/A_STARTUP_UP_UPLC_00006623/startup_logo/168993627258128.png",
    points: [
      "Engineered responsive web applications with React.js and Tailwind CSS, optimizing database queries and backend APIs for scale.",
      "Designed scalable database schemas and integrated secure REST APIs for high-reliability multi-service data processing.",
      "Streamlined collaborative workflows, version control, code reviews, and CI/CD deployment pipelines using Git and GitHub.",
    ],
  },
];



export default function Home() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isMobile, setIsMobile] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    // Fetch dynamic data safely
    Promise.all([
      fetch("/api/achievements").then(res => res.json()).catch(() => []),
      fetch("/api/certificates").then(res => res.json()).catch(() => []),
      fetch("/api/projects").then(res => res.json()).catch(() => [])
    ]).then(([achData, certData, projData]) => {
      setAchievements(Array.isArray(achData) ? achData : []);
      setCertificates(Array.isArray(certData) ? certData : []);
      setProjects(Array.isArray(projData) ? projData.slice(0, 3) : []);
    }).catch(err => {
      console.error("Error fetching data:", err);
      setAchievements([]);
      setCertificates([]);
      setProjects([]);
    });

    setIsMobile(window.innerWidth < 768);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
      document.documentElement.style.overflow = "unset";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[2000] bg-[#03000A] flex flex-col items-center justify-center pointer-events-auto"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "circIn" } }}
          >
            <div className="relative">
              <motion.h2
                initial={{ opacity: 0, letterSpacing: "1.5rem", filter: "blur(10px)" }}
                animate={{ opacity: 1, letterSpacing: "0.5rem", filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-black uppercase font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 drop-shadow-[0_0_20px_rgba(0,163,255,0.7)]"
              >
                HARSH
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-[2px] w-full bg-gradient-to-r from-blue-600 to-blue-400 mt-4 origin-left shadow-[0_0_10px_#00A3FF]"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.8em] mt-6 text-white/50">Loading Excellence</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen Hero Section */}
      <Hero />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-28 space-y-24 md:space-y-32 pb-24 font-plusJakartaSans min-h-screen overflow-x-hidden">
        {/* Tech Stack Section */}
        <section id="skills" className="space-y-6 md:space-y-10">
          <div className="flex flex-row items-center justify-between border-l-4 border-blue-600 pl-6 gap-4">
            <h2 className="text-[20px] md:text-3xl font-black uppercase tracking-widest text-white whitespace-nowrap">Tech Stack</h2>
            <p className="hidden md:block text-xs text-blue-400 uppercase tracking-[0.2em] whitespace-nowrap opacity-80">Drag · Swipe · Scroll</p>
          </div>
          <div className="space-y-4">
            <div className="-mx-6 overflow-hidden">
              <SkillScroller
                skills={skillCategories.flatMap(c => c.skills)}
                speed={isMobile ? 1.2 : 0.5}
                size={isMobile ? "normal" : "large"}
              />
            </div>
            <p className="md:hidden text-center text-[8px] font-black text-blue-500/50 uppercase tracking-[0.5em]">Drag · Swipe · Scroll</p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-6 md:space-y-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-blue-600 pl-4 sm:pl-6 text-white">Work Experience</h2>
          <div className="space-y-5 md:space-y-6">
            {experiences.map((exp) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Glow on hover */}
                <div className="absolute -inset-px rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className="relative rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/10 group-hover:border-blue-500/30 transition-all shadow-xl overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                  <div className="p-4 sm:p-6 md:p-7">
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {/* Logo + role */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/95 flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden p-1.5">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="inline-block text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full mb-1">{exp.type}</span>
                          <h3 className="text-sm sm:text-base md:text-xl font-black text-white group-hover:text-blue-300 transition-colors leading-snug">{exp.role}</h3>
                        </div>
                      </div>

                      {/* Period badge */}
                      <span className="text-[10px] sm:text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-500/20 w-fit flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0">
                        <Briefcase className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        {exp.period}
                      </span>
                    </div>

                    {/* Company */}
                    <p className="text-cyan-400 font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                      <span className="w-2.5 sm:w-3.5 h-px bg-cyan-400/60" />
                      {exp.company}
                    </p>

                    {/* Points */}
                    <ul className="space-y-2 sm:space-y-2.5">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-[14px] text-gray-300/90 font-medium leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{point}</span>
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





        <section id="projects" className="space-y-12">
          <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Projects</h2>
            <Link href="/projects" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-all">
              See All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Array.isArray(projects) ? projects : []).map((project) => (
              <ProjectCard
                key={project._id}
                id={project._id}
                name={project.title}
                category={project.category}
                description={project.description}
                longDescription={project.description}
                photos={project.images || []}
                techStack={project.techStack}
                gitHubLink={project.github}
                liveLink={project.link}
              />
            ))}
          </div>
        </section>

        <section id="achievements" className="space-y-6 md:space-y-12">
          <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Achievements</h2>
          </div>

          <div className="space-y-6">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-10">
              {(Array.isArray(achievements) ? achievements : []).slice(0, 3).map((item) => {
                const IconComp = iconMap[item.icon] || Award;
                return (
                  <Link href={`/achievements/${item._id}`} key={item._id} className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="rounded-b-[24px] rounded-t-none bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all shadow-xl flex flex-col justify-between overflow-hidden relative h-full"
                    >
                      <div>
                        <div className="relative aspect-video overflow-hidden border-b border-white/5 bg-black/40">
                          <AutoImageScroller images={item.images} isStatic={true} />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                              <IconComp className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{item.date}</span>
                          </div>
                          <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors leading-snug mb-1.5 line-clamp-2">{item.title}</h3>
                          <div 
                            className="text-[11px] text-gray-500 font-bold leading-relaxed line-clamp-2 ach-home-description"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                          />
                          <style jsx global>{`
                            .ach-home-description * { margin: 0; padding: 0; }
                          `}</style>

                          <div className="mt-4 text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-2">
                            View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Scroller */}
            <div className="md:hidden -mx-6">
              <AchievementScroller achievements={Array.isArray(achievements) ? achievements : []} />
            </div>

            <div className="flex justify-center mt-4">
              <Link href="/achievements" className="group flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white transition-all bg-white/5 hover:bg-blue-600 px-5 py-2.5 rounded-xl border border-white/5 hover:border-blue-500 transition-all shadow-xl">
                See All Achievements
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section id="certificates" className="space-y-6 overflow-visible">
          <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Certificates</h2>
          </div>
          <div className="space-y-4">
            <div className="-mx-6">
              <CertificateScroller certificates={Array.isArray(certificates) ? certificates : []} />
            </div>
            <div className="flex justify-center">
              <Link href="/certificates" className="group flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white transition-all bg-white/5 hover:bg-blue-600 px-5 py-2.5 rounded-xl border border-white/5 hover:border-blue-500 transition-all shadow-xl">
                See All Certificates
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="pt-4 pb-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Unified Glassmorphism Box Container */}
            <div className="relative rounded-3xl bg-[#070b16]/90 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl p-6 sm:p-8 md:p-10 overflow-hidden">
              {/* Subtle ambient decorative corner glows */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-600/[0.08] blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-600/[0.06] blur-[90px] pointer-events-none" />

              {/* Header inside the box */}
              <div className="relative z-10 max-w-2xl mb-8 md:mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-[11px] font-semibold text-blue-400 mb-3 shadow-[0_0_10px_rgba(37,99,235,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6] animate-pulse" />
                  <span className="tracking-widest uppercase">Get in Touch</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  Let's Build Something Extraordinary
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-2 leading-relaxed">
                  I'm always excited to hear about new challenges and creative ideas. Whether you have a specific project in mind or just want to explore a shared vision, feel free to drop me a message.
                </p>
              </div>

              {/* 2-Column Grid inside the box */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
                {/* Left Column (5 cols): Channels */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-3.5 bg-blue-500 rounded-full" />
                      Contact Channels
                    </h4>

                    {/* Email Card */}
                    <a
                      href="mailto:harshmanmode79@gmail.com"
                      className="group p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-3.5 cursor-pointer block"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                        <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                          harshmanmode79@gmail.com
                        </p>
                      </div>
                    </a>

                    {/* Phone Card */}
                    <a
                      href="tel:+918305721431"
                      className="group p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-3.5 cursor-pointer block"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</p>
                        <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                          +91 83057-21431
                        </p>
                      </div>
                    </a>
                  </div>

                  {/* Status Pill / Live Availability */}
                  <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/15 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-white">Available for Opportunities</p>
                      <p className="text-[10px] text-gray-400 font-medium">Open for full-stack projects & roles</p>
                    </div>
                  </div>
                </div>

                {/* Right Column (7 cols): Compact Form */}
                <div className="lg:col-span-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 sm:p-6 shadow-inner">
                  <form className="space-y-3.5" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-0.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                          placeholder="Harsh Manmode"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-0.5">Your Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                          placeholder="email@example.com"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-0.5">Your Message</label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                        placeholder="Tell me about your project or vision..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all resize-none font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={`w-full h-11 font-bold uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.35)] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                        status === "success" ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" :
                        status === "error" ? "bg-red-600 text-white" :
                        "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
                      }`}
                    >
                      {status === "idle" && (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                      {status === "loading" && (
                        <>
                          <span>Sending...</span>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        </>
                      )}
                      {status === "success" && (
                        <>
                          <span>Message Sent!</span>
                          <CheckCircle className="w-3.5 h-3.5" />
                        </>
                      )}
                      {status === "error" && (
                        <>
                          <span>Error Sending</span>
                          <AlertCircle className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Social Profiles Section */}
        <section className="space-y-12 max-w-7xl mx-auto px-6 mb-12">
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
    </>
  );
}
