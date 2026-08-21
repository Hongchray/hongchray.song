"use client";

import { useReducedMotion } from "framer-motion";

import { useTerminal } from "@/lib/hook/useTerminal";

type TerminalPromptProps = {
  text: string;
  clear?: number | "all";
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  className?: string;
};

export default function TerminalPrompt({
  text,
  clear = "all",
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseAfterTyping = 1800,
  pauseAfterDeleting = 500,
  className = "",
}: TerminalPromptProps) {
  const reduce = useReducedMotion();

  const terminal = useTerminal({
    text,
    clear,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
    loop: !reduce,
  });

  return (
    <div
      className={`flex items-center gap-2 font-mono text-[11px] text-muted ${className}`}
    >
      <span className="text-accent">$</span>

      <span>
        {terminal.text}

        <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-accent" />
      </span>
    </div>
  );
}