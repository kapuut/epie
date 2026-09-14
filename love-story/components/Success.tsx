"use client";

// Success — overlay shown when YES is pressed, with CSS confetti
import { useEffect, useState } from "react";
import { successContent } from "@/data/content";

// confetti particle config
const CONFETTI_COUNT = 40;
const COLORS = ["#7C9A7E", "#C4A882", "#E8B4B8", "#A8C5A0", "#D4B896"];

type Particle = {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  shape: "rect" | "circle";
};

function generateParticles(): Particle[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 8,
    duration: 2.5 + Math.random() * 2,
    delay: Math.random() * 0.8,
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? "rect" : "circle",
  }));
}

type SuccessProps = {
  onReplay: () => void;
};

export default function Success({ onReplay }: SuccessProps) {
  const [mounted, setMounted] = useState(false);
  const [particles] = useState<Particle[]>(generateParticles);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-cream/95 backdrop-blur-sm transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* confetti particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute top-0 animate-confetti-fall"
            style={{
              left: `${p.x}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              animationFillMode: "both",
            }}
          >
            <div
              style={{
                width: p.shape === "rect" ? `${p.size}px` : `${p.size - 2}px`,
                height:
                  p.shape === "rect" ? `${p.size * 0.5}px` : `${p.size - 2}px`,
                backgroundColor: p.color,
                borderRadius: p.shape === "circle" ? "50%" : "2px",
                transform: `rotate(${p.rotation}deg)`,
                opacity: 0.85,
              }}
            />
          </div>
        ))}
      </div>

      {/* main content */}
      <div
        className={`relative z-10 text-center px-8 max-w-lg transition-all duration-700 delay-300 ${
          mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* heart icon */}
        <div className="text-6xl mb-6 animate-heartbeat">❤️</div>

        {/* heading */}
        <h2 className="font-serif text-4xl sm:text-5xl text-ink mb-5">
          {successContent.heading}
        </h2>

        {/* subtext */}
        <p className="text-lg text-ink/70 leading-relaxed mb-10">
          {successContent.subtext}
        </p>

        {/* replay button */}
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-sage/50 text-sage hover:bg-sage hover:text-white transition-all duration-300 text-sm font-medium tracking-wide"
        >
          ↺ {successContent.replayCta}
        </button>
      </div>
    </div>
  );
}
