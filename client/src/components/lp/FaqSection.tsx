import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BookConfig } from "@/types/book";

function FaqItem({
  item,
  config,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  config: BookConfig;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className="rounded-xl border overflow-hidden"
      style={{
        backgroundColor: config.theme.surface,
        borderColor: `${config.theme.primary}22`,
      }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="text-base font-medium"
          style={{ fontFamily: "var(--lp-font-title)" }}
        >
          {item.question}
        </span>
        <span
          className="shrink-0 text-xl transition-transform duration-200"
          style={{
            color: config.theme.primary,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p
              className="px-6 pb-6 text-sm leading-relaxed"
              style={{ opacity: 0.65, fontFamily: "var(--lp-font-body)" }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function FaqSection({ config }: { config: BookConfig }) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  if (!config.faq?.length) return null;
  return (
    <section
      id="faq"
      className="px-6 py-24"
      style={{ backgroundColor: config.theme.bg, color: config.theme.text }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.35em] mb-4"
              style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
            >
              Perguntas frequentes
            </p>
            <h2
              className="text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "var(--lp-font-title)" }}
            >
              Dúvidas reais merecem{" "}
              <span style={{ opacity: 0.45 }}>respostas diretas.</span>
            </h2>
          </div>
          <p
            className="text-base leading-relaxed self-end"
            style={{ opacity: 0.62, fontFamily: "var(--lp-font-body)" }}
          >
            Sem enrolação. Sem pressão. Se algo não ficou claro nas seções anteriores,
            está respondido aqui.
          </p>
        </div>

        <div className="space-y-3">
          {config.faq.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              config={config}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
