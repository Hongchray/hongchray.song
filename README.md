# chray-portfolio

A modern developer portfolio for **Hongchray Song** — Full-Stack Developer, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

**Design concept:** the whole site is styled like a developer's terminal and codebase — a terminal-window hero (`whoami`), a git-commit-log timeline for work experience, a `skills.json` block, and repo-card style project listings.

## Features

- 🌗 Dark / light mode (class-based, persisted to `localStorage`, respects system preference on first visit)
- 🌐 English / Khmer language switch (persisted to `localStorage`), including a Khmer web font (Noto Sans Khmer)
- 📄 Real content pulled from your CV: profile, work experience, education, languages, soft skills, technical skills, contact info, and reference
- 🧩 Sections: Hero, Profile, Experience, Skills, Projects, Testimonials, Blog, Contact
- 📱 Fully responsive, keyboard-focus visible, respects `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx        Root layout: fonts, theme init script, providers
  page.tsx           Assembles all sections
  globals.css         CSS variables (dark/light tokens), base styles
components/
  Navbar, Hero, Profile, Experience, Skills, Projects,
  Testimonials, Blog, Contact, Footer
context/
  ThemeContext.tsx    Dark/light mode state
  LangContext.tsx      EN/KM locale state + translation helper
lib/
  data.ts              All CV-derived content (bilingual)
  translations/
    en.json            UI strings (nav, buttons, labels) — English
    km.json             Same UI strings — Khmer
public/
  profile-photo.png    Cropped from your uploaded CV
```

## Things to personalize before you publish

These sections were not in your CV, so they currently contain clearly-labeled **sample placeholder content** — replace them with the real thing:

- **`lib/data.ts` → `projects`** — swap in your actual repositories (name, description, tags, links).
- **`lib/data.ts` → `testimonials`** — replace with real quotes from clients or teammates (don't attribute quotes to anyone who didn't actually say them).
- **`lib/data.ts` → `blogPosts`** — replace with real posts, or connect a CMS/MDX source.
- **`components/Contact.tsx`** — the contact form is a UI demo only (it just shows a "sent" state locally). Wire it up to an email service (e.g. Resend, Formspree) or a Next.js API route to actually receive messages.

## Editing translations

UI chrome text (nav labels, button text, section eyebrows) lives in `lib/translations/en.json` and `km.json` — edit both files to change wording. CV content itself (profile text, experience bullets, etc.) is bilingual inline in `lib/data.ts`, each as `{ en: "...", km: "..." }`.

## Changing fonts

All fonts are defined in **one file: `lib/fonts.ts`**. Nothing else needs to change.

- `displayFont` — English headings (currently Space Grotesk)
- `bodyFont` — English paragraph text (currently Inter)
- `monoFont` — code-styled UI: nav file-tabs, terminal, tags, hashes (currently JetBrains Mono)
- `khmerFont` — **fixed to Siemreap** for all Khmer text (headings + body). Siemreap only ships a regular (400) weight, so Khmer hierarchy comes from size/spacing rather than weight.

To swap any of them: pick a new font from [fonts.google.com](https://fonts.google.com), import it in `lib/fonts.ts` from `next/font/google`, and replace the matching `xxxFont` definition — keep the same `variable` name (e.g. `--font-khmer`) so `tailwind.config.ts` and `app/globals.css` don't need to change. The file has inline comments walking through this.

When the site is in Khmer, `app/globals.css` automatically switches headings/body text to `khmerFont` via a `html[lang="km"]` rule (mono/code-styled elements like file-tab labels are intentionally excluded, so they stay in the fixed monospace font regardless of language — like a real code editor's file names).

## Customizing theme colors

Both palettes are defined as CSS variables in `app/globals.css`:

- `:root` → dark mode tokens
- `html.light` → light mode tokens

Change `--accent` / `--accent-2` to shift the whole site's accent colors.

## Deploying

This is a standard Next.js app — deploy to [Vercel](https://vercel.com/new), Netlify, or any Node host:

```bash
npm run build
npm run start
```
