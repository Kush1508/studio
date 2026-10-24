"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useStudioAudio, SAMPLE_TRACKS } from "@/context/AudioContext";

const TRACK_KEYS: Record<string, string> = {
  "track-1": "D MINOR",
  "track-2": "E MAJOR",
  "track-3": "G MAJOR",
  "track-4": "F# MINOR",
  "track-5": "A MINOR",
};

export default function CardFanCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const {
    activeTrackId,
    isJukeboxPlaying,
    toggleTrack,
    jukeboxProgress,
    jukeboxCurrentTime,
  } = useStudioAudio();

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SAMPLE_TRACKS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < SAMPLE_TRACKS.length - 1 ? prev + 1 : 0));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section
      id="jukebox"
      className="relative bg-[#080808] border-b border-zinc-800/80 overflow-hidden"
    >
      <div className="w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79192] shadow-[0_0_10px_rgba(247,145,146,0.8)]" />
              <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-zinc-300 font-semibold">
                SECTION 02 • AUDIO_ARCHIVE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne uppercase tracking-tight text-white mb-3">
              STUDIO JUKEBOX
            </h2>
          </div>

          <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 max-w-md">
            [ MULTI-TRACK MONITORING • DIRECT FROM CONTROL DESK ]
          </div>
        </div>

        {/* 3D Fanned Carousel Stage */}
        <div
          className="relative w-full h-[540px] sm:h-[600px] flex items-center justify-center select-none"
          style={{ perspective: "1200px" }}
        >
          {SAMPLE_TRACKS.map((track, index) => {
            const diff = index - activeIndex;
            const isCenter = diff === 0;
            const isPlayingThis = activeTrackId === track.id && isJukeboxPlaying;
            const trkNumber = `TRK_${String(index + 1).padStart(2, "0")}`;
            const keySig = TRACK_KEYS[track.id] || "D MINOR";

            let rotateY = 0;
            let scale = 1.05;
            let translateZ = 50;
            let translateX = 0;
            let opacity = 1;
            let zIndex = 30;

            if (diff === -1) {
              rotateY = 18;
              scale = 0.92;
              translateZ = -60;
              translateX = -280;
              opacity = 0.4;
              zIndex = 20;
            } else if (diff === 1) {
              rotateY = -18;
              scale = 0.92;
              translateZ = -60;
              translateX = 280;
              opacity = 0.4;
              zIndex = 20;
            } else if (diff <= -2) {
              rotateY = 24;
              scale = 0.82;
              translateZ = -140;
              translateX = -480;
              opacity = Math.abs(diff) > 2 ? 0 : 0.2;
              zIndex = 10;
            } else if (diff >= 2) {
              rotateY = -24;
              scale = 0.82;
              translateZ = -140;
              translateX = 480;
              opacity = Math.abs(diff) > 2 ? 0 : 0.2;
              zIndex = 10;
            }

            return (
              <motion.div
                key={track.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: translateX,
                  y: isCenter ? -10 : 15,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                whileHover={
                  !isCenter
                    ? {
                        opacity: 0.85,
                        scale: scale + 0.03,
                      }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                }}
                className={`absolute w-[320px] sm:w-[360px] h-[480px] sm:h-[520px] cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                  isCenter
                    ? "ring-1 ring-[#F79192]/80 shadow-[0_0_50px_rgba(247,145,146,0.3)] border border-[#F79192]/60"
                    : "border border-zinc-800/90 shadow-2xl hover:border-zinc-700"
                } flex flex-col justify-between p-6 bg-zinc-950`}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
              >
                {/* Full-Bleed Album Art Background */}
                <Image
                  src={track.coverArt}
                  alt={track.title}
                  fill
                  sizes="(max-width: 640px) 320px, 360px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority={isCenter}
                />

                {/* Cinematic Gradient Scrim for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40 pointer-events-none" />

                {/* Top Architectural Track Badge */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider pb-3 border-b border-white/20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span
                    className={
                      isPlayingThis
                        ? "text-[#F79192] font-bold flex items-center gap-1.5"
                        : "text-zinc-300 font-semibold"
                    }
                  >
                    {isPlayingThis && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F79192] animate-pulse" />
                    )}
                    {trkNumber}
                  </span>
                  <span className="text-zinc-400">{track.bpm} BPM</span>
                  <span className="text-zinc-400">[{keySig}]</span>
                </div>

                {/* Center SVG Equalizer Waveform Indicator */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  {isPlayingThis && (
                    <div className="flex items-end gap-1.5 h-10 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-[#F79192]/50 shadow-xl">
                      <span className="w-1 bg-[#F79192] animate-eq-1" />
                      <span className="w-1 bg-[#F79192] animate-eq-2" />
                      <span className="w-1 bg-[#F79192] animate-eq-3" />
                      <span className="w-1 bg-[#F79192] animate-eq-4" />
                      <span className="w-1 bg-[#F79192] animate-eq-2" />
                      <span className="w-1 bg-[#F79192] animate-eq-1" />
                    </div>
                  )}
                </div>

                {/* Bottom Details & Controls Block */}
                <div className="relative z-10 pt-4 border-t border-white/20 bg-black/75 backdrop-blur-md p-5 rounded-xl border border-white/10">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F79192] font-bold block mb-1">
                    {track.genre}
                  </span>
                  <h3 className="font-syne font-black text-2xl sm:text-3xl uppercase text-white truncate tracking-tight">
                    {track.title}
                  </h3>
                  <p className="font-mono text-sm text-zinc-200 truncate mt-0.5 mb-4 font-medium">
                    {track.artist}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTrack(track.id);
                      }}
                      aria-label={isPlayingThis ? "Pause audio preview" : "Audition audio preview"}
                      className={`px-6 py-3 rounded-full font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all flex items-center gap-2.5 shadow-lg ${
                        isPlayingThis
                          ? "bg-[#F79192] text-[#0C1014] hover:bg-[#FFA4A5]"
                          : "bg-white text-black hover:bg-[#F79192] hover:text-[#0C1014]"
                      }`}
                    >
                      {isPlayingThis ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" />
                          <span>PAUSE</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>AUDITION</span>
                        </>
                      )}
                    </button>

                    <span className="font-mono text-xs sm:text-sm text-zinc-200 font-bold">
                      {isPlayingThis
                        ? `${formatTime(jukeboxCurrentTime)} / ${formatTime(
                            track.duration
                          )}`
                        : `${track.duration}S CUT`}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="mt-8 flex items-center justify-between font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 border-t border-zinc-800 pt-6">
          <button
            onClick={handlePrev}
            className="hover:text-[#F79192] flex items-center gap-2 transition-colors font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>[ PREV_TRACK ]</span>
          </button>

          <span className="hidden sm:inline text-zinc-300 font-semibold">
            TRACK [{String(activeIndex + 1).padStart(2, "0")} • {String(SAMPLE_TRACKS.length).padStart(2, "0")}]
          </span>

          <button
            onClick={handleNext}
            className="hover:text-[#F79192] flex items-center gap-2 transition-colors font-bold"
          >
            <span>[ NEXT_TRACK ]</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
