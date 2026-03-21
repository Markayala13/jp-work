"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
  angle: number;
  rotationSpeed: number;
}

const COLORS = [
  "42, 85, 48",   // forest green
  "122, 158, 126", // sage
  "155, 189, 159", // light sage
  "107, 77, 58",   // earth brown
  "237, 229, 216",  // sand
];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);
  const prefersReducedMotion = useRef(false);

  const createParticle = useCallback((width: number, height: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.3;
    const maxLife = 400 + Math.random() * 600;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 3,
      alpha: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
    };
  }, []);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const rect = canvas.getBoundingClientRect();
    const count = prefersReducedMotion.current ? 30 : Math.min(80, Math.floor((rect.width * rect.height) / 15000));
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(rect.width, rect.height)
    );
    // Start particles at random life stages so they don't all fade in at once
    particlesRef.current.forEach((p) => {
      p.life = Math.random() * p.maxLife;
    });

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const drawLeaf = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgba(${color}, 1)`;
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.5);
      ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.8, size * 0.5, 0, size * 1.5);
      ctx.bezierCurveTo(-size * 0.8, size * 0.5, -size * 0.8, -size * 0.5, 0, -size * 1.5);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      const r = canvas.getBoundingClientRect();
      const w = r.width;
      const h = r.height;

      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.005;

      // Draw flowing curves in background
      ctx.globalAlpha = 0.03;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i === 0 ? `rgba(42, 85, 48, 1)` : i === 1 ? `rgba(122, 158, 126, 1)` : `rgba(107, 77, 58, 1)`;
        ctx.lineWidth = 1.5;
        const yOffset = h * (0.3 + i * 0.2);
        for (let x = 0; x <= w; x += 3) {
          const y =
            yOffset +
            Math.sin(x * 0.003 + timeRef.current + i * 2) * 80 +
            Math.sin(x * 0.007 + timeRef.current * 0.5) * 40;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Update and draw particles
      const mouse = mouseRef.current;

      particlesRef.current.forEach((p, index) => {
        p.life++;
        p.angle += p.rotationSpeed;

        // Fade in and out
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) {
          p.alpha = lifeRatio / 0.1;
        } else if (lifeRatio > 0.85) {
          p.alpha = (1 - lifeRatio) / 0.15;
        } else {
          p.alpha = 1;
        }
        p.alpha *= 0.5;

        // Gentle flow field
        const noiseX = Math.sin(p.x * 0.005 + timeRef.current) * 0.05;
        const noiseY = Math.cos(p.y * 0.005 + timeRef.current * 0.7) * 0.05;
        p.vx += noiseX;
        p.vy += noiseY;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.3;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Reset if out of bounds or life ended
        if (p.life >= p.maxLife || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          particlesRef.current[index] = createParticle(w, h);
        }

        // Draw particle as a leaf shape
        drawLeaf(ctx, p.x, p.y, p.size, p.angle, p.color, p.alpha);
      });

      // Draw subtle connection lines between close particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 100) {
            const lineAlpha = (1 - d / 100) * 0.06 * Math.min(a.alpha, b.alpha);
            ctx.strokeStyle = `rgba(42, 85, 48, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    if (!prefersReducedMotion.current) {
      animate();
    } else {
      // Draw a single static frame for reduced motion
      particlesRef.current.forEach((p) => {
        drawLeaf(ctx, p.x, p.y, p.size, p.angle, p.color, 0.3);
      });
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
