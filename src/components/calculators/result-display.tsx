import { CheckCircle2, ListOrdered, Info } from "lucide-react";
import type { CalculationResult } from "@/lib/calculators/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";

interface ResultDisplayProps {
  result: CalculationResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="space-y-4">
      <Card className="border-transparent bg-gradient-to-r from-primary to-indigo-500 text-primary-foreground shadow-[0_12px_30px_rgba(79,70,229,0.3)]">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-sm opacity-90 mb-1">
            <CheckCircle2 className="size-4" />
            {result.primary.label}
          </div>
          <div className="text-3xl font-bold tracking-tight">{result.primary.value}</div>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card/90 backdrop-blur">
        <CardContent className="p-6">
          <div className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Hisob tafsiloti
          </div>
          <dl className="space-y-2">
            {result.lines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "flex justify-between items-baseline gap-3 py-1.5",
                  line.highlight && "border-t border-border pt-3 mt-2 font-semibold"
                )}
              >
                <dt className="text-sm text-foreground/80">{line.label}</dt>
                <dd className="text-sm font-medium tabular-nums text-right">{line.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {result.steps.length > 0 && (
        <Card className="border-border/80 bg-card/90 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              <ListOrdered className="size-4" />
              Qadamma-qadam yechim
            </div>
            <ol className="space-y-3">
              {result.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="size-6 flex-shrink-0 rounded-full bg-muted text-foreground/80 flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{step.label}</div>
                    {step.formula && (
                      <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                        {step.formula}
                      </div>
                    )}
                    {step.value && (
                      <div className="text-sm font-semibold mt-1 tabular-nums">= {step.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {result.notes && result.notes.length > 0 && (
        <Card className="bg-accent/60 border-blue-200/70 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-semibold mb-2 text-accent-foreground">
              <Info className="size-4" />
              E&apos;tibor bering
            </div>
            <ul className="space-y-1.5 text-sm text-foreground/80 list-disc pl-5">
              {result.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
