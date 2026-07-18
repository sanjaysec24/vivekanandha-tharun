import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Award, Shield, Users, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F5F1EB] min-h-screen text-[#3B231A]"
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-[#3B231A] text-[#F5F1EB] py-20 px-6 md:px-12 text-center">
        {/* Subtle background Kolam line art decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10 80 Q 50 20 90 80" stroke="white" strokeWidth="1" fill="none" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-block bg-[#E78F68]/20 border border-[#E78F68]/30 text-[#E78F68] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Our Legacy
          </span>
          <h1 className="text-4xl md:text-[52px] font-serif font-bold tracking-tight">
            Nurturing Hearts & <span className="text-[#E78F68] italic font-normal">Empowering Minds</span>
          </h1>
          <p className="text-base md:text-[18px] text-[#F5F1EB]/80 max-w-2xl mx-auto font-light leading-relaxed font-sans">
            Founded with a vision to blend ancient Tamil cultural wisdom with modern future-ready education, Vivekanandha School stands as a beacon of academic excellence and character.
          </p>
        </div>
      </div>

      {/* School History Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-0.5 w-8 bg-[#E78F68]"></span>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#E78F68]">Rooted in Tradition</span>
            </div>
            <h2 className="text-3xl md:text-[52px] font-serif font-bold tracking-tight leading-tight">
              Our Glorious Journey Since 1998
            </h2>
            <p className="text-base md:text-[18px] text-[#3B231A]/80 leading-relaxed font-sans font-light">
              Vivekanandha School was established in the year 1998 in Tamil Nadu with a humble count of just 45 pupils. Inspired by the profound teachings of Swami Vivekananda, our founders envisioned an institution where education goes beyond rote learning to foster "life-building, man-making, and character-making assimilation of ideas."
            </p>
            <p className="text-base md:text-[18px] text-[#3B231A]/80 leading-relaxed font-sans font-light">
              Over nearly three decades, we have evolved into a premiere private academy, serving over 2,500 thriving alumni. By seamlessly introducing modern smart classrooms, comprehensive STEM curricula, and international-standard physical play, we prepare children for the complex global stage while grounding them deeply in Tamil culture, mutual respect, and discipline.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-[#E78F68]/10 p-5 rounded-2xl border border-[#E78F68]/20">
                <div className="text-3xl font-serif font-bold text-[#E78F68]">25+</div>
                <div className="text-xs font-medium text-[#3B231A]/70 uppercase tracking-wider mt-1">Years of Academic Glory</div>
              </div>
              <div className="bg-[#198C52]/10 p-5 rounded-2xl border border-[#198C52]/20">
                <div className="text-3xl font-serif font-bold text-[#198C52]">100%</div>
                <div className="text-xs font-medium text-[#3B231A]/70 uppercase tracking-wider mt-1">Holistic Development</div>
              </div>
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
