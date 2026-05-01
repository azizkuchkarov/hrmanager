import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "maqolalar" | "qonunchilik" | "yangiliklar";

export interface ContentFrontmatter {
  title: string;
  slug: string;
  summary?: string;
  category?: string;
  publishedAt?: string;
  updatedAt?: string;
  lexUzUrl?: string;
  source?: string;
  sourceUrl?: string;
  tags?: string[];
}

export interface ContentItem {
  frontmatter: ContentFrontmatter;
  content: string;
  filePath: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return false;
  }
  return true;
}

export function getContentDir(type: ContentType): string {
  return path.join(CONTENT_ROOT, type);
}

export function listContent(type: ContentType): ContentItem[] {
  const dir = getContentDir(type);
  if (!ensureDir(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items: ContentItem[] = files.map((file) => {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const parsed = matter(raw);
    const slugFromFile = file.replace(/\.(mdx|md)$/, "");
    const fm = parsed.data as Partial<ContentFrontmatter>;
    return {
      frontmatter: {
        title: fm.title ?? slugFromFile,
        slug: fm.slug ?? slugFromFile,
        summary: fm.summary,
        category: fm.category,
        publishedAt: fm.publishedAt,
        updatedAt: fm.updatedAt,
        lexUzUrl: fm.lexUzUrl,
        source: fm.source,
        sourceUrl: fm.sourceUrl,
        tags: fm.tags,
      },
      content: parsed.content,
      filePath: fullPath,
    };
  });

  return items.sort((a, b) => {
    const da = a.frontmatter.publishedAt ?? "";
    const db = b.frontmatter.publishedAt ?? "";
    return db.localeCompare(da);
  });
}

export function getContentBySlug(type: ContentType, slug: string): ContentItem | null {
  const items = listContent(type);
  return items.find((item) => item.frontmatter.slug === slug) ?? null;
}

export function listSlugs(type: ContentType): string[] {
  return listContent(type).map((item) => item.frontmatter.slug);
}

export function listCategories(type: ContentType): string[] {
  const items = listContent(type);
  const categories = new Set<string>();
  for (const item of items) {
    if (item.frontmatter.category) categories.add(item.frontmatter.category);
  }
  return Array.from(categories).sort();
}

export function formatDateUz(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    const months = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentyabr",
      "oktyabr",
      "noyabr",
      "dekabr",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return dateStr;
  }
}
