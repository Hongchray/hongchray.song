"use client";

import { motion } from "framer-motion";

import { useLang } from "@/context/LangContext";
import { profile, languages, softSkills } from "@/lib/data";
import TerminalPrompt from "@/components/TerminalPrompt";
export default function Profile() {
  const { t, pick } = useLang();

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const badgeVariants = {
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
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const languageVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="profile"
      className="border-b border-border px-5 py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs text-accent"
        >
          {t("profile.eyebrow")}
          
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl"
        >
          {t("profile.title")}
        </motion.h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Profile description */}
          <motion.div
            variants={itemVariants}
            className="flex items-start"
          >
            <p className="text-[15px] leading-relaxed text-muted sm:text-base">
              {pick(profile)}
            </p>
          </motion.div>

          {/* Right side */}
          <div className="space-y-6">
            {/* Soft skills */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -4,
                transition: {
                  duration: 0.25,
                },
              }}
              className="rounded-xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent/40"
            >
              <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
                {t("skills.categories.soft")}
              </h3>

              <motion.ul
                className="mt-3 flex flex-wrap gap-2"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
              >
                {softSkills.map((s) => (
                  <motion.li
                    key={s.en}
                    variants={badgeVariants}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="cursor-default rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-text transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {pick(s)}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -4,
                transition: {
                  duration: 0.25,
                },
              }}
              className="rounded-xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent/40"
            >
              <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
                {t("profile.languages")}
              </h3>

              <motion.ul
                className="mt-3 space-y-2"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {languages.map((l) => (
                  <motion.li
                    key={l.name.en}
                    variants={languageVariants}
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors duration-200 hover:bg-surface2"
                  >
                    <span className="text-text">
                      {pick(l.name)}
                    </span>

                    <span className="text-right text-xs text-muted">
                      {pick(l.level)}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}