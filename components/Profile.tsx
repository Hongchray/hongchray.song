"use client";

import {
  useEffect,
  useRef,
  useMemo,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";

import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useInView,
  type Variants,
} from "framer-motion";

import { useLang } from "@/context/LangContext";
import { profile, languages, softSkills } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRID = 56;

/* =========================================================
   ANIMATED 3D BACKGROUND
========================================================= */



function AnimatedBackground() {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";



  // ---------- Stars ----------
  // Three kinds: still-but-twinkling, drifting, and "bright" glowing stars.
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => {
        const kind = i % 9 === 0 ? "bright" : i % 4 === 0 ? "drift" : "twinkle";
        return {
          left: `${(i * 37.7) % 100}%`,
          top: `${(i * 61.3) % 100}%`,
          size: kind === "bright" ? 3 : i % 3 === 0 ? 2 : 1.5,
          delay: (i % 8) * 0.4,
          duration: 1.6 + (i % 5) * 0.9,
          kind,
          // drift distance + direction
          dx: ((i % 5) - 2) * 14,
          dy: ((i % 7) - 3) * 10,
          driftDuration: 14 + (i % 6) * 4,
        };
      }),
    []
  );

  // Shooting stars: each one streaks across and repeats with a long pause
  const shooters = useMemo(
    () => [
      { top: "10%", left: "58%", delay: 2, repeatDelay: 7 },
      { top: "30%", left: "80%", delay: 6, repeatDelay: 11 },
      { top: "5%", left: "30%", delay: 11, repeatDelay: 9 },
    ],
    []
  );

  const starColor = isDark ? "#ffffff" : "#64748b";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Galaxy background */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 65% 45%, #0c2a3a 0%, #0b1424 38%, #02060d 78%)"
            : "radial-gradient(ellipse at 65% 45%, #cffafe 0%, #ecfeff 38%, #f8fafc 80%)",
        }}
      />

      {/* Nebula clouds (teal + violet to complement the ice planet) */}
      <motion.div
        className="absolute left-[20%] top-[12%] h-[380px] w-[500px] rounded-full blur-[100px]"
        style={{
          background: isDark
            ? "rgba(20, 184, 166, 0.16)"
            : "rgba(45, 212, 191, 0.20)",
        }}
        animate={
          reduce
            ? undefined
            : { x: [0, 35, -20, 0], y: [0, -20, 25, 0], scale: [1, 1.15, 0.95, 1] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[5%] h-[300px] w-[400px] rounded-full blur-[100px]"
        style={{
          background: isDark
            ? "rgba(99, 102, 241, 0.20)"
            : "rgba(165, 180, 252, 0.25)",
        }}
        animate={reduce ? undefined : { x: [0, -30, 20, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stars */}
      
      {/* Stars with entrance and twinkle animations */}
      {stars.map((star, i) => {
        const base = {
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          backgroundColor: starColor,
          boxShadow:
            star.kind === "bright"
              ? isDark
                ? "0 0 12px 2px rgba(186,230,253,0.9)"
                : "0 0 8px 1px rgba(100,116,139,0.5)"
              : isDark
              ? "0 0 8px rgba(255,255,255,0.8)"
              : "0 0 5px rgba(100,116,139,0.35)",
        };

        const entrance = {
          opacity: [0, 1],
          scale: [0, 1],
        };

        if (star.kind === "bright") {
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={base}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : {
                      ...entrance,
                      opacity: [0, 1, 0.3, 1],
                      scale: [0, 1.8, 0.8, 1.8],
                    }
              }
              transition={{
                duration: reduce ? 0 : star.duration + 1,
                delay: reduce ? 0 : star.delay,
                repeat: reduce ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          );
        }

        if (star.kind === "drift") {
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={base}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : {
                      x: [0, star.dx, -star.dx / 2, 0],
                      y: [0, star.dy, -star.dy / 2, 0],
                      opacity: [0, 1, 0.35, 1],
                      scale: [0, 1, 0.8, 1],
                    }
              }
              transition={{
                duration: reduce ? 0 : star.driftDuration,
                delay: reduce ? 0 : star.delay,
                repeat: reduce ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          );
        }

        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={base}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              reduce
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: [0, 1, 0.25, 0.8, 0.15],
                    scale: [0, 1.4, 0.8, 1.2, 0.7],
                  }
            }
            transition={{
              duration: reduce ? 0 : star.duration,
              delay: reduce ? 0 : star.delay,
              repeat: reduce ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}


      {/* Shooting stars */}
      {!reduce &&
        shooters.map((s, i) => (
          <motion.span
            key={`shooter-${i}`}
            className="absolute h-[2px] w-24 rounded-full"
            style={{
              top: s.top,
              left: s.left,
              rotate: "-35deg",
              background: isDark
                ? "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95))"
                : "linear-gradient(90deg, rgba(100,116,139,0), rgba(71,85,105,0.9))",
              boxShadow: isDark ? "0 0 10px rgba(186,230,253,0.8)" : "none",
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, -260],
              y: [0, 180],
            }}
            transition={{
              duration: 1.4,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: s.repeatDelay,
              ease: "easeOut",
            }}
          />
        ))}


      
    </div>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function Shimmer({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden rounded-md bg-surface2 ${className}`}
    >
      {!reduce && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      aria-hidden
    >
      <Shimmer className="h-3 w-20" />
      <Shimmer className="mt-3 h-8 w-64" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-[94%]" />
          <Shimmer className="h-4 w-[88%]" />
          <Shimmer className="h-4 w-[96%]" />
          <Shimmer className="h-4 w-[60%]" />
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5">
            <Shimmer className="h-3 w-24" />

            <div className="mt-4 flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Shimmer
                  key={i}
                  className="h-7 w-20 rounded-full"
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <Shimmer className="h-3 w-24" />

            <div className="mt-4 space-y-3">
              {[0, 1, 2].map((i) => (
                <Shimmer
                  key={i}
                  className="h-8 w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   3D TILT CARD
========================================================= */

const MAX_TILT = 8;

function TiltCard({
  children,
  variants,
}: {
  children: ReactNode;
  variants: Variants;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Cursor spotlight

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const spotlight = useMotionTemplate`
    radial-gradient(
      280px circle at ${mouseX}px ${mouseY}px,
      currentColor,
      transparent 75%
    )
  `;

  // Smooth 3D spring movement

  const rotateX = useSpring(0, {
    stiffness: 140,
    damping: 24,
    mass: 0.8,
  });

  const rotateY = useSpring(0, {
    stiffness: 140,
    damping: 24,
    mass: 0.8,
  });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    if (reduce) return;

    rotateY.set(
      (x / rect.width - 0.5) * 2 * MAX_TILT
    );

    rotateX.set(
      -(y / rect.height - 0.5) * 2 * MAX_TILT
    );
  }

  function onLeave() {
    mouseX.set(-300);
    mouseY.set(-300);

    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        willChange: reduce ? "auto" : "transform",
      }}
      className="
        group relative rounded-xl
        border border-border
        bg-surface/90 p-5
        backdrop-blur-md
        transition-[border-color,box-shadow]
        duration-500 ease-out
        hover:border-accent/50
        hover:shadow-[0_25px_70px_-25px]
        hover:shadow-accent/30
      "
    >
      {/* Dynamic spotlight */}

      <motion.div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          rounded-xl text-accent
          opacity-0 transition-opacity duration-500
          group-hover:opacity-[0.13]
        "
        style={{
          background: spotlight,
        }}
      />

      {/* Floating card content */}

      <div
        className="relative"
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN PROFILE COMPONENT
========================================================= */

export default function Profile() {
  const { t, pick } = useLang();


  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.15,
  });

  /* Animation variants */

  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: EASE,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: EASE,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: EASE,
      },
    },
  };

  const languageVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: EASE,
      },
    },
  };

  const listVariants = (stagger: number): Variants => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  });

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="
        relative isolate overflow-hidden
        border-b border-border
        px-5 py-20
      "
    >
      {/* Animated background */}

      <AnimatedBackground />

      {/* Main content */}

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
         
            <motion.div
              key="content"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Heading */}

              <motion.p
                variants={itemVariants}
                className="font-mono text-xs text-accent"
              >
                {t("profile.eyebrow")}
              </motion.p>

              <motion.h2
                variants={itemVariants}
                className="
                  mt-2 font-display
                  text-2xl font-semibold
                  text-text sm:text-3xl
                "
              >
                {t("profile.title")}

                <motion.span
                  aria-hidden
                  className="
                    mt-3 block h-[3px]
                    origin-left rounded-full
                    bg-accent
                  "
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: EASE,
                  }}
                  style={{
                    width: 56,
                  }}
                />
              </motion.h2>

              {/* Profile content grid */}

              <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                {/* Description */}

                <motion.div
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <p
                    className="
                      text-[15px] leading-relaxed
                      text-muted transition-colors
                      duration-300 hover:text-text
                      sm:text-base
                    "
                  >
                    {pick(profile)}
                  </p>
                </motion.div>

                {/* Skills and languages */}

                <div className="space-y-6">
                  {/* Soft skills */}

                  <TiltCard variants={cardVariants}>
                    <h3
                      className="
                        font-mono text-xs
                        uppercase tracking-wide
                        text-muted
                      "
                    >
                      {t("skills.categories.soft")}
                    </h3>

                    <motion.ul
                      className="mt-3 flex flex-wrap gap-2"
                      variants={listVariants(0.06)}
                    >
                      {softSkills.map((s) => (
                        <motion.li
                          key={s.en}
                          variants={badgeVariants}
                          whileHover={{
                            scale: 1.06,
                            y: -3,
                            z: 12,
                          }}
                          whileTap={{
                            scale: 0.96,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                          className="
                            cursor-default rounded-full
                            border border-border
                            bg-surface2 px-3 py-1
                            text-xs text-text
                            transition-[color,border-color,background-color,box-shadow]
                            duration-300
                            hover:border-accent
                            hover:bg-accent/10
                            hover:text-accent
                            hover:shadow-[0_6px_18px_-8px]
                            hover:shadow-accent/60
                          "
                        >
                          {pick(s)}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </TiltCard>

                  {/* Languages */}

                  <TiltCard variants={cardVariants}>
                    <h3
                      className="
                        font-mono text-xs
                        uppercase tracking-wide
                        text-muted
                      "
                    >
                      {t("profile.languages")}
                    </h3>

                    <motion.ul
                      className="mt-3 space-y-1"
                      variants={listVariants(0.1)}
                    >
                      {languages.map((l) => (
                        <motion.li
                          key={l.name.en}
                          variants={languageVariants}
                          whileHover={{
                            x: 4,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: EASE,
                          }}
                          className="
                            group/row relative
                            flex items-center
                            justify-between rounded-md
                            px-2 py-1.5 text-sm
                            transition-colors duration-300
                            hover:bg-surface2
                          "
                        >
                          <span
                            aria-hidden
                            className="
                              absolute left-0 top-1/2
                              h-0 w-[2px]
                              -translate-y-1/2
                              rounded-full bg-accent
                              transition-all duration-300
                              group-hover/row:h-4
                            "
                          />

                          <span className="text-text">
                            {pick(l.name)}
                          </span>

                          <span
                            className="
                              text-right text-xs
                              text-muted
                              transition-colors duration-300
                              group-hover/row:text-accent
                            "
                          >
                            {pick(l.level)}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </TiltCard>
                </div>
              </div>
            </motion.div>
        
        </motion.div>
      </div>
    </section>
  );
}

function UranusRings({
  isDark,
  reduce,
  layer,
}: {
  isDark: boolean;
  reduce: boolean;
  layer: "back" | "front";
}) {
  const ringColor = isDark ? "rgba(186,230,253," : "rgba(14,116,144,";
  const rings = [
    { inset: "-22%", width: 1.5, alpha: 0.32 },
    { inset: "-26%", width: 1, alpha: 0.22 },
    { inset: "-30%", width: 2, alpha: 0.28 },
    { inset: "-36%", width: 1, alpha: 0.16 },
  ];

  // clip so each layer only shows its half of the ellipse
  const clip =
    layer === "back"
      ? "inset(0 0 50% 0)" // top half of ellipse is behind
      : "inset(50% 0 0 0)"; // bottom half is in front

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: "rotateZ(-82deg) rotateX(72deg)",
        transformStyle: "preserve-3d",
        clipPath: clip,
        zIndex: layer === "back" ? 0 : 5,
      }}
    >
      {rings.map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            inset: r.inset,
            border: `${r.width}px solid ${ringColor}${r.alpha})`,
            boxShadow: isDark
              ? `0 0 8px ${ringColor}${r.alpha / 2})`
              : "none",
          }}
          animate={reduce ? undefined : { opacity: [r.alpha + 0.4, 1, r.alpha + 0.4] }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/** A small moon that circles the planet along the tilted ring plane. */
function Moon({
  radius,
  duration,
  size,
  color,
  reverse = false,
}: {
  radius: number; // percent of planet size
  duration: number;
  size: number;
  color: string;
  reverse?: boolean;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: "rotateZ(-82deg) rotateX(72deg)" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: reverse ? [360, 0] : [0, 360] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <span
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: `${50 - radius}%`,
            width: size,
            height: size,
            marginLeft: -size / 2,
            backgroundColor: color,
            boxShadow: "0 0 6px rgba(226,232,240,0.7)",
          }}
        />
      </motion.div>
    </div>
  );
}

