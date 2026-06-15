"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved === "dark" || document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const nowDark = html.classList.contains("dark");
    setIsDark(nowDark);
    localStorage.setItem("theme", nowDark ? "dark" : "light");

    // trigger spin
    setSpinning(true);
    setTimeout(() => setSpinning(false), 400);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-zinc-800 dark:bg-white/90 border border-zinc-700 dark:border-zinc-200 transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      <span
        className={`text-xl block transition-transform duration-300 ${
          spinning ? "rotate-360" : "rotate-0"
        }`}
      >
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}