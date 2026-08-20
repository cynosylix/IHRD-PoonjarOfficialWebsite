"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { ABOUT_DROPDOWN, MAIN_NAV } from "@/lib/constants";
import { siteSettings } from "@/data/site-data";
import { cn } from "@/lib/utils";

const DESKTOP_NAV_QUERY = "(min-width: 1280px)";

function NavLink({
  href,
  children,
  onClick,
  indent,
}: {
  href: string;
  children: ReactNode;
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
        "inline-flex min-h-12 w-full items-center px-4 py-3 text-[15px] font-medium transition-colors duration-200",
        "xl:h-10 xl:min-h-0 xl:w-auto xl:shrink-0 xl:justify-center xl:whitespace-nowrap xl:px-1.5 xl:py-0 xl:text-[13px] 2xl:px-2.5 2xl:text-sm",
        indent && "pl-8 xl:pl-6",
        active
          ? "bg-slate-50 text-[#0F172A] xl:bg-transparent xl:border-b-2 xl:border-[#D4A017]"
          : "text-[#475569] hover:text-[#0F172A]",
      )}
    >
      {children}
    </Link>
  );
}

function BrandMark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex min-w-0 max-w-[min(100%,18.5rem)] items-center gap-2.5 sm:max-w-none sm:gap-3"
      aria-label={`${siteSettings.collegeName} — Home`}
    >
      <Image
        src="/images/logo-mark.webp"
        alt=""
        width={413}
        height={317}
        priority
        sizes="(max-width: 640px) 40px, (max-width: 1280px) 44px, 52px"
        className="h-9 w-auto shrink-0 object-contain object-center sm:h-10 xl:h-11 2xl:h-12"
      />
      <span className="min-w-0">
        <span className="block font-display text-[13px] font-semibold leading-[1.2] text-[#0F172A] sm:text-sm xl:text-[15px]">
          College of Engineering
        </span>
        <span className="block text-[11px] font-medium leading-tight text-[#475569] sm:text-xs">
          Poonjar
        </span>
      </span>
    </Link>
  );
}

export function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const menuId = useId();
  const aboutMenuId = useId();

  const closeMobile = () => setOpen(false);

  const clearCloseTimer = () => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openAbout = () => {
    clearCloseTimer();
    setAboutOpen(true);
  };

  const scheduleCloseAbout = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setAboutOpen(false), 140);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_NAV_QUERY);
    const onChange = () => {
      if (mq.matches) {
        setOpen(false);
      } else {
        setAboutOpen(false);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!aboutOpen && !open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAboutOpen(false);
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [aboutOpen, open]);

  useEffect(() => {
    if (!aboutOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [aboutOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90",
        "transition-shadow duration-300",
        scrolled && "shadow-[0_8px_24px_-12px_rgba(11,31,91,0.28)]",
      )}
    >
      <div className="mx-auto flex h-16 min-w-0 max-w-[90rem] items-center gap-3 px-3 sm:h-[4.5rem] sm:gap-4 sm:px-5 xl:h-20 xl:px-8">
        <div className="flex min-w-0 flex-1 items-center xl:flex-none">
          <BrandMark onNavigate={closeMobile} />
        </div>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
          aria-label="Main"
        >
          <div className="flex min-w-0 items-center justify-center">
            <NavLink href="/">Home</NavLink>
            <div
              ref={aboutRef}
              className="relative flex items-center"
              onMouseEnter={openAbout}
              onMouseLeave={scheduleCloseAbout}
            >
              <button
                type="button"
                id="about-academics-trigger"
                aria-controls={aboutMenuId}
                className={cn(
                  "inline-flex h-10 shrink-0 items-center gap-1 whitespace-nowrap px-1.5 text-[13px] font-medium text-[#475569] transition-colors duration-200 hover:text-[#0F172A] 2xl:px-2.5 2xl:text-sm",
                  aboutOpen && "text-[#0F172A]",
                )}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                onClick={() => setAboutOpen((v) => !v)}
              >
                About / Academics
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    aboutOpen && "rotate-180",
                  )}
                />
              </button>
              {aboutOpen ? (
                <div
                  id={aboutMenuId}
                  role="menu"
                  aria-labelledby="about-academics-trigger"
                  className="absolute left-0 top-full z-[60] min-w-[16.5rem] max-w-[min(20rem,calc(100vw-2rem))] pt-1"
                >
                  <div className="border border-slate-200 bg-white py-1 shadow-md">
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
                </div>
              ) : null}
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
          </div>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <Link
            href="/search"
            className="hidden h-10 w-10 items-center justify-center border border-slate-200 text-[#475569] transition-colors duration-200 hover:border-slate-300 hover:text-[#0F172A] xl:inline-flex"
            aria-label="Search site"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-slate-200 text-[#475569] transition-colors duration-200 hover:border-slate-300 hover:text-[#0F172A] xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mounted && open
        ? createPortal(
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close menu"
              className="fixed inset-x-0 top-16 bottom-0 z-40 bg-slate-900/25 sm:top-[4.5rem] xl:hidden"
              onClick={closeMobile}
            />,
            document.body,
          )
        : null}

      {open ? (
        <div
          id={menuId}
          className="relative z-50 border-t border-slate-200 bg-white xl:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto overscroll-contain px-2 py-2 pb-[max(1rem,env(safe-area-inset-bottom))] touch-manipulation sm:max-h-[calc(100dvh-4.5rem)] sm:px-4"
          >
            <NavLink href="/" onClick={closeMobile}>
              Home
            </NavLink>

            <div className="border-t border-slate-100">
              <button
                type="button"
                className="flex min-h-12 w-full items-center justify-between px-4 py-3 text-left text-[15px] font-medium text-[#0F172A]"
                aria-expanded={mobileAboutOpen}
                onClick={() => setMobileAboutOpen((v) => !v)}
              >
                About / Academics
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-[#64748B] transition-transform duration-200",
                    mobileAboutOpen && "rotate-180",
                  )}
                />
              </button>
              {mobileAboutOpen ? (
                <div className="pb-1">
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
              ) : null}
            </div>

            <div className="border-t border-slate-100">
              {MAIN_NAV.map((item) => (
                <NavLink key={item.href} href={item.href} onClick={closeMobile}>
                  {item.label}
                </NavLink>
              ))}
              <NavLink href="/search" onClick={closeMobile}>
                Search
              </NavLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
