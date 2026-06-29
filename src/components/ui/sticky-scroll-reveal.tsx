"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Lenis from "lenis";
import { lenisInstance } from "@/components/ui/SmoothScrollProvider";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  // ===== Manual scroll hand-off so the outer page scroll never "sticks" =====
useEffect(() => {
  const el = ref.current;
  if (!el) return;

  let targetScroll = el.scrollTop;
  let currentScroll = el.scrollTop;
  let rafId: number;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = () => {
    currentScroll = lerp(currentScroll, targetScroll, 0.1);
    el.scrollTop = currentScroll;
    rafId = requestAnimationFrame(animate);
  };
  rafId = requestAnimationFrame(animate);

  const handleWheel = (e: WheelEvent) => {
    const { scrollHeight, clientHeight } = el;
    const isAtTop = targetScroll <= 0;
    const isAtBottom = targetScroll >= scrollHeight - clientHeight - 1;
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    if ((isAtBottom && scrollingDown) || (isAtTop && scrollingUp)) {
      e.preventDefault();
      if (lenisInstance) {
        lenisInstance.scrollTo(lenisInstance.scroll + e.deltaY, {
          immediate: false,
          duration: 0.6,
        });
      }
      return;
    }

    e.preventDefault();
    targetScroll = Math.max(0, Math.min(scrollHeight - clientHeight, targetScroll + e.deltaY));
  };

  el.addEventListener("wheel", handleWheel, { passive: false });
  return () => {
    el.removeEventListener("wheel", handleWheel);
    cancelAnimationFrame(rafId);
  };
}, []);

  const linearGradients = [
    "linear-gradient(135deg, #7c3aed, #4f46e5)",
    "linear-gradient(135deg, #f97316, #eab308)",
    "linear-gradient(135deg, #06b6d4, #7c3aed)",
    "linear-gradient(135deg, #ec4899, #7c3aed)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      className="no-scrollbar relative flex justify-center h-136 overflow-y-auto rounded-md md:h-130"
      ref={ref}
      data-lenis-prevent

    >
      <div className="div relative flex w-full items-start pr-0 md:pr-6">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-10 md:my-10">
              <div
                className="mb-5 block h-56 w-full overflow-hidden rounded-md md:hidden"
                style={{ background: linearGradients[index % linearGradients.length] }}
              >
                {item.content ?? null}
              </div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-secondary-heading font-medium text-secondary-heading-light dark:text-secondary-heading-dark md:w-[480] lg:w-full"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-text-light dark:text-text-dark mt-5 mb-28 max-w-lg text-secondary md:mb-38"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-60 w-120 overflow-hidden rounded-md bg-white md:block",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};