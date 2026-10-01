/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { BlogSection } from './components/BlogSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CyberTerminalModal } from './components/CyberTerminalModal';
import { Footer } from './components/Footer';
import { cyberAudio } from './utils/audio';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('cyber_sound_enabled') === 'true';
    } catch {
      return false;
    }
  });

  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(() => {
    try {
      const val = localStorage.getItem('cyber_scanlines_enabled');
      return val !== null ? val === 'true' : true;
    } catch {
      return true;
    }
  });

  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('karya');

  // Sync sound settings with audio engine
  useEffect(() => {
    cyberAudio.enabled = soundEnabled;
    try {
      localStorage.setItem('cyber_sound_enabled', String(soundEnabled));
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  // Sync scanlines settings
  useEffect(() => {
    try {
      localStorage.setItem('cyber_scanlines_enabled', String(scanlinesEnabled));
    } catch {
      // ignore
    }
  }, [scanlinesEnabled]);

  // Keyboard shortcut: Press `~` or `Ctrl+K` to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active scroll section
  useEffect(() => {
    const sections = ['karya', 'jurnal', 'keahlian', 'tentang', 'kontak'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      cyberAudio.enabled = true;
      cyberAudio.playOpen();
    }
  };

  const handleToggleScanlines = () => {
    setScanlinesEnabled((prev) => !prev);
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('karya');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-[#cbd5e1] font-sans relative selection:bg-[#00f0ff] selection:text-black">
      {/* Optional CRT Scanlines Layer */}
      {scanlinesEnabled && (
        <div className="fixed inset-0 z-50 pointer-events-none scanlines-overlay opacity-60" />
      )}

      {/* Top 3-Zone Navigation Bar */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        scanlinesEnabled={scanlinesEnabled}
        onToggleScanlines={handleToggleScanlines}
        onOpenTerminal={() => setTerminalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onExploreProjects={handleExploreProjects}
        />

        {/* Galeri Karya Section */}
        <ProjectGallery />

        {/* Fitur Blog / Devlog Section */}
        <BlogSection />

        {/* Keahlian & Matriks Rekayasa Section */}
        <SkillsMatrix />

        {/* Profil & Timeline Section */}
        <AboutSection />

        {/* Kontak & Transmisi Section */}
        <ContactSection />
      </main>

      {/* Interactive Cyber Terminal CLI Modal */}
      <CyberTerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Clean Anti-Slop Footer */}
      <Footer />
    </div>
  );
}
