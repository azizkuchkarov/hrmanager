import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HR Portal — O'zbekiston HRlari uchun yordamchi",
    template: "%s | HR Portal",
  },
  description:
    "O'zbekiston HRlari, buxgalterlari va kichik kompaniyalar uchun bepul portal: mehnat qonunchiligi, kalkulyatorlar, hujjat shablonlari va maqolalar.",
  keywords: [
    "HR",
    "kadrlar",
    "mehnat kodeksi",
    "ta'til puli",
    "oylik soliq",
    "mehnat shartnomasi",
    "Lex.uz",
    "O'zbekiston",
  ],
  authors: [{ name: "HR Portal" }],
  openGraph: {
    title: "HR Portal — O'zbekiston HRlari uchun yordamchi",
    description:
      "Mehnat qonunchiligi, kalkulyatorlar va HR hujjat shablonlari bir joyda.",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <DisclaimerBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
