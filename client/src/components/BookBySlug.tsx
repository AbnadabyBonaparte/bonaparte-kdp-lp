import { lazy, Suspense } from "react";

const LP_MAP = {
  cartografia:        lazy(() => import("@/books/cartografia/CartografiaLP")),
  heimat:             lazy(() => import("@/books/heimat/HeimatLP")),
  burnout:            lazy(() => import("@/books/burnout/BurnoutLP")),
  "filhos-prussia":   lazy(() => import("@/books/filhos-prussia/FilhosPrussiaLP")),
  "codigo-ascensao":  lazy(() => import("@/books/codigo-ascensao/CodigoAscensaoLP")),
  licenca:            lazy(() => import("@/books/licenca/LicencaLP")),
  "o-que-nao-comecou": lazy(() => import("@/books/o-que-nao-comecou/OQueNaoComecouLP")),
  "deus-nao-separa":  lazy(() => import("@/books/deus-nao-separa/DeusNaoSeparaLP")),
} as const;

function LpFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090909] text-sm tracking-wide text-white/50">
      Carregando…
    </div>
  );
}

export default function BookBySlug({ slug }: { slug: string }) {
  const LpComponent = LP_MAP[slug as keyof typeof LP_MAP];

  if (!LpComponent) {
    window.location.href = "https://casabonaparte.com.br";
    return null;
  }

  return (
    <Suspense fallback={<LpFallback />}>
      <LpComponent />
    </Suspense>
  );
}
