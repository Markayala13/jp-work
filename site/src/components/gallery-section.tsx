"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "./scroll-reveal";
import SplitText from "./split-text";
import { useLanguage } from "@/context/language-context";

type Size = "featured" | "tall" | "wide" | "medium" | "standard";

const projects: { labelEn: string; labelEs: string; size: Size; src: string }[] = [
  { labelEn: "Stone Retaining Wall",    labelEs: "Muro de retención",       size: "featured",  src: "/img/img-01.jpeg" },
  { labelEn: "Wood Fence Installation", labelEs: "Instalación de cerca",    size: "medium",    src: "/img/img-02.jpeg" },
  { labelEn: "Sod Installation",        labelEs: "Instalación de pasto",    size: "standard",  src: "/img/img-03.jpeg" },
  { labelEn: "Lawn & Mulch Border",     labelEs: "Césped y borde mulch",    size: "tall",      src: "/img/img-04.jpeg" },
  { labelEn: "Wood Fence Gate",         labelEs: "Puerta de madera",        size: "standard",  src: "/img/img-05.jpeg" },
  { labelEn: "Stone Steps & Wall",      labelEs: "Escalones y muro",        size: "wide",      src: "/img/img-06.jpeg" },
  { labelEn: "Wood Retaining Walls",    labelEs: "Muros de madera",         size: "medium",    src: "/img/img-07.jpeg" },
  { labelEn: "Garden & Lawn Design",    labelEs: "Diseño de jardín",        size: "standard",  src: "/img/img-08.jpeg" },
  { labelEn: "Stone Retaining Walls",   labelEs: "Muros de piedra",         size: "tall",      src: "/img/img-09.jpeg" },
  { labelEn: "Wood Fence & Mulch",      labelEs: "Cerca y mulch",           size: "featured",  src: "/img/img.jpeg"    },
  { labelEn: "Rock Garden & Drainage",  labelEs: "Jardín rocoso y drenaje", size: "medium",    src: "/img/img-13.jpeg" },
  { labelEn: "Retaining Wall Build",    labelEs: "Construcción de muro",    size: "standard",  src: "/img/img-14.jpeg" },
  { labelEn: "Tree Service",            labelEs: "Servicio de árboles",     size: "tall",      src: "/img/img-15.jpeg" },
  { labelEn: "Sod & Patio",            labelEs: "Pasto y patio",           size: "standard",  src: "/img/img-16.jpeg" },
  { labelEn: "Lawn Service",            labelEs: "Corte de césped",         size: "wide",      src: "/img/img-17.jpeg" },
  { labelEn: "Tree Removal",            labelEs: "Remoción de árbol",       size: "standard",  src: "/img/img-18.jpeg" },
  { labelEn: "Retaining Wall & Garden", labelEs: "Muro y jardín",           size: "medium",    src: "/img/img-19.jpeg" },
  { labelEn: "Steps & Retaining Walls", labelEs: "Escalones y muros",       size: "wide",      src: "/img/img-20.jpeg" },
  { labelEn: "Wood Fence Installation", labelEs: "Instalación de cerca",    size: "standard",  src: "/img/img-21.jpeg" },
];

const gridClasses: Record<Size, string> = {
  featured: "col-span-2 row-span-4",
  tall:     "col-span-1 row-span-4",
  wide:     "col-span-2 row-span-2",
  medium:   "col-span-1 row-span-3",
  standard: "col-span-1 row-span-2",
};

export default function GallerySection() {
  const shouldReduceMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  return (
    <section id="gallery" className="bg-cream" style={{ padding: "var(--space-section) 0" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage mb-4">{t.gallery.label}</p>
              <h2 className="font-heading font-light text-bark max-w-xl leading-[1.1]" style={{ fontSize: "var(--text-xl)" }}>
                <SplitText text={t.gallery.h2} delay={0} />
                {" "}
                <SplitText text={t.gallery.h2italic} className="italic text-forest" delay={0.3} />
              </h2>
            </div>
            <p className="text-sm text-bark/40 max-w-xs sm:text-right">{t.gallery.count}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3" style={{ gridAutoRows: "clamp(70px, 10vw, 100px)" }}>
          {projects.map((project, i) => (
            <motion.div
              key={`${project.labelEn}-${i}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : Math.min(i * 0.03, 0.2), ease: [0.25, 1, 0.5, 1] }}
              className={`${gridClasses[project.size]} group relative overflow-hidden rounded-lg cursor-pointer`}
            >
              <Image src={project.src} alt={lang === "en" ? project.labelEn : project.labelEs} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" unoptimized />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 bg-gradient-to-t from-bark/40 to-transparent transition-opacity duration-300">
                <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase text-cream/70">
                  {lang === "en" ? project.labelEn : project.labelEs}
                </span>
              </div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 border border-cream/20 rounded-full flex items-center justify-center z-10" aria-hidden="true">
                <span className="text-[8px] sm:text-[10px] text-cream/50 font-heading">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 sm:mt-14 text-center">
            <a href="tel:+16784975337" className="inline-flex items-center gap-2 text-sm font-medium text-forest/70 hover:text-forest transition-colors duration-300 group">
              {t.gallery.cta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
