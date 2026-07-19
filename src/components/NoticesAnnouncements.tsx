import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, ExternalLink, Play, Pause } from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

function parseFirestoreDate(val: any): Date | null {
  if (!val) return null;
  if (typeof val.toDate === 'function') {
    return val.toDate();
  }
  if (val.seconds !== undefined) {
    return new Date(val.seconds * 1000);
  }
  if (val instanceof Date) {
    return val;
  }
  if (typeof val === 'string' || typeof val === 'number') {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      return d;
    }
  }
  return null;
}

const getCategoryBadgeClass = (category: string) => {
  const cat = (category || 'Announcement').toLowerCase().trim();
  if (cat.includes('admission') || cat.includes('open')) {
    return 'bg-emerald-50 border border-emerald-200 text-emerald-800';
  }
  if (cat.includes('cultural') || cat.includes('event') || cat.includes('annual')) {
    return 'bg-pink-50 border border-pink-200 text-pink-800';
  }
  if (cat.includes('stem') || cat.includes('innovation') || cat.includes('robotics') || cat.includes('science')) {
    return 'bg-amber-50 border border-amber-200 text-amber-800';
  }
  return 'bg-blue-50 border border-blue-200 text-blue-800';
};

const isExternalUrl = (url: string) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200';

export default function NoticesAnnouncements() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  // Subscribe to hero_notices collection in real-time
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'hero_notices'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setNotices(list);
      setLoading(false);
    }, (err) => {
      if ((import.meta as any).env?.DEV) {
        console.error('Error fetching hero notices:', err);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter and sort notices client-side to avoid composite indexes requirement
  const visibleNotices = useMemo(() => {
    const now = new Date();
    return notices
      .filter((notice) => {
        // 1. Check isActive
        if (notice.isActive !== true) return false;

        // 2. Check status
        const status = (notice.status || '').toLowerCase().trim();
        if (status !== 'active' && status !== 'published') return false;

        // 3. Check publishDate
        const pubDate = parseFirestoreDate(notice.publishDate);
        if (pubDate && now < pubDate) return false;

        // 4. Check expiryDate
        const expDate = parseFirestoreDate(notice.expiryDate);
        if (expDate && now > expDate) return false;

        return true;
      })
      .sort((a, b) => {
        // Sort using Admin Portal priority: lower number first
        const prioA = Number(a.priority ?? 9999);
        const prioB = Number(b.priority ?? 9999);
        if (prioA !== prioB) {
          return prioA - prioB;
        }
        // Stable secondary sort
        const dateA = parseFirestoreDate(a.createdAt)?.getTime() ?? 0;
        const dateB = parseFirestoreDate(b.createdAt)?.getTime() ?? 0;
        return dateB - dateA;
      });
  }, [notices]);

  // Adjust activeIndex if dynamic list updates or shrinks
  useEffect(() => {
    if (activeIndex >= visibleNotices.length && visibleNotices.length > 0) {
      setActiveIndex(visibleNotices.length - 1);
    }
  }, [visibleNotices.length, activeIndex]);

  // Autoplay handler - Exact 5000ms loop
  useEffect(() => {
    if (!isPlaying || visibleNotices.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % visibleNotices.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, visibleNotices.length, resetTrigger]);

  // Browser visibility tab detection to auto-pause slideshow
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handlePrev = () => {
    if (visibleNotices.length === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + visibleNotices.length) % visibleNotices.length);
    setResetTrigger((prev) => prev + 1);
  };

  const handleNext = () => {
    if (visibleNotices.length === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % visibleNotices.length);
    setResetTrigger((prev) => prev + 1);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setResetTrigger((prev) => prev + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (loading) {
    return null; // Silent load to prevent layout shifts
  }

  if (visibleNotices.length === 0) {
    return null; // Hide the section gracefully when empty
  }

  const currentNotice = visibleNotices[activeIndex];
  const formattedDate = currentNotice
    ? (parseFirestoreDate(currentNotice.publishDate) || parseFirestoreDate(currentNotice.createdAt))?.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }) || 'Recent Announcement'
    : 'Recent Announcement';

  // Slider animation variations
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      scale: 0.98,
    }),
  };

  return (
    <section 
      id="notices-announcements-section" 
      className="w-full bg-[#F4F0EA] py-16 sm:py-24 overflow-hidden box-border"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full box-border">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto space-y-3">
          <span className="inline-block bg-[#E78F68]/15 border border-[#E78F68]/25 text-[#E78F68] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            What's Happening
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B231A] tracking-tight">
            Notices & Announcements
          </h2>
          <p className="text-xs sm:text-sm text-[#3B231A]/70 font-light leading-relaxed">
            Stay beautifully connected to our school community's daily celebrations, traditional events, and active learning cycles.
          </p>
        </div>

        {/* Notices Slider Layout */}
        <div 
          className="relative bg-[#FAF8F5] rounded-[28px] sm:rounded-[36px] border border-[#3B231A]/8 shadow-[0_12px_40px_rgba(59,35,26,0.04)] p-5 sm:p-8 md:p-10 flex flex-col items-center box-border w-full"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Autoplay status and control pill */}
          {visibleNotices.length > 1 && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
              <button
                onClick={togglePlayPause}
                className="p-2 rounded-full bg-[#FAF8F5] border border-[#3B231A]/10 text-[#3B231A]/60 hover:text-[#E78F68] hover:bg-[#E78F68]/5 transition-all duration-300 cursor-pointer"
                aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {/* Poster Hero Frame */}
          <div className="w-full aspect-[4/3] md:aspect-[16/10] max-h-[300px] sm:max-h-[420px] md:max-h-[460px] bg-[#FAF8F5] rounded-[20px] sm:rounded-[24px] border border-[#3B231A]/8 overflow-hidden flex items-center justify-center relative shadow-[0_8px_24px_rgba(59,35,26,0.03)] mb-6 p-1.5 sm:p-2">
            <div className="w-full h-full overflow-hidden rounded-[14px] sm:rounded-[18px] bg-[#3B231A]/5 flex items-center justify-center relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }}
                  src={currentNotice.posterUrl || FALLBACK_IMAGE}
                  alt={currentNotice.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-[14px] sm:rounded-[18px]"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Info Block Content (Fades smoothly) */}
          <div className="w-full text-center space-y-4 px-2 sm:px-6 box-border mb-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${getCategoryBadgeClass(currentNotice.category)}`}>
                {currentNotice.category || 'Announcement'}
              </span>
              <span className="flex items-center text-[10px] text-[#3B231A]/60 font-mono gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#E78F68]" />
                {formattedDate}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#3B231A] leading-tight max-w-xl mx-auto">
              {currentNotice.title}
            </h3>

            {currentNotice.subtitle && (
              <p className="text-xs text-[#3B231A]/70 font-light max-w-md mx-auto leading-relaxed">
                {currentNotice.subtitle}
              </p>
            )}

            {currentNotice.description && !currentNotice.subtitle && (
              <p className="text-xs text-[#3B231A]/70 font-light max-w-md mx-auto leading-relaxed">
                {currentNotice.description}
              </p>
            )}

            {currentNotice.redirectUrl && (
              <div className="pt-1">
                <a
                  href={currentNotice.redirectUrl}
                  target={isExternalUrl(currentNotice.redirectUrl) ? "_blank" : undefined}
                  rel={isExternalUrl(currentNotice.redirectUrl) ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#E78F68] hover:text-[#cf744d] transition-colors group cursor-pointer"
                >
                  <span>{currentNotice.actionText || 'Explore Announcement'}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>

          {/* Premium Footer Control Bar with Side-by-Side Progress Dots & Buttons */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 w-full pt-6 border-t border-[#3B231A]/5">
            {/* Elegant 01  02  03 progress indicators */}
            <div className="flex items-center space-x-6">
              {visibleNotices.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className="group flex flex-col items-start space-y-1 focus:outline-none cursor-pointer"
                    aria-label={`Go to announcement ${index + 1}`}
                  >
                    <span className={`text-[10px] font-mono font-bold transition-colors ${isActive ? 'text-[#E78F68]' : 'text-[#3B231A]/40 group-hover:text-[#3B231A]/75'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="relative w-12 h-[3px] bg-[#3B231A]/10 rounded-full overflow-hidden">
                      {isActive && isPlaying ? (
                        <motion.div
                          key={`${index}-${resetTrigger}`}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 5, ease: 'linear' }}
                          className="absolute left-0 top-0 h-full bg-[#E78F68]"
                        />
                      ) : isActive ? (
                        <div className="absolute left-0 top-0 w-full h-full bg-[#E78F68]" />
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Premium circular arrow navigation triggers */}
            {visibleNotices.length > 1 && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-white hover:bg-[#E78F68] hover:text-white text-[#3B231A]/80 border border-[#3B231A]/10 rounded-full transition-all duration-300 shadow-xs active:scale-95 group cursor-pointer"
                  aria-label="Previous announcement"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 bg-white hover:bg-[#E78F68] hover:text-white text-[#3B231A]/80 border border-[#3B231A]/10 rounded-full transition-all duration-300 shadow-xs active:scale-95 group cursor-pointer"
                  aria-label="Next announcement"
                >
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Warm Emotional Concluding Story block */}
        <div className="mt-16 sm:mt-20 text-center max-w-xl mx-auto space-y-4 px-4 animate-fade-in">
          <div className="flex items-center justify-center space-x-3">
            <div className="h-px w-8 bg-[#3B231A]/15" />
            <span className="text-[#E78F68] text-sm">✦</span>
            <div className="h-px w-8 bg-[#3B231A]/15" />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-serif italic text-base sm:text-lg text-[#3B231A] font-medium leading-relaxed">
              “Little moments. Big memories. One beautiful journey.”
            </h4>
            <p className="text-[11px] sm:text-xs text-[#3B231A]/60 font-light leading-relaxed max-w-md mx-auto">
              Every announcement marks another step in our children's story. From first days of school to cultural celebrations, scientific achievements, and new beginnings—we are grateful to share this journey with you.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
