import type { DocumentTemplate } from "./types";

export const documentTemplates: DocumentTemplate[] = [
  {
    slug: "ishga-qabul-buyrugi",
    title: "Ishga qabul qilish buyrug'i",
    description: "Xodimni ishga qabul qilish haqidagi buyruq loyihasi.",
    category: "Buyruqlar",
    fields: [
      { key: "organization", label: "Tashkilot nomi", type: "text", required: true },
      { key: "docNumber", label: "Buyruq raqami", type: "text", required: true },
      { key: "docDate", label: "Buyruq sanasi", type: "date", required: true },
      { key: "fullName", label: "Xodim F.I.Sh.", type: "text", required: true },
      { key: "position", label: "Lavozim", type: "text", required: true },
      { key: "department", label: "Bo'lim", type: "text" },
      { key: "salary", label: "Oylik maosh (so'm)", type: "number", required: true },
      { key: "startDate", label: "Ish boshlash sanasi", type: "date", required: true },
      { key: "contractNumber", label: "Mehnat shartnomasi raqami", type: "text" },
    ],
  },
  {
    slug: "mehnat-shartnomasi",
    title: "Mehnat shartnomasi",
    description: "Xodim va ish beruvchi o'rtasida mehnat shartnomasi loyihasi.",
    category: "Shartnomalar",
    fields: [
      { key: "organization", label: "Ish beruvchi", type: "text", required: true },
      { key: "directorName", label: "Rahbar F.I.Sh.", type: "text", required: true },
      { key: "employeeName", label: "Xodim F.I.Sh.", type: "text", required: true },
      { key: "employeePassport", label: "Pasport ma'lumoti", type: "text", required: true },
      { key: "position", label: "Lavozim", type: "text", required: true },
      { key: "workplace", label: "Ish joyi manzili", type: "text", required: true },
      { key: "salary", label: "Oylik maosh (so'm)", type: "number", required: true },
      { key: "startDate", label: "Shartnoma boshlanish sanasi", type: "date", required: true },
      { key: "term", label: "Shartnoma muddati", type: "text", defaultValue: "nomuayyan" },
    ],
  },
  {
    slug: "tatil-arizasi",
    title: "Ta'til arizasi",
    description: "Xodimning yillik mehnat ta'tiliga chiqish arizasi.",
    category: "Arizalar",
    fields: [
      { key: "organization", label: "Tashkilot nomi", type: "text", required: true },
      { key: "managerName", label: "Rahbar F.I.Sh.", type: "text", required: true },
      { key: "employeeName", label: "Xodim F.I.Sh.", type: "text", required: true },
      { key: "position", label: "Lavozim", type: "text", required: true },
      {
        key: "vacationType",
        label: "Ta'til turi",
        type: "select",
        options: [
          { value: "yillik", label: "Yillik mehnat ta'tili" },
          { value: "qoshimcha", label: "Qo'shimcha ta'til" },
          { value: "ish-haqisiz", label: "Ish haqi saqlanmaydigan ta'til" },
        ],
      },
      { key: "startDate", label: "Boshlanish sanasi", type: "date", required: true },
      { key: "endDate", label: "Tugash sanasi", type: "date", required: true },
      { key: "days", label: "Ta'til kunlari soni", type: "number", required: true },
    ],
  },
  {
    slug: "ogohlantirish-xati",
    title: "Ogohlantirish xati",
    description: "Intizom buzilishi bo'yicha xodimga yozma ogohlantirish.",
    category: "Intizom",
    fields: [
      { key: "organization", label: "Tashkilot nomi", type: "text", required: true },
      { key: "employeeName", label: "Xodim F.I.Sh.", type: "text", required: true },
      { key: "position", label: "Lavozim", type: "text", required: true },
      { key: "incidentDate", label: "Hodisa sanasi", type: "date", required: true },
      { key: "incident", label: "Qoidabuzarlik tavsifi", type: "text", required: true },
      { key: "legalBasis", label: "Huquqiy asos", type: "text", defaultValue: "Mehnat kodeksi" },
      { key: "deadline", label: "Tushuntirish xati muddati", type: "date" },
    ],
  },
  {
    slug: "ishdan-boshatish-buyrugi",
    title: "Ishdan bo'shatish buyrug'i",
    description: "Mehnat shartnomasini bekor qilish bo'yicha buyruq.",
    category: "Buyruqlar",
    fields: [
      { key: "organization", label: "Tashkilot nomi", type: "text", required: true },
      { key: "docNumber", label: "Buyruq raqami", type: "text", required: true },
      { key: "docDate", label: "Buyruq sanasi", type: "date", required: true },
      { key: "employeeName", label: "Xodim F.I.Sh.", type: "text", required: true },
      { key: "position", label: "Lavozim", type: "text", required: true },
      { key: "dismissalDate", label: "Bo'shatish sanasi", type: "date", required: true },
      { key: "reason", label: "Asos", type: "text", required: true },
      { key: "compensation", label: "Kompensatsiya summasi (so'm)", type: "number" },
    ],
  },
  {
    slug: "xizmat-safari-buyrugi",
    title: "Xizmat safari buyrug'i",
    description: "Xodimni xizmat safariga yuborish bo'yicha buyruq.",
    category: "Buyruqlar",
    fields: [
      { key: "organization", label: "Tashkilot nomi", type: "text", required: true },
      { key: "docNumber", label: "Buyruq raqami", type: "text", required: true },
      { key: "docDate", label: "Buyruq sanasi", type: "date", required: true },
      { key: "employeeName", label: "Xodim F.I.Sh.", type: "text", required: true },
      { key: "position", label: "Lavozim", type: "text", required: true },
      { key: "destination", label: "Safar joyi", type: "text", required: true },
      { key: "purpose", label: "Safar maqsadi", type: "text", required: true },
      { key: "startDate", label: "Safar boshlanish sanasi", type: "date", required: true },
      { key: "endDate", label: "Safar tugash sanasi", type: "date", required: true },
      { key: "dailyAllowance", label: "Sutkalik to'lov (so'm)", type: "number" },
    ],
  },
];

export function listDocumentTemplates() {
  return documentTemplates;
}

export function getDocumentTemplate(slug: string) {
  return documentTemplates.find((item) => item.slug === slug) ?? null;
}
