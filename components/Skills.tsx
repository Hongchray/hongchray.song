"use client";

import { motion } from "framer-motion";

import { useLang } from "@/context/LangContext";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  const { t } = useLang();

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
        staggerChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const terminalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
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

  const categoryVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  const skillVariants = {
    hidden: {
      opacity: 0,
      x: -12,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="skills"
      className="border-b border-border px-5 py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.15,
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.p
          variants={headingVariants}
          className="font-mono text-xs text-accent"
        >
          {t("skills.eyebrow")}
        </motion.p>

        <motion.h2
          variants={headingVariants}
          className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl"
        >
          {t("skills.title")}
        </motion.h2>

        {/* Terminal */}
        <motion.div
          variants={terminalVariants}
          whileHover={{
            y: -4,
            transition: {
              duration: 0.3,
            },
          }}
          className="
            group
            mt-10
            overflow-hidden
            rounded-xl
            border
            border-border
            bg-surface
            shadow-2xl
            shadow-black/10
            transition-colors
            duration-300
            hover:border-accent/40
          "
        >
          {/* Terminal header */}
          <div
            className="
              flex
              items-center
              gap-1.5
              border-b
              border-border
              bg-surface2
              px-4
              py-2.5
            "
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-danger/70
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 0.3,
                delay: 0.05,
              }}
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-accent2/70
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 0.3,
                delay: 0.1,
              }}
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-accent/70
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            <span className="ml-3 font-mono text-[11px] text-muted transition-colors duration-300 group-hover:text-text">
              skills.json
            </span>
          </div>

          {/* Terminal body */}
          <div className="relative overflow-hidden">
            {/* Subtle terminal glow */}
            <motion.div
              className="
                pointer-events-none
                absolute
                -inset-20
                bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035),transparent_60%)]
              "
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Scan lines */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.025]
                [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)]
                [background-size:100%_4px]
              "
            />

            <motion.div
              className="relative z-10 grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
            >
              {skillGroups.map((group) => (
                <motion.div
                  key={group.key}
                  variants={categoryVariants}
                  className="group/category"
                >
                  {/* Category */}
                  <motion.p
                    className="
                      font-mono
                      text-[11px]
                      uppercase
                      tracking-wide
                      text-accent2
                      transition-all
                      duration-300
                      group-hover/category:text-accent
                    "
                  >
                    {t(`skills.categories.${group.key}`)}
                  </motion.p>

                  {/* Skills */}
                  <motion.ul
                    className="mt-3 space-y-1.5 font-mono text-[13px]"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.055,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {group.items.map((skill) => (
                      <motion.li
                        key={skill}
                        variants={skillVariants}
                        whileHover={{
                          x: 5,
                          transition: {
                            duration: 0.2,
                          },
                        }}
                        className="
                          cursor-default
                          text-text
                          transition-colors
                          duration-200
                          hover:text-accent
                        "
                      >
                        <span className="mr-1 text-muted transition-colors duration-200 group-hover/category:text-accent2">
                          -
                        </span>

                        {skill}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}