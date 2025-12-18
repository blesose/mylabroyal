import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import { 
  Heart,
  Bookmark,
  Sparkles,
  Share2,
  Twitter,
  Facebook,
  MessageCircle,
  Linkedin,
  ChevronUp,
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import articles from "./articles";

// KEY for localStorage favorites
const FAVORITES_KEY = "tatt:fav_articles_v1";

// Custom toast notification component
const CustomToast = ({ icon, message, actionText, onAction }) => (
  <div className="flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40">
    {icon}
    <div className="flex-1">
      <p className="font-medium text-gray-800">{message}</p>
    </div>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="px-3 py-1 text-sm bg-gradient-to-r from-[#B1D182] to-[#688F48] text-white rounded-lg hover:shadow-lg transition-shadow"
      >
        {actionText}
      </button>
    )}
  </div>
);

// Parse article.content into sections
function parseSections(content) {
  const raw = content.split("\n");
  const sections = [];
  let current = { id: "intro", title: "Introduction", lines: [] };

  raw.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      if (current.lines.length || current.title) sections.push(current);
      const title = trimmed.replace(/\*\*/g, "");
      const id = title.toLowerCase().replace(/[^a-z0-9]+/gi, "-");
      current = { id, title, lines: [] };
    } else {
      current.lines.push(line);
    }
  });

  if (current) sections.push(current);
  return sections;
}

const ArticleDetails = () => {
  const { id } = useParams();
  const article = useMemo(
    () => articles.find((a) => a.id === Number(id)),
    [id]
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [bookmarkedSections, setBookmarkedSections] = useState([]);
  const [copied, setCopied] = useState(false);

  const sections = useMemo(() => (article ? parseSections(article.content) : []), [article]);

  const tocRef = useRef({});
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!article) return;
    if (!article.images || article.images.length === 0) return;
    if (!autoPlay) return;
    const idt = setInterval(() => {
      setCurrentImage((p) => (p + 1) % article.images.length);
    }, 4200);
    return () => clearInterval(idt);
  }, [article, autoPlay]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!sections.length) return;
    const options = { root: null, rootMargin: "0px 0px -40% 0px", threshold: 0 };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          Object.values(tocRef.current).forEach((el) => el?.classList?.remove("active"));
          const tocItem = document.querySelector(`[data-toc="${id}"]`);
          if (tocItem) tocItem.classList.add("active");
        }
      });
    }, options);

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [sections]);

  const toggleFavorite = () => {
    setFavorites((prev) => {
      const next = prev.includes(article.id) 
        ? prev.filter((i) => i !== article.id) 
        : [...prev, article.id];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {}
      
      // Show toast notification
      if (next.includes(article.id)) {
        toast.custom((t) => (
          <CustomToast
            icon={<Heart className="w-6 h-6 text-[#D64545] fill-[#D64545]" />}
            message="Article saved to favorites!"
            actionText="View All"
            onAction={() => {
              toast.dismiss(t.id);
              // Navigate to favorites page if you have one
            }}
          />
        ), {
          duration: 3000,
          position: "bottom-right",
        });
      } else {
        toast.custom((t) => (
          <CustomToast
            icon={<X className="w-6 h-6 text-gray-600" />}
            message="Removed from favorites"
          />
        ), {
          duration: 2000,
          position: "bottom-right",
        });
      }
      
      return next;
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    const title = article?.title || "Check out this article";
    
    if (navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: title,
        text: "I found this insightful article on female health education:",
        url: url,
      })
      .then(() => {
        toast.custom((t) => (
          <CustomToast
            icon={<Share2 className="w-6 h-6 text-[#688F48]" />}
            message="Shared successfully!"
          />
        ), {
          duration: 2000,
          position: "bottom-right",
        });
      })
      .catch((error) => {
        console.log('Sharing failed:', error);
        copyToClipboard();
      });
    } else {
      // Fallback to clipboard copy
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        toast.custom((t) => (
          <CustomToast
            icon={<Check className="w-6 h-6 text-green-500" />}
            message="Link copied to clipboard!"
            actionText="Share"
            onAction={() => {
              toast.dismiss(t.id);
              if (navigator.share) {
                navigator.share({
                  title: article?.title,
                  text: "Check out this article:",
                  url: url,
                });
              }
            }}
          />
        ), {
          duration: 3000,
          position: "bottom-right",
        });
      })
      .catch((err) => {
        toast.error("Failed to copy link");
        console.error('Copy failed:', err);
      });
  };

  const handleShareSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article?.title || "Check out this article");
    
    let shareUrl = '';
    let platformName = '';
    let Icon = Share2;
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        platformName = 'Twitter';
        Icon = Twitter;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        platformName = 'Facebook';
        Icon = Facebook;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        platformName = 'LinkedIn';
        Icon = Linkedin;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        platformName = 'WhatsApp';
        Icon = MessageCircle;
        break;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    
    toast.custom((t) => (
      <CustomToast
        icon={<Icon className="w-6 h-6 text-[#688F48]" />}
        message={`Sharing via ${platformName}`}
      />
    ), {
      duration: 2000,
      position: "bottom-right",
    });
  };

  if (!article) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#ECF9F3] via-[#F0FFF5] to-[#F4F1E9]"
      >
        <Toaster />
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <p className="text-gray-700 text-lg">Article not found.</p>
          <Link to="/female-health/education" className="text-green-700 hover:text-green-800 underline mt-4 block text-center">
            ← Back to Education Hub
          </Link>
        </div>
      </motion.div>
    );
  }

  const isFavorite = favorites.includes(article.id);

  const getTips = () =>
    article.content
      .split("\n")
      .filter((l) => l.trim().startsWith("-"))
      .map((t) => t.replace(/^-/, "").trim());

  const toggleBookmarkSection = (sectionId) => {
    setBookmarkedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
    
    toast.custom((t) => (
      <CustomToast
        icon={<Bookmark className="w-6 h-6 text-[#688F48]" />}
        message={bookmarkedSections.includes(sectionId) 
          ? "Section bookmark removed" 
          : "Section bookmarked!"
        }
      />
    ), {
      duration: 2000,
      position: "bottom-right",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pb-24 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #ECF9F3 0%, #F4F1E9 50%, #F0FFF5 100%)",
      }}
    >
      {/* React Hot Toaster Container */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
        }}
      />

      {/* Animated floating background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#B1D182]/10 to-[#688F48]/10 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-[#E9F7F0]/20 to-[#F4F1E9]/20 blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
      </div>

      {/* Decorative corner accents */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#B1D182]/5 to-transparent -translate-x-32 -translate-y-32" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#688F48]/5 to-transparent translate-x-48 translate-y-48" />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-8 relative">
        {/* Animated hero section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-12"
          style={{
            background: "linear-gradient(135deg, #E9F7F0 0%, #F4F1E9 50%, #E6FAF0 100%)",
            boxShadow: "0 20px 60px rgba(104, 143, 72, 0.15)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="p-8 md:p-12 relative">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <Link 
                  to="/female-health/education" 
                  className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-800 group mb-4"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Education Hub</span>
                </Link>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-[#2B463C] mt-2 leading-tight"
                >
                  {article.title}
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 mt-4"
                >
                  <span className="px-4 py-1.5 rounded-full bg-[#B1D182]/20 text-[#2B463C] font-medium text-sm">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#2B463C]/70">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">Essential Guide</span>
                  </span>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 text-gray-700 max-w-3xl text-lg leading-relaxed"
                >
                  A comprehensive, science-backed guide designed for teenagers and adults — clear, friendly, and empowering.
                </motion.p>
              </div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <button
                  onClick={toggleFavorite}
                  aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                    isFavorite 
                      ? "bg-gradient-to-r from-[#D64545]/10 to-[#D64545]/5 border border-[#D64545]/20"
                      : "bg-white/80 border border-white/40 hover:bg-white"
                  } shadow-lg hover:shadow-xl`}
                >
                  <Heart 
                    className={`w-6 h-6 ${isFavorite ? 'text-[#D64545] fill-[#D64545] animate-pulse' : 'text-gray-600'}`} 
                  />
                  <span className={`font-medium ${isFavorite ? 'text-[#D64545]' : 'text-gray-700'}`}>
                    {isFavorite ? "Saved" : "Save Article"}
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          {/* Floating Table of Contents */}
          <motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden lg:block lg:col-span-1"
          >
            <div className="sticky top-32 self-start">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#688F48]" />
                    <p className="text-lg font-semibold text-[#2B463C]">Contents</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#B1D182]/20 text-[#2B463C]">
                    {sections.length} sections
                  </span>
                </div>
                
                <nav className="flex flex-col gap-3">
                  {sections.map((s, index) => (
                    <motion.button
                      key={s.id}
                      data-toc={s.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      onClick={() => {
                        const el = document.getElementById(s.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="group text-left text-gray-700 hover:text-[#2B463C] transition-all duration-300 rounded-lg px-3 py-3 flex items-center justify-between hover:bg-white/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-400 group-hover:text-[#688F48]">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="text-sm">{s.title}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmarkSection(s.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Bookmark 
                          className={`w-4 h-4 ${bookmarkedSections.includes(s.id) ? 'text-[#688F48] fill-[#688F48]' : 'text-gray-400'}`}
                        />
                      </button>
                    </motion.button>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-[#B1D182] animate-pulse" />
                    <span>Scroll to navigate between sections</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            {/* Hero Image Carousel */}
            {article.images && article.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 group"
                onMouseEnter={() => setAutoPlay(false)}
                onMouseLeave={() => setAutoPlay(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={article.images[currentImage]}
                    alt={`${article.title} ${currentImage + 1}`}
                    className="w-full h-80 md:h-[480px] object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>

                {article.images.length > 1 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentImage((p) => (p - 1 + article.images.length) % article.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#2B463C]" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentImage((p) => (p + 1) % article.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 text-[#2B463C]" />
                    </motion.button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {article.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImage === idx 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Thumbnails */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {article.images.map((img, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05, y: -5 }}
                          onClick={() => setCurrentImage(idx)}
                          className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            currentImage === idx 
                              ? "border-white shadow-lg scale-110" 
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={img} className="w-full h-full object-cover" alt={`thumb-${idx}`} />
                        </motion.button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Content sections with beautiful styling */}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-12"
            >
              {sections.map((s, index) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="scroll-mt-32"
                >
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/40 overflow-hidden relative">
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#B1D182] to-[#688F48]" />
                    
                    <div className="pl-6">
                      <div className="flex items-center justify-between mb-6">
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold text-[#2B463C]"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                        >
                          {s.title}
                        </motion.h3>
                        
                        <button
                          onClick={() => toggleBookmarkSection(s.id)}
                          className="text-gray-400 hover:text-[#688F48] transition-colors"
                        >
                          <Bookmark 
                            className={`w-5 h-5 ${bookmarkedSections.includes(s.id) ? 'text-[#688F48] fill-[#688F48]' : ''}`}
                          />
                        </button>
                      </div>

                      <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                        {s.lines.map((ln, i) => {
                          const t = ln.trim();
                          if (!t) return null;
                          if (t.startsWith("-")) {
                            return (
                              <motion.div 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 bg-gradient-to-r from-[#E9F7F0]/30 to-transparent p-4 rounded-xl"
                              >
                                <div className="mt-1 text-2xl text-[#688F48]">•</div>
                                <p className="flex-1">{t.replace(/^-/, "").trim()}</p>
                              </motion.div>
                            );
                          }
                          return (
                            <motion.p 
                              key={i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              className="leading-relaxed"
                            >
                              {t}
                            </motion.p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.section>
              ))}

              {/* Tips & Advice Section */}
              <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#E9F7F0] via-[#F0FFF5] to-[#E9F7F0] rounded-2xl p-8 shadow-2xl border border-white/40"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#B1D182] to-[#688F48] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#2B463C]">Essential Tips & Practical Advice</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getTips().map((tip, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-white/40 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-1">🌱</span>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Action Section with Enhanced Share Options */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#E9F7F0] to-[#F4F1E9] rounded-2xl p-8 shadow-2xl border border-white/40"
              >
                <h4 className="text-2xl font-bold text-[#2B463C] mb-6">How to Apply This Knowledge</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📝</span>
                      <p className="text-gray-700">Track your cycle with a simple calendar or app</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔥</span>
                      <p className="text-gray-700">Use heat therapy for comfortable pain relief</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🥗</span>
                      <p className="text-gray-700">Balance your meals with nutrient-rich foods</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">👩‍⚕️</span>
                      <p className="text-gray-700">Consult healthcare professionals when in doubt</p>
                    </div>
                  </div>
                </div>

                {/* Share Options with Lucide Icons */}
                <div className="pt-8 border-t border-gray-200">
                  <h5 className="text-xl font-bold text-[#2B463C] mb-6 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share with others
                  </h5>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-wrap">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShareSocial('twitter')}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#1DA1F2]/10 to-[#1DA1F2]/5 hover:from-[#1DA1F2]/20 hover:to-[#1DA1F2]/10 transition-all border border-[#1DA1F2]/20"
                      >
                        <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                        <span className="text-sm font-medium text-gray-700">Twitter</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShareSocial('facebook')}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#4267B2]/10 to-[#4267B2]/5 hover:from-[#4267B2]/20 hover:to-[#4267B2]/10 transition-all border border-[#4267B2]/20"
                      >
                        <Facebook className="w-5 h-5 text-[#4267B2]" />
                        <span className="text-sm font-medium text-gray-700">Facebook</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShareSocial('whatsapp')}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/5 hover:from-[#25D366]/20 hover:to-[#25D366]/10 transition-all border border-[#25D366]/20"
                      >
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShareSocial('linkedin')}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0077B5]/10 to-[#0077B5]/5 hover:from-[#0077B5]/20 hover:to-[#0077B5]/10 transition-all border border-[#0077B5]/20"
                      >
                        <Linkedin className="w-5 h-5 text-[#0077B5]" />
                        <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                          copied 
                            ? 'bg-gradient-to-r from-green-100 to-green-50 border border-green-200'
                            : 'bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 hover:shadow-lg'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700">Copy Link</span>
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#B1D182] to-[#688F48] text-white hover:shadow-lg transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">Share Article</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Share & Save Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/40"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-[#2B463C] mb-2">Found this helpful?</h4>
                    <p className="text-gray-600">Share with others or save for later reference</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleFavorite}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                        isFavorite 
                          ? "bg-gradient-to-r from-[#D64545]/10 to-[#D64545]/5 border border-[#D64545]/20"
                          : "bg-gradient-to-r from-[#B1D182] to-[#688F48] hover:shadow-lg"
                      } shadow`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${isFavorite ? 'text-[#D64545] fill-[#D64545]' : 'text-white'}`} 
                      />
                      <span className={`font-medium ${isFavorite ? 'text-[#D64545]' : 'text-white'}`}>
                        {isFavorite ? "Saved to Favorites" : "Save Article"}
                      </span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 hover:shadow-lg transition-all"
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Share Article</span>
                    </motion.button>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B1D182]" />
                    Article last updated • {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </motion.div>
            </motion.article>
          </main>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#B1D182] to-[#688F48] shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick Share Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        className="fixed bottom-24 right-8 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all border border-gray-200"
      >
        <Share2 className="w-6 h-6 text-[#688F48]" />
      </motion.button>

      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#B1D182] to-[#688F48] z-50"
        style={{ width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
      />

      {/* Custom CSS for TOC */}
      <style jsx>{`
        [data-toc].active {
          background: linear-gradient(90deg, rgba(177, 209, 130, 0.1) 0%, rgba(177, 209, 130, 0.05) 100%);
          color: #2B463C;
          border-left: 3px solid #688F48;
          padding-left: 12px;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(177, 209, 130, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #B1D182, #688F48);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #688F48, #B1D182);
        }
      `}</style>
    </motion.div>
  );
};

export default ArticleDetails;