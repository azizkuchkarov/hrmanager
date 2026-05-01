import Link from "next/link";
import type { Metadata } from "next";
import { Calculator, ArrowRight } from "lucide-react";
import { listCalculators } from "@/lib/calculators/registry";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kalkulyatorlar",
  description:
    "Oylik soliq, ta'til puli, kasallik nafaqasi, kompensatsiya, ish staji, ortiqcha ish va dekret kalkulyatorlari.",
};

export default function CalculatorsPage() {
  const calcs = listCalculators();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Kalkulyatorlar</h1>
        <p className="text-muted-foreground max-w-3xl">
          O&apos;zbekiston mehnat va soliq qonunchiligiga muvofiq tayyorlangan {calcs.length} ta
          kalkulyator. Har bir natija qadamma-qadam yechim va manba havolasi bilan beriladi.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calcs.map((c) => (
          <Link key={c.meta.slug} href={`/kalkulyatorlar/${c.meta.slug}`} className="block group">
            <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-10 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
                    <Calculator className="size-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {c.meta.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {c.meta.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {c.meta.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  Kalkulyatorni ochish
                  <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
