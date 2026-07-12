import React from 'react';
import { Compass, Users, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function StatsBar() {
  return (
    <section id="stats-section" className="relative px-6 md:px-12 bg-[#F5F1EB] pb-16">
      <div 
        id="stats-inner-container"
        className="max-w-7xl mx-auto bg-[#3B231A] rounded-[36px] rounded-tr-[120px] md:rounded-tr-[160px] p-8 md:p-14 text-[#F5F1EB] relative overflow-hidden shadow-2xl"
      >
        {/* Floating Paper Airplane Illustration */}
        <div className="absolute top-4 right-12 md:right-20 animate-pulse pointer-events-none opacity-80">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-12">
            <path d="M22 2L11 13" stroke="#F5F1EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#5B92E5" stroke="#F5F1EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#F5F1EB]/15 relative z-10">
          
          {/* Metric 1 */}
          <div className="flex flex-col space-y-4 md:px-6 pt-6 md:pt-0 first:pt-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-[#E78F68]/20 rounded-2xl flex items-center justify-center text-[#E78F68]">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">50+</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Elite Faculty Members</h3>
              <p className="text-sm text-[#F5F1EB]/70 font-light leading-relaxed">
                Our guides hold advanced Montessori certifications and degrees in childhood cognitive development.
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col space-y-4 md:px-8 pt-8 md:pt-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-[#EAB308]/20 rounded-2xl flex items-center justify-center text-[#EAB308]">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">12K+</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Students Thriving Globally</h3>
              <p className="text-sm text-[#F5F1EB]/70 font-light leading-relaxed">
                Nurtured with customized curricula that adapt to their unique mental rhythms and pacing.
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col space-y-4 md:px-8 pt-8 md:pt-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-[#5B92E5]/20 rounded-2xl flex items-center justify-center text-[#5B92E5]">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">70+</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Creative Ateliers & Labs</h3>
              <p className="text-sm text-[#F5F1EB]/70 font-light leading-relaxed">
                Equipped with rich natural resources, scientific microscopes, and woodshop ateliers.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
