"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "./scroll-reveal";
import SplitText from "./split-text";

/*
  Mobile-first masonry grid.
  Base: 2 columns with gridAutoRows: 80px
  md: 3 columns with gridAutoRows: 90px
  lg: 4 columns with gridAutoRows: 100px
*/

type Size = "featured" | "tall" | "wide" | "medium" | "standard";

const projects: { label: string; size: Size; src: string }[] = [
  { label: "Stone Retaining Wall",      size: "featured",  src: "/img/img-01.jpeg" },
  { label: "Wood Fence Installation",   size: "medium",    src: "/img/img-02.jpeg" },
  { label: "Sod Installation",          size: "standard",  src: "/img/img-03.jpeg" },
  { label: "Lawn & Mulch Border",       size: "tall",      src: "/img/img-04.jpeg" },
  { label: "Wood Fence Gate",           size: "standard",  src: "/img/img-05.jpeg" },
  { label: "Stone Steps & Wall",        size: "wide",      src: "/img/img-06.jpeg" },
  { label: "Wood Retaining Walls",      size: "medium",    src: "/img/img-07.jpeg" },
  { label: "Garden & Lawn Design",      size: "standard",  src: "/img/img-08.jpeg" },
  { label: "Stone Retaining Walls",     size: "tall",      src: "/img/img-09.jpeg" },
  { label: "Wood Fence & Mulch",        size: "featured",  src: "/img/img.jpeg"    },
  { label: "Rock Garden & Drainage",    size: "medium",    src: "/img/img-13.jpeg" },
  { label: "Retaining Wall Build",      size: "standard",  src: "/img/img-14.jpeg" },
  { label: "Tree Service",              size: "tall",      src: "/img/img-15.jpeg" },
  { label: "Sod & Patio",              size: "standard",  src: "/img/img-16.jpeg" },
  { label: "Lawn Service",              size: "wide",      src: "/img/img-17.jpeg" },
  { label: "Tree Removal",              size: "standard",  src: "/img/img-18.jpeg" },
  { label: "Retaining Wall & Garden",   size: "medium",    src: "/img/img-19.jpeg" },
  { label: "Steps & Retaining Walls",   size: "wide",      src: "/img/img-20.jpeg" },
  { label: "Wood Fence Installation",   size: "standard",  src: "/img/img-21.jpeg" },
];

const gridClasses: Record<Size, string> = {
  featured: "col-span-2 row-span-4 md:row-span-4 lg:row-span-4",
  tall:     "col-span-1 row-span-4 md:row-span-4 lg:row-span-3",
  wide:     "col-span-2 row-span-2 md:row-span-2 lg:row-span-2",
  medium:   "col-span-1 row-span-3 md:row-span-3 lg:row-span-3",
  standard: "col-span-1 row-span-2 md:row-span-2 lg:row-span-2",
};

export default function GallerySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="gallery"
      className="bg-cream"
      style={{ padding: "var(--space-section) 0" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage mb-4">
                Our Work
              </p>
              <h2
                className="font-heading font-light text-bark max-w-xl leading-[1.1]"
                style={{ fontSize: "var(--text-xl)" }}
              >
                <SplitText text="Built with hands," delay={0} />
                {" "}
                <SplitText text="not shortcuts." className="italic text-forest" delay={0.3} />
              </h2>
            </div>
            <p className="text-sm text-bark/40 max-w-xs sm:text-right">
              19 projects. Each one different.
            </p>
          </div>
        </ScrollReveal>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
          style={{ gridAutoRows: "clamp(70px, 10vw, 100px)" }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={`${project.label}-${i}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : Math.min(i * 0.03, 0.2),
                ease: [0.25, 1, 0.5, 1],
              }}
              className={`${gridClasses[project.size]} group relative overflow-hidden rounded-lg cursor-pointer`}
            >
              <CardContent project={project} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 sm:mt-14 text-center">
            <a
              href="tel:+16784975337"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest/70 hover:text-forest transition-colors duration-300 group"
            >
              Like what you see? Let&apos;s talk about yours
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CardContent({
  project,
  index,
}: {
  project: { label: string; size: Size; src: string };
  index: number;
}) {
  return (
    <>
      {/* Real image */}
      <Image
        src={project.src}
        alt={project.label}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 bg-gradient-to-t from-bark/40 to-transparent transition-opacity duration-300 group-hover:opacity-0">
        <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase text-cream/70">
          {project.label}
        </span>
      </div>

      {/* Number */}
      <div
        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 border border-cream/20 rounded-full flex items-center justify-center z-10"
        aria-hidden="true"
      >
        <span className="text-[8px] sm:text-[10px] text-cream/50 font-heading">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </>
  );
}
