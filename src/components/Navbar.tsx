"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import KoralLogo from "./KoralLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean nav items without any numbers
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products & Services", href: "/products-services", hasDropdown: true },
    { label: "Jukebox", href: "/jukebox" },
    { label: "Videos", href: "/videos" },
    { label: "Rigs", href: "/spaces" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
      {/* Transparent Glassmorphic Hanging Notch Island */}
      <div className="relative pointer-events-none max-w-6xl w-[94%] xl:w-[86%] flex justify-center">
        <div className="relative w-full pointer-events-auto bg-black/40 hover:bg-black/50 backdrop-blur-2xl px-5 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between rounded-b-[24px] sm:rounded-b-[28px] border-b border-x border-white/15 shadow-[0_16px_45px_rgba(0,0,0,0.6)] transition-all duration-300">
          
          {/* Left Zone: Clean Navigation Links without numbers */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-1 font-sans text-xs sm:text-[13px] lg:text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                )}
              </Link>
            ))}
          </nav>

          {/* Center Zone: Centered Brand Logo (Crisp White & Coral on Glass) */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
              aria-label="Koral Records Home"
            >
              <KoralLogo size="sm" darkText={false} />
            </Link>
          </div>

          {/* Right Zone: Single Contact Pill CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 sm:py-2.5 rounded-full bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-sans text-xs sm:text-sm font-black tracking-tight transition-all duration-200 shadow-[0_4px_18px_rgba(247,145,146,0.4)] hover:shadow-[0_6px_25px_rgba(247,145,146,0.6)] hover:scale-[1.03]"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4 text-[#0C1014] stroke-[2.5]" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Transparent Glassmorphic) */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto absolute top-full mt-2 mx-auto max-w-6xl w-[94%] bg-black/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 shadow-2xl flex flex-col gap-3 font-sans text-sm animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-zinc-200 hover:text-[#F79192] font-semibold border-b border-white/10 flex items-center justify-between transition-colors"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full py-3 rounded-full bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] text-center text-sm font-bold transition-all shadow-[0_4px_18px_rgba(247,145,146,0.35)] flex items-center justify-center gap-2"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-4 h-4 text-[#0C1014] stroke-[2.5]" />
          </Link>
        </div>
      )}
    </header>
  );
}
