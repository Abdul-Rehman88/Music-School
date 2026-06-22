"use client";
import React from "react";
import { motion } from "motion/react";

type Message = { from: "student" | "instructor"; text: string };

// ===== Number of animated EQ bars in the waveform strip =====
const EQ_BAR_COUNT = 7;

export function EngagementPanel({ messages }: { messages: Message[] }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between p-4">
      {/* ===== Animated waveform / EQ strip ===== */}
      <div className="flex h-14 items-end justify-center gap-1.5">
        {Array.from({ length: EQ_BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            className="eq-bar w-1.5 rounded-full bg-white/85"
            style={{
              // ===== Stagger height + timing so bars don't move in sync =====
              height: `${28 + ((i * 13) % 42)}%`,
              animationDelay: `${i * 0.12}s`,
              animationDuration: `${0.8 + (i % 3) * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* ===== Chat-style feedback bubbles, fade/slide in on mount ===== */}
      <div className="mt-3 flex flex-1 flex-col justify-end gap-2 overflow-hidden">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.4 }}
            className={
              m.from === "instructor"
                ? "self-start max-w-[85%] rounded-xl rounded-bl-sm bg-white/90 px-3 py-1.5 text-xs leading-snug text-neutral-900"
                : "self-end max-w-[85%] rounded-xl rounded-br-sm bg-black/30 px-3 py-1.5 text-xs leading-snug text-white"
            }
          >
            {m.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}