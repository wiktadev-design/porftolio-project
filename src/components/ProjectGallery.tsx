import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Github, Eye, X, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { cyberAudio } from '../utils/audio';

interface ProjectGalleryProps {
  onSelectProject?: (project: Project) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [simulatingLive, setSimulatingLive] = useState(false);

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'Semua Karya' },
    { key: 'web-systems', label: 'Web Systems' },
    { key: 'creative-tech', label: 'Creative Tech' },
    { key: 'cybernetics', label: 'Cybernetics & 3D' },
    { key: 'tools', label: 'Tools & Mobile' },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        project.client.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const openProjectModal = (proj: Project) => {
    cyberAudio.playOpen();
    setActiveModalProject(proj);
    setSimulatingLive(false);
  };

  const closeProjectModal = () => {
    cyberAudio.playClose();
    setActiveModalProject(null);
    setSimulatingLive(false);
  };

  return (
    <section id="karya" className="py-20 md:py-28 bg-[#090b10] border-b border-[#1f2937]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 bg-[#00f0ff]" />
              <span>GALERI KARYA PILIHAN</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">PRODUKSI &amp; EKSPERIMENTAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Arsitektur Sistem &amp; Eksplorasi Digital
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md font-sans">
            Kumpulan proyek sistem berskala penuh, simulasi 3D spatial, dan rekayasa antarmuka dengan performa tinggi yang telah di-deploy.
          </p>
        </div>

        {/* Filter Toolbar (Segmented Controls & Search) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1f2937]/60">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    cyberAudio.playBlip(780);
                    setSelectedCategory(cat.key);
                  }}
                  className={`px-4 py-2 text-xs font-medium whitespace-nowrap transition-all cursor-pointer cyber-chamfer-sm ${
                    active
                      ? 'bg-[#00f0ff] text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                      : 'bg-[#10131d] text-slate-400 hover:text-white hover:bg-[#161a29] border border-[#1f2937]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari teknologi, judul, atau tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-sans bg-[#10131d] border border-[#1f2937] text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all cyber-chamfer-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Project Bento Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#1f2937] bg-[#0c0e16] p-8">
            <Cpu className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-white font-display text-lg mb-1">Tidak ada karya yang cocok</p>
            <p className="text-slate-400 text-xs mb-4">Coba sesuaikan kata kunci pencarian atau ubah filter kategori.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 text-xs font-mono text-[#00f0ff] border border-[#00f0ff]/40 hover:bg-[#00f0ff]/10 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx === 0 && selectedCategory === 'all';
              return (
                <div
                  key={project.id}
                  className={`group relative bg-[#0b0e15] border border-[#1f2937] hover:border-[#00f0ff]/60 transition-all duration-300 flex flex-col overflow-hidden cyber-chamfer-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${
                    isLarge ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Image Showcase Container */}
                  <div className="relative aspect-video overflow-hidden bg-[#121520]">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15] via-transparent to-transparent opacity-80" />

                    {/* Unboxed Top Kicker Badge */}
                    <div className="absolute top-3 left-3 bg-[#07080b]/80 backdrop-blur-sm border border-[#1f2937] px-2.5 py-1 text-[11px] font-mono text-[#00f0ff]">
                      {project.categoryLabel}
                    </div>

                    {/* Quick Preview Action Overlay */}
                    <button
                      onClick={() => openProjectModal(project)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] cursor-pointer"
                      aria-label={`Lihat detail ${project.title}`}
                    >
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-black bg-[#00f0ff] cyber-chamfer-sm shadow-[0_0_15px_#00f0ff]">
                        <Eye className="w-4 h-4" />
                        <span>INSPEKSI KARYA</span>
                      </span>
                    </button>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Zero-Pill Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span className="text-slate-300 font-medium">{project.client}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.year}</span>
                        {project.readTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{project.readTime}</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-display text-white group-hover:text-[#00f0ff] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      {/* Tagline / Excerpt */}
                      <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Technical Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#08090f] border border-[#171b26] text-center">
                      {project.stats.map((st) => (
                        <div key={st.label}>
                          <div className="text-xs font-bold text-white font-mono tabular-nums">{st.value}</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">{st.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Tags & Detail Trigger */}
                    <div className="pt-2 border-t border-[#181d2a] flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1 text-[11px] text-slate-400 font-mono">
                        {project.tags.slice(0, 3).map((tag, tIdx) => (
                          <span key={tag}>
                            {tag}
                            {tIdx < 2 && <span className="text-slate-600 ml-1">/</span>}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => openProjectModal(project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#00f0ff] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Detail</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Lightbox for Full Project Case Study */}
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={closeProjectModal}
          >
            <div
              className="relative w-full max-w-4xl bg-[#0b0e16] border border-[#00f0ff]/50 shadow-[0_0_50px_rgba(0,240,255,0.2)] cyber-chamfer-tl-br p-6 sm:p-8 my-8 text-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white border border-[#2d3748] hover:border-[#ff0055] transition-colors cyber-chamfer-sm cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] mb-2 uppercase">
                <span>{activeModalProject.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{activeModalProject.client}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400 tabular-nums">{activeModalProject.year}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                {activeModalProject.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base font-sans mb-6">
                {activeModalProject.tagline}
              </p>

              {/* High-Resolution Showcase Visual */}
              <div className="relative aspect-video overflow-hidden border border-[#1f2937] bg-black mb-6">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-[#07080b]/90 border border-[#00f0ff]/40 px-3 py-1 text-xs font-mono text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>SISTEM AKTIF: {activeModalProject.stats[0]?.value}</span>
                </div>
              </div>

              {/* Two Column Architectural Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2 p-4 bg-[#0e111a] border border-[#1c2232]">
                  <div className="text-xs font-mono text-[#ff0055] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tantangan Arsitektur</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {activeModalProject.challenge}
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-[#0e111a] border border-[#1c2232]">
                  <div className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Solusi Rekayasa</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Telemetry Stats Bar */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#07090e] border border-[#171b26] mb-6 text-center">
                {activeModalProject.stats.map((st) => (
                  <div key={st.label}>
                    <div className="text-lg font-bold font-mono text-[#00f0ff] tabular-nums">{st.value}</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack List */}
              <div className="mb-8">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Teknologi &amp; Spesifikasi Komponen:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((tg) => (
                    <span
                      key={tg}
                      className="px-2.5 py-1 text-xs font-mono text-slate-200 bg-[#141926] border border-[#222a3e] cyber-chamfer-sm"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulated Interactive Preview Box (Functional handler) */}
              {simulatingLive && (
                <div className="mb-6 p-4 bg-[#050608] border border-[#00f0ff] text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between text-[#00f0ff]">
                    <span>[SIMULASI RUNTIME TERKONEKSI: {activeModalProject.id}.local]</span>
                    <span className="text-emerald-400">LATENCY: 4.2ms</span>
                  </div>
                  <div className="text-slate-400">
                    &gt; Menyiapkan WebGL Context 2.0... OK<br />
                    &gt; Memuat shader pipeline &amp; compute textures... SELESAI (12ms)<br />
                    &gt; Stream data sensorik aktif. Buffer: 1024kb. 60 FPS terkunci.
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1f2937]">
                <button
                  onClick={() => {
                    cyberAudio.playPulse();
                    setSimulatingLive(!simulatingLive);
                  }}
                  className="px-4 py-2 text-xs font-mono font-medium text-white border border-[#2d3748] hover:border-[#00f0ff] bg-[#121624] transition-colors cyber-chamfer-sm cursor-pointer"
                >
                  {simulatingLive ? 'Hentikan Runtime Sandbox' : 'Uji Sandbox Runtime'}
                </button>

                <div className="flex items-center gap-3">
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => cyberAudio.playBlip(800)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono text-slate-300 border border-[#2d3748] hover:text-white hover:border-slate-500 bg-[#10131d] transition-colors cyber-chamfer-sm"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Kode Sumber</span>
                    </a>
                  )}

                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => cyberAudio.playPulse()}
                      className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold text-black bg-[#00f0ff] hover:bg-[#3bf3ff] transition-all cyber-chamfer-sm shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                      <span>Akses Live Prototype</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
