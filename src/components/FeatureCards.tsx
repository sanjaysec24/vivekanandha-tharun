import React from 'react';
import { ArrowUpRight, Cloud, RefreshCw, Zap } from 'lucide-react';
import { features } from '../data';
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
          {features.map((card, index) => {
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative overflow-hidden ${card.bgColor} rounded-[32px] p-8 min-h-[480px] flex flex-col justify-between group shadow-md hover:shadow-lg transition-all duration-300`}
              >
                
                {/* Custom Overlay Hand-drawn Doodles */}
                <div className="absolute top-6 right-6 pointer-events-none opacity-25">
                  {card.sketchType === 'cloud' && (
                    <svg width="80" height="60" viewBox="0 0 100 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 40C15 40 10 35 10 30C10 25 15 20 20 20C22 15 28 10 35 10C45 10 50 15 52 20C55 15 62 15 65 20C75 20 80 25 80 30C80 35 75 40 70 40H20Z" />
                      <circle cx="30" cy="50" r="1.5" fill="white"/>
                      <circle cx="50" cy="52" r="1.5" fill="white"/>
                    </svg>
                  )}
                  {card.sketchType === 'loop' && (
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M10 50C10 30 30 10 50 10C70 10 90 30 90 50C90 70 70 90 50 90C30 90 30 70 50 70C70 70 80 50 60 40C40 30 20 50 30 70" />
                    </svg>
                  )}
                  {card.sketchType === 'wings' && (
                    <svg width="90" height="70" viewBox="0 0 120 80" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 40C30 35 50 15 70 20M10 40C25 45 40 45 55 35M10 40C20 50 35 55 50 45" />
                      <path d="M110 40C90 35 70 15 50 20M110 40C95 45 80 45 65 35M110 40C100 50 85 55 70 45" />
                    </svg>
                  )}
                </div>

                {/* Text Block - Top */}
                <div className="space-y-3 z-10">
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/85 font-light leading-relaxed max-w-xs">
                    {card.tagline}
                  </p>
                </div>

                {/* Floating Vector Basketball indicator on Orange Card */}
                {card.sketchType === 'cloud' && (
                  <div className="absolute bottom-4 left-4 z-20 bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 animate-spin duration-[20000ms]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M6.2 6.2C8.5 8.5 8.5 15.5 6.2 17.8" />
                      <path d="M17.8 6.2C15.5 8.5 15.5 15.5 17.8 17.8" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <line x1="12" y1="2" x2="12" y2="22" />
                    </svg>
                  </div>
                )}

                {/* Image Block - Bottom */}
                <div className="mt-8 relative self-center w-full max-w-[240px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-lg border-4 border-white/25 transform group-hover:scale-[1.03] transition-all duration-500">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
