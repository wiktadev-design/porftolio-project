import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { Terminal, Shield, Award, Check, FileText } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState(false);

  const milestones = [
    {
      period: '2024 — Sekarang',
      role: 'Principal Creative Technologist',
      organization: 'NeuroCore Labs',
      description: 'Memimpin arsitektur visualisasi data neural skala besar, perancangan WebGL 3D pipelines, dan micro-frontend latensi rendah.',
    },
    {
      period: '2022 — 2024',
      role: 'Senior Web Graphics & Systems Engineer',
      organization: 'Aegis Urban Dynamics',
      description: 'Mengembangkan digital twin perkotaan 3D interaktif pada Three.js dan memproses WebSocket streaming puluhan ribu sensor perkotaan.',
    },
    {
      period: '2019 — 2022',
      role: 'Full-Stack Developer & UI Architect',
      organization: 'CyberneX Digital Studio',
      description: 'Membangun platform SaaS high-concurrency, sistem design tokens responsif, dan instrumen audio Web Audio API.',
    },
  ];

  const handleCopyKey = () => {
    cyberAudio.playPulse();
    navigator.clipboard.writeText('ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICzerokaelen99x018274992neuralnet');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <section id="tentang" className="py-20 md:py-28 bg-[#07080b] border-b border-[#1f2937]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 bg-[#00f0ff]" />
              <span>PROFIL &amp; PERJALANAN TEKNIS</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">FILOSOFI REKAYASA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Di Balik Antarmuka &amp; Mesin Kode
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md font-sans">
            Menolak kompromi antara keindahan visual dan efisiensi eksekusi. Setiap piksel dan komputasi dioptimalkan secara sadar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Bio & Engineering Principles (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-6 bg-[#0b0e15] border border-[#1f2937] cyber-chamfer-sm space-y-4">
              <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
                <span>Manifesto Rekayasa Cybernetic</span>
              </h3>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Selama lebih dari 7 tahun, saya mendedikasikan karir untuk menjembatani kesenjangan antara dunia desain spekulatif cyberpunk dan rekayasa perangkat lunak tingkat produksi. Saya percaya bahwa antarmuka web modern tidak seharusnya terasa hambar atau generik.
              </p>

              <p className="text-sm text-slate-400 font-sans leading-relaxed">
                Fokus utama saya bertumpu pada akselerasi perangkat keras via WebGL/WebGPU, kompresi protokol data berlatensi rendah, serta arsitektur komponen React yang bersih dan modular.
              </p>

              {/* Public Verification Key Snippet */}
              <div className="pt-3 border-t border-[#181d2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Kunci Publik PGP / SSH Verified</span>
                </div>

                <button
                  onClick={handleCopyKey}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-[#10131d] border border-[#2d3748] hover:border-[#00f0ff] cyber-chamfer-sm transition-colors cursor-pointer"
                >
                  {copiedKey ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Kunci Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>Salin Public Key SSH</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Core Tenets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#090b11] border border-[#1c2232] cyber-chamfer-sm space-y-2">
                <div className="text-xs font-mono text-[#00f0ff] font-bold uppercase">
                  01. Zero Junk / 60 FPS
                </div>
                <div className="text-sm font-semibold text-white font-display">Akselerasi GPU &amp; Off-Main-Thread</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Menjalankan kalkulasi berat pada Web Workers dan shader fragment agar thread antarmuka selalu stabil tanpa freeze.
                </p>
              </div>

              <div className="p-4 bg-[#090b11] border border-[#1c2232] cyber-chamfer-sm space-y-2">
                <div className="text-xs font-mono text-[#ff0055] font-bold uppercase">
                  02. Presisi Tipografi
                </div>
                <div className="text-sm font-semibold text-white font-display">Kontras Tinggi &amp; Tabular Numerals</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Semua angka telemetri menggunakan tabular layout agar data sejajar rapi dan terbaca jelas dalam situasi apapun.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Milestones Timeline (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-[#00f0ff]" />
              <span>Jejak Karir &amp; Pengalaman</span>
            </h3>

            <div className="space-y-4 relative border-l border-[#1f2937] ml-2 pl-4">
              {milestones.map((item) => (
                <div key={item.period} className="relative group space-y-1 pb-4">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#07080b] border-2 border-[#00f0ff] group-hover:bg-[#00f0ff] transition-colors" />

                  <div className="text-xs font-mono text-[#00f0ff] tabular-nums">
                    {item.period}
                  </div>

                  <h4 className="text-base font-bold font-display text-white group-hover:text-[#00f0ff] transition-colors">
                    {item.role}
                  </h4>

                  <div className="text-xs font-medium text-slate-300 font-sans">
                    {item.organization}
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
