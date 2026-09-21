"use client";

import { FormEvent, useState } from "react";

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === "Sunset" || password === "sunset") {
      setIsLeaving(true);
      window.setTimeout(onUnlock, 450);
      return;
    }

    setPassword("");
    setMessage("It's okay, sayang. Try again.");
    setIsShaking(true);
    window.setTimeout(() => setIsShaking(false), 420);
  };

  return (
    <main
      className={`min-h-screen w-full flex items-center justify-center px-6 py-10 bg-[#F5F0E6] text-[#1A1817] paper-texture-fine transition-opacity duration-500 ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-md text-center animate-editorial-fade">
        <div className="w-10 h-[1px] bg-[#1A1817]/25 mx-auto mb-6" />
        <p className="font-serif italic text-base sm:text-lg text-[#78726A] leading-relaxed mt-5 max-w-xs mx-auto">
          Please enter the password here.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <label htmlFor="story-password" className="sr-only">
            Password
          </label>
          <input
            id="story-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setMessage("");
            }}
            placeholder="password"
            autoComplete="off"
            autoFocus
            className={`w-full max-w-xs border-b border-[#78726A]/45 bg-transparent px-3 py-3 text-center font-serif text-lg outline-none placeholder:text-[#78726A]/55 focus:border-[#1A1817] transition-colors ${
              isShaking ? "animate-password-shake" : ""
            }`}
          />
          <button
            type="submit"
            className="mt-3 rounded-full bg-[#1A1817] px-7 py-3 text-[#F5F0E6] font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#2C2825] active:scale-95 cursor-pointer"
          >
            Continue
          </button>
          <p
            aria-live="polite"
            className={`min-h-5 font-serif italic text-sm text-[#78726A] transition-opacity duration-300 ${
              message ? "opacity-100" : "opacity-0"
            }`}
          >
            {message}
          </p>
        </form>

        <div className="w-10 h-[1px] bg-[#1A1817]/20 mx-auto mt-7" />
      </div>
    </main>
  );
}