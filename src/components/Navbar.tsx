import React, { useState } from 'react';
import { Volume2, VolumeX, Monitor, Terminal as TerminalIcon, Menu, X } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  scanlinesEnabled: boolean;
  onToggleScanlines: () => void;
  onOpenTerminal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  scanlinesEnabled,
  onToggleScanlines,
  onOpenTerminal,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#karya', label: 'Galeri Karya' },
    { href: '#jurnal', label: 'Jurnal Dev' },
    { href: '#keahlian', label: 'Keahlian' },
    { href: '#tentang', label: 'Profil' },
    { href: '#kontak', label: 'Transmisi' },
  ];

  const handleNavClick = (href: string) => {
    cyberAudio.playBlip(720);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1f2937]/80 bg-[#07080b]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            cyberAudio.playBlip(900);
          }}
          className="text-lg sm:text-xl font-bold font-display tracking-tight text-white hover:text-[#00f0ff] transition-colors cyber-glitch flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-[#00f0ff] cyber-chamfer-sm inline-block animate-pulse"></span>
          <span>NEURONET // WIKTA.DEV</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-colors py-1 relative hover:text-white ${
                  isActive ? 'text-[#00f0ff] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Functional interactive actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Scanline CRT overlay toggle */}
          <button
            onClick={() => {
              cyberAudio.playBlip(600);
              onToggleScanlines();
            }}
            title={scanlinesEnabled ? 'Matikan Efek CRT Scanline' : 'Aktifkan Efek CRT Scanline'}
            aria-label="Toggle scanlines"
            className={`p-2 text-xs border rounded transition-colors ${
              scanlinesEnabled
                ? 'border-[#00f0ff]/60 bg-[#00f0ff]/10 text-[#00f0ff]'
                : 'border-[#2d3748] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* Sound FX synthesizer toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan Audio Cyber' : 'Aktifkan Audio Sintesis Cyber'}
            aria-label="Toggle cyber audio"
            className={`p-2 text-xs border rounded transition-colors ${
              soundEnabled
                ? 'border-[#ff0055]/60 bg-[#ff0055]/10 text-[#ff0055]'
                : 'border-[#2d3748] text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              cyberAudio.playOpen();
              onOpenTerminal();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-black bg-[#00f0ff] hover:bg-[#33f3ff] transition-all cyber-chamfer-sm shadow-[0_0_12px_rgba(0,240,255,0.4)] whitespace-nowrap"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>TERMINAL &gt;_</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              cyberAudio.playBlip(500);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-slate-400 hover:text-white border border-[#2d3748] rounded"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1f2937] bg-[#0c0d14] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block px-3 py-2 text-sm text-slate-300 hover:text-[#00f0ff] hover:bg-[#161926] rounded transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#1f2937] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                cyberAudio.playOpen();
                onOpenTerminal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono font-bold text-black bg-[#00f0ff] cyber-chamfer-sm"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>BUKA CYBER TERMINAL CLI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
