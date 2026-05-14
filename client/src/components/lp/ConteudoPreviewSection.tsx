import AudioPlayer from "@/components/ui/AudioPlayer";
import MindMapViewer from "@/components/ui/MindMapViewer";
import type { BookConfig } from "@/types/book";

type Props = {
  config: BookConfig;
  unlocked: boolean;
};

export default function ConteudoPreviewSection({ config, unlocked }: Props) {
  return (
    <section
      className="space-y-20 px-6 py-24 sm:py-32"
      style={{ backgroundColor: config.theme.bg, color: config.theme.text }}
    >
      <div>
        <p
          className="mb-6 text-[10px] uppercase tracking-[0.3em] text-[color:var(--book-primary)]"
          style={{ fontFamily: "var(--lp-font-accent)" }}
        >
          Mapa mental
        </p>
        <MindMapViewer
          imageUrl={config.mindMapImage || undefined}
          bookTitle={config.title}
          unlocked={unlocked}
        />
      </div>
      <div>
        <p
          className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[color:var(--book-primary)]"
          style={{ fontFamily: "var(--lp-font-accent)" }}
        >
          Debate em áudio
        </p>
        <p className="mb-6 text-lg text-[color:var(--book-text)]/80" style={{ fontFamily: "var(--lp-font-body)" }}>
          Duas perspectivas analisando <em>{config.title}</em>.
        </p>
        <div className="relative">
          {!unlocked ? (
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-lg bg-black/50 text-center text-[color:var(--book-text)] backdrop-blur-sm">
              <p className="text-sm">Insira seu email acima</p>
              <p className="max-w-xs text-xs text-[color:var(--book-text)]/55">O áudio desbloqueia após o envio.</p>
            </div>
          ) : null}
          <div className={!unlocked ? "pointer-events-none blur-md" : ""}>
            <AudioPlayer
              embedUrl={config.audioEmbedUrl || undefined}
              bookTitle={config.title}
              durationLabel={config.audioDurationLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
