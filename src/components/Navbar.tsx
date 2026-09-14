import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { navigationItems } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useRouter } from '../lib/router';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface NavbarProps {
  onOpenAdmissions: () => void;
}

interface BrandingCMSData {
  logo?: string;
  logoUrl?: string;
  navbarLogo?: string;
  schoolLogo?: string;
  logo_url?: string;
  
  schoolName?: string;
  name?: string;
  title?: string;
  school_name?: string;
  
  schoolSubtitle?: string;
  subtitle?: string;
  campusSubtitle?: string;
  school_subtitle?: string;
  
  accentDotColor?: string;
  accentColor?: string;
  dotColor?: string;
  accent_dot_color?: string;
  dot_color?: string;
  
  logoSize?: string | number;
  size?: string | number;
  logo_size?: string | number;
  
  logoContainerAppearance?: string;
  containerAppearance?: string;
  logoContainerBg?: string;
  containerBg?: string;
  logoContainerBorder?: string;
  containerBorder?: string;
  logoContainerShape?: string;
  containerShape?: string;
}

const DEFAULT_BRANDING = {
  logo: "/images/vleo_mascot.png",
  schoolName: "VIVEKANANDHA",
  schoolSubtitle: "School–UTR",
  accentDotColor: "#E78F68",
};

export default function Navbar({ onOpenAdmissions }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cmsData, setCmsData] = useState<BrandingCMSData | null>(null);
  const { path } = useRouter();

  useEffect(() => {
    if (!db) return;

    const unsub = onSnapshot(
      doc(db, 'website_cms', 'branding'),
      (docSnap) => {
        if (docSnap.exists()) {
          setCmsData(docSnap.data() as BrandingCMSData);
        }
      },
      (err) => {
        console.warn('Error reading website_cms/branding from Firestore:', err);
      }
    );

    return () => unsub();
  }, []);

  const logo =
    cmsData?.logo ||
    cmsData?.logoUrl ||
    cmsData?.navbarLogo ||
    cmsData?.schoolLogo ||
    cmsData?.logo_url ||
    DEFAULT_BRANDING.logo;

  const schoolName =
    cmsData?.schoolName ||
    cmsData?.name ||
    cmsData?.title ||
    cmsData?.school_name ||
    DEFAULT_BRANDING.schoolName;

  const schoolSubtitle =
    cmsData?.schoolSubtitle ??
    cmsData?.subtitle ??
    cmsData?.campusSubtitle ??
    cmsData?.school_subtitle ??
    DEFAULT_BRANDING.schoolSubtitle;

  const accentDotColor =
    cmsData?.accentDotColor ||
    cmsData?.accentColor ||
    cmsData?.dotColor ||
    cmsData?.accent_dot_color ||
    cmsData?.dot_color ||
    DEFAULT_BRANDING.accentDotColor;

  const rawLogoSize = cmsData?.logoSize || cmsData?.size || cmsData?.logo_size;
  let logoSizeStyle: React.CSSProperties | undefined = undefined;
  let logoSizeClasses = "w-9 h-9 md:w-10 md:h-10";

  if (typeof rawLogoSize === 'number') {
    logoSizeStyle = { width: `${rawLogoSize}px`, height: `${rawLogoSize}px` };
    logoSizeClasses = "";
  } else if (typeof rawLogoSize === 'string' && rawLogoSize.trim() !== '') {
    const trimmed = rawLogoSize.trim();
    if (/^\d+$/.test(trimmed)) {
      logoSizeStyle = { width: `${trimmed}px`, height: `${trimmed}px` };
      logoSizeClasses = "";
    } else if (/^\d+(px|rem|em|%)$/.test(trimmed)) {
      logoSizeStyle = { width: trimmed, height: trimmed };
      logoSizeClasses = "";
    } else if (trimmed === 'small') {
      logoSizeClasses = "w-7 h-7";
    } else if (trimmed === 'medium') {
      logoSizeClasses = "w-9 h-9 md:w-10 md:h-10";
    } else if (trimmed === 'large') {
      logoSizeClasses = "w-11 h-11 md:w-12 md:h-12";
    } else if (trimmed.includes('w-') || trimmed.includes('h-')) {
      logoSizeClasses = trimmed;
    } else {
      logoSizeStyle = { width: trimmed, height: trimmed };
      logoSizeClasses = "";
    }
  }

  const rawContainerBg = cmsData?.logoContainerBg || cmsData?.containerBg;
  const rawContainerBorder = cmsData?.logoContainerBorder || cmsData?.containerBorder;
  const rawContainerShape = cmsData?.logoContainerShape || cmsData?.containerShape;
  const rawAppearance = cmsData?.logoContainerAppearance || cmsData?.containerAppearance;

  const containerStyle: React.CSSProperties = {};
  if (rawContainerBg) {
    containerStyle.backgroundColor = rawContainerBg;
  }
  if (rawContainerBorder) {
    if (rawContainerBorder.includes(' ') || rawContainerBorder.startsWith('#') || rawContainerBorder.startsWith('rgb')) {
      containerStyle.borderColor = rawContainerBorder;
    }
  }

  let containerShapeClass = "rounded-full";
  if (rawContainerShape) {
    if (rawContainerShape.includes('rounded')) {
      containerShapeClass = rawContainerShape;
    } else if (rawContainerShape === 'square') {
      containerShapeClass = 'rounded-none';
    } else if (rawContainerShape === 'rounded' || rawContainerShape === 'rounded-md') {
      containerShapeClass = 'rounded-xl';
    }
  }

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header 
      id="navbar-wrapper" 
      className="sticky top-0 z-50 w-full transition-all duration-300 pt-6 pb-2.5 sm:pt-7 sm:pb-3 md:pt-8 md:pb-3.5 px-3.5 sm:px-6 md:px-8 pointer-events-none"
    >
      {/* Floating Capsule Container */}
      <nav 
        id="navbar-container" 
        className={`pointer-events-auto max-w-7xl mx-auto bg-[#FFFDF8] border border-[#E6DCCF]/80 rounded-[26px] sm:rounded-[28px] md:rounded-[32px] transition-all duration-300 ${
          scrolled 
            ? 'shadow-[0_12px_32px_-6px_rgba(67,40,31,0.12),0_4px_12px_rgba(67,40,31,0.06)] py-1.5 md:py-2 px-3.5 sm:px-5 md:px-6' 
            : 'shadow-[0_8px_24px_-4px_rgba(67,40,31,0.07),0_2px_6px_rgba(67,40,31,0.03)] py-2 md:py-2.5 px-3.5 sm:px-5 md:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo & School Identity (Shown on both Mobile and Desktop) */}
          <Link 
            id="brand-logo" 
            to="/" 
            className="flex items-center space-x-2 sm:space-x-3 group text-left transition-all duration-200 min-w-0 pr-2"
          >
            {/* Circular School Logo Container (Preserves existing uploaded logo) */}
            <div 
              style={containerStyle}
              className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 ${containerShapeClass} bg-white border border-[#EAB308]/40 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300 ${rawAppearance || ''}`}
            >
              <img 
                src={logo} 
                alt={`${schoolName} Logo`} 
                loading="lazy"
                decoding="async"
                style={logoSizeStyle}
                className={`${logoSizeClasses} object-contain p-0.5`} 
              />
            </div>

            {/* School Name & Campus Subtitle */}
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <span className="text-[17px] sm:text-[18px] md:text-[19px] font-extrabold text-[#43281F] tracking-tight leading-none group-hover:text-[#F58A3C] transition-colors duration-200 truncate">
                  {schoolName}
                </span>
                <span 
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: accentDotColor || '#F58A3C' }}
                />
              </div>
              {schoolSubtitle && (
                <span className="text-[11px] sm:text-[11.5px] md:text-[12px] font-medium text-[#43281F]/80 tracking-normal leading-tight mt-0.5 truncate">
                  {schoolSubtitle}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation Items - Balanced spacing with single-line whitespace-nowrap and common baseline */}
          <div id="desktop-menu" className="hidden lg:flex items-center space-x-4 xl:space-x-6 mx-4 xl:mx-6 flex-shrink-0">
            {navigationItems.map((item) => {
              const isItemActive = path === item.href;
              return (
                <div
                  key={item.label}
                  className="relative flex items-center"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center whitespace-nowrap text-[13px] xl:text-[14px] font-medium transition-all duration-200 py-2 px-1 relative group leading-none ${
                      isItemActive
                        ? 'text-[#F58A3C] font-semibold'
                        : 'text-[#43281F] hover:text-[#F58A3C]'
                    }`}
                  >
                    <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 inline-block whitespace-nowrap">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                    )}
                    
                    {/* Active Minimal Underline Indicator in #F58A3C */}
                    {isItemActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0.5 left-1 right-1 h-[2px] bg-[#F58A3C] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Programs Dropdown */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-60 bg-[#FFFDF8] border border-[#E6DCCF] rounded-2xl shadow-[0_16px_36px_-6px_rgba(67,40,31,0.12)] p-2.5 space-y-1 z-50">
                      {item.dropdownItems?.map((dropItem) => (
                        <Link
                          key={dropItem}
                          to="/academics"
                          className="block text-xs sm:text-sm text-[#43281F]/85 hover:text-[#43281F] hover:bg-[#F58A3C]/10 rounded-xl px-3 py-2 transition-colors duration-150 font-medium whitespace-nowrap"
                        >
                          {dropItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop / Tablet CTA - Rounded pill with cream interior, warm border, deep chocolate text, orange icon */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button
              id="navbar-cta-admissions"
              onClick={onOpenAdmissions}
              className="flex items-center space-x-1.5 bg-[#FFFDF8] border border-[#E6DCCF] text-xs xl:text-[13.5px] font-semibold text-[#43281F] px-4 xl:px-4.5 py-2 rounded-full hover:border-[#F58A3C]/60 hover:text-[#F58A3C] transition-all duration-200 shadow-sm whitespace-nowrap"
            >
              <span>Admissions Open 2027–2028</span>
              <Sparkles className="w-3.5 h-3.5 text-[#F58A3C] flex-shrink-0" />
            </button>
          </div>

          {/* Mobile & Tablet (<lg) Hamburger Menu Toggle Button - 44px min touch target */}
          <button
            id="mobile-menu-toggle"
            onClick={toggleMenu}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-[#43281F] hover:text-[#F58A3C] bg-black/[0.02] hover:bg-[#F58A3C]/10 border border-[#E6DCCF]/60 rounded-full transition-all duration-200 focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile & Tablet Drawer Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-[#E6DCCF]/80 mt-2.5 pt-2.5"
            >
              <div className="py-2 space-y-1">
                {navigationItems.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <Link
                      to={item.href}
                      onClick={() => !item.hasDropdown && setIsOpen(false)}
                      className={`block text-base font-semibold px-3.5 py-2.5 rounded-xl transition-colors ${
                        path === item.href 
                          ? 'text-[#F58A3C] bg-[#F58A3C]/10' 
                          : 'text-[#43281F] hover:text-[#F58A3C] hover:bg-[#43281F]/05'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-[#F58A3C]/30 ml-4 my-1">
                        {item.dropdownItems?.map((dropItem) => (
                          <Link
                            key={dropItem}
                            to="/academics"
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-[#43281F]/80 hover:text-[#43281F] hover:bg-[#F58A3C]/10 px-3 py-1.5 rounded-lg transition-colors font-medium"
                          >
                            {dropItem}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Admissions CTA Button */}
                <div className="pt-3 pb-1">
                  <button
                    id="mobile-cta-admissions"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAdmissions();
                    }}
                    className="w-full text-center flex items-center justify-center space-x-2 bg-[#F58A3C] hover:bg-[#e0772d] text-white font-semibold py-3 px-5 rounded-full shadow-sm transition-all duration-200"
                  >
                    <span>Admissions Open 2027–2028</span>
                    <Sparkles className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
