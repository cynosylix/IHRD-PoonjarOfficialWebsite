"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
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
  indent?: boolean;
}) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 w-full items-center px-3 py-2 text-sm font-medium transition-colors duration-200 xl:h-10 xl:w-auto xl:justify-center xl:whitespace-nowrap xl:px-2.5 2xl:px-3",
        indent && "pl-8 xl:pl-6",
        active
          ? "text-[#0F172A] xl:border-b-2 xl:border-[#D4A017]"
          : "text-[#475569] hover:text-[#0F172A]",
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

  useEffect(() => {
    if (!aboutOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setAboutOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [aboutOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-[76px] max-w-6xl min-w-0 items-center justify-between px-5 sm:h-[80px] sm:px-6 xl:h-[84px] xl:px-8">
        {/* Emblem only */}
        <Link
          href="/"
          onClick={closeMobile}
          className="flex shrink-0 items-center"
          aria-label="College of Engineering Poonjar — Home"
        >
          <Image
            src="/images/logo-mark.webp"
            alt="College of Engineering Poonjar"
            width={413}
            height={317}
            priority
            sizes="(max-width: 640px) 44px, (max-width: 1280px) 48px, 56px"
            className="h-10 w-auto object-contain sm:h-11 xl:h-12 2xl:h-14"
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:ml-10 xl:flex 2xl:ml-12"
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
              id="about-academics-trigger"
              aria-controls="about-academics-menu"
              className={cn(
                "inline-flex h-10 items-center gap-1 px-2.5 text-sm font-medium text-[#475569] transition-colors duration-200 hover:text-[#0F172A] 2xl:px-3",
                aboutOpen && "text-[#0F172A]",
              )}
              aria-expanded={aboutOpen}
              aria-haspopup="true"
              onClick={() => setAboutOpen((v) => !v)}
            >
              <span className="whitespace-nowrap">About / Academics</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-200",
                  aboutOpen && "rotate-180",
                )}
              />
            </button>
            {aboutOpen && (
              <div
                id="about-academics-menu"
                role="menu"
                aria-labelledby="about-academics-trigger"
                className="absolute left-1/2 top-full z-50 mt-0 min-w-[260px] -translate-x-1/2 border border-slate-200 bg-white py-1 shadow-md"
              >
                {ABOUT_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setAboutOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[#475569] transition-colors duration-200 hover:bg-slate-50 hover:text-[#0F172A]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {MAIN_NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.href === "/ioc" ? (
                <>
                  <span className="hidden 2xl:inline">IOC - Industry on Campus</span>
                  <span className="2xl:hidden">IOC</span>
                </>
              ) : (
                item.label
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <Link
            href="/search"
            className="hidden h-9 w-9 items-center justify-center border border-slate-200 text-[#475569] transition-colors duration-200 hover:border-slate-300 hover:text-[#0F172A] md:inline-flex"
            aria-label="Search site"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-slate-200 text-[#475569] transition-colors duration-200 hover:border-slate-300 hover:text-[#0F172A] xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white xl:hidden">
          <div className="flex max-h-[min(70vh,100dvh)] flex-col overflow-y-auto px-4 py-4 pb-8 sm:px-6">
            <div className="border-b border-slate-100 pb-3">
              <NavLink href="/" onClick={closeMobile}>
                Home
              </NavLink>
            </div>
            <div className="border-b border-slate-100 py-3">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                About / Academics
              </p>
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
            <div className="py-3">
              {MAIN_NAV.map((item) => (
                <NavLink key={item.href} href={item.href} onClick={closeMobile}>
                  {item.label}
                </NavLink>
              ))}
              <NavLink href="/search" onClick={closeMobile}>
                Search
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
