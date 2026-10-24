# KORAL RECORDS • STUDIO & PRODUCTION FACILITY

> A boutique music recording, vocal production, and audio engineering facility located in Shapoorji, New Town, Kolkata (Action Area III).

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock)

---

## Overview

Koral Records is an acoustically treated creative sanctuary engineered for vocalists, producers, and independent artists. This repository contains the official high-performance web experience featuring:

- **4K Studio Spatial Walkthrough**: 300-frame 4K spatial walkthrough engine with continuous 24fps video playback, inertia lerp scrubbing, and direct drag/timeline navigation.
- **Featured Music Videos**: 16:9 cinema video player spotlighting official record releases (including *5FEET4* by Ashesh ft. IYOU & Roupe).
- **3D Fan Carousel Audio Jukebox**: Interactive audio audition stage with real-time waveform monitoring.
- **Studio Spaces & Acoustic Gear**: Comprehensive hardware specs covering the Vocal Isolation Suite, Control Room, and Live Tracking Rigs.
- **Bento Booking Dock**: Direct session dispatch and WhatsApp booking integration.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Custom Properties
- **Motion & Scrollytelling**: GSAP (ScrollTrigger), Lenis Smooth Scroll, Framer Motion
- **Icons**: Lucide React
- **Brand Theme**: Obsidian Dark with Koral Coral (`#F79192`) accents

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Kush1508/studio.git

# Navigate to project directory
cd studio

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
studio/
├── public/
│   ├── frames/         # 300 4K UHD spatial walkthrough frames
│   ├── images/         # Studio photography, brand logos & emblems
│   └── audio/          # Master audition audio tracks
├── src/
│   ├── app/            # Next.js App Router subpages (/, /jukebox, /videos, /spaces, /contact)
│   ├── components/     # High-fidelity React components (StudioWalkthrough, Navbar, FeaturedVideos, etc.)
│   └── context/        # Global Audio Context & state
├── docs/               # Technical documentation & engineering changelogs
└── tailwind.config.ts  # Coral palette & design tokens
```

---

## License

Private & Proprietary © Koral Records. All Rights Reserved.
