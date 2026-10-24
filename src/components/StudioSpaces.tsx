"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2, X } from "lucide-react";

interface StudioSpace {
  id: string;
  code: string;
  title: string;
  category: string;
  imageSrc: string;
  description: string;
  specs: { label: string; value: string }[];
}

const SPACES: StudioSpace[] = [
  {
    id: "space-1",
    code: "ZONE_01",
    title: "VOCAL SUITE",
    category: "ACOUSTIC ISOLATION",
    imageSrc: "/images/vocal-booth.jpg",
    description:
      "Treated with 360-degree high-density open-cell acoustic pyramid foam and corner bass traps. Delivers an uncolored, dry vocal capture with zero standing waves and pinpoint transient clarity.",
    specs: [
      { label: "PRIMARY TRANSDUCER", value: "Neumann U87 Ai / Shure SM7B" },
      { label: "DAMPENING", value: "360° Pyramid Foam • Zero Room Flutter" },
      { label: "NOISE FLOOR", value: "< -78 dB RMS (Decoupled Floor)" },
      { label: "SIGNAL CHAIN", value: "Custom Pop Array • Kaotica Eyeball" },
    ],
  },
  {
    id: "space-2",
    code: "ZONE_02",
    title: "CONTROL DESK",
    category: "MONITORING & DSP",
    imageSrc: "/images/producer-desk.jpg",
    description:
      "Precision listening sweet spot calibrated for flat frequency response down to 38Hz. Built for arrangement flow, vocal pitch alignment, stem mixing, and final commercial mastering.",
    specs: [
      { label: "NEARFIELD MONITORS", value: "Active Nearfield Pairs (Yamaha HS8)" },
      { label: "DSP INTERFACE", value: "Universal Audio Apollo x8p Heritage" },
      { label: "CONVERTERS", value: "24-bit / 192 kHz Precision Audio" },
      { label: "WORKFLOW ARRAY", value: "Dual Ultrawide 4K Displays" },
    ],
  },
  {
    id: "space-3",
    code: "ZONE_03",
    title: "LIVE TRACKING",
    category: "ANALOG RIG & PERCUSSION",
    imageSrc: "/images/studio-lounge.jpg",
    description:
      "Creative artist den equipped with wall-mounted electric and bass guitars, handcrafted authentic Indian percussion (Tabla & Dholak), and low-lux ambient tube lighting.",
    specs: [
      { label: "STRING ARSENAL", value: "Fender Stratocaster • Ibanez Bass" },
      { label: "INDIAN PERCUSSION", value: "Authentic Indian Tabla & Tuned Dholak" },
      { label: "DIRECT INJECTION", value: "Radial Engineering J48 DI Boxes" },
      { label: "ATMOSPHERE", value: "Warm Tube Glow • Studio Beanbag" },
    ],
  },
];

const STUDIO_PHONE = "+919876543210";

export default function StudioSpaces() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="spaces"
      className="relative bg-[#080808] border-b border-zinc-800/80"
    >
      <div className="w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79192] shadow-[0_0_10px_rgba(247,145,146,0.8)]" />
              <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-zinc-300 font-semibold">
                SECTION 03 • SPACES & GEAR ARCHIVE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne uppercase tracking-tight text-white mb-3">
              STUDIO SPACES
            </h2>
          </div>

          <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 max-w-md">
            [ ARCHITECTURAL ACOUSTIC ZONES • NEW TOWN AA-III ]
          </div>
        </div>

        {/* Alternating Two-Column Editorial Grid for Each Zone */}
        <div>
          {SPACES.map((space, index) => {
            const isZone2 = index === 1; // Invert Zone 2

            const whatsappMessage = encodeURIComponent(
              `Hey Koral Records, I'd like to book a session for ${space.title} (${space.code})!`
            );
            const whatsappUrl = `https://wa.me/${STUDIO_PHONE.replace(
              /\D/g,
              ""
            )}?text=${whatsappMessage}`;

            return (
              <div
                key={space.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-zinc-800/80 py-16 last:border-b-0"
              >
                {/* 1. Image Column (lg:col-span-7) */}
                <div
                  className={`w-full lg:col-span-7 ${
                    isZone2 ? "order-1 lg:order-2" : "order-1"
                  }`}
                >
                  <div className="aspect-[16/10] relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl group">
                    {/* Natural Full-Color Photograph (Zero Washed Out / Grayscale Filters) */}
                    <Image
                      src={space.imageSrc}
                      alt={space.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index === 0}
                    />

                    {/* Subtle Dark Edge Vignette for Framing */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top-Left Corner Tag: [ ZONE_0X ] */}
                    <div className="absolute top-4 left-4 z-10 font-mono text-xs sm:text-sm uppercase tracking-wider bg-black/90 backdrop-blur-md px-3.5 py-1.5 border border-zinc-700 text-zinc-200 rounded-md shadow-md font-bold">
                      [ {space.code} ]
                    </div>

                    {/* Top-Right Category Badge */}
                    <div className="absolute top-4 right-4 z-10 font-mono text-xs sm:text-sm uppercase tracking-wider bg-black/90 backdrop-blur-md px-3.5 py-1.5 border border-zinc-700 text-[#F79192] rounded-md hidden sm:block font-bold">
                      {space.category}
                    </div>

                    {/* Bottom-Right Corner Tag: [ 22.57° N, 88.48° E ] */}
                    <div className="absolute bottom-4 right-4 z-10 font-mono text-xs sm:text-sm uppercase tracking-wider bg-black/90 backdrop-blur-md px-3.5 py-1.5 border border-zinc-700 text-zinc-300 rounded-md shadow-md font-semibold">
                      [ 22.57° N, 88.48° E ]
                    </div>

                    {/* Lightbox Zoom Action Button */}
                    <button
                      onClick={() => setSelectedImage(space.imageSrc)}
                      aria-label={`Enlarge photo of ${space.title}`}
                      className="absolute bottom-4 left-4 z-10 p-2.5 rounded-md bg-black/90 hover:bg-[#F79192] hover:text-[#0C1014] text-zinc-200 border border-zinc-700 transition-colors shadow-md"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 2. Detail Column (lg:col-span-5) with Clean Swiss Spec Rows */}
                <div
                  className={`w-full lg:col-span-5 flex flex-col justify-center ${
                    isZone2 ? "order-2 lg:order-1" : "order-2"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F79192] shadow-[0_0_8px_rgba(247,145,146,0.8)]" />
                    <span className="font-mono text-sm uppercase tracking-widest text-[#F79192] font-bold">
                      [ {space.category} ]
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-black font-syne uppercase tracking-tight text-white mb-4">
                    {space.title}
                  </h3>

                  <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed mb-8">
                    {space.description}
                  </p>

                  {/* Clean Swiss Hardware & Acoustic Spec Table */}
                  <div className="border-t border-zinc-800 mb-8">
                    {space.specs.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-4 border-b border-zinc-800/80 text-sm sm:text-base font-mono"
                      >
                        <span className="text-zinc-400 uppercase tracking-wider pr-4 font-medium">
                          {item.label}
                        </span>
                        <span className="text-white font-bold text-right">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA: Amber Text Button linking to WhatsApp */}
                  <div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-sm sm:text-base uppercase tracking-wider font-extrabold transition-all shadow-[0_0_30px_rgba(247,145,146,0.35)] hover:scale-105 active:scale-95"
                    >
                      <span>[ BOOK THIS SETUP → ]</span>
                      <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-700 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Studio view enlarged"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/80 text-white hover:text-[#F79192] border border-zinc-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
