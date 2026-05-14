import { useEffect } from "react";
import { buildGoogleFontsHref } from "@/lib/googleFonts";
import type { BookConfig } from "@/types/book";

export function useBookGoogleFonts(config: BookConfig) {
  useEffect(() => {
    const href = buildGoogleFontsHref(config.theme);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [config]);
}
