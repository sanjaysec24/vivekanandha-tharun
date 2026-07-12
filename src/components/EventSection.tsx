import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface EventSectionProps {
  onOpenAdmissions: () => void;
}

export default function EventSection({ onOpenAdmissions }: EventSectionProps) {
  return (
    <section id="events-banner-section" className="bg-[#F5F1EB] py-16 px-6 md:px-12">
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
          <div className="lg:col-span-5 bg-[#4B8B77] p-8 md:p-12 relative flex items-center justify-center min-h-[320px]">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M10 10C20 30 40 10 50 40C60 70 80 50 90 90" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Mother and son looking at tablet */}
            <div className="relative w-full h-full min-h-[260px] rounded-[24px] overflow-hidden border-4 border-white/25 shadow-lg z-10">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800"
                alt="Mother and child studying happily"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Right panel: Warm yellow banner background with event metadata (7 cols) */}
          <div className="lg:col-span-7 bg-[#EAB308] p-8 md:p-12 flex flex-col justify-between text-[#3B231A] relative">
            
            {/* Doodle illustration in top right */}
            <div className="absolute top-6 right-6 opacity-20 pointer-events-none hidden md:block">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                {/* Hand doodle representing knowledge streams */}
                <path d="M20 50C25 45 35 45 40 50C45 55 55 55 60 50C65 45 75 45 80 50" stroke="#3B231A" strokeWidth="3" strokeLinecap="round" />
                <path d="M20 60C25 55 35 55 40 60C45 65 55 65 60 60C65 55 75 55 80 60" stroke="#3B231A" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="30" r="8" stroke="#3B231A" strokeWidth="3" />
                <path d="M42 30H58" stroke="#3B231A" strokeWidth="2" />
              </svg>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center space-x-1.5 bg-[#3B231A]/10 border border-[#3B231A]/15 px-3.5 py-1 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E78F68] inline-block animate-ping"></span>
                <span>Upcoming Event</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight">
                  Building children one at a time
                </h3>
                <p className="text-sm md:text-base opacity-90 leading-relaxed font-sans font-light max-w-xl">
                  Coolness flows from the fountains of knowledge. Join our headmistress, guest child psychologists, and community coordinators for our bi-annual symposium on play-based development.
                </p>
              </div>

              {/* Event Schedule Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#3B231A]/10">
                <div className="flex items-center space-x-2.5">
                  <Calendar className="w-5 h-5 text-[#E78F68]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Date</p>
                    <p className="text-sm font-semibold">07 March 2026</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Clock className="w-5 h-5 text-[#E78F68]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Time</p>
                    <p className="text-sm font-semibold">09:00 AM - 12:30 PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <MapPin className="w-5 h-5 text-[#E78F68]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Location</p>
                    <p className="text-sm font-semibold">Lindenwood Pine Hall</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA row */}
            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs font-semibold opacity-70">
                *Complimentary child care & organic refreshments provided.
              </p>
              <button
                onClick={onOpenAdmissions}
                className="group flex items-center space-x-2 bg-[#3B231A] text-[#F5F1EB] font-semibold px-6 py-3 rounded-full hover:bg-[#E78F68] hover:text-white transition-all duration-300"
              >
                <span>Register Interest</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
