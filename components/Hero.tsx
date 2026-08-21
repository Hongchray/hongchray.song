"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
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
export default function Hero() {
  const { t, locale } = useLang();

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
   *
   * whileInView will trigger the animation every time
   * the section enters the viewport.
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
      className="bg-dot-grid relative overflow-hidden border-b border-border px-5 pb-20 pt-16 sm:pt-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
      }}
    >
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

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
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
              href="/cv.pdf"
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
            className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface2"
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
              src="/profile-photo.png"
              alt={personal.name}
              fill
              sizes="(max-width: 1024px) 320px, 384px"
              className="object-cover"
              priority
            />

            {/* Image overlay */}
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