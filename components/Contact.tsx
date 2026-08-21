"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

import { useLang } from "@/context/LangContext";
import { personal, reference } from "@/lib/data";
import TerminalPrompt from "@/components/TerminalPrompt";
const EASE = [0.22, 1, 0.36, 1] as const;

const TERMINAL_TEXT = `echo "Let's build something meaningful."`;

export default function Contact() {
  const { t, pick } = useLang();
  const reduce = useReducedMotion();

  const [terminalText, setTerminalText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  /*
   * Terminal typing animation
   *
   * Type:
   * echo "Let's build something meaningful."
   *
   * Then:
   * pause → clear → type again
   */
  useEffect(() => {
    if (reduce) {
      setTerminalText(TERMINAL_TEXT);
      setIsTyping(false);
      return;
    }

    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (index < TERMINAL_TEXT.length) {
        setTerminalText(TERMINAL_TEXT.slice(0, index + 1));
        index += 1;

        timeout = setTimeout(type, 45);
      } else {
        setIsTyping(false);

        // Pause before clearing
        timeout = setTimeout(() => {
          setTerminalText("");
          setIsTyping(true);
          index = 0;

          // Small pause before typing again
          timeout = setTimeout(type, 500);
        }, 2200);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [reduce]);

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 35,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.65,
        ease: EASE,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 20,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.5,
        ease: EASE,
      },
    },
  };

  const socialLinks = [
     {
      name: "Telegram",
      href: personal.social.telegram,
      icon: <TelegramIcon />,
    },
    {
      name: "GitHub",
      href: personal.social.github,
      icon: <GithubIcon />,
    },
    {
      name: "LinkedIn",
      href: personal.social.linkedin,
      icon: <LinkedinIcon />,
    },
    // {
    //   name: "Facebook",
    //   href: personal.social.facebook,
    //   icon: <FacebookIcon />,
    // },
  ];

  return (
    <section
      id="contact"
      className="border-b border-border px-5 py-24"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.15,
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
        {/* Header */}
        <motion.div variants={fadeUp}>
          <div className="font-mono text-xs text-accent">
              {t("contact.eyebrow")}
          </div>

          <h2 className="mt-2 font-display text-3xl font-semibold text-text sm:text-4xl">
            {t("contact.title")}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* Main */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Main contact panel */}
          <motion.div
            variants={fadeUp}
            whileHover={
              reduce
                ? undefined
                : {
                    y: -5,
                    transition: {
                      duration: 0.25,
                    },
                  }
            }
            className="
              group
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-surface
              transition-shadow
              duration-300
              hover:border-accent/40
              hover:shadow-[0_18px_45px_-25px_var(--accent)]
            "
          >
            {/* Terminal header */}
            <div className="flex items-center border-b border-border bg-surface2 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent2/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              </div>

              <span className="ml-3 font-mono text-[11px] text-muted">
                contact.sh
              </span>

              <span className="ml-auto font-mono text-[10px] text-muted">
                available
              </span>
            </div>

            {/* Contact information */}
            <motion.div
              className="mt-7 space-y-3 px-2 pb-2"
              variants={{
                hidden: {},

                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <ContactRow
                variants={item}
                icon={<MailIcon />}
                label={t("contact.email")}
                value={personal.email}
                href={`mailto:${personal.email}`}
              />

              <ContactRow
                variants={item}
                icon={<PhoneIcon />}
                label={t("contact.phone")}
                value={personal.phone}
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
              />

              <ContactRow
                variants={item}
                icon={<MapPinIcon />}
                label={t("contact.address")}
                value={pick(personal.address)}
              />
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="grid gap-5">
            {/* Reference */}
            <motion.div
              variants={fadeUp}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -5,
                      transition: {
                        duration: 0.25,
                      },
                    }
              }
              className="
                rounded-2xl
                border
                border-border
                bg-surface
                p-6
                transition-shadow
                duration-300
                hover:border-accent/40
                hover:shadow-[0_18px_45px_-25px_var(--accent)]
              "
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {t("contact.reference_title")}
              </p>

              <div className="mt-5">
                <p className="font-display text-base font-semibold text-text">
                  {reference.name}
                </p>

                <p className="mt-1 text-sm text-muted">
                  {pick(reference.role)}
                </p>

                <a
                  href={`tel:${reference.phone.replace(/\s/g, "")}`}
                  className="
                    mt-4
                    inline-flex
                    font-mono
                    text-sm
                    text-accent
                    transition-colors
                    hover:text-text
                  "
                >
                  {reference.phone}
                </a>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {t("contact.connect_title")}
              </p>

              <motion.div
                className="mt-4 space-y-2"
                variants={{
                  hidden: {},

                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={item}
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
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      border
                      border-border
                      bg-surface2
                      px-3
                      py-2.5
                      transition-all
                      duration-200
                      hover:border-accent/50
                    "
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-md
                        border
                        border-border
                        text-muted
                        transition-all
                        duration-200
                        group-hover:scale-105
                        group-hover:border-accent/50
                        group-hover:text-accent
                      "
                    >
                      {social.icon}
                    </span>

                    <span
                      className="
                        font-mono
                        text-xs
                        text-text
                        transition-colors
                        group-hover:text-accent
                      "
                    >
                      {social.name}
                    </span>

                    <span
                      className="
                        ml-auto
                        text-muted
                        transition-all
                        group-hover:translate-x-1
                        group-hover:text-accent
                      "
                    >
                      ↗
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Terminal prompt */}
        <motion.div variants={fadeUp} className="mt-8">
          <TerminalPrompt text={'echo "Let\'s build something meaningful."'} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact Row */
/* -------------------------------------------------------------------------- */

function ContactRow({
  label,
  value,
  href,
  icon,
  variants,
}: {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
  variants: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      className="
        group
        flex
        items-center
        gap-3
        rounded-lg
        border
        border-border
        bg-surface2/40
        p-3
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-accent/40
        hover:bg-surface2
      "
    >
      {/* Icon */}
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-md
          border
          border-border
          bg-surface
          text-muted
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:border-accent/40
          group-hover:text-accent
        "
      >
        {icon}
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
          {label}
        </p>

        {href ? (
          <a
            href={href}
            className="
              block
              truncate
              text-sm
              text-text
              transition-colors
              duration-200
              hover:text-accent
            "
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-sm text-text">
            {value}
          </p>
        )}
      </div>

      {/* Arrow */}
      <span
        className="
          text-muted
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:text-accent
        "
      >
        →
      </span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Social Icons */
/* -------------------------------------------------------------------------- */

function GithubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.11-1.52-1.11-1.52-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.33 1.12 2.9.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.29 9.29 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21.8 3.2L2.6 10.6c-1.3.5-1.3 1.2-.2 1.5l4.9 1.5 1.9 5.9c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.6.3 1.8-.8l3.2-15.1c.3-1.4-.5-2-1.5-1.6zM8.1 13.2l10.8-6.8c.5-.3 1-.1.6.2l-8.8 8-.3 3.1-1.3-4.5-1-.3z" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V21H9z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M13.5 21v-7.5H16l.5-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.6V4.34C16.3 4.3 15.3 4.2 14.1 4.2c-2.4 0-4 1.46-4 4.15V10.5H7.5v3H10.1V21z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact Icons */
/* -------------------------------------------------------------------------- */

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.07 5.18 2 2 0 0 1 5.05 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.22a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}