"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";
import { ABOUT_DROPDOWN, MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-brand-100 text-brand-900"
          : "text-slate-700 hover:bg-brand-50 hover:text-brand-900",
      )}
    >
      {children}
    </Link>
  );
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const closeMobile = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl min-w-0 items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 sm:flex-initial sm:gap-2.5"
          onClick={closeMobile}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white shadow-md sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm">
            CE
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-semibold text-brand-900 sm:text-sm">
              College of Engineering
            </p>
            <p className="truncate text-[11px] text-slate-600 sm:text-xs">Poonjar · IHRD</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/">Home</NavLink>
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-900",
                aboutOpen && "bg-brand-50 text-brand-900",
              )}
              aria-expanded={aboutOpen}
              aria-haspopup="true"
            >
              About / Academics
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-1 min-w-[240px] rounded-xl border border-slate-200 bg-white py-2 shadow-card"
                >
                  {ABOUT_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {MAIN_NAV.slice(3).map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-brand-50 hover:text-brand-800"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="flex max-h-[min(70vh,100dvh)] flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4 pb-8">
              <NavLink href="/" onClick={closeMobile}>
                Home
              </NavLink>
              <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                About / Academics
              </p>
              {ABOUT_DROPDOWN.map((item) => (
                <NavLink key={item.href} href={item.href} onClick={closeMobile}>
                  {item.label}
                </NavLink>
              ))}
              {MAIN_NAV.slice(3).map((item) => (
                <NavLink key={item.href} href={item.href} onClick={closeMobile}>
                  {item.label}
                </NavLink>
              ))}
              <Link
                href="/search"
                onClick={closeMobile}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand-600 py-2 text-sm font-medium text-white"
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
