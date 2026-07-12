import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Layers, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Lush Green School Front Yard',
    category: 'campus',
    desc: 'Our expansive, child-safe brick campus framed by native Tamil Nadu trees and clean walkways.',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Interactive Smart Board Lesson',
    category: 'classrooms',
    desc: 'Dr. Radha guiding Grade 3 students through a visual solar orbit model on our LED smart console.',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Traditional Clay Modeling Workshop',
    category: 'activities',
    desc: 'Pre-KG toddlers developing fine muscle grip and sensory focus using organic safe clay molds.',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    title: 'Annual Day Stage Dance',
    category: 'annual day',
    desc: 'Nursery kids dressed in traditional colorful attire celebrating rainfall patterns on stage.',
    url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    title: 'District Under-11 Football Finalists',
    category: 'events',
    desc: 'Our enthusiastic school sports team lifting the regional bronze plaque after a stellar game.',
    url: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    title: 'Spacious Library & Reading Ateliers',
    category: 'campus',
    desc: 'A sun-drenched sanctuary stocked with over 5,000 bilingual books and colorful reading rugs.',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 7,
    title: 'Water Cycle Experiment Showcase',
    category: 'activities',
    desc: 'STEM hour where students observe evaporation and condensation using simple beaker systems.',
    url: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 8,
    title: 'Bilingual Recitation Stage Play',
    category: 'annual day',
    desc: 'Grade 5 students enacting Thiruvalluvar storyboards for our traditional general assemblies.',
    url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 9,
    title: 'Joyful Outdoor Sensory Play',
    category: 'classrooms',
    desc: 'LKG classes identifying physical colors and geometric leaf patterns in our sunny playground.',
    url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'campus', label: 'Campus' },
  { id: 'classrooms', label: 'Classrooms' },
  { id: 'activities', label: 'Activities' },
  { id: 'events', label: 'Events' },
  { id: 'annual day', label: 'Annual Day' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F5F1EB] min-h-screen text-[#3B231A]"
    >
      {/* Banner */}
      <div className="relative overflow-hidden bg-[#3B231A] text-[#F5F1EB] py-20 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block bg-[#E78F68]/20 border border-[#E78F68]/30 text-[#E78F68] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Visual Memories
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Our School <span className="text-[#E78F68] italic font-normal">Gallery</span>
          </h1>
          <p className="text-sm md:text-base text-[#F5F1EB]/80 max-w-2xl mx-auto font-light leading-relaxed">
            A window into the happy, vibrant moments of childhood learning, campus exploration, and traditional cultural festivals at our school.
          </p>
        </div>
      </div>

      {/* Filter Tabs and Photo Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
                filter === cat.id
                  ? 'bg-[#E78F68] text-white border-[#E78F68] shadow-sm scale-105'
                  : 'bg-white text-[#3B231A] hover:bg-[#3B231A]/5 border-[#3B231A]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] bg-white rounded-[24px] border border-[#3B231A]/10 shadow-sm overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Matte Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B231A]/90 via-[#3B231A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-[#F5F1EB] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E78F68] bg-[#E78F68]/15 px-2 py-0.5 rounded-full border border-[#E78F68]/20">
                      {item.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-white/70" />
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/70 font-light line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-[#1E1B18]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Next Image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center space-y-4"
            >
              {/* Image Frame */}
              <div className="bg-[#3B231A] p-2 rounded-[24px] border border-white/10 shadow-2xl overflow-hidden aspect-[4/3] max-h-[70vh]">
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>

              {/* Caption Card */}
              <div className="text-center text-[#F5F1EB] max-w-xl space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E78F68] font-bold">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="text-xl font-serif font-bold">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-[#F5F1EB]/70 font-sans font-light leading-relaxed">
                  {filteredItems[lightboxIndex].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
