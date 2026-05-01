import { z } from "zod";
import { CalculatorDefinition } from "./types";
import { formatDays, formatSom, formatSomLabel } from "../format";

const schema = z.object({
  averageMonthlySalary: z.coerce.number().min(0).max(1_000_000_000),
  vacationDays: z.coerce.number().min(1).max(365).default(21),
  averageWorkingDaysPerMonth: z.coerce.number().min(15).max(31).default(25.4),
});

type Input = z.infer<typeof schema>;

export const tatilPuli: CalculatorDefinition<Input> = {
  meta: {
    slug: "tatil-puli",
    title: "Ta'til puli kalkulyatori",
    description:
      "Yillik mehnat ta'tili uchun to'lanadigan haq miqdorini o'rtacha ish haqi asosida hisoblash.",
    category: "Ta'til",
    source: {
      label: "O'zR Mehnat kodeksi, 138-modda (ta'til to'lovi)",
      url: "https://lex.uz/docs/6257288",
    },
    effectiveFrom: "2023-04-30",
  },
  fields: [
    {
      key: "averageMonthlySalary",
      label: "O'rtacha oylik ish haqi (so'm)",
      helpText: "Oxirgi 12 oylik o'rtacha ish haqi (premiyalar va doimiy qo'shimcha to'lovlar bilan).",
      type: "number",
      required: true,
      min: 0,
      step: 1000,
      unit: "so'm",
    },
    {
      key: "vacationDays",
      label: "Ta'til kunlari soni",
      helpText: "Standart yillik mehnat ta'tili — 21 ish kuni. Ayrim toifalar uchun ko'proq.",
      type: "number",
      required: true,
      defaultValue: 21,
      min: 1,
      max: 365,
      step: 1,
      unit: "kun",
    },
    {
      key: "averageWorkingDaysPerMonth",
      label: "Oyiga o'rtacha ish kunlari",
      helpText: "Standart koeffitsient — 25.4 (5 kunlik ish haftasi uchun).",
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
    const days = input.vacationDays;
    const workingDays = input.averageWorkingDaysPerMonth;

    const avgDaily = avgMonthly / workingDays;
    const total = avgDaily * days;
    const pit = total * 0.12;
    const net = total - pit;

    return {
      primary: {
        label: "Ta'til puli (brutto)",
        value: formatSomLabel(total),
      },
      lines: [
        { label: "O'rtacha kunlik ish haqi", value: formatSomLabel(avgDaily) },
        { label: "Ta'til kunlari", value: formatDays(days) },
        { label: "Brutto ta'til puli", value: formatSomLabel(total), highlight: true },
        { label: "JShDS (12%)", value: `- ${formatSomLabel(pit)}` },
        { label: "Net ta'til puli", value: formatSomLabel(net), highlight: true },
      ],
      steps: [
        {
          label: "O'rtacha kunlik ish haqi",
          formula: `${formatSomLabel(avgMonthly)} ÷ ${formatSom(workingDays, { decimals: 1 })}`,
          value: formatSomLabel(avgDaily),
        },
        {
          label: "Brutto ta'til puli",
          formula: `${formatSomLabel(avgDaily)} × ${formatDays(days)}`,
          value: formatSomLabel(total),
        },
        {
          label: "JShDS (12%)",
          formula: `${formatSomLabel(total)} × 12%`,
          value: formatSomLabel(pit),
        },
        {
          label: "Net ta'til puli",
          formula: `${formatSomLabel(total)} − ${formatSomLabel(pit)}`,
          value: formatSomLabel(net),
        },
      ],
      notes: [
        "Ta'til puli ta'tildan kamida 3 kun oldin to'lanishi shart (Mehnat kodeksi).",
        "O'rtacha ish haqi hisobida oxirgi 12 oylik daromad (mukofotlar, ustamalar) hisobga olinadi.",
        "Bayram va dam olish kunlari ta'til muddatini uzaytiradi, ammo to'lov shu kunlarga hisoblanmaydi.",
      ],
    };
  },
};
