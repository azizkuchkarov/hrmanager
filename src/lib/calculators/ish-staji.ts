import { z } from "zod";
import { CalculatorDefinition } from "./types";

const schema = z.object({
  startDate: z.string().min(1, "Sana kiriting"),
  endDate: z.string().min(1, "Sana kiriting"),
});

type Input = z.infer<typeof schema>;

interface DiffResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

function diffDates(start: Date, end: Date): DiffResult {
  if (end < start) {
    return { years: 0, months: 0, days: 0, totalDays: 0 };
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return { years, months, days, totalDays };
}

function plural(n: number, forms: [string, string]): string {
  return `${n} ${forms[n === 1 ? 0 : 1]}`;
}

function formatStaj(d: DiffResult): string {
  const parts: string[] = [];
  if (d.years > 0) parts.push(plural(d.years, ["yil", "yil"]));
  if (d.months > 0) parts.push(plural(d.months, ["oy", "oy"]));
  if (d.days > 0) parts.push(plural(d.days, ["kun", "kun"]));
  return parts.length > 0 ? parts.join(" ") : "0 kun";
}

export const ishStaji: CalculatorDefinition<Input> = {
  meta: {
    slug: "ish-staji",
    title: "Ish staji kalkulyatori",
    description:
      "Ishga qabul qilingan sanadan ishdan bo'shagan sanagacha bo'lgan umumiy mehnat stajini hisoblash.",
    category: "Staj",
    source: {
      label: "O'zR Mehnat kodeksi (staj hisobi)",
      url: "https://lex.uz/docs/6257288",
    },
  },
  fields: [
    {
      key: "startDate",
      label: "Ish boshlangan sana",
      type: "date",
      required: true,
    },
    {
      key: "endDate",
      label: "Ish tugagan sana",
      helpText: "Bugungi sanani kiritsangiz, hozirgi staj hisoblanadi.",
      type: "date",
      required: true,
    },
  ],
  schema,
  calculate(input) {
    const start = new Date(input.startDate);
    const end = new Date(input.endDate);

    if (end < start) {
      return {
        primary: { label: "Xato", value: "Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak" },
        lines: [],
        steps: [],
      };
    }

    const d = diffDates(start, end);
    const totalMonths = d.years * 12 + d.months;
    const totalYearsDecimal = d.totalDays / 365.25;

    const startStr = start.toLocaleDateString("uz-UZ");
    const endStr = end.toLocaleDateString("uz-UZ");

    return {
      primary: {
        label: "Umumiy ish staji",
        value: formatStaj(d),
      },
      lines: [
        { label: "Boshlangan sana", value: startStr },
        { label: "Tugagan sana", value: endStr },
        { label: "Umumiy staj", value: formatStaj(d), highlight: true },
        { label: "Jami oylar", value: `${totalMonths} oy` },
        { label: "Jami kunlar", value: `${d.totalDays} kun` },
        { label: "O'nlik yillar", value: `${totalYearsDecimal.toFixed(2)} yil` },
      ],
      steps: [
        {
          label: "Yillar farqi",
          formula: `${end.getFullYear()} − ${start.getFullYear()}`,
          value: `${d.years} yil`,
        },
        {
          label: "Oylar va kunlar",
          formula: "Tug'ri kalendar farqi (oy va kun bo'yicha)",
          value: `${d.months} oy ${d.days} kun`,
        },
        {
          label: "Jami kunlar",
          formula: "Boshlanish va tugashi orasidagi kunlar",
          value: `${d.totalDays} kun`,
        },
      ],
      notes: [
        "Bu kalkulyator umumiy mehnat stajini hisoblaydi (uzluksiz emas).",
        "Ta'til, kasallik, dekret kabi davrlar staj hisobiga kiradi.",
        "Bir nechta ish joylarida ishlash uchun har bir davrni alohida hisoblang va qo'shing.",
      ],
    };
  },
};
