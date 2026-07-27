import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Sun, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from '../lib/router';

interface PromoSectionsProps {
  onOpenAdmissions: () => void;
}

interface CardData {
  badge?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  btnText?: string;
  buttonUrl?: string;
  btnUrl?: string;
  url?: string;
  image?: string;
  imageUrl?: string;
  bgColor?: string;
  backgroundColor?: string;
}

interface PromotionsCMSData {
  // Nested card structures
  leftCard?: CardData;
  rightCard?: CardData;
  left?: CardData;
  right?: CardData;
  card1?: CardData;
  card2?: CardData;
  left_card?: CardData;
  right_card?: CardData;

  // Array structure
  cards?: CardData[];
  items?: CardData[];
  promotions?: CardData[];

  // Flat left card fields
  leftBadge?: string;
  left_badge?: string;
  leftTitle?: string;
  left_title?: string;
  leftDescription?: string;
  left_description?: string;
  leftButtonText?: string;
  left_button_text?: string;
  leftBtnText?: string;
  leftButtonUrl?: string;
  left_button_url?: string;
  leftBtnUrl?: string;
  leftLink?: string;
  leftImage?: string;
  leftImageUrl?: string;
  left_image_url?: string;
  leftBgColor?: string;
  leftBackgroundColor?: string;
  left_bg_color?: string;

  // Flat right card fields
  rightBadge?: string;
  right_badge?: string;
  rightTitle?: string;
  right_title?: string;
  rightDescription?: string;
  right_description?: string;
  rightButtonText?: string;
  right_button_text?: string;
  rightBtnText?: string;
  rightButtonUrl?: string;
  right_button_url?: string;
  rightBtnUrl?: string;
  rightLink?: string;
  rightImage?: string;
  rightImageUrl?: string;
  right_image_url?: string;
  rightBgColor?: string;
  rightBackgroundColor?: string;
  right_bg_color?: string;

  // Generic flat index fields
  title1?: string;
  description1?: string;
  buttonText1?: string;
  buttonUrl1?: string;
  image1?: string;
  imageUrl1?: string;
  bgColor1?: string;
  badge1?: string;

  title2?: string;
  description2?: string;
  buttonText2?: string;
  buttonUrl2?: string;
  image2?: string;
  imageUrl2?: string;
  bgColor2?: string;
  badge2?: string;
}

interface StatItem {
  value?: string;
  number?: string;
  title?: string;
  label?: string;
  description?: string;
  subtitle?: string;
  icon?: string;
}

interface EducationalHighlightCMSData {
  // Badge
  admissionsBadge?: string;
  badge?: string;
  badgeText?: string;
  badge_text?: string;
  admissions_badge?: string;

  // Heading & Highlighted Word
  heading?: string;
  title?: string;
  mainHeading?: string;
  main_heading?: string;
  highlightedWord?: string;
  highlightWord?: string;
  highlight?: string;
  highlighted_word?: string;
  highlight_word?: string;
  headingSuffix?: string;
  heading_suffix?: string;
  suffix?: string;

  // Description
  description?: string;
  subheading?: string;
  subtitle?: string;
  content?: string;

  // Button Text & URL
  buttonText?: string;
  btnText?: string;
  buttonLabel?: string;
  button_text?: string;
  btn_text?: string;
  buttonUrl?: string;
  btnUrl?: string;
  buttonLink?: string;
  button_url?: string;
  btn_url?: string;
  link?: string;
  url?: string;

  // Right Side Image (Cloudinary URL or standard)
  rightSideImage?: string;
  image?: string;
  imageUrl?: string;
  rightImage?: string;
  right_side_image?: string;
  image_url?: string;
  cloudinaryUrl?: string;

  // Statistics
  statistics?: StatItem[];
  stats?: StatItem[];
  metrics?: StatItem[];
  items?: StatItem[];
  // Flat statistics fields
  stat1Value?: string;
  stat1_value?: string;
  stat1Label?: string;
  stat1_label?: string;
  stat1Title?: string;
  stat1Description?: string;
  stat1_description?: string;
  
  stat2Value?: string;
  stat2_value?: string;
  stat2Label?: string;
  stat2_label?: string;
  stat2Title?: string;
  stat2Description?: string;
  stat2_description?: string;

  // Appearance Colours
  appearance?: {
    accentColor?: string;
    highlightColor?: string;
    backdropColor?: string;
    imageBackdropColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    badgeBgColor?: string;
    textColor?: string;
  };
  colors?: {
    accentColor?: string;
    highlightColor?: string;
    backdropColor?: string;
    imageBackdropColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    badgeBgColor?: string;
    textColor?: string;
  };
  accentColor?: string;
  accent_color?: string;
  highlightColor?: string;
  highlight_color?: string;
  themeColor?: string;
  primaryColor?: string;
  backdropColor?: string;
  imageBackdropColor?: string;
  backdrop_color?: string;
  buttonBgColor?: string;
  button_bg_color?: string;
  buttonTextColor?: string;
  button_text_color?: string;
  badgeBgColor?: string;
  badge_bg_color?: string;
  textColor?: string;
  text_color?: string;
}

function getSafeString(val: any): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val.trim();
  if (typeof val === 'number' || typeof val === 'boolean') return String(val).trim();
  if (typeof val === 'object') {
    if (typeof val.secure_url === 'string') return val.secure_url.trim();
    if (typeof val.url === 'string') return val.url.trim();
    if (typeof val.src === 'string') return val.src.trim();
    if (typeof val.path === 'string') return val.path.trim();
  }
  return String(val).trim();
}

const DEFAULT_LEFT = {
  badge: '',
  title: 'Confidence that builds a brighter future.',
  description: 'Empowering kids with the confidence to tackle advanced challenges, speak in public forums, and create a successful, fulfilling life path.',
  buttonText: 'Book Now',
  buttonUrl: '',
  image: '/images/vleo_mascot.png',
  bgColor: '#EAB308',
};

const DEFAULT_RIGHT = {
  badge: '',
  title: 'Helping kids to shoot their dreams.',
  description: 'Inspiring children to aim high, achieve mastery in creative fields, and embrace positive, dynamic mindsets.',
  buttonText: 'Learn More',
  buttonUrl: '',
  image: '',
  bgColor: '#E78F68',
};

export default function PromoSections({ onOpenAdmissions }: PromoSectionsProps) {
  const { navigate } = useRouter();
  const [cmsData, setCmsData] = useState<PromotionsCMSData | null>(null);
  const [eduData, setEduData] = useState<EducationalHighlightCMSData | null>(null);

  useEffect(() => {
    if (!db) return;

    const unsubPromos = onSnapshot(
      doc(db, 'website_cms', 'promotions'),
      (docSnap) => {
        if (docSnap.exists()) {
          setCmsData(docSnap.data() as PromotionsCMSData);
        }
      },
      (err) => {
        console.warn('Error reading website_cms/promotions from Firestore:', err);
      }
    );

    const unsubEdu = onSnapshot(
      doc(db, 'website_cms', 'educational_highlight'),
      (docSnap) => {
        if (docSnap.exists()) {
          setEduData(docSnap.data() as EducationalHighlightCMSData);
        }
      },
      (err) => {
        console.warn('Error reading website_cms/educational_highlight from Firestore:', err);
      }
    );

    return () => {
      unsubPromos();
      unsubEdu();
    };
  }, []);

  // Left card data resolution
  const leftObj =
    cmsData?.leftCard ||
    cmsData?.left ||
    cmsData?.card1 ||
    cmsData?.left_card ||
    cmsData?.cards?.[0] ||
    cmsData?.items?.[0] ||
    cmsData?.promotions?.[0];

  const leftBadge =
    leftObj?.badge ||
    cmsData?.leftBadge ||
    cmsData?.left_badge ||
    cmsData?.badge1 ||
    DEFAULT_LEFT.badge;

  const leftTitle =
    leftObj?.title ||
    cmsData?.leftTitle ||
    cmsData?.left_title ||
    cmsData?.title1 ||
    DEFAULT_LEFT.title;

  const leftDescription =
    leftObj?.description ||
    cmsData?.leftDescription ||
    cmsData?.left_description ||
    cmsData?.description1 ||
    DEFAULT_LEFT.description;

  const leftButtonText =
    leftObj?.buttonText ||
    leftObj?.btnText ||
    cmsData?.leftButtonText ||
    cmsData?.left_button_text ||
    cmsData?.leftBtnText ||
    cmsData?.buttonText1 ||
    DEFAULT_LEFT.buttonText;

  const leftButtonUrl =
    leftObj?.buttonUrl ||
    leftObj?.btnUrl ||
    leftObj?.url ||
    cmsData?.leftButtonUrl ||
    cmsData?.left_button_url ||
    cmsData?.leftBtnUrl ||
    cmsData?.leftLink ||
    cmsData?.buttonUrl1 ||
    DEFAULT_LEFT.buttonUrl;

  const leftImage =
    leftObj?.image ||
    leftObj?.imageUrl ||
    cmsData?.leftImage ||
    cmsData?.leftImageUrl ||
    cmsData?.left_image_url ||
    cmsData?.image1 ||
    cmsData?.imageUrl1 ||
    DEFAULT_LEFT.image;

  const leftBgColor =
    leftObj?.bgColor ||
    leftObj?.backgroundColor ||
    cmsData?.leftBgColor ||
    cmsData?.leftBackgroundColor ||
    cmsData?.left_bg_color ||
    cmsData?.bgColor1 ||
    DEFAULT_LEFT.bgColor;

  // Right card data resolution
  const rightObj =
    cmsData?.rightCard ||
    cmsData?.right ||
    cmsData?.card2 ||
    cmsData?.right_card ||
    cmsData?.cards?.[1] ||
    cmsData?.items?.[1] ||
    cmsData?.promotions?.[1];

  const rightBadge =
    rightObj?.badge ||
    cmsData?.rightBadge ||
    cmsData?.right_badge ||
    cmsData?.badge2 ||
    DEFAULT_RIGHT.badge;

  const rightTitle =
    rightObj?.title ||
    cmsData?.rightTitle ||
    cmsData?.right_title ||
    cmsData?.title2 ||
    DEFAULT_RIGHT.title;

  const rightDescription =
    rightObj?.description ||
    cmsData?.rightDescription ||
    cmsData?.right_description ||
    cmsData?.description2 ||
    DEFAULT_RIGHT.description;

  const rightButtonText =
    rightObj?.buttonText ||
    rightObj?.btnText ||
    cmsData?.rightButtonText ||
    cmsData?.right_button_text ||
    cmsData?.rightBtnText ||
    cmsData?.buttonText2 ||
    DEFAULT_RIGHT.buttonText;

  const rightButtonUrl =
    rightObj?.buttonUrl ||
    rightObj?.btnUrl ||
    rightObj?.url ||
    cmsData?.rightButtonUrl ||
    cmsData?.right_button_url ||
    cmsData?.rightBtnUrl ||
    cmsData?.rightLink ||
    cmsData?.buttonUrl2 ||
    DEFAULT_RIGHT.buttonUrl;

  const rightImage =
    rightObj?.image ||
    rightObj?.imageUrl ||
    cmsData?.rightImage ||
    cmsData?.rightImageUrl ||
    cmsData?.right_image_url ||
    cmsData?.image2 ||
    cmsData?.imageUrl2 ||
    DEFAULT_RIGHT.image;

  const rightBgColor =
    rightObj?.bgColor ||
    rightObj?.backgroundColor ||
    cmsData?.rightBgColor ||
    cmsData?.rightBackgroundColor ||
    cmsData?.right_bg_color ||
    cmsData?.bgColor2 ||
    DEFAULT_RIGHT.bgColor;

  // Educational Highlight CMS Data Resolution
  const eduBadge = getSafeString(
    eduData?.admissionsBadge ||
    eduData?.badge ||
    eduData?.badgeText ||
    eduData?.badge_text ||
    eduData?.admissions_badge
  ) || 'Admissions On Going';

  const eduHeadingRaw = getSafeString(
    eduData?.heading ||
    eduData?.title ||
    eduData?.mainHeading ||
    eduData?.main_heading
  ) || 'Empower your kids to think, be';

  const eduHighlightWord = getSafeString(
    eduData?.highlightedWord ||
    eduData?.highlightWord ||
    eduData?.highlight ||
    eduData?.highlighted_word ||
    eduData?.highlight_word
  ) || 'smarter';

  const eduHeadingSuffix = getSafeString(
    eduData?.headingSuffix ||
    eduData?.heading_suffix ||
    eduData?.suffix
  ) || 'and sharper';

  const eduDescription = getSafeString(
    eduData?.description ||
    eduData?.subheading ||
    eduData?.subtitle ||
    eduData?.content
  ) || 'Encourage children to think critically, be exceptionally creative, and solve practical, real-world problems for a better, more harmonious future.';

  const eduButtonText = getSafeString(
    eduData?.buttonText ||
    eduData?.btnText ||
    eduData?.buttonLabel ||
    eduData?.button_text ||
    eduData?.btn_text
  ) || 'Get Educated';

  const eduButtonUrl = getSafeString(
    eduData?.buttonUrl ||
    eduData?.btnUrl ||
    eduData?.buttonLink ||
    eduData?.button_url ||
    eduData?.btn_url ||
    eduData?.link ||
    eduData?.url
  );

  const rawEduImage =
    eduData?.cloudinaryUrl ||
    eduData?.rightSideImage ||
    eduData?.image ||
    eduData?.imageUrl ||
    eduData?.rightImage ||
    eduData?.right_side_image ||
    eduData?.image_url;

  const eduImageUrl = getSafeString(rawEduImage);

  // Image handling: if eduData has been fetched and image is explicitly empty or 'none', set to null to hide gracefully without placeholder.
  // If eduData is null (e.g. initial load or fallback), fallback to default image.
  const eduImage =
    eduData !== null
      ? (eduImageUrl !== '' && eduImageUrl !== 'none' ? eduImageUrl : null)
      : '/images/tec_girl.png';

  // Statistics
  const statsList =
    eduData?.statistics ||
    eduData?.stats ||
    eduData?.metrics ||
    eduData?.items;

  const stat1Val = getSafeString(
    statsList?.[0]?.value ||
    statsList?.[0]?.number ||
    eduData?.stat1Value ||
    eduData?.stat1_value
  ) || '45M+';

  const stat1Lbl = getSafeString(
    statsList?.[0]?.label ||
    statsList?.[0]?.title ||
    eduData?.stat1Label ||
    eduData?.stat1_label ||
    eduData?.stat1Title
  ) || 'Scholar Hours';

  const stat1Desc = getSafeString(
    statsList?.[0]?.description ||
    statsList?.[0]?.subtitle ||
    eduData?.stat1Description ||
    eduData?.stat1_description
  ) || 'Logged across global community programs.';

  const stat2Val = getSafeString(
    statsList?.[1]?.value ||
    statsList?.[1]?.number ||
    eduData?.stat2Value ||
    eduData?.stat2_value
  ) || '164+';

  const stat2Lbl = getSafeString(
    statsList?.[1]?.label ||
    statsList?.[1]?.title ||
    eduData?.stat2Label ||
    eduData?.stat2_label ||
    eduData?.stat2Title
  ) || 'Olympiad Honors';

  const stat2Desc = getSafeString(
    statsList?.[1]?.description ||
    statsList?.[1]?.subtitle ||
    eduData?.stat2Description ||
    eduData?.stat2_description
  ) || 'Gold distinctions in chess & sciences.';

  // Appearance Colours
  const eduAccentColor = getSafeString(
    eduData?.appearance?.accentColor ||
    eduData?.appearance?.highlightColor ||
    eduData?.colors?.accentColor ||
    eduData?.colors?.highlightColor ||
    eduData?.accentColor ||
    eduData?.accent_color ||
    eduData?.highlightColor ||
    eduData?.highlight_color ||
    eduData?.themeColor ||
    eduData?.primaryColor
  ) || '#4B8B77';

  const eduBackdropColor = getSafeString(
    eduData?.appearance?.imageBackdropColor ||
    eduData?.appearance?.backdropColor ||
    eduData?.colors?.imageBackdropColor ||
    eduData?.colors?.backdropColor ||
    eduData?.imageBackdropColor ||
    eduData?.backdropColor ||
    eduData?.backdrop_color
  ) || '#5B92E5';

  const eduButtonBgColor = getSafeString(
    eduData?.appearance?.buttonBgColor ||
    eduData?.colors?.buttonBgColor ||
    eduData?.buttonBgColor ||
    eduData?.button_bg_color
  ) || '#E78F68';

  const eduButtonTextColor = getSafeString(
    eduData?.appearance?.buttonTextColor ||
    eduData?.colors?.buttonTextColor ||
    eduData?.buttonTextColor ||
    eduData?.button_text_color
  ) || '#FFFFFF';

  const eduBadgeBgColor = getSafeString(
    eduData?.appearance?.badgeBgColor ||
    eduData?.colors?.badgeBgColor ||
    eduData?.badgeBgColor ||
    eduData?.badge_bg_color
  );

  const eduTextColor = getSafeString(
    eduData?.appearance?.textColor ||
    eduData?.colors?.textColor ||
    eduData?.textColor ||
    eduData?.text_color
  ) || '#3B231A';

  const handleEduButtonClick = () => {
    const trimmedUrl = getSafeString(eduButtonUrl);
    if (trimmedUrl !== '') {
      if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
        window.open(trimmedUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      if (trimmedUrl.startsWith('/')) {
        navigate(trimmedUrl);
        return;
      }
      if (trimmedUrl.startsWith('#')) {
        const el = document.querySelector(trimmedUrl);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }
    onOpenAdmissions();
  };

  const renderEduHeading = () => {
    if (!eduHeadingRaw) return null;

    if (eduHeadingRaw.includes('{highlight}') || eduHeadingRaw.includes('{word}')) {
      const parts = eduHeadingRaw.split(/\{highlight\}|\{word\}/);
      return (
        <>
          {parts[0]}
          <span className="italic" style={{ color: eduAccentColor }}>
            {eduHighlightWord}
          </span>
          {parts[1] || ''}
        </>
      );
    }

    if (eduHighlightWord !== '') {
      const lowerHeading = eduHeadingRaw.toLowerCase();
      const lowerHighlight = eduHighlightWord.toLowerCase();
      const matchIndex = lowerHeading.indexOf(lowerHighlight);

      if (matchIndex !== -1) {
        const prefix = eduHeadingRaw.slice(0, matchIndex);
        const matchedWord = eduHeadingRaw.slice(matchIndex, matchIndex + eduHighlightWord.length);
        const suffix = eduHeadingRaw.slice(matchIndex + eduHighlightWord.length);

        return (
          <>
            {prefix}
            <span className="italic" style={{ color: eduAccentColor }}>
              {matchedWord}
            </span>
            {suffix}
          </>
        );
      }
    }

    return (
      <>
        {eduHeadingRaw}{' '}
        <span className="italic" style={{ color: eduAccentColor }}>
          {eduHighlightWord}
        </span>
        {eduHeadingSuffix ? ` ${eduHeadingSuffix}` : ''}
      </>
    );
  };

  const handleButtonClick = (url: any) => {
    const trimmedUrl = getSafeString(url);
    if (trimmedUrl !== '') {
      if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
        window.open(trimmedUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      if (trimmedUrl.startsWith('/')) {
        navigate(trimmedUrl);
        return;
      }
      if (trimmedUrl.startsWith('#')) {
        const el = document.querySelector(trimmedUrl);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }
    onOpenAdmissions();
  };

  return (
    <section id="promo-container" className="bg-[#F5F1EB] py-16 px-6 md:px-12 space-y-24">
      
      {/* SECTION 6: Side-by-Side Promotional Cards */}
      <div id="promo-cards-row" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Promocard (60% / 7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: leftBgColor }}
          className="col-span-1 lg:col-span-7 rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-md group transition-colors duration-500"
        >
          {/* Subtle Pencil Drawing Graphic in background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
              <path d="M50 50C100 50 150 150 200 50C250 -50 300 50 350 150" stroke="black" strokeWidth="4" />
            </svg>
          </div>

          <div className="max-w-md space-y-4 z-10 text-[#3B231A]">
            {leftBadge && (
              <span className="inline-block bg-white/30 text-[#3B231A] border border-[#3B231A]/10 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide w-fit">
                {leftBadge}
              </span>
            )}
            <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
              {leftTitle}
            </h3>
            <p className="text-sm opacity-85 leading-relaxed font-sans font-light">
              {leftDescription}
            </p>
          </div>

          {/* Promotional Image / Mascot */}
          {leftImage && (
            <div className="absolute right-2 bottom-0 w-[42%] max-w-[240px] z-10 pointer-events-none flex items-end justify-end">
              <img
                src={leftImage}
                alt={leftTitle || "Promotional Graphic"}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain object-bottom drop-shadow-xl"
              />
            </div>
          )}

          <div className="pt-8 z-10">
            <button
              onClick={() => handleButtonClick(leftButtonUrl)}
              className="inline-flex items-center space-x-2 bg-white text-[#3B231A] font-semibold px-6 py-3 rounded-full hover:bg-[#3B231A] hover:text-[#F5F1EB] transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>{leftButtonText}</span>
              <ArrowUpRight className="w-4 h-4 text-[#E78F68]" />
            </button>
          </div>
        </motion.div>

        {/* Right Promocard (40% / 5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ backgroundColor: rightBgColor }}
          className="col-span-1 lg:col-span-5 rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-md group text-white transition-colors duration-500"
        >
          {/* Floating Star icon in corner */}
          <div className="absolute top-6 right-6 text-white/30 animate-pulse">
            <Star className="w-8 h-8 fill-current" />
          </div>

          <div className="space-y-4 z-10">
            {rightBadge && (
              <span className="inline-block bg-white/20 text-white border border-white/20 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide w-fit">
                {rightBadge}
              </span>
            )}
            <h3 className="text-3xl font-serif font-bold leading-tight">
              {rightTitle}
            </h3>
            <p className="text-sm text-white/85 leading-relaxed font-sans font-light">
              {rightDescription}
            </p>
          </div>

          {/* Right image or custom styled SVG windmill/pinwheel drawing */}
          {rightImage ? (
            <div className="absolute right-2 bottom-0 w-[42%] max-w-[240px] z-10 pointer-events-none flex items-end justify-end">
              <img
                src={rightImage}
                alt={rightTitle || "Promotional Graphic"}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain object-bottom drop-shadow-xl"
              />
            </div>
          ) : (
            <div className="absolute right-6 bottom-4 pointer-events-none opacity-20 transform group-hover:rotate-45 transition-transform duration-1000">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <line x1="50" y1="50" x2="50" y2="95" stroke="white" strokeWidth="3" />
                <path d="M50 50L25 35C25 35 30 25 45 35L50 50Z" fill="white" />
                <path d="M50 50L75 65C75 65 70 75 55 65L50 50Z" fill="white" />
                <path d="M50 50L35 75C35 75 25 70 35 55L50 50Z" fill="white" />
                <path d="M50 50L65 25C65 25 75 30 65 45L50 50Z" fill="white" />
                <circle cx="50" cy="50" r="5" fill="#EAB308" />
              </svg>
            </div>
          )}

          <div className="pt-8 z-10">
            <button
              onClick={() => handleButtonClick(rightButtonUrl)}
              className="inline-flex items-center space-x-2 bg-white text-[#3B231A] font-semibold px-6 py-3 rounded-full hover:bg-[#3B231A] hover:text-[#F5F1EB] transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>{rightButtonText}</span>
              <ArrowUpRight className="w-4 h-4 text-[#E78F68]" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* SECTION 7: Two-Column "Empower Children" / Educational Highlight Section */}
      <div id="empower-section" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left details (5 cols) */}
        <div id="empower-left" className="lg:col-span-5 space-y-6">
          {eduBadge && (
            <div 
              className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: eduBadgeBgColor || `${eduAccentColor}1A`,
                borderColor: `${eduAccentColor}33`,
                color: eduAccentColor,
              }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: eduAccentColor }}></span>
              <span>{eduBadge}</span>
            </div>
          )}

          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-[1.15] tracking-tight" style={{ color: eduTextColor }}>
            {renderEduHeading()}
          </h2>

          <p className="text-base font-sans font-light leading-relaxed" style={{ color: eduTextColor, opacity: 0.8 }}>
            {eduDescription}
          </p>

          <div className="pt-2">
            <button
              onClick={handleEduButtonClick}
              style={{
                backgroundColor: eduButtonBgColor,
                color: eduButtonTextColor,
              }}
              className="group inline-flex items-center space-x-2 font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>{eduButtonText}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Image with statistics overlay (7 cols) */}
        <div id="empower-right" className="lg:col-span-7 relative flex justify-center lg:justify-end">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Soft blue arched backdrop with dynamic image */}
            {eduImage && (
              <div 
                className="w-[280px] sm:w-[340px] md:w-[400px] aspect-[1/1] rounded-[36px] rounded-tl-[180px] rounded-br-[180px] overflow-hidden relative shadow-lg"
                style={{ backgroundColor: eduBackdropColor }}
              >
                <img
                  src={eduImage}
                  alt={eduHeadingRaw || 'Educational Highlight'}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-bottom pt-4 hover:scale-105 transition-all duration-700"
                />
              </div>
            )}

            {/* Small floating decorative planet on right margin */}
            <div 
              className="absolute -right-6 top-8 w-14 h-14 rounded-full border-4 border-white shadow-xl flex items-center justify-center animate-bounce duration-[6000ms]"
              style={{
                background: `linear-gradient(to top right, ${eduAccentColor}, #34d399)`
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="transform rotate-12">
                <circle cx="12" cy="12" r="8" />
                <path d="M2 12C2 12 6 8 12 8C18 8 22 12 22 12" />
                <path d="M2 12C2 12 6 16 12 16C18 16 22 12 22 12" />
                <path d="M2 12C2 12 6 16 12 16C18 16 22 12 22 12" />
              </svg>
            </div>

            {/* Floating double statistics board */}
            {(stat1Val || stat2Val) && (
              <div 
                id="empower-stats-overlay"
                className="absolute -bottom-10 right-4 left-4 md:-left-12 md:right-auto bg-white border border-[#3B231A]/10 p-6 rounded-[28px] shadow-xl grid grid-cols-2 gap-6 divide-x divide-[#3B231A]/10 z-20 max-w-md"
              >
                {/* Stat Column 1 */}
                {stat1Val && (
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" style={{ color: eduAccentColor }} />
                    <div>
                      <h4 className="text-xl font-serif font-bold text-[#3B231A]">{stat1Val}</h4>
                      {stat1Lbl && <p className="text-[10px] text-[#3B231A]/70 uppercase tracking-wider font-semibold">{stat1Lbl}</p>}
                      {stat1Desc && <p className="text-[10px] text-[#3B231A]/50 mt-1">{stat1Desc}</p>}
                    </div>
                  </div>
                )}

                {/* Stat Column 2 */}
                {stat2Val && (
                  <div className="pl-4 flex items-start space-x-3">
                    <Sun className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5 animate-spin duration-[8000ms]" />
                    <div>
                      <h4 className="text-xl font-serif font-bold text-[#3B231A]">{stat2Val}</h4>
                      {stat2Lbl && <p className="text-[10px] text-[#3B231A]/70 uppercase tracking-wider font-semibold">{stat2Lbl}</p>}
                      {stat2Desc && <p className="text-[10px] text-[#3B231A]/50 mt-1">{stat2Desc}</p>}
                    </div>
                  </div>
                )}
              </div>
            )}

          </motion.div>

        </div>

      </div>

    </section>
  );
}

