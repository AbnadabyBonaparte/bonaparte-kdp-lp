import { motion } from "framer-motion";
import type { BookConfig } from "@/types/book";

export default function FechamentoSection({ config }: { config: BookConfig }) {
  if (!config.finalHeading) return null;
  const lines = (config.finalBody ?? "").split("\n").filter(Boolean);
  return (
    <section
      className="px-6 py-28"
      style={{ backgroundColor: config.theme.surface, color: config.theme.text }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.35em] mb-8"
            style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
          >
            Casa Bonaparte
          </p>
          <h2
            className="text-4xl sm:text-5xl leading-tight mb-8"
            style={{ fontFamily: "var(--lp-font-title)" }}
          >
            {config.finalHeading}
          </h2>
          <div className="space-y-4 mb-12">
            {lines.map((line, i) => (
              <p
                key={i}
                className="text-base leading-relaxed"
                style={{
                  opacity: i === lines.length - 1 ? 1 : 0.65,
                  fontFamily: "var(--lp-font-body)",
                  fontStyle: i === lines.length - 1 ? "italic" : "normal",
                }}
              >
                {line}
              </p>
            ))}
          </div>
          <a
            href={config.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg px-10 py-4 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: config.theme.primary,
              color: config.theme.bg,
              fontFamily: "var(--lp-font-accent)",
            }}
          >
            Acessar na Amazon — {config.amazonPrice}
          </a>
          <p
            className="mt-5 text-xs"
            style={{ opacity: 0.35, fontFamily: "var(--lp-font-body)" }}
          >
            Leitura imediata. Sem distração. Sem excesso.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
