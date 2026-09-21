import React from 'react';
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
  name: string;
  subtitle?: string;
  logo?: string;
  image?: string;
  link?: string;
  enabled: boolean;
  order: number;
  badgeType?: 'award' | 'book' | 'graduation' | 'shield' | 'trophy' | 'sparkles' | 'leaf' | 'cpu';
}

// Initial structured data for accreditation, curriculum, and educational partners
// Can be cleanly replaced or augmented by CMS data in future steps without breaking the visual system
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

export default function HighlightMarquee({ items = DEFAULT_MARQUEE_ITEMS }: HighlightMarqueeProps) {
  // Sort and filter active items
  const activeItems = items
    .filter(item => item.enabled !== false)
    .sort((a, b) => a.order - b.order);

  if (activeItems.length === 0) {
    return null;
  }

  // Render emblem icon based on badge type
  const renderIcon = (type?: string) => {
    const iconClass = "w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#E78F68] transition-colors duration-300 group-hover/item:text-[#D96839]";
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

  const renderItemCard = (item: MarqueeLogoItem, keyPrefix: string) => {
    const Content = (
      <div className="flex items-center gap-2.5 sm:gap-3.5 px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-[#FAF7F2] border border-[#3B231A]/10 hover:border-[#E78F68]/45 shadow-[0_2px_8px_rgba(59,35,26,0.03)] hover:shadow-[0_4px_14px_rgba(59,35,26,0.07)] transition-all duration-300 select-none group/item cursor-default shrink-0">
        {/* Logo Image or Crisp Monogram Badge */}
        {item.logo || item.image ? (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden flex items-center justify-center bg-white border border-[#3B231A]/08 shrink-0">
            <img
              src={item.logo || item.image}
              alt={item.name}
              className="w-full h-full object-contain p-0.5"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E78F68]/12 border border-[#E78F68]/25 flex items-center justify-center shrink-0">
            {renderIcon(item.badgeType)}
          </div>
        )}

        {/* Text Details */}
        <div className="flex flex-col text-left whitespace-nowrap">
          <span className="text-xs sm:text-[13px] font-sans font-bold text-[#3B231A] tracking-tight group-hover/item:text-[#2B1710] transition-colors leading-tight">
            {item.name}
          </span>
          {item.subtitle && (
            <span className="text-[9px] sm:text-[10px] font-mono text-[#3B231A]/60 font-medium tracking-wider uppercase leading-tight mt-0.5">
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
          key={`${keyPrefix}-${item.id}`}
          href={item.link}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="focus:outline-hidden focus:ring-2 focus:ring-[#E78F68]/50 rounded-full"
        >
          {Content}
        </a>
      );
    }

    return (
      <div key={`${keyPrefix}-${item.id}`} className="inline-block">
        {Content}
      </div>
    );
  };

  return (
    <section 
      id="home-highlights-marquee"
      className="w-full bg-[#F4F0EA] border-y border-[#3B231A]/08 py-3.5 sm:py-4.5 overflow-hidden box-border relative select-none"
      aria-label="Accreditations and Institutional Highlights"
    >
      {/* Component-Specific Keyframes for Hardware-Accelerated Smooth Marquee */}
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
          animation: marquee-continuous 32s linear infinite;
        }

        @media (hover: hover) and (pointer: fine) {
          .marquee-container-hover:hover .marquee-track-motion {
            animation-play-state: paused;
          }
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
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#F4F0EA] via-[#F4F0EA]/80 to-transparent z-10"
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#F4F0EA] via-[#F4F0EA]/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Continuous Marquee Wrapper */}
      <div className="marquee-container-hover relative w-full overflow-hidden">
        <div className="marquee-track-motion">
          
          {/* First Sequence */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-6 shrink-0 pr-3 sm:pr-5 md:pr-6">
            {activeItems.map(item => renderItemCard(item, 'set-a'))}
          </div>

          {/* Second Duplicate Sequence (Enables Infinite Seamless Reset) */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-6 shrink-0 pr-3 sm:pr-5 md:pr-6" aria-hidden="true">
            {activeItems.map(item => renderItemCard(item, 'set-b'))}
          </div>

        </div>
      </div>
    </section>
  );
}
