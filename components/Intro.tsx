"use client";

import { useEffect, useState } from "react";

const NAME = "Hongchray Song";
const ROLE = "Full-stack Web Developer";

const DURATION_MS = 3400; // how long the loading scene plays
const EXIT_MS = 900; // zoom-out / fade duration

const FACES = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(-90deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

// Fixed star positions (no Math.random, so server and client always match)
const STARS = Array.from({ length: 48 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 61 + 7) % 100,
  size: 1 + (i % 3),
  delay: ((i * 13) % 30) / 10,
}));

function Cube({
  size,
  rgb,
  animation,
}: {
  size: number;
  rgb: string; // e.g. "94,194,168"
  animation: string;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        transformStyle: "preserve-3d",
        animation,
      }}
    >
      {FACES.map((face) => (
        <div
          key={face}
          className="absolute inset-0"
          style={{
            transform: `${face} translateZ(${size / 2}px)`,
            border: `1px solid rgba(${rgb},0.8)`,
            background: `rgba(${rgb},0.05)`,
            boxShadow: `inset 0 0 18px rgba(${rgb},0.25)`,
          }}
        />
      ))}
    </div>
  );
}

function Ring({
  size,
  rgb,
  tilt,
  duration,
  reverse,
}: {
  size: number;
  rgb: string;
  tilt: string;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        transformStyle: "preserve-3d",
        transform: tilt,
      }}
    >
      <div
        className="relative h-full w-full rounded-full"
        style={{
          border: `1px solid rgba(${rgb},0.55)`,
          animation: `intro-orbit ${duration}s linear infinite ${
            reverse ? "reverse" : "normal"
          }`,
        }}
      >
        {/* moon travelling along the ring */}
        <span
          className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ boxShadow: `0 0 12px 3px rgba(${rgb},0.8)` }}
        />
      </div>
    </div>
  );
}

export default function Intro({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Respect reduced-motion: skip the animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    let raf = 0;
    let exitTimer = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      // ease-out so the counter slows near 100
      setProgress(Math.round((1 - Math.pow(1 - p, 2)) * 100));

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        exitTimer = window.setTimeout(onDone, EXIT_MS);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
    };
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden text-[#eef1f4]"
      style={{
        background:
          "radial-gradient(circle at 50% 38%, #172230 0%, #0a0e14 70%)",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.6)" : "scale(1)",
        transition: `opacity ${EXIT_MS}ms ease-in, transform ${EXIT_MS}ms cubic-bezier(0.7, 0, 0.84, 0)`,
      }}
    >
      <style>{`
        @keyframes intro-spin-a {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to   { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes intro-spin-b {
          from { transform: rotateX(360deg) rotateY(0deg) rotateZ(0deg); }
          to   { transform: rotateX(0deg) rotateY(360deg) rotateZ(360deg); }
        }
        @keyframes intro-orbit {
          from { transform: rotateZ(0deg); }
          to   { transform: rotateZ(360deg); }
        }
        @keyframes intro-planet {
          0%, 100% { box-shadow: 0 0 40px 6px rgba(94,194,168,.45), inset -14px -14px 28px rgba(5,15,20,.8); }
          50%      { box-shadow: 0 0 64px 12px rgba(94,194,168,.65), inset -14px -14px 28px rgba(5,15,20,.8); }
        }
        @keyframes intro-twinkle {
          0%, 100% { opacity: .15; }
          50%      { opacity: .9; }
        }
        @keyframes intro-letter {
          from { opacity: 0; transform: translateY(24px) rotateX(-70deg); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0) rotateX(0deg); filter: blur(0); }
        }
        @keyframes intro-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: 0.15,
            animation: `intro-twinkle 3s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* 3D scene */}
      <div
        className="relative h-[300px] w-[300px] sm:h-[360px] sm:w-[360px]"
        style={{ perspective: "900px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-18deg)",
          }}
        >
          {/* Planet */}
          <div
            className="absolute left-1/2 top-1/2 h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 32% 30%, #b6f5e3 0%, #4fb89d 38%, #14463f 72%, #0a1f24 100%)",
              animation: "intro-planet 2.4s ease-in-out infinite",
            }}
          />

          {/* Orbit rings */}
          <Ring
            size={230}
            rgb="94,194,168"
            tilt="rotateX(72deg) rotateY(-12deg)"
            duration={5}
          />
          <Ring
            size={290}
            rgb="139,124,246"
            tilt="rotateX(68deg) rotateY(48deg)"
            duration={8}
            reverse
          />

          {/* Wireframe cubes */}
          <Cube
            size={130}
            rgb="94,194,168"
            animation="intro-spin-a 9s linear infinite"
          />
          <Cube
            size={210}
            rgb="139,124,246"
            animation="intro-spin-b 14s linear infinite"
          />
        </div>
      </div>

      {/* Name */}
      <h1
        className="mt-6 flex text-4xl font-semibold tracking-tight sm:text-6xl"
        style={{ perspective: "600px" }}
      >
        {NAME.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: 0,
              animation: `intro-letter 650ms cubic-bezier(0.2, 0.7, 0.2, 1) ${
                500 + i * 70
              }ms forwards`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <p
        className="mt-3 text-base text-[#9fb0c0] sm:text-lg"
        style={{
          opacity: 0,
          animation: "intro-fade 700ms ease-out 1700ms forwards",
        }}
      >
        {ROLE}
      </p>

      {/* Progress */}
      <div className="absolute bottom-10 flex w-56 flex-col items-center gap-3 sm:w-72">
        <div className="h-px w-full bg-[#2c3744]">
          <div
            className="h-px bg-gradient-to-r from-[#8b7cf6] to-[#5ec2a8]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm tabular-nums text-[#7f91a3]">{progress}%</span>
      </div>
    </div>
  );
}