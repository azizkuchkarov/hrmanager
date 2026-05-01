import { z } from "zod";

export const documentFieldSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(["text", "number", "date", "select"]),
  required: z.boolean().optional(),
  defaultValue: z.union([z.string(), z.number()]).optional(),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});

export const documentTemplateSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  fields: z.array(documentFieldSchema),
});

export type DocumentField = z.infer<typeof documentFieldSchema>;
export type DocumentTemplate = z.infer<typeof documentTemplateSchema>;
