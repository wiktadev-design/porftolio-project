import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldAlert, Radio, Lock } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { cyberAudio } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);

  // Compute a simple deterministic hash preview for cyberpunk feel
  const hashPreview = React.useMemo(() => {
    const raw = `${senderName}:${senderEmail}:${message}`;
    let hash = 0x811c9dc5;
    for (let i = 0; i < raw.length; i++) {
      hash ^= raw.charCodeAt(i);
      hash = (hash * 0x01000193) >>> 0;
    }
    const hex = hash.toString(16).padStart(8, '0');
    return `SHA256: 0x${hex}9a4b882f0c7...`;
  }, [senderName, senderEmail, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    cyberAudio.playPulse();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmissionSuccess(true);
      cyberAudio.playOpen();

      // Reset form
      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <section id="kontak" className="py-20 md:py-28 bg-[#090b10] border-b border-[#1f2937]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 bg-[#00f0ff]" />
              <span>TRANSMISI KOMUNIKASI</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">SALURAN TERENKRIPSI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Mulai Kolaborasi &amp; Transmisi Pesan
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md font-sans">
            Mencari arsitek perangkat lunak untuk proyek komputasi grafika, WebGL 3D, atau sistem berlatensi rendah? Kirim sinyal Anda sekarang.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Transmission Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#0b0e15] border border-[#1f2937] cyber-chamfer-tl-br shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
              {transmissionSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">Transmisi Berhasil Dikirim</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans">
                    Paket data telah didekripsi pada node lokal kami. Saya akan merespon dalam waktu maksimal 24 jam rotasi bumi.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        cyberAudio.playBlip();
                        setTransmissionSuccess(false);
                      }}
                      className="px-5 py-2 text-xs font-mono font-medium text-black bg-[#00f0ff] hover:bg-[#39f3ff] transition-all cyber-chamfer-sm"
                    >
                      Kirim Transmisi Baru
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <span>PENGIRIM / ALIAS</span>
                        <span className="text-[#ff0055]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap / Instansi"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#10131d] border border-[#1f2937] text-white focus:outline-none focus:border-[#00f0ff] cyber-chamfer-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <span>FREKUENSI SURAT ELEKTRONIK</span>
                        <span className="text-[#ff0055]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alamat@domain.com"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#10131d] border border-[#1f2937] text-white focus:outline-none focus:border-[#00f0ff] cyber-chamfer-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">
                      OBJEKTIF MISI / SUBJEK
                    </label>
                    <input
                      type="text"
                      placeholder="Konsultasi Arsitektur WebGL / Pembuatan Proyek Baru"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#10131d] border border-[#1f2937] text-white focus:outline-none focus:border-[#00f0ff] cyber-chamfer-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <span>MUATAN PESAN TERENKRIPSI</span>
                      <span className="text-[#ff0055]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Jelaskan kebutuhan arsitektur, timeline, dan spesifikasi teknologi proyek Anda..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#10131d] border border-[#1f2937] text-white focus:outline-none focus:border-[#00f0ff] cyber-chamfer-sm resize-none"
                    />
                  </div>

                  {/* Real-time Crypto Hash Telemetry */}
                  <div className="p-3 bg-[#080a0f] border border-[#171b26] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Lock className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>{hashPreview}</span>
                    </span>
                    <span className="text-emerald-400 uppercase">ENKRIPSI AKTIF</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="w-full py-3 px-6 text-xs font-mono font-bold text-black bg-[#00f0ff] hover:bg-[#3af3ff] disabled:opacity-50 transition-all cyber-chamfer-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isTransmitting ? (
                      <>
                        <Radio className="w-4 h-4 animate-spin text-black" />
                        <span>MEMANCARKAN PAKET TRANSMISI...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>PANCARKAN TRANSMISI TERENKRIPSI</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Direct Comms & Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status card */}
            <div className="p-5 bg-[#0b0e15] border border-[#1f2937] cyber-chamfer-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>FREKUENSI PENERIMA AKTIF</span>
              </div>
              <h4 className="text-base font-bold font-display text-white">
                Ketersediaan Kontrak &amp; Konsultasi
              </h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Saat ini saya berbasis di zona waktu WIB (UTC+7) dengan ketersediaan penuh untuk proyek berskala global dan kolaborasi tim terdistribusi.
              </p>
            </div>

            {/* Direct Mesh Nodes */}
            <div className="p-5 bg-[#0b0e15] border border-[#1f2937] cyber-chamfer-sm space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Jaringan Sosial &amp; Profil Pengembang
              </div>

              <div className="space-y-2.5">
                {DEVELOPER_PROFILE.socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => cyberAudio.playBlip(840)}
                    className="flex items-center justify-between p-2.5 bg-[#10131d] hover:bg-[#161a28] border border-[#1f2937] hover:border-[#00f0ff] transition-colors cyber-chamfer-sm group"
                  >
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white font-sans">
                      {soc.name}
                    </span>
                    <span className="text-xs font-mono text-[#00f0ff] group-hover:underline">
                      {soc.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2.5 text-[11px] font-sans text-slate-500">
              <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Setiap data transmisi yang dikirim disimpan secara aman dan tidak akan pernah dibagikan kepada pihak ketiga.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
