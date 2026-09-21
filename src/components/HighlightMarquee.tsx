import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  Trophy, 
  Sparkles, 
  Leaf, 
  Cpu 
} from 'lucide-react';

export interface MarqueeLogoItem {
  id: string;
  name?: string;
  subtitle?: string;
  logo?: string;
  image?: string;
  imageUrl?: string;
  imagePublicId?: string;
  link?: string;
  enabled: boolean;
  order: number;
  badgeType?: 'award' | 'book' | 'graduation' | 'shield' | 'trophy' | 'sparkles' | 'leaf' | 'cpu';
}

// Fallback structured data when no published CMS items exist
const DEFAULT_MARQUEE_ITEMS: MarqueeLogoItem[] = [
  {
    id: 'cbse-affiliation',
    name: 'CBSE Affiliated',
    subtitle: 'Senior Secondary • New Delhi',
    enabled: true,
    order: 1,
    badgeType: 'graduation',
  },
  {
    id: 'atal-tinkering',
    name: 'Atal Tinkering Lab',
    subtitle: 'NITI Aayog STEM Hub',
    enabled: true,
    order: 2,
    badgeType: 'cpu',
  },
  {
    id: 'fit-india',
    name: 'Fit India School',
    subtitle: 'Sports & Wellness Certified',
    enabled: true,
    order: 3,
    badgeType: 'trophy',
  },
  {
    id: 'cambridge-english',
    name: 'Cambridge English',
    subtitle: 'Language & Literacy Partner',
    enabled: true,
    order: 4,
    badgeType: 'book',
  },
  {
    id: 'eco-campus',
    name: 'Green Eco-Campus',
    subtitle: 'Sustainable School Initiative',
    enabled: true,
    order: 5,
    badgeType: 'leaf',
  },
  {
    id: 'science-congress',
    name: 'National Science Congress',
    subtitle: 'Junior Research Forum',
    enabled: true,
    order: 6,
    badgeType: 'sparkles',
  },
  {
    id: 'tamil-heritage',
    name: 'Tamil Kalai Arangam',
    subtitle: 'Arts & Cultural Heritage',
    enabled: true,
    order: 7,
    badgeType: 'award',
  },
  {
    id: 'academic-excellence',
    name: 'Excellence in Pedagogy',
    subtitle: 'Holistic 360° Learning',
    enabled: true,
    order: 8,
    badgeType: 'shield',
  },
];

interface HighlightMarqueeProps {
  items?: MarqueeLogoItem[];
}

export default function HighlightMarquee({ items }: HighlightMarqueeProps) {
  const [cmsItems, setCmsItems] = useState<MarqueeLogoItem[] | null>(null);
  const [isSectionEnabled, setIsSectionEnabled] = useState<boolean>(true);

  // Subscribe to published Marquee Highlights in website_cms/marquee in real time
  useEffect(() => {
    if (!db) return;

    const unsub = onSnapshot(
      doc(db, 'website_cms', 'marquee'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();

          // Section-level visibility toggle
          if (data.enabled === false) {
            setIsSectionEnabled(false);
            return;
          } else {
            setIsSectionEnabled(true);
          }

          // Check if published (if status field is set, must be 'published')
          if (data.status && data.status !== 'published') {
            setCmsItems(null);
            return;
          }

          // Process and validate items list
          if (Array.isArray(data.items) && data.items.length > 0) {
            const validItems: MarqueeLogoItem[] = data.items
              .filter((it: any) => it && it.enabled !== false && Boolean(it.imageUrl || it.image || it.logo))
              .map((it: any, idx: number) => ({
                id: it.id || `marquee-${idx}`,
                name: it.name || it.title || '',
                subtitle: it.subtitle || '',
                imageUrl: it.imageUrl || it.image || it.logo || '',
                imagePublicId: it.imagePublicId || '',
                link: it.link || it.url || '',
                enabled: it.enabled !== false,
                order: typeof it.order === 'number' ? it.order : idx + 1,
                badgeType: it.badgeType || undefined,
              }))
              .sort((a, b) => a.order - b.order);

            if (validItems.length > 0) {
              setCmsItems(validItems);
            } else {
              setCmsItems(null);
            }
          } else {
            setCmsItems(null);
          }
        } else {
          setCmsItems(null);
        }
      },
      (err) => {
        console.warn('Error reading website_cms/marquee from Firestore:', err);
      }
    );

    return () => unsub();
  }, []);

  if (!isSectionEnabled) {
    return null;
  }

  // Use published CMS items if available, otherwise fall back gracefully
  const activeItems: MarqueeLogoItem[] = (cmsItems && cmsItems.length > 0)
    ? cmsItems
    : (items ? items.filter(it => it.enabled !== false).sort((a, b) => a.order - b.order) : DEFAULT_MARQUEE_ITEMS);

  if (activeItems.length === 0) {
    return null;
  }

  // Ensure the base sequence has enough items to smoothly fill wide viewports before loop reset
  let baseSequence = [...activeItems];
  while (baseSequence.length < 10) {
    baseSequence = [...baseSequence, ...activeItems];
  }

  // Render emblem icon based on badge type
  const renderIcon = (type?: string) => {
    const iconClass = "w-5 h-5 sm:w-6 sm:h-6 text-[#E78F68] transition-colors duration-300 group-hover/item:text-[#D96839]";
    switch (type) {
      case 'award':
        return <Award className={iconClass} />;
      case 'book':
        return <BookOpen className={iconClass} />;
      case 'graduation':
        return <GraduationCap className={iconClass} />;
      case 'shield':
        return <ShieldCheck className={iconClass} />;
      case 'trophy':
        return <Trophy className={iconClass} />;
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'leaf':
        return <Leaf className={iconClass} />;
      case 'cpu':
        return <Cpu className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const renderItem = (item: MarqueeLogoItem, keyPrefix: string, index: number) => {
    const imgUrl = item.imageUrl || item.image || item.logo;
    const hasImage = Boolean(imgUrl && imgUrl.trim() !== '');

    const Content = hasImage ? (
      <div className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
        <img
          src={imgUrl}
          alt={item.name || item.id || 'Institutional Highlight'}
          className="h-[64px] sm:h-[84px] md:h-[108px] lg:h-[126px] w-auto max-w-[200px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[380px] object-contain shrink-0 select-none pointer-events-none"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    ) : (
      <div className="flex items-center gap-3.5 sm:gap-4 shrink-0 select-none py-0.5">
        <div className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center text-[#E78F68] shrink-0">
          {renderIcon(item.badgeType)}
        </div>
        <div className="flex flex-col text-left whitespace-nowrap">
          <span className="text-sm sm:text-base md:text-lg font-serif font-bold text-[#3B231A] tracking-tight leading-tight">
            {item.name}
          </span>
          {item.subtitle && (
            <span className="text-[10px] sm:text-xs font-mono text-[#3B231A]/65 font-medium tracking-wider uppercase leading-tight mt-0.5">
              {item.subtitle}
            </span>
          )}
        </div>
      </div>
    );

    if (item.link && item.link.trim() !== '' && item.link !== '#') {
      const isExternal = item.link.startsWith('http://') || item.link.startsWith('https://');
      return (
        <a
          key={`${keyPrefix}-${item.id}-${index}`}
          href={item.link}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="shrink-0 flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-[#E78F68]/50 rounded-lg"
        >
          {Content}
        </a>
      );
    }

    return (
      <div key={`${keyPrefix}-${item.id}-${index}`} className="shrink-0 flex items-center justify-center">
        {Content}
      </div>
    );
  };

  return (
    <section 
      id="home-highlights-marquee"
      className="w-full bg-[#F5F1EB] py-0.5 sm:py-1 md:py-1.5 overflow-hidden box-border relative select-none"
      aria-label="Accreditations and Institutional Highlights"
    >
      {/* Component-Specific Keyframes for Hardware-Accelerated Smooth Continuous Marquee */}
      <style>{`
        @keyframes marquee-continuous {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .marquee-track-motion {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee-continuous 38s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track-motion {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Subtle Lateral Vignette Edge Fades */}
      <div 
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[#F5F1EB] to-transparent z-10"
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[#F5F1EB] to-transparent z-10"
        aria-hidden="true"
      />

      {/* Continuous Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="marquee-track-motion items-center">
          
          {/* First Sequence */}
          <div className="flex items-center gap-10 sm:gap-14 md:gap-20 lg:gap-24 shrink-0 pr-10 sm:pr-14 md:pr-20 lg:pr-24">
            {baseSequence.map((item, idx) => renderItem(item, 'set-a', idx))}
          </div>

          {/* Second Duplicate Sequence (Enables Infinite Seamless Reset) */}
          <div className="flex items-center gap-10 sm:gap-14 md:gap-20 lg:gap-24 shrink-0 pr-10 sm:pr-14 md:pr-20 lg:pr-24" aria-hidden="true">
            {baseSequence.map((item, idx) => renderItem(item, 'set-b', idx))}
          </div>

        </div>
      </div>
    </section>
  );
}
