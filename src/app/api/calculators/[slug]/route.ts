import { NextRequest, NextResponse } from "next/server";
import { getCalculator } from "@/lib/calculators/registry";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  const { slug } = await ctx.params;
  const calc = getCalculator(slug);

  if (!calc) {
    return NextResponse.json(
      { error: `Kalkulyator topilmadi: ${slug}` },
      { status: 404 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Noto'g'ri JSON" }, { status: 400 });
  }

  const parsed = calc.schema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    return NextResponse.json(
      { error: `Validatsiya xatosi: ${message}` },
      { status: 400 }
    );
  }

  try {
    const result = calc.calculate(parsed.data);
    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Hisoblashda xatolik" },
      { status: 500 }
    );
  }
}
