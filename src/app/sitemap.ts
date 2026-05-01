import type { MetadataRoute } from "next";
import { listSlugs } from "@/lib/content";
import { listCalculators } from "@/lib/calculators/registry";
import { listDocumentTemplates } from "@/lib/documents/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/maqolalar",
    "/qonunchilik",
    "/kalkulyatorlar",
    "/hujjatlar",
    "/yangiliklar",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const articleRoutes = listSlugs("maqolalar").map((slug) => ({
    url: `${baseUrl}/maqolalar/${slug}`,
    lastModified: new Date(),
  }));

  const legislationRoutes = listSlugs("qonunchilik").map((slug) => ({
    url: `${baseUrl}/qonunchilik/${slug}`,
    lastModified: new Date(),
  }));

  const newsRoutes = listSlugs("yangiliklar").map((slug) => ({
    url: `${baseUrl}/yangiliklar/${slug}`,
    lastModified: new Date(),
  }));

  const calculatorRoutes = listCalculators().map((item) => ({
    url: `${baseUrl}/kalkulyatorlar/${item.meta.slug}`,
    lastModified: new Date(),
  }));

  const documentRoutes = listDocumentTemplates().map((item) => ({
    url: `${baseUrl}/hujjatlar/${item.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...legislationRoutes,
    ...newsRoutes,
    ...calculatorRoutes,
    ...documentRoutes,
  ];
}
