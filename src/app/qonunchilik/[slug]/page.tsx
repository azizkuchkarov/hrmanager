import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ExternalLink, Scale } from "lucide-react";
import { getContentBySlug, listSlugs } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { Alert } from "@/components/ui/alert";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listSlugs("qonunchilik").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug("qonunchilik", slug);
  if (!item) return { title: "Mavzu topilmadi" };
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.summary,
  };
}

export default async function LegislationTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentBySlug("qonunchilik", slug);
  if (!item) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/qonunchilik"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="size-4" />
        Qonunchilik bazasi
      </Link>

      <header className="mb-8">
        <div className="flex items-start gap-3 mb-4">
          <div className="size-12 rounded-md bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
            <Scale className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {item.frontmatter.title}
            </h1>
            {item.frontmatter.summary && (
              <p className="text-lg text-muted-foreground mt-2">{item.frontmatter.summary}</p>
            )}
          </div>
        </div>

        {item.frontmatter.lexUzUrl && (
          <a
            href={item.frontmatter.lexUzUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-6"
          >
            <ExternalLink className="size-4" />
            Lex.uz dagi rasmiy manba
          </a>
        )}
      </header>

      <Alert variant="warning" title="Yuridik ogohlantirish" className="mb-6">
        Quyidagi xulosa amaliy yo&apos;riqnoma sifatida tayyorlangan. Aniq qaror qabul qilishdan oldin
        amaldagi qonun matnini va so&apos;nggi o&apos;zgartirishlarni tekshiring.
      </Alert>

      <MdxContent source={item.content} />
    </div>
  );
}
