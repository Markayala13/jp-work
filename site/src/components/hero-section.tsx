"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { Phone, ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import SplitText from "./split-text";
import MagneticButton from "./magnetic-button";
import { useLanguage } from "@/context/language-context";

const HeroCanvas = dynamic(() => import("./hero-canvas"), { ssr: false });

const slides = [
  "/img/main/beautiful-modern-house-cement-view-from-garden.jpg",
  "/img/main/colorful-flower-garden.jpg",
  "/img/main/concrete-steps-leading-up-suburban-house-with-picket-fence-green-lawn.jpg",
];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const dur = shouldReduceMotion ? 0 : 0.8;
  const ease = [0.25, 1, 0.5, 1] as const;
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bark">

      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image src={slides[current]} alt="" fill className="object-cover" priority={current === 0} unoptimized />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-bark/30" aria-hidden="true" />
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: "55px 55px" }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-bark/60 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-bark/70 via-bark/20 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bark/60" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />

      {/* Cursor dot */}
      <motion.div className="fixed top-0 left-0 z-50 pointer-events-none" style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} aria-hidden="true">
        <div className="w-2 h-2 rounded-full bg-sage" />
      </motion.div>
      {/* Cursor ring */}
      <motion.div className="fixed top-0 left-0 z-50 pointer-events-none" style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }} aria-hidden="true">
        <div className="w-9 h-9 rounded-full border border-sage/70" />
      </motion.div>

      <HeroCanvas />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-32 lg:py-0 w-full">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.2, ease }}
            className="text-sm font-semibold tracking-[0.25em] uppercase text-cream/90 mb-6"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {t.hero.tagline}
          </motion.p>

          <h1 className="font-heading font-semibold leading-[1.05] tracking-tight text-cream" style={{ fontSize: "var(--text-display)", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
            <SplitText text={t.hero.h1} delay={0.3} />
            {" "}
            <SplitText text={t.hero.h1italic} className="italic font-light text-sage" delay={0.7} style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.5, ease }}
            className="mt-8 max-w-xl text-cream/85 leading-relaxed"
            style={{ fontSize: "var(--text-lg)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.65, ease }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <a href="tel:+16784975337" className={cn(buttonVariants({ size: "lg" }), "bg-forest text-cream hover:bg-forest/90 active:scale-[0.98] transition-all duration-200 rounded-full px-8 py-6 text-base gap-2 cursor-pointer no-underline")}>
                <Phone className="w-4 h-4" aria-hidden="true" />
                {t.hero.cta}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#services" className="inline-flex items-center justify-center rounded-full border border-cream/40 px-8 py-4 text-base font-medium text-cream/80 hover:bg-cream/10 hover:border-cream/60 hover:text-cream active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline bg-transparent">
                {t.hero.ctaSecondary}
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-5 h-5 text-cream/30" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
