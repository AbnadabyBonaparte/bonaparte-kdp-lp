import { useEffect } from "react";
import type { BookConfig } from "@/types/book";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useBookPageMeta(config: BookConfig) {
  useEffect(() => {
    const prevTitle = document.title;
    const title = `${config.title} · Casa Bonaparte`;
    document.title = title;
    upsertMeta("name", "description", config.seoDescription);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", config.seoDescription);
    const og = config.ogImage || config.coverImage;
    if (og.startsWith("/")) {
      upsertMeta("property", "og:image", `${window.location.origin}${og}`);
    } else {
      upsertMeta("property", "og:image", og);
    }
    upsertMeta("property", "og:type", "book");
    return () => {
      document.title = prevTitle;
    };
  }, [config]);
}
