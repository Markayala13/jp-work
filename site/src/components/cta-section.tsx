"use client";

import { useRef } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ScrollReveal from "./scroll-reveal";
import SplitText from "./split-text";
import MagneticButton from "./magnetic-button";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-white relative overflow-hidden"
      style={{ padding: "var(--space-section) 0" }}
    >
      {/* Parallax decorative circle */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-sage/5 pointer-events-none"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage mb-4">
              Ready to Start?
            </p>
            <h2
              className="font-heading font-light text-bark leading-[1.1] mb-6"
              style={{ fontSize: "var(--text-xl)" }}
            >
              <SplitText text="Let's talk about" delay={0} />
              {" "}
              <SplitText text="your yard." className="italic text-forest" delay={0.3} />
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p
              className="text-bark/55 leading-relaxed mb-12 max-w-lg mx-auto"
              style={{ fontSize: "var(--text-base)" }}
            >
              Give us a call or send a message. We&apos;ll come take a look, talk
              through what you&apos;re thinking, and give you a straight answer on
              what it&apos;ll take.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <a
                  href="tel:+16784975337"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-forest text-cream hover:bg-forest/90 active:scale-[0.98] transition-all duration-200 rounded-full px-10 py-6 text-base gap-2 cursor-pointer w-full sm:w-auto no-underline"
                  )}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call 678-497-5337
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://wa.me/16784975337"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-forest/20 text-forest hover:bg-forest/5 hover:border-forest/30 active:scale-[0.98] transition-all duration-200 rounded-full px-10 py-6 text-base gap-2 cursor-pointer w-full sm:w-auto no-underline"
                  )}
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="mt-8 text-sm text-bark/35">
              We typically respond within a few hours.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
