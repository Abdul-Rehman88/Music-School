"use client";

import { useState } from "react";
import { Music, User, Mail, Lock, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import ShaderBackground from "@/components/ui/ShaderBackground";
import  Link  from "next/link";
export default function SignupSection() {
  const [loading, setLoading] = useState(false);
  // ===== WebGL shader background =====
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 md:px-7.5 lg:px-12.5 py-12 pt-36 bg-primary-light dark:bg-primary-dark overflow-hidden">
      <ShaderBackground variant="fixed" opacity={1} />

      <div className="w-full max-w-2xl rounded-xl p-8 md:p-12 relative z-10 bg-secondary-light/80 dark:bg-secondary-dark/80 backdrop-blur-xl border border-black/10 dark:border-white/10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-alt-light dark:bg-alt-dark mb-6 border border-black/10 dark:border-white/10">
            <Music className="w-7 h-7 text-primary-heading-light dark:text-primary-heading-dark" />
          </div>

          <h1 className="text-primary-heading font-bold text-primary-heading-light dark:text-primary-heading-dark mb-2">
            Join the Academy
          </h1>

          {/* Waveform — uses .eq-bar / eq-bounce keyframes already in globals.css */}
          <div className="flex justify-center items-end gap-1 h-8 mb-4">
            <span className="eq-bar w-1.5 h-full bg-primary-heading-light/40 dark:bg-primary-heading-dark/40 rounded-full" style={{ animationDelay: "0.1s" }} />
            <span className="eq-bar w-1.5 h-[80%] bg-primary-heading-light/60 dark:bg-primary-heading-dark/60 rounded-full" style={{ animationDelay: "0.3s" }} />
            <span className="eq-bar w-1.5 h-full bg-primary-heading-light dark:bg-primary-heading-dark rounded-full" style={{ animationDelay: "0.5s" }} />
            <span className="eq-bar w-1.5 h-[80%] bg-primary-heading-light/60 dark:bg-primary-heading-dark/60 rounded-full" style={{ animationDelay: "0.2s" }} />
            <span className="eq-bar w-1.5 h-full bg-primary-heading-light/40 dark:bg-primary-heading-dark/40 rounded-full" style={{ animationDelay: "0.4s" }} />
          </div>

          <p className="text-primary text-text-light/70 dark:text-text-dark/70">
            Begin your journey towards musical mastery at Nocturne.
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
            <div>
              <label htmlFor="name" className="text-secondary uppercase tracking-widest text-text-light/40 dark:text-text-dark/40">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light/30 dark:text-text-dark/30" />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-primary-light dark:bg-primary-dark border border-black/10 dark:border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-primary text-text-light dark:text-text-dark placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:border-primary-heading-dark/50 transition-colors"
                />
              </div>
            </div>

            {/* age */}
            <div>
              <label htmlFor="name" className="text-secondary uppercase tracking-widest text-text-light/40 dark:text-text-dark/40">
              Age
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light/30 dark:text-text-dark/30" />
                <input
                  id="Age"
                  type='number'
                  placeholder="21"
                  className="w-full bg-primary-light dark:bg-primary-dark border border-black/10 dark:border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-primary text-text-light dark:text-text-dark placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:border-primary-heading-dark/50 transition-colors"
                />
              </div>

            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-secondary uppercase tracking-widest text-text-light/40 dark:text-text-dark/40">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light/30 dark:text-text-dark/30" />
              <input
                id="email"
                type="email"
                placeholder="artist@nocturne.edu"
                className="w-full bg-primary-light dark:bg-primary-dark border border-black/10 dark:border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-primary text-text-light dark:text-text-dark placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:border-primary-heading-dark/50 transition-colors"
              />
            </div>
          </div>

          {/* Password row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-secondary uppercase tracking-widest text-text-light/40 dark:text-text-dark/40">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light/30 dark:text-text-dark/30" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-primary-light dark:bg-primary-dark border border-black/10 dark:border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-primary text-text-light dark:text-text-dark placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:border-primary-heading-dark/50 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirm_password" className="text-secondary uppercase tracking-widest text-text-light/40 dark:text-text-dark/40">
                Confirm
              </label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light/30 dark:text-text-dark/30" />
                <input
                  id="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-primary-light dark:bg-primary-dark border border-black/10 dark:border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-primary text-text-light dark:text-text-dark placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:border-primary-heading-dark/50 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-center gap-3 text-primary text-text-light/60 dark:text-text-dark/60 py-2 cursor-pointer select-none">
            <input type="checkbox" className="w-5 h-5 rounded accent-primary-heading-dark" />
            I agree to the{" "}
            <Link href="#" className="text-primary-heading-dark hover:underline">
            terms and conditions
            </Link>
          </label>

          {/* Submit — group + gas-cone corner smoke, same technique as your MovingBorder button */}
          <div className="group relative">
            <span className="gas-cone gas-cone-tl" />
            <span className="gas-cone gas-cone-tr" />
            <span className="gas-cone gas-cone-bl" />
            <span className="gas-cone gas-cone-br" />
            <button
              type="submit"
              disabled={loading}
              className="relative z-10 w-full bg-cta-bg-light dark:bg-cta-bg-dark text-cta-text-light dark:text-cta-text-dark text-button uppercase tracking-widest font-bold py-4 rounded-lg flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary-heading-dark/10 hover:brightness-110 transition-all disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10 text-center">
          <p className="text-primary text-text-light/60 dark:text-text-dark/60">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-heading-dark font-semibold hover:underline">
              Sign In
            </Link >
          </p>
        </div>
      </div>
    </div>
  );
}