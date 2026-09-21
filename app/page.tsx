"use client";

import { useState, useEffect, useRef, TouchEvent } from "react";
import PasswordGate from "@/components/PasswordGate";
import BookCover from "@/components/BookCover";
import ChapterOne from "@/components/ChapterOne";
import ChapterTwo from "@/components/ChapterTwo";
import ChapterThree from "@/components/ChapterThree";
import ChapterFour from "@/components/ChapterFour";
import FinalPage from "@/components/FinalPage";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev" | null>(null);
  const [targetPage, setTargetPage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const totalPages = 6;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null ||
      touchStartY.current === null ||
      touchEndY.current === null
    ) {
      return;
    }
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;

    // Ignore vertical scrolling gestures or micro accidental touches
    if (Math.abs(deltaY) < Math.abs(deltaX) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        triggerPageTurn("next");
      } else {
        triggerPageTurn("prev");
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  if (!isUnlocked) {
    return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

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
          {(currentPage > 0 || isTurning) && !isMobile ? (
            <div className="book-spine-line" />
          ) : null}

          {/* Static / Active Base Page */}
          <div className="w-full h-full relative overflow-hidden">
            {!isTurning ? (
              <div className="w-full h-full">{pages[currentPage]}</div>
            ) : (
              /* 3D Page Turn Render Stage */
              <div className="w-full h-full relative book-3d-stage">
                {isMobile ? (
                  /* MOBILE 3D PAGE TURN: Full Physical Storybook Sheet Flip */
                  <>
                    {/* Underneath Target Page Sheet */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      {pages[targetPage!]}
                    </div>

                    {/* Flipping 3D Full Sheet */}
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "left center",
                        transform:
                          turnDirection === "next"
                            ? "rotateY(-180deg)"
                            : "rotateY(0deg)",
                        transition:
                          "transform 700ms cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                        zIndex: 30,
                      }}
                    >
                      {/* Front Face */}
                      <div className="book-flipper-face">
                        {pages[turnDirection === "next" ? currentPage : targetPage!]}
                        <div className="flip-shadow-front opacity-50" />
                      </div>

                      {/* Back Face */}
                      <div className="book-flipper-face book-flipper-back">
                        {pages[turnDirection === "next" ? targetPage! : currentPage]}
                        <div className="flip-shadow-back opacity-50" />
                      </div>
                    </div>
                  </>
                ) : (
                  /* DESKTOP 3D PAGE TURN: Dual Spread Spine Flip */
                  <>
                    {/* Underneath Spread */}
                    <div className="absolute inset-0 w-full h-full flex">
                      {turnDirection === "next" ? (
                        <>
                          <div className="w-1/2 h-full overflow-hidden relative">
                            {pages[currentPage]}
                          </div>
                          <div className="w-1/2 h-full overflow-hidden relative">
                            {pages[targetPage!]}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-1/2 h-full overflow-hidden relative">
                            {pages[targetPage!]}
                          </div>
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
                      {/* Front Face */}
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

                      {/* Back Face */}
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
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* External Integrated Navigation Controls & Creator Credit */}
        <div className="w-full max-w-5xl pt-3 sm:pt-4 px-2 z-20">
          <div className="flex items-center justify-between">
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

          {/* Creator Credit Signature */}
          <div className="text-center pt-2">
            <p className="font-serif italic text-[10px] sm:text-xs text-[#78726A]/85 tracking-[0.2em] uppercase">
              by Kindi
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


