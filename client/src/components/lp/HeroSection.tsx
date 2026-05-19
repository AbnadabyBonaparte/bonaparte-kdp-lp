import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { heroMotionFromProfile } from "@/lib/lpMotion";
import type { BookConfig } from "@/types/book";
import { ChevronDown } from "lucide-react";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

type Props = { config: BookConfig };

export default function HeroSection({ config }: Props) {
  const m = heroMotionFromProfile(config.motionProfile);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowArrow(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      className="relative flex min-h-[100dvh] items-center px-6 pb-16 pt-24"
      style={{ backgroundColor: config.theme.bg, color: config.theme.text }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 25% 50%, ${config.theme.primary}09 0%, transparent 65%), linear-gradient(180deg, ${config.theme.bg}bb 0%, ${config.theme.bg} 80%)`,
        }}
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">
        {/* Book cover — above text on mobile, right column on desktop */}
        {config.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: m.duration * 1.1, delay: m.delay + 0.2, ease: m.ease }}
            className="order-first flex justify-center lg:order-last lg:justify-end"
          >
            <img
              src={config.coverImage}
              alt={config.title}
              className="block w-auto rounded-xl"
              style={{
                maxHeight: "clamp(220px, 38vw, 500px)",
                boxShadow: `0 40px 100px ${config.theme.primary}28, 0 12px 32px #00000075`,
              }}
            />
          </motion.div>
        )}

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: m.duration, delay: m.delay, ease: m.ease }}
          className={`flex flex-col gap-6 ${config.coverImage ? "text-center lg:text-left" : "mx-auto max-w-4xl text-center"}`}
        >
          <img
            src="/brand/logo.png"
            alt="Casa Bonaparte"
            className={`h-9 w-auto opacity-90 self-center ${config.coverImage ? "lg:self-start" : ""}`}
            onError={e => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <p
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ color: config.theme.primary, fontFamily: "var(--lp-font-accent)" }}
          >
            {config.category}
          </p>
          <h1
            className="whitespace-pre-line text-balance text-4xl leading-[1.08] sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--lp-font-title)" }}
          >
            {config.hook}
          </h1>
          <p
            className="max-w-2xl text-balance text-base leading-relaxed sm:text-lg"
            style={{ fontFamily: "var(--lp-font-body)", opacity: 0.72 }}
          >
            {config.subtitle}
          </p>
        </motion.div>
      </div>

      {showArrow ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-10 left-1/2 z-[1] -translate-x-1/2"
          aria-hidden
        >
          <ChevronDown className="h-8 w-8 animate-bounce text-[color:var(--book-primary)]" strokeWidth={1} />
        </motion.div>
      ) : null}
    </section>
  );
}
