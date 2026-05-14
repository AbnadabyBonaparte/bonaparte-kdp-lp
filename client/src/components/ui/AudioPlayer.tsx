import { cn } from "@/lib/utils";

type Props = {
  embedUrl?: string;
  bookTitle: string;
  durationLabel?: string;
};

export default function AudioPlayer({ embedUrl, bookTitle, durationLabel }: Props) {
  if (embedUrl) {
    return (
      <div className="overflow-hidden rounded-lg border border-white/10 bg-black/30 shadow-inner">
        <iframe
          title={`Debate em áudio — ${bookTitle}`}
          src={embedUrl}
          className="aspect-video min-h-[200px] w-full"
          allow="autoplay; clipboard-write; encrypted-media"
          loading="lazy"
        />
        {durationLabel ? (
          <p className="px-3 py-2 text-xs tracking-wide text-[color:var(--book-text)]/60">
            Duração estimada: {durationLabel}
          </p>
        ) : null}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-white/15 bg-black/25 px-6 py-10 text-center",
      )}
    >
      <div className="flex h-10 w-full max-w-xs items-end justify-center gap-0.5">
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={i}
            className="w-1 rounded-sm bg-[color:var(--book-primary)]/40"
            style={{ height: `${20 + ((i * 7) % 24)}px` }}
          />
        ))}
      </div>
      <p className="text-sm text-[color:var(--book-text)]/55">Em breve — debate em áudio</p>
    </div>
  );
}
