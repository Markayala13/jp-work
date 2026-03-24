"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Scissors, Fence, Hammer, Sprout } from "lucide-react";
import ScrollReveal from "./scroll-reveal";
import SplitText from "./split-text";
import { useLanguage } from "@/context/language-context";

const serviceConfig = [
  { Icon: Leaf,     colSpan: "lg:col-span-2", variant: "featured" as const  },
  { Icon: Scissors, colSpan: "lg:col-span-1", variant: "standard" as const  },
  { Icon: Fence,    colSpan: "lg:col-span-1", variant: "standard" as const  },
  { Icon: Hammer,   colSpan: "lg:col-span-2", variant: "featured" as const  },
  { Icon: Sprout,   colSpan: "lg:col-span-3", variant: "wide"     as const  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-white" style={{ padding: "var(--space-section) 0" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage mb-4">
            {t.services.label}
          </p>
          <h2
            className="font-heading font-light text-bark max-w-2xl leading-[1.1]"
            style={{ fontSize: "var(--text-xl)" }}
          >
            <SplitText text={t.services.h2} delay={0} />
            {" "}
            <SplitText text={t.services.h2italic} className="italic text-forest" delay={0.35} />
          </h2>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="mt-20 rounded-2xl overflow-hidden border border-bark/8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-bark/8">
            {t.services.items.map((service, i) => {
              const { Icon, colSpan, variant } = serviceConfig[i];
              const isWide = variant === "wide";

              return (
                <ScrollReveal
                  key={service.title}
                  delay={i * 0.07}
                  className={colSpan}
                >
                  <TiltCard className="group h-full">
                    <div
                      className={`
                        relative h-full bg-white transition-colors duration-500
                        group-hover:bg-cream
                        ${isWide ? "p-10 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-16 lg:items-center" : "p-10"}
                      `}
                    >
                      {/* Number watermark */}
                      <span
                        className="font-heading font-extralight text-bark/[0.04] select-none leading-none absolute top-8 right-8"
                        style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>

                      {/* Icon column */}
                      <div className={isWide ? "lg:flex lg:flex-col lg:justify-center" : ""}>
                        <motion.div
                          className="w-11 h-11 rounded-xl bg-forest/5 flex items-center justify-center mb-8 transition-colors duration-300 group-hover:bg-forest/10"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon
                            className="w-5 h-5 text-forest/70 transition-colors duration-300 group-hover:text-forest"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </motion.div>
                      </div>

                      {/* Main content */}
                      <div>
                        {service.badge && (
                          <span className="inline-block text-[10px] font-semibold tracking-[0.18em] uppercase text-sage bg-sage/10 px-2.5 py-1 rounded-full mb-4">
                            {service.badge}
                          </span>
                        )}
                        <h3
                          className="font-heading font-medium text-bark mb-3 leading-tight"
                          style={{ fontSize: "var(--text-lg)" }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="text-bark/55 leading-relaxed mb-5"
                          style={{ fontSize: "var(--text-base)" }}
                        >
                          {service.description}
                        </p>
                        <p className="text-sm font-medium text-forest/60 italic">
                          {service.detail}
                        </p>

                        {/* Sub-items for non-wide cards */}
                        {!isWide && service.subItems && service.subItems.length > 0 && (
                          <ul className="mt-8 pt-8 border-t border-bark/8 space-y-2.5">
                            {service.subItems.map((item) => (
                              <li key={item} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-forest/40 flex-shrink-0 transition-colors duration-300 group-hover:bg-forest/70" />
                                <span className="text-sm text-bark/65 font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Sub-items for wide card — right column */}
                      {isWide && service.subItems && service.subItems.length > 0 && (
                        <div className="mt-8 lg:mt-0 flex flex-wrap lg:flex-col gap-3 lg:gap-2.5 lg:items-end">
                          {service.subItems.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-2.5 text-sm font-medium text-bark/65"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-forest/40 flex-shrink-0 transition-colors duration-300 group-hover:bg-forest/70" />
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
