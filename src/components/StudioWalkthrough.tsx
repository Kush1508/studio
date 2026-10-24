"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 300;

interface BadgeInfo {
  tag: string;
  title: string;
  spec: string;
}

const BADGES: Record<string, BadgeInfo> = {
  badge1: {
    tag: "01 • ACOUSTIC ISOLATION",
    title: "360° Pyramid Foam",
    spec: "NRC 0.95 open-cell dampening. Zero standing flutter, true dry vocal capture.",
  },
  badge2: {
    tag: "02 • CONTROL & DSP",
    title: "DAW Console",
    spec: "Dual 4K displays, Yamaha HS8 nearfields, Universal Audio Apollo low-latency interface.",
  },
  badge3: {
    tag: "03 • LIVE TRACKING",
    title: "Live Instrument Rigs",
    spec: "Fender & Ibanez wall-mounted guitars, Benares tabla, and authentic Indian percussion.",
  },
};

export default function StudioWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Smooth lerp state
  const targetFrameRef = useRef<number>(0);
  const currentRenderedFrameRef = useRef<number>(0);
  const lastDrawnIndexRef = useRef<number>(-1);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const isPlayingRef = useRef<boolean>(true);
  const [currentFrameNum, setCurrentFrameNum] = useState<number>(1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeBadge, setActiveBadge] = useState<BadgeInfo | null>(null);

  const togglePlay = () => {
    setIsPlaying((prev) => {
      isPlayingRef.current = !prev;
      return !prev;
    });
  };

  // High-Fidelity Canvas Renderer with Crisp Bicubic Downsampling
  const renderFrameOnCanvas = useCallback(
    (index: number, specificImg?: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      let img = specificImg || imagesRef.current[index];

      // Bidirectional closest-frame fallback for 100% flicker-free rendering
      if (!img || !img.complete || img.naturalWidth === 0) {
        let closestDist = Infinity;
        let closestImg: HTMLImageElement | null = null;

        for (let k = index - 1; k >= 0; k--) {
          const c = imagesRef.current[k];
          if (c && c.complete && c.naturalWidth > 0) {
            closestImg = c;
            closestDist = index - k;
            break;
          }
        }

        for (let k = index + 1; k < TOTAL_FRAMES; k++) {
          const dist = k - index;
          if (dist >= closestDist) break;
          const c = imagesRef.current[k];
          if (c && c.complete && c.naturalWidth > 0) {
            closestImg = c;
            closestDist = dist;
            break;
          }
        }

        if (closestImg) {
          img = closestImg;
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const canvasW = canvas.width;
      const canvasH = canvas.height;
      if (canvasW === 0 || canvasH === 0) return;

      // Native frame resolution
      const imgW = img.naturalWidth || 3840;
      const imgH = img.naturalHeight || 2160;
      const imgRatio = imgW / imgH;
      const canvasRatio = canvasW / canvasH;

      let drawW: number;
      let drawH: number;
      let offsetX: number;
      let offsetY: number;

      // Cover calculation matching physical screen buffer
      if (canvasRatio > imgRatio) {
        drawW = canvasW;
        drawH = canvasW / imgRatio;
        offsetX = 0;
        offsetY = (canvasH - drawH) / 2;
      } else {
        drawH = canvasH;
        drawW = canvasH * imgRatio;
        offsetX = (canvasW - drawW) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    []
  );

  // Resize handler matching exact physical screen pixels (prevents GPU texture blur)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    if (displayW === 0 || displayH === 0) return;

    // Use device pixel ratio for sharp retina rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(displayW * dpr);
    canvas.height = Math.round(displayH * dpr);

    if (lastDrawnIndexRef.current >= 0) {
      renderFrameOnCanvas(lastDrawnIndexRef.current);
    }
  }, [renderFrameOnCanvas]);

  // Preload all 300 frames from /frames/ezgif-frame-XXX.jpg
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    handleResize();

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.decoding = "async";

      img.onload = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);

        if (i === 1) {
          handleResize();
          renderFrameOnCanvas(0, img);
          lastDrawnIndexRef.current = 0;
        } else if (Math.round(currentRenderedFrameRef.current) === i - 1) {
          renderFrameOnCanvas(i - 1, img);
        }

        if (loadedCount >= 10) {
          setIsReady(true);
        }

        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, [handleResize, renderFrameOnCanvas]);

  // Window resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Cinematic 60fps/120fps Smooth Inertial Lerp Loop
  useEffect(() => {
    let animId: number;

    const lerpLoop = () => {
      const diff = targetFrameRef.current - currentRenderedFrameRef.current;

      if (Math.abs(diff) > 0.02) {
        // Smooth cinematic interpolation factor (0.16)
        currentRenderedFrameRef.current += diff * 0.16;

        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentRenderedFrameRef.current))
        );

        if (frameIdx !== lastDrawnIndexRef.current) {
          lastDrawnIndexRef.current = frameIdx;
          renderFrameOnCanvas(frameIdx);
          setCurrentFrameNum(frameIdx + 1);

          // Technical telemetry badges
          const progress = frameIdx / (TOTAL_FRAMES - 1);
          if (progress >= 0.1 && progress <= 0.35) {
            setActiveBadge(BADGES.badge1);
          } else if (progress >= 0.4 && progress <= 0.65) {
            setActiveBadge(BADGES.badge2);
          } else if (progress >= 0.7 && progress <= 0.95) {
            setActiveBadge(BADGES.badge3);
          } else {
            setActiveBadge(null);
          }
        }
      }

      animId = requestAnimationFrame(lerpLoop);
    };

    animId = requestAnimationFrame(lerpLoop);
    return () => cancelAnimationFrame(animId);
  }, [renderFrameOnCanvas]);

  // Continuous Cinematic 24fps Video Walkthrough Auto-Play Engine
  useEffect(() => {
    let lastTime = performance.now();
    let animId: number;

    const playLoop = (time: number) => {
      const dt = time - lastTime;
      if (isPlayingRef.current && isReady && !isDraggingRef.current) {
        // Advance at 24fps rate smoothly
        const step = (dt / 1000) * 24;
        if (step > 0) {
          targetFrameRef.current = (targetFrameRef.current + step) % TOTAL_FRAMES;
          lastTime = time;
        }
      } else {
        lastTime = time;
      }
      animId = requestAnimationFrame(playLoop);
    };

    animId = requestAnimationFrame(playLoop);
    return () => cancelAnimationFrame(animId);
  }, [isReady]);

  // GSAP ScrollTrigger to update target frame
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=3600",
      pin: true,
      scrub: 0.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (self.progress > 0.005) {
          isPlayingRef.current = false;
          setIsPlaying(false);
        }
        targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1);
      },
    });

    scrollTriggerRef.current = trigger;

    return () => {
      trigger.kill();
    };
  }, []);

  // Interactive keyboard navigation (Left/Right arrow keys for crisp frame-stepping)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        isPlayingRef.current = false;
        setIsPlaying(false);
        const next = Math.min(TOTAL_FRAMES - 1, targetFrameRef.current + 3);
        targetFrameRef.current = next;
        if (scrollTriggerRef.current) {
          const scrollY =
            scrollTriggerRef.current.start +
            (next / (TOTAL_FRAMES - 1)) * (scrollTriggerRef.current.end - scrollTriggerRef.current.start);
          window.scrollTo({ top: scrollY, behavior: "auto" });
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        isPlayingRef.current = false;
        setIsPlaying(false);
        const prev = Math.max(0, targetFrameRef.current - 3);
        targetFrameRef.current = prev;
        if (scrollTriggerRef.current) {
          const scrollY =
            scrollTriggerRef.current.start +
            (prev / (TOTAL_FRAMES - 1)) * (scrollTriggerRef.current.end - scrollTriggerRef.current.start);
          window.scrollTo({ top: scrollY, behavior: "auto" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Direct canvas drag-to-scrub for ultra-tactile navigation
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isPlayingRef.current = false;
    setIsPlaying(false);
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startProgressRef.current = targetFrameRef.current / (TOTAL_FRAMES - 1);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const deltaProgress = deltaX / (window.innerWidth * 0.85);
    const newProgress = Math.min(1, Math.max(0, startProgressRef.current + deltaProgress));
    targetFrameRef.current = newProgress * (TOTAL_FRAMES - 1);

    if (scrollTriggerRef.current) {
      const scrollY =
        scrollTriggerRef.current.start +
        newProgress * (scrollTriggerRef.current.end - scrollTriggerRef.current.start);
      window.scrollTo({ top: scrollY });
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Interactive timeline scrubber click handler
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.min(1, Math.max(0, clickX / rect.width));

    if (scrollTriggerRef.current) {
      const scrollY =
        scrollTriggerRef.current.start +
        progress * (scrollTriggerRef.current.end - scrollTriggerRef.current.start);
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  };

  return (
    <section
      id="tour"
      ref={sectionRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="w-full h-screen relative bg-black overflow-hidden select-none cursor-ew-resize"
    >
      {/* 4K CANVAS WITH OPTICAL CLARITY & CONTRAST ENHANCEMENT */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block absolute inset-0 object-cover transition-opacity duration-500 ${
          isReady || loadProgress > 3 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          // Optical clarity: Boost micro-contrast and saturation to eliminate ezgif compression flatness
          filter: "contrast(1.08) brightness(1.03) saturate(1.08)",
          imageRendering: "auto",
        }}
      />

      {/* Subtle Top Nav Protection Scrim Only */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10" />

      {/* Initial Fast Loading Curtain (Fades out once first batch is ready) */}
      {!isReady && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-6 font-mono">
          <div className="border border-zinc-800 bg-zinc-950 p-6 max-w-sm w-full rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-400 mb-4 border-b border-zinc-800 pb-2">
              <span className="font-bold text-white">[ 4K ENGINE INITIALIZATION ]</span>
              <span className="text-[#F79192] font-black">{loadProgress}%</span>
            </div>
            <p className="text-xs uppercase tracking-wider text-zinc-300 mb-4 font-medium">
              BUFFERING 300 4K SPATIAL FRAMES • 24FPS
            </p>
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#F79192] h-full transition-all duration-150 shadow-[0_0_12px_#F79192]"
                style={{ width: `${Math.max(5, loadProgress)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT CORNER HUD TELEMETRY */}

      {/* Top-Left: [ KORAL_LAB • 4K SPATIAL WALKTHROUGH ] */}
      <div className="absolute top-24 sm:top-28 left-6 sm:left-8 z-20 pointer-events-none">
        <div className="flex items-center gap-2.5 bg-black/85 backdrop-blur-md px-5 py-2.5 border border-zinc-700 rounded-lg font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-200 shadow-2xl font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F79192] animate-pulse shadow-[0_0_8px_rgba(247,145,146,0.8)]" />
          <span>[ KORAL_LAB • 4K SPATIAL WALKTHROUGH ]</span>
        </div>
      </div>

      {/* Top-Right: Play/Pause Toggle & Frame Counter */}
      <div className="absolute top-24 sm:top-28 right-6 sm:right-8 z-20 flex items-center gap-3">
        {/* Play/Pause Video Button */}
        <button
          onClick={togglePlay}
          className="bg-black/90 hover:bg-[#F79192] text-zinc-100 hover:text-[#0C1014] px-4 py-2.5 border border-zinc-700 hover:border-[#F79192] rounded-lg font-mono text-xs sm:text-sm uppercase tracking-wider font-bold shadow-2xl flex items-center gap-2 transition-all cursor-pointer group"
          title={isPlaying ? "Pause Video Walkthrough" : "Play Video Walkthrough"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current text-[#F79192] group-hover:text-[#0C1014]" />
              <span>[ PAUSE VIDEO ]</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-[#F79192] group-hover:text-[#0C1014]" />
              <span>[ PLAY VIDEO ]</span>
            </>
          )}
        </button>

        {!isLoaded && (
          <span className="hidden sm:inline-block px-3.5 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-800 font-mono text-xs uppercase tracking-wider text-[#F79192] font-bold">
            BUFFERING: {loadProgress}%
          </span>
        )}
        <div className="bg-black/85 backdrop-blur-md px-5 py-2.5 border border-zinc-700 rounded-lg font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-200 shadow-2xl font-bold pointer-events-none">
          FRAME: [{String(currentFrameNum).padStart(3, "0")}/300 • 24FPS]
        </div>
      </div>

      {/* Bottom-Left: Dynamic technical badges fading in on GSAP scrub */}
      <div
        className={`absolute bottom-20 sm:bottom-24 left-6 sm:left-8 z-20 max-w-sm sm:max-w-md pointer-events-none transition-all duration-500 transform ${
          activeBadge
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {activeBadge && (
          <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-700 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-zinc-800 font-mono text-xs sm:text-sm uppercase tracking-wider">
              <span className="text-[#F79192] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F79192] shadow-[0_0_8px_rgba(247,145,146,0.8)]" />
                {activeBadge.tag}
              </span>
              <span className="text-zinc-400 font-semibold">LIVE_TELEMETRY</span>
            </div>
            <h3 className="font-mono font-black text-base sm:text-lg uppercase tracking-wider text-white mb-2">
              {activeBadge.title}
            </h3>
            <p className="font-mono text-sm text-zinc-300 leading-relaxed font-medium">
              {activeBadge.spec}
            </p>
          </div>
        )}
      </div>

      {/* Bottom-Right Coordinates */}
      <div className="absolute bottom-20 sm:bottom-24 right-6 sm:right-8 z-20 pointer-events-none hidden sm:block">
        <div className="bg-black/85 backdrop-blur-md px-5 py-2.5 border border-zinc-700 rounded-lg font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-300 shadow-2xl font-semibold">
          [ 22.57° N, 88.48° E • SHAPOORJI AA-III ]
        </div>
      </div>

      {/* Bottom Center Interactive Scrubber Bar */}
      <div className="absolute bottom-6 left-6 right-6 sm:left-12 sm:right-12 z-30 flex flex-col items-center gap-2">
        <div
          onClick={handleTimelineClick}
          className="w-full max-w-3xl h-3 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 cursor-pointer p-0.5 shadow-2xl group hover:border-[#F79192]/60 transition-colors relative"
        >
          {/* Progress fill */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F79192] to-[#FFA4A5] transition-all duration-75 relative shadow-[0_0_15px_rgba(247,145,146,0.5)]"
            style={{ width: `${(currentFrameNum / TOTAL_FRAMES) * 100}%` }}
          >
            {/* Playhead thumb */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#F79192] shadow-lg group-hover:scale-125 transition-transform" />
          </div>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-3">
          <span>001</span>
          <span className="text-[#F79192] font-bold">
            [ DRAG • SCROLL • ARROWS • CLICK TIMELINE TO EXPLORE 300 4K FRAMES ]
          </span>
          <span>300</span>
        </div>
      </div>

      {/* Viewport Corner Crosshairs */}
      <div className="absolute top-4 left-4 font-mono text-zinc-600 text-sm font-bold z-20 pointer-events-none select-none">
        +
      </div>
      <div className="absolute top-4 right-4 font-mono text-zinc-600 text-sm font-bold z-20 pointer-events-none select-none">
        +
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-zinc-600 text-sm font-bold z-20 pointer-events-none select-none">
        +
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-zinc-600 text-sm font-bold z-20 pointer-events-none select-none">
        +
      </div>
    </section>
  );
}
