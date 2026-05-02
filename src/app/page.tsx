import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, FileText, Scale, Newspaper } from "lucide-react";
import { listContent } from "@/lib/content";
import { listCalculators } from "@/lib/calculators/registry";
import { listDocumentTemplates } from "@/lib/documents/templates";
import { Card, CardContent } from "@/components/ui/card";

const modules = [
  {
    title: "Maqolalar",
    description: "HR va buxgalterlar uchun oddiy tilda amaliy maqolalar.",
    href: "/maqolalar",
    icon: BookOpen,
  },
  {
    title: "Qonunchilik",
    description: "Mehnat kodeksi mavzulari Lex.uz manbalari bilan.",
    href: "/qonunchilik",
    icon: Scale,
  },
  {
    title: "Kalkulyatorlar",
    description: "Oylik, ta'til, kasallik, kompensatsiya va boshqa hisob-kitoblar.",
    href: "/kalkulyatorlar",
    icon: Calculator,
  },
  {
    title: "Hujjatlar",
    description: "Buyruq, shartnoma, ariza kabi hujjatlarni avtomatik yaratish.",
    href: "/hujjatlar",
    icon: FileText,
  },
  {
    title: "Yangiliklar",
    description: "Qonunchilik va HR jarayonlaridagi so'nggi yangiliklar.",
    href: "/yangiliklar",
    icon: Newspaper,
  },
];

export default function Home() {
  const latestArticles = listContent("maqolalar").slice(0, 3);
  const latestNews = listContent("yangiliklar").slice(0, 3);
  const calculatorsCount = listCalculators().length;
  const templatesCount = listDocumentTemplates().length;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-20 space-y-16 md:space-y-24">
      {/* Enhanced Hero Section */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/60 backdrop-blur-xl p-6 md:p-16 shadow-2xl">
          <div className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-sky-500/10 blur-[100px]" />
          
          <div className="max-w-4xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              O&apos;zbekiston HRlari uchun maxsus
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.2] md:leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900">
              Kadrlar boshqaruvi endi yanada oson
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0 leading-relaxed mb-10">
              Mehnat qonunchiligi xulosalari, professional kalkulyatorlar va avtomatik hujjat yaratish tizimi — barchasi bitta portalda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link
                href="/kalkulyatorlar"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 h-14 px-8 rounded-2xl bg-slate-900 text-white font-semibold shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Kalkulyatorlar
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/hujjatlar"
                className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-2xl border border-slate-200 bg-white text-slate-900 font-semibold hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Hujjat shablonlari
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Kalkulyatorlar" value={calculatorsCount} icon={Calculator} color="indigo" />
            <MetricCard title="Hujjatlar" value={templatesCount} icon={FileText} color="sky" />
            <MetricCard title="Maqolalar" value={listContent("maqolalar").length} icon={BookOpen} color="violet" />
            <MetricCard title="Yangiliklar" value={listContent("yangiliklar").length} icon={Newspaper} color="emerald" />
          </div>
        </div>
      </section>

      {/* Bento Grid Modules */}
      <section>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">Asosiy modullar</h2>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Sizga kerakli barcha vositalar bir joyda</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {modules.map((m, i) => {
            const Icon = m.icon;
            // Define different sizes for Bento effect
            const spans = [
              "md:col-span-3 lg:col-span-4 lg:row-span-2", // Large
              "md:col-span-3 lg:col-span-4",               // Medium
              "md:col-span-3 lg:col-span-4 lg:row-span-2", // Large
              "md:col-span-3 lg:col-span-8",               // Wide
              "md:col-span-6 lg:col-span-4",               // Medium
            ];
            const span = spans[i % spans.length];

            return (
              <Link key={m.href} href={m.href} className={`${span} group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-6 md:p-8 transition-all hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10`}>
                <div className="relative z-10 flex flex-col h-full min-h-[140px] md:min-h-0">
                  <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300">
                    <Icon className="size-6" />
                  </div>
                  <div className="mt-auto md:mt-0">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-4 -mt-4 size-32 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Content Feed Section */}
      <section className="grid gap-6 md:gap-8 lg:grid-cols-2">
        <ContentSection 
          title="So&apos;nggi maqolalar" 
          items={latestArticles.map(a => ({
            title: a.frontmatter.title,
            description: a.frontmatter.summary,
            href: `/maqolalar/${a.frontmatter.slug}`
          }))}
          icon={BookOpen}
        />
        <ContentSection 
          title="So&apos;nggi yangiliklar" 
          items={latestNews.map(n => ({
            title: n.frontmatter.title,
            description: n.frontmatter.summary,
            href: `/yangiliklar/${n.frontmatter.slug}`
          }))}
          icon={Newspaper}
        />
      </section>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) {
  const colors: Record<string, string> = {
    indigo: "text-indigo-600 bg-indigo-50",
    sky: "text-sky-600 bg-sky-50",
    violet: "text-violet-600 bg-violet-50",
    emerald: "text-emerald-600 bg-emerald-50",
  };
  
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 backdrop-blur-sm hover:border-indigo-100 transition-colors">
      <div className={`size-10 rounded-xl flex items-center justify-center mb-4 ${colors[color]}`}>
        <Icon className="size-5" />
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}+</div>
      <div className="text-sm font-medium text-slate-500 mt-1">{title}</div>
    </div>
  );
}

function ContentSection({ title, items, icon: Icon, href }: { title: string; items: any[]; icon: any; href?: string }) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200/60 bg-white p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
          <Icon className="size-5" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group block rounded-2xl border border-slate-50 p-4 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</div>
              <ArrowRight className="size-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>
            {item.description && (
              <div className="text-sm text-slate-500 mt-1 line-clamp-1">{item.description}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
