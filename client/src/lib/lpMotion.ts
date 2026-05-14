import type { BookMotionProfile } from "@/types/book";

export function heroMotionFromProfile(profile: BookMotionProfile): {
  duration: number;
  delay: number;
  ease: [number, number, number, number];
} {
  switch (profile) {
    case "glacial":
      return { duration: 1.35, delay: 0.12, ease: [0.22, 1, 0.36, 1] };
    case "organico":
      return { duration: 1.22, delay: 0.1, ease: [0.33, 1, 0.68, 1] };
    case "contemplativo":
      return { duration: 1.12, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] };
    case "moderado":
      return { duration: 0.95, delay: 0.06, ease: [0.4, 0, 0.2, 1] };
    case "liminal":
      return { duration: 1.05, delay: 0.1, ease: [0.55, 0, 0.1, 1] };
    case "subterraneo":
      return { duration: 1.0, delay: 0.08, ease: [0.45, 0, 0.55, 1] };
    case "urgente":
      return { duration: 0.72, delay: 0.04, ease: [0.4, 0, 0.6, 1] };
    case "electrico":
      return { duration: 0.52, delay: 0.02, ease: [0.16, 1, 0.3, 1] };
    default:
      return { duration: 1, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] };
  }
}
