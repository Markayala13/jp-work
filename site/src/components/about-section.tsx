"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./scroll-reveal";
import SplitText from "./split-text";

const stats = [
  { end: 150, suffix: "+", label: "Projects completed" },
  { end: 8,   suffix: "+", label: "Years in the field" },
  { end: 100, suffix: "%", label: "Owner-operated" },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(end);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="font-heading text-5xl lg:text-6xl font-light text-forest block mb-2">
      {count}{suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-cream relative overflow-hidden"
      style={{ padding: "var(--space-section) 0" }}
    >
      {/* Decorative line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-bark/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <div>
            <ScrollReveal>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage mb-4">
                About Us
              </p>
              <h2
                className="font-heading font-light text-bark leading-[1.1] mb-8"
                style={{ fontSize: "var(--text-xl)" }}
              >
                <SplitText text="Real people. Real work." delay={0} />
                {" "}
                <SplitText text="Real results." className="italic text-forest" delay={0.35} />
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-5 text-bark/60 leading-relaxed" style={{ fontSize: "var(--text-base)" }}>
                <p>
                  work JP started with a truck, a few tools, and the belief that
                  outdoor spaces should feel as considered as the homes they surround.
                </p>
                <p>
                  We handle every project personally. No sub-crews you&apos;ve never met,
                  no guesswork on who&apos;s showing up Monday morning. When you call,
                  you talk to the person who&apos;ll be on your property.
                </p>
                <p>
                  That&apos;s how we keep the quality tight and the communication simple.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats side */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 gap-0">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-8 ${i < stats.length - 1 ? "border-b border-bark/8" : ""}`}
                >
                  <Counter end={stat.end} suffix={stat.suffix} />
                  <span className="text-sm text-bark/50 tracking-wide uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
