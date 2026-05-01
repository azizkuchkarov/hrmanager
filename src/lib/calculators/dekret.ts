import { z } from "zod";
import { CalculatorDefinition } from "./types";
import { formatDays, formatSom, formatSomLabel } from "../format";

const schema = z.object({
  averageMonthlySalary: z.coerce.number().min(0).max(1_000_000_000),
  birthType: z.enum(["normal", "complicated", "multiple"]).default("normal"),
  averageWorkingDaysPerMonth: z.coerce.number().min(15).max(31).default(25.4),
});

type Input = z.infer<typeof schema>;

const BIRTH_TYPES = {
  normal: { label: "Oddiy tug'ish", before: 70, after: 56 },
  complicated: { label: "Asoratli tug'ish", before: 70, after: 70 },
  multiple: { label: "Bir nechta bola tug'ilishi", before: 70, after: 70 },
};

export const dekret: CalculatorDefinition<Input> = {
  meta: {
    slug: "dekret",
    title: "Homiladorlik va tug'ish ta'tili kalkulyatori",
    description:
      "Homiladorlik va tug'ish (dekret) ta'tili davriga to'lanadigan nafaqani hisoblash. Standart 126 kun (oddiy tug'ish) yoki 140 kun (asoratli/ko'p bola).",
    category: "Nafaqa",
    source: {
      label: "Dekret nafaqasi to'lash tartibi",
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
      key: "birthType",
      label: "Tug'ish turi",
      type: "select",
      defaultValue: "normal",
      options: [
        { value: "normal", label: "Oddiy tug'ish (70 + 56 = 126 kun)" },
        { value: "complicated", label: "Asoratli tug'ish (70 + 70 = 140 kun)" },
        { value: "multiple", label: "Bir nechta bola (70 + 70 = 140 kun)" },
      ],
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
    const birthType = BIRTH_TYPES[input.birthType];
    const totalDays = birthType.before + birthType.after;
    const workingDays = input.averageWorkingDaysPerMonth;

    const avgDaily = avgMonthly / workingDays;
    const benefit = avgDaily * totalDays;

    return {
      primary: {
        label: "Dekret nafaqasi (100% to'liq)",
        value: formatSomLabel(benefit),
      },
      lines: [
        { label: "Tug'ish turi", value: birthType.label },
        { label: "Tug'ishgacha", value: formatDays(birthType.before) },
        { label: "Tug'ishdan keyin", value: formatDays(birthType.after) },
        { label: "Jami kunlar", value: formatDays(totalDays), highlight: true },
        { label: "O'rtacha kunlik ish haqi", value: formatSomLabel(avgDaily) },
        { label: "Jami nafaqa summasi", value: formatSomLabel(benefit), highlight: true },
      ],
      steps: [
        {
          label: "Ta'til muddati",
          formula: `${formatDays(birthType.before)} + ${formatDays(birthType.after)}`,
          value: formatDays(totalDays),
        },
        {
          label: "O'rtacha kunlik ish haqi",
          formula: `${formatSomLabel(avgMonthly)} ÷ ${formatSom(workingDays, { decimals: 1 })}`,
          value: formatSomLabel(avgDaily),
        },
        {
          label: "Jami nafaqa (100% stajga qaramay)",
          formula: `${formatSomLabel(avgDaily)} × ${formatDays(totalDays)}`,
          value: formatSomLabel(benefit),
        },
      ],
      notes: [
        "Dekret nafaqasi staj koeffitsientisiz, o'rtacha ish haqining 100% miqdorida to'lanadi.",
        "Nafaqa Davlat byudjeti (Sog'liqni saqlash fondi) hisobidan to'lanadi.",
        "Bola 3 yoshga to'lguncha qo'shimcha ta'til ham olinadi (alohida tartibda).",
        "Hisob-kitob soliq solish maqsadida — JShDS bunday nafaqaga solinmaydi.",
      ],
    };
  },
};
