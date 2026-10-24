import Navbar from "@/components/Navbar";
import StudioWalkthrough from "@/components/StudioWalkthrough";
import HomeHighlights from "@/components/HomeHighlights";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#080808] text-[#ededed] flex flex-col selection:bg-[#F79192] selection:text-black">
        {/* 1. Header Navigation Dock */}
        <Navbar />

        {/* 2. 4K Studio Walkthrough Hero View */}
        <StudioWalkthrough />

        {/* 3. Curated Landing Highlights (4K Tour, 5FEET4 Video, Jukebox, Spaces & Booking) */}
        <HomeHighlights />

        {/* 4. Global Brand Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
