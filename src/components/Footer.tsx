"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Instagram, Youtube, Music } from "lucide-react";
import KoralLogo from "./KoralLogo";
import {
  STUDIO_LOCATION,
  STUDIO_EMAIL,
  STUDIO_PHONE,
  STUDIO_COORDINATES,
} from "./ContactSection";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#040404] border-t border-zinc-900 pt-16 pb-12 px-6 sm:px-10 lg:px-14 xl:px-16 text-zinc-400">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand & Ethos */}
          <div className="md:col-span-2 space-y-4">
            <KoralLogo size="md" />
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed font-sans">
              Boutique music recording, vocal production, and audio engineering facility located in {STUDIO_LOCATION}.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 hover:text-[#F79192] border border-zinc-800 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 hover:text-[#F79192] border border-zinc-800 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Spotify"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 hover:text-[#F79192] border border-zinc-800 transition-colors"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-zinc-200 font-bold block mb-4">
              Navigation
            </span>
            <ul className="space-y-3 text-sm font-mono text-zinc-300">
              <li>
                <Link href="/#tour" className="hover:text-[#F79192] transition-colors">
                  4K Studio Walkthrough
                </Link>
              </li>
              <li>
                <Link href="/products-services" className="hover:text-[#F79192] transition-colors">
                  Products & Services (130+ Directory)
                </Link>
              </li>
              <li>
                <Link href="/jukebox" className="hover:text-[#F79192] transition-colors">
                  3D Fan Carousel Jukebox
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-[#F79192] transition-colors">
                  Featured Music Videos (5FEET4)
                </Link>
              </li>
              <li>
                <Link href="/spaces" className="hover:text-[#F79192] transition-colors">
                  Studio Spaces & Acoustic Gear
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F79192] transition-colors">
                  Bento Booking Dock
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Contact Info */}
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-zinc-200 font-bold block mb-4">
              Coordinates & Direct
            </span>
            <div className="space-y-2.5 text-sm font-mono">
              <p className="text-[#F79192] font-semibold">{STUDIO_COORDINATES}</p>
              <p className="text-zinc-200">Shapoorji, Action Area III</p>
              <p className="text-zinc-400">New Town, Kolkata 700135</p>
              <p className="text-zinc-400 pt-2">Phone: {STUDIO_PHONE}</p>
              <p className="text-zinc-400">Email: {STUDIO_EMAIL}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} Koral Records. Built for Kolkata's independent sound creators.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center gap-2 text-zinc-300 hover:text-[#F79192] transition-colors font-bold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
