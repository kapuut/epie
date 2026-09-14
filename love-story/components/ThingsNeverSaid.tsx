"use client";

// ThingsNeverSaid — lines appear one by one when section enters viewport
import { useEffect, useRef, useState } from "react";
import { neverSaidLines } from "@/data/content";

export default function ThingsNeverSaid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionVisible) return;

    // reveal lines one by one with staggered delay
    const timers: ReturnType<typeof setTimeout>[] = [];

    neverSaidLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleCount((prev) => Math.max(prev, i + 1));
        }, i * 500 + 300)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [sectionVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 bg-ink relative overflow-hidden"
    >
      {/* subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-sage/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-rose/5 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-6 h-px bg-sage/40" />
          <span className="text-xs tracking-[0.2em] uppercase text-sage/70 font-medium">
            Chapter four
          </span>
        </div>

        {/* lines that appear sequentially */}
        <div className="space-y-8">
          {neverSaidLines.map((line, i) => (
            <p
              key={i}
              className={`transition-all duration-700 ${
                i < visibleCount
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              } ${
                i === 0
                  ? "font-serif text-2xl sm:text-3xl text-cream/90 leading-snug"
                  : i === neverSaidLines.length - 1
                  ? "font-serif text-2xl sm:text-3xl text-sage/90 leading-snug"
                  : "text-lg text-cream/60 leading-relaxed"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
