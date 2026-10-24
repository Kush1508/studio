import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";

export const metadata: Metadata = {
  title: "KORAL STUDIOS | Authentic Music Recording & Production | Shapoorji, Kolkata",
  description:
    "An intimate, acoustically treated creative sanctuary in Shapoorji (Action Area III, New Town), Kolkata — engineered for vocalists, producers, and independent artists.",
  keywords: [
    "Koral Studios",
    "Recording Studio Kolkata",
    "Shapoorji Studio",
    "New Town Kolkata Studio",
    "Music Production Kolkata",
    "Vocal Recording Booth",
    "Audio Engineering Action Area III",
  ],
  authors: [{ name: "Koral Studios" }],
  openGraph: {
    title: "KORAL STUDIOS | Music Recording & Production | Shapoorji, Kolkata",
    description:
      "Raw Energy. Precision Sound. An intimate, acoustically treated creative sanctuary in Shapoorji, New Town, Kolkata.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#040404",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#080808]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080808] text-[#ededed] antialiased selection:bg-[#F79192] selection:text-black min-h-screen relative">
        {/* Subtle Fixed SVG Noise Overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[999] opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
