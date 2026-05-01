"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calculator, Loader2 } from "lucide-react";
import type { CalculationResult, CalculatorField } from "@/lib/calculators/types";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { ResultDisplay } from "./result-display";

interface CalculatorFormProps {
  slug: string;
  fields: CalculatorField[];
}

type FormValues = Record<string, string | number>;

function buildDefaults(fields: CalculatorField[]): FormValues {
  const defaults: FormValues = {};
  for (const f of fields) {
    if (f.defaultValue !== undefined) defaults[f.key] = f.defaultValue;
    else if (f.type === "select" && f.options?.[0]) defaults[f.key] = f.options[0].value;
    else defaults[f.key] = f.type === "number" ? "" : "";
  }
  return defaults;
}

export function CalculatorForm({ slug, fields }: CalculatorFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: buildDefaults(fields),
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/calculators/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Hisoblashda xatolik yuz berdi");
        setResult(null);
      } else {
        setResult(data.result);
      }
    } catch {
      setError("Tarmoq xatosi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-2xl border border-border/80 bg-card/85 backdrop-blur p-5 md:p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
      >
        {fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label htmlFor={field.key} required={field.required}>
              {field.label}
              {field.unit && <span className="text-muted-foreground font-normal ml-1">({field.unit})</span>}
            </Label>
            {field.type === "select" ? (
              <Select id={field.key} {...register(field.key, { required: field.required })}>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            ) : (
              <Input
                id={field.key}
                type={field.type}
                className="rounded-xl bg-white/80"
                step={field.step}
                min={field.min}
                max={field.max}
                {...register(field.key, { required: field.required, valueAsNumber: field.type === "number" })}
              />
            )}
            {field.helpText && (
              <p className="text-xs text-muted-foreground mt-1.5">{field.helpText}</p>
            )}
            {errors[field.key] && (
              <p className="text-xs text-red-600 mt-1">Bu maydon to&apos;ldirilishi shart</p>
            )}
          </div>
        ))}

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Calculator className="size-4" />}
          Hisoblash
        </Button>

        {error && <Alert variant="error">{error}</Alert>}
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        {result ? (
          <ResultDisplay result={result} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center text-muted-foreground bg-card/60 backdrop-blur">
            <Calculator className="size-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Ma&apos;lumotlarni kiriting va &laquo;Hisoblash&raquo; tugmasini bosing</p>
          </div>
        )}
      </div>
    </div>
  );
}
