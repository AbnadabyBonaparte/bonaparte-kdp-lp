import { motion } from "framer-motion";
import type { BookConfig } from "@/types/book";

export default function TrechosSection({ config }: { config: BookConfig }) {
  if (!config.quotes?.length) return null;
  return (
    <section
      className="px-6 py-24"
      style={{ backgroundColor: config.theme.surface, color: config.theme.text }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.35em] mb-4"
              style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
            >
              Trechos da obra
            </p>
            <h2
              className="text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "var(--lp-font-title)" }}
            >
              Profundidade se percebe{" "}
              <span style={{ opacity: 0.45 }}>no corte do argumento.</span>
            </h2>
          </div>
          <p
            className="text-base leading-relaxed self-end"
            style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
          >
            Formulações que aparecem na obra. Não são frases de motivação. São diagnósticos —
            e você vai reconhecer pelo menos um deles como descrição precisa da sua semana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.quotes.map((quote, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-xl p-8 border"
              style={{
                backgroundColor: config.theme.bg,
                borderColor: `${config.theme.primary}22`,
              }}
            >
              <div
                className="text-3xl leading-none mb-4 select-none"
                style={{ color: config.theme.primary, opacity: 0.35 }}
              >
                &ldquo;
              </div>
              <blockquote
                className="text-base leading-relaxed"
                style={{ fontFamily: "var(--lp-font-title)", fontStyle: "italic" }}
              >
                {quote}
              </blockquote>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
