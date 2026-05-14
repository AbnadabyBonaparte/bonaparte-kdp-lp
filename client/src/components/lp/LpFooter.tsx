import { Link } from "wouter";

export default function LpFooter() {
  return (
    <footer className="border-t border-white/5 bg-black px-6 py-16 text-center text-[#c8c4bc]">
      <img
        src="/brand/logo.png"
        alt="Casa Bonaparte"
        className="mx-auto mb-6 h-7 w-auto opacity-90"
        onError={e => ((e.target as HTMLImageElement).style.display = "none")}
      />
      <p className="text-[10px] uppercase tracking-[0.35em] text-[#a39e94]">Casa Bonaparte</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9a9590]">
        Consciência · Pertencimento · Ancestralidade
      </p>
      <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#c8a96e]">
        <Link href="/" className="hover:underline">
          Hub
        </Link>
        <a href="https://www.instagram.com/abnadabybonaparte/" className="hover:underline" target="_blank" rel="noreferrer">
          Músico
        </a>
        <a href="https://casabonaparte.com.br" className="hover:underline" target="_blank" rel="noreferrer">
          Família
        </a>
        <span className="cursor-default text-[#6f6b64]">Expedição</span>
      </nav>
      <a href="https://casabonaparte.com.br" className="mt-6 inline-block text-sm text-[#e8e2d9] underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
        casabonaparte.com.br
      </a>
    </footer>
  );
}
