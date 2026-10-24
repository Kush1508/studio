import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Book Studio Desk | Koral Records Kolkata",
  description:
    "Direct session booking, phone dispatch, and transmission brief for recording, mixing, and mastering at Koral Records Kolkata.",
};

export default function ContactPage() {
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
              DIRECT DISPATCH DOCK • NEW TOWN
            </span>
          </div>
        </div>

        {/* Contact Section Component */}
        <ContactSection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
