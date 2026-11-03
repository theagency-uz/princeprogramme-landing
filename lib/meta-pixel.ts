export const META_PIXEL_ID = "29133354936276505";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Called by the popup's submit handler, never by a render or success effect.
export function trackPopupLead() {
  try {
    window.fbq?.("track", "Lead");
  } catch {
    // Analytics must not turn an accepted application into a form error.
  }
}
