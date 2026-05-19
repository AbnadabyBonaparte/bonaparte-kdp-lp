import { motion } from "framer-motion";
import type { BookConfig } from "@/types/book";

export default function AutoridadeSection({ config }: { config: BookConfig }) {
  if (!config.authorSignals?.length) return null;
  return (
    <section
      id="autoridade"
      className="px-6 py-24"
      style={{ backgroundColor: config.theme.bg, color: config.theme.text }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p
            className="text-[10px] uppercase tracking-[0.35em] mb-4"
            style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
          >
            Autoridade editorial
          </p>
          <h2
            className="text-3xl sm:text-4xl leading-tight max-w-2xl"
            style={{ fontFamily: "var(--lp-font-title)" }}
          >
            Abnadaby Bonaparte não fala de torre.{" "}
            <span style={{ opacity: 0.45 }}>Fala de trincheira.</span>
          </h2>
          <p
            className="mt-5 text-base leading-relaxed max-w-2xl"
            style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
          >
            A autoridade aqui não vem de título acadêmico, de palco de congresso ou de número
            de seguidores. Vem de colapso vivido, reconstrução real e pensamento forjado na
            fricção — não na teoria.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {config.authorSignals.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-xl p-6 border"
              style={{
                backgroundColor: config.theme.surface,
                borderColor: `${config.theme.primary}20`,
              }}
            >
              <h3
                className="text-base font-medium mb-2"
                style={{ fontFamily: "var(--lp-font-title)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
              >
                {s.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
