"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import { useLang } from "@/context/LangContext";
import { personal } from "@/lib/data";

const NAV_ITEMS = [
  { id: "profile" },
  { id: "experience" },
  { id: "skills" },
  { id: "projects" },
  { id: "contact" },
];

const GOLD = "text-yellow-500";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLang();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 8);

      /*
       * The navbar is sticky, so we consider a section active
       * when its top passes this point.
       */
      const offset = 140;

      let current = "hero";

      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);

        if (!section) continue;

        const top = section.offsetTop - offset;

        if (scrollY >= top) {
          current = item.id;
        }
      }

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);

    const element = document.getElementById(id);

    if (!element) return;

    const navbarOffset = 75;

    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const isActive = (id: string) => activeSection === id;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-surface/90 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          className="focus-ring group flex items-center gap-2 rounded font-mono text-sm text-text"
          aria-label="Scroll to top"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-accent/15 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/25">
            {"</>"}
          </span>

          <span className="font-semibold">
            {personal.initials}
          </span>

          <span className="hidden text-muted sm:inline">
            ~/
            {locale === "en"
              ? "portfolio"
              : "portfolio-km"}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                title={t(`nav.${item.id}`)}
                className={`
                  group relative rounded px-3 py-1.5
                  font-mono text-[13px]
                  transition-colors duration-200
                  focus-ring
                  ${
                    active
                      ? "text-yellow-500"
                      : "text-muted hover:text-yellow-500"
                  }
                `}
              >
                {t(`nav.${item.id}`)}

                {/* Active underline */}
                <span
                  className={`
                    absolute bottom-0 left-3 right-3 h-px
                    bg-yellow-500
                    transition-transform duration-300
                    origin-center
                    ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Download CV */}
          <a
            href="/cv.pdf"
            download
            className="group focus-ring hidden items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs font-medium text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-bg sm:flex"
          >
            <DownloadIcon />
            <span>CV</span>
          </a>

          {/* Language */}
          <button
            onClick={toggleLocale}
            className="focus-ring flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text transition-all duration-200 hover:border-yellow-500 hover:text-yellow-500"
            aria-label="Switch language"
          >
            <span
              className={
                locale === "en"
                  ? "text-yellow-500"
                  : "text-muted"
              }
            >
              EN
            </span>

            <span className="text-muted">/</span>

            <span
              className={
                locale === "km"
                  ? "text-yellow-500"
                  : "text-muted"
              }
            >
              KM
            </span>
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-border text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-500 hover:text-yellow-500"
            aria-label="Toggle dark and light mode"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-border text-text transition-all duration-200 hover:border-yellow-500 hover:text-yellow-500 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav className="border-t border-border bg-surface px-5 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`
                    group relative rounded px-2 py-2
                    text-left font-mono text-sm
                    transition-colors duration-200
                    ${
                      active
                        ? "text-yellow-500"
                        : "text-muted hover:text-yellow-500"
                    }
                  `}
                >
                  {t(`nav.${item.id}`)}

                  <span className="ml-2 text-[11px] text-muted">
                    {t(`nav.${item.id}`)}
                  </span>

                  {/* Mobile active underline */}
                  <span
                    className={`
                      absolute bottom-1 left-2 h-px bg-yellow-500
                      transition-all duration-300
                      ${
                        active
                          ? "w-16 opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />
                </button>
              );
            })}

            {/* Mobile CV */}
            <a
              href="/cv.pdf"
              download
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-2.5 font-mono text-sm text-accent transition-all duration-200 hover:border-accent hover:bg-accent hover:text-bg"
            >
              <DownloadIcon />
              <span>Download CV</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/* Download */
function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="transition-transform duration-300 group-hover:translate-y-0.5"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

/* Sun */
function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

/* Moon */
function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* Menu */
function MenuIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}