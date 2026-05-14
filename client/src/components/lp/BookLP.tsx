import { useState } from "react";
import { useBookGoogleFonts } from "@/hooks/useBookGoogleFonts";
import { useBookPageMeta } from "@/hooks/useBookPageMeta";
import { useBookTheme } from "@/hooks/useBookTheme";
import type { BookConfig } from "@/types/book";
import { BOOK_REGISTRY } from "@/data/booksRegistry";
import AutorSection from "./AutorSection";
import ComprarSection from "./ComprarSection";
import ConteudoPreviewSection from "./ConteudoPreviewSection";
import HeroSection from "./HeroSection";
import LeadCaptureSection from "./LeadCaptureSection";
import LpFooter from "./LpFooter";
import OutrosLivrosSection from "./OutrosLivrosSection";
import TerritorioSection from "./TerritorioSection";

export type { BookConfig };

type Props = { config: BookConfig };

export default function BookLP({ config }: Props) {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  useBookTheme(config);
  useBookGoogleFonts(config);
  useBookPageMeta(config);

  return (
    <main
      className="min-h-screen antialiased"
      style={{
        backgroundColor: config.theme.bg,
        color: config.theme.text,
        fontFamily: "var(--lp-font-body), serif",
      }}
    >
      <HeroSection config={config} />
      <TerritorioSection config={config} />
      <AutorSection />
      <LeadCaptureSection config={config} onSuccess={() => setEmailSubmitted(true)} />
      <ConteudoPreviewSection config={config} unlocked={emailSubmitted} />
      <ComprarSection config={config} />
      <OutrosLivrosSection currentBookId={config.id} items={BOOK_REGISTRY} />
      <LpFooter />
    </main>
  );
}
