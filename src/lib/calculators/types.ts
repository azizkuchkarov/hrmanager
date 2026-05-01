import { z } from "zod";

export interface CalculatorField {
  key: string;
  label: string;
  helpText?: string;
  type: "number" | "text" | "select" | "date";
  required?: boolean;
  defaultValue?: string | number;
  unit?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface CalculationStep {
  label: string;
  formula?: string;
  value?: string;
}

export interface CalculationResultLine {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface CalculationResult {
  primary: { label: string; value: string };
  lines: CalculationResultLine[];
  steps: CalculationStep[];
  notes?: string[];
}

export interface CalculatorMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  source?: { label: string; url?: string };
  effectiveFrom?: string;
}

export interface CalculatorDefinition<TInput extends Record<string, unknown> = Record<string, unknown>> {
  meta: CalculatorMeta;
  fields: CalculatorField[];
  schema: z.ZodType<TInput>;
  calculate: (input: TInput) => CalculationResult;
}
