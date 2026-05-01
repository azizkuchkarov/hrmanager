import { z } from "zod";
import { CalculatorDefinition } from "./types";
import { formatHours, formatSomLabel } from "../format";

const schema = z.object({
  hourlyRate: z.coerce.number().min(0).max(10_000_000),
  weekdayHours: z.coerce.number().min(0).max(200).default(0),
  weekendHolidayHours: z.coerce.number().min(0).max(200).default(0),
  firstHoursMultiplier: z.coerce.number().min(1).max(5).default(1.5),
  excessMultiplier: z.coerce.number().min(1).max(5).default(2),
});

type Input = z.infer<typeof schema>;

const FIRST_HOURS_THRESHOLD = 2;

export const ortiqchaIsh: CalculatorDefinition<Input> = {
  meta: {
    slug: "ortiqcha-ish",
    title: "Ortiqcha ish (overtime) kalkulyatori",
    description:
      "Ortiqcha ish soatlari uchun qo'shimcha haq miqdorini hisoblash. Dastlabki 2 soat — 1.5x, undan keyin va dam olish/bayram kunlari — 2x.",
    category: "Ish vaqti",
    source: {
      label: "O'zR Mehnat kodeksi, 158-modda",
      url: "https://lex.uz/docs/6257288",
    },
  },
  fields: [
    {
      key: "hourlyRate",
      label: "Bir soatlik ish haqi (so'm)",
      helpText: "Standart soatlik tarif stavkasi.",
      type: "number",
      required: true,
      min: 0,
      step: 100,
      unit: "so'm",
    },
    {
      key: "weekdayHours",
      label: "Ish kunidagi ortiqcha soatlar",
      helpText: "Oddiy ish kunida belgilangan vaqtdan ortiq ishlangan jami soatlar.",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 200,
      step: 0.5,
      unit: "soat",
    },
    {
      key: "weekendHolidayHours",
      label: "Dam olish/bayram kunidagi soatlar",
      helpText: "Dam olish yoki bayram kunlarida ishlangan soatlar (har biri 2x).",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 200,
      step: 0.5,
      unit: "soat",
    },
    {
      key: "firstHoursMultiplier",
      label: "Dastlabki 2 soat koeffitsienti",
      type: "number",
      defaultValue: 1.5,
      min: 1,
      max: 5,
      step: 0.1,
    },
    {
      key: "excessMultiplier",
      label: "Keyingi soatlar koeffitsienti",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 5,
      step: 0.1,
    },
  ],
  schema,
  calculate(input) {
    const rate = input.hourlyRate;
    const weekday = input.weekdayHours;
    const weekend = input.weekendHolidayHours;
    const m1 = input.firstHoursMultiplier;
    const m2 = input.excessMultiplier;

    const firstHours = Math.min(weekday, FIRST_HOURS_THRESHOLD);
    const excessHours = Math.max(0, weekday - FIRST_HOURS_THRESHOLD);

    const firstPay = firstHours * rate * m1;
    const excessPay = excessHours * rate * m2;
    const weekendPay = weekend * rate * m2;
    const total = firstPay + excessPay + weekendPay;
    const pit = total * 0.12;
    const net = total - pit;

    return {
      primary: {
        label: "Jami ortiqcha ish haqi (brutto)",
        value: formatSomLabel(total),
      },
      lines: [
        { label: "Soatlik tarif", value: formatSomLabel(rate) },
        { label: `Dastlabki ${FIRST_HOURS_THRESHOLD} soat (${m1}x)`, value: `${formatHours(firstHours)} = ${formatSomLabel(firstPay)}` },
        { label: `Keyingi soatlar (${m2}x)`, value: `${formatHours(excessHours)} = ${formatSomLabel(excessPay)}` },
        { label: `Dam olish/bayram (${m2}x)`, value: `${formatHours(weekend)} = ${formatSomLabel(weekendPay)}` },
        { label: "Brutto jami", value: formatSomLabel(total), highlight: true },
        { label: "JShDS (12%)", value: `- ${formatSomLabel(pit)}` },
        { label: "Net summa", value: formatSomLabel(net), highlight: true },
      ],
      steps: [
        {
          label: `Dastlabki ${FIRST_HOURS_THRESHOLD} soat (${m1}x)`,
          formula: `${formatHours(firstHours)} × ${formatSomLabel(rate)} × ${m1}`,
          value: formatSomLabel(firstPay),
        },
        {
          label: `Keyingi soatlar (${m2}x)`,
          formula: `${formatHours(excessHours)} × ${formatSomLabel(rate)} × ${m2}`,
          value: formatSomLabel(excessPay),
        },
        {
          label: `Dam olish/bayram (${m2}x)`,
          formula: `${formatHours(weekend)} × ${formatSomLabel(rate)} × ${m2}`,
          value: formatSomLabel(weekendPay),
        },
        {
          label: "Brutto jami",
          formula: `${formatSomLabel(firstPay)} + ${formatSomLabel(excessPay)} + ${formatSomLabel(weekendPay)}`,
          value: formatSomLabel(total),
        },
      ],
      notes: [
        "Ortiqcha ishga jalb qilish faqat ish beruvchining buyrug'i va xodimning roziligi bilan amalga oshiriladi.",
        "Bir kalendar yilida ortiqcha ish 120 soatdan oshmasligi shart.",
        "Bayram kunlari ishlash 2x to'lov bilan kompensatsiya qilinadi (yoki 1x to'lov + qo'shimcha dam olish kuni).",
      ],
    };
  },
};
