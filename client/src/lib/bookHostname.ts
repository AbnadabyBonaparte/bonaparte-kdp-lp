/** Slugs com LP dedicada — alinhados às rotas `/slug` e aos subdomínios `slug.<base>`. */
export const BOOK_LP_SLUGS = [
  "cartografia",
  "heimat",
  "filhos-prussia",
  "deus-nao-separa",
  "codigo-ascensao",
  "licenca",
  "o-que-nao-comecou",
  "burnout",
] as const;

export type BookLpSlug = (typeof BOOK_LP_SLUGS)[number];

export function getBookHostBase(): string {
  return (import.meta.env.VITE_BOOK_HOST_BASE as string | undefined)?.trim() || "casabonaparte.com.br";
}

/** URL do hub editorial (voltar do subdomínio do livro). Override: `VITE_HUB_ORIGIN`. */
export function getHubOrigin(): string {
  const fromEnv = (import.meta.env.VITE_HUB_ORIGIN as string | undefined)?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "https://bonaparte.alshamglobal.com.br";
}

/**
 * Se o hostname for `cartografia.casabonaparte.com.br` (etc.), devolve o slug do livro.
 * `www.casabonaparte.com.br` e `casabonaparte.com.br` não são livro (hub noutro host).
 */
export function getBookSlugFromHostname(hostname: string): BookLpSlug | null {
  const h = hostname.trim().toLowerCase();
  const base = getBookHostBase().toLowerCase();
  if (h === base || h === `www.${base}`) return null;
  const suffix = `.${base}`;
  if (!h.endsWith(suffix)) return null;
  const sub = h.slice(0, -suffix.length);
  if (!sub || sub.includes(".") || sub === "www") return null;
  return (BOOK_LP_SLUGS as readonly string[]).includes(sub) ? (sub as BookLpSlug) : null;
}

/** Ambientes onde mantemos rotas `/slug` (sem subdomínio canónico). */
function isLocalOrPreviewHost(hostname: string): boolean {
  const h = hostname.trim().toLowerCase();
  if (h === "localhost" || h === "127.0.0.1") return true;
  if (h.endsWith(".local")) return true;
  if (h.endsWith(".vercel.app")) return true;
  return false;
}

/** URL canónica da LP no domínio do livro (produção). */
export function bookCanonicalSubdomainUrl(slug: string): string {
  const base = getBookHostBase();
  return `https://${slug}.${base}/`;
}

/** Estamos num host `*.casabonaparte.com.br` de um livro (navegação entre livros por subdomínio). */
export function isBookSubdomainHost(hostname: string): boolean {
  return getBookSlugFromHostname(hostname) !== null;
}

/**
 * Link para a LP de um livro:
 * - Entre hosts de livro: URL absoluta `https://<slug>.<base>/`
 * - Hub em produção (ex.: bonaparte.alshamglobal.com.br): mesma URL canónica por subdomínio
 * - Localhost / preview Vercel: path relativo `/<slug>`
 */
export function bookLpHref(
  slug: string,
  hostname: string = typeof window !== "undefined" ? window.location.hostname : "",
): string {
  if (isBookSubdomainHost(hostname)) {
    return bookCanonicalSubdomainUrl(slug);
  }
  if (isLocalOrPreviewHost(hostname)) {
    return `/${slug}`;
  }
  return bookCanonicalSubdomainUrl(slug);
}

export function hubHref(hostname: string = typeof window !== "undefined" ? window.location.hostname : ""): string {
  if (isBookSubdomainHost(hostname)) return `${getHubOrigin()}/`;
  return "/";
}
