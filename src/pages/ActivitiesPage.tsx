import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Palette, Atom, Flame, Sun, Sparkles, Award, Star, Compass, Music, Mic, Theater, Ticket, Calendar, MapPin, Users, PartyPopper, Crown, CheckCircle2, Bot, FlaskConical, Shirt, Clock, ChevronRight, Zap, Flower2, School, Building2, Lightbulb, BookOpen, Smile, Camera, Layers } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface EventShowcaseCMSData {
  posterImage?: string;
  poster_image?: string;
  image?: string;
  imageUrl?: string;
  posterUrl?: string;

  displayMode?: 'contain' | 'cover' | 'fill' | string;
  display_mode?: string;

  horizontalPosition?: string;
  horizontal_position?: string;
  verticalPosition?: string;
  vertical_position?: string;

  padding?: string | number;
  cornerRadius?: string | number;
  corner_radius?: string | number;
  borderRadius?: string | number;

  shadow?: string;
  boxShadow?: string;

  border?: string;

  backgroundColor?: string;
  background_color?: string;
  bgColor?: string;
}

const ACTIVITIES = [
  {
    title: 'Sports & Athletics',
    category: 'Physical Somatic Mastery',
    icon: Trophy,
    color: 'bg-[#5B92E5]/10',
    iconColor: '#5B92E5',
    borderColor: 'border-[#5B92E5]/20',
    desc: 'From daily track practice to inter-school matches, we nurture genuine sportsmanship, teamwork, physical endurance, and body-balance.',
    features: ['Standard sized safe running track & field', 'Weekly yoga, martial arts & self-defense training', 'Dedicated football & target tennis practice yards', 'Quarterly competitive sports meets']
  },
  {
    title: 'Arts & Creative Crafts',
    category: 'Imagination & Fine Expression',
    icon: Palette,
    color: 'bg-[#E78F68]/10',
    iconColor: '#E78F68',
    borderColor: 'border-[#E78F68]/20',
    desc: 'Encourages unstructured sketching, hand-molded clay modeling, paper origami designs, and traditional fabric paintings.',
    features: ['Dedicated indoor atelier and sketch tables', 'Handmade natural clay modeling and baking', 'Origami, paper crafts, and cardboard building', 'Annual school-wide art gallery displays']
  },
  {
    title: 'STEM & Science Discovery',
    category: 'Logic & Spatial Reason',
    icon: Atom,
    color: 'bg-[#4B8B77]/10',
    iconColor: '#4B8B77',
    borderColor: 'border-[#4B8B77]/20',
    desc: 'Provides introductory botany seed-planting, basic computer lab exposure, water-pressure trials, and fun block-programming block labs.',
    features: ['Weekly hands-on botanical laboratory experiments', 'Age-appropriate block programming (Scratch)', 'Interactive gravity, water and friction trials', 'Science Exhibition and Model Contest days']
  },
  {
    title: 'Cultural Heritage & Recitation',
    category: 'Tamil Literature & Poise',
    icon: Compass,
    color: 'bg-yellow-500/10',
    iconColor: '#D97706',
    borderColor: 'border-yellow-500/20',
    desc: 'Instills deep love for classical Tamil reciting, stage plays, regional Thirukkural memorization, and classical musical instruments.',
    features: ['Weekly bilingual stage reading & recitation sessions', 'Thirukkural couplet recital contests', 'Classical vocal training and percussion beats', 'Traditional folk dance & drama ensembles']
  }
];

export default function ActivitiesPage() {
  const [eventPoster, setEventPoster] = useState<EventShowcaseCMSData | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!db) return;
    const docRef = doc(db, 'website_cms', 'event_showcase');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setEventPoster(snapshot.data() as EventShowcaseCMSData);
        setImgError(false);
      } else {
        setEventPoster(null);
      }
    }, (error) => {
      console.error("Firestore Error in event_showcase onSnapshot:", error);
    });

    return () => unsubscribe();
  }, []);

  const posterImageSrc = eventPoster?.posterImage || eventPoster?.poster_image || eventPoster?.image || eventPoster?.imageUrl || eventPoster?.posterUrl || '';

  const rawDisplayMode = (eventPoster?.displayMode || eventPoster?.display_mode || 'cover').toLowerCase();
  let objectFitStyle: React.CSSProperties['objectFit'] = 'cover';
  if (rawDisplayMode === 'contain') objectFitStyle = 'contain';
  else if (rawDisplayMode === 'fill') objectFitStyle = 'fill';
  else if (rawDisplayMode === 'cover') objectFitStyle = 'cover';

  const hPos = eventPoster?.horizontalPosition || eventPoster?.horizontal_position || 'center';
  const vPos = eventPoster?.verticalPosition || eventPoster?.vertical_position || 'center';
  const objectPositionStyle = `${hPos} ${vPos}`;

  const paddingVal = eventPoster?.padding !== undefined
    ? (typeof eventPoster.padding === 'number' ? `${eventPoster.padding}px` : eventPoster.padding)
    : '12px';

  const rawCornerRadius = eventPoster?.cornerRadius ?? eventPoster?.corner_radius ?? eventPoster?.borderRadius;
  const cornerRadiusVal = rawCornerRadius !== undefined
    ? (typeof rawCornerRadius === 'number' ? `${rawCornerRadius}px` : String(rawCornerRadius))
    : '32px';

  const shadowVal = eventPoster?.shadow || eventPoster?.boxShadow || '0 20px 50px -10px rgba(0,0,0,0.5)';
  const borderVal = eventPoster?.border || '2px solid rgba(212, 175, 55, 0.4)';
  const bgVal = eventPoster?.backgroundColor || eventPoster?.background_color || eventPoster?.bgColor || '#0D0402';

  const showPosterImage = Boolean(posterImageSrc && !imgError);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F5F1EB] min-h-screen text-[#3B231A]"
    >
      {/* Banner */}
      <div className="relative overflow-hidden bg-[#3B231A] text-[#F5F1EB] py-20 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block bg-[#E78F68]/20 border border-[#E78F68]/30 text-[#E78F68] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Beyond Books
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Co-Curricular <span className="text-[#E78F68] italic font-normal">Activities</span>
          </h1>
          <p className="text-sm md:text-base text-[#F5F1EB]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Nurturing well-rounded, expressive individuals through a rich array of sports, arts, STEM projects, and traditional cultural festivals.
          </p>
        </div>
      </div>

      {/* Symmetrical Grid of core Activities (Sports, Arts, STEM, Cultural) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Weekly Enrichment</span>
          <h2 className="text-3xl font-serif font-bold">Our Active Pillars</h2>
          <p className="text-sm text-[#3B231A]/70 max-w-lg mx-auto font-sans font-light">
            We integrate these modules seamlessly into the daily schedule to ensure a healthy mind-body rhythm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {ACTIVITIES.map((act) => {
            const IconComponent = act.icon;
            return (
              <motion.div
                key={act.title}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-[32px] p-8 border ${act.borderColor} shadow-sm space-y-6 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B231A]/50 bg-[#F5F1EB] px-3 py-1 rounded-full border border-[#3B231A]/5">
                      {act.category}
                    </span>
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: act.color.replace('/10', '/20') }}
                    >
                      <IconComponent size={24} color={act.iconColor} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#3B231A]">
                    {act.title}
                  </h3>
                  
                  <p className="text-sm text-[#3B231A]/85 font-sans font-light leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <div className="border-t border-[#3B231A]/5 pt-5">
                  <h4 className="text-xs font-mono font-bold text-[#E78F68] uppercase tracking-wider mb-3">Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3B231A]/90 font-light">
                    {act.features.map((f, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E78F68] mr-2 shrink-0"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Annual Day Celebrations section */}
      <div className="bg-[#EAE4D9] py-20 border-y border-[#3B231A]/10 relative overflow-hidden">
        {/* Subtle Warm Spotlight Gradients & Decorative Background Curves */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#E78F68]/20 via-[#E78F68]/5 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 right-10 w-[500px] h-[300px] bg-gradient-to-t from-[#D4AF37]/15 via-[#198C52]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          
          {/* Left Side (5 cols): Typography & Glass Statistics Cards */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#E78F68]/20 to-[#D4AF37]/20 border border-[#E78F68]/30 px-3.5 py-1.5 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-[#E78F68] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B231A]">
                  The Grand Gala Celebration
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#3B231A] tracking-tight leading-[1.15]">
                Our Spectacular <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#3B231A] via-[#E78F68] to-[#9B2222] bg-clip-text text-transparent">
                  Annual Day
                </span>
              </h2>
            </div>
            
            <p className="text-sm md:text-base text-[#3B231A]/85 font-sans font-light leading-relaxed">
              Every year, Vivekanandha School hosts its celebrated <strong>Annual Day</strong>—a grand thematic stage production where 100% of our nursery and primary children participate. No child is left out. From colorful, coordinated synchronized dances representing seasonal rain patterns to powerful historical dramas of ancient Kings and poets, our children build massive stage confidence and collaborative memories.
            </p>

            {/* Glass-like Statistic Cards Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-[0_8px_20px_-6px_rgba(59,35,26,0.08)] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#E78F68]/20 to-transparent rounded-bl-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-extrabold text-2xl md:text-3xl text-[#E78F68]">100%</span>
                  <div className="p-1.5 rounded-xl bg-[#E78F68]/10 text-[#E78F68]">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#3B231A]/80 font-mono">
                  Student Participation
                </div>
                <div className="text-[10px] text-[#3B231A]/50 font-sans mt-0.5">Every single child on stage</div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-[0_8px_20px_-6px_rgba(59,35,26,0.08)] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#198C52]/20 to-transparent rounded-bl-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-extrabold text-2xl md:text-3xl text-[#198C52]">2,000+</span>
                  <div className="p-1.5 rounded-xl bg-[#198C52]/10 text-[#198C52]">
                    <PartyPopper className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#3B231A]/80 font-mono">
                  Audience Attendance
                </div>
                <div className="text-[10px] text-[#3B231A]/50 font-sans mt-0.5">Parents, alumni & patrons</div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-[0_8px_20px_-6px_rgba(59,35,26,0.08)] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-bl-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-extrabold text-2xl md:text-3xl text-[#B8860B]">15+</span>
                  <div className="p-1.5 rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#3B231A]/80 font-mono">
                  Stage Performances
                </div>
                <div className="text-[10px] text-[#3B231A]/50 font-sans mt-0.5">Dances, plays & music</div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-[0_8px_20px_-6px_rgba(59,35,26,0.08)] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#3B231A]/15 to-transparent rounded-bl-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-extrabold text-2xl md:text-3xl text-[#3B231A]">25 Yrs</span>
                  <div className="p-1.5 rounded-xl bg-[#3B231A]/10 text-[#3B231A]">
                    <Crown className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#3B231A]/80 font-mono">
                  Years of Legacy
                </div>
                <div className="text-[10px] text-[#3B231A]/50 font-sans mt-0.5">Celebrating rich culture</div>
              </motion.div>
            </div>
          </div>

          {/* Right Side (7 cols): SPECTRA Visual Container Canvas & Spectra Journey */}
          <div className="lg:col-span-7 space-y-6 relative">
            
            {/* Main SPECTRA Visual Container Canvas / Event Poster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                whileHover={{ scale: 1.02 }}
                className="relative w-full min-h-[480px] sm:min-h-[520px] flex items-center justify-center overflow-hidden cursor-pointer transition-shadow duration-300 group"
                style={{
                  padding: paddingVal,
                  borderRadius: cornerRadiusVal,
                  boxShadow: shadowVal,
                  border: borderVal,
                  backgroundColor: bgVal,
                }}
              >
                {showPosterImage ? (
                  <motion.img
                    src={posterImageSrc}
                    alt="SPECTRA Annual Day Event Poster"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    onError={() => setImgError(true)}
                    className="w-full h-full min-h-[480px] sm:min-h-[520px] transition-all duration-300 ease-out"
                    style={{
                      objectFit: objectFitStyle,
                      objectPosition: objectPositionStyle,
                      borderRadius: `calc(${cornerRadiusVal} - 4px)`,
                    }}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full min-h-[480px] sm:min-h-[520px] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden select-none"
                  >
                    {/* Subtle Ambient Radial Highlight */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 space-y-4 max-w-sm mx-auto">
                      {/* 📢 Megaphone Icon Badge */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shadow-lg text-3xl sm:text-4xl text-[#D4AF37]">
                        📢
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F1EB] tracking-wide">
                          No Event Poster Available
                        </h3>
                        <p className="text-xs sm:text-sm text-[#F5F1EB]/60 font-sans font-light max-w-xs mx-auto leading-relaxed">
                          Stay tuned! The official celebration poster and event schedule will be updated here.
                        </p>
                      </div>

                      <div className="pt-2 inline-flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
                        <Sparkles className="w-3 h-3 text-[#FFD700]" />
                        <span>SPECTRA ANNUAL DAY GALA</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* SPECTRA JOURNEY TIMELINE COMPONENT */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-[#FFFBF7] via-white to-[#FFFBF7] rounded-3xl p-5 border-2 border-[#D4AF37]/50 shadow-xl relative overflow-hidden text-[#3B231A]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3B231A]/10 pb-3 gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#B8860B]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E78F68]">
                      FESTIVAL HIGHLIGHTS
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#3B231A]">
                      Spectra Journey
                    </h4>
                  </div>
                </div>

                <span className="inline-flex items-center text-xs font-bold text-[#198C52] bg-[#198C52]/10 border border-[#198C52]/20 px-3 py-1 rounded-full w-fit">
                  <Zap className="w-3.5 h-3.5 mr-1" /> Live Schedule
                </span>
              </div>

              {/* 6 Milestone Nodes connected by golden lines */}
              <div className="relative pt-6 pb-2">
                {/* Connecting Golden Line */}
                <div className="absolute top-10 left-6 right-6 h-0.5 bg-gradient-to-r from-[#D4AF37]/30 via-[#E78F68]/50 to-[#D4AF37]/30 z-0 hidden sm:block" />

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 relative z-10">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#E78F68] text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                      01
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#E78F68]">5:00 PM</span>
                    <h5 className="text-xs font-serif font-bold text-[#3B231A] leading-tight">Opening Ceremony</h5>
                    <p className="text-[9px] text-[#3B231A]/60 font-sans">Lamp Lighting & Welcome</p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#3B82F6] text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                      02
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#3B82F6]">5:30 PM</span>
                    <h5 className="text-xs font-serif font-bold text-[#3B231A] leading-tight">Innovation Showcase</h5>
                    <p className="text-[9px] text-[#3B231A]/60 font-sans">Robotics & STEM Exhibits</p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#3B231A] font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                      03
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#B8860B]">6:15 PM</span>
                    <h5 className="text-xs font-serif font-bold text-[#3B231A] leading-tight">Cultural Performances</h5>
                    <p className="text-[9px] text-[#3B231A]/60 font-sans">Bharatanatyam & Choirs</p>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#9B2222] text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                      04
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#9B2222]">7:00 PM</span>
                    <h5 className="text-xs font-serif font-bold text-[#3B231A] leading-tight">Competitions</h5>
                    <p className="text-[9px] text-[#3B231A]/60 font-sans">Tamil Drama & Recitals</p>
                  </div>

                  {/* Step 5 */}
                  <div className="flex flex-col items-center text-center space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#198C52] text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                      05
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#198C52]">7:45 PM</span>
                    <h5 className="text-xs font-serif font-bold text-[#3B231A] leading-tight">Awards Ceremony</h5>
                    <p className="text-[9px] text-[#3B231A]/60 font-sans">Shields & Merit Medals</p>
                  </div>

                  {/* Step 6 */}
                  <div className="flex flex-col items-center text-center space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#EC4899] text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                      06
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#EC4899]">8:30 PM</span>
                    <h5 className="text-xs font-serif font-bold text-[#3B231A] leading-tight">Grand Finale</h5>
                    <p className="text-[9px] text-[#3B231A]/60 font-sans">Mass Choir & Confetti</p>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Competitions and Achievements */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Prizes & Standards</span>
          <h2 className="text-3xl font-serif font-bold">Interschool Competitions</h2>
          <p className="text-sm text-[#3B231A]/70 max-w-lg mx-auto font-sans font-light">
            Our students consistently secure gold plaques and merit awards in regional academic and athletic showcases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E78F68]/10 text-[#E78F68] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-[#3B231A]">State Level Thirukkural Recital</h4>
            <p className="text-xs text-[#3B231A]/70 leading-relaxed font-sans font-light">
              Our primary Grade 4 representatives secured the prestigious <strong>First Place</strong> by memorizing and reciting 150 couplets flawlessly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#198C52]/10 text-[#198C52] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-[#3B231A]">District Junior Chess Trophy</h4>
            <p className="text-xs text-[#3B231A]/70 leading-relaxed font-sans font-light">
              Grade 5 students clinched the gold and silver shields at the District Under-11 chess tournaments held in Coimbatore.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-[#3B231A]">Young Innovator STEM Challenge</h4>
            <p className="text-xs text-[#3B231A]/70 leading-relaxed font-sans font-light">
              Recognized with the <strong>Most Creative Prototype</strong> award for building an organic seed-irrigation model using simple cardboard pulleys.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
