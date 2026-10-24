import Navbar from "@/components/Navbar";
import StudioSpaces from "@/components/StudioSpaces";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Studio Spaces & Rigs | Koral Records Kolkata",
  description:
    "Acoustic isolation vocal suite, precision control desk, and live instrument tracking facilities at Koral Records Kolkata.",
};

export default function SpacesPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#080808] text-[#ededed] flex flex-col selection:bg-[#F79192] selection:text-black">
        <Navbar />

        {/* Page Top Spacer & Breadcrumbs */}
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
              ACOUSTIC ZONES • GEAR ARCHIVE
            </span>
          </div>
        </div>

        {/* Studio Spaces Component */}
        <StudioSpaces />

        {/* Booking Strip */}
        <div className="py-16 px-6 sm:px-10 lg:px-14 xl:px-16 border-b border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase">
              SELECT YOUR RIG & SCHEDULE SESSION
            </h4>
            <p className="font-mono text-sm text-zinc-400 mt-1">
              Direct desk access in Shapoorji, Action Area III, New Town. Zero middlemen.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all shadow-[0_0_25px_rgba(247,145,146,0.35)] hover:scale-105 inline-flex items-center gap-2"
          >
            <span>[ PROCEED TO BOOKING ]</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
