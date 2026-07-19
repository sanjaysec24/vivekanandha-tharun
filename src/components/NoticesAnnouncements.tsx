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
  const posterVariants = {
    enter: {
      opacity: 0,
      y: 12,
      scale: 0.97,
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25, ease: "easeInOut" }
    },
  };

  return (
    <section 
      id="notices-announcements-section" 
      className="w-full bg-[#F4F0EA] py-16 sm:py-24 md:py-28 overflow-hidden box-border relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto space-y-3"
        >
          <span className="inline-block bg-[#E78F68]/12 border border-[#E78F68]/25 text-[#E78F68] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            What's Happening
          </span>
          <div className="relative inline-block px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-[#3B231A] tracking-tight">
              Notices & Announcements
            </h2>
            {/* Hand-drawn underline/swoosh */}
            <svg className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-48 sm:w-64 h-2.5 text-[#E78F68]/70" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5.5C40 2.5 120 1 198 5.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#3B231A]/75 font-normal leading-relaxed pt-2 max-w-lg mx-auto">
            Little updates, big moments — discover what’s happening in our school community.
          </p>
        </motion.div>

        {/* Notices Slider Card */}
        <div 
          className="relative bg-[#FCFAF7] rounded-[32px] sm:rounded-[40px] border-2 border-[#3B231A]/8 shadow-[0_16px_50px_rgba(59,35,26,0.05)] p-6 sm:p-10 md:p-12 w-full box-border group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(59,35,26,0.08)] hover:-translate-y-1"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Decorative Tape Sticker near top-left corner */}
          <div className="absolute -top-3.5 left-[8%] w-24 h-7 bg-[#E78F68]/15 border-x-2 border-dashed border-[#E78F68]/35 rotate-[-3deg] z-20 shadow-[0_2px_5px_rgba(0,0,0,0.01)]" />

          {/* Play/Pause Control on the top-right corner of the card */}
          {visibleNotices.length > 1 && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
              <button
                onClick={togglePlayPause}
                className="p-2 sm:p-2.5 rounded-full bg-white border border-[#3B231A]/10 text-[#3B231A]/60 hover:text-white hover:bg-[#E78F68] hover:border-[#E78F68] transition-all duration-300 cursor-pointer shadow-xs active:scale-90"
                aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {/* Grid Layout: Poster & Information Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Poster frame (Visually Dominant) */}
            <div className="md:col-span-6 lg:col-span-7 w-full flex flex-col justify-center relative">
              <div className="relative aspect-[4/3] md:aspect-[1.15] lg:aspect-[1.2] w-full bg-[#3B231A]/4 rounded-[24px] overflow-hidden border-2 border-[#3B231A]/10 p-2 sm:p-3 shadow-[inset_0_2px_8px_rgba(59,35,26,0.02),0_10px_30px_rgba(59,35,26,0.03)] group-hover:scale-[1.005] transition-transform duration-500">
                {/* Cute Corner Pins on the internal frame */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-[#E78F68]/50 border border-[#3B231A]/20 z-20" />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-amber-400/50 border border-[#3B231A]/20 z-20" />

                <div className="w-full h-full overflow-hidden rounded-[16px] bg-white flex items-center justify-center relative">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                      key={activeIndex}
                      variants={posterVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        opacity: { duration: 0.35 },
                        scale: { duration: 0.35 },
                        y: { type: 'spring', stiffness: 300, damping: 26 },
                      }}
                      src={currentNotice.posterUrl || FALLBACK_IMAGE}
                      alt={currentNotice.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain select-none rounded-[16px]"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column: Information Block with Staggered Elements */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between h-full py-2 space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs ${getCategoryBadgeClass(currentNotice.category)}`}>
                      {currentNotice.category || 'Announcement'}
                    </span>
                    <span className="flex items-center text-[10px] sm:text-xs text-[#3B231A]/65 font-mono gap-1.5 bg-[#3B231A]/4 px-3 py-1 rounded-full border border-[#3B231A]/5">
                      <Calendar className="w-3.5 h-3.5 text-[#E78F68]" />
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-[#3B231A] leading-tight tracking-tight">
                    {currentNotice.title}
                  </h3>

                  {currentNotice.subtitle && (
                    <p className="text-xs sm:text-sm text-[#3B231A]/75 font-normal leading-relaxed">
                      {currentNotice.subtitle}
                    </p>
                  )}

                  {currentNotice.description && !currentNotice.subtitle && (
                    <p className="text-xs sm:text-sm text-[#3B231A]/75 font-normal leading-relaxed">
                      {currentNotice.description}
                    </p>
                  )}

                  {currentNotice.redirectUrl && (
                    <div className="pt-2">
                      <a
                        href={currentNotice.redirectUrl}
                        target={isExternalUrl(currentNotice.redirectUrl) ? "_blank" : undefined}
                        rel={isExternalUrl(currentNotice.redirectUrl) ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center space-x-2 bg-[#E78F68] text-white hover:bg-[#cf744d] hover:shadow-[#E78F68]/20 active:scale-95 text-xs font-sans font-bold uppercase tracking-wider px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-md cursor-pointer group"
                      >
                        <span>{currentNotice.actionText || 'Explore Announcement'}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Storytelling progress dots & arrows in a unified bar inside the right column */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#3B231A]/8 w-full mt-auto">
                
                {/* 01 ━━━━ 02 ━━━━ 03 Progress dots */}
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {visibleNotices.map((_, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <div className="w-4 sm:w-6 h-[1.5px] bg-[#3B231A]/10 rounded-full" />
                        )}
                        <button
                          onClick={() => handleDotClick(index)}
                          className="group flex items-center gap-1.5 focus:outline-none cursor-pointer"
                          aria-label={`Go to announcement ${index + 1}`}
                        >
                          <span className={`text-[10px] sm:text-xs font-mono font-bold transition-colors duration-300 ${isActive ? 'text-[#E78F68]' : 'text-[#3B231A]/40 group-hover:text-[#3B231A]/70'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {isActive && (
                            <div className="relative w-8 sm:w-12 h-1 bg-[#3B231A]/10 rounded-full overflow-hidden">
                              <motion.div
                                key={`${index}-${resetTrigger}`}
                                initial={{ width: '0%' }}
                                animate={isPlaying ? { width: '100%' } : { width: '0%' }}
                                transition={{ duration: isPlaying ? 5 : 0, ease: 'linear' }}
                                className="absolute left-0 top-0 h-full bg-[#E78F68]"
                              />
                            </div>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Arrow navigation triggers */}
                {visibleNotices.length > 1 && (
                  <div className="flex items-center space-x-2.5">
                    <button
                      onClick={handlePrev}
                      className="p-2 sm:p-2.5 bg-[#FAF6F0] hover:bg-[#E78F68] hover:text-white text-[#3B231A]/80 border border-[#3B231A]/12 rounded-full transition-all duration-300 shadow-xs active:scale-95 group cursor-pointer"
                      aria-label="Previous announcement"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 sm:p-2.5 bg-[#FAF6F0] hover:bg-[#E78F68] hover:text-white text-[#3B231A]/80 border border-[#3B231A]/12 rounded-full transition-all duration-300 shadow-xs active:scale-95 group cursor-pointer"
                      aria-label="Next announcement"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Cute subtle mascot peeking from behind the card (bottom-right) */}
          <motion.div 
            className="absolute -bottom-5 right-6 w-14 h-16 z-10 pointer-events-none hidden sm:block"
            animate={{ y: [0, -4, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Pencil Body */}
              <path d="M15 15 L35 15 L35 45 L25 55 L15 45 Z" fill="#E78F68" stroke="#3B231A" strokeWidth="2" />
              {/* Eraser */}
              <path d="M15 15 L35 15 L35 8 C35 5, 15 5, 15 8 Z" fill="#FCA5A5" stroke="#3B231A" strokeWidth="2" />
              {/* Metal band */}
              <rect x="15" y="12" width="20" height="4" fill="#D1D5DB" stroke="#3B231A" strokeWidth="1.5" />
              {/* Pencil Tip */}
              <path d="M21 49 L29 49 L25 55 Z" fill="#1F2937" />
              {/* Smiling Eyes */}
              <circle cx="21" cy="28" r="1.5" fill="#3B231A" />
              <circle cx="29" cy="28" r="1.5" fill="#3B231A" />
              {/* Mouth */}
              <path d="M23 32 Q25 34 27 32" stroke="#3B231A" strokeWidth="1.5" strokeLinecap="round" />
              {/* Blushing cheeks */}
              <circle cx="18" cy="30" r="1" fill="#EF4444" opacity="0.6" />
              <circle cx="32" cy="30" r="1" fill="#EF4444" opacity="0.6" />
            </svg>
          </motion.div>

        </div>

        {/* Warm Emotional Concluding Story block */}
        <div className="mt-16 sm:mt-20 text-center max-w-xl mx-auto space-y-4 px-4 animate-fade-in relative z-10">
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
