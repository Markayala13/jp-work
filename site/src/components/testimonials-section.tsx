"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./scroll-reveal";
import SplitText from "./split-text";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Alpharetta, GA",
    text: "They turned our backyard from an afterthought into the reason we stay home on weekends. The patio work is flawless — every stone perfectly placed.",
    rating: 5,
  },
  {
    name: "David & Maria Torres",
    location: "Roswell, GA",
    text: "Other companies gave us a quote and disappeared. work JP showed up, explained everything, and finished ahead of schedule. Our neighbors keep asking who did the work.",
    rating: 5,
  },
  {
    name: "James Cooper",
    location: "Johns Creek, GA",
    text: "Hired them for a retaining wall and ended up redoing the entire front yard. Professional, clean, and they actually listen to what you want.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="bg-forest relative overflow-hidden"
      style={{ padding: "var(--space-section) 0" }}
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-10%] opacity-[0.03]"
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage-light/70 mb-4">
            What Homeowners Say
          </p>
          <h2
            className="font-heading font-light text-cream/95 max-w-2xl leading-[1.1] mb-20"
            style={{ fontSize: "var(--text-xl)" }}
          >
            <SplitText text="Don't take our word for it." delay={0} />
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-sage-light text-sage-light"
                      aria-hidden="true"
                    />
                  ))}
                  <span className="sr-only">{t.rating} out of 5 stars</span>
                </div>

                {/* Quote */}
                <blockquote className="text-cream/80 leading-relaxed mb-8" style={{ fontSize: "var(--text-base)" }}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-sage/30 flex items-center justify-center text-cream/70 font-heading text-sm font-medium"
                    aria-hidden="true"
                  >
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cream/90">
                      {t.name}
                    </p>
                    <p className="text-xs text-cream/40">{t.location}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
