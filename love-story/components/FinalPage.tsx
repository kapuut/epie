"use client";

import { useState } from "react";
import Image from "next/image";
import { finalPageContent } from "@/data/content";

export default function FinalPage() {
  const [hasSaidYes, setHasSaidYes] = useState(false);
  const [noIndex, setNoIndex] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    setNoIndex((prev) => (prev + 1) % finalPageContent.noHoverTexts.length);
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 60;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    setHasSaidYes(true);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row select-none overflow-hidden">
      {/* LEFT PAGE: Photo Spread */}
      <div className="w-full md:w-1/2 h-48 md:h-full relative flex flex-col justify-between p-6 sm:p-10 text-white bg-[#1C1A18] overflow-hidden">
        <Image
          src={finalPageContent.imageSrc}
          alt="Final Chapter Photo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center filter brightness-[0.65] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-0" />

        {/* Left page top header */}
        <div className="relative z-10 text-center border-b border-white/20 pb-3">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/80">
            {finalPageContent.chapterLabel}
          </span>
        </div>

        {/* Left page center title */}
        <div className="relative z-10 my-auto text-center space-y-3 py-4">
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-light tracking-wide leading-tight">
            The Beginning
          </h2>
        </div>

        {/* Left page bottom detail */}
        <div className="relative z-10 text-center">
          <p className="font-serif italic text-xs text-white/70">
            always and forever
          </p>
        </div>
      </div>

      {/* RIGHT PAGE: Editorial Paper Spread */}
      <div className="w-full md:w-1/2 h-full bg-[#F5F0E6] text-[#1A1817] p-6 sm:p-12 flex flex-col justify-between paper-texture-fine">
        {/* Right page top header & divider */}
        <div>
          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-[#78726A] font-sans pb-2">
            <span>{finalPageContent.chapterLabel}</span>
            <span>{finalPageContent.chapterNumber}</span>
          </div>
          <div className="w-full h-[1px] bg-[#1A1817]/15 mb-6 sm:mb-8" />
        </div>

        {/* Main Content */}
        <div className="my-auto space-y-8 text-center sm:text-left py-4">
          {!hasSaidYes ? (
            <div className="space-y-8 animate-editorial-fade">
              <div className="space-y-3">
                <p className="font-serif italic text-base sm:text-lg text-[#78726A]">
                  {finalPageContent.preText}
                </p>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1817] tracking-wide leading-tight">
                  {finalPageContent.question}
                </h2>
              </div>

              {/* Minimal Editorial Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 relative min-h-[80px]">
                {/* YES BUTTON */}
                <button
                  onClick={handleYes}
                  className="px-8 py-3 rounded-full bg-[#1A1817] text-[#F5F0E6] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#2C2825] transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                >
                  Yes 🤍
                </button>

                {/* NO BUTTON (playful runaway) */}
                <button
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  style={{
                    transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#78726A]/40 text-[#78726A] font-sans text-[11px] tracking-wider uppercase hover:border-[#1A1817] transition-transform duration-200 cursor-pointer"
                >
                  {finalPageContent.noHoverTexts[noIndex]}
                </button>
              </div>
            </div>
          ) : (
            /* SUCCESS CONFESSION - Centered message */
            <div className="space-y-6 animate-editorial-fade py-6 text-center">
              <div className="w-8 h-[1px] bg-[#1A1817]/20 mx-auto" />
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1817] tracking-wide leading-tight">
                {finalPageContent.successTitle}
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#78726A]">
                {finalPageContent.successSubtitle}
              </p>
              <div className="w-8 h-[1px] bg-[#1A1817]/20 mx-auto" />
            </div>
          )}
        </div>

        {/* Right page footer */}
        <div className="pt-6 border-t border-[#1A1817]/10 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] text-[#78726A] uppercase font-sans">
          <span>OUR STORY</span>
          <span>{finalPageContent.chapterNumber}</span>
        </div>
      </div>
    </div>
  );
}
