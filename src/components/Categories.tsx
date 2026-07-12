import React from 'react';
import { categoryCards } from '../data';
import { motion } from 'motion/react';

export default function Categories() {
  return (
    <section id="categories-section" className="bg-[#F5F1EB] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12 text-center">
        
        {/* Header Title */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#3B231A]/65">We focus on one impactful lesson at a time</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3B231A] tracking-tight">
            Shaping the <span className="text-[#E78F68] italic">future</span> of kids
          </h2>
          <div className="w-16 h-1 bg-[#E78F68] mx-auto rounded-full mt-2"></div>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {categoryCards.map((card, index) => {
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center space-y-5"
              >
                {/* Rounded colorful background frame for portrait */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
                  
                  {/* Colorful backdrop blob shape */}
                  <div 
                    className="absolute inset-2 rounded-full transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundColor: card.color, opacity: 0.85 }}
                  />
                  
                  {/* Styled Outer organic border */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#3B231A]/10" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
                  </svg>

                  {/* Child Portrait Image */}
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-md z-10">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  {/* Mini decorative accent like a yellow sun or red heart */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-[#EAB308] text-white p-1 rounded-full shadow-lg z-20 animate-bounce duration-[3000ms]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    </div>
                  )}

                  {index === 3 && (
                    <div className="absolute top-3 right-3 bg-[#E78F68] text-white p-1 rounded-full shadow-lg z-20">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="animate-pulse">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                  )}

                </div>

                {/* Portrait Label Texts */}
                <div className="space-y-1 z-10">
                  <h4 className="text-base md:text-lg font-serif font-bold text-[#3B231A] tracking-tight group-hover:text-[#E78F68] transition-colors duration-200">
                    {card.title}
                  </h4>
                  <p className="text-xs text-[#3B231A]/60 font-medium">
                    {card.grade}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
