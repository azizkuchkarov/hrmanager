"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase } from "lucide-react";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "/maqolalar", label: "Maqolalar" },
  { href: "/qonunchilik", label: "Qonunchilik" },
  { href: "/kalkulyatorlar", label: "Kalkulyatorlar" },
  { href: "/hujjatlar", label: "Hujjatlar" },
  { href: "/yangiliklar", label: "Yangiliklar" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 py-3 md:py-4">
      <div className="container mx-auto max-w-7xl px-3 md:px-4">
        <div className="glass-card rounded-[1.5rem] md:rounded-[2rem] h-16 md:h-20 px-4 md:px-6 flex items-center justify-between premium-shadow">
          <Link href="/" className="flex items-center gap-2.5 md:gap-3 group">
            <div className="size-9 md:size-11 rounded-xl md:rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
              <Briefcase className="size-4 md:size-5" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              HR Portal
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-slate-100/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link 
              href="/hujjatlar" 
              className="hidden lg:flex h-11 px-6 items-center rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
            >
              Boshlash
            </Link>
            <MobileNav links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
