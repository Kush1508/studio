"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import KoralLogo from "./KoralLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean nav items without any numbers (as requested)
  const navItems = [
    { label: "Products & Services", href: "/products-services", hasDropdown: true },
    { label: "Walkthrough", href: "/#tour" },
    { label: "Jukebox", href: "/jukebox" },
    { label: "Videos", href: "/videos" },
    { label: "Rigs", href: "/spaces" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top White Frame Rail connecting horizontally across the top */}
      <div className="w-full h-2.5 sm:h-3.5 bg-white shadow-sm" />

      {/* Hanging Inverted Notch Shelf Container */}
      <div className="relative mx-auto -mt-2.5 sm:-mt-3.5 max-w-6xl w-[94%] xl:w-[86%] flex justify-center pointer-events-none">
        <div className="relative w-full pointer-events-auto bg-white px-5 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between rounded-b-[24px] sm:rounded-b-[28px] shadow-[0_16px_40px_rgba(0,0,0,0.18)] border-b border-x border-zinc-200/90 transition-all duration-300">
          
          {/* Left Inverted Concave Fillet Ear */}
          <svg
            className="absolute -left-[24px] top-0 w-[24px] h-[24px] pointer-events-none select-none"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 0 H24 V24 A24 24 0 0 1 0 0 Z" fill="#ffffff" />
          </svg>

          {/* Right Inverted Concave Fillet Ear */}
          <svg
            className="absolute -right-[24px] top-0 w-[24px] h-[24px] pointer-events-none select-none"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M24 0 H0 V24 A24 24 0 0 1 24 0 Z" fill="#ffffff" />
          </svg>

          {/* Left Zone: Clean Navigation Links without numbers */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-1 font-sans text-xs sm:text-[13px] lg:text-sm font-semibold text-zinc-700 hover:text-black transition-colors"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 transition-colors" />
                )}
              </Link>
            ))}
          </nav>

          {/* Center Zone: Centered Brand Logo */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
              aria-label="Koral Records Home"
            >
              <KoralLogo size="sm" darkText={true} />
            </Link>
          </div>

          {/* Right Zone: Secondary Action + Solidroad-style Pill CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/contact"
              className="hidden lg:inline-block font-sans text-xs sm:text-[13px] lg:text-sm font-semibold text-zinc-600 hover:text-black transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-sans text-xs sm:text-sm font-black tracking-tight transition-all duration-200 shadow-[0_4px_15px_rgba(247,145,146,0.35)] hover:shadow-[0_6px_22px_rgba(247,145,146,0.55)] hover:scale-[1.03]"
            >
              <span>Book Studio</span>
              <ArrowUpRight className="w-4 h-4 text-[#0C1014] stroke-[2.5]" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto mx-auto max-w-6xl w-[94%] bg-white border-b border-x border-zinc-200 rounded-b-2xl p-6 shadow-2xl flex flex-col gap-3 font-sans text-sm animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-zinc-800 hover:text-[#D94546] font-semibold border-b border-zinc-100 flex items-center justify-between"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-zinc-800 hover:text-[#D94546] font-semibold border-b border-zinc-100 flex items-center justify-between"
          >
            <span>Contact & Location</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full py-3 rounded-full bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] text-center text-sm font-bold transition-all shadow-[0_4px_15px_rgba(247,145,146,0.3)]"
          >
            Book Studio Session →
          </Link>
        </div>
      )}
    </header>
  );
}
