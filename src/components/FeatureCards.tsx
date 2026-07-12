import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FeatureCardsProps {
  onOpenAdmissions: () => void;
}

export default function FeatureCards({ onOpenAdmissions }: FeatureCardsProps) {
  return (
    <section id="features-section" className="bg-[#F5F1EB] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3B231A] tracking-tight leading-tight">
              Smart and clever kids ready to <span className="text-[#E78F68] italic">fly high!</span>
            </h2>
            <p className="text-sm md:text-base text-[#3B231A]/70 leading-relaxed font-sans font-light">
              Learn smartly with us. We teach <strong className="font-semibold text-[#3B231A]">‘One Smart Lesson’</strong> at a time, allowing concepts to settle into intuitive mastery.
            </p>
          </div>
          <div>
            <button
              onClick={onOpenAdmissions}
              className="group inline-flex items-center space-x-2 bg-white border border-[#3B231A]/15 text-[#3B231A] font-semibold px-6 py-3.5 rounded-full hover:bg-[#3B231A] hover:text-[#F5F1EB] transition-all duration-300 shadow-sm"
            >
              <span>Enroll Now</span>
              <ArrowUpRight className="w-4 h-4 text-[#E78F68] group-hover:text-white transition-colors duration-200" />
            </button>
          </div>
        </div>

        {/* 3 Colorful Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CARD 1 (Orange Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-[#F68A47] rounded-[32px] p-8 min-h-[480px] flex flex-col justify-between group shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* White Cloud Doodles decoration */}
            <div className="absolute top-6 right-6 opacity-30 pointer-events-none z-0">
              <svg width="80" height="60" viewBox="0 0 100 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 40C15 40 10 35 10 30C10 25 15 20 20 20C22 15 28 10 35 10C45 10 50 15 52 20C55 15 62 15 65 20C75 20 80 25 80 30C80 35 75 40 70 40H20Z" />
              </svg>
            </div>

            {/* Basketball illustration decoration */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/10 backdrop-blur-sm p-3.5 rounded-full border border-white/20 animate-spin duration-[20000ms]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M6.2 6.2C8.5 8.5 8.5 15.5 6.2 17.8" />
                <path d="M17.8 6.2C15.5 8.5 15.5 15.5 17.8 17.8" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="12" y1="2" x2="12" y2="22" />
              </svg>
            </div>

            {/* Playful Line Art background decoration */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M10 80 Q 30 50 70 80" stroke="white" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                <circle cx="20" cy="30" r="2" fill="white" />
                <circle cx="85" cy="45" r="3" fill="white" />
              </svg>
            </div>

            {/* Text Block - Top Left */}
            <div className="space-y-3 z-10 max-w-[48%] text-left">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                Life Skills & Character Building
              </h3>
              <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
                Building confidence, discipline, kindness and strong values for tomorrow.
              </p>
            </div>

            {/* Floating Premium Educational Symbols (Veena, Books, Lamp, Lotus) */}
            <div className="absolute bottom-0 right-0 w-[50%] h-[85%] z-10 pointer-events-none transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 origin-bottom-right">
              <svg width="100%" height="100%" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Subtle orbiting dotted rings */}
                <circle cx="100" cy="180" r="65" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                <circle cx="110" cy="190" r="95" stroke="white" strokeWidth="1" strokeDasharray="6 6" opacity="0.15" />
                
                {/* Floating Traditional Kolam details in white/gold line art */}
                <g transform="translate(40, 60)" stroke="white" strokeWidth="1" opacity="0.3" fill="none">
                  <path d="M0 0 L15 15 L0 30 L-15 15 Z" />
                  <circle cx="0" cy="15" r="4" />
                </g>
                <g transform="translate(150, 140)" stroke="white" strokeWidth="0.75" opacity="0.25" fill="none">
                  <circle cx="0" cy="0" r="12" />
                  <path d="M-12 0 L12 0 M0 -12 L0 12" />
                </g>

                {/* Open Book at bottom center-left */}
                <g transform="translate(35, 230)">
                  {/* Book shadow/glow */}
                  <path d="M 5 15 Q 35 5 35 20 Q 35 5 65 15 L 65 30 Q 35 20 35 35 Q 35 20 5 30 Z" fill="#7C2D12" opacity="0.2" />
                  {/* Pages */}
                  <path d="M 5 15 Q 35 5 35 20 L 35 35 Q 5 20 5 30 Z" fill="#FDF8F5" />
                  <path d="M 35 20 Q 35 5 65 15 L 65 30 Q 35 20 35 35 Z" fill="#FDF8F5" />
                  {/* Cover */}
                  <path d="M 3 17 Q 35 7 35 22 Q 35 7 67 17 L 67 32 Q 35 22 35 37 Q 35 22 3 32 Z" stroke="#FDE047" strokeWidth="1.5" fill="none" />
                  {/* Text lines */}
                  <line x1="10" y1="18" x2="28" y2="18" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
                  <line x1="10" y1="22" x2="30" y2="22" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
                  <line x1="10" y1="26" x2="24" y2="26" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
                  <line x1="40" y1="16" x2="58" y2="16" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
                  <line x1="40" y1="20" x2="60" y2="20" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
                  <line x1="40" y1="24" x2="54" y2="24" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
                </g>

                {/* Brass Kuthuvilakku Lamp (small, elegant) on the left side */}
                <g transform="translate(15, 120)">
                  {/* Glowing aura */}
                  <circle cx="20" cy="15" r="25" fill="#FEF08A" opacity="0.15" />
                  
                  {/* Stand and base */}
                  <ellipse cx="20" cy="85" rx="14" ry="4" fill="#F59E0B" />
                  <rect x="18" y="30" width="4" height="55" fill="#D97706" />
                  <rect x="19.5" y="30" width="1" height="55" fill="#FEF08A" />
                  {/* Decorative rings */}
                  <ellipse cx="20" cy="70" rx="8" ry="2" fill="#B45309" />
                  <ellipse cx="20" cy="50" rx="6" ry="1.5" fill="#B45309" />
                  {/* Oil cup */}
                  <ellipse cx="20" cy="30" rx="12" ry="3.5" fill="#F59E0B" />
                  <path d="M 8 30 C 8 38, 32 38, 32 30 Z" fill="#D97706" />
                  {/* Flame */}
                  <path d="M 20 5 C 16 16, 20 22, 20 22 C 20 22, 24 16, 20 5 Z" fill="#FF4500" />
                  <path d="M 20 10 C 18 16, 20 20, 20 20 C 20 20, 22 16, 20 10 Z" fill="#F59E0B" />
                  <circle cx="20" cy="5" r="1.5" fill="#FEF08A" opacity="0.8" />
                </g>

                {/* Lotus Flower at bottom-center */}
                <g transform="translate(95, 235)">
                  {/* Outer petals */}
                  <path d="M 20 20 C 0 10, -5 -10, 20 -20 C 40 -10, 35 10, 20 20 Z" fill="#FDA4AF" opacity="0.9" />
                  {/* Inner petals */}
                  <path d="M 20 20 C 10 12, 8 3, 15 -12 C 20 -18, 20 -18, 20 -18 C 20 -18, 20 -18, 25 -12 C 30 3, 30 12, 20 20 Z" fill="#E11D48" />
                  <path d="M 20 20 C 15 17, 5 10, 8 0 C 10 -10, 12 -12, 12 -12 C 12 -12, 16 -7, 18 3 C 20 15, 20 20, 20 20 Z" fill="#F43F5E" />
                  <path d="M 20 20 C 25 15, 35 10, 32 0 C 30 -10, 28 -12, 28 -12 C 28 -12, 24 -7, 22 3 C 20 15, 20 20, 20 20 Z" fill="#F43F5E" />
                  {/* Center details */}
                  <circle cx="20" cy="0" r="1.5" fill="#FEF08A" />
                </g>

                {/* Primary Hero: Large Traditional Veena sweeping diagonally */}
                <g transform="translate(25, 25)">
                  {/* Large bottom resonator (gourd) */}
                  <circle cx="115" cy="185" r="28" fill="#78350F" stroke="#FDE047" strokeWidth="1.5" />
                  <circle cx="115" cy="185" r="24" fill="#92400E" />
                  <circle cx="115" cy="185" r="16" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="115" cy="185" r="8" fill="#B45309" />
                  
                  {/* Smaller top resonator */}
                  <circle cx="45" cy="70" r="14" fill="#78350F" stroke="#FDE047" strokeWidth="1" />
                  <circle cx="45" cy="70" r="11" fill="#92400E" />

                  {/* Long main stem (Dandi) connecting them */}
                  <path d="M 40 68 L 110 168 L 118 162 L 48 62 Z" fill="#78350F" />
                  {/* Yellow/Gold strip on stem */}
                  <path d="M 42 66 L 112 166" stroke="#FEF08A" strokeWidth="2" />
                  
                  {/* Traditional dragon-neck (Yali) headstock */}
                  <path d="M 42 68 C 36 62, 25 60, 20 50 C 16 42, 14 34, 20 26 C 26 18, 38 22, 42 32 C 46 42, 42 50, 48 58 Z" fill="#92400E" stroke="#FEF08A" strokeWidth="0.75" />
                  
                  {/* Bridge */}
                  <rect x="108" y="172" width="10" height="6" rx="1" transform="rotate(-45 108 172)" fill="#FEF08A" />

                  {/* Tuning pegs */}
                  <circle cx="28" cy="45" r="3.5" fill="#FEF08A" />
                  <line x1="28" y1="45" x2="20" y2="50" stroke="#FEF08A" strokeWidth="2.5" />
                  <circle cx="34" cy="38" r="3.5" fill="#FEF08A" />
                  <line x1="34" y1="38" x2="28" y2="30" stroke="#FEF08A" strokeWidth="2.5" />

                  {/* Frets along the neck */}
                  <line x1="53" y1="74" x2="58" y2="69" stroke="#FDE047" strokeWidth="1.5" />
                  <line x1="61" y1="83" x2="66" y2="78" stroke="#FDE047" strokeWidth="1.5" />
                  <line x1="69" y1="92" x2="74" y2="87" stroke="#FDE047" strokeWidth="1.5" />
                  <line x1="77" y1="101" x2="82" y2="96" stroke="#FDE047" strokeWidth="1.5" />
                  <line x1="85" y1="110" x2="90" y2="105" stroke="#FDE047" strokeWidth="1.5" />
                  <line x1="93" y1="119" x2="98" y2="114" stroke="#FDE047" strokeWidth="1.5" />
                  <line x1="101" y1="128" x2="106" y2="123" stroke="#FDE047" strokeWidth="1.5" />

                  {/* Golden strings */}
                  <line x1="42" y1="42" x2="112" y2="175" stroke="#FFF" strokeWidth="0.9" opacity="0.95" />
                  <line x1="44" y1="44" x2="114" y2="177" stroke="#FEF08A" strokeWidth="0.6" opacity="0.85" />
                </g>
                
                {/* Pencil / Knowledge-themed doodles (floating stars / sparkles) */}
                <g stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                  <path d="M 170 80 L 175 75 M 175 75 H 170 M 175 75 V 80" />
                  <circle cx="165" cy="240" r="2" fill="white" />
                  <path d="M 80 40 Q 85 45 90 40" fill="none" />
                </g>
              </svg>
            </div>
          </motion.div>

          {/* CARD 2 (Green Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative overflow-hidden bg-[#198C52] rounded-[32px] p-8 min-h-[480px] flex flex-col justify-between group shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Yellow Hand Drawn Loop Doodles decoration */}
            <div className="absolute top-6 right-6 opacity-35 pointer-events-none z-0">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#F1C40F" strokeWidth="2.5" strokeLinecap="round">
                <path d="M10 50C10 30 30 10 50 10C70 10 90 30 90 50C90 70 70 90 50 90C30 90 30 70 50 70C70 70 80 50 60 40C40 30 20 50 30 70" />
              </svg>
            </div>

            {/* Playful educational sketches (Ruler/Star) */}
            <div className="absolute bottom-6 left-6 opacity-30 pointer-events-none z-20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            {/* Text Block - Top Left */}
            <div className="space-y-3 z-10 max-w-[48%] text-left">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                Innovation & STEM Learning
              </h3>
              <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
                Empowering young minds with science, technology and creativity.
              </p>
            </div>

            {/* Floating Premium STEM Symbols (Robot, Microscope, Gears) */}
            <div className="absolute bottom-0 right-0 w-[50%] h-[85%] z-10 pointer-events-none transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 origin-bottom-right">
              <svg width="100%" height="100%" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Subtle digital coordinate/circular orbits */}
                <circle cx="110" cy="180" r="70" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />
                <path d="M 30 180 A 80 80 0 0 1 190 180" stroke="white" strokeWidth="1" strokeDasharray="5 5" opacity="0.1" fill="none" />
                
                {/* Atom Symbol orbiting on top-right */}
                <g transform="translate(145, 60)" stroke="#A7F3D0" strokeWidth="1.2" fill="none" opacity="0.4">
                  <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(30)"/>
                  <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(-30)"/>
                  <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(90)"/>
                  <circle cx="0" cy="0" r="3.5" fill="#FFF" />
                </g>

                {/* Microscope on the left side */}
                <g transform="translate(10, 110)">
                  {/* Base */}
                  <path d="M 5 60 L 30 60 L 26 54 L 9 54 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />
                  {/* Arm */}
                  <path d="M 23 54 C 23 25, 11 20, 8 25" stroke="#CBD5E1" strokeWidth="4" fill="none" strokeLinecap="round" />
                  {/* Adjuster knob */}
                  <circle cx="18" cy="36" r="3" fill="#FBBF24" stroke="#0F172A" strokeWidth="0.75" />
                  {/* Stage */}
                  <rect x="5" y="40" width="14" height="3" fill="#334155" />
                  {/* Objective turret */}
                  <rect x="2" y="16" width="8" height="18" rx="1.5" transform="rotate(-15 2 16)" fill="#94A3B8" stroke="#0F172A" strokeWidth="1" />
                  <rect x="4" y="9" width="6" height="4" transform="rotate(-15 4 9)" fill="#64748B" />
                  {/* Light source */}
                  <circle cx="11" cy="48" r="2" fill="#34D399" />
                </g>

                {/* Coding Brackets < /> top-left floating */}
                <g transform="translate(25, 45)" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                  <path d="M 6 2 L 1 7 L 6 12" />
                  <path d="M 10 14 L 14 0" />
                  <path d="M 18 2 L 23 7 L 18 12" />
                </g>

                {/* Primary Hero: Friendly Educational Robot */}
                <g transform="translate(70, 115)">
                  {/* Robot shadow */}
                  <ellipse cx="40" cy="158" rx="35" ry="7" fill="#064E3B" opacity="0.4" />

                  {/* Tracks / Tread wheels */}
                  <rect x="15" y="145" width="50" height="12" rx="6" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
                  <circle cx="23" cy="151" r="4.5" fill="#94A3B8" />
                  <circle cx="40" cy="151" r="4.5" fill="#94A3B8" />
                  <circle cx="57" cy="151" r="4.5" fill="#94A3B8" />

                  {/* Body */}
                  <rect x="18" y="85" width="44" height="60" rx="12" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1.75" />
                  {/* Screen */}
                  <rect x="24" y="93" width="32" height="24" rx="4" fill="#0F172A" />
                  {/* Heartbeat AI frequency on screen */}
                  <path d="M 28 105 L 32 105 L 34 98 L 37 112 L 39 105 L 52 105" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Neck */}
                  <rect x="36" y="77" width="8" height="8" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />

                  {/* Head */}
                  <rect x="22" y="47" width="36" height="30" rx="8" fill="#F1F5F9" stroke="#0F172A" strokeWidth="1.75" />
                  {/* Eyes (Minty Glowing) */}
                  <circle cx="31" cy="62" r="4" fill="#38BDF8" />
                  <circle cx="31" cy="62" r="1.5" fill="white" />
                  <circle cx="49" cy="62" r="4" fill="#38BDF8" />
                  <circle cx="49" cy="62" r="1.5" fill="white" />
                  {/* Antenna */}
                  <line x1="40" y1="47" x2="40" y2="35" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="40" cy="34" r="3.5" fill="#EF4444" className="animate-pulse" />

                  {/* Arms */}
                  {/* Left Arm waving */}
                  <path d="M 18 100 C 0 95, -6 75, -2 68" stroke="#E2E8F0" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  <path d="M 18 100 C 0 95, -6 75, -2 68" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <circle cx="-2" cy="68" r="4.5" fill="#FBBF24" stroke="#0F172A" strokeWidth="1" />
                  
                  {/* Right Arm down */}
                  <path d="M 62 100 C 75 105, 80 115, 78 125" stroke="#E2E8F0" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  <path d="M 62 100 C 75 105, 80 115, 78 125" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <circle cx="78" cy="125" r="4.5" fill="#FBBF24" stroke="#0F172A" strokeWidth="1" />
                </g>

                {/* Science Gears at bottom-left */}
                <g transform="translate(18, 225)">
                  <circle cx="15" cy="15" r="12" fill="none" stroke="#FBBF24" strokeWidth="3" strokeDasharray="4 2" />
                  <circle cx="15" cy="15" r="3" fill="#FFF" />
                  <circle cx="32" cy="28" r="9" fill="none" stroke="#A7F3D0" strokeWidth="2.5" strokeDasharray="3 2" />
                  <circle cx="32" cy="28" r="2" fill="#FFF" />
                </g>

                {/* Floating Science Sparkles & Brain lines */}
                <g stroke="white" strokeWidth="1" opacity="0.25">
                  <path d="M 150 180 Q 165 190 180 185" fill="none" />
                  <path d="M 160 220 L 165 215 M 165 215 H 160 M 165 215 V 220" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </motion.div>

          {/* CARD 3 (Blue Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden bg-[#67ACE6] rounded-[32px] p-8 min-h-[480px] flex flex-col justify-between group shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Blue Doodle Loops decoration */}
            <div className="absolute top-6 right-6 opacity-40 pointer-events-none z-0">
              <svg width="90" height="70" viewBox="0 0 120 80" fill="none" stroke="#2980B9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 40C30 35 50 15 70 20M10 40C25 45 40 45 55 35M10 40C20 50 35 55 50 45" />
                <path d="M110 40C90 35 70 15 50 20M110 40C95 45 80 45 65 35M110 40C100 50 85 55 70 45" />
              </svg>
            </div>

            {/* Hand drawn sketch element (Paper Plane) */}
            <div className="absolute bottom-6 left-6 opacity-40 pointer-events-none z-20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </div>

            {/* Text Block - Top Left */}
            <div className="space-y-3 z-10 max-w-[48%] text-left">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                Excellence Beyond Classrooms
              </h3>
              <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
                Encouraging leadership, sportsmanship and global learning experiences.
              </p>
            </div>

            {/* Floating Premium Academic Symbols (Trophy, Cap, Globe, Stars) */}
            <div className="absolute bottom-0 right-0 w-[50%] h-[85%] z-10 pointer-events-none transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 origin-bottom-right">
              <svg width="100%" height="100%" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Soft background globe grid */}
                <g opacity="0.15" stroke="white" strokeWidth="1" fill="none">
                  <circle cx="110" cy="180" r="65"/>
                  <line x1="110" y1="115" x2="110" y2="245"/>
                  <line x1="45" y1="180" x2="175" y2="180"/>
                  <path d="M 60 180 Q 110 130 160 180"/>
                  <path d="M 60 180 Q 110 230 160 180"/>
                </g>

                {/* Graduation Cap floating at top left */}
                <g transform="translate(10, 45)">
                  {/* Cap shadow */}
                  <path d="M 12 25 Q 25 32 38 25 L 38 31 Q 25 38 12 31 Z" fill="#1E3A8A" opacity="0.3" />
                  {/* Cap skull base */}
                  <path d="M 12 25 Q 25 32 38 25 L 38 31 Q 25 38 12 31 Z" fill="#1E293B" stroke="#FFF" strokeWidth="0.75" />
                  {/* Diamond board */}
                  <polygon points="25 10 50 18 25 26 0 18" fill="#334155" stroke="#FFF" strokeWidth="1" />
                  <polygon points="25 11 47 18 25 25 3 18" fill="#475569" />
                  {/* Button */}
                  <circle cx="25" cy="18" r="1.5" fill="#FBBF24" />
                  {/* Tassel */}
                  <path d="M 25 18 C 18 22, 10 24, 7 28" stroke="#D97706" strokeWidth="1" fill="none" />
                  <rect x="5" y="27" width="4" height="6" fill="#FBBF24" rx="0.5" />
                </g>

                {/* Globe on bottom-right */}
                <g transform="translate(115, 195)">
                  {/* Stand shadow */}
                  <ellipse cx="25" cy="65" rx="14" ry="4" fill="#1E3A8A" opacity="0.2" />
                  {/* Base & semi-meridian */}
                  <ellipse cx="25" cy="64" rx="12" ry="3" fill="#64748B" />
                  <path d="M 25 64 L 25 46" stroke="#64748B" strokeWidth="2.5" />
                  <path d="M 25 46 C 3 46, 3 8, 25 8" stroke="#94A3B8" strokeWidth="2" fill="none" />
                  
                  {/* Earth sphere */}
                  <circle cx="25" cy="27" r="18" fill="#2563EB" stroke="#FFF" strokeWidth="1" />
                  {/* Continents (Stylized white/mint maps) */}
                  <path d="M 15 22 C 15 17, 21 14, 26 17 C 29 19, 31 17, 34 22 C 34 27, 29 30, 23 27 Z" fill="#10B981" />
                  <path d="M 17 32 C 19 30, 23 30, 26 34 C 30 38, 34 32, 38 35" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>

                {/* Big Achievement Medal on bottom-left */}
                <g transform="translate(15, 205)">
                  {/* Ribbons */}
                  <polygon points="12 0 6 18 14 18" fill="#EF4444" />
                  <polygon points="18 0 24 18 16 18" fill="#1E3A8A" />
                  {/* Medal gold */}
                  <circle cx="15" cy="23" r="10" fill="#D97706" stroke="#FFF" strokeWidth="0.75" />
                  <circle cx="15" cy="23" r="8" fill="#F59E0B" />
                  <circle cx="15" cy="23" r="6" fill="none" stroke="#FEF08A" strokeWidth="1" />
                  {/* Star */}
                  <polygon points="15 18 16.5 21.5 20 22 17.5 24.5 18 28 15 26 12 28 12.5 24.5 10 22 13.5 21.5" fill="#FEF08A" />
                </g>

                {/* Primary Hero: Large Golden Trophy */}
                <g transform="translate(60, 95)">
                  {/* Trophy Shadow */}
                  <ellipse cx="40" cy="124" rx="28" ry="6" fill="#1E3A8A" opacity="0.3" />

                  {/* Base black/grey marble */}
                  <rect x="22" y="112" width="36" height="12" rx="3" fill="#334155" stroke="#FFF" strokeWidth="1.2" />
                  <rect x="25" y="102" width="30" height="10" fill="#475569" stroke="#FFF" strokeWidth="1" />
                  {/* Custom mini laurel wreath/band on marble */}
                  <path d="M 32 107 Q 40 110 48 107" stroke="#FBBF24" strokeWidth="1.5" fill="none" />

                  {/* Stem */}
                  <path d="M 36 78 L 36 102 L 44 102 L 44 78 Z" fill="#D97706" />
                  <path d="M 38 78 L 38 102 L 42 102 L 42 78 Z" fill="#F59E0B" />

                  {/* Main Cup */}
                  <path d="M 18 20 C 18 64, 62 64, 62 20 Z" fill="#F59E0B" stroke="#FFF" strokeWidth="1.5" />
                  {/* Cup internal gold highlight */}
                  <path d="M 18 20 C 18 52, 40 60, 40 20 Z" fill="#D97706" opacity="0.25" />
                  {/* Cup top lid/lip */}
                  <ellipse cx="40" cy="20" rx="22" ry="6" fill="#FEF08A" stroke="#FFF" strokeWidth="1" />
                  <ellipse cx="40" cy="18" rx="16" ry="4" fill="#F59E0B" />

                  {/* Left Handle */}
                  <path d="M 18 28 C 6 28, 4 50, 19 50" stroke="#FEF08A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  <path d="M 18 28 C 6 28, 4 50, 19 50" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  
                  {/* Right Handle */}
                  <path d="M 62 28 C 74 28, 76 50, 61 50" stroke="#FEF08A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  <path d="M 62 28 C 74 28, 76 50, 61 50" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                  {/* Big Glowing Star on Trophy Cup */}
                  <g transform="translate(40, 38)">
                    <polygon points="0 -10 3 -3 10 -2 5 3 6 10 0 6 -6 10 -5 3 -10 -2 -3 -3" fill="#FFF" className="animate-pulse" />
                  </g>
                </g>

                {/* Floating Success Sparkles & Rising Arrows */}
                <g stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                  {/* Star sparkle at bottom center */}
                  <path d="M 75 250 L 80 245 M 80 245 H 75 M 80 245 V 250" />
                  <circle cx="170" cy="110" r="2.5" fill="white" />
                  {/* Rising success arrow */}
                  <path d="M 160 140 L 170 130 M 170 130 H 164 M 170 130 V 136" stroke="#A5F3FC" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
