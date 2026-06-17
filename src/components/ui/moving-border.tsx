"use client";

import React, { useId, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  fogColor = "#7F77DD",
  fogColorDark = "#0ea5e9",
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  fogColor?: string;
  fogColorDark?: string;
  [key: string]: any;
}) {
  const filterId = useId().replace(/:/g, "");

  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-px text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 dark:bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8] bg-[radial-gradient(#7F77DD_80%,transparent_60%)]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "group relative flex h-full w-full items-center justify-center overflow-hidden border border-slate-800 bg-slate-900/80 text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {/* noise filters for the gas texture, scoped to this instance */}
        <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
          <defs>
            <filter id={`gasNoise1-${filterId}`} x="-60%" y="-60%" width="220%" height="220%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.02"
                numOctaves="2"
                seed="7"
                result="n1"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.012 0.02;0.02 0.012;0.012 0.02"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="n1"
                scale="26"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id={`gasNoise2-${filterId}`} x="-60%" y="-60%" width="220%" height="220%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018 0.01"
                numOctaves="2"
                seed="13"
                result="n2"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.018 0.01;0.01 0.018;0.018 0.01"
                  dur="8.5s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="n2"
                scale="26"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* gas corner-fill layer */}
        <div
          className="gas-layer pointer-events-none absolute inset-0"
          style={
            {
              "--fog-color": fogColor,
              "--fog-color-dark": fogColorDark,
              "--gas-filter-1": `url(#gasNoise1-${filterId})`,
              "--gas-filter-2": `url(#gasNoise2-${filterId})`,
            } as React.CSSProperties
          }
        >
          <span className="gas-cone gas-cone-tl" />
          <span className="gas-cone gas-cone-tr" />
          <span className="gas-cone gas-cone-bl" />
          <span className="gas-cone gas-cone-br" />
        </div>

        <span className="relative z-10">{children}</span>
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y,
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};