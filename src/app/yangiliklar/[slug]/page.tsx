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
  return listSlugs("yangiliklar").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug("yangiliklar", slug);
  if (!item) return { title: "Yangilik topilmadi" };
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.summary,
  };
}

export default async function NewsItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentBySlug("yangiliklar", slug);
  if (!item) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/yangiliklar"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="size-4" />
        Barcha yangiliklar
      </Link>

      <header className="mb-8 pb-8 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-tight">
          {item.frontmatter.title}
        </h1>
        {item.frontmatter.summary && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {item.frontmatter.summary}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {item.frontmatter.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {formatDateUz(item.frontmatter.publishedAt)}
            </span>
          )}
          {item.frontmatter.sourceUrl && (
            <a
              href={item.frontmatter.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              {item.frontmatter.source ?? "Manba"}
              <ExternalLink className="size-3" />
            </a>
          )}
        </div>
      </header>

      <MdxContent source={item.content} />
    </div>
  );
}
