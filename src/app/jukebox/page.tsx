import Navbar from "@/components/Navbar";
import CardFanCarousel from "@/components/CardFanCarousel";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "3D Jukebox & Discography | Koral Records Kolkata",
  description:
    "Audition multi-genre stem recordings, master tracks, and acoustic captures engineered at Koral Records Kolkata.",
};

export default function JukeboxPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#080808] text-[#ededed] flex flex-col selection:bg-[#F79192] selection:text-black">
        <Navbar />

        {/* Breadcrumb Bar */}
        <div className="pt-28 sm:pt-32 pb-8 px-6 sm:px-10 lg:px-14 xl:px-16 border-b border-zinc-850 bg-[#09090b]">
          <div className="flex items-center justify-between font-mono text-xs sm:text-sm text-zinc-400">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-[#F79192] transition-colors font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO HOME</span>
            </Link>

            <span className="text-[#F79192] font-semibold">
              3D FAN CAROUSEL • STEM MONITORING
            </span>
          </div>
        </div>

        {/* 3D Jukebox Component */}
        <CardFanCarousel />

        {/* Next Step Strip */}
        <div className="py-16 px-6 sm:px-10 lg:px-14 xl:px-16 border-b border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase">
              HEAR YOUR OWN TRACK IN THIS FIDELITY
            </h4>
            <p className="font-mono text-sm text-zinc-400 mt-1">
              Recorded through the Neumann U87 Ai and mastered with Universal Audio DSP hardware.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all shadow-[0_0_25px_rgba(247,145,146,0.35)] hover:scale-105 inline-flex items-center gap-2"
          >
            <span>[ BOOK YOUR MIX SESSION ]</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
