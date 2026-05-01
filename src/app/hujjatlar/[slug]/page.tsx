import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getDocumentTemplate, listDocumentTemplates } from "@/lib/documents/templates";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DocumentForm } from "@/components/documents/document-form";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listDocumentTemplates().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getDocumentTemplate(slug);
  if (!template) return { title: "Hujjat topilmadi" };
  return {
    title: template.title,
    description: template.description,
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const template = getDocumentTemplate(slug);
  if (!template) notFound();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/hujjatlar"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="size-4" />
        Barcha hujjatlar
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{template.title}</CardTitle>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentForm slug={template.slug} fields={template.fields} />
        </CardContent>
      </Card>
    </div>
  );
}
