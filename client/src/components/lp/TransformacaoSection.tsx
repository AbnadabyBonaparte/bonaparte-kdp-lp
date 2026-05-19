import { motion } from "framer-motion";
import type { BookConfig } from "@/types/book";

export default function TransformacaoSection({ config }: { config: BookConfig }) {
  if (!config.promises?.length) return null;
  return (
    <section
      className="px-6 py-24"
      style={{ backgroundColor: config.theme.surface, color: config.theme.text }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.35em] mb-4"
              style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
            >
              Transformação
            </p>
            <h2
              className="text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "var(--lp-font-title)" }}
            >
              Sem promessas milagrosas.{" "}
              <span style={{ opacity: 0.45 }}>Com ganho real de autoria, critério e presença.</span>
            </h2>
          </div>
          <p
            className="text-base leading-relaxed self-end"
            style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
          >
            Esta não é uma promessa de reinvenção instantânea. É uma proposta mais séria:
            devolver ao leitor clareza para revisar sua arquitetura interna e sustentar
            decisões com mais consciência.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {config.promises.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-xl p-7 border"
              style={{
                backgroundColor: config.theme.bg,
                borderColor: `${config.theme.primary}22`,
              }}
            >
              <div
                className="w-8 h-px mb-5"
                style={{ backgroundColor: config.theme.primary }}
              />
              <h3
                className="text-lg font-medium mb-3"
                style={{ fontFamily: "var(--lp-font-title)" }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ opacity: 0.65, fontFamily: "var(--lp-font-body)" }}
              >
                {p.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
