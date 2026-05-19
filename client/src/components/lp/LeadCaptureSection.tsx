import { FormEvent, useState } from "react";
import type { BookConfig } from "@/types/book";

const DEFAULT_DELIVERABLES = [
  { index: "01", title: "Resumo do livro em PDF", text: "Os pontos centrais da obra, estruturados para leitura rápida." },
  { index: "02", title: "Mapa mental completo", text: "Visualize a arquitetura do livro antes de começar — saiba onde cada capítulo leva." },
  { index: "03", title: "Debate em áudio", text: "Duas vozes analisando o livro — perspectivas cruzadas sobre os argumentos centrais." },
  { index: "04", title: "Acesso direto à obra", text: "Link direto para a Amazon, com intenção de leitura já formada." },
];

function resolveWebhook(config: BookConfig): string {
  const base = import.meta.env.VITE_LEAD_WEBHOOK_BASE as string | undefined;
  if (base && base.length > 0) return `${base.replace(/\/$/, "")}/${config.slug}`;
  return config.emailWebhookUrl;
}

export default function LeadCaptureSection({
  config,
  onSuccess,
}: {
  config: BookConfig;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const webhook = resolveWebhook(config);
  const deliverables = config.deliverables ?? DEFAULT_DELIVERABLES;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          bookId: config.id,
          bookSlug: config.slug,
        }),
      });
      if (res.ok) {
        setStatus("success");
        onSuccess();
        setName(""); setEmail(""); setWhatsapp("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="dossie"
      className="px-6 py-24"
      style={{ backgroundColor: config.theme.surface, color: config.theme.text }}
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Esquerda — entregáveis */}
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.35em] mb-4"
            style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
          >
            Acesso gratuito
          </p>
          <h2
            className="text-3xl leading-tight mb-4"
            style={{ fontFamily: "var(--lp-font-title)" }}
          >
            {config.leadTeaser}
          </h2>
          <p
            className="text-sm leading-relaxed mb-10"
            style={{ opacity: 0.65, fontFamily: "var(--lp-font-body)" }}
          >
            Antes de qualquer decisão de compra, receba o dossiê introdutório e chegue ao
            livro com o terreno já preparado.
          </p>
          <div className="space-y-3">
            {deliverables.map((d) => (
              <div
                key={d.index}
                className="flex gap-4 rounded-xl p-4 border"
                style={{
                  backgroundColor: config.theme.bg,
                  borderColor: `${config.theme.primary}22`,
                }}
              >
                <span
                  className="text-xs font-mono shrink-0 pt-0.5"
                  style={{ color: config.theme.primary }}
                >
                  {d.index}
                </span>
                <div>
                  <p
                    className="text-sm font-medium mb-0.5"
                    style={{ fontFamily: "var(--lp-font-body)" }}
                  >
                    {d.title}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ opacity: 0.55, fontFamily: "var(--lp-font-body)" }}
                  >
                    {d.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direita — formulário */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: config.theme.bg,
            borderColor: `${config.theme.primary}28`,
          }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.35em] mb-3"
            style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
          >
            Acesso imediato · gratuito
          </p>
          <h3
            className="text-2xl leading-tight mb-2"
            style={{ fontFamily: "var(--lp-font-title)" }}
          >
            Antes da obra completa,<br />um ponto de clareza.
          </h3>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
          >
            Preencha e o dossiê chega no seu e-mail em minutos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Nome", value: name, setter: setName, type: "text", placeholder: "Seu primeiro nome", auto: "name", required: true },
              { label: "E-mail", value: email, setter: setEmail, type: "email", placeholder: "voce@email.com", auto: "email", required: true },
              { label: "WhatsApp (opcional)", value: whatsapp, setter: setWhatsapp, type: "tel", placeholder: "+55 11 99999-9999", auto: "tel", required: false },
            ].map(({ label, value, setter, type, placeholder, auto, required }) => (
              <label key={label} className="block">
                <span
                  className="text-xs block mb-1"
                  style={{ opacity: 0.55, fontFamily: "var(--lp-font-accent)" }}
                >
                  {label}
                </span>
                <input
                  type={type}
                  value={value}
                  onChange={(ev) => setter(ev.target.value)}
                  placeholder={placeholder}
                  autoComplete={auto}
                  required={required}
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none border transition-colors"
                  style={{
                    backgroundColor: config.theme.surface,
                    color: config.theme.text,
                    borderColor: `${config.theme.primary}35`,
                    fontFamily: "var(--lp-font-body)",
                  }}
                />
              </label>
            ))}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg py-3.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{
                backgroundColor: config.theme.primary,
                color: config.theme.bg,
                fontFamily: "var(--lp-font-accent)",
              }}
            >
              {status === "loading" ? "Enviando…" : "Acessar o dossiê"}
            </button>

            {status === "success" && (
              <p className="text-xs text-center" style={{ color: "#4ade80" }}>
                Dossiê enviado. Verifique seu e-mail.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-center" style={{ color: "#f87171" }}>
                Erro ao enviar. Tente novamente.
              </p>
            )}
            <p
              className="text-xs text-center"
              style={{ opacity: 0.35, fontFamily: "var(--lp-font-body)" }}
            >
              Sem spam. Só o essencial.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
