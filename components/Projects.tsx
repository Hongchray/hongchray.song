"use client";

import { motion } from "framer-motion";

import { useLang } from "@/context/LangContext";
import { projects, ProjectStatus } from "@/lib/data";
import TerminalPrompt from "./TerminalPrompt";
export default function Projects() {
  const { t, pick } = useLang();

  return (
    <motion.section
      id="projects"
      className="border-b border-border px-5 py-20"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-3"
        >
          <div>
            <p className="font-mono text-xs text-accent">
              {t("projects.eyebrow")}
            </p>

            <h2 className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl">
              {t("projects.title")}
            </h2>
          </div>

            <TerminalPrompt text={t("projects.placeholder_note")} />
        </motion.div>

        {/* Projects */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.1,
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
          {projects.map((p) => (
            <motion.div
              key={p.name}
              variants={{
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
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                y: -7,
                transition: {
                  duration: 0.25,
                },
              }}
              className="
                      group flex w-full flex-col
                      rounded-xl border border-border bg-surface p-5
                      transition-colors duration-300
                      hover:border-accent/50 hover:bg-surface2
                      sm:w-[calc(50%-10px)]
                      lg:w-[calc(33.333%-14px)]
                    "           >
              {/* Project Name */}
              <div className="flex items-center gap-2 font-mono text-sm text-text">
                <motion.span
                  whileHover={{
                    rotate: -8,
                    scale: 1.15,
                  }}
                  className="text-accent"
                >
                  <FolderIcon />
                </motion.span>

                <span className="truncate transition-colors group-hover:text-accent">
                  {p.name}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {pick(p.description)}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{
                      y: -2,
                      scale: 1.04,
                    }}
                    className="rounded-full border border-border bg-surface2 px-2 py-0.5 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Status + Technology */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                {/* Language */}
                <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: p.langColor,
                    }}
                  />

                  {p.lang}
                </span>

                {/* Status */}
                <ProjectStatusBadge status={p.status} />
              </div>

              {/* Links */}
              {(p.url || p.github) && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                  {p.url && (
                    <ProjectLink
                      href={p.url}
                      icon={<ExternalLinkIcon />}
                    >
                      {(p.type_url && pick(p.type_url)) || "Live Demo"}
                    </ProjectLink>
                  )}

                  {p.github && (
                    <ProjectLink
                      href={p.github}
                      icon={<GithubIcon />}
                    >
                      GitHub
                    </ProjectLink>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/**
 * Project status badge
 */
function ProjectStatusBadge({
  status,
}: {
  status: ProjectStatus;
}) {
  const statusConfig: Record<
    ProjectStatus,
    {
      label: string;
      className: string;
      dotClassName: string;
    }
  > = {
    live: {
      label: "Live",
      className:
        "text-green-500 border-green-500/30 bg-green-500/5",
      dotClassName: "bg-green-500",
    },

    completed: {
      label: "Completed",
      className:
        "text-blue-500 border-blue-500/30 bg-blue-500/5",
      dotClassName: "bg-blue-500",
    },

    "in-progress": {
      label: "In Progress",
      className:
        "text-yellow-500 border-yellow-500/30 bg-yellow-500/5",
      dotClassName: "bg-yellow-500",
    },

    private: {
      label: "Private",
      className:
        "text-muted border-border bg-surface2",
      dotClassName: "bg-muted",
    },

    "coming-soon": {
      label: "Coming Soon",
      className:
        "text-purple-500 border-purple-500/30 bg-purple-500/5",
      dotClassName: "bg-purple-500",
    },
  };

  const config = statusConfig[status];

  return (
    <motion.span
      whileHover={{
        scale: 1.04,
      }}
      className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] transition-colors ${config.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dotClassName}`}
      />

      {config.label}
    </motion.span>
  );
}

/**
 * Project link
 */
function ProjectLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="
        inline-flex items-center gap-1.5
        font-mono text-xs
        text-blue-500
        transition-colors duration-200
        hover:text-blue-400
        hover:underline
        hover:underline-offset-4
      "
    >
      {icon}

      <span>{children}</span>

      <span className="text-[10px]">↗</span>
    </motion.a>
  );
}

/**
 * Folder icon
 */
function FolderIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}

/**
 * External link icon
 */
function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

/**
 * GitHub icon
 */
function GithubIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.69-3.87-1.54-3.87-1.54-.53-1.36-1.28-1.72-1.28-1.72-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.94 10.94 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}