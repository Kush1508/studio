"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, ArrowUpRight, Youtube, Eye, Film } from "lucide-react";

interface VideoRelease {
  id: string;
  youtubeId: string;
  title: string;
  artist: string;
  directUrl: string;
  thumbnail: string;
  duration: string;
  releaseYear: string;
  genre: string;
  role: string;
  description: string;
  isMain?: boolean;
}

const FEATURED_VIDEOS: VideoRelease[] = [
  {
    id: "video-1",
    youtubeId: "rC_iqp61K-E",
    title: "5FEET4",
    artist: "ASHESH FT. IYOU & ROUPE",
    directUrl: "https://youtu.be/rC_iqp61K-E?si=ko8uzwh2QB80ihyw",
    thumbnail: "https://i.ytimg.com/vi/rC_iqp61K-E/maxresdefault.jpg",
    duration: "03:24",
    releaseYear: "2024",
    genre: "DESI HIP-HOP • TRAP",
    role: "RECORDED & MASTERED AT KORAL",
    description:
      "A cinematic visual spectacle capturing raw energy, uncompromising sound design, and relentless bars. Engineered and tracked live inside Koral's acoustic facility.",
    isMain: true,
  },
  {
    id: "video-2",
    youtubeId: "",
    title: "MIDNIGHT CIPHER 02",
    artist: "KORAL COLLECTIVE",
    directUrl: "https://youtube.com",
    thumbnail: "/images/analog-console-atipro.jpg",
    duration: "TEASER",
    releaseYear: "2025",
    genre: "BOOM BAP • DRILL",
    role: "POST-PRODUCTION LOCKOUT",
    description:
      "Eight Kolkata lyricists, one continuous tracking take through the Neumann U87 Ai. Official music video currently in final grading.",
    isMain: false,
  },
  {
    id: "video-3",
    youtubeId: "",
    title: "UNPLUGGED SESSIONS",
    artist: "ACOUSTIC ENSEMBLE",
    directUrl: "https://youtube.com",
    thumbnail: "/images/dual-monitors-guitars.jpg",
    duration: "COMING SOON",
    releaseYear: "2025",
    genre: "INDIE FUSION • CLASSICAL",
    role: "LIVE MULTI-TRACK CAPTURE",
    description:
      "Intimate live room performance captured with stereo ribbon arrays and handcrafted Benares tabla percussion.",
    isMain: false,
  },
];

export default function FeaturedVideos() {
  const [isPlaying, setIsPlaying] = useState(false);
  const mainVideo = FEATURED_VIDEOS[0];

  return (
    <section
      id="videos"
      className="relative bg-[#060606] border-b border-zinc-800/80 py-24 sm:py-32 overflow-hidden"
    >
      {/* Ambient Coral Lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[380px] bg-[#F79192]/8 blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[300px] bg-rose-500/5 blur-[120px] pointer-events-none -z-0" />

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 sm:mb-16 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79192] shadow-[0_0_10px_rgba(247,145,146,0.8)]" />
              <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-zinc-300 font-semibold">
                SECTION 03 • FEATURED VIDEOS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne uppercase tracking-tight text-white mb-3">
              FEATURED VIDEOS
            </h2>
          </div>

          <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 max-w-md">
            [ OFFICIAL MUSIC VIDEOS • PRODUCED & TRACKED AT KORAL RECORDS ]
          </div>
        </div>

        {/* Hero Video Showcase: 5FEET4 */}
        <div className="mb-14 sm:mb-20">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.8)] group transition-all duration-300 hover:border-zinc-700">
            {/* Aspect Ratio 16:9 Cinema Container */}
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${mainVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={mainVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  {/* High-Res Video Poster Image */}
                  <Image
                    src={mainVideo.thumbnail}
                    alt={mainVideo.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                    priority
                  />

                  {/* Deep Scrim Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 pointer-events-none" />

                  {/* Corner Badges */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2.5">
                    <span className="px-3.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      OFFICIAL MUSIC VIDEO
                    </span>
                    <span className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-[#F79192] text-[#0C1014] font-mono text-xs uppercase tracking-wider font-extrabold shadow-[0_0_15px_rgba(247,145,146,0.4)]">
                      4K UHD
                    </span>
                  </div>

                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                    <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                      DUR: {mainVideo.duration}
                    </span>
                  </div>

                  {/* Large Centered Tactile Play Trigger with Coral Glow Ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative group/btn">
                      <div className="absolute inset-0 rounded-full bg-[#F79192] blur-xl opacity-50 group-hover/btn:opacity-90 transition-opacity animate-pulse" />
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/btn:scale-110 active:scale-95">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Video Metadata Strip */}
                  <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                    <div>
                      <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#F79192] font-bold block mb-1">
                        {mainVideo.genre} • {mainVideo.role}
                      </span>
                      <h3 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
                        {mainVideo.title}
                      </h3>
                      <p className="font-mono text-sm sm:text-base text-zinc-200 mt-1 font-semibold">
                        {mainVideo.artist}
                      </p>
                    </div>

                    <div className="hidden md:block pointer-events-auto">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-white hover:text-black transition-colors">
                        <span>CLICK TO PLAY IN-PAGE</span>
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Action & Credits Footer Bar */}
            <div className="p-6 sm:p-8 bg-zinc-950 border-t border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-widest text-[#F79192] font-bold block mb-1">
                  PRODUCTION SYNOPSIS
                </span>
                <p className="font-mono text-sm sm:text-base text-zinc-300 leading-relaxed font-medium">
                  {mainVideo.description}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <a
                  href={mainVideo.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all shadow-[0_0_25px_rgba(220,38,38,0.35)] hover:scale-105"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>WATCH ON YOUTUBE</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                {isPlaying && (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                  >
                    CLOSE PLAYER
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Releases / Upcoming Video Archive */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-zinc-800/80">
            <h4 className="font-syne font-bold text-xl sm:text-2xl text-white uppercase tracking-tight flex items-center gap-3">
              <Film className="w-5 h-5 text-[#F79192]" />
              <span>RECORD VAULT • ADDITIONAL VISUALS</span>
            </h4>
            <span className="font-mono text-xs sm:text-sm text-zinc-400">
              [ 03 RELEASES ON FILE ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_VIDEOS.slice(1).map((video) => (
              <div
                key={video.id}
                className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-zinc-900 border border-zinc-800">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 font-mono text-xs uppercase tracking-wider text-[#F79192] font-bold">
                        {video.role}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F79192] font-bold block mb-1">
                    {video.genre} • {video.releaseYear}
                  </span>
                  <h5 className="font-syne font-black text-2xl uppercase tracking-tight text-white mb-1">
                    {video.title}
                  </h5>
                  <p className="font-mono text-sm text-zinc-300 font-semibold mb-3">
                    {video.artist}
                  </p>
                  <p className="font-mono text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
                    {video.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-500 font-semibold">
                    STATUS: {video.role}
                  </span>
                  <span className="text-[#F79192] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>ARCHIVE ACCESS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
