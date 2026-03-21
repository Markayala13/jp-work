"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Sprout, Shield, Hammer } from "lucide-react";
import ScrollReveal from "./scroll-reveal";
import SplitText from "./split-text";

const services = [
  {
    icon: Scissors,
    title: "Lawn Service",
    description:
      "Consistent mowing that keeps your yard clean and healthy all season long. We show up on schedule — no reminders needed.",
    detail: "Weekly or bi-weekly plans available.",
  },
  {
    icon: Sprout,
    title: "Weed Control",
    description:
      "Full weed management with fertilizer, pre-emergent treatments, and liquid applications to stop weeds before and after they grow.",
    detail: "Fertilizer included. Pre-emergent + liquid treatments.",
  },
  {
    icon: Shield,
    title: "Pest Control",
    description:
      "Interior and exterior treatments for mosquitoes, ants, and other common pests. Your yard and home — protected year-round.",
    detail: "Indoor & outdoor. Mosquitoes, ants, and more.",
  },
  {
    icon: Hammer,
    title: "Landscaping",
    description:
      "Sod installation, retaining walls (wood, stone, brick), paver patios, driveways, drainage systems, planting, mulch, pine straw, dirt leveling, gutter cleaning, all types of fences, tree service, and stump grinding.",
    detail: "Full installs. All materials. Any scale.",
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white"
      style={{ padding: "var(--space-section) 0" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage mb-4">
            What We Do
          </p>
          <h2
            className="font-heading font-light text-bark max-w-2xl leading-[1.1]"
            style={{ fontSize: "var(--text-xl)" }}
          >
            <SplitText text="Four services —" delay={0} />
            {" "}
            <SplitText text="done right." className="italic text-forest" delay={0.35} />
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid gap-0 lg:grid-cols-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <TiltCard className={`group relative py-12 lg:px-8 ${
                  i < services.length - 1
                    ? "border-b lg:border-b-0 lg:border-r border-bark/8"
                    : ""
                } ${i === 0 ? "lg:pl-0" : ""} ${
                  i === services.length - 1 ? "lg:pr-0" : ""
                }`}
              >
                {/* Number */}
                <span className="font-heading text-6xl font-extralight text-bark/6 absolute top-8 right-0 lg:right-8 select-none">
                  0{i + 1}
                </span>

                <service.icon
                  className="w-8 h-8 text-forest/70 mb-8 transition-colors duration-300 group-hover:text-forest"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <h3 className="font-heading text-2xl font-medium text-bark mb-4">
                  {service.title}
                </h3>

                <p
                  className="text-bark/60 leading-relaxed mb-4"
                  style={{ fontSize: "var(--text-base)" }}
                >
                  {service.description}
                </p>

                <p className="text-sm font-medium text-forest/70 italic">
                  {service.detail}
                </p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
