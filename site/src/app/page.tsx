import Preloader from "@/components/preloader";
import ScrollProgress from "@/components/scroll-progress";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import GallerySection from "@/components/gallery-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-forest focus:text-cream focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <AboutSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
