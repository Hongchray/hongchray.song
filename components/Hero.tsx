"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useLang } from "@/context/LangContext";
import { personal } from "@/lib/data";

type TerminalLine = {
  cmd: string;
  out: string;
};

type HistoryLine = {
  cmd: string;
  out: string;
};

function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="transition-transform duration-200 group-hover:translate-y-0.5"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3D BACKGROUND HELPERS                                               */
/* ------------------------------------------------------------------ */

/**
 * Solid glass-like cube made from 6 faces, rotating in 3D.
 */
function GlassCube({
  size,
  duration,
  reverse = false,
  tone = "accent",
}: {
  size: number;
  duration: number;
  reverse?: boolean;
  tone?: "accent" | "accent2";
}) {
  const half = size / 2;

  const faces = [
    `translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  const faceClass =
    tone === "accent"
      ? "border-2 border-accent/60 bg-gradient-to-br from-accent/25 to-accent/5 shadow-[0_0_24px_rgba(255,255,255,0.04)]"
      : "border-2 border-accent2/60 bg-gradient-to-br from-accent2/25 to-accent2/5 shadow-[0_0_24px_rgba(255,255,255,0.04)]";

  return (
    <motion.div
      className="relative"
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: reverse ? [360, 0] : [0, 360],
        rotateY: reverse ? [0, -360] : [0, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {faces.map((transform, i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-[4px] ${faceClass}`}
          style={{ transform, backfaceVisibility: "visible" }}
        />
      ))}
    </motion.div>
  );
}

/**
 * Gyroscope: three crossing rings spinning on different axes.
 */
function Gyroscope({
  size,
  duration,
}: {
  size: number;
  duration: number;
}) {
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-accent/60"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: [0, 360] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[8%] rounded-full border-2 border-accent2/60"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: duration * 1.3, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[16%] rounded-full border-2 border-accent/50"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateZ: [0, 360], rotateX: [60, 420] }}
        transition={{ duration: duration * 1.7, repeat: Infinity, ease: "linear" }}
      />
      {/* Core orb */}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_currentColor] text-accent" />
    </div>
  );
}

/**
 * 3D glowing line (beam).
 * Two crossing planes keep it visible from every angle,
 * and it spins around its center so it swings in 3D.
 * End nodes glow and move through 3D space with the line.
 */
function BeamLine({
  length,
  thickness,
  duration,
  tone,
  reverse = false,
  reduced,
}: {
  length: number;
  thickness: number;
  duration: number;
  tone: "accent" | "accent2";
  reverse?: boolean;
  reduced: boolean | null;
}) {
  const colorClass = tone === "accent" ? "text-accent" : "text-accent2";
  const bgClass = tone === "accent" ? "bg-accent" : "bg-accent2";

  const planeStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: -thickness / 2,
    width: length,
    height: thickness,
    borderRadius: thickness,
    background:
      "linear-gradient(90deg, transparent 0%, currentColor 18%, currentColor 82%, transparent 100%)",
    boxShadow: "0 0 14px currentColor",
    backfaceVisibility: "visible",
  };

  return (
    <motion.div
      className={`relative ${colorClass}`}
      style={{
        width: length,
        height: 0,
        transformStyle: "preserve-3d",
      }}
      animate={
        reduced
          ? undefined
          : {
              rotateY: reverse ? [360, 0] : [0, 360],
              rotateX: reverse ? [0, -360] : [0, 360],
            }
      }
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {/* Plane A */}
      <div style={planeStyle} />

      {/* Plane B (crossed) */}
      <div style={{ ...planeStyle, transform: "rotateX(90deg)" }} />

      {/* End nodes */}
      <div
        className={`absolute rounded-full ${bgClass}`}
        style={{
          left: -thickness * 2,
          top: -thickness * 2,
          width: thickness * 4,
          height: thickness * 4,
          boxShadow: "0 0 18px currentColor",
        }}
      />
      <div
        className={`absolute rounded-full ${bgClass}`}
        style={{
          left: length - thickness * 2,
          top: -thickness * 2,
          width: thickness * 4,
          height: thickness * 4,
          boxShadow: "0 0 18px currentColor",
        }}
      />
    </motion.div>
  );
}

/**
 * Layer that moves with the mouse at a given depth (parallax).
 */
function ParallaxLayer({
  x,
  y,
  depth,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  children: React.ReactNode;
}) {
  const moveX = useTransform(x, [-0.5, 0.5], [-depth, depth]);
  const moveY = useTransform(y, [-0.5, 0.5], [-depth, depth]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: moveX,
        y: moveY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

type Shape = {
  kind: "cube" | "gyro";
  top: string;
  left: string;
  size: number;
  depth: number;
  z: number;
  duration: number;
  reverse?: boolean;
  tone?: "accent" | "accent2";
};

const shapes: Shape[] = [
  { kind: "cube", top: "8%", left: "4%", size: 70, depth: 60, z: 120, duration: 20, tone: "accent" },
  { kind: "cube", top: "66%", left: "8%", size: 48, depth: 40, z: 40, duration: 26, reverse: true, tone: "accent2" },
  { kind: "gyro", top: "30%", left: "40%", size: 90, depth: 30, z: -80, duration: 14 },
  { kind: "cube", top: "74%", left: "48%", size: 80, depth: 80, z: 160, duration: 24, reverse: true, tone: "accent" },
  { kind: "gyro", top: "6%", left: "84%", size: 120, depth: 55, z: 60, duration: 12 },
  { kind: "cube", top: "60%", left: "90%", size: 40, depth: 25, z: -60, duration: 30, tone: "accent2" },
];

type Beam = {
  top: string;
  left: string;
  length: number; // px
  thickness: number; // px
  angle: number; // base rotation on screen (deg)
  z: number;
  depth: number;
  duration: number;
  reverse?: boolean;
  tone: "accent" | "accent2";
};

const beams: Beam[] = [
  { top: "22%", left: "14%", length: 220, thickness: 3, angle: -25, z: 100, depth: 50, duration: 16, tone: "accent" },
  { top: "52%", left: "22%", length: 300, thickness: 2, angle: 15, z: -40, depth: 30, duration: 22, reverse: true, tone: "accent2" },
  { top: "14%", left: "58%", length: 260, thickness: 3, angle: 35, z: 140, depth: 70, duration: 18, tone: "accent" },
  { top: "82%", left: "66%", length: 340, thickness: 2, angle: -20, z: 60, depth: 45, duration: 24, reverse: true, tone: "accent2" },
  { top: "44%", left: "78%", length: 200, thickness: 3, angle: 60, z: -80, depth: 25, duration: 20, tone: "accent" },
  { top: "88%", left: "18%", length: 240, thickness: 2, angle: -40, z: 120, depth: 55, duration: 15, reverse: true, tone: "accent2" },
];

export default function Hero() {
  const { t, locale } = useLang();
  const prefersReducedMotion = useReducedMotion();

  const lines = useMemo<TerminalLine[]>(
    () => [
      {
        cmd: "whoami",
        out: locale === "km" ? personal.nameKm : personal.name,
      },
      {
        cmd: "role --current",
        out: t("hero.role"),
      },
      {
        cmd: "location",
        out: t("hero.location"),
      },
    ],
    [locale, t]
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [typedCommand, setTypedCommand] = useState("");
  const [typedOutput, setTypedOutput] = useState("");

  const [phase, setPhase] = useState<
    "typing-command" | "typing-output" | "pause" | "clearing"
  >("typing-command");

  const [terminalOpacity, setTerminalOpacity] = useState(1);

  const currentLine = lines[lineIndex];

  /*
   * 3D hover background: mouse tracking
   * mouseX / mouseY are normalized from -0.5 to 0.5
   */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 16, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const sceneRotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const sceneRotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  // Spotlight follows cursor (pixels)
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const smoothSpotX = useSpring(spotX, { stiffness: 120, damping: 22 });
  const smoothSpotY = useSpring(spotY, { stiffness: 120, damping: 22 });
  const spotOpacity = useMotionValue(0);
  const smoothSpotOpacity = useSpring(spotOpacity, {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    mouseX.set(px / rect.width - 0.5);
    mouseY.set(py / rect.height - 0.5);

    spotX.set(px);
    spotY.set(py);
    spotOpacity.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    spotOpacity.set(0);
  };

  /*
   * Reset terminal when language changes
   */
  useEffect(() => {
    setLineIndex(0);
    setHistory([]);
    setTypedCommand("");
    setTypedOutput("");
    setPhase("typing-command");
    setTerminalOpacity(1);
  }, [locale, lines]);

  /*
   * Terminal typing animation
   */
  useEffect(() => {
    if (!currentLine) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing-command") {
      if (typedCommand.length < currentLine.cmd.length) {
        timeout = setTimeout(() => {
          setTypedCommand(
            currentLine.cmd.slice(0, typedCommand.length + 1)
          );
        }, 65);
      } else {
        timeout = setTimeout(() => {
          setPhase("typing-output");
        }, 250);
      }
    }

    if (phase === "typing-output") {
      if (typedOutput.length < currentLine.out.length) {
        timeout = setTimeout(() => {
          setTypedOutput(
            currentLine.out.slice(0, typedOutput.length + 1)
          );
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setPhase("pause");
        }, 1200);
      }
    }

    if (phase === "pause") {
      timeout = setTimeout(() => {
        const completedLine: HistoryLine = {
          cmd: currentLine.cmd,
          out: currentLine.out,
        };

        setHistory((prev) => [...prev, completedLine]);

        setTypedCommand("");
        setTypedOutput("");

        if (lineIndex < lines.length - 1) {
          setLineIndex((prev) => prev + 1);
          setPhase("typing-command");
        } else {
          setPhase("clearing");
        }
      }, 500);
    }

    if (phase === "clearing") {
      setTerminalOpacity(0);

      timeout = setTimeout(() => {
        setHistory([]);
        setLineIndex(0);
        setTypedCommand("");
        setTypedOutput("");
        setTerminalOpacity(1);
        setPhase("typing-command");
      }, 650);
    }

    return () => clearTimeout(timeout);
  }, [
    currentLine,
    lineIndex,
    lines.length,
    phase,
    typedCommand,
    typedOutput,
  ]);

  /*
   * Scroll animation variants
   */
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const terminalVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const profileVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotate: 3,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      id="hero"
      className="relative overflow-hidden border-b border-border px-5 pb-20 pt-16 sm:pt-24 mt-[50px]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ============================================================ */}
      {/* 3D HOVER BACKGROUND (cubes, gyroscopes, 3D lines)            */}
      {/* ============================================================ */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ perspective: "1000px" }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            rotateX: prefersReducedMotion ? 0 : sceneRotateX,
            rotateY: prefersReducedMotion ? 0 : sceneRotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3D lines (beams) */}
          {beams.map((beam, i) => (
            <ParallaxLayer
              key={`beam-${i}`}
              x={smoothX}
              y={smoothY}
              depth={prefersReducedMotion ? 0 : beam.depth}
            >
              <div
                className="absolute"
                style={{
                  top: beam.top,
                  left: beam.left,
                  transform: `translateZ(${beam.z}px) rotateZ(${beam.angle}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <BeamLine
                  length={beam.length}
                  thickness={beam.thickness}
                  duration={beam.duration}
                  tone={beam.tone}
                  reverse={beam.reverse}
                  reduced={prefersReducedMotion}
                />
              </div>
            </ParallaxLayer>
          ))}

          {/* Cubes and gyroscopes */}
          {shapes.map((shape, i) => (
            <ParallaxLayer
              key={i}
              x={smoothX}
              y={smoothY}
              depth={prefersReducedMotion ? 0 : shape.depth}
            >
              <div
                className="absolute"
                style={{
                  top: shape.top,
                  left: shape.left,
                  transform: `translateZ(${shape.z}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{ y: [0, -18, 0] }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {shape.kind === "cube" ? (
                    <GlassCube
                      size={shape.size}
                      duration={shape.duration}
                      reverse={shape.reverse}
                      tone={shape.tone}
                    />
                  ) : (
                    <Gyroscope size={shape.size} duration={shape.duration} />
                  )}
                </motion.div>
              </div>
            </ParallaxLayer>
          ))}
        </motion.div>

        {/* Cursor spotlight */}
        <motion.div
          className="absolute left-0 top-0 -ml-48 -mt-48 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
          style={{
            x: smoothSpotX,
            y: smoothSpotY,
            opacity: smoothSpotOpacity,
          }}
        />
      </div>

      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent2/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT SIDE */}
        <div>
          {/* Status */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>

            {t("hero.status")}
          </motion.div>

          {/* Terminal */}
          <motion.div
            variants={terminalVariants}
            className="group overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/20"
          >
            {/* Window header */}
            <div
              className="
                flex items-center
                border-b border-border
                bg-surface2
                px-4 py-2.5
                transition-colors
                duration-300
                group-hover:bg-surface2/80
              "
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="
                    h-2.5 w-2.5 rounded-full bg-danger/70
                    transition-all duration-300
                    group-hover:scale-110
                  "
                />

                <span
                  className="
                    h-2.5 w-2.5 rounded-full bg-accent2/70
                    transition-all duration-300
                    group-hover:scale-110
                  "
                  style={{ transitionDelay: "50ms" }}
                />

                <span
                  className="
                    h-2.5 w-2.5 rounded-full bg-accent/70
                    transition-all duration-300
                    group-hover:scale-110
                  "
                  style={{ transitionDelay: "100ms" }}
                />
              </div>

              <div className="ml-3 flex-1 text-center font-mono text-[11px] text-muted">
                hongchray@portfolio:~
              </div>

              <div className="w-[52px]" />
            </div>

            {/* Terminal body */}
            <div
              className="relative min-h-[265px] overflow-hidden px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-sm"
              style={{
                opacity: terminalOpacity,
                transition: "opacity 500ms ease",
              }}
            >
              {/* Subtle terminal glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_45%)]" />

              <div className="relative z-10">
                {/* Previous commands */}
                {history.map((item, index) => (
                  <motion.div
                    key={`${item.cmd}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="mb-4"
                  >
                    <div className="text-muted">
                      <span className="text-accent">$</span>{" "}
                      {item.cmd}
                    </div>

                    <div className="pl-3 text-text">
                      {item.out}
                    </div>
                  </motion.div>
                ))}

                {/* Current command */}
                <div className="text-muted">
                  <span className="text-accent">$</span>{" "}
                  {typedCommand}

                  {/* Cursor */}
                  <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-accent" />
                </div>

                {/* Current output */}
                {typedOutput && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="min-h-[1.5rem] pl-3 text-text"
                  >
                    {typedOutput}
                  </motion.div>
                )}

                {/* Final prompt */}
                {phase === "pause" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    className="mt-4 text-muted"
                  >
                    <span className="text-accent">$</span>{" "}
                    <span className="inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-accent" />
                  </motion.div>
                )}
              </div>

              {/* Scan lines */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:100%_4px]" />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base text-muted sm:text-lg"
          >
            {t("hero.tagline")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className="focus-ring rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg"
            >
              {t("hero.cta_primary")}
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className="focus-ring rounded-md border border-border px-5 py-2.5 font-mono text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              {t("hero.cta_secondary")}
            </motion.a>
            <motion.a
              href="/HONGCHRAY SONG - Curriculum Vitae.pdf"
              download
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group focus-ring flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              <DownloadIcon />
              {t("hero.download_cv")}
            </motion.a>
          </motion.div>
        </div>

        {/* PROFILE */}
        <motion.div
          variants={profileVariants}
          className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-sm"
        >
          <motion.div
            className="relative aspect-[4/5] w-full max-w-[384px] overflow-hidden rounded-2xl border border-border bg-surface2"
            whileHover={{
              scale: 1.025,
              rotate: -1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <Image
              src="/mainpf.jpg"
              alt={personal.name}
              fill
              sizes="(max-width: 768px) 85vw, 384px"
              className="object-cover"
              quality={100}
              priority
            />

            <motion.div
              className="pointer-events-none absolute inset-0 bg-accent/10"
              animate={{
                opacity: [0, 0.15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              delay: 0.4,
              duration: 0.5,
            }}
            className="absolute -bottom-4 -right-4 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-[11px] text-accent shadow-lg"
          >
            {'{ status: "available" }'}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}