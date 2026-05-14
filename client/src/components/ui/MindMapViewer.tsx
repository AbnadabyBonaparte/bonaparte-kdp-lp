import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BookCover from "./BookCover";

type Props = {
  imageUrl?: string;
  bookTitle: string;
  unlocked: boolean;
};

export default function MindMapViewer({ imageUrl, bookTitle, unlocked }: Props) {
  const [open, setOpen] = useState(false);
  const hasImage = Boolean(imageUrl);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20">
      {!unlocked ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/50 px-6 text-center text-[color:var(--book-text)] backdrop-blur-sm">
          <p className="text-sm tracking-wide text-[color:var(--book-text)]/90">Insira seu email acima</p>
          <p className="max-w-xs text-xs text-[color:var(--book-text)]/55">O mapa mental desbloqueia após o envio.</p>
        </div>
      ) : null}
      <div className={cn(!unlocked && "pointer-events-none blur-md")}>
        {hasImage ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group relative block w-full cursor-zoom-in text-left"
                disabled={!unlocked}
              >
                <BookCover src={imageUrl!} alt={`Mapa mental — ${bookTitle}`} className="max-h-[420px]" />
                {unlocked ? (
                  <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white/90 opacity-0 transition group-hover:opacity-100">
                    Tela cheia
                  </span>
                ) : null}
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[95vw] overflow-auto border-white/10 bg-black p-2">
              <DialogTitle className="sr-only">Mapa mental — {bookTitle}</DialogTitle>
              <img src={imageUrl} alt="" className="mx-auto max-h-[85vh] w-auto object-contain" />
            </DialogContent>
          </Dialog>
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 px-6 py-14 text-center">
            <div className="h-px w-16 bg-[color:var(--book-primary)]/40" />
            <p className="text-sm text-[color:var(--book-text)]/50">Mapa mental em preparação</p>
          </div>
        )}
      </div>
    </div>
  );
}
