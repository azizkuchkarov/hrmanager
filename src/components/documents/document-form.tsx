"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FileDown, Loader2 } from "lucide-react";
import type { DocumentField } from "@/lib/documents/types";
import { Label } from "@/components/ui/label";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

interface DocumentFormProps {
  slug: string;
  fields: DocumentField[];
}

type FormValues = Record<string, string | number>;

function defaults(fields: DocumentField[]): FormValues {
  const out: FormValues = {};
  for (const field of fields) {
    if (field.defaultValue !== undefined) out[field.key] = field.defaultValue;
    else if (field.type === "select") out[field.key] = field.options?.[0]?.value ?? "";
    else out[field.key] = "";
  }
  return out;
}

export function DocumentForm({ slug, fields }: DocumentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: defaults(fields),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/documents/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Hujjat yaratishda xatolik");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${slug}.docx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Tarmoq xatosi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <Label htmlFor={field.key} required={field.required}>{field.label}</Label>
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
              {...register(field.key, {
                required: field.required,
                valueAsNumber: field.type === "number",
              })}
            />
          )}
          {errors[field.key] && <p className="text-xs text-red-600 mt-1">Maydon majburiy</p>}
        </div>
      ))}

      {error && <Alert variant="error">{error}</Alert>}

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
        Hujjatni yuklab olish
      </Button>
    </form>
  );
}
