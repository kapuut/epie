"use client";

// Question — the main section with YES/NO buttons
// NO button runs away when hovered or touched
import { useState, useRef, useCallback } from "react";
import { questionContent } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Position = { x: number; y: number };

const BUTTON_W = 140;
const BUTTON_H = 52;
const PADDING = 20; // minimum distance from edges

function getRandomPosition(
  containerRect: DOMRect,
  avoidRect: DOMRect
): Position {
  const maxX = containerRect.width - BUTTON_W - PADDING;
  const maxY = containerRect.height - BUTTON_H - PADDING;

  let x: number;
  let y: number;
  let attempts = 0;

  do {
    x = PADDING + Math.random() * maxX;
    y = PADDING + Math.random() * maxY;
    attempts++;

    // avoid overlapping with YES button area (rough check)
    const tooCloseX =
      Math.abs(x - (avoidRect.left - containerRect.left)) < BUTTON_W + 20;
    const tooCloseY =
      Math.abs(y - (avoidRect.top - containerRect.top)) < BUTTON_H + 20;

    if (!(tooCloseX && tooCloseY)) break;
  } while (attempts < 10);

  return { x, y };
}

type QuestionProps = {
  onYes: () => void;
};

export default function Question({ onYes }: QuestionProps) {
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const containerRef = useRef<HTMLDivElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);

  const [noPosition, setNoPosition] = useState<Position | null>(null);
  const [escapeCount, setEscapeCount] = useState(0);
  const [hintText, setHintText] = useState("");

  const moveNoButton = useCallback(() => {
    const container = containerRef.current;
    const yesBtn = yesBtnRef.current;
    if (!container || !yesBtn) return;

    const containerRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const newPos = getRandomPosition(containerRect, yesRect);
    setNoPosition(newPos);

    const count = escapeCount + 1;
    setEscapeCount(count);

    // rotate hint texts based on escape count
    const hints = questionContent.noHoverTexts;
    setHintText(hints[(count - 1) % hints.length]);
  }, [escapeCount]);

  const handleNoMouseEnter = useCallback(() => {
    moveNoButton();
  }, [moveNoButton]);

  const handleNoTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault(); // prevent click
      moveNoButton();
    },
    [moveNoButton]
  );

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-32 px-6 min-h-screen flex flex-col items-center justify-center"
    >
      <div className="max-w-xl mx-auto w-full text-center">
        {/* chapter label */}
        <div
          className={`transition-all duration-700 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px bg-sage/50" />
            <span className="text-xs tracking-[0.2em] uppercase text-sage font-medium">
              The question
            </span>
            <div className="w-6 h-px bg-sage/50" />
          </div>
        </div>

        {/* pre-text */}
        <p
          className={`text-lg text-muted mb-8 transition-all duration-700 delay-200 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {questionContent.preText}
        </p>

        {/* main question */}
        <h2
          className={`font-serif text-4xl sm:text-5xl text-ink leading-snug mb-16 transition-all duration-700 delay-400 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {questionContent.question}
        </h2>

        {/* buttons container — NO button is absolutely positioned within this */}
        <div
          ref={containerRef}
          className={`relative w-full transition-all duration-700 delay-[600ms] ${
            sectionVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ height: "200px" }}
        >
          {/* YES button — fixed centered */}
          <div className="absolute inset-x-0 top-0 flex justify-center">
            <button
              ref={yesBtnRef}
              onClick={onYes}
              className="px-10 py-4 rounded-full bg-sage text-white font-medium text-base shadow-medium hover:bg-sage/90 hover:shadow-glow active:scale-95 transition-all duration-200"
            >
              YES ❤️
            </button>
          </div>

          {/* NO button — starts centered, then moves on hover/touch */}
          <div
            className="absolute transition-all duration-300 ease-out"
            style={
              noPosition
                ? {
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                  }
                : {
                    // default position: below YES button, centered
                    left: "50%",
                    top: "80px",
                    transform: "translateX(-50%)",
                  }
            }
          >
            <button
              onMouseEnter={handleNoMouseEnter}
              onTouchStart={handleNoTouchStart}
              className="px-8 py-4 rounded-full border border-sand/50 text-muted text-base font-medium hover:cursor-not-allowed select-none"
              style={{ width: `${BUTTON_W}px`, height: `${BUTTON_H}px` }}
              aria-label="No button — tries to escape"
            >
              NO
            </button>
          </div>

          {/* hint text that appears after first escape */}
          {escapeCount > 0 && (
            <p className="absolute bottom-0 inset-x-0 text-center text-sm text-muted/70 animate-fade-in">
              {hintText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
