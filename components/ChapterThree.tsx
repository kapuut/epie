"use client";

import Image from "next/image";
import { chapterThreeContent } from "@/data/content";

export default function ChapterThree() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row select-none overflow-hidden bg-[#F5F0E6]">
      {/* LEFT / TOP PAGE: Photo Spread */}
      <div className="w-full md:w-1/2 h-[42%] md:h-full relative flex flex-col justify-between p-3 sm:p-6 md:p-10 text-white bg-[#1C1A18] overflow-hidden border-b md:border-b-0 md:border-r border-black/15">
        <Image
          src={chapterThreeContent.imageSrc}
          alt="Chapter 3 Photo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center filter brightness-[0.65] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45 z-0" />

        {/* Top header */}
        <div className="relative z-10 text-center border-b border-white/20 pb-1 sm:pb-3">
          <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/80">
            {chapterThreeContent.chapterLabel}
          </span>
        </div>

        {/* Center title */}
        <div className="relative z-10 my-auto text-center space-y-1 sm:space-y-3 py-1 sm:py-4">
          <h2 className="font-serif text-base sm:text-2xl md:text-4xl text-white font-light tracking-wide leading-tight">
            {chapterThreeContent.title}
          </h2>
        </div>

        {/* Bottom detail */}
        <div className="relative z-10 text-center pb-0.5 sm:pb-0">
          <p className="font-serif italic text-[9px] sm:text-xs text-white/75 truncate px-1">
            favorite moments with you
          </p>
        </div>
      </div>

      {/* RIGHT / BOTTOM PAGE: Editorial Paper Spread */}
      <div className="w-full md:w-1/2 h-[58%] md:h-full bg-[#F5F0E6] text-[#1A1817] p-3.5 sm:p-6 md:p-12 flex flex-col justify-between paper-texture-fine overflow-y-auto">
        {/* Top header & divider */}
        <div>
          <div className="flex items-center justify-between text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#78726A] font-sans pb-1.5 sm:pb-2">
            <span>{chapterThreeContent.chapterLabel}</span>
            <span>{chapterThreeContent.chapterNumber}</span>
          </div>
          <div className="w-full h-[1px] bg-[#1A1817]/15 mb-2.5 sm:mb-6 md:mb-10" />

          {/* Title & narrative body */}
          <div className="space-y-2 sm:space-y-6 md:space-y-8">
            <h2 className="hidden md:block font-serif text-2xl md:text-4xl font-normal text-[#1A1817] tracking-normal leading-tight">
              {chapterThreeContent.title}
            </h2>
            <div className="hidden md:block w-10 h-[1px] bg-[#1A1817]/20" />
            <p className="font-serif text-[11px] sm:text-sm md:text-lg text-[#2C2825] leading-relaxed sm:leading-[1.8] md:leading-[1.9] font-light text-left sm:text-justify">
              {chapterThreeContent.quote}
            </p>
          </div>
        </div>

        {/* Page footer */}
        <div className="pt-2 sm:pt-6 border-t border-[#1A1817]/10 flex items-center justify-between text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#78726A] uppercase font-sans mt-2">
          <span className="truncate max-w-[120px] sm:max-w-none">THE LITTLE CONVERSATIONS</span>
          <span>{chapterThreeContent.chapterNumber}</span>
        </div>
      </div>
    </div>
  );
}


