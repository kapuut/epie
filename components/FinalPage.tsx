"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { finalPageContent } from "@/data/content";

export default function FinalPage() {
  const [hasSaidYes, setHasSaidYes] = useState(false);
  const [noIndex, setNoIndex] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    setNoIndex((prev) => (prev + 1) % finalPageContent.noHoverTexts.length);

    if (containerRef.current && noButtonRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();

      const unTransformedLeft = buttonRect.left - noPosition.x;
      const unTransformedRight = buttonRect.right - noPosition.x;
      const unTransformedTop = buttonRect.top - noPosition.y;
      const unTransformedBottom = buttonRect.bottom - noPosition.y;

      const padding = 20;

      const minX = containerRect.left + padding - unTransformedLeft;
      const maxX = containerRect.right - padding - unTransformedRight;
      const minY = containerRect.top + padding - unTransformedTop;
      const maxY = containerRect.bottom - padding - unTransformedBottom;

      const rawX = (Math.random() - 0.5) * 120;
      const rawY = (Math.random() - 0.5) * 80;

      const clampedX = minX > maxX ? 0 : Math.max(minX, Math.min(maxX, rawX));
      const clampedY = minY > maxY ? 0 : Math.max(minY, Math.min(maxY, rawY));

      setNoPosition({ x: clampedX, y: clampedY });
    } else {
      const randomX = (Math.random() - 0.5) * 60;
      const randomY = (Math.random() - 0.5) * 40;
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  const handleYes = () => {
    setHasSaidYes(true);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row select-none overflow-hidden bg-[#F5F0E6]">
      {/* LEFT / TOP PAGE: Photo Spread */}
      <div className="w-full md:w-1/2 h-[42%] md:h-full relative flex flex-col justify-between p-3 sm:p-6 md:p-10 text-white bg-[#1C1A18] overflow-hidden border-b md:border-b-0 md:border-r border-black/15">
        <Image
          src={finalPageContent.imageSrc}
          alt="Final Chapter Flower Photo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center filter brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45 z-0" />

        {/* Top header */}
        <div className="relative z-10 text-center border-b border-white/20 pb-1 sm:pb-3">
          <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/80">
            {finalPageContent.chapterLabel}
          </span>
        </div>

        {/* Center title */}
        <div className="relative z-10 my-auto text-center space-y-1 sm:space-y-3 py-1 sm:py-4">
          <h2 className="font-serif text-base sm:text-2xl md:text-4xl text-white font-light tracking-wide leading-tight">
            {hasSaidYes ? "Our Beginning" : "The Beginning"}
          </h2>
        </div>

        {/* Bottom detail */}
        <div className="relative z-10 text-center pb-0.5 sm:pb-0">
          <p className="font-serif italic text-[9px] sm:text-xs text-white/75 truncate px-1">
            always and forever
          </p>
        </div>
      </div>

      {/* RIGHT / BOTTOM PAGE: Editorial Paper Spread */}
      <div
        ref={containerRef}
        className="w-full md:w-1/2 h-[58%] md:h-full bg-[#F5F0E6] text-[#1A1817] p-3.5 sm:p-6 md:p-12 flex flex-col justify-between paper-texture-fine overflow-y-auto overflow-x-hidden relative"
      >
        {/* Top header & divider */}
        <div>
          <div className="flex items-center justify-between text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#78726A] font-sans pb-1.5 sm:pb-2">
            <span>{finalPageContent.chapterLabel}</span>
            <span>{finalPageContent.chapterNumber}</span>
          </div>
          <div className="w-full h-[1px] bg-[#1A1817]/15 mb-2.5 sm:mb-6" />
        </div>

        {/* Main Content */}
        <div className="my-auto space-y-3 sm:space-y-8 text-center py-2 sm:py-4">
          {!hasSaidYes ? (
            <div className="space-y-3 sm:space-y-8 animate-editorial-fade">
              <div className="space-y-1.5 sm:space-y-3">
                <p className="font-serif italic text-xs sm:text-base md:text-lg text-[#78726A]">
                  {finalPageContent.preText}
                </p>
                <h2 className="font-serif text-lg sm:text-3xl md:text-5xl font-normal text-[#1A1817] tracking-wide leading-tight">
                  {finalPageContent.question}
                </h2>
              </div>

              {/* Minimal Editorial Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-2 relative min-h-[70px] sm:min-h-[80px] w-full max-w-full px-2 overflow-visible">
                {/* YES BUTTON */}
                <button
                  onClick={handleYes}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#1A1817] text-[#F5F0E6] font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-[#2C2825] transition-all duration-300 active:scale-95 cursor-pointer shadow-md z-10"
                >
                  Yes 🤍
                </button>

                {/* NO BUTTON (playful runaway) */}
                <button
                  ref={noButtonRef}
                  onMouseEnter={handleNoHover}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleNoHover();
                  }}
                  onClick={handleNoHover}
                  style={{
                    transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                    touchAction: "manipulation",
                  }}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#78726A]/40 text-[#78726A] font-sans text-[9px] sm:text-[11px] tracking-wider uppercase hover:border-[#1A1817] transition-transform duration-200 cursor-pointer select-none max-w-[90vw] sm:max-w-full z-20"
                >
                  {finalPageContent.noHoverTexts[noIndex]}
                </button>
              </div>
            </div>
          ) : (
            /* SUCCESS CONFESSION - Centered message */
            <div className="space-y-3 sm:space-y-6 animate-editorial-fade py-3 sm:py-6 text-center">
              <div className="w-8 h-[1px] bg-[#1A1817]/20 mx-auto" />
              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#1A1817] tracking-wider uppercase leading-tight">
                {finalPageContent.successTitle}
              </h1>
              <p className="font-serif italic text-base sm:text-2xl md:text-3xl text-[#78726A] max-w-xs sm:max-w-md mx-auto leading-relaxed">
                {finalPageContent.successSubtitle}
              </p>
              <div className="w-8 h-[1px] bg-[#1A1817]/20 mx-auto" />
            </div>
          )}
        </div>

        {/* Page footer */}
        <div className="pt-2 sm:pt-6 border-t border-[#1A1817]/10 flex items-center justify-between text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#78726A] uppercase font-sans mt-2">
          <span>OUR STORY</span>
          <span>{finalPageContent.chapterNumber}</span>
        </div>
      </div>
    </div>
  );
}


