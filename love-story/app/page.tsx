"use client";

// page.tsx — assembles all sections and manages YES state
import { useState } from "react";
import Hero from "@/components/Hero";
import HowWeMet from "@/components/HowWeMet";
import Moments from "@/components/Moments";
import WhatILike from "@/components/WhatILike";
import ThingsNeverSaid from "@/components/ThingsNeverSaid";
import OurStory from "@/components/OurStory";
import Question from "@/components/Question";
import Success from "@/components/Success";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleYes = () => {
    setShowSuccess(true);
    // lock scroll while overlay is open
    document.body.style.overflow = "hidden";
  };

  const handleReplay = () => {
    setShowSuccess(false);
    document.body.style.overflow = "";
    // scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <Hero />
      <HowWeMet />
      <Moments />
      <WhatILike />
      <ThingsNeverSaid />
      <OurStory />
      <Question onYes={handleYes} />

      {/* success overlay — rendered when YES is clicked */}
      {showSuccess && <Success onReplay={handleReplay} />}
    </main>
  );
}
