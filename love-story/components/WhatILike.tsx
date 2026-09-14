"use client";

// WhatILike — reason cards with hover effects and a central quote
import { reasonsData, likesQuote } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof reasonsData)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="group relative bg-white/80 rounded-2xl p-6 shadow-soft border border-white/90 hover:shadow-medium hover:-translate-y-1.5 hover:bg-white transition-all duration-300 cursor-default overflow-hidden">
        {/* hover accent blob */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-sage/10 group-hover:bg-sage/20 transition-all duration-500" />

        {/* icon */}
        <span className="text-sage/60 text-lg mb-3 block group-hover:text-sage transition-colors duration-300">
          {reason.icon}
        </span>

        {/* title */}
        <h3 className="font-serif text-lg text-ink mb-2">{reason.title}</h3>

        {/* description */}
        <p className="text-sm text-ink/60 leading-relaxed">
          {reason.description}
        </p>
      </div>
    </div>
  );
}

export default function WhatILike() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollAnimation({
    threshold: 0.3,
  });

  // split quote by newline for line-by-line rendering
  const quoteLines = likesQuote.text.split("\n");

  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* heading */}
        <div
          ref={headingRef}
          className={`mb-14 transition-all duration-700 ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-sage/50" />
            <span className="text-xs tracking-[0.2em] uppercase text-sage font-medium">
              Chapter three
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink">
            What I like about you
          </h2>
        </div>

        {/* reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasonsData.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>

        {/* central quote */}
        <div
          ref={quoteRef}
          className={`mt-20 text-center transition-all duration-1000 ${
            quoteVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block relative">
            {/* decorative quote mark */}
            <span className="absolute -top-6 -left-4 text-6xl text-sage/15 font-serif leading-none select-none">
              "
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl text-ink leading-snug text-center">
              {quoteLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < quoteLines.length - 1 && <br />}
                </span>
              ))}
            </blockquote>
            <span className="absolute -bottom-10 -right-4 text-6xl text-sage/15 font-serif leading-none select-none">
              "
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
