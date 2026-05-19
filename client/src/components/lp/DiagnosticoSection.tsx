import { motion } from "framer-motion";
import type { BookConfig } from "@/types/book";

export default function DiagnosticoSection({ config }: { config: BookConfig }) {
  if (!config.diagnosis?.length) return null;
  return (
    <section
      id="diagnostico"
      className="px-6 py-24"
      style={{ backgroundColor: config.theme.bg, color: config.theme.text }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.35em] mb-4"
              style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
            >
              Diagnóstico
            </p>
            <h2
              className="text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "var(--lp-font-title)" }}
            >
              A maioria das pessoas não está perdida.{" "}
              <span style={{ opacity: 0.45 }}>Está funcional.</span>
            </h2>
          </div>
          <p
            className="text-base leading-relaxed self-end"
            style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
          >
            {config.diagnosisIntro ??
              "Cumpre tarefas. Mantém a rotina. Resolve o que precisa ser resolvido. Mas vive uma forma silenciosa de ausência. Tudo opera. Mas nem tudo pertence."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.diagnosis.map((item, i) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="rounded-xl p-6 border"
                style={{
                  backgroundColor: config.theme.surface,
                  borderColor: `${config.theme.primary}20`,
                }}
              >
                <span
                  className="text-xs font-mono block mb-3"
                  style={{ color: config.theme.primary }}
                >
                  {item.number}
                </span>
                <h3
                  className="text-base font-medium mb-2"
                  style={{ fontFamily: "var(--lp-font-title)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
                >
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl p-8 flex flex-col justify-center border"
            style={{
              backgroundColor: config.theme.surface,
              borderColor: `${config.theme.primary}20`,
            }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.35em] mb-6"
              style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
            >
              Ruptura
            </p>
            <blockquote
              className="text-2xl leading-snug mb-5"
              style={{ fontFamily: "var(--lp-font-title)" }}
            >
              {config.diagnosisQuote ?? "O problema não é falta de esforço. É mais profundo."}
            </blockquote>
            <p
              className="text-sm leading-relaxed"
              style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
            >
              {config.diagnosisQuoteBody ??
                "Você pode estar vivendo um projeto que nunca foi realmente seu. E isso não aparece como crise — aparece como rotina."}
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
