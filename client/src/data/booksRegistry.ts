import type { BookRegistryItem } from "./bookTypes";

export type { BookRegistryItem } from "./bookTypes";

const img = (file: string) => `/images/${encodeURIComponent(file)}`;

/** Metadados para navegação entre LPs — evita importar todos os configs no chunk da LP. */
export const BOOK_REGISTRY: BookRegistryItem[] = [
  {
    id: "cartografia",
    slug: "cartografia",
    title: "Cartografia da Soberania Interior",
    coverImage: "/images/bonaparte-manuscript-square.jpg",
    amazonUrl:
      "https://www.amazon.com.br/Cartografia-Soberania-Interior-Arquitetura-existencial-ebook/dp/B0GWSPPB82",
  },
  {
    id: "heimat",
    slug: "heimat",
    title: "HEIMAT",
    coverImage: "/images/heimat.jpg",
    amazonUrl: "https://www.amazon.com.br/HEIMAT-Animal-Ancestral-Humano-Opcional-ebook/dp/B0GWWS17TF",
  },
  {
    id: "filhos-prussia",
    slug: "filhos-prussia",
    title: "Filhos da Prússia",
    coverImage: "/images/filho_da_prussia.jpg",
    amazonUrl: "https://www.amazon.com.br/FILHOS-PR%C3%9ASSIA-Voc%C3%AA-constru%C3%ADdo-educado-ebook/dp/B0GWSKJK92",
  },
  {
    id: "deus-nao-separa",
    slug: "deus-nao-separa",
    title: "O Deus Que Não Se Separa",
    coverImage: "/images/O_DEUS_QUE_NAO_SE_SEPARA.jpg",
    amazonUrl: "https://www.amazon.com.br/Deus-Que-N%C3%A3o-Se-Separa-ebook/dp/B0GZNQQH3K",
  },
  {
    id: "codigo-ascensao",
    slug: "codigo-ascensao",
    title: "O Código da Ascensão",
    coverImage: img("o codigo da ascençao.jpg"),
    amazonUrl: "https://www.amazon.com.br/C%C3%B3digo-Ascens%C3%A3o-Manifesto-Engenharia-Existencial-ebook/dp/B0GWW2HGSV",
  },
  {
    id: "licenca",
    slug: "licenca",
    title: "Licença",
    coverImage: img("licença.jpg"),
    amazonUrl:
      "https://www.amazon.com.br/Licen%C3%A7a-continua-quando-voc%C3%AA-repetir-ebook/dp/B0GZCVJQRP",
  },
  {
    id: "o-que-nao-comecou",
    slug: "o-que-nao-comecou",
    title: "O Que Não Começou",
    coverImage: img("o que não começou.jpg"),
    amazonUrl:
      "https://www.amazon.com.br/Que-N%C3%A3o-Come%C3%A7ou-travessia-identidade-ebook/dp/B0GZP2DSL8",
  },
  {
    id: "burnout",
    slug: "burnout",
    title: "Cura Natural para Burnout",
    coverImage: "/images/burnout.png",
    amazonUrl: "https://www.amazon.com.br/Cura-Natural-Burnout-Estresse-Exaust%C3%A3o-ebook/dp/B0GWSCKZCC",
  },
];
