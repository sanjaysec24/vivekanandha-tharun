import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  BrainCircuit, 
  Trophy, 
  Palette, 
  Atom, 
  Lightbulb, 
  Globe, 
  ShieldCheck, 
  Users, 
  Compass,
  ArrowRight,
  BookOpen,
  Star
} from 'lucide-react';

interface EducationalPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  softBg: string;
  borderColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  primaryIcon: React.ReactNode;
  doodleIcon: React.ReactNode;
}

const PILLARS: EducationalPillar[] = [
  {
    number: '01',
    title: 'Life Skills & Character Building',
    subtitle: 'Foundation of Integrity & Values',
    description: 'Building confidence, discipline, kindness, independence and strong moral values in every young mind.',
    bullets: ['Self-Discipline & Empathy', 'Emotional Intelligence', 'Mindful Reflection'],
    softBg: '#F0FDF4',       // Soft Mint
    borderColor: '#86EFAC',
    accentColor: '#10B981',
    badgeBg: '#DCFCE7',
    badgeText: '#166534',
    iconBg: '#10B981',
    primaryIcon: <Heart className="w-6 h-6 text-white" />,
    doodleIcon: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
  },
  {
    number: '02',
    title: 'Innovation & STEM Learning',
    subtitle: 'Curiosity & Hands-On Science',
    description: 'Encouraging science, technology, creativity, active experimentation and critical problem-solving.',
    bullets: ['Robotics & Logic Games', 'Hands-On Lab Experiments', 'Creative Problem Solving'],
    softBg: '#FFF7ED',       // Soft Peach/Orange
    borderColor: '#FED7AA',
    accentColor: '#E78F68',
    badgeBg: '#FFEDD5',
    badgeText: '#9A3412',
    iconBg: '#E78F68',
    primaryIcon: <BrainCircuit className="w-6 h-6 text-white" />,
    doodleIcon: <Atom className="w-5 h-5 text-[#E78F68]" />,
  },
  {
    number: '03',
    title: 'Excellence Beyond Classrooms',
    subtitle: 'Arts, Sports & Global Vision',
    description: 'Developing leadership, sportsmanship, visual arts, expressive communication and broad global exposure.',
    bullets: ['Visual & Performing Arts', 'Sports & Physical Health', 'Youth Leadership Skills'],
    softBg: '#EFF6FF',       // Soft Sky Blue
    borderColor: '#93C5FD',
    accentColor: '#3B82F6',
    badgeBg: '#DBEAFE',
    badgeText: '#1E40AF',
    iconBg: '#3B82F6',
    primaryIcon: <Trophy className="w-6 h-6 text-white" />,
    doodleIcon: <Globe className="w-5 h-5 text-[#3B82F6]" />,
  },
];

export default function Categories() {
  return (
    <section id="categories-section" className="bg-[#F5F1EB] py-20 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      
      {/* --- BACKGROUND DECORATIVE DOODLES (Placed in margin whitespace) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Heart & Hand Doodle - Top Left */}
        <div className="absolute top-12 left-6 text-[#10B981]/20 hidden sm:block">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M30 45 C15 35 10 25 10 18 C10 12 15 8 21 8 C25 8 28 11 30 14 C32 11 35 8 39 8 C45 8 50 12 50 18 C50 25 45 35 30 45 Z" strokeDasharray="3 2" />
            <circle cx="30" cy="22" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Atom Orbit Doodle - Top Right */}
        <div className="absolute top-14 right-8 text-[#E78F68]/20 hidden sm:block">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
            <ellipse cx="30" cy="30" rx="24" ry="9" transform="rotate(30 30 30)" strokeDasharray="4 2" />
            <ellipse cx="30" cy="30" rx="24" ry="9" transform="rotate(-30 30 30)" />
            <circle cx="30" cy="30" r="4" fill="currentColor" />
          </svg>
        </div>

        {/* Star Sparkles Doodle - Bottom Left */}
        <div className="absolute bottom-12 left-8 text-[#3B231A]/10 hidden sm:block">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M32 6 L36 24 L54 28 L36 32 L32 50 L28 32 L10 28 L28 24 Z" />
            <circle cx="48" cy="12" r="2" fill="currentColor" />
            <circle cx="14" cy="46" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Globe & Trophy Doodle - Bottom Right */}
        <div className="absolute bottom-12 right-10 text-[#3B231A]/10 hidden sm:block">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="32" cy="32" r="22" strokeDasharray="4 2" />
            <path d="M10 32 h44 M32 10 a 30 30 0 0 1 0 44 a 30 30 0 0 1 0 -44" />
          </svg>
        </div>

      </div>

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          
          {/* Eyebrow Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E78F68]/15 border border-[#E78F68]/30 text-[#E78F68] text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WE FOCUS ON ONE IMPACTFUL LESSON AT A TIME</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-[#3B231A] tracking-tight leading-tight"
          >
            Shaping the{' '}
            <span className="text-[#E78F68] italic relative inline-block font-serif">
              future
              <svg className="absolute left-0 -bottom-2 w-full h-2.5 text-[#E78F68]/40" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                <path d="M2 15 Q 50 2, 98 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{' '}
            of kids
          </motion.h2>

          {/* Supporting Paragraph */}
          <p className="text-xs sm:text-sm md:text-base text-[#3B231A]/75 max-w-xl mx-auto font-sans font-light leading-relaxed pt-1">
            Empowering students through three core educational pillars designed to foster character, creative intellect, and lifelong leadership.
          </p>

        </div>

        {/* --- 3 EDUCATIONAL PILLARS CONTAINER WITH CONNECTING PATH --- */}
        <div className="relative pt-4">

          {/* CONNECTING DOTTED JOURNEY PATH FOR DESKTOP */}
          <svg className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full h-20 pointer-events-none hidden lg:block overflow-visible z-0" fill="none">
            <path 
              d="M 220 40 Q 450 10, 640 40 T 1060 40" 
              stroke="#E78F68" 
              strokeWidth="2.5" 
              strokeDasharray="8 8" 
              opacity="0.35" 
              strokeLinecap="round" 
            />
          </svg>

          {/* CONNECTING DOTTED LINE FOR MOBILE/TABLET */}
          <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-[#E78F68]/35 block lg:hidden z-0 pointer-events-none" />

          {/* 3 ASYMMETRIC / SOPHISTICATED FEATURE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 relative z-10">
            {PILLARS.map((pillar, index) => {
              
              // Slight middle card elevation for editorial asymmetry on desktop
              const isMiddle = index === 1;

              return (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className={`group relative rounded-[32px] p-8 sm:p-9 transition-all duration-300 flex flex-col justify-between bg-white border-2 shadow-md hover:shadow-2xl hover:shadow-[#3B231A]/10 overflow-hidden ${
                    isMiddle ? 'lg:-translate-y-4 lg:shadow-xl' : ''
                  }`}
                  style={{ 
                    borderColor: pillar.borderColor,
                  }}
                >
                  
                  {/* Subtle Top Accent Tint Glow */}
                  <div 
                    className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-2xl -mr-10 -mt-10 pointer-events-none"
                    style={{ backgroundColor: pillar.borderColor }}
                  />

                  {/* Top Header Row: Giant Subtle Number & Icon Badge */}
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      
                      {/* Giant Number Overlay (e.g. 01, 02, 03) */}
                      <span className="font-serif text-5xl sm:text-6xl font-extrabold text-[#3B231A]/15 group-hover:text-[#3B231A]/25 transition-colors duration-300 select-none">
                        {pillar.number}
                      </span>

                      {/* Primary Icon Badge with Soft Ring */}
                      <div className="relative">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-300"
                          style={{ backgroundColor: pillar.iconBg }}
                        >
                          {pillar.primaryIcon}
                        </div>
                        {/* Floating Small Doodle Badge */}
                        <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-white shadow-xs border border-[#3B231A]/10">
                          {pillar.doodleIcon}
                        </div>
                      </div>

                    </div>

                    {/* Subtitle Badge */}
                    <div className="mb-3">
                      <span 
                        className="inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: pillar.badgeBg, color: pillar.badgeText }}
                      >
                        {pillar.subtitle}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3B231A] tracking-tight group-hover:text-[#E78F68] transition-colors duration-200 mb-3">
                      {pillar.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-xs sm:text-sm text-[#3B231A]/75 font-sans font-light leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bottom Area: Key Bullets List */}
                  <div className="pt-4 border-t border-[#3B231A]/10 space-y-2.5">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3B231A]/85 font-medium">
                        <div 
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: pillar.accentColor }}
                        />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Subtle Bottom Accent Indicator */}
                  <div 
                    className="w-12 h-1.5 rounded-full mt-6 transition-all duration-300 group-hover:w-20"
                    style={{ backgroundColor: pillar.accentColor }}
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
