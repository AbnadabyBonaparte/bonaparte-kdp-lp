import { Button } from "@/components/ui/button";
import { trackLpEvent } from "@/lib/trackLp";
import type { BookConfig } from "@/types/book";

function contrastOnPrimary(hex: string): string {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return "#0a0a0a";
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq > 165 ? "#0c0c0c" : "#f8f7f4";
}

type Props = { config: BookConfig };

export default function ComprarSection({ config }: Props) {
  const fg = contrastOnPrimary(config.theme.primary);
  const print = config.amazonPricePrint ?? "Consulte na Amazon";

  function openAmazon() {
    trackLpEvent("amazon_click", { book: config.id });
    window.open(config.amazonUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="px-6 py-24 sm:py-32" style={{ backgroundColor: config.theme.primary, color: fg }}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl sm:text-4xl" style={{ fontFamily: "var(--lp-font-title)" }}>
          {config.title}
        </h2>
        <p className="mt-4 text-lg opacity-90" style={{ fontFamily: "var(--lp-font-body)" }}>
          {config.subtitle}
        </p>
        <div className="mt-10 space-y-2 text-base opacity-95" style={{ fontFamily: "var(--lp-font-body)" }}>
          <p>eBook: {config.amazonPrice}</p>
          <p>Impresso: {print}</p>
        </div>
        <Button
          type="button"
          size="lg"
          className="mt-10 h-14 rounded-full px-10 text-base font-semibold shadow-lg"
          style={{
            backgroundColor: fg,
            color: config.theme.primary,
          }}
          onClick={openAmazon}
        >
          Comprar na Amazon →
        </Button>
        <div className="mt-12 flex flex-col items-center gap-3">
          <img
            src="/brand/logo2.png"
            alt="Casa Bonaparte"
            className="h-6 w-auto opacity-90"
            onError={e => {
              const el = e.target as HTMLImageElement;
              if (el.dataset.fallback === "1") {
                el.style.display = "none";
                return;
              }
              el.dataset.fallback = "1";
              el.src = "/brand/logo.png";
            }}
          />
          <p className="text-sm opacity-80" style={{ fontFamily: "var(--lp-font-body)" }}>
            Disponível em ebook e impresso.
          </p>
        </div>
      </div>
    </section>
  );
}
