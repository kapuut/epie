"use client";

// HowWeMet — story card section with photo placeholder support
import Image from "next/image";
import { howWeMetContent } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HowWeMet() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section id="how-we-met" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        {/* section label */}
        <div
          ref={headingRef}
          className={`transition-all duration-700 ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-sage/50" />
            <span className="text-xs tracking-[0.2em] uppercase text-sage font-medium">
              Chapter one
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink">
            {howWeMetContent.heading}
          </h2>
        </div>

        {/* story card */}
        <div
          ref={cardRef}
          className={`mt-12 transition-all duration-700 delay-200 ${
            cardVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-soft border border-white/80">
            {/* meta info */}
            <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-sand/30">
              <span className="text-sm text-muted flex items-center gap-2">
                <span className="text-sage">◈</span>
                {howWeMetContent.date}
              </span>
              <span className="text-sm text-muted flex items-center gap-2">
                <span className="text-sage">◈</span>
                {howWeMetContent.place}
              </span>
            </div>

            {/* optional photo */}
            {howWeMetContent.imageSrc && (
              <div className="mb-8 rounded-2xl overflow-hidden aspect-video relative bg-sand/20">
                <Image
                  src={howWeMetContent.imageSrc}
                  alt="How we met"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* paragraphs */}
            <div className="space-y-4">
              {howWeMetContent.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-ink/80 leading-relaxed ${
                    i === 0 ? "font-serif text-xl text-ink" : "text-base"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
