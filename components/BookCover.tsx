"use client";

import Image from "next/image";
import { bookCoverContent } from "@/data/content";

interface BookCoverProps {
  onOpen: () => void;
}

export default function BookCover({ onOpen }: BookCoverProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#1A1817] text-[#F5F0E6] select-none overflow-hidden rounded-md sm:rounded-r-md shadow-2xl">
      {/* Photo Cover Image with editorial crop and dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bookCoverContent.coverImage}
          alt="Book Cover Photo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center filter brightness-[0.6] contrast-[1.05]"
        />
        {/* Dark subtle vignetting & gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
      </div>

      {/* Left spine binding shadow detail */}
      <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 border-r border-white/10 pointer-events-none" />

      {/* Outer book cover edge detail */}
      <div className="absolute inset-0 border border-white/15 rounded-md pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-sm sm:max-w-md mx-auto text-center px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center justify-between h-full">
        {/* Center Title */}
        <div className="space-y-3 sm:space-y-4 my-auto py-4 sm:py-8">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] text-white uppercase drop-shadow-md">
            {bookCoverContent.title}
          </h1>
          <div className="w-8 h-[1px] bg-white/40 mx-auto" />
          <p className="font-serif italic text-base sm:text-xl text-white/85 max-w-[260px] sm:max-w-xs mx-auto leading-relaxed">
            {bookCoverContent.subtitle}
          </p>
        </div>

        {/* Bottom CTA Button - Subtle invitation */}
        <div className="pb-2 sm:pb-4">
          <button
            onClick={onOpen}
            className="group relative inline-flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase hover:bg-white/20 hover:border-white/50 transition-all duration-300 active:scale-95 cursor-pointer shadow-xl"
          >
            <span>{bookCoverContent.cta}</span>
            <span className="text-sm transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

