import React from 'react';
import { ArrowUpRight, CheckCircle2, Sun, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface PromoSectionsProps {
  onOpenAdmissions: () => void;
}

export default function PromoSections({ onOpenAdmissions }: PromoSectionsProps) {
  return (
    <section id="promo-container" className="bg-[#F5F1EB] py-16 px-6 md:px-12 space-y-24">
      
      {/* SECTION 6: Side-by-Side Promotional Cards */}
      <div id="promo-cards-row" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Yellow Promocard (60% / 7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="col-span-1 lg:col-span-7 bg-[#EAB308] rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-md group"
        >
          {/* Subtle Pencil Drawing Graphic in background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
              <path d="M50 50C100 50 150 150 200 50C250 -50 300 50 350 150" stroke="black" strokeWidth="4" />
            </svg>
          </div>

          <div className="max-w-md space-y-4 z-10 text-[#3B231A]">
            <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
              Confidence that builds a brighter future.
            </h3>
            <p className="text-sm opacity-85 leading-relaxed font-sans font-light">
              Empowering kids with the confidence to tackle advanced challenges, speak in public forums, and create a successful, fulfilling life path.
            </p>
          </div>

          {/* Child graphic / book stack peaking */}
          <div className="absolute right-0 bottom-0 w-[200px] md:w-[260px] aspect-[4/5] z-10 pointer-events-none transform translate-y-6 md:translate-y-4 translate-x-2">
            <img
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400"
              alt="Confident student at Vivekanandha School"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-tl-[64px] rounded-br-[32px] border-l-4 border-t-4 border-white shadow-xl"
            />
          </div>

          <div className="pt-8 z-10">
            <button
              onClick={onOpenAdmissions}
              className="inline-flex items-center space-x-2 bg-white text-[#3B231A] font-semibold px-6 py-3 rounded-full hover:bg-[#3B231A] hover:text-[#F5F1EB] transition-all duration-300 shadow-sm"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-4 h-4 text-[#E78F68]" />
            </button>
          </div>
        </motion.div>

        {/* Right Orange Promocard (40% / 5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="col-span-1 lg:col-span-5 bg-[#E78F68] rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-md group text-white"
        >
          {/* Floating Star icon in corner */}
          <div className="absolute top-6 right-6 text-white/30 animate-pulse">
            <Star className="w-8 h-8 fill-current" />
          </div>

          <div className="space-y-4 z-10">
            <h3 className="text-3xl font-serif font-bold leading-tight">
              Helping kids to shoot their dreams.
            </h3>
            <p className="text-sm text-white/85 leading-relaxed font-sans font-light">
              Inspiring children to aim high, achieve mastery in creative fields, and embrace positive, dynamic mindsets.
            </p>
          </div>

          {/* Large custom styled SVG windmil/pinwheel drawing */}
          <div className="absolute right-6 bottom-4 pointer-events-none opacity-20 transform group-hover:rotate-45 transition-transform duration-1000">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="50" y1="50" x2="50" y2="95" stroke="white" strokeWidth="3" />
              <path d="M50 50L25 35C25 35 30 25 45 35L50 50Z" fill="white" />
              <path d="M50 50L75 65C75 65 70 75 55 65L50 50Z" fill="white" />
              <path d="M50 50L35 75C35 75 25 70 35 55L50 50Z" fill="white" />
              <path d="M50 50L65 25C65 25 75 30 65 45L50 50Z" fill="white" />
              <circle cx="50" cy="50" r="5" fill="#EAB308" />
            </svg>
          </div>

          <div className="pt-8 z-10">
            <button
              onClick={onOpenAdmissions}
              className="inline-flex items-center space-x-2 bg-white text-[#3B231A] font-semibold px-6 py-3 rounded-full hover:bg-[#3B231A] hover:text-[#F5F1EB] transition-all duration-300 shadow-sm"
            >
              <span>Learn More</span>
              <ArrowUpRight className="w-4 h-4 text-[#E78F68]" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* SECTION 7: Two-Column "Empower Children" Section */}
      <div id="empower-section" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left details (5 cols) */}
        <div id="empower-left" className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-1.5 bg-[#4B8B77]/10 text-[#4B8B77] border border-[#4B8B77]/20 px-3.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4B8B77] inline-block"></span>
            <span>Admissions On Going</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3B231A] leading-[1.15] tracking-tight">
            Empower your kids to think, be <span className="text-[#4B8B77] italic">smarter</span> and sharper
          </h2>

          <p className="text-base text-[#3B231A]/75 font-sans font-light leading-relaxed">
            Encourage children to think critically, be exceptionally creative, and solve practical, real-world problems for a better, more harmonious future.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenAdmissions}
              className="group inline-flex items-center space-x-2 bg-[#E78F68] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#d07b53] transition-all duration-300 shadow-md"
            >
              <span>Get Educated</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Image with statistics overlay (7 cols) */}
        <div id="empower-right" className="lg:col-span-7 relative flex justify-center lg:justify-end">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Soft blue arched backdrop */}
            <div className="w-[280px] sm:w-[340px] md:w-[400px] aspect-[1/1] bg-[#5B92E5] rounded-[36px] rounded-tl-[180px] rounded-br-[180px] overflow-hidden relative shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=800"
                alt="Empowered child smiling"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Small floating decorative planet on right margin */}
            <div className="absolute -right-6 top-8 w-14 h-14 bg-gradient-to-tr from-[#4B8B77] to-emerald-400 rounded-full border-4 border-white shadow-xl flex items-center justify-center animate-bounce duration-[6000ms]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="transform rotate-12">
                <circle cx="12" cy="12" r="8" />
                <path d="M2 12C2 12 6 8 12 8C18 8 22 12 22 12" />
                <path d="M2 12C2 12 6 16 12 16C18 16 22 12 22 12" />
              </svg>
            </div>

            {/* Floating double statistics board */}
            <div 
              id="empower-stats-overlay"
              className="absolute -bottom-10 right-4 left-4 md:-left-12 md:right-auto bg-white border border-[#3B231A]/10 p-6 rounded-[28px] shadow-xl grid grid-cols-2 gap-6 divide-x divide-[#3B231A]/10 z-20 max-w-md"
            >
              {/* Stat Column 1 */}
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#4B8B77] shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#3B231A]">45M+</h4>
                  <p className="text-[10px] text-[#3B231A]/70 uppercase tracking-wider font-semibold">Scholar Hours</p>
                  <p className="text-[10px] text-[#3B231A]/50 mt-1">Logged across global community programs.</p>
                </div>
              </div>

              {/* Stat Column 2 */}
              <div className="pl-4 flex items-start space-x-3">
                <Sun className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5 animate-spin duration-[8000ms]" />
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#3B231A]">164+</h4>
                  <p className="text-[10px] text-[#3B231A]/70 uppercase tracking-wider font-semibold">Olympiad Honors</p>
                  <p className="text-[10px] text-[#3B231A]/50 mt-1">Gold distinctions in chess & sciences.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
