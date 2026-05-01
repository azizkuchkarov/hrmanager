import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-muted/30 mt-16">
      <div className="container mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-semibold text-lg mb-2">HR Portal</div>
          <p className="text-sm text-muted-foreground">
            O&apos;zbekiston HRlari uchun bepul maqolalar, qonunchilik, kalkulyatorlar va hujjat shablonlari.
          </p>
        </div>

        <div>
          <div className="font-semibold mb-3 text-sm">Bo&apos;limlar</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/maqolalar" className="hover:text-foreground">Maqolalar</Link></li>
            <li><Link href="/qonunchilik" className="hover:text-foreground">Qonunchilik</Link></li>
            <li><Link href="/kalkulyatorlar" className="hover:text-foreground">Kalkulyatorlar</Link></li>
            <li><Link href="/hujjatlar" className="hover:text-foreground">Hujjatlar</Link></li>
            <li><Link href="/yangiliklar" className="hover:text-foreground">Yangiliklar</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3 text-sm">Manbalar</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://lex.uz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Lex.uz</a></li>
            <li><a href="https://my.mehnat.uz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">my.mehnat.uz</a></li>
            <li><a href="https://soliq.uz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Soliq.uz</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3 text-sm">Ogohlantirish</div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Portaldagi ma&apos;lumotlar yuridik maslahat emas. Aniq holat uchun amaldagi qonun
            hujjatlariga yoki yurist maslahatiga murojaat qiling.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground">
          &copy; {year} HR Portal. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
}
