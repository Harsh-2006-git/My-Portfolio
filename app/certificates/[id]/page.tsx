"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Award, ExternalLink, ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import Link from "next/link";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  description: string;
  date: string;
  images: string[];
  link: string;
}

export default function CertificateDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c: any) => c.id.toString() === id);
        setCert(found || null);
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

  if (!cert) {
    return (
      <div className="min-h-screen bg-[#03000A] flex flex-col items-center justify-center text-white space-y-6">
        <h1 className="text-4xl font-black font-cinzel">Not Found</h1>
        <Link href="/certificates" className="text-blue-400 font-black uppercase tracking-widest flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Certificates
        </Link>
      </div>
    );
  }

  return (
    <>
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-24 font-plusJakartaSans min-h-screen">
      {/* Back button — fixed top right */}
      <button 
        onClick={() => router.back()}
        className="fixed top-20 right-6 z-50 inline-flex items-center gap-2 md:gap-3 text-blue-400 hover:text-white bg-[#03000A]/80 backdrop-blur hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 transition-all group px-3.5 py-2 md:px-5 md:py-3 rounded-full shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-black/40 group shadow-2xl cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          >
            <img 
              src={cert.images[activeImage]} 
              alt={cert.title}
              className="w-full h-full object-contain transition-all duration-700 group-hover:scale-[1.02]"
            />
            {/* Hover expand hint */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur rounded-full p-2">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
            {cert.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImage((prev) => (prev === 0 ? cert.images.length - 1 : prev - 1))}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={() => setActiveImage((prev) => (prev === cert.images.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </motion.div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {cert.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === idx ? 'border-blue-500 scale-105 shadow-[0_0_15px_rgba(0,163,255,0.4)]' : 'border-white/5 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-contain bg-black/40" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-10">
          <div className="space-y-4">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-[0.5em]"
             >
               <Award className="w-4 h-4" /> Certification Details
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter font-cinzel"
             >
               {cert.title}
             </motion.h1>
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex flex-wrap gap-8 py-8 border-y border-white/5"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Issued By</p>
              <p className="text-white font-bold">{cert.issuer}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Issue Date</p>
              <div className="flex items-center gap-2 text-white font-bold">
                <Calendar className="w-4 h-4 text-blue-500" />
                {cert.date}
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="space-y-6"
          >
            <h3 className="text-sm font-black text-white uppercase tracking-widest border-l-4 border-blue-500 pl-4">Description</h3>
            <div className="text-gray-400 font-bold leading-relaxed text-lg whitespace-pre-wrap space-y-4">
              {cert.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>
                  {paragraph.split('\n').map((line, j) => (
                    <React.Fragment key={j}>
                      {line.startsWith('### ') ? (
                        <span className="block text-xl font-black text-white mt-4 mb-2">{line.replace('### ', '')}</span>
                      ) : (
                        <span>
                          {line.split(/(\*\*.*?\*\*)/g).map((part, k) => (
                            part.startsWith('**') && part.endsWith('**') ? (
                              <strong key={k} className="text-blue-400 font-black">{part.slice(2, -2)}</strong>
                            ) : (
                              part
                            )
                          ))}
                        </span>
                      )}
                      {j < paragraph.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[5000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 z-[5010] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 cursor-pointer pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Expanded Image */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            src={cert.images[activeImage]} 
            alt={cert.title}
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
          />

          {/* Navigation controls if there are multiple images */}
          {cert.images.length > 1 && (
            <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev === 0 ? cert.images.length - 1 : prev - 1));
                }}
                className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 hover:scale-110 transition-all pointer-events-auto"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev === cert.images.length - 1 ? 0 : prev + 1));
                }}
                className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 hover:scale-110 transition-all pointer-events-auto"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
