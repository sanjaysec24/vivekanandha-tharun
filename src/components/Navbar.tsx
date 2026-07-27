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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav id="navbar-container" className="sticky top-0 z-50 bg-[#F4F0EA]/95 backdrop-blur-md border-b border-[#3A2318]/10 px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          id="brand-logo" 
          to="/" 
          className="flex items-center space-x-3 group text-left transition-all duration-200"
        >
          {/* Circular School Logo Container */}
          <div 
            style={containerStyle}
            className={`w-11 h-11 md:w-12 md:h-12 ${containerShapeClass} bg-white border border-[#EAB308]/40 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300 ${rawAppearance || ''}`}
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
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-1.5">
              <span className="text-base sm:text-lg md:text-xl font-black text-[#3A2318] tracking-tight leading-none group-hover:text-[#E78F68] transition-colors duration-200">
                {schoolName}
              </span>
              <span 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: accentDotColor }}
              />
            </div>
            {schoolSubtitle && (
              <span className="text-xs md:text-sm font-extrabold text-[#3A231A]/85 tracking-normal leading-tight">
                {schoolSubtitle}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation Items */}
        <div id="desktop-menu" className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => {
            const isItemActive = path === item.href;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center text-sm font-medium transition-colors duration-200 py-2 relative ${
                    isItemActive
                      ? 'text-[#E78F68] font-semibold'
                      : 'text-[#3A2318] hover:text-[#E78F68]'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200" />
                  )}
                  {isItemActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E78F68] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Programs Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-[#F4F0EA] border border-[#3A2318]/15 rounded-2xl shadow-xl p-4 space-y-2 z-50">
                    {item.dropdownItems?.map((dropItem) => (
                      <Link
                        key={dropItem}
                        to="/academics"
                        className="block text-sm text-[#3A2318]/85 hover:text-[#3A2318] hover:bg-[#E78F68]/10 rounded-xl px-3 py-2 transition-colors duration-150 font-medium"
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

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            id="navbar-cta-admissions"
            onClick={onOpenAdmissions}
            className="flex items-center space-x-1 border border-[#3A2318]/30 text-sm font-semibold text-[#3A2318] px-5 py-2.5 rounded-full hover:bg-[#3A2318] hover:text-[#F4F0EA] transition-all duration-200 shadow-sm animate-pulse"
          >
            <span>Admissions Open 2027-2028</span>
            <Sparkles className="w-4 h-4 text-[#E78F68]" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={toggleMenu}
          className="md:hidden p-1 text-[#3A2318] hover:text-[#E78F68] transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden mt-4 overflow-hidden border-t border-[#3A2318]/10 bg-[#F4F0EA]"
          >
            <div className="py-4 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <Link
                    to={item.href}
                    onClick={() => !item.hasDropdown && setIsOpen(false)}
                    className={`block text-base font-semibold px-2 py-1 ${
                      path === item.href ? 'text-[#E78F68]' : 'text-[#3A2318] hover:text-[#E78F68]'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4 space-y-1.5 border-l border-[#3A2318]/10 ml-2">
                      {item.dropdownItems?.map((dropItem) => (
                        <Link
                          key={dropItem}
                          to="/academics"
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-[#3A2318]/70 hover:text-[#3A2318] py-1"
                        >
                          {dropItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-[#3A2318]/10">
                <button
                  id="mobile-cta-admissions"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmissions();
                  }}
                  className="w-full text-center block bg-[#E78F68] hover:bg-[#d07b53] text-white font-semibold py-3 px-5 rounded-full transition-all duration-200"
                >
                  Admissions Open 2027-2028
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
