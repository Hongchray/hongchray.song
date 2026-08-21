"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { experience, education } from "@/lib/data";
import TerminalPrompt from "@/components/TerminalPrompt";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const { t, pick } = useLang();
  const reduce = useReducedMotion();

  const section = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE,
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: EASE,
      },
    },
  };

  return (
    <motion.section
      id="experience"
      className="border-b border-border px-5 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.12,
      }}
      variants={section}
    >
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <motion.div variants={item}>
          <div className="font-mono text-xs text-accent">
            <TerminalPrompt clear="all" text={t("experience.eyebrow")} />
          </div>

          <h2 className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl">
            {t("experience.title")}
          </h2>
        </motion.div>

        {/* Experience */}
        <div className="mt-10">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.hash}
              variants={item}
              className="group relative flex gap-5 pb-10"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          scale: 1.2,
                          transition: { duration: 0.2 },
                        }
                  }
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-accent transition-all duration-300 group-hover:border-accent/60 group-hover:bg-accent/5"
                >
                  {exp.current ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
                    </span>
                  ) : (
                    <span className="text-xs">●</span>
                  )}
                </motion.div>

                {i !== experience.length - 1 && (
                  <motion.div
                    initial={{
                      scaleY: 0,
                      opacity: 0,
                    }}
                    whileInView={{
                      scaleY: 1,
                      opacity: 1,
                    }}
                    viewport={{
                      once: false,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15,
                      ease: EASE,
                    }}
                    style={{
                      transformOrigin: "top",
                    }}
                    className="mt-1 w-px flex-1 bg-border"
                  />
                )}
              </div>

              {/* Content */}
              <motion.div
                whileHover={
                  reduce
                    ? undefined
                    : {
                        x: 5,
                        transition: {
                          duration: 0.2,
                        },
                      }
                }
                className="min-w-0 flex-1 rounded-xl border border-transparent pb-2 transition-all duration-300 group-hover:border-border group-hover:bg-surface/50 group-hover:px-4 group-hover:py-4"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-text transition-colors duration-300 group-hover:text-accent">
                      {exp.company}

                      <span className="ml-2 font-mono text-xs font-normal text-muted">
                        #{exp.hash}
                      </span>
                    </h3>

                    <p className="mt-0.5 text-sm text-accent">
                      {pick(exp.role)}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-muted">
                    {exp.location} ·{" "}
                    {exp.current
                      ? `${exp.period.split("—")[0].trim()} — ${t(
                          "experience.present"
                        )}`
                      : exp.period}
                  </span>
                </div>

                {/* Description */}
                <motion.ul
                  className="mt-4 space-y-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: false,
                    amount: 0.2,
                  }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.08,
                      },
                    },
                  }}
                >
                  {exp.bullets.map((bullet, index) => (
                    <motion.li
                      key={index}
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: reduce ? 0 : -15,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.4,
                            ease: EASE,
                          },
                        },
                      }}
                      className="flex gap-2 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-text/80"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent2" />

                      <span>{pick(bullet)}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          variants={item}
          className="mt-14 border-t border-border pt-10"
        >
          <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
            {t("education.title")}
          </h3>

          <motion.div
            className="mt-4 grid gap-4 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            {education.map((ed) => (
              <motion.div
                key={ed.degree.en}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: reduce ? 0 : 25,
                    scale: reduce ? 1 : 0.97,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: EASE,
                    },
                  },
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -5,
                        transition: { duration: 0.2 },
                      }
                }
                className="group rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:border-accent/50 hover:bg-surface2 hover:shadow-[0_15px_35px_-25px_var(--accent)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-sm font-semibold text-text transition-colors group-hover:text-accent">
                      {pick(ed.degree)}
                    </p>

                    <p className="mt-1 text-sm text-muted">
                      {pick(ed.school)}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-md border border-border bg-surface2 px-2 py-1 font-mono text-xs text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    {ed.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}