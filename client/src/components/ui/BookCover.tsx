import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function BookCover({ src, alt, className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
    />
  );
}
