import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, MapPin, User, Phone, GraduationCap, CheckCircle, Award } from 'lucide-react';

interface VijayadasamiSectionProps {
  onOpenAdmissions: () => void;
}

export default function VijayadasamiSection({ onOpenAdmissions }: VijayadasamiSectionProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    selectedClass: 'Pre KG',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.studentName && formData.parentName && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section 
      id="vijayadasami-section" 
      className="relative overflow-hidden bg-[#F5F1EB] py-16 px-6 md:px-12 border-b border-[#3B231A]/10"
    >
      {/* Background traditional kolam / lotus decorative patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
        {/* Giant traditional kolam lattice */}
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none" stroke="#3B231A" strokeWidth="0.5">
          <path d="M100 10 L190 100 L100 190 L10 100 Z" />
          <path d="M100 10 C130 50 130 150 100 190" />
          <path d="M100 10 C70 50 70 150 100 190" />
          <path d="M10 100 C50 130 150 130 190 100" />
          <path d="M10 100 C50 70 150 70 190 100" />
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="70" />
          <path d="M50 50 L150 150" />
          <path d="M150 50 L50 150" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: Custom Illustration (Goddess Saraswati's veena, books, lamp, lotus) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[340px] aspect-square flex items-center justify-center"
          >
            {/* Elegant glowing background halo */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-[#E78F68]/10 blur-3xl animate-pulse" />

            {/* Traditional Tamil Kolam Line Art behind the items (Subtle Breathing Animation) */}
            <motion.div 
              animate={{ 
                opacity: [0.35, 0.45, 0.35], 
                scale: [0.95, 1.02, 0.95] 
              }}
              transition={{ 
                duration: 9, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
            >
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 200 200" 
                fill="none" 
                stroke="#E78F68" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Central traditional dot and nested rings of pullis */}
                <circle cx="100" cy="100" r="2.5" fill="#E78F68" />
                
                {/* Inner pulli grid */}
                <circle cx="100" cy="70" r="1.8" fill="#E78F68" />
                <circle cx="100" cy="130" r="1.8" fill="#E78F68" />
                <circle cx="130" cy="100" r="1.8" fill="#E78F68" />
                <circle cx="70" cy="100" r="1.8" fill="#E78F68" />
                <circle cx="121" cy="79" r="1.8" fill="#E78F68" />
                <circle cx="121" cy="121" r="1.8" fill="#E78F68" />
                <circle cx="79" cy="121" r="1.8" fill="#E78F68" />
                <circle cx="79" cy="79" r="1.8" fill="#E78F68" />

                {/* Outer pullis */}
                <circle cx="100" cy="40" r="1.5" fill="#E78F68" />
                <circle cx="100" cy="160" r="1.5" fill="#E78F68" />
                <circle cx="160" cy="100" r="1.5" fill="#E78F68" />
                <circle cx="40" cy="100" r="1.5" fill="#E78F68" />
                
                {/* Traditional 8-Petal Lotus (Kamala Kolam) Symmetrical Motif */}
                {/* Cardinal Petals */}
                <path d="M 100,100 C 80,60 90,30 100,20 C 110,30 120,60 100,100 Z" />
                <path d="M 100,100 C 120,140 110,170 100,180 C 90,170 80,140 100,100 Z" />
                <path d="M 100,100 C 140,80 170,90 180,100 C 170,110 140,120 100,100 Z" />
                <path d="M 100,100 C 60,120 30,110 20,100 C 30,90 60,80 100,100 Z" />

                {/* Symmetrical Diagonal Petals */}
                <path d="M 100,100 C 118,72 138,52 156,44 C 148,62 128,82 100,100 Z" />
                <path d="M 100,100 C 128,118 148,138 156,156 C 138,148 118,128 100,100 Z" />
                <path d="M 100,100 C 82,128 62,148 44,156 C 52,138 72,118 100,100 Z" />
                <path d="M 100,100 C 72,82 52,62 44,44 C 62,52 82,72 100,100 Z" />

                {/* Inner layered accents for depth */}
                <path d="M 100,100 C 88,72 94,50 100,40 C 106,50 112,72 100,100 Z" strokeWidth="0.8" />
                <path d="M 100,100 C 112,128 106,150 100,160 C 94,150 88,128 100,100 Z" strokeWidth="0.8" />
                <path d="M 100,100 C 128,88 150,94 160,100 C 150,106 128,112 100,100 Z" strokeWidth="0.8" />
                <path d="M 100,100 C 72,112 50,106 40,100 C 50,94 72,88 100,100 Z" strokeWidth="0.8" />

                {/* Interlocking Sikku style arches / kambi running gracefully on the outside */}
                <path d="M 85,35 C 85,15 115,15 115,35" strokeWidth="1.0" />
                <path d="M 85,165 C 85,185 115,185 115,165" strokeWidth="1.0" />
                <path d="M 165,85 C 185,85 185,115 165,115" strokeWidth="1.0" />
                <path d="M 35,85 C 15,85 15,115 35,115" strokeWidth="1.0" />

                {/* Traditional corner decorative loops */}
                <path d="M 135,45 C 145,25 175,55 155,65" strokeWidth="0.8" />
                <path d="M 155,135 C 175,145 145,175 135,155" strokeWidth="0.8" />
                <path d="M 65,155 C 55,175 25,145 45,135" strokeWidth="0.8" />
                <path d="M 45,65 C 25,55 55,25 65,45" strokeWidth="0.8" />
              </svg>
            </motion.div>

            {/* Floating traditional motifs */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative w-full h-full z-10 flex items-center justify-center"
            >
              <svg width="90%" height="90%" viewBox="0 0 200 200" fill="none">
                {/* Traditional brass lamp (Kuthuvilakku) on left side */}
                <g id="kuthuvilakku" transform="translate(25, 45)">
                  {/* Base */}
                  <ellipse cx="25" cy="115" rx="20" ry="8" fill="#D97706" />
                  <ellipse cx="25" cy="113" rx="18" ry="6" fill="#F59E0B" />
                  {/* Stem */}
                  <rect x="23" y="40" width="4" height="73" fill="#D97706" />
                  <rect x="24.5" y="40" width="1" height="73" fill="#FBBF24" />
                  {/* Decorative steps */}
                  <ellipse cx="25" cy="95" rx="10" ry="4" fill="#B45309" />
                  <ellipse cx="25" cy="70" rx="9" ry="3" fill="#B45309" />
                  {/* Oil reservoir cup */}
                  <path d="M 10 40 C 10 50, 40 50, 40 40 Z" fill="#D97706" />
                  <ellipse cx="25" cy="40" rx="15" ry="5" fill="#F59E0B" />
                  {/* Flame base */}
                  <ellipse cx="25" cy="38" rx="8" ry="3" fill="#B45309" />
                  {/* Flame */}
                  <path d="M 25 15 C 21 28, 25 36, 25 36 C 25 36, 29 28, 25 15 Z" fill="#EF4444" className="animate-pulse" />
                  <path d="M 25 21 C 22.5 29, 25 35, 25 35 C 25 35, 27.5 29, 25 21 Z" fill="#F59E0B" />
                  <path d="M 25 27 C 23.5 31, 25 34, 25 34 C 25 34, 26.5 31, 25 27 Z" fill="#FEE2E2" />
                  {/* Glowing sparks */}
                  <circle cx="25" cy="12" r="1.5" fill="#FBBF24" className="animate-ping" />
                </g>

                {/* Blooming Lotus Motif at center base */}
                <g id="lotus" transform="translate(65, 120)">
                  {/* Leaves background */}
                  <path d="M 10 25 C -5 20, -10 10, -5 0 C 10 5, 25 15, 35 25 Z" fill="#15803D" opacity="0.8" />
                  <path d="M 60 25 C 75 20, 80 10, 75 0 C 60 5, 45 15, 35 25 Z" fill="#15803D" opacity="0.8" />
                  <path d="M 35 30 C 15 30, 0 20, 10 10 C 20 15, 30 25, 35 30 Z" fill="#166534" />
                  <path d="M 35 30 C 55 30, 70 20, 60 10 C 50 15, 40 25, 35 30 Z" fill="#166534" />
                  
                  {/* Lotus petals */}
                  {/* Back petals */}
                  <path d="M 35 25 C 10 10, 5 -10, 35 -25 C 65 -10, 60 10, 35 25 Z" fill="#F43F5E" />
                  <path d="M 35 25 C 20 15, 10 0, 15 -18 C 30 -10, 35 -5, 35 25 Z" fill="#FDA4AF" />
                  <path d="M 35 25 C 50 15, 60 0, 55 -18 C 40 -10, 35 -5, 35 25 Z" fill="#FDA4AF" />
                  
                  {/* Front/Center petals */}
                  <path d="M 35 25 C 22 20, 18 8, 25 -10 C 32 -18, 35 -20, 35 -20 C 35 -20, 38 -18, 45 -10 C 52 8, 48 20, 35 25 Z" fill="#E11D48" />
                  <path d="M 35 25 C 26 22, 24 15, 28 2 C 32 -6, 35 -10, 35 -10 C 35 -10, 38 -6, 42 2 C 46 15, 44 22, 35 25 Z" fill="#FDA4AF" />
                  <path d="M 35 -5 C 33 -12, 35 -15, 35 -15 C 35 -15, 37 -12, 35 -5 Z" fill="#F59E0B" />
                </g>

                {/* Goddess Saraswati's Veena */}
                <g id="veena" transform="translate(45, 15)">
                  {/* Large gourd/resonator body at bottom-right */}
                  <circle cx="85" cy="110" r="28" fill="#78350F" />
                  <circle cx="85" cy="110" r="25" fill="#92400E" />
                  {/* Inlay work on main gourd */}
                  <circle cx="85" cy="110" r="18" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="85" cy="110" r="12" fill="#B45309" />
                  <circle cx="85" cy="110" r="6" fill="#F59E0B" />

                  {/* Smaller gourd near top-left */}
                  <circle cx="25" cy="40" r="14" fill="#78350F" />
                  <circle cx="25" cy="40" r="12" fill="#92400E" />
                  <circle cx="25" cy="40" r="8" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Long neck/stem (Dandi) connecting them */}
                  <path d="M 22 36 L 81 101 L 87 95 L 28 30 Z" fill="#78350F" />
                  <path d="M 23.5 35 L 82.5 100" stroke="#F59E0B" strokeWidth="1.5" />
                  
                  {/* Decorative end (Yali / Peacock neck) */}
                  <path d="M 22 36 C 18 32, 10 32, 5 25 C 2 20, 0 14, 5 8 C 10 2, 20 5, 23 12 C 26 19, 23 25, 28 30 Z" fill="#92400E" />
                  <path d="M 7 14 C 9 10, 15 10, 18 14" stroke="#F59E0B" strokeWidth="1" />
                  
                  {/* Pegs */}
                  <circle cx="16" cy="24" r="3" fill="#D97706" />
                  <line x1="16" y1="24" x2="11" y2="28" stroke="#D97706" strokeWidth="2" />
                  
                  {/* Bridge */}
                  <rect x="80" y="103" width="8" height="6" rx="1" transform="rotate(-45 80 103)" fill="#F59E0B" />

                  {/* Frets along the neck */}
                  <line x1="33" y1="41" x2="38" y2="36" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="41" y1="50" x2="46" y2="45" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="49" y1="59" x2="54" y2="54" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="57" y1="68" x2="62" y2="63" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="65" y1="77" x2="70" y2="72" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="73" y1="86" x2="78" y2="81" stroke="#F59E0B" strokeWidth="1.5" />

                  {/* Strings */}
                  <line x1="22" y1="21" x2="82" y2="105" stroke="#FEF08A" strokeWidth="0.75" opacity="0.9" />
                  <line x1="25" y1="23" x2="84" y2="107" stroke="#FEF08A" strokeWidth="0.5" opacity="0.8" />
                </g>

                {/* Holy books stacked at bottom-left */}
                <g id="books" transform="translate(15, 125)">
                  {/* Book 3 (Bottom) */}
                  <rect x="10" y="18" width="55" height="10" rx="2" fill="#D97706" />
                  <rect x="15" y="20" width="50" height="8" rx="1" fill="#FEF08A" />
                  <line x1="10" y1="23" x2="65" y2="23" stroke="#B45309" strokeWidth="0.5" />
                  
                  {/* Book 2 (Middle) */}
                  <rect x="15" y="8" width="52" height="10" rx="2" fill="#B45309" />
                  <rect x="19" y="10" width="48" height="8" rx="1" fill="#FFFBEB" />
                  <line x1="15" y1="13" x2="67" y2="13" stroke="#78350F" strokeWidth="0.5" />
                  
                  {/* Book 1 (Top, open palm-leaf manuscript vibe) */}
                  <rect x="20" y="-1" width="46" height="9" rx="2" fill="#1E3A8A" />
                  <rect x="22" y="1" width="42" height="7" rx="1" fill="#FFFDF5" />
                  {/* Elegant "அ" Tamil letter representation inscribed in the top book */}
                  <path d="M 38 3 C 39 3, 40 4, 40 4.5 C 40 5, 39 5.5, 38 5.5 C 37 5.5, 36 5, 36 4.5 C 36 3.5, 38 2.5, 41 2.5 C 43 2.5, 44 3.5, 44 4.5 C 44 6, 42 7, 40 7.5 L 43 7.5" stroke="#1E3A8A" strokeWidth="0.75" fill="none" strokeLinecap="round" />
                </g>
              </svg>
            </motion.div>
          </motion.div>

          {/* Spiritual / Tamil Traditional Badges */}
          <div className="flex flex-col items-center text-center space-y-1 w-full max-w-[280px]">
            <p className="text-xs uppercase tracking-widest text-[#E78F68] font-bold">வித்யா ஆரம்பம்</p>
            <p className="text-[11px] text-[#3B231A]/60 italic">
              "Blessings of Goddess Saraswati for wisdom, focus, and creativity from day one."
            </p>
          </div>
        </div>

        {/* CENTER CONTENT: Structured text column */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 bg-[#E78F68]/10 text-[#E78F68] px-4.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#E78F68]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Seats Available</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E78F68]/80 block">
                Vijayadasami Admissions 2027
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3B231A] tracking-tight leading-tight">
                Vijayadasami <br />
                <span className="text-[#E78F68] italic">Admissions Open</span>
              </h2>
              <p className="text-base font-semibold text-[#3B231A]/90">
                An Auspicious Beginning for a Lifetime of Learning
              </p>
            </div>

            <p className="text-sm text-[#3B231A]/75 leading-relaxed font-sans font-light">
              On the auspicious occasion of Vijayadasami, Vivekanandha School warmly welcomes young learners to start their educational journey in an atmosphere of knowledge, values and culture. Begin your child's learning journey with blessings, wisdom and tradition.
            </p>

            <div className="pt-2 grid grid-cols-1 gap-3 text-xs font-medium text-[#3B231A]/85">
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">✓</div>
                <span>Special Vijayadasami Akshara Abhyasam rituals</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">✓</div>
                <span>Guided learning focusing on creativity & curiosity</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">✓</div>
                <span>Dedicated, highly supportive elementary guides</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Premium Admission Form Card */}
        <div className="lg:col-span-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[380px] bg-white rounded-[28px] p-7 md:p-8 shadow-[0_10px_35px_-5px_rgba(59,35,26,0.07)] border border-[#3B231A]/5 relative overflow-hidden"
          >
            {/* Soft decorative accent on card */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E78F68]/5 rounded-bl-full pointer-events-none" />

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-[#3B231A] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#E78F68]" />
                    Apply for Admission
                  </h3>
                  <p className="text-xs text-[#3B231A]/60 font-light">
                    Submit your child's inquiry for immediate processing.
                  </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  {/* Student Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#3B231A]/75 block">
                      Student Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#3B231A]/40" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Adhithya Kumar"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full text-sm bg-[#F5F1EB]/40 border border-[#3B231A]/10 rounded-xl py-3 pl-10 pr-4 text-[#3B231A] placeholder-[#3B231A]/35 focus:outline-none focus:ring-1 focus:ring-[#E78F68] focus:border-[#E78F68] transition-all"
                      />
                    </div>
                  </div>

                  {/* Parent Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#3B231A]/75 block">
                      Parent / Guardian Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#3B231A]/40" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sanjay Kumar"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full text-sm bg-[#F5F1EB]/40 border border-[#3B231A]/10 rounded-xl py-3 pl-10 pr-4 text-[#3B231A] placeholder-[#3B231A]/35 focus:outline-none focus:ring-1 focus:ring-[#E78F68] focus:border-[#E78F68] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#3B231A]/75 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#3B231A]/40" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-sm bg-[#F5F1EB]/40 border border-[#3B231A]/10 rounded-xl py-3 pl-10 pr-4 text-[#3B231A] placeholder-[#3B231A]/35 focus:outline-none focus:ring-1 focus:ring-[#E78F68] focus:border-[#E78F68] transition-all"
                      />
                    </div>
                  </div>

                  {/* Class Selection Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#3B231A]/75 block">
                      Class / Grade
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#3B231A]/40" />
                      <select
                        value={formData.selectedClass}
                        onChange={(e) => setFormData({ ...formData, selectedClass: e.target.value })}
                        className="w-full text-sm bg-[#F5F1EB]/40 border border-[#3B231A]/10 rounded-xl py-3 pl-10 pr-4 text-[#3B231A] focus:outline-none focus:ring-1 focus:ring-[#E78F68] focus:border-[#E78F68] transition-all appearance-none cursor-pointer"
                      >
                        <option value="Pre KG">Pre KG</option>
                        <option value="LKG">LKG</option>
                        <option value="UKG">UKG</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                      </select>
                      <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#3B231A]/50">▼</span>
                    </div>
                  </div>
                </div>

                {/* Buttons block */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#E78F68] hover:bg-[#d07b53] text-white font-semibold py-3.5 rounded-xl text-sm shadow-md transition-all duration-300 transform active:scale-95"
                  >
                    Apply Now
                  </button>
                  <button
                    type="button"
                    onClick={onOpenAdmissions}
                    className="w-full border border-[#3B231A]/15 text-[#3B231A] hover:bg-[#3B231A]/5 font-semibold py-3 rounded-xl text-sm transition-all"
                  >
                    Book Campus Visit
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-5"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-[#3B231A]">Admission Registered!</h3>
                  <p className="text-sm text-[#3B231A]/85 leading-relaxed">
                    Thank you, <strong className="font-semibold">{formData.parentName}</strong>. We have registered your child <strong className="font-semibold">{formData.studentName}</strong>'s admissions inquiry for <strong className="font-semibold">{formData.selectedClass}</strong>.
                  </p>
                  <p className="text-xs text-[#3B231A]/60">
                    Our educational representative will reach out to you within 24 hours at <strong className="font-semibold">{formData.phone}</strong> with next steps and prospectus info.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ studentName: '', parentName: '', phone: '', selectedClass: 'Pre KG' });
                  }}
                  className="mt-2 text-xs font-semibold text-[#E78F68] hover:underline"
                >
                  Submit Another Application
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
