"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/magnetic-button";
import { useLanguage } from "@/context/language-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle, t } = useLanguage();

  const navLinks = [
    { label: t.nav.services,     href: "#services" },
    { label: t.nav.projects,     href: "#gallery" },
    { label: t.nav.about,        href: "#about" },
    { label: t.nav.testimonials, href: "#testimonials" },
    { label: t.nav.contact,      href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const LangToggle = () => (
    <button
      onClick={toggle}
      className={`text-xs font-semibold tracking-widest border rounded-full px-3 py-1 transition-all duration-200 ${
        isOpen || scrolled
          ? "border-bark/20 text-bark/60 hover:border-forest hover:text-forest"
          : "border-cream/30 text-cream/60 hover:border-cream hover:text-cream"
      }`}
      aria-label="Toggle language"
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled && !isOpen
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(42,33,24,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12"
        aria-label="Main navigation"
      >
        <a href="#" className="relative z-50 group">
          <span className={`font-heading text-2xl font-semibold tracking-tight transition-colors duration-300 ${scrolled ? "text-bark group-hover:text-forest" : "text-cream group-hover:text-cream/70"}`}>
            work JP
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${scrolled ? "text-bark/70 hover:text-forest after:bg-forest" : "text-cream/70 hover:text-cream after:bg-cream"}`}
            >
              {link.label}
            </a>
          ))}
          <LangToggle />
          <MagneticButton>
            <a
              href="tel:+16784975337"
              className={cn(
                buttonVariants({ size: "default" }),
                "bg-forest text-cream hover:bg-forest/90 active:scale-[0.98] transition-all duration-200 rounded-full px-6 gap-2 cursor-pointer no-underline"
              )}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {t.nav.callNow}
            </a>
          </MagneticButton>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="relative z-50"><LangToggle /></div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 p-2 -mr-2 transition-colors duration-200 ${isOpen || scrolled ? "text-bark hover:text-forest" : "text-cream hover:text-cream/70"}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="fixed inset-0 bg-cream z-40 lg:hidden"
            >
              <div className="flex flex-col items-start justify-center h-full px-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.25, 1, 0.5, 1] }}
                    className="font-heading text-4xl font-light text-bark py-3 hover:text-forest transition-colors duration-300"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.06, ease: [0.25, 1, 0.5, 1] }}
                  className="mt-8"
                >
                  <a
                    href="tel:+16784975337"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-forest text-cream hover:bg-forest/90 rounded-full px-8 gap-2 cursor-pointer no-underline"
                    )}
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    {t.nav.callNow}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
