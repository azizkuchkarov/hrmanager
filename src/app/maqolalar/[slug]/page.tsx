import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, Calendar, ExternalLink } from "lucide-react";
import { getContentBySlug, listSlugs, formatDateUz } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listSlugs("maqolalar").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getContentBySlug("maqolalar", slug);
  if (!article) return { title: "Maqola topilmadi" };
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getContentBySlug("maqolalar", slug);
  if (!article) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/maqolalar"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="size-4" />
        Barcha maqolalar
      </Link>

      <header className="mb-8 pb-8 border-b border-border">
        {article.frontmatter.category && (
          <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded inline-block mb-3">
            {article.frontmatter.category}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-tight">
          {article.frontmatter.title}
        </h1>
        {article.frontmatter.summary && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {article.frontmatter.summary}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {article.frontmatter.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {formatDateUz(article.frontmatter.publishedAt)}
            </span>
          )}
          {article.frontmatter.lexUzUrl && (
            <a
              href={article.frontmatter.lexUzUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              Lex.uz manbasi
              <ExternalLink className="size-3" />
            </a>
          )}
        </div>
      </header>

      <MdxContent source={article.content} />
    </div>
  );
}
