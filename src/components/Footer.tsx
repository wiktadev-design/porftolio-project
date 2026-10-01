import React from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { cyberAudio } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050609] border-t border-[#1f2937] py-8 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Copyright & Developer identity */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00f0ff] cyber-chamfer-sm" />
          <span className="font-mono text-slate-300 font-semibold">NEURONET</span>
          <span aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()} {DEVELOPER_PROFILE.name}. Seluruh hak cipta dilindungi.</span>
        </div>

        {/* Center/Right: Clean navigation links */}
        <div className="flex items-center gap-6 font-mono text-xs">
          <a
            href="#karya"
            onClick={() => cyberAudio.playBlip(700)}
            className="hover:text-white transition-colors"
          >
            Karya
          </a>
          <a
            href="#jurnal"
            onClick={() => cyberAudio.playBlip(700)}
            className="hover:text-white transition-colors"
          >
            Jurnal
          </a>
          <a
            href="#keahlian"
            onClick={() => cyberAudio.playBlip(700)}
            className="hover:text-white transition-colors"
          >
            Keahlian
          </a>
          <a
            href="#kontak"
            onClick={() => cyberAudio.playBlip(700)}
            className="hover:text-[#00f0ff] transition-colors"
          >
            Transmisi
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              cyberAudio.playBlip(900);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#00f0ff] hover:underline"
          >
            Kembali ke Atas ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
