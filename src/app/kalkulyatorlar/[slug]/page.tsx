import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { getCalculator, listCalculators } from "@/lib/calculators/registry";
import { CalculatorForm } from "@/components/calculators/calculator-form";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listCalculators().map((c) => ({ slug: c.meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return { title: "Kalkulyator topilmadi" };
  return {
    title: calc.meta.title,
    description: calc.meta.description,
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) notFound();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/kalkulyatorlar"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="size-4" />
        Barcha kalkulyatorlar
      </Link>

      <div className="mb-8">
        <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded inline-block mb-3">
          {calc.meta.category}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{calc.meta.title}</h1>
        <p className="text-muted-foreground max-w-3xl mb-3">{calc.meta.description}</p>

        {calc.meta.source && (
          <div className="text-sm text-muted-foreground">
            Manba:{" "}
            {calc.meta.source.url ? (
              <a
                href={calc.meta.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                {calc.meta.source.label}
                <ExternalLink className="size-3" />
              </a>
            ) : (
              calc.meta.source.label
            )}
            {calc.meta.effectiveFrom && (
              <span className="ml-2">· {calc.meta.effectiveFrom} dan kuchga kirgan</span>
            )}
          </div>
        )}
      </div>

      <CalculatorForm slug={calc.meta.slug} fields={calc.fields} />
    </div>
  );
}
