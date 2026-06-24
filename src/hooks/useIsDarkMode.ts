"use client";

import { useEffect, useState } from "react";

function getInitialDark() {
  if (typeof window === "undefined") return false; // SSR guard
  const saved = localStorage.getItem("theme");
  return saved === "dark" || document.documentElement.classList.contains("dark");
}

export function useIsDarkMode() {
  const [isDark, setIsDark] = useState(getInitialDark);

  useEffect(() => {
    const handler = (e: Event) => {
      setIsDark((e as CustomEvent).detail);
    };
    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, []);

  return isDark;
}