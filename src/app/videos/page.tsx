import Navbar from "@/components/Navbar";
import FeaturedVideos from "@/components/FeaturedVideos";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Featured Videos | Koral Records Kolkata",
  description:
    "Explore official music videos, visual records, and studio sessions tracked, mixed, and mastered at Koral Records Kolkata.",
};

export default function VideosPage() {
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
              KORAL RECORDS • VISUAL ARCHIVE
            </span>
          </div>
        </div>

        {/* Featured Videos Component */}
        <FeaturedVideos />

        {/* Next Step CTA Strip */}
        <div className="py-16 px-6 sm:px-10 lg:px-14 xl:px-16 border-b border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase">
              WANT YOUR TRACK FEATURED HERE?
            </h4>
            <p className="font-mono text-sm text-zinc-400 mt-1">
              Book a vocal capture or lockout tracking session with our chief sound engineer.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-[#F79192] hover:bg-[#FFA4A5] text-[#0C1014] font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all shadow-[0_0_25px_rgba(247,145,146,0.35)] hover:scale-105 inline-flex items-center gap-2"
          >
            <span>[ LOCK STUDIO TIME ]</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
