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
    <div className="container mx-auto max-w-7xl px-4 py-10 md:py-14 space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-8 md:p-12 shadow-[0_20px_50px_rgba(79,70,229,0.12)]">
        <div className="pointer-events-none absolute -top-28 -right-28 size-72 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-sky-300/20 blur-3xl" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-4xl leading-tight">
          O&apos;zbekiston HRlari uchun amaliy yordamchi portal
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Mehnat qonunchiligi bo&apos;yicha xulosalar, 7 ta kalkulyator, 6 ta hujjat shabloni va
          doimiy yangilanadigan HR maqolalar bir joyda.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/kalkulyatorlar"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-indigo-500 text-primary-foreground font-medium shadow-sm hover:shadow-md hover:from-primary/95 hover:to-indigo-500/95 transition-all"
          >
            Kalkulyatorlarni ochish
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/hujjatlar"
            className="inline-flex items-center h-12 px-6 rounded-xl border border-border/80 bg-card/80 backdrop-blur text-foreground font-medium hover:bg-muted/70 transition-colors"
          >
            Hujjat yaratish
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric title="Kalkulyatorlar" value={`${calculatorsCount} ta`} />
          <Metric title="Hujjat shablonlari" value={`${templatesCount} ta`} />
          <Metric title="Maqolalar" value={`${listContent("maqolalar").length} ta`} />
          <Metric title="Yangiliklar" value={`${listContent("yangiliklar").length} ta`} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">Asosiy modullar</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link key={m.href} href={m.href} className="group block">
                <Card className="h-full border-border/70 bg-card/85 backdrop-blur hover:border-primary/40 hover:shadow-[0_12px_30px_rgba(79,70,229,0.12)] transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="size-10 rounded-xl bg-gradient-to-br from-indigo-100 to-sky-100 text-accent-foreground flex items-center justify-center mb-3">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/85 backdrop-blur">
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl mb-4">So&apos;nggi maqolalar</h3>
            <div className="space-y-3">
              {latestArticles.map((a) => (
                <Link
                  key={a.frontmatter.slug}
                  href={`/maqolalar/${a.frontmatter.slug}`}
                  className="block rounded-xl border border-border/80 p-3 hover:border-primary/40 hover:bg-muted/30 transition-colors"
                >
                  <div className="font-medium">{a.frontmatter.title}</div>
                  {a.frontmatter.summary && (
                    <div className="text-sm text-muted-foreground mt-1">{a.frontmatter.summary}</div>
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/85 backdrop-blur">
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl mb-4">So&apos;nggi yangiliklar</h3>
            <div className="space-y-3">
              {latestNews.map((n) => (
                <Link
                  key={n.frontmatter.slug}
                  href={`/yangiliklar/${n.frontmatter.slug}`}
                  className="block rounded-xl border border-border/80 p-3 hover:border-primary/40 hover:bg-muted/30 transition-colors"
                >
                  <div className="font-medium">{n.frontmatter.title}</div>
                  {n.frontmatter.summary && (
                    <div className="text-sm text-muted-foreground mt-1">{n.frontmatter.summary}</div>
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/80 bg-card/90 px-4 py-3 backdrop-blur">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}
