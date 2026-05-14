import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { trackLpEvent } from "@/lib/trackLp";

type Props = {
  webhookUrl: string;
  bookId: string;
  className?: string;
  onSuccess: () => void;
};

export default function EmailForm({ webhookUrl, bookId, className, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, book: bookId }),
      });
      if (!res.ok) throw new Error("webhook");
      setStatus("success");
      trackLpEvent("email_submitted", { book: bookId });
      onSuccess();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full max-w-md flex-col gap-3 sm:flex-row", className)}>
      <Input
        type="email"
        required
        name="email"
        autoComplete="email"
        placeholder="Seu email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={status === "loading" || status === "success"}
        className="border-white/15 bg-black/40 text-[color:var(--book-text)] placeholder:text-[color:var(--book-text)]/35"
      />
      <Button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="shrink-0 bg-[color:var(--book-primary)] text-black hover:bg-[color:var(--book-accent)]"
      >
        {status === "success" ? "Enviado" : status === "loading" ? "Enviando…" : "Quero acesso gratuito"}
      </Button>
      {status === "error" ? (
        <p className="w-full text-sm text-red-300 sm:col-span-2">Não foi possível enviar. Tente de novo.</p>
      ) : null}
    </form>
  );
}
