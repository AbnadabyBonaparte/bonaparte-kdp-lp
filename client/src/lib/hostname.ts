const IGNORED = ["www", "bazar", "musica", "familia"];

const VALID_SLUGS = [
  "cartografia",
  "heimat",
  "burnout",
  "filhos-prussia",
  "codigo-ascensao",
  "licenca",
  "o-que-nao-comecou",
  "deus-nao-separa",
] as const;

export type BookSlug = (typeof VALID_SLUGS)[number];

/** Returns the book slug if running on a Bonaparte book subdomain, null otherwise. */
export function getBookSlug(): BookSlug | null {
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length < 3) return null;
  const sub = parts[0];
  if (IGNORED.includes(sub)) return null;
  return (VALID_SLUGS as readonly string[]).includes(sub) ? (sub as BookSlug) : null;
}
