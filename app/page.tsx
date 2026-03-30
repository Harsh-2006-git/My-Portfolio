"use client";

import React, { useState, useEffect } from "react";
import StackIcon from "tech-stack-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, ArrowRight } from "lucide-react";

// Components
import Hero from "@/components/Hero";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import AutoImageScroller from "@/components/AutoImageScroller";
import CertificateScroller from "@/components/CertificateScroller";
import SkillScroller from "@/components/SkillScroller";
import Link from "next/link";
import { Award, Trophy, Code, Medal, Star, TrendingUp, Calendar, Briefcase } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  images: string[];
  icon: string;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  description: string;
  date: string;
  images: string[];
  link: string;
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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    // Fetch dynamic data
    Promise.all([
      fetch("/api/achievements").then(res => res.json()),
      fetch("/api/certificates").then(res => res.json())
    ]).then(([achData, certData]) => {
      setAchievements(achData.slice(0, 3));
      setCertificates(certData);
    }).catch(err => console.error("Error fetching data:", err));

    return () => clearTimeout(timer);
  }, []);

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

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-8 md:pt-16 space-y-24 md:space-y-32 pb-24 font-plusJakartaSans min-h-screen">
        <Hero />



        {/* Tech Stack Section */}
        <section id="skills" className="space-y-10">
          <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Tech Stack</h2>
            <p className="text-xs text-blue-400 uppercase tracking-widest">Drag · Swipe · Scroll</p>
          </div>
          <div className="-mx-6">
            <SkillScroller
              skills={skillCategories.flatMap(c => c.skills)}
              speed={0.5}
              size="large"
            />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-blue-600 pl-6 text-white">Work Experience</h2>
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

        {/* Education Section */}
        <section className="space-y-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-blue-600 pl-6 text-white">Education</h2>
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



        <section id="projects" className="space-y-12">
          <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Projects</h2>
            <Link href="/projects" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-all">
              See All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              name="Alumni Engagement"
              category="React, Node.js"
              description="Networking platform supporting 1,000+ users with real-time chat, admin dashboard and post-management."
              longDescription="A full-featured platform with an admin panel, real-time messaging, and interactive community posts. Built using a modern stack for high performance and scalability."
              photos={["/logo3.png", "/mits-logo.png"]}
              techStack={["React", "Node.js", "Express", "MongoDB", "Socket.io"]}
              gitHubLink="https://github.com/Harsh-2006-git"
              liveLink="#"
            />
            <ProjectCard
              name="Travel Platform"
              category="MERN Stack"
              description="Geo-location booking platform with verified reviews and room management."
              longDescription="Comprehensive travel solution with interactive maps, verified user reviews, and a robust room booking system. Integrated with geo-location services for a seamless experience."
              photos={["/logo3.png", "/mits-logo.png"]}
              techStack={["MERN Stack", "Leaflet", "Cloudinary", "Auth0"]}
              gitHubLink="https://github.com/Harsh-2006-git"
              liveLink="#"
            />
          </div>
        </section>

        <section id="achievements" className="space-y-12">
          <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Achievements</h2>
            <Link href="/achievements" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-all">
              See All Achievements
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {achievements.map((item) => {
              const IconComp = iconMap[item.icon] || Award;
              return (
                <Link href={`/achievements/${item.id}`} key={item.id} className="block group">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-b-[40px] rounded-t-none bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all shadow-xl flex flex-col justify-between overflow-hidden relative h-full"
                  >
                    <div>
                      <div className="relative aspect-video overflow-hidden border-b border-white/5 bg-black/40">
                        <AutoImageScroller images={item.images} />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                             <IconComp className="w-5 h-5 text-blue-400" />
                          </div>
                          <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors leading-tight mb-3">{item.title}</h3>
                        <p className="text-xs text-gray-500 font-bold leading-relaxed line-clamp-2">{item.description}</p>
                        
                        <div className="mt-8 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-2">
                           View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </section>

        <section id="certificates" className="space-y-12 overflow-visible">
          <div className="flex items-end justify-between border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Certificates</h2>
            <Link href="/certificates" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-all">
              See All Certificates
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {/* Break out of px-6 so scroller reaches edge of viewport */}
          <div className="-mx-6">
            <CertificateScroller certificates={certificates} />
          </div>
        </section>

        <section id="contact" className="pt-24 pb-8 border-t border-white/5 space-y-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Get in Touch</h2>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6 font-cinzel">Let's Build Something Extraordinary</h3>
              <p className="text-gray-500 font-bold text-sm md:text-base leading-relaxed opacity-80">
                I'm always excited to hear about new challenges and creative ideas. Whether you have a specific project in mind or just want to explore a shared vision, feel free to drop me a message.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left Column: Info */}
              <div className="space-y-12">
                <div className="space-y-8">
                  <h4 className="text-lg font-black text-white uppercase tracking-widest border-l-4 border-blue-500 pl-6">Contact Channels</h4>
                  <div className="space-y-10">
                    <div className="group flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-all shadow-lg">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Email Address</p>
                        <a href="mailto:harshmanmode79@gmail.com" className="text-sm md:text-lg font-black text-white hover:text-blue-400 transition-colors lowercase tracking-wider break-all md:break-normal">harshmanmode79@gmail.com</a>
                      </div>
                    </div>
                    <div className="group flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-all shadow-lg">
                        <Phone className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Phone Number</p>
                        <p className="text-sm md:text-lg font-black text-white font-cinzel uppercase tracking-wider">+91 83057-21431</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="p-5 md:p-10 rounded-[40px] bg-white/5 border border-white/10 shadow-3xl space-y-8">
                <form className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-blue-400 transition-colors">Your Name</label>
                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-bold" />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-blue-400 transition-colors">Your Email</label>
                    <input type="email" placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-bold" />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-blue-400 transition-colors">Your Message</label>
                    <textarea rows={4} placeholder="How can I help you?" className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none font-bold" />
                  </div>
                  <button type="submit" className="w-full px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 group">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
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
