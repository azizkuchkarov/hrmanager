import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { listDocumentTemplates } from "@/lib/documents/templates";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Hujjat generator",
  description: "HR hujjatlarini avtomatik yaratish: buyruq, shartnoma, ariza va ogohlantirishlar.",
};

export default function DocumentsPage() {
  const templates = listDocumentTemplates();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Hujjat generator</h1>
        <p className="text-muted-foreground max-w-3xl">
          Quyidagi shablonlardan keraklisini tanlang, ma&apos;lumotlarni kiriting va `.docx` hujjatni yuklab oling.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <Link key={t.slug} href={`/hujjatlar/${t.slug}`} className="group block">
            <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-10 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
                    <FileText className="size-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {t.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{t.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{t.description}</p>
                <div className="text-sm text-primary font-medium inline-flex items-center gap-1">
                  Ochish
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
