"use client";

import React, { useEffect, useRef } from "react";

interface SmokeCursorProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  life: number;
  maxLife: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

export default function SmokeCursor({ containerRef }: SmokeCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const targetEl = containerRef?.current || document.getElementById("hero") || canvas.parentElement;
    if (!targetEl) return;

    let animId: number | null = null;
    let particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;
    let isInside = false;

    const resize = () => {
      const rect = targetEl.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(targetEl);

    // Luminous clean electric blue and cyan glow particles (no purple/violet)
    const blueShades = [
      "rgba(37, 99, 235, ",   // Royal / Electric Blue (#2563EB)
      "rgba(59, 130, 246, ",  // Dodger Blue (#3B82F6)
      "rgba(0, 163, 255, ",   // Bright Electric Blue (#00A3FF)
      "rgba(56, 189, 248, ",  // Sky Cyan (#38BDF8)
      "rgba(14, 165, 233, ",  // Ocean Blue (#0EA5E9)
    ];

    const addSmoke = (x: number, y: number, count = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.85 + 0.2;
        const maxLife = Math.random() * 45 + 35; // Frames to live

        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.3,
          vy: Math.sin(angle) * speed - (Math.random() * 0.6 + 0.2), // gentle upward float
          size: Math.random() * 8 + 6,
          maxSize: Math.random() * 32 + 24, // Expands as it dissipates
          life: 0,
          maxLife,
          color: blueShades[Math.floor(Math.random() * blueShades.length)],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.04,
        });
      }

      if (!animId) {
        animId = requestAnimationFrame(loop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = targetEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Ensure cursor is strictly within hero boundaries
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        isInside = false;
        hasMoved = false;
        return;
      }

      if (!isInside || !hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        isInside = true;
        addSmoke(x, y, 3);
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const steps = Math.min(Math.floor(dist / 6), 6);
      if (steps > 0) {
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          addSmoke(lastX + dx * t, lastY + dy * t, 1);
        }
      } else {
        addSmoke(x, y, 1);
      }

      lastX = x;
      lastY = y;
    };

    const handleMouseLeave = () => {
      isInside = false;
      hasMoved = false;
    };

    targetEl.addEventListener("mousemove", handleMouseMove as EventListener, { passive: true });
    targetEl.addEventListener("mouseleave", handleMouseLeave as EventListener);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.rotation += p.rotSpeed;

        const progress = p.life / p.maxLife;
        const currentSize = p.size + (p.maxSize - p.size) * Math.sin((progress * Math.PI) / 2);

        // Subtle Opacity
        let alpha = 0.08;
        if (progress < 0.15) {
          alpha = (progress / 0.15) * 0.08;
        } else {
          alpha = (1 - (progress - 0.15) / 0.85) * 0.08;
        }

        // Draw soft glowing smoke puff
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
        grad.addColorStop(0, `${p.color}${alpha.toFixed(3)})`);
        grad.addColorStop(0.35, `${p.color}${(alpha * 0.65).toFixed(3)})`);
        grad.addColorStop(0.7, `${p.color}${(alpha * 0.25).toFixed(3)})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animId = requestAnimationFrame(loop);
      } else {
        animId = null;
      }
    };

    return () => {
      ro.disconnect();
      targetEl.removeEventListener("mousemove", handleMouseMove as EventListener);
      targetEl.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    />
  );
}
