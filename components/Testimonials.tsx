"use client";

import { useLang } from "@/context/LangContext";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const { t, pick } = useLang();

  return (
    <section id="testimonials" className="border-b border-border px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-accent">{t("testimonials.eyebrow")}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl">
              {t("testimonials.title")}
            </h2>
          </div>
          <p className="font-mono text-xs text-muted">{t("testimonials.placeholder_note")}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center gap-2 border-b border-border pb-3 font-mono text-xs text-muted">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface2 text-[11px] text-accent">
                  {item.name.charAt(0)}
                </span>
                <span className="text-text">{item.name}</span>
                <span>·</span>
                <span>{pick(item.role)}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <span className="text-accent2">&ldquo;</span>
                {pick(item.quote)}
                <span className="text-accent2">&rdquo;</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
