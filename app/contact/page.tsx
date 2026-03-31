"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, User, MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-24 font-plusJakartaSans min-h-screen">
      <div className="space-y-4 mb-10 md:mb-16">
        <h2 className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] mb-2 text-glow-blue">Get in Touch</h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-cinzel">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_12px_rgba(0,163,255,0.4)]">Harsh</span>
        </h1>
        <p className="text-gray-500 font-bold text-sm md:text-lg max-w-2xl leading-relaxed">
          Reach out if you have a project in mind, a business inquiry, or just want to say hi. I'm always open to new opportunities and creative ideas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Contact Form */}
        <section className="p-5 md:p-12 rounded-[24px] md:rounded-[48px] bg-white/5 border border-white/10 shadow-3xl space-y-6 md:space-y-8">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-blue-400 transition-colors">Your Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe" 
                  className="w-full bg-white/5 border border-white/5 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-bold" 
                />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-blue-400 transition-colors">Your Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-bold" 
                />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-blue-400 transition-colors">Your Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                <textarea 
                  rows={3} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell me about your project..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl py-3 md:py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none font-bold" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={status === "loading"}
              className={`w-full px-10 py-3 md:py-4 font-black uppercase text-xs tracking-[0.2em] rounded-xl md:rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed ${
                status === "success" ? "bg-green-500 text-white" : 
                status === "error" ? "bg-red-500 text-white" : 
                "bg-white text-black hover:bg-blue-600 hover:text-white"
              }`}
            >
              {status === "idle" && "Send Message"}
              {status === "loading" && "Sending..."}
              {status === "success" && "Message Sent!"}
              {status === "error" && "Error Sending!"}

              {status === "idle" && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "success" && <CheckCircle className="w-4 h-4" />}
              {status === "error" && <AlertCircle className="w-4 h-4" />}
            </button>
          </form>
        </section>

        {/* Contact Info */}
        <div className="space-y-10 md:space-y-16">
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest border-l-4 border-blue-500 pl-6">Contact Channels</h3>
            
            <div className="space-y-8 md:space-y-10">
              <div className="group flex items-center gap-5 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[16px] md:rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Email Address</p>
                  <a href="mailto:harshmanmode79@gmail.com" className="text-sm md:text-lg font-black text-white hover:text-blue-400 transition-colors font-cinzel">harshmanmode79@gmail.com</a>
                </div>
              </div>

              <div className="group flex items-center gap-5 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[16px] md:rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Phone Number</p>
                  <p className="text-base md:text-lg font-black text-white font-cinzel">+91 83057-21431</p>
                </div>
              </div>

              <div className="group flex items-center gap-5 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[16px] md:rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Current Location</p>
                  <p className="text-base md:text-lg font-black text-white font-cinzel uppercase tracking-widest">Gwalior, INDIA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Social Networks</h3>
            <div className="flex gap-4">
              <a href="https://github.com/Harsh-2006-git" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 transition-all group hover:bg-white hover:scale-110">
                <Github className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-black transition-colors" />
              </a>
              <a href="https://linkedin.com/in/harsh-manmode-2a0b91325" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-blue-500/20 flex items-center justify-center bg-blue-500/5 transition-all group hover:bg-[#0077b5] hover:scale-110">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-[#0077b5] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Social Profiles Section */}
      <section className="space-y-8 md:space-y-12 max-w-7xl mx-auto pt-16 md:pt-24 mb-12">
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
