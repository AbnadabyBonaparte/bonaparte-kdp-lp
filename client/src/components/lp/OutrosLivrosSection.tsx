import { Link } from "wouter";
import BookCover from "@/components/ui/BookCover";
import type { BookRegistryItem } from "@/data/bookTypes";

type Props = {
  currentBookId: string;
  items: BookRegistryItem[];
};

export default function OutrosLivrosSection({ currentBookId, items }: Props) {
  const others = items.filter(b => b.id !== currentBookId);
  return (
    <section className="border-t border-white/5 bg-[color:var(--book-bg)] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <img
              src="/brand/logo2.png"
              alt=""
              className="mb-4 h-5 w-auto opacity-80"
              onError={e => ((e.target as HTMLImageElement).style.display = "none")}
            />
            <h2 className="text-xl text-[color:var(--book-text)] sm:text-2xl" style={{ fontFamily: "var(--lp-font-title)" }}>
              Explore o ecossistema Bonaparte
            </h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
          {others.map(b => (
            <Link
              key={b.id}
              href={`/${b.slug}`}
              className="group flex w-[42vw] max-w-[200px] shrink-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-black/20 transition hover:border-[color:var(--book-primary)]/40 md:w-auto md:max-w-none"
            >
              <div className="aspect-[2/3] w-full overflow-hidden">
                <BookCover src={b.coverImage} alt={b.title} className="transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="line-clamp-2 text-sm font-medium text-[color:var(--book-text)]" style={{ fontFamily: "var(--lp-font-body)" }}>
                  {b.title}
                </p>
                <span className="text-xs text-[color:var(--book-primary)]">→ Ver livro</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
