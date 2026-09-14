"use client";

// Moments — staggered cards with optional images, scroll-triggered
import Image from "next/image";
import { momentsData } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function MomentCard({
  moment,
  index,
}: {
  moment: (typeof momentsData)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-7 shadow-soft border border-white/80 hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
        {/* optional image */}
        {moment.imageSrc && (
          <div className="mb-5 rounded-2xl overflow-hidden aspect-video relative bg-sand/20">
            <Image
              src={moment.imageSrc}
              alt={moment.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* label badge */}
        <span className="inline-block text-xs tracking-wider uppercase text-sage font-medium bg-sage/10 px-3 py-1 rounded-full mb-4">
          {moment.label}
        </span>

        {/* title */}
        <h3 className="font-serif text-xl text-ink mb-3">{moment.title}</h3>

        {/* description */}
        <p className="text-sm text-ink/70 leading-relaxed">
          {moment.description}
        </p>

        {/* decorative bottom accent */}
        <div className="mt-5 w-8 h-px bg-sage/30 group-hover:w-16 transition-all duration-300" />
      </div>
    </div>
  );
}

export default function Moments() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();

  return (
    <section className="py-28 px-6 bg-sand/10">
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
              Chapter two
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink">
            Our little moments
          </h2>
        </div>

        {/* cards grid — responsive 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {momentsData.map((moment, index) => (
            <MomentCard key={index} moment={moment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
