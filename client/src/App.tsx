/*
Design philosophy for this file: a aplicação deve nascer no modo escuro editorial para preservar contraste,
coerência de marca e atmosfera cinematográfica desde o primeiro paint.
*/

import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getBookSlugFromHostname } from "@/lib/bookHostname";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const CartografiaLP = lazy(() => import("@/books/cartografia/CartografiaLP"));
const HeimatLP = lazy(() => import("@/books/heimat/HeimatLP"));
const FilhosPrussiaLP = lazy(() => import("@/books/filhos-prussia/FilhosPrussiaLP"));
const DeusNaoSeparaLP = lazy(() => import("@/books/deus-nao-separa/DeusNaoSeparaLP"));
const CodigoAscensaoLP = lazy(() => import("@/books/codigo-ascensao/CodigoAscensaoLP"));
const LicencaLP = lazy(() => import("@/books/licenca/LicencaLP"));
const OQueNaoComecouLP = lazy(() => import("@/books/o-que-nao-comecou/OQueNaoComecouLP"));
const BurnoutLP = lazy(() => import("@/books/burnout/BurnoutLP"));

function LpFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090909] text-sm tracking-wide text-white/50">
      Carregando…
    </div>
  );
}

const LP_BY_SLUG: Record<string, LazyExoticComponent<ComponentType>> = {
  cartografia: CartografiaLP,
  heimat: HeimatLP,
  "filhos-prussia": FilhosPrussiaLP,
  "deus-nao-separa": DeusNaoSeparaLP,
  "codigo-ascensao": CodigoAscensaoLP,
  licenca: LicencaLP,
  "o-que-nao-comecou": OQueNaoComecouLP,
  burnout: BurnoutLP,
};

function HostBookRouter({ slug }: { slug: string }) {
  const Cmp = LP_BY_SLUG[slug];
  if (!Cmp) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LpFallback />}>
      <Cmp />
    </Suspense>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/cartografia">
        <Suspense fallback={<LpFallback />}>
          <CartografiaLP />
        </Suspense>
      </Route>
      <Route path="/heimat">
        <Suspense fallback={<LpFallback />}>
          <HeimatLP />
        </Suspense>
      </Route>
      <Route path="/filhos-prussia">
        <Suspense fallback={<LpFallback />}>
          <FilhosPrussiaLP />
        </Suspense>
      </Route>
      <Route path="/deus-nao-separa">
        <Suspense fallback={<LpFallback />}>
          <DeusNaoSeparaLP />
        </Suspense>
      </Route>
      <Route path="/codigo-ascensao">
        <Suspense fallback={<LpFallback />}>
          <CodigoAscensaoLP />
        </Suspense>
      </Route>
      <Route path="/licenca">
        <Suspense fallback={<LpFallback />}>
          <LicencaLP />
        </Suspense>
      </Route>
      <Route path="/o-que-nao-comecou">
        <Suspense fallback={<LpFallback />}>
          <OQueNaoComecouLP />
        </Suspense>
      </Route>
      <Route path="/burnout">
        <Suspense fallback={<LpFallback />}>
          <BurnoutLP />
        </Suspense>
      </Route>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const bookSlug =
    typeof window !== "undefined" ? getBookSlugFromHostname(window.location.hostname) : null;

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          {bookSlug ? <HostBookRouter slug={bookSlug} /> : <Router />}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
