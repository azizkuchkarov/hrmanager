import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { listContent, formatDateUz } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Yangiliklar",
  description:
    "O'zbekiston mehnat va kadrlar sohasidagi qonun o'zgarishlari, yangiliklar va e'lonlar.",
};

export default function NewsPage() {
  const news = listContent("yangiliklar");

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Yangiliklar</h1>
        <p className="text-muted-foreground max-w-3xl">
          Mehnat qonunchiligidagi o&apos;zgarishlar, yangi normativ hujjatlar va HR sohasidagi
          muhim e&apos;lonlar.
        </p>
      </div>

      {news.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Newspaper className="size-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">Hozircha yangiliklar yo&apos;q.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {news.map((n) => (
            <Link key={n.frontmatter.slug} href={`/yangiliklar/${n.frontmatter.slug}`} className="block group">
              <Card className="hover:border-primary/50 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-md bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                      <Newspaper className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {n.frontmatter.publishedAt && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                          <Calendar className="size-3" />
                          {formatDateUz(n.frontmatter.publishedAt)}
                        </span>
                      )}
                      <h3 className="font-semibold text-lg mb-2 leading-snug group-hover:text-primary transition-colors">
                        {n.frontmatter.title}
                      </h3>
                      {n.frontmatter.summary && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {n.frontmatter.summary}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="size-5 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 self-center" />
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
