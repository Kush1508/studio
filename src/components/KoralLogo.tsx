"use client";

import React from "react";
import Image from "next/image";

interface KoralLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function KoralLogo({
  className = "",
  showText = true,
  size = "md",
}: KoralLogoProps) {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11 sm:w-12 sm:h-12",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Koral Circular Emblem */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden shadow-[0_0_20px_rgba(247,145,146,0.35)] ring-1 ring-[#F79192]/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(247,145,146,0.6)] flex-shrink-0`}
      >
        <Image
          src="/images/koral-emblem.png"
          alt="Koral Records & Studios Logo"
          fill
          sizes="(max-width: 768px) 48px, 64px"
          className="object-contain"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-syne font-black uppercase tracking-[-0.03em] text-lg sm:text-xl lg:text-2xl text-white group-hover:text-[#F79192] transition-colors">
            KORAL
          </span>
          <span className="font-mono text-xs sm:text-[13px] tracking-[0.3em] text-[#F79192] uppercase mt-0.5 font-bold">
            RECORDS
          </span>
        </div>
      )}
    </div>
  );
}
