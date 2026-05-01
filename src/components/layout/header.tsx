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
    <header className="sticky top-0 z-30">
      <div className="container mx-auto max-w-7xl px-4 pt-3">
        <div className="glass-card rounded-2xl h-16 px-4 flex items-center justify-between shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg">
          <span className="size-9 rounded-xl bg-gradient-to-br from-primary to-indigo-500 text-primary-foreground flex items-center justify-center shadow-sm">
            <Briefcase className="size-4" />
          </span>
          <span>HR Portal</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
