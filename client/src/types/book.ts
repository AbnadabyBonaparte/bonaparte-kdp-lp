export type BookMotionProfile =
  | "glacial"
  | "contemplativo"
  | "moderado"
  | "urgente"
  | "electrico"
  | "subterraneo"
  | "liminal"
  | "organico";

export interface BookTheme {
  bg: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  /** Parâmetros `family=` do Google Fonts CSS2 (ex.: `Cormorant+Garamond:wght@400;600;700`) */
  fontTitle: string;
  fontBody: string;
  fontAccent: string;
}

export interface BookConfig {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  hook: string;
  territory: [string, string, string];
  questions: string[];
  leadTeaser: string;
  amazonUrl: string;
  amazonPrice: string;
  amazonPricePrint?: string;
  coverImage: string;
  heroImage?: string;
  mindMapImage?: string;
  audioEmbedUrl?: string;
  emailWebhookUrl: string;
  theme: BookTheme;
  archetype: string;
  temperature: string;
  feeling: string[];
  motionProfile: BookMotionProfile;
  seoDescription: string;
  ogImage?: string;
  audioDurationLabel?: string;
}
