"use client";

// Hero — opening section with fade-in animation and CTA button
import { useEffect, useState } from "react";
import Image from "next/image";
import { heroContent } from "@/data/content";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger fade-in after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const next = document.getElementById("how-we-met");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/tangan.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-cream/60 backdrop-blur-[2px]" />
      </div>

      {/* subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none -z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-sage/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-rose/10 blur-3xl" />
      </div>

      {/* Content wrapper with higher z-index */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {/* small decorative line */}
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 delay-[200ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-8 h-px bg-sage/60" />
          <span className="text-xs tracking-[0.25em] uppercase text-muted font-light">
            for you
          </span>
          <div className="w-8 h-px bg-sage/60" />
        </div>

        {/* main heading */}
        <h1
          className={`font-serif text-5xl sm:text-6xl md:text-7xl text-center text-ink leading-tight tracking-tight transition-all duration-700 delay-[400ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {heroContent.title}
        </h1>

        {/* subtitle */}
        <p
          className={`mt-5 text-base sm:text-lg text-muted text-center max-w-md font-light leading-relaxed transition-all duration-700 delay-[600ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {heroContent.subtitle}
        </p>

        {/* CTA button */}
        <button
          onClick={scrollToNext}
          className={`mt-10 group flex items-center gap-2 px-7 py-3.5 rounded-full border border-sage/50 bg-cream/50 backdrop-blur-sm text-sage hover:bg-sage hover:text-white transition-all duration-300 text-sm font-medium tracking-wide delay-[800ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {heroContent.cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* scroll indicator */}
      <div
        className={`absolute bottom-10 z-10 flex flex-col items-center gap-2 transition-all duration-700 delay-[1200ms] ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-sage/40 animate-pulse" />
      </div>
    </section>
  );
}
