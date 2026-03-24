"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./scroll-reveal";
import SplitText from "./split-text";
import { useLanguage } from "@/context/language-context";

const statValues = [
  { end: 150, suffix: "+" },
  { end: 8,   suffix: "+" },
  { end: 100, suffix: "%" },
];

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setCount(0);
  }, [label]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(end);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref}>
      <span className="font-heading text-5xl lg:text-6xl font-light text-forest block mb-2">
        {count}{suffix}
      </span>
      <span className="text-sm text-bark/50 tracking-wide uppercase">{label}</span>
    </div>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-cream relative overflow-hidden" style={{ padding: "var(--space-section) 0" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-bark/10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <ScrollReveal>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage mb-4">{t.about.label}</p>
              <h2 className="font-heading font-light text-bark leading-[1.1] mb-8" style={{ fontSize: "var(--text-xl)" }}>
                <SplitText text={t.about.h2} delay={0} />
                {" "}
                <SplitText text={t.about.h2italic} className="italic text-forest" delay={0.35} />
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-5 text-bark/60 leading-relaxed" style={{ fontSize: "var(--text-base)" }}>
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 gap-0">
              {statValues.map((stat, i) => (
                <div key={i} className={`py-8 ${i < statValues.length - 1 ? "border-b border-bark/8" : ""}`}>
                  <Counter end={stat.end} suffix={stat.suffix} label={t.about.stats[i]} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
