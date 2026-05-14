/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_WEBHOOK_BASE?: string;
  /** Domínio base dos hosts por livro (ex.: casabonaparte.com.br). */
  readonly VITE_BOOK_HOST_BASE?: string;
  /** URL do hub quando o visitante está num subdomínio de livro (ex.: https://bonaparte.alshamglobal.com.br). */
  readonly VITE_HUB_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
