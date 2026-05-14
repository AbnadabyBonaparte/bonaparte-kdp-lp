import { applyBookFontVars, clearBookFontVars } from "@/lib/fontStacks";
import { useEffect } from "react";
import type { BookConfig } from "@/types/book";

export function useBookTheme(config: BookConfig) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--book-bg", config.theme.bg);
    root.style.setProperty("--book-surface", config.theme.surface);
    root.style.setProperty("--book-primary", config.theme.primary);
    root.style.setProperty("--book-secondary", config.theme.secondary);
    root.style.setProperty("--book-accent", config.theme.accent);
    root.style.setProperty("--book-text", config.theme.text);
    applyBookFontVars(root, config);
    return () => {
      root.style.removeProperty("--book-bg");
      root.style.removeProperty("--book-surface");
      root.style.removeProperty("--book-primary");
      root.style.removeProperty("--book-secondary");
      root.style.removeProperty("--book-accent");
      root.style.removeProperty("--book-text");
      clearBookFontVars(root);
    };
  }, [config]);
}
