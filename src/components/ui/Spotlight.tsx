'use client';

import { useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'dk' | 'lt';
type Phase = 'entering' | 'active' | 'leaving';

interface Particle {
  side: 0 | 1;
  t: number;
  lateral: number;
  speed: number;
  opacity: number;
  size: number;
  wobble: number;
  wobbleSpeed: number;
}

interface PaletteEntry {
  beamOuter: [number, number, number, number];
  beamInner: [number, number, number, number];
  fixture: string;
  lensOn: string;
  centerGlow: [number, number, number, number];
  floorPool: [number, number, number, number];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_PARTICLES = 60;

const PALETTES: Record<Mode, PaletteEntry> = {
  dk: {
    beamOuter: [248, 25, 45, 0.28],
    beamInner: [36, 65, 50, 0.45],
    fixture: '#222133',
    lensOn: '#ffd991',
    centerGlow: [250, 30, 55, 0.18],
    floorPool: [250, 25, 50, 0.25],
  },
  lt: {
    beamOuter: [270, 55, 45, 0.4],
    beamInner: [36, 80, 48, 0.65],
    fixture: '#7a7899',
    lensOn: '#ffd060',
    centerGlow: [270, 50, 55, 0.22],
    floorPool: [270, 55, 45, 0.3],
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SpotlightProps {
  /** 'dk' = dark mode, 'lt' = light mode. Default: 'dk' */
  mode?: Mode;
  className?: string;
}

// ─── Helpers (defined outside component, no closure over state) ───────────────

function getHsla(
  [h, s, l, a]: [number, number, number, number],
  opacityModifier = 1
) {
  return `hsla(${h}, ${s}%, ${l}%, ${a * opacityModifier})`;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function makeParticle(randomY: boolean): Particle {
  return {
    side: Math.random() < 0.5 ? 0 : 1,
    t: randomY ? Math.random() * 0.95 : 0.02 + Math.random() * 0.1,
    lateral: (Math.random() * 2 - 1) * 0.7,
    speed: 0.0007 + Math.random() * 0.001,
    opacity: 0.15 + Math.random() * 0.55,
    size: 0.7 + Math.random() * 1.5,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.018 + Math.random() * 0.025,
  };
}

function getParticlePos(
  p: Particle,
  W: number,
  H: number
): { x: number; y: number } {
  const isLeft = p.side === 0;
const { margin } = getResponsiveValues(W);
  const fixX = isLeft ? margin : W - margin;
  const fixY = 20;
  const sweepAngle = isLeft ? (33 * Math.PI) / 180 : (147 * Math.PI) / 180;
  const outerSpread = (18 * Math.PI) / 180;
  const fullLength = Math.min(W, H) * 1.35;
  const beamLen = fullLength * p.t;
  const cx_ = fixX + Math.cos(sweepAngle) * beamLen;
  const cy_ = fixY + Math.sin(sweepAngle) * beamLen;
  const perpX = -Math.sin(sweepAngle);
  const perpY = Math.cos(sweepAngle);
  const halfWidth = Math.tan(outerSpread) * beamLen * 0.85;
  const lat = p.lateral + Math.sin(p.wobble) * 0.12;
  return {
    x: cx_ + perpX * lat * halfWidth,
    y: cy_ + perpY * lat * halfWidth,
  };
}

// responsive values based on screen width (mobile/tablet/desktop breakpoints)
function getResponsiveValues(W: number) {
  if (W <= 480) {
    // Mobile
    return {
      margin: W * 0.025,           // fixture X — 8% from edge
      endY: 13,                   // fixture drop Y
      sweepLeft: 65,              // beam angle degrees
      sweepRight: 115,
      outerSpread: 16,            // cone width degrees
      innerSpread: 5,
      beamLengthMult: 1.1,        // how long the beam is
    };
  } else if (W <= 768) {
    // Tablet
    return {
      margin: W * 0.02,
      endY: 14,
      sweepLeft: 60,
      sweepRight: 120,
      outerSpread: 16,
      innerSpread: 4.5,
      beamLengthMult: 0.9,
    };
  } else {
    // Desktop
    return {
      margin: W * 0.01,
      endY: 15,
      sweepLeft: 40,
      sweepRight: 141,
      outerSpread: 18,
      innerSpread: 5,
      beamLengthMult: 1.2,
    };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Spotlight({ mode = 'dk', className = '' }: SpotlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Mutable animation state — lives in a ref so it never triggers re-renders
  const stateRef = useRef({
    phase: 'entering' as Phase,
    fixtureDrop: 0,
    lightTravel: 0,
    beamOpacity: 0,
    particles: [] as Particle[],
    curMode: mode,
  });

  const initParticles = useCallback(() => {
    stateRef.current.particles = Array.from({ length: MAX_PARTICLES }, () =>
      makeParticle(true)
    );
  }, []);

  const restart = useCallback(() => {
    const s = stateRef.current;
    s.phase = 'entering';
    s.fixtureDrop = 0;
    s.lightTravel = 0;
    s.beamOpacity = 0;
    initParticles();
  }, [initParticles]);

  // Keep curMode in sync when prop changes
  useEffect(() => {
    stateRef.current.curMode = mode;
    restart();
  }, [mode, restart]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    restart();

    // ── Draw helpers ─────────────────────────────────────────────────────────

    function drawParticles(W: number, H: number, globalOpacity: number) {
      if (!ctx || globalOpacity < 0.05) return;
      const { curMode, particles } = stateRef.current;
      const isDark = curMode === 'dk';

      particles.forEach((p, i) => {
        p.t -= p.speed;
        p.wobble += p.wobbleSpeed;

        if (p.t < 0) {
          particles[i] = makeParticle(false);
          particles[i].t = 0.88 + Math.random() * 0.1;
          return;
        }

        const pos = getParticlePos(p, W, H);
        const edgeFade =
          Math.min(p.t / 0.08, 1) * Math.min((0.97 - p.t) / 0.05, 1);
        const alpha = p.opacity * globalOpacity * edgeFade;
        if (alpha < 0.01) return;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = isDark
          ? 'rgba(255, 220, 160, 1)'
          : 'rgba(242, 172, 41, 1)';
        ctx.shadowColor = isDark ? '#ffd090' : '#f7930a';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    function drawSpotlight(
  side: 'left' | 'right',
  W: number,
  H: number,
  fDrop: number,
  lTravel: number,
  opacity: number
) {
  if (!ctx) return;
  const { curMode } = stateRef.current;
  const pal = PALETTES[curMode];
  const isLeft = side === 'left';
 
  const rv = getResponsiveValues(W);
 
  const margin  = rv.margin;
  const fixX    = isLeft ? margin : W - margin;
  const startY  = -60;
  const fixY    = startY + (rv.endY - startY) * easeOutCubic(fDrop);
  const fixRadius = 16;
 
  const sweepAngle = isLeft
    ? (rv.sweepLeft  * Math.PI) / 180
    : (rv.sweepRight * Math.PI) / 180;
 
  const fullLength  = Math.min(W, H) * rv.beamLengthMult;
  const beamLength  = fullLength * easeInOutSine(lTravel);
 
  if (opacity > 0.01 && fDrop > 0.5 && beamLength > 2) {
    ctx.save();
 
    // Outer cone
    const outerSpread = (rv.outerSpread * Math.PI) / 180;
    const oLeftAng  = sweepAngle - outerSpread;
    const oRightAng = sweepAngle + outerSpread;
 
    const beamGrd = ctx.createRadialGradient(fixX, fixY, fixRadius, fixX, fixY, beamLength);
    beamGrd.addColorStop(0,   getHsla(pal.beamOuter, opacity * 0.9));
    beamGrd.addColorStop(0.3, getHsla(pal.beamOuter, opacity * 0.6));
    beamGrd.addColorStop(0.7, getHsla(pal.beamOuter, opacity * 0.2));
    beamGrd.addColorStop(1,   'rgba(0,0,0,0)');
 
    ctx.beginPath();
    ctx.moveTo(fixX, fixY);
    ctx.lineTo(fixX + Math.cos(oLeftAng)  * beamLength, fixY + Math.sin(oLeftAng)  * beamLength);
    ctx.lineTo(fixX + Math.cos(oRightAng) * beamLength, fixY + Math.sin(oRightAng) * beamLength);
    ctx.closePath();
    ctx.fillStyle = beamGrd;
    ctx.fill();
 
    // Inner warm core
    const innerSpread = (rv.innerSpread * Math.PI) / 180;
    const iLeftAng  = sweepAngle - innerSpread;
    const iRightAng = sweepAngle + innerSpread;
 
    const coreGrd = ctx.createRadialGradient(fixX, fixY, fixRadius, fixX, fixY, beamLength * 0.85);
    coreGrd.addColorStop(0,   getHsla(pal.beamInner, opacity));
    coreGrd.addColorStop(0.4, getHsla(pal.beamInner, opacity * 0.4));
    coreGrd.addColorStop(1,   'rgba(0,0,0,0)');
 
    ctx.beginPath();
    ctx.moveTo(fixX, fixY);
    ctx.lineTo(fixX + Math.cos(iLeftAng)  * beamLength, fixY + Math.sin(iLeftAng)  * beamLength);
    ctx.lineTo(fixX + Math.cos(iRightAng) * beamLength, fixY + Math.sin(iRightAng) * beamLength);
    ctx.closePath();
    ctx.fillStyle = coreGrd;
    ctx.fill();
 
    ctx.restore();
  }
 
  // Hardware housing — angle must match sweepAngle so it rotates with the beam
  ctx.save();
  ctx.translate(fixX, fixY);
  ctx.rotate(sweepAngle + Math.PI / 2);  // was hardcoded 33/147, now uses rv
 
  ctx.fillStyle = pal.fixture;
  ctx.beginPath();
  
  ctx.roundRect(-12, -32, 24, 34, [4, 4, 1, 1]);
  ctx.fill();
 
  if (opacity > 0.01) {
    ctx.fillStyle = pal.lensOn;
    ctx.shadowColor = pal.lensOn;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.ellipse(0, 2, 11, 4, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

    // ── Tick loop ─────────────────────────────────────────────────────────────

    function tick() {
      if (!canvas || !wrap || !ctx) return;

      const W = wrap.offsetWidth;
      const H = wrap.offsetHeight;
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      ctx.clearRect(0, 0, W, H);

      const s = stateRef.current;
      const pal = PALETTES[s.curMode];

      // Advance animation phase
      if (s.phase === 'entering') {
        if (s.fixtureDrop < 1) {
          s.fixtureDrop = Math.min(s.fixtureDrop + 0.035, 1);
        } else {
          s.lightTravel = Math.min(s.lightTravel + 0.007, 1);
          s.beamOpacity = Math.min(s.beamOpacity + 0.012, 1);
          if (s.lightTravel >= 1 && s.beamOpacity >= 1) {
            s.phase = 'active';
          }
        }
      } else if (s.phase === 'leaving') {
        s.lightTravel = Math.max(s.lightTravel - 0.04, 0);
        s.beamOpacity = Math.max(s.beamOpacity - 0.04, 0);
        if (s.lightTravel === 0) {
          s.fixtureDrop = Math.max(s.fixtureDrop - 0.03, 0);
        }
      }

      // 1. Center ambient bloom
      if (s.beamOpacity > 0.01) {
        const centerGrd = ctx.createRadialGradient(
          W / 2, H / 2, 0,
          W / 2, H / 2, 180
        );
        centerGrd.addColorStop(0, getHsla(pal.centerGlow, s.beamOpacity));
        centerGrd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = centerGrd;
        ctx.fillRect(0, 0, W, H);
      }

      // 2. Spotlights
      drawSpotlight('left', W, H, s.fixtureDrop, s.lightTravel, s.beamOpacity);
      drawSpotlight('right', W, H, s.fixtureDrop, s.lightTravel, s.beamOpacity);

      // 3. Particles
      drawParticles(W, H, s.beamOpacity);

      // 4. Floor pool reflection
      if (s.beamOpacity > 0.01 && s.fixtureDrop > 0.5) {
        const floorGrd = ctx.createRadialGradient(
          W / 2, H - 20, 10,
          W / 2, H - 20, W * 0.45
        );
        floorGrd.addColorStop(0, getHsla(pal.floorPool, s.beamOpacity * 0.8));
        floorGrd.addColorStop(0.5, getHsla(pal.floorPool, s.beamOpacity * 0.2));
        floorGrd.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(W / 2, H - 15, W * 0.45, 25, 0, 0, Math.PI * 2);
        ctx.fillStyle = floorGrd;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    // ── Intersection Observer — pause when off-screen ─────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          restart();
          tick();
        } else {
          stateRef.current.phase = 'leaving';
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(wrap);

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!canvas || !wrap) return;
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    // Initial boot
    canvas.width = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [restart]);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}