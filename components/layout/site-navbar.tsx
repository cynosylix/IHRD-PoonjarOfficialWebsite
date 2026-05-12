"use client";

import Image from "next/image";
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
  indent,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  /** Mobile drawer: nested items under a section label */
  indent?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 w-full items-center rounded-lg px-3 text-sm font-medium transition-colors lg:h-10 lg:w-auto lg:whitespace-nowrap lg:px-3.5",
        indent && "pl-8 lg:pl-3.5",
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
      <div className="mx-auto flex max-w-6xl min-w-0 items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 lg:px-8">
        <div className="flex min-w-0 flex-1 justify-start lg:min-w-0 lg:flex-none">
          <Link
            href="/"
            className="flex min-w-0 items-center"
            onClick={closeMobile}
          >
            <Image
              src="/images/logo.webp"
              alt="College of Engineering Poonjar"
              width={280}
              height={72}
              priority
              className="h-9 w-auto max-w-[min(58vw,260px)] object-contain object-left sm:h-10 sm:max-w-[min(50vw,300px)] lg:max-w-[min(100%,340px)]"
            />
          </Link>
        </div>

        <nav
          className="hidden shrink-0 items-center gap-0.5 lg:flex"
          aria-label="Main"
        >
          <NavLink href="/">Home</NavLink>
          <div
            className="relative flex items-center"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "inline-flex h-10 items-center gap-1 rounded-lg px-3.5 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-900",
                aboutOpen && "bg-brand-50 text-brand-900",
              )}
              aria-expanded={aboutOpen}
              aria-haspopup="true"
            >
              <span className="whitespace-nowrap">About / Academics</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 opacity-70 transition-transform duration-200",
                  aboutOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full z-50 mt-1.5 min-w-[260px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white py-1.5 shadow-card"
                >
                  {ABOUT_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm leading-snug text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-900"
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

        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none lg:justify-self-end">
          <Link
            href="/search"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800 lg:inline-flex"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={2} />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="flex max-h-[min(70vh,100dvh)] flex-col gap-0 overflow-y-auto overscroll-contain px-4 py-4 pb-8">
              <div className="flex flex-col gap-0.5 border-b border-slate-100 pb-4">
                <NavLink href="/" onClick={closeMobile}>
                  Home
                </NavLink>
              </div>
              <div className="border-b border-slate-100 py-4">
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  About / Academics
                </p>
                <div className="flex flex-col gap-0.5">
                  {ABOUT_DROPDOWN.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      indent
                      onClick={closeMobile}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-0.5 border-b border-slate-100 py-4">
                {MAIN_NAV.slice(3).map((item) => (
                  <NavLink key={item.href} href={item.href} onClick={closeMobile}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <Link
                href="/search"
                onClick={closeMobile}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-sm font-semibold text-white shadow-sm ring-1 ring-brand-900/10 transition hover:bg-brand-700"
              >
                <Search className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                Search
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
