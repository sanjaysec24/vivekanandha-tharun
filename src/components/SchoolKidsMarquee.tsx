import React, { useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface SchoolKidItem {
  id: string;
  name?: string;
  title?: string;
  imageUrl?: string;
  image?: string;
  photoUrl?: string;
  url?: string;
  enabled?: boolean;
  published?: boolean;
  order?: number;
  height?: number | string;
  width?: number | string;
  alt?: string;
}

interface MarqueeDocData {
  enabled?: boolean;
  isPublished?: boolean;
  published?: boolean;
  status?: string;
  items?: SchoolKidItem[];
  kids?: SchoolKidItem[];
  children?: SchoolKidItem[];
  students?: SchoolKidItem[];
  speed?: number;
}

export default function SchoolKidsMarquee() {
  const [cmsKids, setCmsKids] = useState<SchoolKidItem[] | null>(null);
  const [customSpeed, setCustomSpeed] = useState<number | null>(null);

  useEffect(() => {
    if (!db) return;

    // Helper to extract valid, enabled kids from a doc payload
    const extractKidsFromData = (data: MarqueeDocData | undefined): SchoolKidItem[] | null => {
      if (!data) return null;

      // Check document-level published / enabled flags
      if (data.enabled === false) return null;
      if (data.published === false || data.isPublished === false) return null;
      if (data.status && data.status.toLowerCase() !== 'published') return null;

      const rawList = data.items || data.kids || data.children || data.students;
      if (!Array.isArray(rawList) || rawList.length === 0) return null;

      const validList: SchoolKidItem[] = rawList
        .filter((it: any) => {
          if (!it) return false;
          if (it.enabled === false || it.published === false) return false;
          const src = it.imageUrl || it.image || it.photoUrl || it.url;
          return typeof src === 'string' && src.trim().length > 0;
        })
        .map((it: any, idx: number) => ({
          id: it.id || `kid-${idx}-${Date.now()}`,
          name: it.name || it.title || it.alt || 'School Student',
          imageUrl: (it.imageUrl || it.image || it.photoUrl || it.url || '').trim(),
          order: typeof it.order === 'number' ? it.order : idx,
          height: it.height || undefined,
          width: it.width || undefined,
          enabled: it.enabled !== false,
          published: it.published !== false,
        }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      return validList.length > 0 ? validList : null;
    };

    // Subscriptions array for cleanup
    const unsubs: (() => void)[] = [];

    // 1. Primary listener: website_cms/school_kids_marquee
    const unsubPrimary = onSnapshot(
      doc(db, 'website_cms', 'school_kids_marquee'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as MarqueeDocData;
          if (data.speed && typeof data.speed === 'number') {
            setCustomSpeed(data.speed);
          }
          const items = extractKidsFromData(data);
          if (items) {
            setCmsKids(items);
            return;
          }
        }
        // If not found in primary, check secondary docs
        checkSecondarySources();
      },
      (err) => {
        console.warn('Error reading website_cms/school_kids_marquee:', err);
        checkSecondarySources();
      }
    );
    unsubs.push(unsubPrimary);

    // 2. Secondary check across alternative doc names
    const checkSecondarySources = () => {
      // Check website_cms/kids_marquee
      const unsubAlt1 = onSnapshot(
        doc(db, 'website_cms', 'kids_marquee'),
        (snap) => {
          if (snap.exists()) {
            const items = extractKidsFromData(snap.data() as MarqueeDocData);
            if (items) {
              setCmsKids(items);
              return;
            }
          }
        },
        () => {}
      );
      unsubs.push(unsubAlt1);

      // Check website_cms/school_kids
      const unsubAlt2 = onSnapshot(
        doc(db, 'website_cms', 'school_kids'),
        (snap) => {
          if (snap.exists()) {
            const items = extractKidsFromData(snap.data() as MarqueeDocData);
            if (items) {
              setCmsKids(items);
              return;
            }
          }
        },
        () => {}
      );
      unsubs.push(unsubAlt2);
    };

    return () => {
      unsubs.forEach((fn) => fn());
    };
  }, []);

  // Duplicate items symmetrically so that Left-to-Right loop is seamless and filled on any screen resolution
  const loopedKids = useMemo(() => {
    if (!cmsKids || cmsKids.length === 0) return [];

    // Ensure at least 8 items per half so track width comfortably spans wide 4K viewports
    const minPerHalf = Math.max(8, cmsKids.length);
    const repeatCount = Math.ceil(minPerHalf / cmsKids.length);
    const halfSet: SchoolKidItem[] = [];
    for (let i = 0; i < repeatCount; i++) {
      halfSet.push(...cmsKids);
    }

    // Full infinite track consists of identical Set A and Set B
    return [...halfSet, ...halfSet];
  }, [cmsKids]);

  // FALLBACK: If there are no published School Kids Marquee items, hide this section completely.
  // Do not show dummy images.
  if (!cmsKids || cmsKids.length === 0 || loopedKids.length === 0) {
    return null;
  }

  // Animation duration: calm, slow, smooth (default: ~38s desktop, ~30s mobile)
  const durationSec = customSpeed && customSpeed > 10 && customSpeed < 120 ? customSpeed : 38;

  return (
    <section 
      id="school-kids-marquee-section"
      aria-label="School Kids Showcase"
      className="relative w-full bg-[#F4F0EA] py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden select-none"
    >
      {/* Component-Specific Keyframes for Left -> Right Infinite Marquee & Gentle Bobbing */}
      <style>{`
        @keyframes school-kids-marquee-ltr {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .kids-marquee-track-motion {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: school-kids-marquee-ltr ${durationSec}s linear infinite;
        }

        /* Desktop: gently pause on hover */
        @media (hover: hover) and (pointer: fine) {
          .kids-marquee-track-motion:hover {
            animation-play-state: paused;
          }
        }

        /* Individual subtle bobbing animations (does not interfere with horizontal marquee track) */
        @keyframes kid-float-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes kid-float-2 {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(5px); }
        }
        @keyframes kid-float-3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .kid-bob-anim-0 {
          animation: kid-float-1 4.2s ease-in-out infinite;
        }
        .kid-bob-anim-1 {
          animation: kid-float-2 4.8s ease-in-out infinite 0.6s;
        }
        .kid-bob-anim-2 {
          animation: kid-float-3 4.5s ease-in-out infinite 1.2s;
        }
      `}</style>

      {/* Soft Vignette Gradient Overlays on Edges for Seamless Entry & Exit */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-[#F4F0EA] to-transparent z-10" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-[#F4F0EA] to-transparent z-10" 
      />

      {/* Marquee Track Container (No scrollbars, full width) */}
      <div className="w-full overflow-hidden flex items-center">
        <div className="kids-marquee-track-motion items-center py-2 sm:py-3">
          {loopedKids.map((kid, index) => {
            const bobClass = `kid-bob-anim-${index % 3}`;
            // Organic height variation for natural flowing composition
            const heightVariationClass = 
              index % 4 === 0 
                ? 'h-[135px] sm:h-[175px] md:h-[215px] lg:h-[245px] xl:h-[265px]'
                : index % 4 === 1
                  ? 'h-[120px] sm:h-[155px] md:h-[195px] lg:h-[225px] xl:h-[245px]'
                  : index % 4 === 2
                    ? 'h-[140px] sm:h-[180px] md:h-[220px] lg:h-[250px] xl:h-[270px]'
                    : 'h-[125px] sm:h-[160px] md:h-[200px] lg:h-[230px] xl:h-[250px]';

            return (
              <div
                key={`${kid.id}-marquee-${index}`}
                className={`flex-shrink-0 mx-3 sm:mx-5 md:mx-7 lg:mx-9 flex items-center justify-center ${bobClass}`}
              >
                {/* Transparent student image only - no cards, boxes, or borders */}
                <img
                  src={kid.imageUrl}
                  alt={kid.name || 'School Student'}
                  loading="lazy"
                  decoding="async"
                  className={`w-auto max-w-none object-contain pointer-events-none select-none drop-shadow-[0_10px_22px_rgba(58,35,24,0.08)] transition-transform duration-300 ${heightVariationClass}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
