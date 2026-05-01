import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { formatSomLabel } from "@/lib/format";

export function normalizeValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "number") return formatSomLabel(value);
  if (typeof value === "string") return value;
  return String(value);
}

function titleCase(input: string): string {
  return input
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}

export async function renderDocument(
  title: string,
  values: Record<string, unknown>
): Promise<Buffer> {
  const now = new Date();
  const generatedAt = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${now.getFullYear()}`;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: title, bold: true, size: 32 }),
            ],
          }),
          new Paragraph({ text: "" }),
          ...Object.entries(values).map(([key, value]) =>
            new Paragraph({
              spacing: { after: 220 },
              children: [
                new TextRun({ text: `${titleCase(key)}: `, bold: true }),
                new TextRun({ text: normalizeValue(value) }),
              ],
            })
          ),
          new Paragraph({ text: "" }),
          new Paragraph({
            spacing: { before: 300 },
            children: [
              new TextRun({
                text: `Hujjat avtomatik yaratildi: ${generatedAt}`,
                italics: true,
                size: 20,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const arrayBuffer = await Packer.toBuffer(doc);
  return arrayBuffer;
}
