import { NextRequest, NextResponse } from "next/server";
import { getDocumentTemplate } from "@/lib/documents/templates";
import { renderDocument } from "@/lib/documents/render";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  const { slug } = await ctx.params;
  const template = getDocumentTemplate(slug);
  if (!template) {
    return NextResponse.json({ error: `Shablon topilmadi: ${slug}` }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Noto'g'ri JSON" }, { status: 400 });
  }

  for (const field of template.fields) {
    if (field.required && (body[field.key] === undefined || body[field.key] === "")) {
      return NextResponse.json(
        { error: `Majburiy maydon to'ldirilmagan: ${field.label}` },
        { status: 400 }
      );
    }
  }

  const values: Record<string, unknown> = {};
  for (const field of template.fields) {
    values[field.key] = body[field.key] ?? field.defaultValue ?? "";
  }

  try {
    const buffer = await renderDocument(template.title, values);
    const fileName = `${template.slug}.docx`;
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=\"${fileName}\"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Hujjat yaratishda xatolik" },
      { status: 500 }
    );
  }
}
