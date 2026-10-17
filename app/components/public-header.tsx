"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function BrandMark() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-sm font-black tracking-wider text-amber-400 ring-1 ring-amber-400/40">
      LMA
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M3 12h18M3 6h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const navigation = [
  { label: "About LMA", href: "/#about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Departments", href: "/departments" },
  { label: "Projects", href: "/projects" },
  { label: "Programs", href: "/programs" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "News", href: "/news" },
];

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Development notice */}
      <div className="bg-blue-950 px-4 py-2.5 text-center text-xs font-medium tracking-wide text-blue-100 sm:text-sm">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400" />
        LMA DIGITAL PLATFORM
        <span className="mx-2 text-blue-400">|</span>
        WEBSITE PROTOTYPE — UNDER DEVELOPMENT
      </div>

      {/* Header and navigation */}
      <header className="relative z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link
            href="/"
            aria-label="LMA homepage"
            className="flex items-center gap-3"
          >
            <BrandMark />
            <div>
              <p className="text-xl font-extrabold tracking-tight text-blue-950">
                LMA
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                Project Management Unit
              </p>
            </div>
          </Link>

          {/* Desktop CTA */}
          <Link
            href="/#contact"
            className="hidden items-center gap-2 rounded-lg bg-blue-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 lg:inline-flex"
          >
            Contact LMA
            <ArrowIcon />
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-blue-950 transition hover:bg-slate-100 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-x-6 text-sm font-medium text-slate-600 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-blue-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/verify"
              className="font-semibold text-amber-700 transition hover:text-amber-900"
            >
              Staff Verification
            </Link>
          </nav>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="fixed inset-0 top-[6.5rem] z-40 bg-white lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex h-full flex-col overflow-y-auto px-5 py-6"
            >
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-800"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/verify"
                  onClick={closeMobileMenu}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-amber-700 transition hover:bg-amber-50 hover:text-amber-900"
                >
                  Staff Verification
                </Link>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <Link
                  href="/#contact"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-800"
                >
                  Contact LMA
                  <ArrowIcon />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
