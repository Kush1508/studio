"use client";

import React, { useState } from "react";
import { ArrowUpRight, MessageSquare, Phone, Send, Check } from "lucide-react";

export const STUDIO_PHONE = "+919876543210";
export const STUDIO_EMAIL = "contact@koralstudios.com";
export const STUDIO_LOCATION = "Shapoorji Palmgrove, Action Area III, New Town, Kolkata";
export const STUDIO_COORDINATES = "22.57° N, 88.48° E";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    duration: "4 HOURS • HALF LOCKOUT",
    stemsLink: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const cleanPhone = STUDIO_PHONE.replace(/\D/g, "");
    const msg = `Hey Koral Records, I want to book a session!%0A%0A*Artist:* ${encodeURIComponent(
      formData.name
    )}%0A*Duration:* ${encodeURIComponent(
      formData.duration
    )}%0A*Stems Link:* ${encodeURIComponent(
      formData.stemsLink || "None"
    )}%0A*Notes:* ${encodeURIComponent(formData.notes || "None")}`;

    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  const whatsappDirectUrl = `https://wa.me/${STUDIO_PHONE.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(
    "Hey Koral Records, I want to check session availability and book studio time!"
  )}`;

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-14 xl:px-16 bg-[#080808]"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 sm:mb-16 border-b border-zinc-800 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-zinc-300 font-semibold">
                SECTION 04 • BOOKING & DISPATCH DOCK
              </span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-[-0.04em] leading-[0.9]">
              LOCK A SESSION
            </h2>
          </div>

          <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 max-w-md">
            [ DIRECT DESK ACCESS • ZERO MIDDLEMEN • INSTANT CONFIRMATION ]
          </div>
        </div>

        {/* 3-Column Bento Grid Booking Dock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: WhatsApp Instant Slot Confirmation */}
          <div className="bg-zinc-950 rounded-2xl p-8 sm:p-10 border border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 hover:shadow-[0_0_50px_rgba(16,185,129,0.18)] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 mb-6 pb-3 border-b border-zinc-800">
                <span className="font-bold text-zinc-300">[ BLOCK_01 ]</span>
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  FASTEST_DISPATCH
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>

              <h3 className="font-syne font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-white tracking-tight mb-4">
                WHATSAPP DIRECT
              </h3>

              <p className="font-mono text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                Direct 1-on-1 link to tracking engineer. Pre-filled session brief and calendar slot confirmation in under 2 minutes.
              </p>
            </div>

            <div className="pt-8 border-t border-zinc-800">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-sm sm:text-base uppercase tracking-wider font-extrabold transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
              >
                <span>[ LAUNCH CHAT → ]</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Card 2: Phone Dispatch Direct */}
          <div className="bg-zinc-950 rounded-2xl p-8 sm:p-10 border border-[#F79192]/40 hover:border-[#F79192] transition-all duration-300 hover:shadow-[0_0_50px_rgba(247,145,146,0.22)] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 mb-6 pb-3 border-b border-zinc-800">
                <span className="font-bold text-zinc-300">[ BLOCK_02 ]</span>
                <span className="text-[#F79192] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F79192] shadow-[0_0_8px_rgba(247,145,146,0.8)]" />
                  VOICE_CHANNEL
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#F79192]/15 border border-[#F79192]/40 flex items-center justify-center text-[#F79192] mb-6">
                <Phone className="w-6 h-6" />
              </div>

              <h3 className="font-syne font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-white tracking-tight mb-4">
                PHONE DISPATCH
              </h3>

              <p className="font-mono text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                Direct voice call to studio manager for emergency stem deliveries, lockout rates, and same-day lockouts: <span className="text-[#F79192] font-bold block mt-1">{STUDIO_PHONE}</span>
              </p>
            </div>

            <div className="pt-8 border-t border-zinc-800">
              <a
                href={`tel:${STUDIO_PHONE}`}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-sm sm:text-base uppercase tracking-wider font-extrabold transition-all shadow-[0_0_25px_rgba(247,145,146,0.35)] hover:scale-[1.02]"
              >
                <span>[ DIAL NOW → ]</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Card 3: Session Inquiry & Stems Upload */}
          <div className="bg-zinc-950 rounded-2xl p-8 sm:p-10 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 mb-6 pb-3 border-b border-zinc-800">
                <span className="font-bold text-zinc-300">[ BLOCK_03 ]</span>
                <span className="text-zinc-300 font-bold flex items-center gap-2">
                  <Send className="w-4 h-4 text-zinc-300" />
                  DESK_FORM
                </span>
              </div>

              <h3 className="font-syne font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-white tracking-tight mb-4">
                SESSION INQUIRY
              </h3>

              {submitted ? (
                <div className="p-6 border border-zinc-800 bg-[#080808] rounded-xl font-mono text-sm uppercase tracking-wider text-center">
                  <span className="text-[#F79192] font-bold block mb-3 flex items-center justify-center gap-2 text-base">
                    <Check className="w-5 h-5 text-emerald-400" />
                    [ DISPATCH_COMPILED ]
                  </span>
                  <p className="text-zinc-300 mb-4 text-sm leading-relaxed">
                    DETAILS LOADED TO WHATSAPP DESK. FINISH SENDING TO LOCK SLOT.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-200 hover:text-white hover:border-zinc-500 text-sm font-bold transition-colors"
                  >
                    [ NEW INQUIRY ]
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
                  <div>
                    <label className="text-xs sm:text-sm uppercase text-zinc-300 font-bold block mb-1.5 tracking-wider">
                      ARTIST / ENSEMBLE *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="SUBHO DEEP"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#080808] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F79192] text-sm sm:text-base transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm uppercase text-zinc-300 font-bold block mb-1.5 tracking-wider">
                      SESSION DURATION
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="w-full bg-[#080808] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F79192] text-sm sm:text-base transition-colors"
                    >
                      <option>2 HOURS • VOCAL CAPTURE</option>
                      <option>4 HOURS • HALF LOCKOUT</option>
                      <option>8 HOURS • FULL DAY LOCKOUT</option>
                      <option>MULTI-DAY • ALBUM TRACKING</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm uppercase text-zinc-300 font-bold block mb-1.5 tracking-wider">
                      STEMS / REFERENCE LINK
                    </label>
                    <input
                      type="text"
                      placeholder="WETRANSFER / DRIVE LINK"
                      value={formData.stemsLink}
                      onChange={(e) =>
                        setFormData({ ...formData, stemsLink: e.target.value })
                      }
                      className="w-full bg-[#080808] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F79192] text-sm sm:text-base transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-4 rounded-xl bg-white hover:bg-[#F79192] hover:text-[#0C1014] text-black font-extrabold uppercase tracking-widest transition-all text-sm sm:text-base hover:scale-[1.02]"
                  >
                    [ TRANSMIT BRIEF → ]
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ASCII-Style Technical Metadata Footer */}
        <div className="border-t border-zinc-800 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400">
          <div>
            <span className="text-zinc-200 font-bold block text-sm">
              © {new Date().getFullYear()} KORAL RECORDS
            </span>
            <span className="block mt-1 text-zinc-400">
              ALL RIGHTS RESERVED • INDEPENDENT AUDIO ARCHIVE
            </span>
          </div>

          <div>
            <span className="text-zinc-200 font-bold block text-sm">
              [ LOC: {STUDIO_COORDINATES} • SHAPOORJI AA-III ]
            </span>
            <span className="block mt-1 text-zinc-400">
              NEW TOWN, KOLKATA 700135 • SUKHOBRISHTI SECTOR
            </span>
          </div>

          <div className="sm:text-right">
            <span className="text-zinc-200 font-bold block text-sm">
              [ HOURS: 10:00 - 23:00 IST ]
            </span>
            <span className="block mt-1 text-zinc-400">
              OVERNIGHT & 24H LOCKOUT ON PRIOR CONFIRMATION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
