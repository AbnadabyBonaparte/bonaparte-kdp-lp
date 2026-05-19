import { motion } from "framer-motion";
import type { BookConfig } from "@/types/book";

export default function MetricasSection({ config }: { config: BookConfig }) {
  if (!config.metrics?.length) return null;
  return (
    <section
      className="px-6 py-12"
      style={{ backgroundColor: config.theme.surface, color: config.theme.text }}
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        {config.metrics.map((m, i) => (
          <motion.article
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: config.theme.bg,
              borderColor: `${config.theme.primary}22`,
            }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] block mb-3"
              style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
            >
              {m.label}
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ opacity: 0.75, fontFamily: "var(--lp-font-body)" }}
            >
              {m.value}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
