"use client";

// OurStory — vertical timeline with staggered reveal, last step has emphasis animation
import { timelineData } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function TimelineStep({
  step,
  index,
  total,
}: {
  step: (typeof timelineData)[0];
  index: number;
  total: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const isLast = step.isLast;

  return (
    <div ref={ref} className="relative flex gap-6">
      {/* vertical connector line */}
      {index < total - 1 && (
        <div
          className={`absolute left-[19px] top-10 bottom-0 w-px transition-all duration-700 ${
            isVisible ? "bg-sage/30" : "bg-transparent"
          }`}
          style={{ transitionDelay: `${index * 120 + 400}ms` }}
        />
      )}

      {/* dot */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
          isVisible
            ? isLast
              ? "border-sage bg-sage scale-110"
              : "border-sage/60 bg-white"
            : "border-sand/30 bg-white scale-90 opacity-0"
        } ${isLast ? "shadow-glow" : "shadow-sm"}`}
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        {isLast ? (
          <span className="text-white text-xs">❤</span>
        ) : (
          <span className="w-2 h-2 rounded-full bg-sage/60 block" />
        )}
      </div>

      {/* content */}
      <div
        className={`pb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
        style={{ transitionDelay: `${index * 120 + 100}ms` }}
      >
        <h3
          className={`font-serif mb-1 ${
            isLast ? "text-3xl sm:text-4xl text-sage" : "text-xl text-ink"
          }`}
        >
          {step.label}
        </h3>
        <p
          className={`leading-relaxed ${
            isLast ? "text-base text-ink/70" : "text-sm text-muted"
          }`}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function OurStory() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();

  return (
    <section className="py-28 px-6 bg-sand/10">
      <div className="max-w-2xl mx-auto">
        {/* heading */}
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-sage/50" />
            <span className="text-xs tracking-[0.2em] uppercase text-sage font-medium">
              Chapter five
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink">
            Our story so far
          </h2>
        </div>

        {/* timeline */}
        <div>
          {timelineData.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              index={index}
              total={timelineData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
