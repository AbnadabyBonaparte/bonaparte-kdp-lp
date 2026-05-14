declare global {
  interface Window {
    umami?: (event: string, props?: Record<string, string | number | boolean>) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLpEvent(
  event: "email_submitted" | "amazon_click",
  payload: Record<string, string | number | boolean> = {},
) {
  try {
    window.umami?.(event, { ...payload });
  } catch {
    /* ignore */
  }
  try {
    window.gtag?.("event", event, payload);
  } catch {
    /* ignore */
  }
}
