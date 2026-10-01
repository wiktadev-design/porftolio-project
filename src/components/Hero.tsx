import React from 'react';
import { ArrowRight, Terminal as TerminalIcon, Sparkles, ShieldCheck } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { cyberAudio } from '../utils/audio';

interface HeroProps {
  onOpenTerminal: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onExploreProjects }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden cyber-grid border-b border-[#1f2937]/70">
      {/* Background ambient neon radial glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#ff0055]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Typographic Pitch & Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span>Full-Stack &amp; Creative Technologist</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Cybernetic Systems</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.1] cyber-glitch">
              Membangun Arsitektur Web Masa Depan yang Cepat, Tajam, &amp; Berestetika.
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
              Halo, saya <span className="text-white font-semibold">{DEVELOPER_PROFILE.name}</span> (<span className="text-[#00f0ff] font-mono">{DEVELOPER_PROFILE.alias}</span>). Menggabungkan rekayasa grafika komputasi WebGL, performa mikro-latensi, dan desain antarmuka futuristik untuk menciptakan pengalaman web generasi berikutnya.
            </p>

            {/* Functional Call To Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  cyberAudio.playOpen();
                  onExploreProjects();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-[#00f0ff] hover:bg-[#38f3ff] transition-all cyber-chamfer-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                <span>Jelajahi Galeri Karya</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  cyberAudio.playOpen();
                  onOpenTerminal();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-mono font-medium text-slate-200 border border-[#2d3748] bg-[#0c0d14]/80 hover:border-[#00f0ff]/60 hover:text-[#00f0ff] hover:bg-[#121624] transition-all cyber-chamfer-sm cursor-pointer"
              >
                <TerminalIcon className="w-4 h-4 text-[#00f0ff]" />
                <span>Interaktif Terminal CLI</span>
              </button>
            </div>

            {/* Proof Metrics (Tabular Precision) */}
            <div className="pt-8 border-t border-[#1f2937]/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {DEVELOPER_PROFILE.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Cybernetic Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative tech brackets */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#00f0ff]" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#ff0055]" />
              <div className="absolute -top-3 -right-3 w-4 h-4 border-t border-r border-[#00f0ff]/50" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 border-b border-l border-[#ff0055]/50" />

              {/* Main Image Framing */}
              <div className="relative overflow-hidden cyber-chamfer border border-[#1f2937] bg-[#0b0d13] group shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                <img
                  src={DEVELOPER_PROFILE.heroImage}
                  alt="Potret Cyberpunk Developer Raka Pratama"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/30 to-transparent" />

                {/* Bottom Overlay Telemetry Data */}
                <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 bg-gradient-to-t from-[#07080b] via-[#07080b]/90 to-transparent">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-emerald-400 font-semibold tracking-wide">STATUS: ONLINE // TERSEDIA</span>
                    </div>
                    <span className="font-mono text-slate-400 tabular-nums">LOC: -6.2088, 106.8456</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 font-sans pt-1 border-t border-[#1f2937]">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>Zero Trust Security Verified</span>
                    </span>
                    <span className="text-[#00f0ff] font-mono font-medium">NEURAL-LINK v4.2</span>
                  </div>
                </div>
              </div>

              {/* Floating Accent Capsule */}
              <div className="absolute -bottom-5 left-6 bg-[#0e111a] border border-[#00f0ff]/40 px-3.5 py-1.5 cyber-chamfer-sm text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span className="text-white">Akselerasi GPU &amp; WebGL Native</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
