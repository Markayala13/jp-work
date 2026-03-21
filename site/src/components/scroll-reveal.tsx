"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const offsets = {
    up: { y: shouldReduceMotion ? 0 : 30 },
    left: { x: shouldReduceMotion ? 0 : -30 },
    right: { x: shouldReduceMotion ? 0 : 30 },
    none: {},
  };

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        ...offsets[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.7,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
