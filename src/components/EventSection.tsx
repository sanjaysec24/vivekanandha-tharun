import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from '../lib/router';

interface ImageSettingsData {
  displayMode?: 'poster' | 'banner' | string;
  posterScale?: number;
  focalX?: 'left' | 'center' | 'right' | string;
  focalY?: 'top' | 'center' | 'bottom' | string;

  // Backward compatibility fallbacks
  objectFit?: string;
  object_fit?: string;
  width?: string | number;
  height?: string | number;
  objectPosition?: string;
  object_position?: string;
  zoom?: string | number;
  scale?: string | number;
  translateX?: string | number;
  translate_x?: string | number;
  translateY?: string | number;
  translate_y?: string | number;
  expandToContainer?: boolean;
  expand_to_container?: boolean;
}

interface UpcomingEventCMSData {
  // Image Settings
  imageSettings?: ImageSettingsData;
  image_settings?: ImageSettingsData;

  // Left Image
  cloudinaryUrl?: string;
  image?: string;
  imageUrl?: string;
  image_url?: string;
  leftImage?: string;
  left_image?: string;
  leftSideImage?: string;
  left_side_image?: string;
  eventImage?: string;
  event_image?: string;
  photo?: string;
  bannerImage?: string;
  banner_image?: string;

  // Badge
  badge?: string;
  badgeText?: string;
  badge_text?: string;
  tag?: string;
  eventBadge?: string;
  event_badge?: string;

  // Title
  title?: string;
  eventTitle?: string;
  event_title?: string;
  heading?: string;
  mainTitle?: string;
  main_title?: string;
  name?: string;
  eventName?: string;
  event_name?: string;

  // Description
  description?: string;
  eventDescription?: string;
  event_description?: string;
  subtitle?: string;
  details?: string;
  summary?: string;
  content?: string;

  // Date
  date?: string;
  eventDate?: string;
  event_date?: string;
  startDate?: string;
  start_date?: string;

  // Time
  time?: string;
  eventTime?: string;
  event_time?: string;
  timing?: string;
  scheduleTime?: string;
  schedule_time?: string;

  // Location
  location?: string;
  eventLocation?: string;
  event_location?: string;
  venue?: string;
  place?: string;
  address?: string;

  // Button Text
  buttonText?: string;
  button_text?: string;
  btnText?: string;
  btn_text?: string;
  buttonLabel?: string;
  button_label?: string;
  ctaText?: string;
  cta_text?: string;

  // Button URL
  buttonUrl?: string;
  button_url?: string;
  btnUrl?: string;
  btn_url?: string;
  buttonLink?: string;
  button_link?: string;
  link?: string;
  url?: string;

  // Footnote / Note
  note?: string;
  footerNote?: string;
  footer_note?: string;
  footnote?: string;
  disclaimer?: string;
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

interface EventSectionProps {
  onOpenAdmissions: () => void;
}

export default function EventSection({ onOpenAdmissions }: EventSectionProps) {
  const { navigate } = useRouter();
  const [cmsData, setCmsData] = useState<UpcomingEventCMSData | null>(null);

  // Settings State
  const [displayMode, setDisplayMode] = useState<'poster' | 'banner'>('poster');
  const [posterScale, setPosterScale] = useState<number>(90);
  const [focalX, setFocalX] = useState<'left' | 'center' | 'right'>('center');
  const [focalY, setFocalY] = useState<'top' | 'center' | 'bottom'>('center');

  useEffect(() => {
    if (!db) return;

    const unsub = onSnapshot(
      doc(db, 'website_cms', 'upcoming_event'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as UpcomingEventCMSData;
          setCmsData(data);

          const imgSet = data.imageSettings || data.image_settings || {};

          // Mode resolution
          const modeVal = (imgSet.displayMode || (data as any).displayMode || '').toLowerCase();
          if (modeVal === 'banner' || imgSet.expandToContainer || (data as any).expandToContainer) {
            setDisplayMode('banner');
          } else {
            setDisplayMode('poster');
          }

          // Scale resolution (60 - 120, default 90)
          const scaleVal = Number(imgSet.posterScale ?? (data as any).posterScale ?? 90);
          setPosterScale(isNaN(scaleVal) ? 90 : Math.min(120, Math.max(60, scaleVal)));

          // Focal point X resolution
          const fxVal = (imgSet.focalX || (data as any).focalX || 'center').toLowerCase();
          setFocalX(fxVal === 'left' || fxVal === 'right' ? fxVal : 'center');

          // Focal point Y resolution
          const fyVal = (imgSet.focalY || (data as any).focalY || 'center').toLowerCase();
          setFocalY(fyVal === 'top' || fyVal === 'bottom' ? fyVal : 'center');
        }
      },
      (err) => {
        console.warn('Error reading website_cms/upcoming_event from Firestore:', err);
      }
    );

    return () => unsub();
  }, []);

  // Resolve values dynamically with fallbacks
  const badge = getSafeString(
    cmsData?.badge ||
    cmsData?.badgeText ||
    cmsData?.badge_text ||
    cmsData?.tag ||
    cmsData?.eventBadge ||
    cmsData?.event_badge
  ) || 'Upcoming Event';

  const eventTitle = getSafeString(
    cmsData?.title ||
    cmsData?.eventTitle ||
    cmsData?.event_title ||
    cmsData?.heading ||
    cmsData?.mainTitle ||
    cmsData?.main_title ||
    cmsData?.name ||
    cmsData?.eventName ||
    cmsData?.event_name
  ) || 'Building children one at a time';

  const description = getSafeString(
    cmsData?.description ||
    cmsData?.eventDescription ||
    cmsData?.event_description ||
    cmsData?.subtitle ||
    cmsData?.details ||
    cmsData?.summary ||
    cmsData?.content
  ) || 'Coolness flows from the fountains of knowledge. Join our headmistress, guest child psychologists, and community coordinators for our bi-annual symposium on play-based development.';

  const eventDate = getSafeString(
    cmsData?.date ||
    cmsData?.eventDate ||
    cmsData?.event_date ||
    cmsData?.startDate ||
    cmsData?.start_date
  ) || '20 March 2027';

  const eventTime = getSafeString(
    cmsData?.time ||
    cmsData?.eventTime ||
    cmsData?.event_time ||
    cmsData?.timing ||
    cmsData?.scheduleTime ||
    cmsData?.schedule_time
  ) || '09:00 AM - 12:30 PM';

  const eventLocation = getSafeString(
    cmsData?.location ||
    cmsData?.eventLocation ||
    cmsData?.event_location ||
    cmsData?.venue ||
    cmsData?.place ||
    cmsData?.address
  ) || 'Vivekanandha School Campus';

  const buttonText = getSafeString(
    cmsData?.buttonText ||
    cmsData?.button_text ||
    cmsData?.btnText ||
    cmsData?.btn_text ||
    cmsData?.buttonLabel ||
    cmsData?.button_label ||
    cmsData?.ctaText ||
    cmsData?.cta_text
  ) || 'Register Interest';

  const buttonUrl = getSafeString(
    cmsData?.buttonUrl ||
    cmsData?.button_url ||
    cmsData?.btnUrl ||
    cmsData?.btn_url ||
    cmsData?.buttonLink ||
    cmsData?.button_link ||
    cmsData?.link ||
    cmsData?.url
  );

  const noteText = getSafeString(
    cmsData?.note ||
    cmsData?.footerNote ||
    cmsData?.footer_note ||
    cmsData?.footnote ||
    cmsData?.disclaimer
  ) || '*Complimentary child care & organic refreshments provided.';

  const rawImage =
    cmsData?.cloudinaryUrl ||
    cmsData?.image ||
    cmsData?.imageUrl ||
    cmsData?.image_url ||
    cmsData?.leftImage ||
    cmsData?.left_image ||
    cmsData?.leftSideImage ||
    cmsData?.left_side_image ||
    cmsData?.eventImage ||
    cmsData?.event_image ||
    cmsData?.photo ||
    cmsData?.bannerImage ||
    cmsData?.banner_image;

  const imageUrl = getSafeString(rawImage);

  // If cmsData is loaded from Firestore (not null):
  // If imageUrl is non-empty and !== 'none', show image. If empty or 'none', set to null (graceful hiding without broken placeholder).
  // If cmsData is null (Firestore initial state/fallback), fallback to default image.
  const eventImage =
    cmsData !== null
      ? (imageUrl !== '' && imageUrl !== 'none' ? imageUrl : null)
      : '/images/vleo_mascot.png';

  // Compute Image Styling based on active displayMode, posterScale, focalX, focalY
  const isBannerMode = displayMode === 'banner';

  let imageStyle: React.CSSProperties = {};
  let imageContainerClass = '';
  let imageClass = '';

  if (isBannerMode) {
    // Full Banner Mode: expand to fill left green panel with object-fit: cover and focal point alignment
    imageContainerClass = 'absolute inset-0 w-full h-full p-0 overflow-hidden';
    imageClass = 'w-full h-full transition-all duration-300';
    imageStyle = {
      objectFit: 'cover',
      objectPosition: `${focalX} ${focalY}`,
      width: '100%',
      height: '100%',
    };
  } else {
    // Poster Mode (Default): preserve aspect ratio, centered, scale up to posterScale%
    imageContainerClass = 'relative w-full h-full min-h-[260px] flex items-center justify-center p-2 overflow-hidden';
    imageClass = 'drop-shadow-2xl transition-all duration-300 hover:scale-[1.02]';
    imageStyle = {
      objectFit: 'contain',
      objectPosition: 'center',
      maxHeight: `${posterScale}%`,
      maxWidth: `${posterScale}%`,
      height: `${posterScale}%`,
      width: 'auto',
    };
  }

  const handleButtonClick = () => {
    const trimmedUrl = getSafeString(buttonUrl);
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
    <section id="events-banner-section" className="bg-[#F5F1EB] py-16 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Large Rounded Combined Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 rounded-[36px] overflow-hidden shadow-xl"
        >
          {/* Left panel: Forest green background with real image (5 cols) */}
          <div className="lg:col-span-5 bg-[#4B8B77] p-8 md:p-12 relative flex items-center justify-center min-h-[320px] overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M10 10C20 30 40 10 50 40C60 70 80 50 90 90" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Mascot / Event Image inside Green Container */}
            <div className={`z-10 ${imageContainerClass}`}>
              {eventImage && (
                <img
                  src={eventImage}
                  alt={eventTitle}
                  loading="lazy"
                  decoding="async"
                  style={imageStyle}
                  className={imageClass}
                />
              )}
            </div>
          </div>

          {/* Right panel: Warm yellow banner background with event metadata (7 cols) */}
          <div className="lg:col-span-7 bg-[#EAB308] p-8 md:p-12 flex flex-col justify-between text-[#3B231A] relative">
            
            {/* Doodle illustration in top right */}
            <div className="absolute top-6 right-6 opacity-20 pointer-events-none hidden md:block">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M20 50C25 45 35 45 40 50C45 55 55 55 60 50C65 45 75 45 80 50" stroke="#3B231A" strokeWidth="3" strokeLinecap="round" />
                <path d="M20 60C25 55 35 55 40 60C45 65 55 65 60 60C65 55 75 55 80 60" stroke="#3B231A" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="30" r="8" stroke="#3B231A" strokeWidth="3" />
                <path d="M42 30H58" stroke="#3B231A" strokeWidth="2" />
              </svg>
            </div>

            <div className="space-y-6">
              {badge && (
                <div className="inline-flex items-center space-x-1.5 bg-[#3B231A]/10 border border-[#3B231A]/15 px-3.5 py-1 rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#E78F68] inline-block animate-ping"></span>
                  <span>{badge}</span>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight">
                  {eventTitle}
                </h3>
                <p className="text-sm md:text-base opacity-90 leading-relaxed font-sans font-light max-w-xl">
                  {description}
                </p>
              </div>

              {/* Event Schedule Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#3B231A]/10">
                {eventDate && (
                  <div className="flex items-center space-x-2.5">
                    <Calendar className="w-5 h-5 text-[#E78F68]" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Date</p>
                      <p className="text-sm font-semibold">{eventDate}</p>
                    </div>
                  </div>
                )}

                {eventTime && (
                  <div className="flex items-center space-x-2.5">
                    <Clock className="w-5 h-5 text-[#E78F68]" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Time</p>
                      <p className="text-sm font-semibold">{eventTime}</p>
                    </div>
                  </div>
                )}

                {eventLocation && (
                  <div className="flex items-center space-x-2.5">
                    <MapPin className="w-5 h-5 text-[#E78F68]" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Location</p>
                      <p className="text-sm font-semibold">{eventLocation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action CTA row */}
            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {noteText && (
                <p className="text-xs font-semibold opacity-70">
                  {noteText}
                </p>
              )}
              <button
                onClick={handleButtonClick}
                className="group flex items-center space-x-2 bg-[#3B231A] text-[#F5F1EB] font-semibold px-6 py-3 rounded-full hover:bg-[#E78F68] hover:text-white transition-all duration-300 cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}


