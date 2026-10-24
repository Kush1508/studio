"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  MessageSquare,
  Phone,
  Sliders,
  Sparkles,
  ArrowUpRight,
  Mic2,
  Music,
  Headphones,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/servicesData";
import { STUDIO_PHONE, STUDIO_LOCATION } from "./ContactSection";

const CATEGORIES = [
  "ALL SERVICES",
  "RECORDING & TRACKING",
  "MIXING & MASTERING",
  "PRODUCTION & SOUND DESIGN",
  "ACADEMY & LESSONS",
] as const;

export default function ProductsServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL SERVICES");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Filter services based on category and search query
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "ALL SERVICES" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "ALL SERVICES": SERVICES_DATA.length,
    };
    SERVICES_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "RECORDING & TRACKING":
        return <Mic2 className="w-4 h-4 text-[#F79192]" />;
      case "MIXING & MASTERING":
        return <Sliders className="w-4 h-4 text-[#F79192]" />;
      case "PRODUCTION & SOUND DESIGN":
        return <Headphones className="w-4 h-4 text-[#F79192]" />;
      case "ACADEMY & LESSONS":
        return <GraduationCap className="w-4 h-4 text-[#F79192]" />;
      default:
        return <Music className="w-4 h-4 text-[#F79192]" />;
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-14 xl:px-16 text-[#ededed]">
      {/* 1. Header Bar with Brand Telemetry */}
      <div className="w-full pb-10 border-b border-zinc-800">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79192] shadow-[0_0_10px_rgba(247,145,146,0.8)]" />
              <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#F79192] font-bold">
                OFFICIAL SERVICE CATALOG • 130+ MASTER CAPABILITIES
              </span>
            </div>
            <h1 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-3">
              PRODUCTS & SERVICES
            </h1>
            <p className="font-mono text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Explore professional recording, vocal production, stem mixing, analogue mastering,
              and private music academy training at Koral Records Kolkata.
            </p>
          </div>

          {/* Studio Quick Dispatch Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 font-mono text-xs">
            <div className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300">
              <span className="text-zinc-500 block text-[11px] uppercase">Operational Hub</span>
              <span className="font-bold text-white">24/7 OPEN • SHAPOORJI, NEW TOWN</span>
            </div>
            <a
              href={`tel:${STUDIO_PHONE.replace(/\D/g, "")}`}
              className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F79192]" />
              <span>{STUDIO_PHONE}</span>
            </a>
          </div>
        </div>

        {/* 2. Interactive Search & Category Filter Navigation */}
        <div className="mt-10 space-y-5">
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              placeholder="Search audio recording, guitar, mixing, dubbing, singing..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-[#F79192] focus:outline-none font-mono text-xs sm:text-sm text-white placeholder-zinc-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(24);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? "bg-[#F79192] text-[#0C1014] border-[#F79192] shadow-[0_0_15px_rgba(247,145,146,0.3)] scale-[1.02]"
                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`ml-2 text-[11px] px-1.5 py-0.5 rounded-md ${
                      isActive ? "bg-black/20 text-[#0C1014]" : "bg-zinc-900 text-zinc-500"
                    }`}
                  >
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Catalog Grid Results */}
      <div className="w-full pt-10">
        <div className="flex items-center justify-between mb-8 font-mono text-xs text-zinc-400">
          <span>
            SHOWING <strong className="text-white">{Math.min(visibleCount, filteredServices.length)}</strong> OF{" "}
            <strong className="text-white">{filteredServices.length}</strong> RESULTS
            {searchQuery && ` FOR "${searchQuery}"`}
          </span>

          <span className="text-[#F79192] font-semibold hidden sm:inline-block">
            DIRECT WHATSAPP DISPATCH READY
          </span>
        </div>

        {filteredServices.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-zinc-800 bg-zinc-950">
            <Music className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
            <h3 className="font-syne font-bold text-xl text-white uppercase mb-2">
              No matching services found
            </h3>
            <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
              We offer bespoke audio engineering, songwriting, and tracking tailored to your project.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("ALL SERVICES");
              }}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase border border-zinc-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.slice(0, visibleCount).map((service) => {
              const whatsappUrl = `https://wa.me/9147733581?text=${encodeURIComponent(
                `I want to know more about ${service.title}`
              )}`;

              return (
                <div
                  key={`${service.id}-${service.title}`}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-zinc-850 bg-zinc-950/80 hover:bg-zinc-950 hover:border-[#F79192]/60 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(247,145,146,0.12)]"
                >
                  <div>
                    {/* Header: Category Badge & ID */}
                    <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-900">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(service.category)}
                        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                          {service.category}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-zinc-600 font-bold">
                        #{service.id.toString().padStart(3, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-syne font-bold text-xl sm:text-2xl text-white group-hover:text-[#F79192] transition-colors mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="font-mono text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal mb-6">
                      {service.desc}
                    </p>
                  </div>

                  {/* Actions Dock */}
                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(247,145,146,0.25)] hover:scale-[1.02]"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>ENQUIRE</span>
                    </a>

                    <a
                      href={`tel:${STUDIO_PHONE.replace(/\D/g, "")}`}
                      className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                      title="Direct Studio Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredServices.length && (
          <div className="pt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 30, filteredServices.length))}
              className="px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border border-zinc-700 hover:border-[#F79192] transition-all shadow-xl hover:scale-105 inline-flex items-center gap-3"
            >
              <span>SHOW MORE SERVICES ({filteredServices.length - visibleCount} REMAINING)</span>
              <ArrowUpRight className="w-4 h-4 text-[#F79192]" />
            </button>
          </div>
        )}
      </div>

      {/* 4. Full-Suite Booking Banner */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-[#0d090a] to-zinc-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#F79192] font-bold block mb-2">
            TAILORED AUDIO PRODUCTION PACKAGES
          </span>
          <h2 className="font-syne font-black text-2xl sm:text-4xl uppercase text-white mb-2">
            NEED A CUSTOM TRACKING OR ALBUM DEAL?
          </h2>
          <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            From single vocal takes to full album lockouts with analog outboard processing.
            Discuss your artistic vision with our studio engineers directly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs font-bold w-full sm:w-auto">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] uppercase tracking-wider text-center transition-all shadow-[0_0_20px_rgba(247,145,146,0.3)] hover:scale-105"
          >
            [ BOOK A STUDIO VISIT ]
          </Link>
          <a
            href="https://wa.me/9147733581?text=Hi+there!+I+want+to+enquire+about+a+custom+studio+package+at+Koral+Records."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 uppercase tracking-wider text-center transition-colors"
          >
            WHATSAPP US
          </a>
        </div>
      </div>
    </section>
  );
}
