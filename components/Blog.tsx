"use client";

import { useLang } from "@/context/LangContext";
import { blogPosts } from "@/lib/data";

export default function Blog() {
  const { t, pick, locale } = useLang();

  return (
    <section id="blog" className="border-b border-border px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-accent">{t("blog.eyebrow")}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl">
              {t("blog.title")}
            </h2>
          </div>
          <p className="font-mono text-xs text-muted">{t("blog.placeholder_note")}</p>
        </div>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {blogPosts.map((post) => (
            <a
              key={post.slug}
              href={`#${post.slug}`}
              className="focus-ring group flex flex-col gap-2 py-6 transition-colors hover:bg-surface2 sm:flex-row sm:items-center sm:justify-between sm:px-4"
            >
              <div>
                <p className="font-mono text-[11px] text-muted">
                  {new Date(post.date).toLocaleDateString(locale === "km" ? "km-KH" : "en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {post.readTime}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold text-text group-hover:text-accent sm:text-lg">
                  {pick(post.title)}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-muted">{pick(post.excerpt)}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
                {t("blog.read")} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
