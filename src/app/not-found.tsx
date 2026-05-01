import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="size-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
        <SearchX className="size-8 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-3">Sahifa topilmadi</h1>
      <p className="text-muted-foreground mb-6">
        Siz qidirayotgan sahifa o&apos;chirilgan yoki manzil noto&apos;g&apos;ri kiritilgan bo&apos;lishi mumkin.
      </p>
      <Link
        href="/"
        className="inline-flex items-center h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
