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

  useEffect(() => {
    if (!db) return;

    const unsub = onSnapshot(
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

    return () => unsub();
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

  const handleButtonClick = (url: string | undefined) => {
    if (url && url.trim() !== '') {
      const trimmedUrl = url.trim();
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

      {/* SECTION 7: Two-Column "Empower Children" Section */}
      <div id="empower-section" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left details (5 cols) */}
        <div id="empower-left" className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-1.5 bg-[#4B8B77]/10 text-[#4B8B77] border border-[#4B8B77]/20 px-3.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4B8B77] inline-block"></span>
            <span>Admissions On Going</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3B231A] leading-[1.15] tracking-tight">
            Empower your kids to think, be <span className="text-[#4B8B77] italic">smarter</span> and sharper
          </h2>

          <p className="text-base text-[#3B231A]/75 font-sans font-light leading-relaxed">
            Encourage children to think critically, be exceptionally creative, and solve practical, real-world problems for a better, more harmonious future.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenAdmissions}
              className="group inline-flex items-center space-x-2 bg-[#E78F68] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#d07b53] transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>Get Educated</span>
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
            {/* Soft blue arched backdrop */}
            <div className="w-[280px] sm:w-[340px] md:w-[400px] aspect-[1/1] bg-[#5B92E5] rounded-[36px] rounded-tl-[180px] rounded-br-[180px] overflow-hidden relative shadow-lg">
              <img
                src="/images/tec_girl.png"
                alt="Empowered child smiling"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain object-bottom pt-4 hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Small floating decorative planet on right margin */}
            <div className="absolute -right-6 top-8 w-14 h-14 bg-gradient-to-tr from-[#4B8B77] to-emerald-400 rounded-full border-4 border-white shadow-xl flex items-center justify-center animate-bounce duration-[6000ms]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="transform rotate-12">
                <circle cx="12" cy="12" r="8" />
                <path d="M2 12C2 12 6 8 12 8C18 8 22 12 22 12" />
                <path d="M2 12C2 12 6 16 12 16C18 16 22 12 22 12" />
                <path d="M2 12C2 12 6 16 12 16C18 16 22 12 22 12" />
              </svg>
            </div>

            {/* Floating double statistics board */}
            <div 
              id="empower-stats-overlay"
              className="absolute -bottom-10 right-4 left-4 md:-left-12 md:right-auto bg-white border border-[#3B231A]/10 p-6 rounded-[28px] shadow-xl grid grid-cols-2 gap-6 divide-x divide-[#3B231A]/10 z-20 max-w-md"
            >
              {/* Stat Column 1 */}
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#4B8B77] shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#3B231A]">45M+</h4>
                  <p className="text-[10px] text-[#3B231A]/70 uppercase tracking-wider font-semibold">Scholar Hours</p>
                  <p className="text-[10px] text-[#3B231A]/50 mt-1">Logged across global community programs.</p>
                </div>
              </div>

              {/* Stat Column 2 */}
              <div className="pl-4 flex items-start space-x-3">
                <Sun className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5 animate-spin duration-[8000ms]" />
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#3B231A]">164+</h4>
                  <p className="text-[10px] text-[#3B231A]/70 uppercase tracking-wider font-semibold">Olympiad Honors</p>
                  <p className="text-[10px] text-[#3B231A]/50 mt-1">Gold distinctions in chess & sciences.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

