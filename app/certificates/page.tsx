"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  images: string[];
  description?: string;
  link?: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-40 pb-24 font-plusJakartaSans min-h-screen">
      <div className="space-y-4 mb-16">
        <h2 className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] mb-2 text-glow-blue">Accreditations</h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-cinzel">
          Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_12px_rgba(0,163,255,0.4)]">Certifications</span>
        </h1>
        <p className="text-gray-500 font-bold text-base md:text-lg max-w-2xl leading-relaxed">
          Recognized milestones and professional certifications from leading educational platforms and organizations.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <Link href={`/certificates/${cert._id}`} key={cert._id} className="block group">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-b-[24px] md:rounded-b-[40px] rounded-t-none bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all shadow-2xl flex flex-col justify-between overflow-hidden h-full"
                >
                  <div>
                    {/* Fixed ratio — uniform card height, full cert visible */}
                    <div className="w-full bg-white border-b border-white/10" style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                      <img
                        src={cert.images?.[0] || ""}
                        alt={cert.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  <div className="p-5 md:p-8">
                    <div className="flex items-center gap-2 md:gap-3 text-gray-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-2 md:mb-4">
                      <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" /> {cert.date}
                    </div>
                    <h3 className="text-base md:text-xl font-black text-white mb-1.5 md:mb-2 group-hover:text-blue-400 transition-colors leading-tight">{cert.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500 font-bold mb-2">{cert.issuer}</p>
                    {cert.description && (
                      <div 
                        className="text-xs text-gray-400 line-clamp-2 md:mb-6 mb-4 font-medium leading-relaxed cert-description"
                        dangerouslySetInnerHTML={{ __html: cert.description }}
                      />
                    )}
                    <style jsx global>{`
                      .cert-description p { margin-bottom: 0.2rem; }
                    `}</style>
                    
                    <div className="flex items-center justify-between mt-auto pt-3 md:pt-4 border-t border-white/5">
                      <span className="text-blue-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group/link">
                        Details <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </span>
                      <div className="text-gray-500 hover:text-white transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
