/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_WEBHOOK_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
