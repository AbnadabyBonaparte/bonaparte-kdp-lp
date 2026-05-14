import LpEmailForm from "@/components/ui/LpEmailForm";
import type { BookConfig } from "@/types/book";

type Props = {
  config: BookConfig;
  onSuccess: () => void;
};

function resolveWebhook(config: BookConfig): string {
  const base = import.meta.env.VITE_LEAD_WEBHOOK_BASE as string | undefined;
  if (base && base.length > 0) {
    return `${base.replace(/\/$/, "")}/${config.slug}`;
  }
  return config.emailWebhookUrl;
}

export default function LeadCaptureSection({ config, onSuccess }: Props) {
  const webhook = resolveWebhook(config);
  return (
    <section className="px-6 py-24 sm:py-28" style={{ backgroundColor: "#050505", color: "#e8e6e1" }}>
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[color:var(--book-primary)]">
          Acesso gratuito
        </p>
        <p className="mb-8 text-lg leading-relaxed text-white/85" style={{ fontFamily: "var(--lp-font-body)" }}>
          {config.leadTeaser}
        </p>
        <ul
          className="mb-10 space-y-2 text-left text-sm leading-relaxed text-white/70"
          style={{ fontFamily: "var(--lp-font-body)" }}
        >
          <li>• Resumo do livro em PDF</li>
          <li>• Mapa mental completo</li>
          <li>• Debate em áudio — duas vozes analisando o livro</li>
        </ul>
        <LpEmailForm webhookUrl={webhook} bookId={config.id} onSuccess={onSuccess} className="justify-center" />
        <p className="mt-4 text-xs text-white/45">Sem spam. Só o essencial.</p>
      </div>
    </section>
  );
}
