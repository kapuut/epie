"use client";

import { useState, useEffect, useRef, TouchEvent } from "react";
import BookCover from "@/components/BookCover";
import ChapterOne from "@/components/ChapterOne";
import ChapterTwo from "@/components/ChapterTwo";
import ChapterThree from "@/components/ChapterThree";
import ChapterFour from "@/components/ChapterFour";
import FinalPage from "@/components/FinalPage";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 6; // Cover (0), Ch1 (1), Ch2 (2), Ch3 (3), Ch4 (4), Final (5)

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        nextPage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        prevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSwipeLeft = distance > 50;
    const isSwipeRight = distance < -50;

    if (isSwipeLeft) {
      nextPage();
    } else if (isSwipeRight) {
      prevPage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const pages = [
    <BookCover key="cover" onOpen={() => setCurrentPage(1)} />,
    <ChapterOne key="ch1" />,
    <ChapterTwo key="ch2" />,
    <ChapterThree key="ch3" />,
    <ChapterFour key="ch4" />,
    <FinalPage key="final" />,
  ];

  const getChapterIndicator = () => {
    if (currentPage === 0) return "COVER";
    if (currentPage === 5) return "FINAL CHAPTER • 05";
    return `CHAPTER 0${currentPage} • 0${currentPage}`;
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 md:p-10 relative overflow-hidden select-none">
      {/* Desk environment light vignette */}
      <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-black/10 pointer-events-none" />

      {/* Main Book Composition Outer Shadow Wrapper */}
      <div className="w-full max-w-5xl h-[82vh] max-h-[720px] min-h-[520px] relative flex flex-col justify-between items-center z-10">
        {/* Physical Book Hardcover & Page Stack Frame */}
        <div
          className={`w-full h-full relative rounded-md overflow-hidden bg-[#1A1817] shadow-2xl transition-all duration-500 ${
            currentPage === 0
              ? "max-w-xl mx-auto shadow-2xl"
              : "book-gutter book-page-stack-left book-page-stack-right"
          }`}
          style={{
            boxShadow:
              "0 30px 60px -15px rgba(20, 18, 16, 0.4), 0 15px 30px -10px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Sliding Spreads Container */}
          <div
            className="w-full h-full flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {pages.map((page, idx) => (
              <div
                key={idx}
                className="w-full h-full flex-shrink-0 relative overflow-y-auto"
              >
                {page}
              </div>
            ))}
          </div>
        </div>

        {/* External Integrated Navigation Controls */}
        <div className="w-full max-w-5xl flex items-center justify-between pt-4 px-2 z-20">
          {/* Left Arrow Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`w-10 h-10 rounded-full bg-[#1A1817]/80 text-[#F5F0E6] flex items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer ${
              currentPage === 0
                ? "opacity-0 pointer-events-none"
                : "opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
            }`}
            aria-label="Previous Chapter"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Editorial Page Indicator */}
          <div className="flex items-center space-x-4 bg-[#1A1817]/80 text-[#F5F0E6] backdrop-blur-md px-5 py-2 rounded-full border border-white/10 text-[10px] sm:text-xs tracking-[0.25em] font-sans uppercase">
            <span>{getChapterIndicator()}</span>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`w-10 h-10 rounded-full bg-[#1A1817]/80 text-[#F5F0E6] flex items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer ${
              currentPage === totalPages - 1
                ? "opacity-0 pointer-events-none"
                : "opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
            }`}
            aria-label="Next Chapter"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
