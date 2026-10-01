import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, MessageSquare, ArrowRight, X, Copy, Check, Send, Search } from 'lucide-react';
import { BlogPost, BlogComment } from '../types/portfolio';
import { BLOG_POSTS, INITIAL_COMMENTS } from '../data/portfolioData';
import { cyberAudio } from '../utils/audio';

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [commentsMap, setCommentsMap] = useState<Record<string, BlogComment[]>>(() => {
    try {
      const saved = localStorage.getItem('cyber_blog_comments');
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cyber_blog_liked');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Comment Form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newHandle, setNewHandle] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  // Sync comments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cyber_blog_comments', JSON.stringify(commentsMap));
    } catch {
      // ignore
    }
  }, [commentsMap]);

  // Sync likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cyber_blog_liked', JSON.stringify(likedPosts));
    } catch {
      // ignore
    }
  }, [likedPosts]);

  // Extract all unique tags
  const allTags = ['all', ...Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags)))];

  const filteredPosts = posts.filter((post) => {
    const matchTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return matchTag && matchSearch;
  });

  const handleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    cyberAudio.playPulse();

    const isCurrentlyLiked = !!likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isCurrentlyLiked }));

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isCurrentlyLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );

    if (activePost && activePost.id === postId) {
      setActivePost((prev) => (prev ? { ...prev, likes: isCurrentlyLiked ? prev.likes - 1 : prev.likes + 1 } : null));
    }
  };

  const openReader = (post: BlogPost) => {
    cyberAudio.playOpen();
    setActivePost(post);
  };

  const closeReader = () => {
    cyberAudio.playClose();
    setActivePost(null);
  };

  const handleCopyCode = (code: string, idx: number) => {
    cyberAudio.playBlip(1200);
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !newCommentText.trim()) return;

    cyberAudio.playPulse();

    const authorName = newAuthor.trim() || 'Netizen Anonim';
    const cleanHandle = newHandle.trim() ? (newHandle.startsWith('@') ? newHandle : `@${newHandle}`) : '@mesh_node';
    const initials = authorName.substring(0, 2).toUpperCase();

    const newComment: BlogComment = {
      id: 'c_' + Date.now(),
      author: authorName,
      handle: cleanHandle,
      avatarSeed: initials,
      timestamp: 'Baru saja',
      content: newCommentText.trim(),
    };

    setCommentsMap((prev) => ({
      ...prev,
      [activePost.id]: [newComment, ...(prev[activePost.id] || [])],
    }));

    setNewCommentText('');
  };

  return (
    <section id="jurnal" className="py-20 md:py-28 bg-[#07080b] border-b border-[#1f2937]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 bg-[#00f0ff]" />
              <span>JURNAL TEKNIKAL &amp; DEVLOG</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">CYBERNETIC INSIGHTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Eksplorasi Kode, Grafika, &amp; Arsitektur
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md font-sans">
            Catatan mendalam seputar WebGL fragment shaders, rekayasa audio peramban, optimasi rendering DOM, dan protokol data terdistribusi.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1f2937]/60">
          {/* Tag filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {allTags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    cyberAudio.playBlip(750);
                    setSelectedTag(tag);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-mono whitespace-nowrap transition-all cursor-pointer cyber-chamfer-sm ${
                    active
                      ? 'bg-[#ff0055] text-white font-semibold shadow-[0_0_12px_rgba(255,0,85,0.4)]'
                      : 'bg-[#10131d] text-slate-400 hover:text-white border border-[#1f2937]'
                  }`}
                >
                  {tag === 'all' ? 'Semua Topik' : `#${tag}`}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari artikel devlog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-sans bg-[#10131d] border border-[#1f2937] text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] cyber-chamfer-sm"
            />
          </div>
        </div>

        {/* Articles List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const postComments = commentsMap[post.id] || [];

            return (
              <article
                key={post.id}
                onClick={() => openReader(post)}
                className="group bg-[#0b0e15] border border-[#1f2937] hover:border-[#00f0ff]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cyber-chamfer-sm cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-[#121622]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 bg-[#07080b]/80 border border-[#1f2937] px-2.5 py-0.5 text-[11px] font-mono text-[#00f0ff]">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <span>{post.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-white group-hover:text-[#00f0ff] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Article Footer Stats & Action */}
                <div className="px-5 pb-5 pt-3 border-t border-[#161a26] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    {/* Like button */}
                    <button
                      onClick={(e) => handleLike(post.id, e)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLiked ? 'text-[#ff0055] font-semibold' : 'hover:text-[#ff0055]'
                      }`}
                      title="Sukai tulisan ini"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#ff0055]' : ''}`} />
                      <span className="tabular-nums">{post.likes}</span>
                    </button>

                    {/* Comments count */}
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{postComments.length}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                    <span>Baca Devlog</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Full Article Reader Modal */}
        {activePost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={closeReader}
          >
            <div
              className="relative w-full max-w-3xl bg-[#0b0e16] border border-[#00f0ff]/50 shadow-[0_0_60px_rgba(0,240,255,0.2)] cyber-chamfer-tl-br p-6 sm:p-10 my-8 text-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeReader}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white border border-[#2d3748] hover:border-[#ff0055] transition-colors cyber-chamfer-sm cursor-pointer"
                aria-label="Tutup reader"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Reader Header */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase">
                  <span>{activePost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400">{activePost.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400">{activePost.readTime}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white leading-tight">
                  {activePost.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activePost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 cyber-chamfer-sm border border-[#00f0ff]/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cover Banner */}
              <div className="aspect-[21/9] overflow-hidden border border-[#1f2937] mb-8 bg-[#07080b]">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lead Paragraph */}
              <div className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans mb-8 border-l-2 border-[#00f0ff] pl-4 italic">
                {activePost.content.lead}
              </div>

              {/* Article Content Sections */}
              <div className="space-y-8 font-sans text-sm sm:text-base text-slate-300 leading-relaxed mb-10">
                {activePost.content.sections.map((section, idx) => (
                  <div key={section.heading} className="space-y-4">
                    <h2 className="text-xl font-bold font-display text-white tracking-tight border-b border-[#1f2937] pb-2">
                      {section.heading}
                    </h2>

                    {section.body.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}

                    {/* Code Snippet Box */}
                    {section.codeSnippet && (
                      <div className="relative mt-4 mb-4 bg-[#050609] border border-[#1f2937] p-4 cyber-chamfer-sm font-mono text-xs">
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1f2937] text-slate-400">
                          <span className="uppercase text-[#00f0ff]">{section.codeSnippet.language}</span>
                          <button
                            onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                            className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer transition-colors"
                          >
                            {copiedCodeIdx === idx ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin Kode</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="overflow-x-auto text-[#cbd5e1] leading-relaxed">
                          <code>{section.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    {/* Quote Callout */}
                    {section.quote && (
                      <blockquote className="p-4 bg-[#0f131d] border-l-4 border-[#ff0055] text-slate-200 text-sm font-mono italic my-4">
                        &ldquo;{section.quote}&rdquo;
                      </blockquote>
                    )}
                  </div>
                ))}

                {/* Conclusion */}
                <div className="p-5 bg-[#0f1422] border border-[#1f2937] cyber-chamfer-sm space-y-2 mt-8">
                  <h3 className="text-base font-bold font-display text-[#00f0ff]">Kesimpulan Teknis</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activePost.content.conclusion}
                  </p>
                </div>
              </div>

              {/* Like / Reaction Bar */}
              <div className="flex items-center justify-between py-4 border-y border-[#1f2937] mb-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(activePost.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium border cyber-chamfer-sm transition-all cursor-pointer ${
                      likedPosts[activePost.id]
                        ? 'border-[#ff0055] bg-[#ff0055]/20 text-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.4)]'
                        : 'border-[#2d3748] text-slate-300 hover:border-[#ff0055] hover:text-[#ff0055]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts[activePost.id] ? 'fill-[#ff0055]' : ''}`} />
                    <span>Suka Artikel ({activePost.likes})</span>
                  </button>
                </div>

                <div className="text-xs font-mono text-slate-400">
                  <span>{(commentsMap[activePost.id] || []).length} Transmisi Respon</span>
                </div>
              </div>

              {/* Comments / Discussion Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#00f0ff]" />
                  <span>Diskusi &amp; Respon Pembaca</span>
                </h3>

                {/* New Comment Submission Form */}
                <form onSubmit={handleAddComment} className="p-4 bg-[#0a0c13] border border-[#1f2937] space-y-3 cyber-chamfer-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama / Alias Anda (cth: Alex Mercer)"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="px-3 py-2 text-xs font-sans bg-[#10131d] border border-[#1f2937] text-white focus:outline-none focus:border-[#00f0ff] cyber-chamfer-sm"
                    />
                    <input
                      type="text"
                      placeholder="Handle (cth: @alex_dev)"
                      value={newHandle}
                      onChange={(e) => setNewHandle(e.target.value)}
                      className="px-3 py-2 text-xs font-mono bg-[#10131d] border border-[#1f2937] text-white focus:outline-none focus:border-[#00f0ff] cyber-chamfer-sm"
                    />
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="Tulis opini teknis, tanggapan, atau pertanyaan seputar artikel ini..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-sans bg-[#10131d] border border-[#1f2937] text-white focus:outline-none focus:border-[#00f0ff] cyber-chamfer-sm resize-none"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-black bg-[#00f0ff] hover:bg-[#3af3ff] transition-all cyber-chamfer-sm shadow-[0_0_12px_rgba(0,240,255,0.4)] cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Respon</span>
                    </button>
                  </div>
                </form>

                {/* Render Existing Comments */}
                <div className="space-y-3 pt-2">
                  {(commentsMap[activePost.id] || []).length === 0 ? (
                    <p className="text-xs font-mono text-slate-500 italic">Belum ada respon. Jadilah yang pertama memberikan analisis!</p>
                  ) : (
                    (commentsMap[activePost.id] || []).map((comm) => (
                      <div key={comm.id} className="p-3.5 bg-[#0e111a] border border-[#191f2c] cyber-chamfer-sm space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff] flex items-center justify-center font-mono text-[10px] font-bold">
                              {comm.avatarSeed}
                            </span>
                            <span className="font-semibold text-white font-sans">{comm.author}</span>
                            <span className="font-mono text-slate-400 text-[11px]">{comm.handle}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500 tabular-nums">{comm.timestamp}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pl-8">
                          {comm.content}
                        </p>
                      </div>
                    ))
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
