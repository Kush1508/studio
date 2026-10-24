"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import KoralLogo from "./KoralLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { num: "01", label: "WALKTHROUGH", href: "/#tour" },
    { num: "02", label: "SERVICES", href: "/products-services" },
    { num: "03", label: "JUKEBOX", href: "/jukebox" },
    { num: "04", label: "VIDEOS", href: "/videos" },
    { num: "05", label: "RIGS", href: "/spaces" },
    { num: "06", label: "BOOK", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-2xl border-b border-zinc-800 transition-all duration-300">
      {/* Full-width container spanning edge-to-edge without dead margins */}
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-3.5 sm:py-4 lg:py-4.5 flex items-center justify-between">
        {/* Left: Prominent Branding & Studio Geographic Coordinates */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            aria-label="Koral Records Home"
          >
            <KoralLogo size="md" />
          </Link>

          <div className="hidden xl:flex items-center gap-2.5 font-mono text-xs text-zinc-400 uppercase tracking-widest pl-6 border-l border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span>22.57° N, 88.48° E • SHAPOORJI, NEW TOWN</span>
          </div>
        </div>

        {/* Center: Prominent Minimalist Nav Triggers */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 rounded-lg font-mono text-xs sm:text-[13px] lg:text-sm uppercase tracking-wider text-zinc-300 hover:text-white transition-all duration-200 flex items-center gap-2 hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
            >
              <span className="text-[#F79192] text-xs font-bold">
                {item.num}
              </span>
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right: Dispatch CTA & Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Direct Session Dispatch Trigger */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-xs sm:text-sm font-black tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(247,145,146,0.35)] hover:shadow-[0_0_35px_rgba(247,145,146,0.55)] hover:scale-[1.02]"
          >
            <span>[ BOOK DESK ]</span>
            <ArrowUpRight className="w-4 h-4 text-[#0C1014] stroke-[3]" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#080808]/98 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 font-mono text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-900 text-zinc-500 text-xs">
            <span>[ SYSTEM: KORAL_NAV_ACTIVE ]</span>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-zinc-200 hover:text-[#F79192] border-b border-zinc-900/60 flex items-center justify-between transition-colors"
            >
              <span className="font-semibold">{item.label}</span>
              <span className="text-[#F79192] text-xs font-bold">{item.num}</span>
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-3 w-full py-3 rounded-lg bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-center text-xs font-black tracking-wider transition-colors shadow-[0_0_20px_rgba(247,145,146,0.3)]"
          >
            [ BOOK SESSION DIRECTLY → ]
          </Link>

          <div className="pt-2 text-xs text-zinc-500">
            [ 22.57° N, 88.48° E • SHAPOORJI, KOLKATA ]
          </div>
        </div>
      )}
    </header>
  );
}
