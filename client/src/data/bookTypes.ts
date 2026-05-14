import type { BookConfig } from "@/types/book";

export type BookRegistryItem = Pick<BookConfig, "id" | "slug" | "title" | "coverImage" | "amazonUrl">;
