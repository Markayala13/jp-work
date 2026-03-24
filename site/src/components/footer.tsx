"use client";

import { Phone, Mail, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/language-context";

const navLinks = [
  { href: "#services",      labelKey: "services" as const },
  { href: "#gallery",       labelKey: "projects" as const },
  { href: "#about",         labelKey: "about" as const },
  { href: "#testimonials",  labelKey: "testimonials" as const },
  { href: "#contact",       labelKey: "contact" as const },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-bark text-cream/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="font-heading text-2xl font-semibold text-cream/90 tracking-tight block mb-4">
              work JP
            </span>
            <p className="text-sm leading-relaxed max-w-xs text-cream/40">
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-cream/50 mb-6">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+16784975337" className="flex items-center gap-3 text-sm text-cream/60 hover:text-cream transition-colors duration-200">
                  <Phone className="w-4 h-4 text-sage/60" aria-hidden="true" />
                  678-497-5337
                </a>
              </li>
              <li>
                <a href="https://wa.me/16784975337" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-cream/60 hover:text-cream transition-colors duration-200">
                  <MessageCircle className="w-4 h-4 text-sage/60" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contact@workjp.com" className="flex items-center gap-3 text-sm text-cream/60 hover:text-cream transition-colors duration-200">
                  <Mail className="w-4 h-4 text-sage/60" aria-hidden="true" />
                  contact@workjp.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-cream/50 mb-6">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-cream/45 hover:text-cream transition-colors duration-200">
                    {t.nav[link.labelKey]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-cream/8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/25">
            &copy; {currentYear} work JP. {t.footer.rights}
          </p>
          <p className="text-xs text-cream/20">
            Built with Claude Web Builder by{" "}
            <a href="https://tododeia.com" target="_blank" rel="noopener noreferrer" className="hover:text-cream/40 transition-colors duration-200">
              Tododeia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
