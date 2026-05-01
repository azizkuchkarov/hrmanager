import { CalculatorDefinition } from "./types";
import { oylikSoliq } from "./oylik-soliq";
import { tatilPuli } from "./tatil-puli";
import { kasallik } from "./kasallik";
import { kompensatsiya } from "./kompensatsiya";
import { ishStaji } from "./ish-staji";
import { ortiqchaIsh } from "./ortiqcha-ish";
import { dekret } from "./dekret";

export const calculators: Record<string, CalculatorDefinition<Record<string, unknown>>> = {
  [oylikSoliq.meta.slug]: oylikSoliq as unknown as CalculatorDefinition<Record<string, unknown>>,
  [tatilPuli.meta.slug]: tatilPuli as unknown as CalculatorDefinition<Record<string, unknown>>,
  [kasallik.meta.slug]: kasallik as unknown as CalculatorDefinition<Record<string, unknown>>,
  [kompensatsiya.meta.slug]: kompensatsiya as unknown as CalculatorDefinition<Record<string, unknown>>,
  [ishStaji.meta.slug]: ishStaji as unknown as CalculatorDefinition<Record<string, unknown>>,
  [ortiqchaIsh.meta.slug]: ortiqchaIsh as unknown as CalculatorDefinition<Record<string, unknown>>,
  [dekret.meta.slug]: dekret as unknown as CalculatorDefinition<Record<string, unknown>>,
};

export function getCalculator(slug: string): CalculatorDefinition<Record<string, unknown>> | null {
  return calculators[slug] ?? null;
}

export function listCalculators(): CalculatorDefinition<Record<string, unknown>>[] {
  return Object.values(calculators);
}
