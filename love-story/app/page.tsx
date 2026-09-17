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
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev" | null>(null);
  const [targetPage, setTargetPage] = useState<number | null>(null);

  const totalPages = 6;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const triggerPageTurn = (direction: "next" | "prev") => {
    if (isTurning) return;
    if (direction === "next" && currentPage < totalPages - 1) {
      setIsTurning(true);
      setTurnDirection("next");
      setTargetPage(currentPage + 1);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsTurning(false);
        setTurnDirection(null);
        setTargetPage(null);
      }, 700);
    } else if (direction === "prev" && currentPage > 0) {
      setIsTurning(true);
      setTurnDirection("prev");
      setTargetPage(currentPage - 1);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsTurning(false);
        setTurnDirection(null);
        setTargetPage(null);
      }, 700);
    }
  };

  const pages = [
    <BookCover key="cover" onOpen={() => triggerPageTurn("next")} />,
    <ChapterOne key="ch1" />,
    <ChapterTwo key="ch2" />,
    <ChapterThree key="ch3" />,
    <ChapterFour key="ch4" />,
    <FinalPage key="final" />,
  ];

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        triggerPageTurn("next");
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        triggerPageTurn("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isTurning]);

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
    const isSwipeLeft = distance > 40;
    const isSwipeRight = distance < -40;

    if (isSwipeLeft) {
      triggerPageTurn("next");
    } else if (isSwipeRight) {
      triggerPageTurn("prev");
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getChapterIndicator = () => {
    if (currentPage === 0) return "THE STORY OF US";
    if (currentPage === 5) return "FINAL CHAPTER • 05";
    return `CHAPTER 0${currentPage} • 0${currentPage}`;
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-2 sm:p-6 md:p-10 relative overflow-hidden select-none">
      {/* Desk environment light vignette */}
      <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-black/10 pointer-events-none" />

      {/* Main Book Composition Outer Shadow Wrapper */}
      <div className="w-full max-w-5xl h-[80vh] sm:h-[82vh] max-h-[720px] min-h-[460px] sm:min-h-[520px] relative flex flex-col justify-between items-center z-10">
        {/* Physical Book Hardcover & Page Stack Frame */}
        <div
          className={`w-full h-full relative rounded-md overflow-hidden bg-[#1A1817] shadow-2xl transition-all duration-500 book-3d-container ${
            currentPage === 0 && !isTurning
              ? "max-w-xl mx-auto shadow-2xl"
              : "book-gutter book-page-stack-left book-page-stack-right"
          }`}
          style={{
            boxShadow:
              "0 30px 60px -15px rgba(20, 18, 16, 0.45), 0 15px 30px -10px rgba(0, 0, 0, 0.3)",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Spine Crease Line */}
          {currentPage > 0 || isTurning ? (
            <div className="book-spine-line" />
          ) : null}

          {/* Static / Active Base Page */}
          <div className="w-full h-full relative overflow-hidden">
            {!isTurning ? (
              <div className="w-full h-full">{pages[currentPage]}</div>
            ) : (
              /* 3D Page Turn Render Stage */
              <div className="w-full h-full relative book-3d-stage">
                {/* Underneath Spread */}
                <div className="absolute inset-0 w-full h-full flex">
                  {turnDirection === "next" ? (
                    <>
                      {/* Left side: current page left */}
                      <div className="w-1/2 h-full overflow-hidden relative">
                        {pages[currentPage]}
                      </div>
                      {/* Right side: target page right */}
                      <div className="w-1/2 h-full overflow-hidden relative">
                        {pages[targetPage!]}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left side: target page left */}
                      <div className="w-1/2 h-full overflow-hidden relative">
                        {pages[targetPage!]}
                      </div>
                      {/* Right side: current page right */}
                      <div className="w-1/2 h-full overflow-hidden relative">
                        {pages[currentPage]}
                      </div>
                    </>
                  )}
                </div>

                {/* Turning Flipper Leaf */}
                <div
                  className={`book-flipper-leaf ${
                    turnDirection === "next"
                      ? "book-flipper-right"
                      : "book-flipper-left"
                  }`}
                  style={{
                    transform:
                      turnDirection === "next"
                        ? "rotateY(-180deg)"
                        : "rotateY(180deg)",
                    transition:
                      "transform 700ms cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                  }}
                >
                  {/* Front Face of Turning Page */}
                  <div className="book-flipper-face">
                    <div
                      className="w-[200%] h-full relative"
                      style={{
                        marginLeft: turnDirection === "next" ? "-100%" : "0%",
                      }}
                    >
                      {pages[currentPage]}
                    </div>
                    <div className="flip-shadow-front opacity-60" />
                  </div>

                  {/* Back Face of Turning Page */}
                  <div className="book-flipper-face book-flipper-back">
                    <div
                      className="w-[200%] h-full relative"
                      style={{
                        marginLeft: turnDirection === "next" ? "0%" : "-100%",
                      }}
                    >
                      {pages[targetPage!]}
                    </div>
                    <div className="flip-shadow-back opacity-60" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* External Integrated Navigation Controls */}
        <div className="w-full max-w-5xl flex items-center justify-between pt-3 sm:pt-4 px-2 z-20">
          {/* Left Arrow Button */}
          <button
            onClick={() => triggerPageTurn("prev")}
            disabled={currentPage === 0 || isTurning}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1A1817]/85 text-[#F5F0E6] flex items-center justify-center backdrop-blur-md border border-white/15 transition-all duration-300 cursor-pointer ${
              currentPage === 0
                ? "opacity-0 pointer-events-none"
                : "opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 shadow-md"
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
          <div className="flex items-center space-x-3 sm:space-x-4 bg-[#1A1817]/85 text-[#F5F0E6] backdrop-blur-md px-4 sm:px-5 py-2 rounded-full border border-white/15 text-[9px] sm:text-xs tracking-[0.25em] font-sans uppercase shadow-md">
            <span>{getChapterIndicator()}</span>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => triggerPageTurn("next")}
            disabled={currentPage === totalPages - 1 || isTurning}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1A1817]/85 text-[#F5F0E6] flex items-center justify-center backdrop-blur-md border border-white/15 transition-all duration-300 cursor-pointer ${
              currentPage === totalPages - 1
                ? "opacity-0 pointer-events-none"
                : "opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 shadow-md"
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

