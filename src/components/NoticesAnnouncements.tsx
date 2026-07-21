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

  // Slider animation variations using translation X and subtle scale for premium slide transitions
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir * 30,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        opacity: { duration: 0.35, ease: "easeOut" },
        x: { type: "spring", stiffness: 180, damping: 24 },
        scale: { duration: 0.35, ease: "easeOut" },
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir * -30,
      scale: 0.98,
      transition: {
        opacity: { duration: 0.25, ease: "easeIn" },
        x: { duration: 0.25, ease: "easeIn" },
        scale: { duration: 0.25, ease: "easeIn" },
      }
    }),
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

        {/* Notices Slider Card with Layered-Paper Depth and Premium Stylings */}
        <div className="relative w-full group">
          {/* Subtle warm-orange offset stacked background sheet */}
          <div className="absolute inset-0 bg-[#E78F68]/4 border-2 border-[#3B231A]/6 rounded-[40px] sm:rounded-[48px] translate-x-2 translate-y-2 pointer-events-none transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />
          {/* Subtle soft-white offset background sheet */}
          <div className="absolute inset-0 bg-white/40 border border-[#3B231A]/4 rounded-[40px] sm:rounded-[48px] -translate-x-1.5 -translate-y-1.5 pointer-events-none transition-all duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />

          {/* Main Card */}
          <div 
            className="relative bg-[#FCFAF7] rounded-[40px] sm:rounded-[48px] border-2 border-[#3B231A]/10 shadow-[0_12px_40px_rgba(59,35,26,0.03)] p-6 sm:p-10 md:p-12 w-full box-border transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,35,26,0.06)] hover:-translate-y-1"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
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
              
              {/* Left Column: Poster frame (Visually Dominant as pinned memory) */}
              <div className="md:col-span-6 lg:col-span-7 w-full flex flex-col justify-center relative">
                <div className="relative aspect-[4/3] md:aspect-[1.15] lg:aspect-[1.2] w-full bg-white rounded-[24px] overflow-hidden border-2 border-[#3B231A]/12 p-3 sm:p-4 shadow-[0_8px_24px_rgba(59,35,26,0.03),inset_0_1px_3px_rgba(255,255,255,0.8)] hover:scale-[1.015] transition-transform duration-500 ease-out">
                  {/* Subtle dashed inner frame */}
                  <div className="absolute inset-2 sm:inset-3 border border-dashed border-[#3B231A]/15 rounded-[16px] pointer-events-none z-10" />

                  <div className="w-full h-full overflow-hidden rounded-[12px] bg-[#FDFBF7] flex items-center justify-center relative">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      <motion.img
                        key={activeIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        src={currentNotice.posterUrl || FALLBACK_IMAGE}
                        alt={currentNotice.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain select-none rounded-[12px]"
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Right Column: Information Block with Staggered Elements */}
              <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between h-full py-2 space-y-6 overflow-hidden w-full">
                
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5 sm:space-y-6 flex flex-col justify-start"
                  >
                    {/* Category Badge */}
                    <div>
                      <span className={`inline-block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs ${getCategoryBadgeClass(currentNotice.category)}`}>
                        {currentNotice.category || 'Announcement'}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center text-xs text-[#E78F68] font-mono font-bold gap-2">
                      <Calendar className="w-4 h-4 text-[#E78F68]" />
                      <span>{formattedDate}</span>
                    </div>

                    {/* Large Bold Notice Title with same dark-brown language */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-[#3B231A] leading-tight tracking-tight">
                      {currentNotice.title}
                    </h3>

                    {/* Short Description */}
                    {currentNotice.subtitle && (
                      <p className="text-sm sm:text-base text-[#3B231A]/75 font-normal leading-relaxed">
                        {currentNotice.subtitle}
                      </p>
                    )}

                    {currentNotice.description && !currentNotice.subtitle && (
                      <p className="text-sm sm:text-base text-[#3B231A]/75 font-normal leading-relaxed">
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

                {/* Playful Progress Navigation & Premium Control triggers */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t-2 border-[#3B231A]/8 w-full mt-auto">
                  
                  {/* Playful Progress Indicators: 01 ─── 02 ─── 03 */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    {visibleNotices.map((_, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <div className="w-6 sm:w-10 h-[2px] bg-[#3B231A]/10 rounded-full" />
                          )}
                          <button
                            onClick={() => handleDotClick(index)}
                            className="group flex items-center gap-2 focus:outline-none cursor-pointer py-1"
                            aria-label={`Go to announcement ${index + 1}`}
                          >
                            <span className={`text-xs sm:text-sm font-mono font-extrabold transition-colors duration-300 ${isActive ? 'text-[#E78F68]' : 'text-[#3B231A]/40 group-hover:text-[#3B231A]/70'}`}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            {isActive && (
                              <div className="relative w-12 sm:w-16 h-1.5 bg-[#3B231A]/10 rounded-full overflow-hidden">
                                <motion.div
                                  key={`${index}-${resetTrigger}-${isPlaying}`}
                                  initial={{ width: '0%' }}
                                  animate={isPlaying ? { width: '100%' } : { width: '0%' }}
                                  transition={{ duration: isPlaying ? 5 : 0, ease: 'linear' }}
                                  className="absolute left-0 top-0 h-full bg-[#E78F68] rounded-full"
                                />
                              </div>
                            )}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Circular navigation triggers */}
                  {visibleNotices.length > 1 && (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handlePrev}
                        className="p-2 sm:p-2.5 bg-[#FAF6F0] hover:bg-[#E78F68] hover:text-white text-[#3B231A]/80 border-2 border-[#3B231A]/12 rounded-full transition-all duration-300 shadow-xs active:scale-90 group cursor-pointer"
                        aria-label="Previous announcement"
                      >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-2 sm:p-2.5 bg-[#FAF6F0] hover:bg-[#E78F68] hover:text-white text-[#3B231A]/80 border-2 border-[#3B231A]/12 rounded-full transition-all duration-300 shadow-xs active:scale-90 group cursor-pointer"
                        aria-label="Next announcement"
                      >
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Playful Outer Doodles - completely outside the main notice card boundaries */}
          
          {/* Doodle 1: Tiny Paper Airplane & flight path */}
          <motion.div 
            className="absolute -left-16 top-16 w-12 h-12 opacity-25 pointer-events-none hidden lg:block"
            animate={{ y: [0, -6, 0], x: [0, 4, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 50 50" fill="none" stroke="#3B231A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M45 5 L20 25 L30 45 L45 5 Z" />
              <path d="M45 5 L5 18 L20 25 L45 5 Z" />
              <path d="M5 45 C 10 38, 15 32, 18 26" strokeDasharray="3 3" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Doodle 2: Small Sparkles/Star */}
          <motion.div 
            className="absolute -right-14 top-10 w-9 h-9 opacity-30 pointer-events-none hidden lg:block"
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#E78F68" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full">
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
              <circle cx="12" cy="12" r="2.5" fill="#E78F68" />
              <path d="M5 5 L7 7 M19 5 L17 7" stroke="#E78F68" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Doodle 3: Small Rainbow/Cloud */}
          <motion.div 
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-14 h-12 opacity-25 pointer-events-none hidden lg:block"
            animate={{ y: ["-50%", "-55%", "-50%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 50 40" fill="none" stroke="#3B231A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M10 25 A 15 15 0 0 1 40 25" stroke="#E78F68" strokeWidth="1.5" strokeDasharray="2 2" />
              <path d="M14 25 A 11 11 0 0 1 36 25" stroke="#3B231A" strokeWidth="1.5" />
              <path d="M15 30 h20 a 5 5 0 0 0 5 -5 a 5 5 0 0 0 -5 -5 a 6 6 0 0 0 -11 -2 a 4 4 0 0 0 -9 2 a 5 5 0 0 0 0 10 Z" fill="#FCFAF7" />
            </svg>
          </motion.div>

          {/* Doodle 4: Tiny Pencil */}
          <motion.div 
            className="absolute -left-14 bottom-24 w-9 h-9 opacity-25 pointer-events-none hidden lg:block"
            animate={{ rotate: [-8, 8, -8], y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#3B231A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </motion.div>

          {/* Doodle 5: Mini Book */}
          <motion.div 
            className="absolute -right-14 bottom-16 w-10 h-10 opacity-25 pointer-events-none hidden lg:block"
            animate={{ y: [0, -4, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#3B231A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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
