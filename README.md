# HR Portal Uzbekistan (MVP)

O'zbekiston HRlari uchun ochiq portal:

- Qonunchilik bo'limi (`/qonunchilik`)
- HR maqolalar (`/maqolalar`)
- 7 ta kalkulyator (`/kalkulyatorlar`)
- 6 ta hujjat generatori (`/hujjatlar`)
- Yangiliklar (`/yangiliklar`)

## Texnologiyalar

- Next.js (App Router) + TypeScript
- Tailwind CSS
- MDX kontent (`content/*`)
- `react-hook-form` + `zod`
- `.docx` generator (`docx`)

## Muhim qarorlar

- Foydalanuvchi auth/login yo'q
- To'lov/obuna yo'q
- Admin panel yo'q
- Kontent fayl asosida boshqariladi (Git workflow)

## Lokal ishga tushirish

1. Dependency o'rnatish:

```bash
npm install
```

2. `.env.example` dan nusxa oling:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

3. Dev server:

```bash
npm run dev
```

4. Brauzerda oching: [http://localhost:3000](http://localhost:3000)

## Kontentni qanday yangilash

### Maqolalar

- Fayllar: `content/maqolalar/*.mdx`

### Qonunchilik

- Fayllar: `content/qonunchilik/*.mdx`

### Yangiliklar

- Fayllar: `content/yangiliklar/*.mdx`

MDX frontmatter namunasi:

```mdx
---
title: "Sarlavha"
slug: "slug-nomi"
summary: "Qisqa tavsif"
publishedAt: "2026-04-01"
lexUzUrl: "https://lex.uz/docs/..."
---
```

## Hujjat generator

- Shablonlar: `src/lib/documents/templates.ts`
- API endpoint: `src/app/api/documents/[slug]/route.ts`

Hujjat `.docx` formatida yaratiladi va brauzer orqali yuklanadi.

## Kalkulyatorlar

- Registry: `src/lib/calculators/registry.ts`
- Har bir formula: `src/lib/calculators/*.ts`
- API endpoint: `src/app/api/calculators/[slug]/route.ts`

## Build tekshiruv

```bash
npm run build
```
