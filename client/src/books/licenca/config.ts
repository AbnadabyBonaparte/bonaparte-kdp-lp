import type { BookConfig } from "@/types/book";
import { publicImage } from "@/lib/publicImage";

export const licencaConfig: BookConfig = {
  id: "licenca",
  slug: "licenca",
  title: "Licença",
  subtitle: "O Que Continua Quando Você Para de Repetir",
  category: "Autoconhecimento · Psicologia",
  hook: "Existem padrões que sobrevivem por gerações.\nComportamentos. Medos. Reações. Silêncios.\nE quase sempre chamamos isso de personalidade.",
  territory: [
    "Parte da sua vida talvez nunca tenha sido realmente sua. Não por falta de vontade. Por falta de interrupção.",
    "Este não é um livro sobre motivação. É sobre o momento em que você percebe que está repetindo algo que não escolheu — e que essa repetição tem nome, história e origem.",
    "Interrupção não é ruptura. É o início de uma escolha que finalmente pertence a você.",
  ],
  questions: [
    "Quais dos seus comportamentos foram seus — e quais foram herdados sem assinatura?",
    "Como se interrompe um padrão que você não sabia que estava executando?",
    "O que sobra da identidade quando a herança emocional é retirada?",
  ],
  leadTeaser: "Veja o padrão antes de decidir se vai continuar executando-o.",
  amazonUrl:
    "https://www.amazon.com.br/Licen%C3%A7a-continua-quando-voc%C3%AA-repetir-ebook/dp/B0GZCVJQRP",
  amazonPrice: "R$ 9,99",
  amazonPricePrint: "Consulte na página da obra",
  coverImage: publicImage("licença.jpg"),
  mindMapImage: "",
  audioEmbedUrl: "",
  emailWebhookUrl: "https://SEU_WEBHOOK_AQUI/licenca",
  theme: {
    bg: "#0B0908",
    surface: "#141110",
    primary: "#B98A58",
    secondary: "#5E4632",
    accent: "#D9C8AF",
    text: "#EFE6DA",
    fontTitle: "Playfair+Display:ital,wght@0,700;1,700",
    fontBody: "Lora:wght@400;500",
    fontAccent: "Montserrat:wght@300;400",
  },
  archetype: "O Despertador Interno",
  temperature: "Suspensão psicológica subterrânea",
  feeling: ["íntima", "inquietante", "psicológica"],
  motionProfile: "subterraneo",
  seoDescription: "Licença — o que continua quando você para de repetir. Interrupção de padrões, Casa Bonaparte.",
  ogImage: publicImage("licença.jpg"),
  audioDurationLabel: "41 minutos",
};
