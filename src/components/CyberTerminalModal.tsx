import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { DEVELOPER_PROFILE, PROJECTS, BLOG_POSTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { cyberAudio } from '../utils/audio';

interface CyberTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const CyberTerminalModal: React.FC<CyberTerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'init-1',
      command: 'sys.init --verbose',
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-[#00f0ff] font-bold">NEURONET CYBER-DECK TERMINAL v4.2</div>
          <div>Node: wikta.dev // Target: 8e19768a-2c63-481b</div>
          <div>Ketik <span className="text-[#00f0ff] font-bold">help</span> untuk melihat daftar instruksi yang tersedia.</div>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    cyberAudio.playKey();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const nextIndex = cmdIndex + 1 < pastCommands.length ? cmdIndex + 1 : cmdIndex;
      setCmdIndex(nextIndex);
      setInputVal(pastCommands[pastCommands.length - 1 - nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIndex = cmdIndex - 1;
        setCmdIndex(nextIndex);
        setInputVal(pastCommands[pastCommands.length - 1 - nextIndex] || '');
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInputVal('');
      }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;

    cyberAudio.playPulse();
    setPastCommands((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let outputNode: React.ReactNode;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-[#00f0ff] font-bold mb-1">DAFTAR PERINTAH CYBERNETIC:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <div><span className="text-[#00f0ff] font-bold">projects</span> (atau karya): Daftar karya unggulan</div>
              <div><span className="text-[#00f0ff] font-bold">blog</span> (atau jurnal): Daftar artikel devlog</div>
              <div><span className="text-[#00f0ff] font-bold">skills</span> (atau keahlian): Matriks spesifikasi tech</div>
              <div><span className="text-[#00f0ff] font-bold">bio</span> (atau tentang): Ringkasan profil pengembang</div>
              <div><span className="text-[#00f0ff] font-bold">contact</span> (atau kontak): Saluran komunikasi &amp; sosial</div>
              <div><span className="text-[#00f0ff] font-bold">matrix</span>: Simulasi aliran kode matrix cyber</div>
              <div><span className="text-[#00f0ff] font-bold">date</span>: Tampilkan stardate &amp; waktu lokal</div>
              <div><span className="text-[#00f0ff] font-bold">echo &lt;teks&gt;</span>: Cetak ulang teks ke konsol</div>
              <div><span className="text-[#00f0ff] font-bold">clear</span>: Bersihkan layar terminal</div>
              <div><span className="text-[#00f0ff] font-bold">exit</span>: Tutup antarmuka terminal</div>
            </div>
          </div>
        );
        break;

      case 'projects':
      case 'karya':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#00f0ff] font-bold">GALERI KARYA AKTIF:</div>
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="p-2 bg-[#121624] border border-[#1f2937] cyber-chamfer-sm">
                <div className="text-white font-bold">{i + 1}. {p.title} ({p.year})</div>
                <div className="text-slate-400">{p.description}</div>
                <div className="text-[#00f0ff] text-[11px] pt-1">Stack: {p.tags.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'blog':
      case 'jurnal':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#ff0055] font-bold">DEVLOG &amp; ARTIKEL TERBARU:</div>
            {BLOG_POSTS.map((b, i) => (
              <div key={b.id} className="p-2 bg-[#121624] border border-[#1f2937] cyber-chamfer-sm">
                <div className="text-white font-bold">{i + 1}. {b.title}</div>
                <div className="text-slate-400 text-[11px]">{b.publishedAt} · {b.readTime} · Suka: {b.likes}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
      case 'keahlian':
        outputNode = (
          <div className="space-y-3 text-xs">
            <div className="text-[#00f0ff] font-bold">MATRIKS KEAHLIAN KOMPUTASI:</div>
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.categoryCode} className="space-y-1">
                <div className="text-[#f59e0b] font-bold">{cat.title}:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300">
                  {cat.skills.map((s) => (
                    <div key={s.name}>&gt; {s.name}: <span className="text-[#00f0ff] font-mono">{s.level}%</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'bio':
      case 'tentang':
        outputNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-white font-bold text-sm">{DEVELOPER_PROFILE.name} // {DEVELOPER_PROFILE.alias}</div>
            <div className="text-[#00f0ff]">{DEVELOPER_PROFILE.title}</div>
            <p className="leading-relaxed">{DEVELOPER_PROFILE.bio}</p>
            <div className="text-slate-400">Lokasi: {DEVELOPER_PROFILE.location} // Status: {DEVELOPER_PROFILE.availability}</div>
          </div>
        );
        break;

      case 'contact':
      case 'kontak':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#00f0ff] font-bold">SALURAN KOMUNIKASI &amp; JARINGAN:</div>
            {DEVELOPER_PROFILE.socials.map((s) => (
              <div key={s.name} className="flex gap-2">
                <span className="text-slate-400 w-24">{s.name}:</span>
                <span className="text-white font-bold">{s.handle}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'matrix':
        outputNode = (
          <div className="text-emerald-400 font-mono text-[11px] leading-tight space-y-0.5">
            <div>01001110 01000101 01010101 01010010 01001111 01001110 01000101 01010100</div>
            <div>&gt;&gt; WAKE UP, NETIZEN... THE MATRIX HAS YOU.</div>
            <div>[0xFA789] KERNEL_MEM_ALLOC: 4096 MB OK</div>
            <div>[0xFA790] GPU_SHADER_PIPELINE: INITIALIZED AT 60.00 FPS</div>
            <div>[0xFA791] QUANTUM_ENTANGLEMENT_MESH: STABLE (99.98%)</div>
          </div>
        );
        break;

      case 'date':
        outputNode = (
          <div className="text-xs text-slate-300">
            Waktu Sistem: <span className="text-[#00f0ff] font-mono">{new Date().toLocaleString('id-ID')}</span>
          </div>
        );
        break;

      case 'echo':
        outputNode = <div className="text-xs text-slate-200">{args || ''}</div>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInputVal('');
        return;

      default:
        outputNode = (
          <div className="text-xs text-[#ff0055]">
            Instruksi tidak dikenali: &ldquo;{cmd}&rdquo;. Ketik <span className="underline font-bold text-white">help</span> untuk daftar perintah.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: 'cmd-' + Date.now(),
        command: rawCmd,
        output: outputNode,
      },
    ]);

    setInputVal('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative w-full bg-[#07090e] border border-[#00f0ff]/60 shadow-[0_0_50px_rgba(0,240,255,0.25)] flex flex-col font-mono text-slate-200 overflow-hidden cyber-chamfer-tl-br transition-all duration-300 ${
          isExpanded ? 'max-w-6xl h-[90vh]' : 'max-w-2xl h-[560px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e121d] border-b border-[#1f2937]">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <TerminalIcon className="w-4 h-4 text-[#00f0ff]" />
            <span>NEURONET_SHELL // DEV_CONSOLE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title={isExpanded ? 'Perkecil' : 'Perbesar'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                cyberAudio.playClose();
                onClose();
              }}
              className="p-1 text-slate-400 hover:text-[#ff0055] transition-colors"
              title="Tutup Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen / Output Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono select-text">
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[#00f0ff] font-bold">root@neuronet:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-[#1f2937] py-1">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Row */}
        <form
          onSubmit={handleCommandSubmit}
          className="p-3 bg-[#0a0d16] border-t border-[#1f2937] flex items-center gap-2"
        >
          <span className="text-[#00f0ff] text-xs font-bold shrink-0">root@neuronet:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik 'help'..."
            className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="p-1.5 text-xs text-black bg-[#00f0ff] hover:bg-[#3bf3ff] cyber-chamfer-sm transition-colors cursor-pointer"
            title="Kirim Perintah"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
