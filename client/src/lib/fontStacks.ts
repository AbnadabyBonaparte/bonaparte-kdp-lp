import type { BookConfig } from "@/types/book";

function fallbackForSpec(spec: string): "serif" | "sans-serif" {
  const s = spec.toLowerCase();
  if (/inter|bebas|ibm|montserrat|nunito|raleway|space|manrope|work/i.test(s)) {
    return "sans-serif";
  }
  return "serif";
}

export function cssFontStack(spec: string): string {
  const name = spec.split(":")[0]?.replace(/\+/g, " ").trim() || "serif";
  return `"${name}", ${fallbackForSpec(spec)}`;
}

export function applyBookFontVars(root: HTMLElement, config: BookConfig) {
  root.style.setProperty("--lp-font-title", cssFontStack(config.theme.fontTitle));
  root.style.setProperty("--lp-font-body", cssFontStack(config.theme.fontBody));
  root.style.setProperty("--lp-font-accent", cssFontStack(config.theme.fontAccent));
}

export function clearBookFontVars(root: HTMLElement) {
  root.style.removeProperty("--lp-font-title");
  root.style.removeProperty("--lp-font-body");
  root.style.removeProperty("--lp-font-accent");
}
