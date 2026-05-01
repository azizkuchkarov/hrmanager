import Link from "next/link";
import type { Metadata } from "next";
import { Scale, ArrowRight, ExternalLink, BookOpen } from "lucide-react";
import { listContent } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Qonunchilik bazasi",
  description:
    "O'zbekiston mehnat qonunchiligining HRlarga eng kerakli mavzulari: ta'til, mehnat shartnomasi, ish vaqti, intizomiy jazo, ishdan bo'shatish va boshqalar.",
};

export default function LegislationPage() {
  const topics = listContent("qonunchilik");

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Qonunchilik bazasi</h1>
        <p className="text-muted-foreground max-w-3xl">
          O&apos;zbekiston Mehnat kodeksi va boshqa normativ hujjatlarning HRlarga eng kerakli
          mavzulari oddiy tilda. Har bir mavzu Lex.uz dagi rasmiy manba havolasi bilan beriladi.
        </p>
      </div>

      <Alert variant="warning" title="Eslatma" className="mb-8">
        Bu sahifadagi xulosalar yuridik maslahat emas. Aniq holat uchun amaldagi qonun matnini
        Lex.uz da tekshiring yoki yurist bilan maslahatlashing.
      </Alert>

      {topics.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="size-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">Hozircha qonunchilik mavzulari yo&apos;q.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {topics.map((t) => (
            <Link
              key={t.frontmatter.slug}
              href={`/qonunchilik/${t.frontmatter.slug}`}
              className="group block"
            >
              <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-md bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                      <Scale className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2 leading-snug group-hover:text-primary transition-colors">
                        {t.frontmatter.title}
                      </h3>
                      {t.frontmatter.summary && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                          {t.frontmatter.summary}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs">
                        {t.frontmatter.lexUzUrl ? (
                          <span className="text-muted-foreground flex items-center gap-1">
                            <ExternalLink className="size-3" />
                            Lex.uz havolasi mavjud
                          </span>
                        ) : (
                          <span></span>
                        )}
                        <span className="text-primary font-medium flex items-center gap-1">
                          Batafsil
                          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
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
