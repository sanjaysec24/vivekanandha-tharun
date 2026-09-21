import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  ArrowRight, 
  ExternalLink, 
  Play, 
  Pause,
  BellRing,
  Sparkles,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from '../lib/router';

interface NoticeItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  publishDate?: any;
  expiryDate?: any;
  date?: string;
  posterUrl?: string;
  link?: string;
  redirectUrl?: string;
  linkLabel?: string;
  actionText?: string;
  priority?: number;
  isActive?: boolean;
  status?: string;
  createdAt?: any;
}

interface NoticesAnnouncementsProps {
  onOpenAdmissions?: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1400';

// Curated official Vivekanandha School notice items with individual links and labels
const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: 'admissions-2027',
    title: 'Admissions Open for Academic Year 2027-2028',
    subtitle: 'Nursery (Pre-KG, LKG, UKG) & Primary (Grade 1 to 5)',
    description: 'Begin your child’s educational journey with our nurturing, holistic learning curriculum in Uthiramerur. Applications are now open for foundational early childhood and primary classes with interactive smart classrooms, activity ateliers, and personalized guidance.',
    category: 'Admissions',
    date: 'Academic Year 2027-28',
    posterUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1400',
    link: '/admissions',
    linkLabel: 'Admissions Info',
    priority: 1,
    isActive: true,
  },
  {
    id: 'spectra-annual-day',
    title: 'SPECTRA: Grand Annual Cultural & Sports Gala',
    subtitle: '100% Student Participation Across All Grades',
    description: 'Our signature annual festival celebrating classical arts, rhythmic dance, drama, and sports achievements. Over 2,000 parents, alumni, and patrons gather to honor the blossoming creative talent of every young scholar.',
    category: 'Events',
    date: 'Grand Annual Day',
    posterUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1400',
    link: '/activities',
    linkLabel: 'View Gala Details',
    priority: 2,
    isActive: true,
  },
  {
    id: 'stem-science-atelier',
    title: 'Hands-on Science & Innovation Exhibition',
    subtitle: 'Young Minds Discovering Practical Science & Botany',
    description: 'Students present working botanical science models, tactile physics experiments, and interactive computer presentations developed during their Smart Lesson ateliers under our joyful Montessori philosophy.',
    category: 'Academic',
    date: 'Academic Highlights',
    posterUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1400',
    link: '/academics',
    linkLabel: 'Explore Exhibition',
    priority: 3,
    isActive: true,
  },
];

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

const getCategoryBadgeClass = (category?: string) => {
  const cat = (category || 'Announcement').toLowerCase().trim();
  if (cat.includes('admission') || cat.includes('open') || cat.includes('enroll')) {
    return {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      dot: 'bg-emerald-500',
      label: 'Admissions Notice',
    };
  }
  if (cat.includes('cultural') || cat.includes('event') || cat.includes('annual') || cat.includes('spectra') || cat.includes('sports')) {
    return {
      container: 'bg-pink-50 border-pink-200 text-pink-800',
      dot: 'bg-pink-500',
      label: 'Campus Event',
    };
  }
  if (cat.includes('stem') || cat.includes('innovation') || cat.includes('academic') || cat.includes('science') || cat.includes('robotics')) {
    return {
      container: 'bg-amber-50 border-amber-200 text-amber-800',
      dot: 'bg-amber-500',
      label: 'Academic Highlight',
    };
  }
  return {
    container: 'bg-[#E78F68]/10 border-[#E78F68]/25 text-[#E78F68]',
    dot: 'bg-[#E78F68]',
    label: category || 'Notice Board',
  };
};

const isExternalUrl = (url?: string) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

export default function NoticesAnnouncements({ onOpenAdmissions }: NoticesAnnouncementsProps) {
  const { navigate } = useRouter();
  const [dbNotices, setDbNotices] = useState<NoticeItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const [resetTimerKey, setResetTimerKey] = useState(0);

  // Subscribe to hero_notices collection in real-time from Firestore
  useEffect(() => {
    if (!db) return;

    try {
      const q = query(collection(db, 'hero_notices'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: NoticeItem[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            // Include active notices
            if (data.isActive !== false && data.status !== 'Archived') {
              list.push({
                id: doc.id,
                title: data.title || '',
                subtitle: data.subtitle || '',
                description: data.description || '',
                category: data.category || 'Announcement',
                publishDate: data.publishDate,
                expiryDate: data.expiryDate,
                date: data.date,
                posterUrl: data.posterUrl || data.imageUrl || data.image || '',
                link: data.link || data.redirectUrl || data.url || '',
                redirectUrl: data.redirectUrl || data.link || data.url || '',
                linkLabel: data.linkLabel || data.actionText || data.buttonText || '',
                actionText: data.actionText || data.linkLabel || data.buttonText || '',
                priority: Number(data.priority ?? 99),
                isActive: data.isActive,
                status: data.status,
                createdAt: data.createdAt,
              });
            }
          });
          setDbNotices(list);
        },
        (err) => {
          console.warn('Hero notices fetch note:', err);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore subscription exception:', e);
    }
  }, []);

  // Merge and prioritize Firestore notices with robust fallback items
  const visibleNotices = useMemo(() => {
    // Filter legitimate Firestore items that have at least a meaningful title or poster
    const validDbItems = dbNotices.filter((n) => {
      const hasTitle = Boolean(n.title && n.title.trim().length > 0);
      const hasPoster = Boolean(n.posterUrl && n.posterUrl.trim().length > 10);
      return hasTitle || hasPoster;
    });

    if (validDbItems.length > 0) {
      // Sort database notices by priority (lower number first), then by date
      const sortedDb = [...validDbItems].sort((a, b) => {
        const prioA = Number(a.priority ?? 999);
        const prioB = Number(b.priority ?? 999);
        if (prioA !== prioB) return prioA - prioB;
        const timeA = parseFirestoreDate(a.createdAt)?.getTime() ?? 0;
        const timeB = parseFirestoreDate(b.createdAt)?.getTime() ?? 0;
        return timeB - timeA;
      });

      // If fewer than 2 DB notices exist, supplement with curated school items for a rich slider
      if (sortedDb.length === 1) {
        return [...sortedDb, DEFAULT_NOTICES[0], DEFAULT_NOTICES[1]];
      }
      if (sortedDb.length === 2) {
        return [...sortedDb, DEFAULT_NOTICES[0]];
      }
      return sortedDb;
    }

    return DEFAULT_NOTICES;
  }, [dbNotices]);

  // Adjust activeIndex if dynamic notice list changes length
  useEffect(() => {
    if (activeIndex >= visibleNotices.length && visibleNotices.length > 0) {
      setActiveIndex(0);
    }
  }, [visibleNotices.length, activeIndex]);

  // Calm 6-second horizontal slide autoplay
  useEffect(() => {
    if (!isPlaying || isHovered || visibleNotices.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % visibleNotices.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, visibleNotices.length, resetTimerKey]);

  // Auto-pause when user switches browser tabs to save battery and state
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

  const handlePrev = useCallback(() => {
    if (visibleNotices.length === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + visibleNotices.length) % visibleNotices.length);
    setResetTimerKey((k) => k + 1);
  }, [visibleNotices.length]);

  const handleNext = useCallback(() => {
    if (visibleNotices.length === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % visibleNotices.length);
    setResetTimerKey((k) => k + 1);
  }, [visibleNotices.length]);

  const handleDotSelect = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setResetTimerKey((k) => k + 1);
  }, [activeIndex]);

  const currentNotice = visibleNotices[activeIndex] || DEFAULT_NOTICES[0];

  // Resolve formatted date string cleanly
  const formattedDate = useMemo(() => {
    if (currentNotice.date) return currentNotice.date;
    const pDate = parseFirestoreDate(currentNotice.publishDate) || parseFirestoreDate(currentNotice.createdAt);
    if (pDate) {
      return pDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return 'Recent Update';
  }, [currentNotice]);

  const badgeStyle = getCategoryBadgeClass(currentNotice.category);

  // Notice link resolution and compact CTA handling
  const noticeLink = (currentNotice.link || currentNotice.redirectUrl || '').trim();
  const noticeLinkLabel = (currentNotice.linkLabel || currentNotice.actionText || 'View Notice').trim();
  const hasLink = Boolean(noticeLink && noticeLink.length > 0 && noticeLink !== '#');

  const handleNoticeLink = (url: string) => {
    if (!url) return;
    if (isExternalUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      if (url === '/admissions' && onOpenAdmissions) {
        onOpenAdmissions();
      }
      navigate(url);
    }
  };

  // Editorial slide transitions: horizontal glide with subtle fade
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 32 : -32,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.35, ease: 'easeOut' },
        scale: { duration: 0.35, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -32 : 32,
      opacity: 0,
      scale: 0.985,
      transition: {
        x: { duration: 0.25, ease: 'easeIn' },
        opacity: { duration: 0.25 },
      },
    }),
  };

  const imageVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 24 : -24,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -24 : 24,
      opacity: 0,
      scale: 0.97,
      transition: {
        duration: 0.25,
      },
    }),
  };

  const posterImageSource = currentNotice.posterUrl || FALLBACK_IMAGE;

  return (
    <section 
      id="notices-announcements-section" 
      className="w-full bg-[#F4F0EA] py-10 sm:py-14 md:py-18 overflow-hidden box-border relative"
      aria-label="School Updates and Notice Board"
    >
      {/* =========================================================================
          DECORATIVE EDUCATIONAL LINE-ART DOODLES
          Subtle school stationery line-art icons in the outer margins of the section.
          Never overlaps the main notice card or image.
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
        {/* 1. Paper Airplane with dashed flight trail (Upper Left) */}
        <div className="absolute top-8 left-3 sm:left-6 lg:left-12 opacity-35 text-[#E78F68]">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
            <path d="M6 22L42 6L26 42L20 28L6 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 28L42 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 36C8 38 12 36 14 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* 2. School Pencil (Lower Left) */}
        <div className="absolute bottom-10 left-4 sm:left-8 lg:left-14 opacity-25 text-[#3B231A]">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M30 6L38 14L14 38H6V30L30 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 12L32 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 38L12 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 3. Radiant Gentle Sun (Upper Right) */}
        <div className="absolute top-10 right-4 sm:right-8 lg:right-14 opacity-30 text-[#E78F68]">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-9 sm:h-9">
            <circle cx="22" cy="22" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M22 6V10M22 34V38M6 22H10M34 22H38M10.5 10.5L13.5 13.5M30.5 30.5L33.5 33.5M10.5 33.5L13.5 30.5M30.5 13.5L33.5 10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </div>

        {/* 4. Open Book / Notebook (Lower Right) */}
        <div className="absolute bottom-12 right-4 sm:right-8 lg:right-16 opacity-25 text-[#3B231A]">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M6 10C12 8 18 10 22 13C26 10 32 8 38 10V33C32 31 26 33 22 36C18 33 12 31 6 33V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 13V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* 5. Soft Cloud (Desktop Upper Margin) */}
        <div className="absolute top-14 left-1/4 hidden xl:block opacity-20 text-[#3B231A]">
          <svg width="46" height="26" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 24H38C42.4183 24 46 20.4183 46 16C46 11.8284 42.7937 8.4078 38.7188 8.0401C37.5258 3.48625 33.3934 0 28.5 0C23.6304 0 19.5165 3.4542 18.2933 7.9739C17.7121 7.8596 17.1132 7.8 16.5 7.8C10.701 7.8 6 12.501 6 18.3C6 19.3486 6.1537 20.3614 6.4388 21.3179C3.8966 22.0963 2 24.3213 2 27" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 6. Subtle Tiny Star Accents */}
        <div className="absolute top-1/2 left-3 sm:left-7 -translate-y-1/2 hidden sm:block opacity-25 text-[#E78F68]">
          <span className="text-xs">✦</span>
        </div>
        <div className="absolute top-1/2 right-3 sm:right-7 -translate-y-1/2 hidden sm:block opacity-25 text-[#3B231A]">
          <span className="text-xs">✦</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER
            Eyebrow: SCHOOL UPDATES / NOTICE BOARD
            Main heading: What's Happening at Vivekanandha
            Short supporting text
        ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto space-y-2.5 px-4"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-[#E78F68]/12 border border-[#E78F68]/25 text-[#E78F68] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xs">
            <BellRing className="w-3.5 h-3.5 text-[#E78F68]" />
            <span>SCHOOL UPDATES / NOTICE BOARD</span>
          </div>

          {/* Main Heading with refined typography & curved flourish */}
          <div className="relative inline-block pt-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-[#3B231A] tracking-tight leading-tight">
              What’s Happening at Vivekanandha
            </h2>
            {/* Elegant warm-orange underline flourish */}
            <svg 
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-40 sm:w-56 md:w-64 h-2.5 text-[#E78F68]/75 pointer-events-none" 
              viewBox="0 0 240 10" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 6.5C50 2.5 150 1.5 238 7.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Short supporting text */}
          <p className="text-xs sm:text-sm md:text-base text-[#3B231A]/75 font-normal leading-relaxed pt-2 max-w-xl mx-auto">
            Stay informed with our latest school announcements, academic events, student milestones, and admissions notices.
          </p>
        </motion.div>

        {/* =========================================================================
            2. FEATURED NOTICE BOARD PRESENTATION
            Spacious 2-column editorial school newsboard:
            Left: Full-bleed notice image (dominant visual weight, no empty borders)
            Right: Category, title, date, structured description, compact CTA, slide navigation
        ========================================================================= */}
        <div 
          className="relative w-full max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle warm decorative background offset sheet */}
          <div className="absolute inset-0 bg-[#E78F68]/5 border-2 border-[#3B231A]/6 rounded-[22px] sm:rounded-[30px] md:rounded-[36px] translate-x-1.5 translate-y-1.5 pointer-events-none hidden sm:block" />

          {/* Main Editorial Card Container */}
          <div className="relative bg-[#FCFAF7] rounded-[20px] sm:rounded-[26px] md:rounded-[32px] border-2 border-[#3B231A]/10 shadow-[0_12px_40px_rgba(59,35,26,0.06)] overflow-hidden transition-all duration-300">
            
            {/* Top Bar on Card: Progress indicator & Play/Pause toggle */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#3B231A]/8 bg-[#F8F4ED]/80 text-xs text-[#3B231A]/75 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E78F68] animate-pulse" />
                <span className="font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                  Notice {activeIndex + 1} of {visibleNotices.length}
                </span>
              </div>

              {visibleNotices.length > 1 && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#3B231A]/10 hover:border-[#E78F68] hover:text-[#E78F68] text-[#3B231A]/70 transition-all duration-200 cursor-pointer text-[11px] font-mono shadow-2xs"
                  aria-label={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-[#E78F68]" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[#E78F68]" />
                      <span className="hidden sm:inline">Play</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* 2-Column Responsive Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 p-3 sm:p-4 lg:p-5 xl:p-6 items-stretch">
              
              {/* ===================================================================
                  LEFT: FULL-BLEED NOTICE IMAGE
                  Desktop: Occupies ~58% of visual space (col-span-7)
                  Mobile: Stacks first, occupies full width, minimal padding
                  The image completely fills the area with object-cover,
                  eliminating empty dark background bars while preserving artwork clarity.
              =================================================================== */}
              <div className="lg:col-span-7 xl:col-span-7 w-full flex flex-col justify-center order-1">
                <div 
                  className="relative w-full h-[280px] xs:h-[320px] sm:h-[380px] md:h-[430px] lg:h-full min-h-[340px] lg:min-h-[440px] xl:min-h-[460px] rounded-xl sm:rounded-2xl md:rounded-[20px] overflow-hidden shadow-xs border border-[#3B231A]/12 select-none group/artwork bg-[#F0EBE1]"
                >
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={`img-${activeIndex}`}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full overflow-hidden"
                    >
                      {/* Full-bleed foreground notice image */}
                      <img
                        src={posterImageSource}
                        alt={currentNotice.title || 'Notice artwork'}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== FALLBACK_IMAGE) {
                            target.src = FALLBACK_IMAGE;
                          }
                        }}
                        className="w-full h-full object-cover object-top sm:object-center select-none transition-transform duration-700 ease-out group-hover/artwork:scale-[1.015]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* ===================================================================
                  RIGHT: INFORMATION PANEL & EDITORIAL DETAILS
                  Desktop: Occupies ~42% of visual space (col-span-5)
                  Balanced vertical rhythm, rich metadata, compact individual notice CTA
              =================================================================== */}
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between h-full space-y-4 lg:space-y-0 order-2 lg:pl-1">
                
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={`text-${activeIndex}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-3 sm:space-y-3.5"
                  >
                    {/* Badge & Date Header */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${badgeStyle.container}`}>
                        <span className={`w-2 h-2 rounded-full ${badgeStyle.dot}`} />
                        <span>{currentNotice.category || 'Announcement'}</span>
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#3B231A]/70">
                        <Calendar className="w-3.5 h-3.5 text-[#E78F68]" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Notice Main Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-[25px] xl:text-[27px] font-sans font-extrabold text-[#3B231A] leading-[1.25] tracking-tight">
                      {currentNotice.title || 'Official School Notice'}
                    </h3>

                    {/* Subtitle / Tagline */}
                    {currentNotice.subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-[#E78F68] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E78F68] shrink-0" />
                        <span>{currentNotice.subtitle}</span>
                      </p>
                    )}

                    {/* Structured Editorial Description Block */}
                    {currentNotice.description && (
                      <div className="bg-[#F8F4EE] border border-[#3B231A]/8 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm text-[#3B231A]/85 leading-relaxed space-y-2">
                        <p>{currentNotice.description}</p>
                        
                        {/* Campus verification tag */}
                        <div className="pt-2 border-t border-[#3B231A]/8 flex items-center justify-between text-[11px] text-[#3B231A]/60 font-mono">
                          <span>Uthiramerur Campus</span>
                          <span className="text-[#E78F68] font-bold">Verified Notice</span>
                        </div>
                      </div>
                    )}

                    {/* Small Notice CTA — rendered ONLY if this notice has a configured URL */}
                    {hasLink && (
                      <div className="pt-1.5">
                        <button
                          type="button"
                          onClick={() => handleNoticeLink(noticeLink)}
                          className="group inline-flex items-center gap-1.5 bg-[#E78F68] hover:bg-[#D96839] text-white text-xs font-sans font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer w-fit"
                        >
                          <span>{noticeLinkLabel || 'View Notice'}</span>
                          {isExternalUrl(noticeLink) ? (
                            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          )}
                        </button>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {/* ===============================================================
                    SLIDER CONTROLS & PAGINATION
                    Numbered Indicators + Previous / Next Buttons
                =============================================================== */}
                <div className="pt-3 sm:pt-3.5 border-t border-[#3B231A]/10 mt-3 sm:mt-4 flex items-center justify-between gap-3">
                  
                  {/* Interactive Numbered Slide Indicators */}
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    {visibleNotices.map((_, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDotSelect(idx)}
                          className="group py-1 px-1 sm:px-1.5 focus:outline-none cursor-pointer flex items-center gap-1"
                          aria-label={`Go to notice ${idx + 1}`}
                        >
                          <span className={`text-[11px] sm:text-xs font-mono font-bold transition-colors duration-200 ${isActive ? 'text-[#E78F68]' : 'text-[#3B231A]/40 group-hover:text-[#3B231A]/70'}`}>
                            0{idx + 1}
                          </span>
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              isActive 
                                ? 'w-5 sm:w-7 bg-[#E78F68]' 
                                : 'w-1.5 sm:w-2 bg-[#3B231A]/20 group-hover:bg-[#3B231A]/40'
                            }`} 
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Previous / Next Circular Navigation Buttons */}
                  {visibleNotices.length > 1 && (
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#3B231A]/15 bg-white hover:bg-[#E78F68] hover:border-[#E78F68] hover:text-white text-[#3B231A] transition-all duration-200 shadow-2xs flex items-center justify-center active:scale-90 cursor-pointer"
                        aria-label="Previous notice"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#3B231A]/15 bg-white hover:bg-[#E78F68] hover:border-[#E78F68] hover:text-white text-[#3B231A] transition-all duration-200 shadow-2xs flex items-center justify-center active:scale-90 cursor-pointer"
                        aria-label="Next notice"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Gentle Emotional Tagline beneath the board */}
        <div className="mt-8 sm:mt-10 text-center max-w-xl mx-auto space-y-1.5 px-4 relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-1.5">
            <div className="h-px w-8 bg-[#3B231A]/15" />
            <span className="text-[#E78F68] text-xs">✦</span>
            <div className="h-px w-8 bg-[#3B231A]/15" />
          </div>
          <p className="font-serif italic text-sm sm:text-base text-[#3B231A]/85 font-medium">
            “Connecting parents, teachers, and young learners with every milestone.”
          </p>
          <p className="text-[11px] sm:text-xs text-[#3B231A]/60 font-light">
            Vivekanandha School — Vedapalayam Road, Near Angalamman Kovil, Uthiramerur
          </p>
        </div>

      </div>
    </section>
  );
}
