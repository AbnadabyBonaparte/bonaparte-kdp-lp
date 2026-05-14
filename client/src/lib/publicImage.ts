/** Caminho público para ficheiro em `client/public/images/`. */
export function publicImage(file: string): string {
  return `/images/${encodeURIComponent(file)}`;
}
