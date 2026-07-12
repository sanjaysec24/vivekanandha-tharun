import React from 'react';
import { Compass, Users, Sparkles, Heart } from 'lucide-react';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#F5F1EB]/15 relative z-10">
          
          {/* Metric 1 */}
          <div className="flex flex-col space-y-4 md:px-4 pt-6 sm:pt-0 first:pt-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-[#EAB308]/20 rounded-2xl flex items-center justify-center text-[#EAB308]">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">1500+</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Happy Students</h3>
              <p className="text-sm text-[#F5F1EB]/70 font-light leading-relaxed">
                Empowered to discover their strengths, build resilience, and unlock their full creative potential.
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col space-y-4 sm:px-6 pt-6 sm:pt-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-[#E78F68]/20 rounded-2xl flex items-center justify-center text-[#E78F68]">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">50+</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Qualified Teachers</h3>
              <p className="text-sm text-[#F5F1EB]/70 font-light leading-relaxed">
                Caring and highly trained educators dedicated to guiding each child's natural academic cycle.
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col space-y-4 sm:px-6 pt-6 sm:pt-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-[#5B92E5]/20 rounded-2xl flex items-center justify-center text-[#5B92E5]">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">20+</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Years of Excellence</h3>
              <p className="text-sm text-[#F5F1EB]/70 font-light leading-relaxed">
                Nurturing young minds and building strong educational pillars across the region since day one.
              </p>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col space-y-4 sm:px-6 pt-6 sm:pt-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">100%</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Student Care</h3>
              <p className="text-sm text-[#F5F1EB]/70 font-light leading-relaxed">
                Creating safe, friendly, and fully supportive environments for learning and personal growth.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
