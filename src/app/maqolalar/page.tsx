import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import { listContent, formatDateUz } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Maqolalar",
  description:
    "HRlar, buxgalterlar va menejerlar uchun mehnat qonunchiligi va kadrlar masalalari bo'yicha maqolalar.",
};

export default function ArticlesPage() {
  const articles = listContent("maqolalar");
  const categories = Array.from(new Set(articles.map((a) => a.frontmatter.category).filter(Boolean))) as string[];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Maqolalar</h1>
        <p className="text-muted-foreground max-w-3xl">
          O&apos;zbekiston mehnat qonunchiligi va kadrlar masalalari bo&apos;yicha amaliy maqolalar.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm text-muted-foreground self-center mr-2">Kategoriyalar:</span>
          {categories.map((c) => (
            <span key={c} className="text-xs bg-muted text-foreground/80 px-2.5 py-1 rounded-full">
              {c}
            </span>
          ))}
        </div>
      )}

      {articles.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.frontmatter.slug}
              href={`/maqolalar/${a.frontmatter.slug}`}
              className="group block"
            >
              <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  {a.frontmatter.category && (
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded inline-block mb-3">
                      {a.frontmatter.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-lg mb-2 leading-snug group-hover:text-primary transition-colors">
                    {a.frontmatter.title}
                  </h3>
                  {a.frontmatter.summary && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {a.frontmatter.summary}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    {a.frontmatter.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {formatDateUz(a.frontmatter.publishedAt)}
                      </span>
                    )}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform text-primary" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <FileText className="size-12 mx-auto mb-3 text-muted-foreground/50" />
        <p className="text-muted-foreground">Hozircha maqolalar yo&apos;q.</p>
      </CardContent>
    </Card>
  );
}
