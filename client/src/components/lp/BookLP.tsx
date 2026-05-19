import { useState } from "react";
import { useBookGoogleFonts } from "@/hooks/useBookGoogleFonts";
import { useBookPageMeta } from "@/hooks/useBookPageMeta";
import { useBookTheme } from "@/hooks/useBookTheme";
import type { BookConfig } from "@/types/book";
import { BOOK_REGISTRY } from "@/data/booksRegistry";
import AutorSection from "./AutorSection";
import AutoridadeSection from "./AutoridadeSection";
import ComprarSection from "./ComprarSection";
import ConteudoPreviewSection from "./ConteudoPreviewSection";
import DiagnosticoSection from "./DiagnosticoSection";
import FaqSection from "./FaqSection";
import FechamentoSection from "./FechamentoSection";
import HeroSection from "./HeroSection";
import LeadCaptureSection from "./LeadCaptureSection";
import LpFooter from "./LpFooter";
import MetricasSection from "./MetricasSection";
import OutrosLivrosSection from "./OutrosLivrosSection";
import TerritorioSection from "./TerritorioSection";
import TransformacaoSection from "./TransformacaoSection";
import TrechosSection from "./TrechosSection";

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
      <MetricasSection config={config} />
      <TerritorioSection config={config} />
      <DiagnosticoSection config={config} />
      <TransformacaoSection config={config} />
      <LeadCaptureSection config={config} onSuccess={() => setEmailSubmitted(true)} />
      <ConteudoPreviewSection config={config} unlocked={emailSubmitted} />
      <TrechosSection config={config} />
      <AutoridadeSection config={config} />
      <AutorSection />
      <FaqSection config={config} />
      <ComprarSection config={config} />
      <FechamentoSection config={config} />
      <OutrosLivrosSection currentBookId={config.id} items={BOOK_REGISTRY} />
      <LpFooter />
    </main>
  );
}
