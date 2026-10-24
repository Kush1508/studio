"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  duration: number; // in seconds
  coverArt: string;
  description: string;
}

export const SAMPLE_TRACKS: Track[] = [
  {
    id: "track-1",
    title: "Midnight in Shapoorji",
    artist: "Subho x Rupam",
    genre: "Hip-Hop / Trap",
    bpm: 140,
    duration: 32,
    coverArt: "/images/producer-desk.jpg",
    description: "Punchy 808 sub-bass, crispy rolled hi-hats, and atmospheric Bengali melodic vocal chops recorded in Booth A.",
  },
  {
    id: "track-2",
    title: "Kolkata Rain & Ragas",
    artist: "Ananya Roy",
    genre: "Indie Bengali",
    bpm: 96,
    duration: 38,
    coverArt: "/images/vocal-booth.jpg",
    description: "Intimate acoustic guitar arpeggios layered with soulful Raag Yaman harmonies and warm analog room reverb.",
  },
  {
    id: "track-3",
    title: "Sunset on Newtown Expressway",
    artist: "The Action Area Trio",
    genre: "Acoustic Pop",
    bpm: 110,
    duration: 35,
    coverArt: "/images/studio-lounge.jpg",
    description: "Fingerpicked acoustic guitars, warm live shaker percussion, and pristine uncompressed vocal capture.",
  },
  {
    id: "track-4",
    title: "Sonar Bangla Drift",
    artist: "Ronnie Beats",
    genre: "Neo-Soul / Lo-Fi",
    bpm: 82,
    duration: 30,
    coverArt: "/images/producer-desk.jpg",
    description: "Lush vintage Rhodes electric piano chords, subtle tape flutter, and laid-back groove captured on reference monitors.",
  },
  {
    id: "track-5",
    title: "Monsoon Distortion",
    artist: "Koral Studio Session #05",
    genre: "Alt-Rock / Fusion",
    bpm: 128,
    duration: 34,
    coverArt: "/images/studio-lounge.jpg",
    description: "Overdriven Fender Stratocaster riffs driven through tube preamps with punchy studio drum transients.",
  },
];

interface AudioContextType {
  // Ambient Loop State
  isAmbientPlaying: boolean;
  toggleAmbient: () => void;
  pauseAmbient: () => void;

  // Jukebox State
  activeTrackId: string | null;
  activeTrack: Track | null;
  isJukeboxPlaying: boolean;
  jukeboxProgress: number; // 0 to 1
  jukeboxCurrentTime: number; // seconds
  playTrack: (trackId: string) => void;
  pauseTrack: () => void;
  toggleTrack: (trackId: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isJukeboxPlaying, setIsJukeboxPlaying] = useState(false);
  const [jukeboxProgress, setJukeboxProgress] = useState(0);
  const [jukeboxCurrentTime, setJukeboxCurrentTime] = useState(0);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Ambient sound graph refs
  const ambientMasterGainRef = useRef<GainNode | null>(null);
  const ambientOscsRef = useRef<{ stop: () => void }[]>([]);
  const ambientTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Jukebox sound graph refs
  const jukeboxMasterGainRef = useRef<GainNode | null>(null);
  const jukeboxNodesRef = useRef<{ stop: () => void }[]>([]);
  const jukeboxIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize AudioContext on first user gesture
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // --- AMBIENT SOUND GENERATOR (Warm Lo-Fi Studio Atmosphere) ---
  const startAmbientSound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Master gain for ambient
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 2.5);
    masterGain.connect(ctx.destination);
    ambientMasterGainRef.current = masterGain;

    // Filter for warm analog warmth
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);
    filter.connect(masterGain);

    // Warm chord notes (D minor 9 / Fmaj7 chord: D2, A2, F3, C4, E4)
    const frequencies = [73.42, 110.0, 174.61, 261.63, 329.63];
    const oscs: { stop: () => void }[] = [];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Subtle detune for analog chorus
      osc.detune.setValueAtTime((idx % 2 === 0 ? 1 : -1) * 4, ctx.currentTime);

      oscGain.gain.setValueAtTime(0.06 / (idx + 1), ctx.currentTime);

      // LFO for gentle breath-like movement
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
      lfoGain.gain.setValueAtTime(15, ctx.currentTime);
      lfo.connect(filter.frequency);
      lfo.start();

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();

      oscs.push({
        stop: () => {
          try {
            osc.stop();
            lfo.stop();
          } catch {
            // Ignore if already stopped
          }
        },
      });
    });

    ambientOscsRef.current = oscs;
    setIsAmbientPlaying(true);
  }, [getAudioContext]);

  const stopAmbientSound = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (ctx && ambientMasterGainRef.current) {
      try {
        ambientMasterGainRef.current.gain.setValueAtTime(
          ambientMasterGainRef.current.gain.value,
          ctx.currentTime
        );
        ambientMasterGainRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + 0.8
        );
      } catch {
        // Fallback
      }
    }

    if (ambientTimerRef.current) {
      clearTimeout(ambientTimerRef.current);
    }

    ambientTimerRef.current = setTimeout(() => {
      ambientOscsRef.current.forEach((o) => o.stop());
      ambientOscsRef.current = [];
      ambientMasterGainRef.current = null;
    }, 850);

    setIsAmbientPlaying(false);
  }, []);

  const toggleAmbient = useCallback(() => {
    if (isAmbientPlaying) {
      stopAmbientSound();
    } else {
      // If jukebox is currently playing, stop it first to prioritize ambient or let ambient start
      if (isJukeboxPlaying) {
        setIsJukeboxPlaying(false);
        jukeboxNodesRef.current.forEach((n) => n.stop());
        jukeboxNodesRef.current = [];
      }
      startAmbientSound();
    }
  }, [isAmbientPlaying, isJukeboxPlaying, startAmbientSound, stopAmbientSound]);

  const pauseAmbient = useCallback(() => {
    if (isAmbientPlaying) {
      stopAmbientSound();
    }
  }, [isAmbientPlaying, stopAmbientSound]);

  // --- JUKEBOX TRACK SYNTHESIZER ENGINE ---
  const stopJukeboxAudio = useCallback(() => {
    if (jukeboxIntervalRef.current) {
      clearInterval(jukeboxIntervalRef.current);
      jukeboxIntervalRef.current = null;
    }
    jukeboxNodesRef.current.forEach((node) => node.stop());
    jukeboxNodesRef.current = [];
    setIsJukeboxPlaying(false);
  }, []);

  const playJukeboxAudio = useCallback(
    (track: Track) => {
      const ctx = getAudioContext();
      if (!ctx) return;

      // RULE: Automatically pause background loop if jukebox track starts playing
      if (isAmbientPlaying) {
        stopAmbientSound();
      }

      stopJukeboxAudio();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.5);
      masterGain.connect(ctx.destination);
      jukeboxMasterGainRef.current = masterGain;

      const trackNodes: { stop: () => void }[] = [];

      // Musical note sequences per track genre
      let scaleFreqs = [130.81, 146.83, 164.81, 196.0, 220.0, 261.63]; // C Pentatonic
      let noteDuration = 0.4;
      let bassFreq = 65.41;

      if (track.genre.includes("Trap")) {
        scaleFreqs = [146.83, 174.61, 220.0, 261.63, 293.66]; // D Minor
        noteDuration = 0.22;
        bassFreq = 36.71; // Deep 808
      } else if (track.genre.includes("Bengali")) {
        scaleFreqs = [164.81, 207.65, 246.94, 277.18, 329.63]; // Yaman-ish
        noteDuration = 0.45;
        bassFreq = 82.41;
      } else if (track.genre.includes("Pop")) {
        scaleFreqs = [196.0, 220.0, 246.94, 293.66, 329.63, 392.0]; // G Major
        noteDuration = 0.35;
        bassFreq = 98.0;
      } else if (track.genre.includes("Soul")) {
        scaleFreqs = [174.61, 220.0, 261.63, 329.63, 392.0]; // Fmaj9
        noteDuration = 0.5;
        bassFreq = 43.65;
      } else {
        // Rock / Fusion
        scaleFreqs = [164.81, 196.0, 220.0, 246.94, 293.66]; // E minor
        noteDuration = 0.28;
        bassFreq = 41.2;
      }

      // 1. Rhythmic Melody Sequencer
      let step = 0;
      const melodyTimer = setInterval(() => {
        if (!ctx || ctx.state === "closed") return;
        const now = ctx.currentTime;
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Select note from sequence
        const noteFreq = scaleFreqs[step % scaleFreqs.length];
        step++;

        noteOsc.type = track.genre.includes("Rock") ? "sawtooth" : "triangle";
        noteOsc.frequency.setValueAtTime(noteFreq, now);

        noteGain.gain.setValueAtTime(0.12, now);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration);

        // Lowpass filter for warm tone
        const noteFilter = ctx.createBiquadFilter();
        noteFilter.type = "lowpass";
        noteFilter.frequency.setValueAtTime(
          track.genre.includes("Trap") ? 900 : 1200,
          now
        );

        noteOsc.connect(noteGain);
        noteGain.connect(noteFilter);
        noteFilter.connect(masterGain);

        noteOsc.start(now);
        noteOsc.stop(now + noteDuration);
      }, noteDuration * 1000);

      // 2. Pulse Bassline
      let bassStep = 0;
      const bassTimer = setInterval(() => {
        if (!ctx || ctx.state === "closed") return;
        const now = ctx.currentTime;
        const bassOsc = ctx.createOscillator();
        const bassEnv = ctx.createGain();

        const curBassFreq = bassStep % 2 === 0 ? bassFreq : bassFreq * 1.33;
        bassStep++;

        bassOsc.type = "sine";
        bassOsc.frequency.setValueAtTime(curBassFreq, now);

        bassEnv.gain.setValueAtTime(0.2, now);
        bassEnv.gain.exponentialRampToValueAtTime(
          0.001,
          now + noteDuration * 1.8
        );

        bassOsc.connect(bassEnv);
        bassEnv.connect(masterGain);

        bassOsc.start(now);
        bassOsc.stop(now + noteDuration * 2);
      }, noteDuration * 2000);

      trackNodes.push({
        stop: () => {
          clearInterval(melodyTimer);
          clearInterval(bassTimer);
          try {
            masterGain.gain.setValueAtTime(
              masterGain.gain.value,
              ctx.currentTime
            );
            masterGain.gain.exponentialRampToValueAtTime(
              0.0001,
              ctx.currentTime + 0.3
            );
          } catch {
            // Ignore
          }
        },
      });

      jukeboxNodesRef.current = trackNodes;
      setIsJukeboxPlaying(true);
      setActiveTrackId(track.id);

      // Playback progress ticker
      let currentSeconds = 0;
      const totalSeconds = track.duration;

      jukeboxIntervalRef.current = setInterval(() => {
        currentSeconds += 0.2;
        if (currentSeconds >= totalSeconds) {
          // Track ended
          currentSeconds = 0;
          setJukeboxProgress(0);
          setJukeboxCurrentTime(0);
          stopJukeboxAudio();
        } else {
          setJukeboxCurrentTime(Math.floor(currentSeconds));
          setJukeboxProgress(currentSeconds / totalSeconds);
        }
      }, 200);
    },
    [getAudioContext, isAmbientPlaying, stopAmbientSound, stopJukeboxAudio]
  );

  const playTrack = useCallback(
    (trackId: string) => {
      const track = SAMPLE_TRACKS.find((t) => t.id === trackId);
      if (!track) return;
      playJukeboxAudio(track);
    },
    [playJukeboxAudio]
  );

  const pauseTrack = useCallback(() => {
    stopJukeboxAudio();
  }, [stopJukeboxAudio]);

  const toggleTrack = useCallback(
    (trackId: string) => {
      if (activeTrackId === trackId && isJukeboxPlaying) {
        pauseTrack();
      } else {
        playTrack(trackId);
      }
    },
    [activeTrackId, isJukeboxPlaying, pauseTrack, playTrack]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (ambientTimerRef.current) clearTimeout(ambientTimerRef.current);
      if (jukeboxIntervalRef.current) clearInterval(jukeboxIntervalRef.current);
      ambientOscsRef.current.forEach((o) => o.stop());
      jukeboxNodesRef.current.forEach((n) => n.stop());
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const activeTrack =
    SAMPLE_TRACKS.find((t) => t.id === activeTrackId) || null;

  return (
    <AudioContext.Provider
      value={{
        isAmbientPlaying,
        toggleAmbient,
        pauseAmbient,
        activeTrackId,
        activeTrack,
        isJukeboxPlaying,
        jukeboxProgress,
        jukeboxCurrentTime,
        playTrack,
        pauseTrack,
        toggleTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useStudioAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useStudioAudio must be used within an AudioProvider");
  }
  return context;
};
