import { z } from "zod";
import { CalculatorDefinition } from "./types";
import { formatPercent, formatSomLabel } from "../format";

const schema = z.object({
  grossSalary: z.coerce.number().min(0).max(1_000_000_000),
  pitRate: z.coerce.number().min(0).max(100).default(12),
  inpsRate: z.coerce.number().min(0).max(100).default(0.1),
});

type Input = z.infer<typeof schema>;

export const oylikSoliq: CalculatorDefinition<Input> = {
  meta: {
    slug: "oylik-soliq",
    title: "Oylikdan soliq kalkulyatori",
    description:
      "Oylik ish haqidan jismoniy shaxs daromad solig'i (JShDS) va INPS to'lovini hisoblash. Net (qo'lga olinadigan) summani aniqlaydi.",
    category: "Soliq",
    source: {
      label: "O'zR Soliq kodeksi, 381-modda",
      url: "https://lex.uz/docs/4674902",
    },
    effectiveFrom: "2024-01-01",
  },
  fields: [
    {
      key: "grossSalary",
      label: "Brutto oylik (so'mda)",
      helpText: "Soliqdan oldingi to'liq ish haqi",
      type: "number",
      required: true,
      min: 0,
      step: 1000,
      unit: "so'm",
    },
    {
      key: "pitRate",
      label: "JShDS stavkasi (%)",
      helpText: "Jismoniy shaxslardan olinadigan daromad solig'i. Standart — 12%.",
      type: "number",
      defaultValue: 12,
      step: 0.1,
      min: 0,
      max: 100,
      unit: "%",
    },
    {
      key: "inpsRate",
      label: "INPS stavkasi (%)",
      helpText: "Yakka tartibda jamg'arib boriladigan pensiya. Standart — 0.1%.",
      type: "number",
      defaultValue: 0.1,
      step: 0.1,
      min: 0,
      max: 100,
      unit: "%",
    },
  ],
  schema,
  calculate(input) {
    const gross = input.grossSalary;
    const pitRate = input.pitRate;
    const inpsRate = input.inpsRate;

    const pitAmount = (gross * pitRate) / 100;
    const inpsAmount = (gross * inpsRate) / 100;
    const totalDeduction = pitAmount + inpsAmount;
    const net = gross - totalDeduction;

    return {
      primary: {
        label: "Qo'lga olinadigan oylik (Net)",
        value: formatSomLabel(net),
      },
      lines: [
        { label: "Brutto oylik", value: formatSomLabel(gross) },
        { label: `JShDS (${formatPercent(pitRate)})`, value: `- ${formatSomLabel(pitAmount)}` },
        { label: `INPS (${formatPercent(inpsRate)})`, value: `- ${formatSomLabel(inpsAmount)}` },
        { label: "Jami ushlovlar", value: `- ${formatSomLabel(totalDeduction)}`, highlight: true },
        { label: "Net oylik", value: formatSomLabel(net), highlight: true },
      ],
      steps: [
        {
          label: "JShDS hisoblash",
          formula: `${formatSomLabel(gross)} × ${formatPercent(pitRate)}`,
          value: formatSomLabel(pitAmount),
        },
        {
          label: "INPS hisoblash",
          formula: `${formatSomLabel(gross)} × ${formatPercent(inpsRate)}`,
          value: formatSomLabel(inpsAmount),
        },
        {
          label: "Jami ushlovlar",
          formula: `${formatSomLabel(pitAmount)} + ${formatSomLabel(inpsAmount)}`,
          value: formatSomLabel(totalDeduction),
        },
        {
          label: "Net oylik",
          formula: `${formatSomLabel(gross)} − ${formatSomLabel(totalDeduction)}`,
          value: formatSomLabel(net),
        },
      ],
      notes: [
        "JShDS stavkasi va imtiyozlar amaldagi Soliq kodeksiga muvofiq belgilanadi.",
        "Yagona ijtimoiy to'lov (12%) ish beruvchi tomonidan to'lanadi va bu kalkulyatorda hisobga olinmagan.",
      ],
    };
  },
};
