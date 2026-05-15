import { Link } from "wouter";
import { hubHref } from "@/lib/bookHostname";

const AUTHOR_IMAGE = "/autor/foto_kdp.png";
const AUTHOR_IMAGE_FALLBACK = "/images/bonaparte-hero-desk-editorial.jpg";

export default function AutorSection() {
  const hub = hubHref();
  const hubIsExternal = hub.startsWith("http");

  return (
    <section className="border-y border-white/5 bg-[color:var(--book-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[minmax(0,280px)_1fr] md:items-center md:gap-16">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-sm md:mx-0">
          <img
            src={AUTHOR_IMAGE}
            alt="Abnadaby Bonaparte"
            className="h-full w-full object-cover grayscale contrast-[1.05]"
            style={{
              boxShadow: "inset 0 0 80px rgba(0,0,0,0.35)",
            }}
            onError={e => { (e.target as HTMLImageElement).src = AUTHOR_IMAGE_FALLBACK; }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>
        <div className="text-[color:var(--book-text)]">
          <img
            src="/brand/logo.png"
            alt=""
            className="mb-6 h-5 w-auto opacity-80"
            onError={e => ((e.target as HTMLImageElement).style.display = "none")}
          />
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[color:var(--book-primary)]"
            style={{ fontFamily: "var(--lp-font-accent)" }}
          >
            Abnadaby Bonaparte
          </p>
          <div
            className="space-y-4 text-base leading-relaxed sm:text-lg"
            style={{ fontFamily: "var(--lp-font-body)" }}
          >
            <p>Músico. Escritor. Fundador da ALSHAM.</p>
            <p>
              Escreve de dentro de um rancho no Tocantins, entre código e bezerras, preparando uma expedição por 12
              países com a família.
            </p>
            <p className="text-[color:var(--book-text)]/85">Não escreve sobre o que estudou. Escreve sobre o que atravessou.</p>
          </div>
          {hubIsExternal ? (
            <a
              href={hub}
              className="mt-8 inline-flex items-center gap-1 text-sm tracking-wide text-[color:var(--book-primary)] underline-offset-4 hover:underline"
              style={{ fontFamily: "var(--lp-font-accent)" }}
            >
              → Casa Bonaparte
            </a>
          ) : (
            <Link
              href={hub}
              className="mt-8 inline-flex items-center gap-1 text-sm tracking-wide text-[color:var(--book-primary)] underline-offset-4 hover:underline"
              style={{ fontFamily: "var(--lp-font-accent)" }}
            >
              → Casa Bonaparte
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
