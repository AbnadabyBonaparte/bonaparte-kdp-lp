/** Monta um único link CSS2 do Google Fonts (parâmetros `family=` já no formato do Google). */
export function buildGoogleFontsHref(theme: {
  fontTitle: string;
  fontBody: string;
  fontAccent: string;
}): string {
  const families = [theme.fontTitle, theme.fontBody, theme.fontAccent]
    .map(s => s.trim())
    .filter(Boolean);
  const qs = families.map(f => `family=${f}`).join("&");
  return `https://fonts.googleapis.com/css2?${qs}&display=swap`;
}
