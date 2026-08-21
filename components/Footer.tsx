"use client";

import { useLang } from "@/context/LangContext";
import { personal } from "@/lib/data";
import TerminalPrompt from "@/components/TerminalPrompt";
export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
        <p>
          © {year} {personal.name}. {t("footer.rights")}
        </p>
        <TerminalPrompt text={t("footer.built_with")} clear={5} />
      </div>
    </footer>
  );
}
