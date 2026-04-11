"use client";

import React from "react";
import { motion } from "framer-motion";

interface AutoImageScrollerProps {
  images: string[];
  isStatic?: boolean;
}

export default function AutoImageScroller({ images, isStatic = false }: AutoImageScrollerProps) {
  if (!images || images.length === 0) return null;
  
  // If static or only one image, just show the first one
  if (isStatic || images.length === 1) {
    return (
      <div className="w-full h-full relative group bg-black/40">
        <img src={images[0]} className="w-full h-full object-contain" alt="Detail" />
      </div>
    );
  }

  // Multiply images to ensure continuous scroll
  const scrollImages = [...images, ...images, ...images];

  return (
    <div className="w-full h-full relative overflow-hidden group">
      <motion.div 
        className="flex h-full w-fit"
        animate={{
          x: ["0%", `-${100 / 3}%`],
        }}
        transition={{
          duration: images.length * 10,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: `${images.length * 3 * 100}%` }}
      >
        {scrollImages.map((img, idx) => (
          <div key={idx} className="relative h-full aspect-video flex-shrink-0 bg-black/40">
            <img src={img} className="w-full h-full object-contain" alt={`Slide ${idx}`} />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
