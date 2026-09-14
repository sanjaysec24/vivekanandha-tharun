import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Award, Shield, Users, Heart, Sparkles, ArrowRight, GraduationCap, CheckCircle2, Calendar, Compass, Lightbulb, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F5F1EB] min-h-screen text-[#3B231A]"
    >
      {/* Hero Header / About Us Introduction */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#2B1710] via-[#3B231A] to-[#2E1A12] text-[#F5F1EB] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 text-center border-b border-[#E78F68]/15">
        {/* Soft Ambient Radial Lights & Glow Filters */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] md:w-[800px] h-[280px] sm:h-[400px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E78F68]/20 via-[#E78F68]/05 to-transparent blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#198C52]/10 blur-3xl rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/3 left-10 w-64 h-64 bg-[#E78F68]/10 blur-3xl rounded-full pointer-events-none z-0" />

        {/* Minimal Premium Kolam / Abstract Tamil Geometric Accents */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none z-0 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <circle cx="500" cy="300" r="280" stroke="url(#kolamGrad)" strokeWidth="1.2" strokeDasharray="6 6" />
            <circle cx="500" cy="300" r="200" stroke="url(#kolamGrad)" strokeWidth="1" />
            <circle cx="500" cy="300" r="120" stroke="url(#kolamGrad)" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 500 20 L 500 580 M 200 300 L 800 300" stroke="url(#kolamGrad)" strokeWidth="0.8" strokeDasharray="3 3" />
            <defs>
              <linearGradient id="kolamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E78F68" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Ambient Particles / Geometry Dots */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-12 left-[15%] w-1.5 h-1.5 rounded-full bg-[#E78F68]/40 animate-pulse" />
          <div className="absolute top-28 right-[18%] w-2 h-2 rounded-full bg-[#F5F1EB]/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-16 left-[22%] w-2 h-2 rounded-full bg-[#E78F68]/30 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-[15%] w-1.5 h-1.5 rounded-full bg-[#F5F1EB]/40 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Central Glassmorphism Card Container */}
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="backdrop-blur-md bg-white/[0.035] border border-white/10 rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.35)] space-y-6 sm:space-y-8 relative overflow-hidden"
          >
            {/* Top Subtle Highlight Line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E78F68]/50 to-transparent" />

            {/* Small Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-[#E78F68]/15 border border-[#E78F68]/30 text-[#E78F68] text-[11px] sm:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E78F68] animate-ping" />
              <span>Our Legacy</span>
            </motion.div>

            {/* Large Premium Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-serif font-bold tracking-tight leading-[1.15] text-[#F5F1EB]"
            >
              Nurturing Hearts &{' '}
              <span className="relative inline-block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E78F68] via-[#F8B393] to-[#E78F68] drop-shadow-sm">
                Empowering Minds
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#E78F68]/60 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M 0 10 Q 50 18 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-[19px] text-[#F5F1EB]/85 max-w-2xl mx-auto font-light leading-relaxed font-sans"
            >
              Founded with a vision to blend ancient Tamil cultural wisdom with modern future-ready education, Vivekanandha School stands as a beacon of academic excellence and character.
            </motion.p>

            {/* Premium Trust Strip / Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left"
            >
              <div className="flex items-center space-x-2.5 bg-white/[0.04] border border-white/08 hover:border-[#E78F68]/40 p-3 sm:p-3.5 rounded-2xl transition-all duration-300">
                <div className="p-2 rounded-xl bg-[#E78F68]/15 text-[#E78F68] shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#F5F1EB]">Academic Excellence</p>
                  <p className="text-[10px] sm:text-xs text-[#F5F1EB]/60">15+ Years of Experience</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 bg-white/[0.04] border border-white/08 hover:border-[#198C52]/40 p-3 sm:p-3.5 rounded-2xl transition-all duration-300">
                <div className="p-2 rounded-xl bg-[#198C52]/15 text-[#198C52] shrink-0">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#F5F1EB]">CBSE Curriculum</p>
                  <p className="text-[10px] sm:text-xs text-[#F5F1EB]/60">Holistic Learning</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 bg-white/[0.04] border border-white/08 hover:border-[#E78F68]/40 p-3 sm:p-3.5 rounded-2xl transition-all duration-300">
                <div className="p-2 rounded-xl bg-[#E78F68]/15 text-[#E78F68] shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#F5F1EB]">Experienced Faculty</p>
                  <p className="text-[10px] sm:text-xs text-[#F5F1EB]/60">Dedicated Mentors</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 bg-white/[0.04] border border-white/08 hover:border-[#5B92E5]/40 p-3 sm:p-3.5 rounded-2xl transition-all duration-300">
                <div className="p-2 rounded-xl bg-[#5B92E5]/15 text-[#5B92E5] shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#F5F1EB]">Future Ready</p>
                  <p className="text-[10px] sm:text-xs text-[#F5F1EB]/60">STEM & Culture</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* School History / Timeline Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center justify-center space-x-2">
              <span className="h-0.5 w-6 bg-[#E78F68]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#E78F68]">
                OUR JOURNEY
              </span>
              <span className="h-0.5 w-6 bg-[#E78F68]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#3B231A] tracking-tight leading-snug">
              From a small beginning to a future-ready learning community.
            </h2>
            <div className="flex items-center justify-center space-x-2 pt-1 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E78F68]" />
              <span className="w-12 h-px bg-gradient-to-r from-[#E78F68] to-transparent" />
              <Sparkles className="w-3.5 h-3.5 text-[#E78F68]" />
              <span className="w-12 h-px bg-gradient-to-l from-[#E78F68] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E78F68]" />
            </div>
          </div>

          {/* Editorial Timeline: Desktop Horizontal (md+), Mobile Vertical (<md) */}
          <div className="relative py-4">
            
            {/* DESKTOP / TABLET HORIZONTAL TIMELINE (Hidden on mobile) */}
            <div className="hidden md:block relative">
              {/* Continuous Connecting Track Line */}
              <div 
                className="absolute top-6 left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-[#E78F68] via-[#E78F68]/50 to-[#198C52]/50 z-0"
                aria-hidden="true"
              />
              
              {/* Milestone Grid */}
              <div className="grid grid-cols-4 gap-6 relative z-10">
                
                {/* 1. FOUNDATION - 2009 (Stronger visual emphasis) */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="group flex flex-col items-center text-center px-2"
                >
                  {/* Marker Pin */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#E78F68] text-white flex items-center justify-center shadow-md ring-4 ring-[#FAF7F2] ring-offset-2 ring-offset-[#E78F68]/20 transition-transform duration-300 group-hover:scale-110">
                      <Calendar className="w-5 h-5" />
                    </div>
                    {/* Subtle Ping Ring */}
                    <span className="absolute -inset-1 rounded-full border border-[#E78F68]/30 animate-pulse pointer-events-none" />
                  </div>

                  {/* Year & Badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E78F68]/15 text-[#E78F68] text-xs font-bold font-mono tracking-wider mb-1.5">
                    June 4, 2009
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3B231A] tracking-tight group-hover:text-[#E78F68] transition-colors duration-200">
                    FOUNDATION
                  </h3>
                  <p className="mt-2 text-xs text-[#3B231A]/75 leading-relaxed font-sans font-normal max-w-[220px]">
                    Vivekanandha School was established in June 2009 with a vision to provide strong academic foundations and value-based education for young learners.
                  </p>
                </motion.div>

                {/* 2. GROWTH */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="group flex flex-col items-center text-center px-2"
                >
                  {/* Marker Pin */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border-2 border-[#E78F68] text-[#E78F68] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#E78F68] group-hover:text-white">
                      <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#3B231A]/40 mb-1.5">
                    Milestone II
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3B231A] tracking-tight group-hover:text-[#E78F68] transition-colors duration-200">
                    GROWTH
                  </h3>
                  <p className="mt-2 text-xs text-[#3B231A]/75 leading-relaxed font-sans font-normal max-w-[220px]">
                    The school expanded its learning environment with a stronger focus on holistic development, activities, and individual student attention.
                  </p>
                </motion.div>

                {/* 3. INNOVATION */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="group flex flex-col items-center text-center px-2"
                >
                  {/* Marker Pin */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border-2 border-[#198C52] text-[#198C52] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#198C52] group-hover:text-white">
                      <Lightbulb className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#3B231A]/40 mb-1.5">
                    Milestone III
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3B231A] tracking-tight group-hover:text-[#198C52] transition-colors duration-200">
                    INNOVATION
                  </h3>
                  <p className="mt-2 text-xs text-[#3B231A]/75 leading-relaxed font-sans font-normal max-w-[220px]">
                    Technology-enabled classrooms, activity-based learning, and modern teaching approaches became an important part of the learning experience.
                  </p>
                </motion.div>

                {/* 4. TODAY */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="group flex flex-col items-center text-center px-2"
                >
                  {/* Marker Pin */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#198C52] text-white flex items-center justify-center shadow-md ring-4 ring-[#FAF7F2] ring-offset-2 ring-offset-[#198C52]/20 transition-transform duration-300 group-hover:scale-110">
                      <Rocket className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#198C52]/10 text-[#198C52] text-xs font-bold tracking-wider mb-1.5">
                    Future Ready
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3B231A] tracking-tight group-hover:text-[#198C52] transition-colors duration-200">
                    TODAY
                  </h3>
                  <p className="mt-2 text-xs text-[#3B231A]/75 leading-relaxed font-sans font-normal max-w-[220px]">
                    Vivekanandha School continues to nurture confident, capable, and compassionate learners while preparing children for the future.
                  </p>
                </motion.div>

              </div>
            </div>

            {/* MOBILE VERTICAL TIMELINE (Visible on <md) */}
            <div className="md:hidden relative pl-8 sm:pl-10 space-y-8">
              {/* Vertical Connecting Line */}
              <div 
                className="absolute left-4 sm:left-5 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#E78F68] via-[#E78F68]/60 to-[#198C52]" 
                aria-hidden="true" 
              />

              {/* 1. FOUNDATION */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Marker Dot */}
                <div className="absolute -left-8 sm:-left-10 top-0.5 w-8 h-8 rounded-full bg-[#E78F68] text-white flex items-center justify-center shadow-sm ring-2 ring-[#FAF7F2]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#E78F68]/15 text-[#E78F68] text-[11px] font-bold font-mono">
                    June 4, 2009
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3B231A]">
                    FOUNDATION
                  </h3>
                  <p className="text-xs text-[#3B231A]/75 leading-relaxed font-sans">
                    Vivekanandha School was established in June 2009 with a vision to provide strong academic foundations and value-based education for young learners.
                  </p>
                </div>
              </motion.div>

              {/* 2. GROWTH */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative"
              >
                {/* Marker Dot */}
                <div className="absolute -left-8 sm:-left-10 top-0.5 w-8 h-8 rounded-full bg-[#FAF7F2] border-2 border-[#E78F68] text-[#E78F68] flex items-center justify-center shadow-sm ring-2 ring-[#FAF7F2]">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3B231A]/40 block">
                    Milestone II
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3B231A]">
                    GROWTH
                  </h3>
                  <p className="text-xs text-[#3B231A]/75 leading-relaxed font-sans">
                    The school expanded its learning environment with a stronger focus on holistic development, activities, and individual student attention.
                  </p>
                </div>
              </motion.div>

              {/* 3. INNOVATION */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="relative"
              >
                {/* Marker Dot */}
                <div className="absolute -left-8 sm:-left-10 top-0.5 w-8 h-8 rounded-full bg-[#FAF7F2] border-2 border-[#198C52] text-[#198C52] flex items-center justify-center shadow-sm ring-2 ring-[#FAF7F2]">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3B231A]/40 block">
                    Milestone III
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3B231A]">
                    INNOVATION
                  </h3>
                  <p className="text-xs text-[#3B231A]/75 leading-relaxed font-sans">
                    Technology-enabled classrooms, activity-based learning, and modern teaching approaches became an important part of the learning experience.
                  </p>
                </div>
              </motion.div>

              {/* 4. TODAY */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative"
              >
                {/* Marker Dot */}
                <div className="absolute -left-8 sm:-left-10 top-0.5 w-8 h-8 rounded-full bg-[#198C52] text-white flex items-center justify-center shadow-sm ring-2 ring-[#FAF7F2]">
                  <Rocket className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#198C52]/10 text-[#198C52] text-[11px] font-bold">
                    Future Ready
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3B231A]">
                    TODAY
                  </h3>
                  <p className="text-xs text-[#3B231A]/75 leading-relaxed font-sans">
                    Vivekanandha School continues to nurture confident, capable, and compassionate learners while preparing children for the future.
                  </p>
                </div>
              </motion.div>

            </div>

          </div>

          {/* Achievement Statistics Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
            <div className="bg-[#E78F68]/10 p-5 rounded-2xl border border-[#E78F68]/20">
              <div className="text-3xl font-serif font-bold text-[#E78F68]">15+</div>
              <div className="text-xs font-medium text-[#3B231A]/70 uppercase tracking-wider mt-1">YEARS OF EXPERIENCE</div>
            </div>
            <div className="bg-[#198C52]/10 p-5 rounded-2xl border border-[#198C52]/20">
              <div className="text-3xl font-serif font-bold text-[#198C52]">100%</div>
              <div className="text-xs font-medium text-[#3B231A]/70 uppercase tracking-wider mt-1">Holistic Development</div>
            </div>
          </div>

          {/* New Tamil Educational Heritage Card */}
          <div className="w-full min-h-[420px] bg-[#FAF7F2] rounded-[28px] border-[1.5px] border-[#E6DCCF] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center space-y-6 md:pr-[280px] shadow-[0_2px_12px_rgba(58,35,24,0.03)] mt-10">
            {/* Matte background textures */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" fill="none" stroke="#3B231A">
                <circle cx="200" cy="200" r="180" strokeDasharray="4 4" />
                <path d="M 0 0 L 900 420" />
              </svg>
            </div>

            <div className="space-y-2 relative z-10">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#E78F68] uppercase">
                TAMIL EDUCATIONAL HERITAGE
              </span>
            </div>

            <div className="space-y-4 relative z-10">
              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-tamil font-semibold text-[#3B231A] leading-[1.6] tracking-tight">
                கேடில் விழுச்செல்வம் கல்வி ஒருவருக்கு<br />
                மாடல்ல மற்றையவை
              </h3>
              <p className="text-[20px] font-tamil font-medium text-[#8B6B52]">
                — திருவள்ளுவர் (குறள் 400)
              </p>
            </div>

            <div className="space-y-4 border-t border-[#3B231A]/10 pt-6 relative z-10">
              <p className="text-2xl font-serif italic text-[#7A6A5B] leading-relaxed">
                "Kedil Vizhuchelvam Kalvi Oruvarku<br />
                Maadalla Matraiyavai"
              </p>
              <p className="text-[20px] font-sans text-[#5B4D42] leading-[1.8] font-normal">
                "Learning is the only imperishable wealth;<br />
                all other possessions are temporary."
              </p>
            </div>

            {/* Tree of Knowledge Illustration placed elegantly along the bottom right corner */}
            <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-2 right-4 md:bottom-4 md:right-8 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] pointer-events-none opacity-35 md:opacity-90 block z-0">
              {/* Elegant Tree trunk and branches (Tree of Knowledge) */}
              <path d="M 130 220 L 130 160" stroke="#3B231A" strokeWidth="6" strokeLinecap="round" />
              <path d="M 130 180 Q 110 160 90 150" stroke="#3B231A" strokeWidth="4" strokeLinecap="round" />
              <path d="M 130 170 Q 150 150 170 145" stroke="#3B231A" strokeWidth="4" strokeLinecap="round" />
              <path d="M 130 160 Q 120 130 105 120" stroke="#3B231A" strokeWidth="3" strokeLinecap="round" />
              <path d="M 130 160 Q 140 135 155 125" stroke="#3B231A" strokeWidth="3" strokeLinecap="round" />
              
              {/* Tree Canopy leaves / circles of knowledge representing CBSE, STEM, Art, Culture, Tamil */}
              <circle cx="130" cy="100" r="30" fill="#E78F68" fillOpacity="0.85" stroke="#3B231A" strokeWidth="1.5" />
              <circle cx="95" cy="120" r="24" fill="#198C52" fillOpacity="0.85" stroke="#3B231A" strokeWidth="1.5" />
              <circle cx="165" cy="115" r="26" fill="#5B92E5" fillOpacity="0.85" stroke="#3B231A" strokeWidth="1.5" />
              <circle cx="110" cy="75" r="20" fill="#EAB308" fillOpacity="0.85" stroke="#3B231A" strokeWidth="1.5" />
              <circle cx="150" cy="80" r="22" fill="#E78F68" fillOpacity="0.85" stroke="#3B231A" strokeWidth="1.5" />
              
              {/* Tiny books, pencils, stars, and leaves in the canopy */}
              <g transform="translate(115, 85)">
                <path d="M 5 5 L 15 5 L 15 15 L 5 15 Z" fill="white" stroke="#3B231A" strokeWidth="1" />
                <line x1="8" y1="8" x2="12" y2="8" stroke="#3B231A" strokeWidth="0.8" />
                <line x1="8" y1="11" x2="12" y2="11" stroke="#3B231A" strokeWidth="0.8" />
              </g>
              
              <g transform="translate(145, 105)">
                <path d="M 10 5 L 20 8 L 10 11 L 0 8 Z" fill="#3B231A" />
                <rect x="7" y="8" width="6" height="4" fill="#3B231A" />
              </g>
              
              {/* Stars of knowledge (motifs) */}
              <path d="M 75 80 L 78 85 L 83 86 L 79 90 L 80 95 L 75 92 L 70 95 L 71 90 L 67 86 L 72 85 Z" fill="#EAB308" />
              <path d="M 185 75 L 187 79 L 192 80 L 188 84 L 189 89 L 185 86 L 181 89 L 182 84 L 178 80 L 183 79 Z" fill="#EAB308" />
              <path d="M 130 45 L 132 49 L 137 50 L 133 54 L 134 59 L 130 56 L 126 59 L 127 54 L 123 50 L 128 49 Z" fill="#EAB308" />

              {/* Small Lotus placed elegantly near the base */}
              <g transform="translate(170, 185)">
                <path d="M 15 15 C 0 5, -5 -10, 15 -20 C 35 -10, 30 5, 15 15 Z" fill="#FDA4AF" />
                <path d="M 15 15 C 8 8, 5 2, 10 -10 C 15 -15, 15 -15, 15 -15 C 15 -15, 15 -15, 20 -10 C 25 2, 25 8, 15 15 Z" fill="#E11D48" />
                <circle cx="15" cy="-2" r="1.5" fill="#FEF08A" />
              </g>

              {/* Open Book at the bottom-right under/by the tree */}
              <g transform="translate(75, 195)">
                <path d="M 5 15 Q 30 7 30 18 Q 30 7 55 15 L 55 30 Q 30 22 30 33 Q 30 22 5 30 Z" fill="#FCFAF7" stroke="#3B231A" strokeWidth="1.2" />
                <line x1="10" y1="18" x2="25" y2="18" stroke="#3B231A" strokeWidth="0.8" opacity="0.4" />
                <line x1="10" y1="21" x2="27" y2="21" stroke="#3B231A" strokeWidth="0.8" opacity="0.4" />
                <line x1="10" y1="24" x2="22" y2="24" stroke="#3B231A" strokeWidth="0.8" opacity="0.4" />
                <line x1="35" y1="18" x2="50" y2="18" stroke="#3B231A" strokeWidth="0.8" opacity="0.4" />
                <line x1="35" y1="21" x2="48" y2="21" stroke="#3B231A" strokeWidth="0.8" opacity="0.4" />
              </g>
              
              {/* Pencil doodles / educational motifs around the ground */}
              <path d="M 60 225 L 200 225" stroke="#3B231A" strokeWidth="2" strokeLinecap="round" />
              <path d="M 80 232 L 180 232" stroke="#3B231A" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Tiny pencil doodle */}
              <g transform="translate(195, 205) rotate(45)">
                <rect x="0" y="0" width="4" height="20" fill="#EAB308" stroke="#3B231A" strokeWidth="0.8" />
                <path d="M 0 0 L 2 -4 L 4 0 Z" fill="#E78F68" stroke="#3B231A" strokeWidth="0.8" />
                <rect x="0" y="16" width="4" height="4" fill="#FDA4AF" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Vision & Mission Symmetrical Cards */}
      <div className="bg-[#EAE4D9] py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-8 md:p-10 rounded-[28px] border border-[#3B231A]/10 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E78F68]/10 flex items-center justify-center text-[#E78F68]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-[30px] font-serif font-bold text-[#3B231A]">Our Noble Vision</h3>
            <p className="text-base md:text-[18px] text-[#3B231A]/85 font-light leading-relaxed font-sans">
              To be an internationally acclaimed nursery and primary academy where standard educational curricula fuse organically with native Tamil spiritual, moral, and cultural values—developing resilient, compassionate, and self-reliant global innovators.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-8 md:p-10 rounded-[28px] border border-[#3B231A]/10 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#198C52]/10 flex items-center justify-center text-[#198C52]">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-[30px] font-serif font-bold text-[#3B231A]">Our Core Mission</h3>
            <p className="text-base md:text-[18px] text-[#3B231A]/85 font-light leading-relaxed font-sans">
              We cultivate the unique flame of intelligence within each student. By rendering concepts tactile, employing smart classroom visual aids, nurturing sportsmanship, and offering individual academic support, we spark lasting curiosity and character.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Chairman & Principal Messages (Symmetrical letters) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Guiding Lights</span>
          <h2 className="text-3xl md:text-[52px] font-serif font-bold leading-tight">Messages from Our Leadership</h2>
          <p className="text-base md:text-[18px] text-[#3B231A]/70 max-w-xl mx-auto font-sans font-light">
            Meet the pioneers whose dedication, experience, and academic empathy drive Vivekanandha School's philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Chairman Message Card */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-[#3B231A]/10 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-[#E78F68] text-4xl font-serif opacity-30">“</div>
              <h3 className="text-2xl md:text-[30px] font-serif font-bold text-[#3B231A] leading-snug">Inspiring Tamil Values & High Aspirations</h3>
              <p className="text-base md:text-[18px] text-[#3B231A]/80 font-sans font-light leading-relaxed italic">
                "Our school is not merely a venue of certificates; it is an organic nursery of character. We believe that true learning occurs when a child feels completely safe, culturally validated, and creatively stimulated. Our focus is to instill the timeless Tamil moral codes of 'Aram' and selfless hard work. When kids grow up with a sound moral compass, success becomes an inevitable outcome."
              </p>
            </div>
            <div className="flex items-center space-x-4 border-t border-[#3B231A]/10 pt-4">
              <div className="w-12 h-12 rounded-full bg-[#E78F68]/10 flex items-center justify-center font-serif font-bold text-[#E78F68] text-lg border border-[#E78F68]/20">
                BL
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3B231A] text-sm">Baskaran L</h4>
                <p className="text-xs text-[#3B231A]/60 uppercase tracking-widest font-mono">Correspondent</p>
              </div>
            </div>
          </div>

          {/* Principal Message Card */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-[#3B231A]/10 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-[#198C52] text-4xl font-serif opacity-30">“</div>
              <h3 className="text-2xl md:text-[30px] font-serif font-bold text-[#3B231A] leading-snug">Delivering Scientific Discovery & Joyful Learning</h3>
              <p className="text-base md:text-[18px] text-[#3B231A]/80 font-sans font-light leading-relaxed italic">
                "As educators of early childhood developmental stages (Pre KG through Grade 5), we respect the absolute sovereignty of child play and analytical inquiry. We integrate tactile Montessori boards, STEM experiments, and computer literacy at a highly intuitive pace. One Smart Lesson at a time ensures that no child faces academic anxiety. We welcome you to experience our happy, high-achieving academy!"
              </p>
            </div>
            <div className="flex items-center space-x-4 border-t border-[#3B231A]/10 pt-4">
              <div className="w-12 h-12 rounded-full bg-[#198C52]/10 flex items-center justify-center font-serif font-bold text-[#198C52] text-lg border border-[#198C52]/20">
                SL
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3B231A] text-sm">Sudha Lakshmi B</h4>
                <p className="text-xs text-[#3B231A]/60 uppercase tracking-widest font-mono">Principal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* School Core Values Section (Grid of 4 Cards) */}
      <div className="bg-[#F4F0EA] py-16 border-t border-[#3B231A]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E78F68]">THE PILLARS OF OUR CULTURE</span>
            <h2 className="text-3xl md:text-[52px] font-serif font-bold leading-tight">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-[24px] border border-[#3B231A]/15 text-center space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-12 h-12 bg-[#E78F68]/10 text-[#E78F68] rounded-2xl flex items-center justify-center text-lg font-bold">1</div>
              <h4 className="text-xl md:text-[30px] font-serif font-bold text-[#3B231A] leading-tight">அறம் (Integrity)</h4>
              <p className="text-base md:text-[18px] text-[#3B231A]/85 leading-relaxed font-sans font-light">
                Teaching honesty, truthfulness and social responsibility from an early age.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-[24px] border border-[#3B231A]/15 text-center space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-12 h-12 bg-[#198C52]/10 text-[#198C52] rounded-2xl flex items-center justify-center text-lg font-bold">2</div>
              <h4 className="text-xl md:text-[30px] font-serif font-bold text-[#3B231A] leading-tight">அன்பு (Compassion)</h4>
              <p className="text-base md:text-[18px] text-[#3B231A]/85 leading-relaxed font-sans font-light">
                Fostering kindness, supportive friendships and respect for elders.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-[24px] border border-[#3B231A]/15 text-center space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-12 h-12 bg-[#67ACE6]/10 text-[#2563EB] rounded-2xl flex items-center justify-center text-lg font-bold">3</div>
              <h4 className="text-xl md:text-[30px] font-serif font-bold text-[#3B231A] leading-tight">அறிவு (Curiosity)</h4>
              <p className="text-base md:text-[18px] text-[#3B231A]/85 leading-relaxed font-sans font-light">
                Encouraging questions, hands-on learning and independent exploration.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-[24px] border border-[#3B231A]/15 text-center space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-12 h-12 bg-yellow-500/10 text-yellow-600 rounded-2xl flex items-center justify-center text-lg font-bold">4</div>
              <h4 className="text-xl md:text-[30px] font-serif font-bold text-[#3B231A] leading-tight">ஒழுக்கம் (Discipline)</h4>
              <p className="text-base md:text-[18px] text-[#3B231A]/85 leading-relaxed font-sans font-light">
                Building self-discipline, responsibility and daily learning habits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
