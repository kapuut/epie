"use client";

import Image from "next/image";
import { chapterOneContent } from "@/data/content";

export default function ChapterOne() {
  return (
    <div className="w-full h-full flex flex-row select-none overflow-hidden">
      {/* LEFT PAGE: Photo Spread */}
      <div className="w-1/2 h-full relative flex flex-col justify-between p-3 sm:p-6 md:p-10 text-white bg-[#1C1A18] overflow-hidden border-r border-black/10">
        <Image
          src={chapterOneContent.imageSrc}
          alt="Chapter 1 Photo"
          fill
          priority
          sizes="(max-width: 768px) 50vw, 50vw"
          className="object-cover object-center filter brightness-[0.65] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45 z-0" />

        {/* Left page top header */}
        <div className="relative z-10 text-center border-b border-white/20 pb-1.5 sm:pb-3">
          <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/80">
            {chapterOneContent.chapterLabel}
          </span>
        </div>

        {/* Left page center title */}
        <div className="relative z-10 my-auto text-center space-y-1.5 sm:space-y-3 py-2 sm:py-4">
          <h2 className="font-serif text-base sm:text-2xl md:text-4xl text-white font-light tracking-wide leading-tight">
            {chapterOneContent.title}
          </h2>
        </div>

        {/* Left page bottom detail */}
        <div className="relative z-10 text-center">
          <p className="font-serif italic text-[9px] sm:text-xs text-white/75 truncate px-1">
            {chapterOneContent.timestamp}
          </p>
        </div>
      </div>

      {/* RIGHT PAGE: Editorial Paper Spread */}
      <div className="w-1/2 h-full bg-[#F5F0E6] text-[#1A1817] p-3.5 sm:p-6 md:p-12 flex flex-col justify-between paper-texture-fine overflow-y-auto">
        {/* Right page top header & divider */}
        <div>
          <div className="flex items-center justify-between text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#78726A] font-sans pb-1.5 sm:pb-2">
            <span>{chapterOneContent.chapterLabel}</span>
            <span>{chapterOneContent.chapterNumber}</span>
          </div>
          <div className="w-full h-[1px] bg-[#1A1817]/15 mb-3 sm:mb-6 md:mb-10" />

          {/* Right page title & body */}
          <div className="space-y-2.5 sm:space-y-6 md:space-y-8">
            <h2 className="font-serif text-sm sm:text-2xl md:text-4xl font-normal text-[#1A1817] tracking-normal leading-tight">
              {chapterOneContent.title}
            </h2>
            <div className="w-8 sm:w-10 h-[1px] bg-[#1A1817]/20" />
            <p className="font-serif text-[11px] sm:text-sm md:text-lg text-[#2C2825] leading-relaxed sm:leading-[1.8] md:leading-[1.9] font-light text-left sm:text-justify">
              {chapterOneContent.quote}
            </p>
          </div>
        </div>

        {/* Right page footer */}
        <div className="pt-3 sm:pt-6 border-t border-[#1A1817]/10 flex items-center justify-between text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#78726A] uppercase font-sans mt-2">
          <span className="truncate max-w-[100px] sm:max-w-none">A CASUAL START</span>
          <span>{chapterOneContent.chapterNumber}</span>
        </div>
      </div>
    </div>
  );
}

