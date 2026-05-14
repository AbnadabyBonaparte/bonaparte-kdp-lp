import { motion } from "framer-motion";
import type { BookConfig } from "@/types/book";

type Props = { config: BookConfig };

export default function TerritorioSection({ config }: Props) {
  return (
    <section
      className="px-6 py-24 sm:py-32"
      style={{ backgroundColor: config.theme.surface, color: config.theme.text }}
    >
      <div className="mx-auto max-w-[680px] text-center">
        <p
          className="mb-10 text-[10px] uppercase tracking-[0.3em] text-[color:var(--book-primary)]"
          style={{ fontFamily: "var(--lp-font-accent)" }}
        >
          O território
        </p>
        {config.territory.map((p, i) => (
          <motion.p
            key={i}
            className="mb-8 text-lg leading-relaxed sm:text-xl"
            style={{ fontFamily: "var(--lp-font-body)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {p}
          </motion.p>
        ))}
        <div
          className="mx-auto my-12 h-px max-w-xs bg-[color:var(--book-primary)]/35"
          aria-hidden
        />
        <div className="flex flex-col gap-6">
          {config.questions.map((q, i) => (
            <motion.p
              key={i}
              className="text-base italic leading-relaxed text-[color:var(--book-text)]/80 sm:text-lg"
              style={{ fontFamily: "var(--lp-font-body)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.65 }}
            >
              {q}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
