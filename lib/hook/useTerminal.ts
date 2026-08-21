"use client";

import { useEffect, useState } from "react";

type ClearAmount = number | "all";

type UseTerminalOptions = {
  text: string;
  clear?: ClearAmount;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  loop?: boolean;
};

export function useTerminal({
  text,
  clear = "all",
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseAfterTyping = 1800,
  pauseAfterDeleting = 500,
  loop = true,
}: UseTerminalOptions) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    // -------------------------
    // Typing
    // -------------------------
    if (isTyping) {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          if (loop) {
            setIsTyping(false);
          }
        }, pauseAfterTyping);
      }
    }

    // -------------------------
    // Deleting
    // -------------------------
    else {
      // Delete everything
      if (clear === "all") {
        if (displayText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, deletingSpeed);
        } else {
          timeout = setTimeout(() => {
            setIsTyping(true);
          }, pauseAfterDeleting);
        }
      }

      // Delete specific number of characters
      else {
        const targetLength = Math.max(0, text.length - clear);

        if (displayText.length > targetLength) {
          timeout = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, deletingSpeed);
        } else {
          timeout = setTimeout(() => {
            setIsTyping(true);
          }, pauseAfterDeleting);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isTyping,
    text,
    clear,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
    loop,
  ]);

  return {
    text: displayText,
    isTyping,
  };
}