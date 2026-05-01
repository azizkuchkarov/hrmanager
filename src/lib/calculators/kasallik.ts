import { z } from "zod";
import { CalculatorDefinition } from "./types";
import { formatDays, formatPercent, formatSom, formatSomLabel } from "../format";

const schema = z.object({
  averageMonthlySalary: z.coerce.number().min(0).max(1_000_000_000),
  sickDays: z.coerce.number().min(1).max(365),
  experienceYears: z.coerce.number().min(0).max(60),
  averageWorkingDaysPerMonth: z.coerce.number().min(15).max(31).default(25.4),
});

type Input = z.infer<typeof schema>;

function getCoefficient(years: number): { rate: number; label: string } {
  if (years >= 8) return { rate: 100, label: "8 yil va undan ko'p staj" };
  if (years >= 5) return { rate: 80, label: "5–8 yillik staj" };
  return { rate: 60, label: "5 yildan kam staj" };
}

export const kasallik: CalculatorDefinition<Input> = {
  meta: {
    slug: "kasallik",
    title: "Kasallik varaqasi kalkulyatori",
    description:
      "Vaqtinchalik mehnatga qobiliyatsizlik nafaqasini ish staji va o'rtacha ish haqi asosida hisoblash.",
    category: "Nafaqa",
    source: {
      label: "Kasallik nafaqasi to'lash tartibi",
      url: "https://lex.uz/docs/4677334",
    },
  },
  fields: [
    {
      key: "averageMonthlySalary",
      label: "O'rtacha oylik ish haqi (so'm)",
      helpText: "Oxirgi 12 oylik o'rtacha ish haqi.",
      type: "number",
      required: true,
      min: 0,
      step: 1000,
      unit: "so'm",
    },
    {
      key: "sickDays",
      label: "Kasallik kunlari soni",
      helpText: "Kasallik varaqasidagi ish kunlari.",
      type: "number",
      required: true,
      min: 1,
      max: 365,
      step: 1,
      unit: "kun",
    },
    {
      key: "experienceYears",
      label: "Ish staji (yil)",
      helpText: "Umumiy mehnat staji. Koeffitsient: 8+ yil = 100%, 5–8 yil = 80%, 5 yildan kam = 60%.",
      type: "number",
      required: true,
      min: 0,
      max: 60,
      step: 0.5,
      unit: "yil",
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
    const sickDays = input.sickDays;
    const years = input.experienceYears;
    const workingDays = input.averageWorkingDaysPerMonth;

    const coef = getCoefficient(years);
    const avgDaily = avgMonthly / workingDays;
    const fullPay = avgDaily * sickDays;
    const benefit = (fullPay * coef.rate) / 100;
    const pit = benefit * 0.12;
    const net = benefit - pit;

    return {
      primary: {
        label: "Kasallik nafaqasi (brutto)",
        value: formatSomLabel(benefit),
      },
      lines: [
        { label: "O'rtacha kunlik ish haqi", value: formatSomLabel(avgDaily) },
        { label: "Kasallik kunlari", value: formatDays(sickDays) },
        { label: `Staj koeffitsienti (${coef.label})`, value: formatPercent(coef.rate) },
        { label: "Brutto nafaqa", value: formatSomLabel(benefit), highlight: true },
        { label: "JShDS (12%)", value: `- ${formatSomLabel(pit)}` },
        { label: "Net nafaqa", value: formatSomLabel(net), highlight: true },
      ],
      steps: [
        {
          label: "O'rtacha kunlik ish haqi",
          formula: `${formatSomLabel(avgMonthly)} ÷ ${formatSom(workingDays, { decimals: 1 })}`,
          value: formatSomLabel(avgDaily),
        },
        {
          label: "To'liq to'lov (koeffitsientsiz)",
          formula: `${formatSomLabel(avgDaily)} × ${formatDays(sickDays)}`,
          value: formatSomLabel(fullPay),
        },
        {
          label: `Staj koeffitsienti — ${coef.label}`,
          formula: `${formatSomLabel(fullPay)} × ${formatPercent(coef.rate)}`,
          value: formatSomLabel(benefit),
        },
        {
          label: "Net nafaqa (JShDS 12% chiqarib)",
          formula: `${formatSomLabel(benefit)} × (1 − 12%)`,
          value: formatSomLabel(net),
        },
      ],
      notes: [
        "Dastlabki 2 kalendar kunni ish beruvchi to'laydi, qolgan kunlarni Davlat byudjeti hisobidan to'lanadi.",
        "Ayrim toifa xodimlar uchun staj koeffitsienti hisobga olinmasdan 100% to'lanadi (chunonchi: nogiron, 14 yoshgacha bola onasi).",
        "Maksimal hisob bazasi cheklovi qonun bilan belgilanishi mumkin — amaldagi tartibni tekshiring.",
      ],
    };
  },
};
