"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Briefcase, ChevronRight } from "lucide-react";

interface MobileNavProps {
  links: { href: string; label: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Menyuni ochish"
        className="size-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all active:scale-95 shadow-sm"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Menu Content */}
      <div 
        className={`fixed inset-y-0 right-0 z-[101] w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                <Briefcase className="size-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                HR Portal
              </span>
            </Link>
            <button
              type="button"
              aria-label="Yopish"
              className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1.5">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                    <ChevronRight className={`size-4 transition-transform ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} />
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <Link 
              href="/hujjatlar" 
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
            >
              Boshlash
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
