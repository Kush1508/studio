"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Play,
  Disc3,
  Sliders,
  Sparkles,
  Phone,
  Mic2,
  Headphones,
  GraduationCap,
  Music,
} from "lucide-react";
import { STUDIO_PHONE, STUDIO_LOCATION } from "./ContactSection";

export default function HomeHighlights() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="w-full bg-[#080808] text-[#ededed]">
      {/* -------------------------------------------------------------
          HIGHLIGHT 01: FEATURED VIDEO SPOTLIGHT (5FEET4)
      -------------------------------------------------------------- */}
      <section className="relative border-b border-zinc-800/80 py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden">
        <div className="w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-10 border-b border-zinc-800 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F79192] shadow-[0_0_10px_rgba(247,145,146,0.8)]" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-300 font-semibold">
                  EXPERIENCE 01 • OFFICIAL RELEASE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne uppercase tracking-tight text-white">
                FEATURED MUSIC VIDEO
              </h2>
            </div>

            <Link
              href="/videos"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#F79192] hover:text-white font-bold uppercase tracking-wider transition-colors"
            >
              <span>[ VIEW ALL FEATURED VIDEOS ]</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Video Spotlight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 shadow-2xl">
            {/* Left: Player / Poster */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-zinc-800">
                {isVideoPlaying ? (
                  <iframe
                    src="https://www.youtube.com/embed/rC_iqp61K-E?autoplay=1&rel=0&modestbranding=1"
                    title="5FEET4 | Official Music Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer group/vid"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <Image
                      src="https://i.ytimg.com/vi/rC_iqp61K-E/maxresdefault.jpg"
                      alt="5FEET4 Official Music Video"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover group-hover/vid:scale-105 transition-transform duration-700 brightness-90"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/vid:bg-black/20 transition-colors pointer-events-none" />

                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F79192] group-hover/vid:bg-[#FFA4A5] text-[#0C1014] flex items-center justify-center shadow-[0_0_30px_rgba(247,145,146,0.6)] transition-all group-hover/vid:scale-110">
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 font-mono text-xs uppercase tracking-wider text-white font-bold">
                        4K UHD • 03:24
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Metadata & Navigation */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#F79192] font-bold block mb-2">
                  DESI HIP-HOP • TRAP
                </span>
                <h3 className="font-syne font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mb-2">
                  5FEET4
                </h3>
                <p className="font-mono text-base text-zinc-300 font-semibold mb-4">
                  ASHESH FT. IYOU & ROUPE
                </p>
                <p className="font-mono text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
                  Recorded and engineered live inside Koral's acoustic isolation facility in New Town, Kolkata. Uncompromising vocal presence and analog bottom-end punch.
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs sm:text-sm font-bold">
                <Link
                  href="/videos"
                  className="px-6 py-3.5 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] uppercase tracking-wider text-center transition-all shadow-[0_0_20px_rgba(247,145,146,0.3)] hover:scale-105"
                >
                  [ OPEN CINEMA THEATER → ]
                </Link>
                <a
                  href="https://youtu.be/rC_iqp61K-E?si=ko8uzwh2QB80ihyw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 uppercase tracking-wider text-center transition-colors"
                >
                  YOUTUBE ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          HIGHLIGHT 02: DUAL HUB — 3D JUKEBOX & ACOUSTIC SPACES
      -------------------------------------------------------------- */}
      <section className="relative border-b border-zinc-800/80 py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box A: 3D Jukebox Preview */}
            <div className="group rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-10 flex flex-col justify-between hover:border-[#F79192]/50 transition-all duration-300 hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F79192] font-bold">
                    EXPERIENCE 02
                  </span>
                  <Disc3 className="w-5 h-5 text-[#F79192] group-hover:rotate-180 transition-transform duration-700" />
                </div>

                <h3 className="font-syne font-black text-3xl sm:text-4xl uppercase text-white mb-3">
                  3D AUDIO JUKEBOX
                </h3>
                <p className="font-mono text-sm text-zinc-400 leading-relaxed font-medium mb-6">
                  Audition 5 master stems across Hip-Hop, Yaman Fusion, Bengali Indie, and R&B. Interactive 3D carousel with real-time waveform monitoring.
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-900">
                <Link
                  href="/jukebox"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider group-hover:bg-[#F79192] group-hover:text-[#0C1014] transition-all shadow-lg group-hover:scale-105"
                >
                  <span>[ AUDITION 3D JUKEBOX → ]</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Box B: Studio Spaces & Gear Preview */}
            <div className="group rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-10 flex flex-col justify-between hover:border-[#F79192]/50 transition-all duration-300 hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F79192] font-bold">
                    EXPERIENCE 03
                  </span>
                  <Sliders className="w-5 h-5 text-[#F79192]" />
                </div>

                <h3 className="font-syne font-black text-3xl sm:text-4xl uppercase text-white mb-3">
                  STUDIO SPACES & RIGS
                </h3>
                <p className="font-mono text-sm text-zinc-400 leading-relaxed font-medium mb-6">
                  Vocal Isolation Suite, Production Control Sweet Spot, and Live Indian Percussion Rig. Calibrated for pristine tracking and commercial mastering.
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-900">
                <Link
                  href="/spaces"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider group-hover:bg-[#F79192] group-hover:text-[#0C1014] transition-all shadow-lg group-hover:scale-105"
                >
                  <span>[ EXPLORE SPACES & SPECS → ]</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          HIGHLIGHT 03: PRODUCTS & SERVICES DIRECTORY SHOWCASE
      -------------------------------------------------------------- */}
      <section className="relative border-b border-zinc-800/80 py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden">
        <div className="w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-10 border-b border-zinc-800 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F79192] shadow-[0_0_10px_rgba(247,145,146,0.8)]" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-300 font-semibold">
                  EXPERIENCE 04 • COMPREHENSIVE STUDIO DIRECTORY
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne uppercase tracking-tight text-white">
                PRODUCTS & SERVICES
              </h2>
            </div>

            <Link
              href="/products-services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#F79192] hover:text-white font-bold uppercase tracking-wider transition-colors"
            >
              <span>[ VIEW ALL 130+ SERVICES CATALOG ]</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Department Bento Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Dept 01: Recording */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between hover:border-[#F79192]/60 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[#F79192]">
                    <Mic2 className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 font-bold uppercase">
                    31 SERVICES
                  </span>
                </div>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#F79192] transition-colors mb-2">
                  RECORDING & TRACKING
                </h3>
                <p className="font-mono text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                  Dedicated vocal booth, multi-track live bands, broadcast dubbing, voiceover, and full album lockouts.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-900 font-mono text-xs text-[#F79192] font-semibold flex items-center justify-between">
                <span>Vocal • Band • VO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Dept 02: Mixing & Mastering */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between hover:border-[#F79192]/60 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[#F79192]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 font-bold uppercase">
                    14 SERVICES
                  </span>
                </div>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#F79192] transition-colors mb-2">
                  MIXING & MASTERING
                </h3>
                <p className="font-mono text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                  Analog stem summing, release-ready digital loudness, audio restoration, and streaming master exports.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-900 font-mono text-xs text-[#F79192] font-semibold flex items-center justify-between">
                <span>Stems • Loudness • EQ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Dept 03: Production */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between hover:border-[#F79192]/60 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[#F79192]">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 font-bold uppercase">
                    23 SERVICES
                  </span>
                </div>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#F79192] transition-colors mb-2">
                  PRODUCTION & SOUND DESIGN
                </h3>
                <p className="font-mono text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                  Commercial jingle production, custom beat craft, acoustic arrangements, and full-length soundtrack suites.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-900 font-mono text-xs text-[#F79192] font-semibold flex items-center justify-between">
                <span>Jingles • Beats • OST</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Dept 04: Academy */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between hover:border-[#F79192]/60 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[#F79192]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 font-bold uppercase">
                    65 SERVICES
                  </span>
                </div>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#F79192] transition-colors mb-2">
                  ACADEMY & LESSONS
                </h3>
                <p className="font-mono text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                  Singing studio coaching, piano mastery, guitar lessons, and adult courses in real studio environments.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-900 font-mono text-xs text-[#F79192] font-semibold flex items-center justify-between">
                <span>Vocal • Piano • Guitar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Quick Hub Navigation Strip */}
          <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs sm:text-sm text-zinc-400">
              <span className="text-white font-bold">133 Total Services Cataloged.</span> Instant enquiry dispatch via WhatsApp directly to our studio coordinator.
            </div>
            <Link
              href="/products-services"
              className="px-6 py-3 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(247,145,146,0.3)] hover:scale-105 whitespace-nowrap inline-flex items-center gap-2"
            >
              <span>[ OPEN FULL SERVICES DIRECTORY → ]</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          HIGHLIGHT 04: DIRECT BOOKING ACTION DOCK
      -------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 px-6 sm:px-10 lg:px-14 xl:px-16 bg-[#040404]">
        <div className="w-full rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl">
          <div>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#F79192] font-bold block mb-2">
              SESSION DISPATCH • SHAPOORJI, NEW TOWN
            </span>
            <h3 className="font-syne font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mb-3">
              READY TO RECORD?
            </h3>
            <p className="font-mono text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Vocal tracking, full-day album lockouts, and analog stem mixing. Talk directly with our chief engineer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0 font-mono text-xs sm:text-sm font-extrabold">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] uppercase tracking-wider text-center transition-all shadow-[0_0_30px_rgba(247,145,146,0.35)] hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <span>[ BOOK A SESSION NOW ]</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </Link>

            <a
              href={`https://wa.me/${STUDIO_PHONE.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 uppercase tracking-wider text-center transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F79192]" />
              <span>WHATSAPP DISPATCH</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
