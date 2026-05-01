"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileNavProps {
  links: { href: string; label: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Menyuni ochish"
        className="p-2.5 rounded-xl hover:bg-muted/80 transition-colors"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between border-b border-border">
            <span className="font-semibold text-lg">HR Portal</span>
            <button
              type="button"
              aria-label="Yopish"
              className="p-2.5 rounded-xl hover:bg-muted/80 transition-colors"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="container mx-auto max-w-7xl px-4 py-6 flex flex-col gap-1.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3.5 rounded-xl text-base font-medium hover:bg-muted/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
