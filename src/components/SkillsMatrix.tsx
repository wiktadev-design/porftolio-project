import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Server, Shield, CheckCircle2 } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export const SkillsMatrix: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const getLayerIcon = (code: string) => {
    switch (code) {
      case 'LAYER-01':
        return <Cpu className="w-4 h-4 text-[#00f0ff]" />;
      case 'LAYER-02':
        return <Server className="w-4 h-4 text-[#ff0055]" />;
      default:
        return <Shield className="w-4 h-4 text-[#f59e0b]" />;
    }
  };

  return (
    <section id="keahlian" className="py-20 md:py-28 bg-[#090b10] border-b border-[#1f2937]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 bg-[#00f0ff]" />
              <span>MATRIKS KOMPETENSI REKAYASA</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">STACK &amp; INFRASTRUKTUR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Arsitektur Kemampuan Komputasi
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md font-sans">
            Spesifikasi penguasaan teknologi tingkat lanjut, mulai dari komputasi grafis frontend hingga throughput server terdistribusi.
          </p>
        </div>

        {/* 3-Column Skills Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const isHovered = activeLayer === catIdx;

            return (
              <div
                key={category.categoryCode}
                onMouseEnter={() => {
                  cyberAudio.playBlip(920);
                  setActiveLayer(catIdx);
                }}
                onMouseLeave={() => setActiveLayer(null)}
                className={`bg-[#0b0e15] border p-6 cyber-chamfer-sm transition-all duration-300 flex flex-col justify-between ${
                  isHovered ? 'border-[#00f0ff]/60 shadow-[0_0_25px_rgba(0,240,255,0.15)]' : 'border-[#1f2937]'
                }`}
              >
                <div>
                  {/* Category Top Bar */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f2937]">
                    <div className="flex items-center gap-2">
                      {getLayerIcon(category.categoryCode)}
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {category.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {category.categoryCode}
                    </span>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-5">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200 font-sans">{skill.name}</span>
                          <span className="font-mono text-[#00f0ff] font-bold tabular-nums">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Telemetry Progress Bar */}
                        <div className="w-full h-1.5 bg-[#141926] overflow-hidden rounded-none">
                          <div
                            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff0055] transition-all duration-700 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        {/* Specification Note */}
                        <div className="text-[11px] text-slate-400 font-sans leading-tight">
                          {skill.spec}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Verification Note */}
                <div className="mt-8 pt-4 border-t border-[#181d2a] flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Divalidasi pada Lingkungan Produksi</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
