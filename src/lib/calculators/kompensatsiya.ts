import { z } from "zod";
import { CalculatorDefinition } from "./types";
import { formatDays, formatSom, formatSomLabel } from "../format";

const schema = z.object({
  averageMonthlySalary: z.coerce.number().min(0).max(1_000_000_000),
  unusedDays: z.coerce.number().min(0).max(365),
  averageWorkingDaysPerMonth: z.coerce.number().min(15).max(31).default(25.4),
});

type Input = z.infer<typeof schema>;

export const kompensatsiya: CalculatorDefinition<Input> = {
  meta: {
    slug: "kompensatsiya",
    title: "Foydalanilmagan ta'til kompensatsiyasi",
    description:
      "Ishdan bo'shaganda foydalanilmagan ta'til kunlari uchun pul kompensatsiyasini hisoblash.",
    category: "Ta'til",
    source: {
      label: "O'zR Mehnat kodeksi, 144-modda",
      url: "https://lex.uz/docs/6257288",
    },
  },
  fields: [
    {
      key: "averageMonthlySalary",
      label: "O'rtacha oylik ish haqi (so'm)",
      helpText: "Oxirgi 12 oylik o'rtacha daromad.",
      type: "number",
      required: true,
      min: 0,
      step: 1000,
      unit: "so'm",
    },
    {
      key: "unusedDays",
      label: "Foydalanilmagan ta'til kunlari",
      helpText: "Kompensatsiya berilishi kerak bo'lgan kunlar soni.",
      type: "number",
      required: true,
      min: 0,
      max: 365,
      step: 1,
      unit: "kun",
    },
    {
      key: "averageWorkingDaysPerMonth",
      label: "Oyiga o'rtacha ish kunlari",
      type: "number",
      defaultValue: 25.4,
      min: 15,
      max: 31,
      step: 0.1,
      unit: "kun",
    },
  ],
  schema,
  calculate(input) {
    const avgMonthly = input.averageMonthlySalary;
    const days = input.unusedDays;
    const workingDays = input.averageWorkingDaysPerMonth;

    const avgDaily = avgMonthly / workingDays;
    const total = avgDaily * days;
    const pit = total * 0.12;
    const net = total - pit;

    return {
      primary: {
        label: "Kompensatsiya summasi (brutto)",
        value: formatSomLabel(total),
      },
      lines: [
        { label: "O'rtacha kunlik ish haqi", value: formatSomLabel(avgDaily) },
        { label: "Foydalanilmagan kunlar", value: formatDays(days) },
        { label: "Brutto kompensatsiya", value: formatSomLabel(total), highlight: true },
        { label: "JShDS (12%)", value: `- ${formatSomLabel(pit)}` },
        { label: "Net kompensatsiya", value: formatSomLabel(net), highlight: true },
      ],
      steps: [
        {
          label: "O'rtacha kunlik ish haqi",
          formula: `${formatSomLabel(avgMonthly)} ÷ ${formatSom(workingDays, { decimals: 1 })}`,
          value: formatSomLabel(avgDaily),
        },
        {
          label: "Brutto kompensatsiya",
          formula: `${formatSomLabel(avgDaily)} × ${formatDays(days)}`,
          value: formatSomLabel(total),
        },
        {
          label: "JShDS 12%",
          formula: `${formatSomLabel(total)} × 12%`,
          value: formatSomLabel(pit),
        },
        {
          label: "Net kompensatsiya",
          formula: `${formatSomLabel(total)} − ${formatSomLabel(pit)}`,
          value: formatSomLabel(net),
        },
      ],
      notes: [
        "Kompensatsiya ishdan bo'shashish kunida to'liq to'lab berilishi shart.",
        "Foydalanilmagan kunlar — har 12 oyda 21 kun. Yarim oydan ortiq ishlagan oy to'liq oy hisoblanadi.",
      ],
    };
  },
};
