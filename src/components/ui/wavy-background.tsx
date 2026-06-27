"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = createNoise3D();
    let nt = 0;
    // CSS-pixel size of the actual container (not the window)
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      // Guard against 0 size (e.g. display:none ancestors, SSR hydration tick)
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for perf
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.scale(dpr, dpr);
      ctx.filter = `blur(${blur}px)`;
    };

    const drawWave = (n: number) => {
      nt += getSpeed();

      // Scale amplitude with container height so short (mobile) and
      // tall (desktop) sections both get waves filling the space,
      // instead of a fixed 100px band stuck in the vertical middle.
      const amplitude = Math.max(20, h * 0.18);
      // Desktop (lg breakpoint and up) gets a collapsed/tighter line spread.
      // Mobile and tablet (which look similar to each other) keep the
      // original wider spread.
      const isDesktop = w >= 1024;
      const spreadTop = isDesktop ? h * 0.3 : h * 0.2;
      const spreadRange = isDesktop ? h * 0.4 : h * 0.6;

      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        const baseline = spreadTop + (n > 1 ? (spreadRange * i) / (n - 1) : spreadRange / 2);

        for (let x = 0; x <= w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * amplitude;
          ctx.lineTo(x, y + baseline);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      if (!isRunningRef.current) return;
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    };

    const start = () => {
      if (isRunningRef.current) return; // already looping, don't double-schedule
      isRunningRef.current = true;
      render();
    };

    const stop = () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animationIdRef.current);
    };

    resize();
    start();

    // Container-based resize (catches viewport resize AND container
    // resizing from responsive padding/content changes, e.g. orientation
    // change on tablets, dynamic mobile browser chrome, etc.)
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrapper);

    // Pause the RAF loop when the section is scrolled off-screen, and
    // — critically — resume it when it scrolls back into view. The
    // previous version only ever stopped the loop and had no way to
    // restart it, so any section below the fold never animated at all.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(wrapper);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundFill, colors, waveWidth, blur, waveOpacity, speed]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative w-full flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      {/* overflow-hidden lives ONLY here, around the canvas, so the
          Safari CSS-blur bleed is contained without clipping tooltip
          popups or other children that intentionally escape the box */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas
          className="absolute inset-0 z-0"
          ref={canvasRef}
          id="canvas"
          style={{
            ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
          }}
        />
      </div>
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};