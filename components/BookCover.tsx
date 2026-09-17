"use client";

import Image from "next/image";
import { bookCoverContent } from "@/data/content";

interface BookCoverProps {
  onOpen: () => void;
}

export default function BookCover({ onOpen }: BookCoverProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#1A1817] text-[#F5F0E6] select-none overflow-hidden rounded-r-md shadow-2xl">
      {/* Photo Cover Image with editorial crop and dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bookCoverContent.coverImage}
          alt="Book Cover Photo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center filter brightness-[0.7] contrast-[1.05]"
        />
        {/* Dark subtle vignetting & gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      </div>

      {/* Left spine binding shadow detail */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 border-r border-white/10" />

      {/* Outer book cover edge detail */}
      <div className="absolute inset-0 border border-white/10 rounded-r-md pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-sm sm:max-w-md mx-auto text-center px-6 sm:px-10 py-12 flex flex-col items-center justify-between h-full">
        {/* Top metadata */}
        <div className="space-y-1 pt-6">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/70 font-sans">
            PHOTOGRAPH & MEMOIR
          </p>
        </div>

        {/* Center Title */}
        <div className="space-y-4 my-auto py-8">
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-[0.15em] text-white uppercase drop-shadow-md">
            {bookCoverContent.title}
          </h1>
          <div className="w-8 h-[1px] bg-white/40 mx-auto" />
          <p className="font-serif italic text-lg sm:text-xl text-white/80 max-w-xs mx-auto leading-relaxed">
            {bookCoverContent.subtitle}
          </p>
        </div>

        {/* Bottom CTA Button */}
        <div className="pb-4">
          <button
            onClick={onOpen}
            className="group relative inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-white/20 hover:border-white/40 transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
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
