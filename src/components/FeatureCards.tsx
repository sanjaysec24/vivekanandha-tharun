import React from 'react';
import { motion } from 'motion/react';
import { 
  SpellCheck, 
  Pencil, 
  Lightbulb, 
  Palette, 
  Atom, 
  Rocket, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FeatureCardsProps {
  onOpenAdmissions?: () => void;
}

interface LearningStage {
  step: string;
  grade: string;
  title: string;
  description: string;
  imageUrl: string;
  softBg: string;
  borderColor: string;
  accentColor: string;
  textColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

const STAGES: LearningStage[] = [
  {
    step: '01',
    grade: 'Pre KG',
    title: 'Letter Identification',
    description: 'Tactile tracing, phonetic sounds & sensory letter play.',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400',
    softBg: '#F0FDF4',
    borderColor: '#86EFAC',
    accentColor: '#10B981',
    textColor: '#065F46',
    iconBg: '#10B981',
    icon: <SpellCheck className="w-4 h-4 text-white" />,
  },
  {
    step: '02',
    grade: 'LKG',
    title: 'Foundational Learning',
    description: 'Fine motor skills, counting & structured daily habits.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
    softBg: '#FFF7ED',
    borderColor: '#FED7AA',
    accentColor: '#F97316',
    textColor: '#9A3412',
    iconBg: '#F97316',
    icon: <Pencil className="w-4 h-4 text-white" />,
  },
  {
    step: '03',
    grade: 'UKG',
    title: 'General Knowledge',
    description: 'Nature discovery, environments & curiosity-driven learning.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
    softBg: '#FEFCE8',
    borderColor: '#FDE047',
    accentColor: '#EAB308',
    textColor: '#854D0E',
    iconBg: '#EAB308',
    icon: <Lightbulb className="w-4 h-4 text-white" />,
  },
  {
    step: '04',
    grade: 'Grade 1–2',
    title: 'Creative Arts',
    description: 'Color harmony, musical rhythm & expressive storytelling.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
    softBg: '#EFF6FF',
    borderColor: '#93C5FD',
    accentColor: '#3B82F6',
    textColor: '#1E40AF',
    iconBg: '#3B82F6',
    icon: <Palette className="w-4 h-4 text-white" />,
  },
  {
    step: '05',
    grade: 'Grade 3–4',
    title: 'Science Explorer',
    description: 'Hands-on experiments, botany & logical reasoning.',
    imageUrl: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?auto=format&fit=crop&q=80&w=400',
    softBg: '#FAF5FF',
    borderColor: '#C084FC',
    accentColor: '#A855F7',
    textColor: '#6B21A8',
    iconBg: '#A855F7',
    icon: <Atom className="w-4 h-4 text-white" />,
  },
  {
    step: '06',
    grade: 'Grade 5',
    title: 'Future Innovators',
    description: 'Digital literacy, team problem-solving & young leadership.',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400',
    softBg: '#FDF2F8',
    borderColor: '#F472B6',
    accentColor: '#EC4899',
    textColor: '#9D174D',
    iconBg: '#EC4899',
    icon: <Rocket className="w-4 h-4 text-white" />,
  },
];

export default function FeatureCards({ onOpenAdmissions }: FeatureCardsProps) {
  return (
    <section id="features-section" className="bg-[#F5F1EB] py-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      
      {/* --- SUBTLE BACKGROUND DOODLES (Placed strictly in empty margin spaces) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* ABC Blocks Doodle - Top Left */}
        <div className="absolute top-10 left-6 md:left-12 text-[#3B231A]/10 hidden sm:block">
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="8" y="24" width="22" height="22" rx="4" strokeDasharray="3 2" />
            <text x="14" y="40" fontSize="13" fontFamily="serif" fontWeight="bold" fill="currentColor">A</text>
            <rect x="26" y="10" width="22" height="22" rx="4" />
            <text x="32" y="26" fontSize="13" fontFamily="serif" fontWeight="bold" fill="currentColor">B</text>
            <rect x="34" y="34" width="22" height="22" rx="4" strokeDasharray="4 2" />
            <text x="40" y="50" fontSize="13" fontFamily="serif" fontWeight="bold" fill="currentColor">C</text>
          </svg>
        </div>

        {/* Lightbulb & Sun Doodle - Top Right */}
        <div className="absolute top-12 right-6 md:right-12 text-[#E78F68]/20 hidden sm:block">
          <svg width="50" height="50" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="28" cy="28" r="13" strokeDasharray="4 3" />
            <path d="M28 4v6M28 46v6M4 28h6M46 28h6M11 11l4 4M41 41l4 4M11 45l4-4M41 15l4-4" />
          </svg>
        </div>

        {/* Notebook & Pencil Doodle - Mid Left */}
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[#3B231A]/10 hidden lg:block">
          <svg width="52" height="60" viewBox="0 0 60 70" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="10" y="10" width="40" height="50" rx="4" />
            <line x1="18" y1="22" x2="42" y2="22" />
            <line x1="18" y1="32" x2="38" y2="32" />
            <line x1="18" y1="42" x2="32" y2="42" />
            <path d="M42 48l12-12-6-6-12 12v6h6z" />
          </svg>
        </div>

        {/* Atom Orbit Doodle - Mid Right */}
        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[#3B231A]/10 hidden lg:block">
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(30 32 32)" strokeDasharray="4 2" />
            <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-30 32 32)" />
            <circle cx="32" cy="32" r="4" fill="currentColor" />
          </svg>
        </div>

        {/* Rocket & Stars Doodle - Bottom Right */}
        <div className="absolute bottom-10 right-8 text-[#E78F68]/20 hidden sm:block">
          <svg width="60" height="60" viewBox="0 0 70 70" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M35 10c12 0 20 16 20 30h-40c0-14 8-30 20-30z" />
            <circle cx="35" cy="26" r="4" />
            <path d="M15 40l-8 10 12-2M55 40l8 10-12-2M25 50c5 8 15 8 20 0" strokeDasharray="3 2" />
          </svg>
        </div>

        {/* Dotted Trail Loop - Bottom Left */}
        <div className="absolute bottom-8 left-8 text-[#3B231A]/10 hidden sm:block">
          <svg width="80" height="40" viewBox="0 0 90 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4">
            <path d="M10 40 Q 30 10, 50 30 T 90 20" />
          </svg>
        </div>

      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* --- CENTERED PREMIUM HEADING COMPOSITION --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          
          {/* Small Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E78F68]/15 border border-[#E78F68]/30 text-[#E78F68] text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ONE SMART LESSON AT A TIME</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#3B231A] tracking-tight leading-tight"
          >
            Smart & curious minds,<br className="hidden sm:inline" />{' '}
            ready to{' '}
            <span className="text-[#E78F68] italic relative inline-block font-serif">
              fly high!
              <svg className="absolute left-0 -bottom-2 w-full h-2.5 text-[#E78F68]/40" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                <path d="M2 15 Q 50 2, 98 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>

          {/* Centered Short Supporting Sentence */}
          <p className="text-xs sm:text-sm md:text-base text-[#3B231A]/75 max-w-xl mx-auto font-sans font-light leading-relaxed pt-1">
            Discover a structured learning journey where every stage builds confidence, foundational understanding, and creative curiosity from Pre-KG to Grade 5.
          </p>

          {/* Integrated Visual Progression Indicator Ribbon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-2"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#3B231A]/10 shadow-xs backdrop-blur-sm">
              {STAGES.map((s, idx) => (
                <React.Fragment key={s.step}>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all" style={{ backgroundColor: s.softBg, color: s.textColor }}>
                    <span className="opacity-60">{s.step}</span>
                    <span>{s.grade}</span>
                  </div>
                  {idx < STAGES.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-[#3B231A]/30 shrink-0 hidden sm:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

        </div>

        {/* --- CONNECTED LEARNING JOURNEY FLOW --- */}
        <div className="relative pt-2">

          {/* CONNECTING DOTTED PATH FOR DESKTOP (lg) - Smooth Serpentine Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible z-0" fill="none">
            <path 
              d="M 180 140 Q 360 80, 540 140 T 900 140 Q 1000 240, 900 380 Q 540 440, 180 380" 
              stroke="#E78F68" 
              strokeWidth="2.5" 
              strokeDasharray="8 8" 
              opacity="0.35" 
              strokeLinecap="round" 
            />
          </svg>

          {/* CONNECTING DOTTED LINE FOR MOBILE / TABLET - Vertical Timeline Stem */}
          <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-[#E78F68]/35 block lg:hidden z-0 pointer-events-none" />

          {/* 6 CONNECTED COMPACT STAGES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {STAGES.map((stage, index) => {
              const isEvenDesktop = index % 2 === 1;

              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-[28px] p-6 transition-all duration-300 flex flex-col items-center text-center bg-white/95 border-2 shadow-sm hover:shadow-xl hover:shadow-[#3B231A]/10 ${
                    isEvenDesktop ? 'lg:mt-6' : 'lg:mt-0'
                  }`}
                  style={{ 
                    borderColor: stage.borderColor 
                  }}
                >
                  
                  {/* Card Top Ribbon: Stage Number & Grade Badge */}
                  <div className="w-full flex items-center justify-between mb-4 z-10">
                    <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-full bg-[#3B231A]/5 text-[#3B231A]/80 border border-[#3B231A]/10">
                      STAGE {stage.step}
                    </span>

                    <span 
                      className="text-xs font-bold px-3 py-1 rounded-full shadow-2xs"
                      style={{ 
                        backgroundColor: stage.softBg, 
                        color: stage.textColor,
                        border: `1.5px solid ${stage.borderColor}`
                      }}
                    >
                      {stage.grade}
                    </span>
                  </div>

                  {/* Circular Image Frame with Rotating Outer Ring & Floating Doodle Icon */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4 flex items-center justify-center">
                    
                    {/* Rotating Dashed Ring */}
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-dashed transition-transform duration-700 ease-out group-hover:rotate-45"
                      style={{ borderColor: stage.accentColor }}
                    />

                    {/* Soft Backdrop Tint */}
                    <div 
                      className="absolute inset-2 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-2xs"
                      style={{ backgroundColor: stage.softBg }}
                    />

                    {/* Main Circular Image */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md z-10 bg-white">
                      <img
                        src={stage.imageUrl}
                        alt={stage.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Floating Educational Icon Badge */}
                    <div 
                      className="absolute bottom-1 right-1 w-9 h-9 rounded-full shadow-md flex items-center justify-center z-20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 border-2 border-white"
                      style={{ backgroundColor: stage.iconBg }}
                    >
                      {stage.icon}
                    </div>

                  </div>

                  {/* Title & Short Description */}
                  <div className="space-y-1.5 z-10">
                    <h3 className="text-lg font-serif font-bold text-[#3B231A] tracking-tight group-hover:text-[#E78F68] transition-colors duration-200">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#3B231A]/75 font-sans font-light leading-relaxed max-w-xs mx-auto">
                      {stage.description}
                    </p>
                  </div>

                  {/* Subtle Accent Line */}
                  <div 
                    className="w-8 h-1 rounded-full mt-4 transition-all duration-300 group-hover:w-14"
                    style={{ backgroundColor: stage.accentColor }}
                  />

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
