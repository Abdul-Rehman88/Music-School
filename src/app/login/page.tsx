"use client";

import Image from "next/image";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginSection() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative bg-secondary-light dark:bg-secondary-dark w-full flex flex-col gap-4 items-center justify-center h-hidden px-4 md:px-7.5 lg:px-12.5 py-12 pt-36">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl bg-primary-light dark:bg-primary-dark border border-black/5 dark:border-white/5">

        {/* Left: visual panel */}
        <div className="relative hidden md:block min-h-150">
          <Image
            src="/hero-studio.jpg"
            alt="Music studio session"
            fill
            className="object-cover grayscale-15 brightness-90"
            priority
          />    
          <div className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary-dark/40 to-transparent dark:from-primary-dark/90 dark:via-primary-dark/40" />
          <div className="absolute bottom-10 left-8 right-8 z-10">
            <span className="text-button uppercase tracking-[0.3em] text-badge-dark block mb-4">
              Elevate Your Sound
            </span>
            <h1 className="text-primary-heading font-bold text-primary-heading-dark">
              Master the Art of Modern Music.
            </h1>
          </div>
        </div>

        {/* Right: login form */}
        <div className="flex flex-col justify-center px-6 md:px-10 py-12 gap-8">
          <div>
            <h2 className="text-secondary-heading font-semibold mb-2 text-primary-heading-light dark:text-primary-heading-dark">
              Welcome Back
            </h2>
            <p className="text-primary text-text-light/70 dark:text-text-dark/70">
              Access your curriculum and studio sessions.
            </p>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-secondary uppercase tracking-widest text-text-light/40 dark:text-text-dark/40"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light/30 dark:text-text-dark/30" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@nocturne.edu"
                  className="w-full bg-alt-light dark:bg-alt-dark border border-black/5 dark:border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-primary text-text-light dark:text-text-dark focus:outline-none focus:border-badge-dark/50 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-secondary uppercase tracking-widest text-text-light/40 dark:text-text-dark/40"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-secondary text-badge-dark hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light/30 dark:text-text-dark/30" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-alt-light dark:bg-alt-dark border border-black/5 dark:border-white/5 rounded-xl pl-11 pr-11 py-3.5 text-primary text-text-light dark:text-text-dark focus:outline-none focus:border-badge-dark/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light/30 dark:text-text-dark/30 hover:text-text-light dark:hover:text-text-dark transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 text-secondary text-text-light/60 dark:text-text-dark/60 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-badge-dark"
              />
              Remember this device
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-cta-bg-light dark:bg-cta-bg-dark text-cta-text-light dark:text-cta-text-dark text-button uppercase tracking-widest font-bold hover:brightness-110 transition-all"
            >
              Sign In to Academy
            </button>
          </form>

          <div className="pt-6 border-t border-black/5 dark:border-white/5 text-center">
            <p className="text-secondary text-text-light/60 dark:text-text-dark/60">
              Not a member yet?{" "}
              <Link href="/signup" className="text-badge-light dark:text-badge-dark font-bold hover:underline">
                Apply for Admission
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}