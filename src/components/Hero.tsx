"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const WHATSAPP_URL =
    "https://wa.me/919876543210?text=Hey%20Koral%20Records,%20I%20want%20to%20book%20a%20session!";

  return (
    <section className="relative min-h-screen pt-24 sm:pt-28 lg:pt-32 bg-[#09090b] flex flex-col justify-between border-b border-zinc-800 overflow-hidden">
      {/* Koral Rose / Coral Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#F79192]/15 via-rose-500/10 to-transparent blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#F79192]/5 blur-[120px] pointer-events-none -z-0" />

      {/* Screen-Filling Display Typography in Full-Bleed Grid */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-16 my-auto z-10">
        <h1 className="font-syne font-bold text-[14vw] sm:text-[13vw] lg:text-[11.5vw] uppercase leading-[0.85] tracking-[-0.05em] select-none">
          <span className="block border-b border-zinc-800/80 pb-3 sm:pb-5 text-zinc-50">
            RAW TRACKING.
          </span>
          <span className="block pt-3 sm:pt-5 bg-gradient-to-r from-[#F79192] via-[#FFA4A5] to-rose-400 bg-clip-text text-transparent">
            PERFECT SOUND.
          </span>
        </h1>
      </div>

      {/* Sub-Grid Split: Editorial Manifesto vs Brutalist Action Blocks */}
      <div className="w-full border-t border-zinc-800 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800 z-10">
        {/* Left Column: Monospace Editorial Manifesto */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <span className="font-mono text-sm uppercase tracking-widest text-[#F79192] mb-4 block font-bold">
            PHILOSOPHY 01
          </span>
          <p className="font-mono text-sm sm:text-base lg:text-lg uppercase tracking-wider text-zinc-200 leading-relaxed max-w-3xl font-medium">
            A PRIVATE ACOUSTIC LAB IN SHAPOORJI, NEW TOWN. ZERO COMPROMISE
            TRACKING AND ANALOG MIXING FOR ARTISTS WHO CARE ABOUT TEXTURE.
          </p>
        </div>

        {/* Right Column: Tactile Brutalist Action Blocks */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 divide-y sm:divide-y-0 sm:divide-x lg:divide-x-0 lg:divide-y divide-zinc-800">
          <Link
            href="/tour"
            className="group p-6 sm:p-10 bg-zinc-950/60 hover:bg-zinc-900 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-2 font-semibold">
                ACTION 01
              </span>
              <span className="font-mono text-sm sm:text-base lg:text-lg font-extrabold uppercase tracking-widest text-white group-hover:text-[#F79192] transition-colors">
                [ ENTER 4K TOUR → ]
              </span>
            </div>
            <ArrowUpRight className="w-6 h-6 text-zinc-400 group-hover:text-[#F79192] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 sm:p-10 bg-zinc-950/60 hover:bg-[#F79192] transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-mono text-xs group-hover:text-[#0C1014] uppercase tracking-widest text-zinc-400 block mb-2 font-semibold">
                ACTION 02
              </span>
              <span className="font-mono text-sm sm:text-base lg:text-lg font-extrabold uppercase tracking-widest text-white group-hover:text-[#0C1014] transition-colors">
                [ BOOK DESK VIA WHATSAPP → ]
              </span>
            </div>
            <ArrowUpRight className="w-6 h-6 text-zinc-400 group-hover:text-[#0C1014] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
