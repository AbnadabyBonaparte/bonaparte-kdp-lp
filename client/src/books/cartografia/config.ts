import type { BookConfig } from "@/types/book";

export const cartografiaConfig: BookConfig = {
  id: "cartografia",
  slug: "cartografia",
  title: "Cartografia da Soberania Interior",
  subtitle: "Arquitetura existencial para quem se recusa a viver no automático",
  category: "Filosofia",
  hook: "A maioria das pessoas não entra em colapso.\nApenas se afasta lentamente de si mesma.",
  territory: [
    "Existe uma distância crescente entre quem você é e quem você virou sem perceber. Não foi uma decisão. Foi uma acumulação.",
    "Este livro não entrega respostas sobre como ser mais produtivo, mais organizado ou mais realizado. Ele entrega algo mais perigoso: a capacidade de ver a estrutura que você construiu para se manter longe de si mesmo.",
    "O mapa não está lá fora. Nunca esteve.",
  ],
  questions: [
    "O que acontece quando o sistema que você construiu começa a falhar?",
    "Quanto da sua vida é escolha — e quanto é apenas programação?",
    "Quando foi a última vez que você agiu de dentro?",
  ],
  leadTeaser: "Antes de comprar, entenda o terreno que este livro atravessa.",
  amazonUrl:
    "https://www.amazon.com.br/Cartografia-Soberania-Interior-Arquitetura-existencial-ebook/dp/B0GWSPPB82/",
  amazonPrice: "R$ 9,99",
  amazonPricePrint: "Consulte na página da obra",
  coverImage: "/images/bonaparte-manuscript-square.jpg",
  mindMapImage: "",
  audioEmbedUrl: "",
  emailWebhookUrl: "https://SEU_WEBHOOK_AQUI/cartografia",
  theme: {
    bg: "#090909",
    surface: "#101010",
    primary: "#C89B52",
    secondary: "#3E3426",
    accent: "#F4D8A1",
    text: "#E8DDC7",
    fontTitle: "Cormorant+Garamond:wght@600;700",
    fontBody: "Cormorant+Garamond:wght@400;500",
    fontAccent: "Inter:wght@400;500",
  },
  archetype: "O Sábio Cartógrafo",
  temperature: "Frio contemplativo com reconstrução interna gradual",
  feeling: ["sólida", "silenciosa", "arquitetônica"],
  motionProfile: "contemplativo",
  seoDescription:
    "Arquitetura existencial para quem se recusa a viver no automático — Cartografia da Soberania Interior, Casa Bonaparte.",
  ogImage: "/images/bonaparte-manuscript-square.jpg",
  audioDurationLabel: "42 minutos",
};
