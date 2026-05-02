import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:gap-12 md:grid-cols-12">
          <div className="md:col-span-4 text-center md:text-left">
            <div className="font-bold text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              HR Portal
            </div>
            <p className="text-slate-500 leading-relaxed mb-6 max-w-sm mx-auto md:mx-0">
              O&apos;zbekiston HRlari uchun professional yordamchi platforma. Biz kadrlar boshqaruvini oson va shaffof qilishni maqsad qilganmiz.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="size-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer shadow-sm">
                <span className="text-xs font-bold">TG</span>
              </div>
              <div className="size-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer shadow-sm">
                <span className="text-xs font-bold">FB</span>
              </div>
              <div className="size-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer shadow-sm">
                <span className="text-xs font-bold">IN</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-2">
            <div>
              <div className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-[10px] md:text-xs">Bo&apos;limlar</div>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="/maqolalar" className="hover:text-indigo-600 transition-colors">Maqolalar</Link></li>
                <li><Link href="/qonunchilik" className="hover:text-indigo-600 transition-colors">Qonunchilik</Link></li>
                <li><Link href="/kalkulyatorlar" className="hover:text-indigo-600 transition-colors">Kalkulyatorlar</Link></li>
                <li><Link href="/hujjatlar" className="hover:text-indigo-600 transition-colors">Hujjatlar</Link></li>
                <li><Link href="/yangiliklar" className="hover:text-indigo-600 transition-colors">Yangiliklar</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-[10px] md:text-xs">Manbalar</div>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="https://lex.uz" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Lex.uz</a></li>
                <li><a href="https://my.mehnat.uz" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">my.mehnat.uz</a></li>
                <li><a href="https://soliq.uz" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Soliq.uz</a></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="rounded-3xl bg-slate-50 border border-slate-100 p-6 md:p-8">
              <div className="font-bold text-slate-900 mb-2 text-sm">Muhim eslatma</div>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                Portaldagi barcha materiallar faqat ma&apos;lumot olish uchun mo&apos;ljallangan va yuridik maslahat hisoblanmaydi. 
                Har bir vaziyatda amaldagi qonun hujjatlariga tayanishingiz tavsiya etiladi.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-400 text-center md:text-left">
            &copy; {year} HR Portal. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-slate-600">Maxfiylik siyosati</Link>
            <Link href="#" className="hover:text-slate-600">Foydalanish shartlari</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
