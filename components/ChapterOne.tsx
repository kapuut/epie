"use client";

import Image from "next/image";
import { chapterOneContent } from "@/data/content";

export default function ChapterOne() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row select-none overflow-hidden">
      {/* LEFT PAGE: Photo Spread */}
      <div className="w-full md:w-1/2 h-48 md:h-full relative flex flex-col justify-between p-6 sm:p-10 text-white bg-[#1C1A18] overflow-hidden">
        <Image
          src={chapterOneContent.imageSrc}
          alt="Chapter 1 Photo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center filter brightness-[0.65] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-0" />

        {/* Left page top header */}
        <div className="relative z-10 text-center border-b border-white/20 pb-3">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/80">
            {chapterOneContent.chapterLabel}
          </span>
        </div>

        {/* Left page center title */}
        <div className="relative z-10 my-auto text-center space-y-3 py-4">
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-light tracking-wide leading-tight">
            {chapterOneContent.title}
          </h2>
        </div>

        {/* Left page bottom detail */}
        <div className="relative z-10 text-center">
          <p className="font-serif italic text-xs text-white/70">
            {chapterOneContent.timestamp}
          </p>
        </div>
      </div>

      {/* RIGHT PAGE: Editorial Paper Spread */}
      <div className="w-full md:w-1/2 h-full bg-[#F5F0E6] text-[#1A1817] p-6 sm:p-12 flex flex-col justify-between paper-texture-fine">
        {/* Right page top header & divider */}
        <div>
          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-[#78726A] font-sans pb-2">
            <span>{chapterOneContent.chapterLabel}</span>
            <span>{chapterOneContent.chapterNumber}</span>
          </div>
          <div className="w-full h-[1px] bg-[#1A1817]/15 mb-6 sm:mb-10" />

          {/* Right page title & body */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1A1817] tracking-normal leading-tight">
              {chapterOneContent.title}
            </h2>
            <div className="w-10 h-[1px] bg-[#1A1817]/20" />
            <p className="font-serif text-base sm:text-lg text-[#2C2825] leading-relaxed sm:leading-[1.9] font-light text-justify">
              {chapterOneContent.quote}
            </p>
          </div>
        </div>

        {/* Right page footer */}
        <div className="pt-6 border-t border-[#1A1817]/10 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] text-[#78726A] uppercase font-sans">
          <span>FIRST CONVERSATION</span>
          <span>{chapterOneContent.chapterNumber}</span>
        </div>
      </div>
    </div>
  );
}
