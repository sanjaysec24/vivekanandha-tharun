import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenAdmissions: () => void;
}

interface CutoutImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackRGB: [number, number, number];
  tolerance?: number;
  feather?: number;
}

// Custom transparent background removal component
function CutoutImage({ src, alt, className, fallbackRGB, tolerance = 95, feather = 20 }: CutoutImageProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      if (!active) return;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      // Dynamic sampling of top-left background color
      let sumR = 0, sumG = 0, sumB = 0, count = 0;
      const sampleSize = 10;
      const startX = Math.min(10, canvas.width - sampleSize);
      const startY = Math.min(10, canvas.height - sampleSize);
      
      for (let y = startY; y < startY + sampleSize; y++) {
        for (let x = startX; x < startX + sampleSize; x++) {
          const idx = (y * canvas.width + x) * 4;
          sumR += data[idx];
          sumG += data[idx + 1];
          sumB += data[idx + 2];
          count++;
        }
      }
      
      let tr = sumR / count;
      let tg = sumG / count;
      let tb = sumB / count;
      
      // Fallback check
      if (tr === 0 && tg === 0 && tb === 0) {
        [tr, tg, tb] = fallbackRGB;
      }
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const dist = Math.sqrt(
          (r - tr) ** 2 +
          (g - tg) ** 2 +
          (b - tb) ** 2
        );
        
        if (dist < tolerance) {
          data[i + 3] = 0;
        } else if (dist < tolerance + feather) {
          const ratio = (dist - tolerance) / feather;
          data[i + 3] = Math.min(data[i + 3], Math.floor(ratio * 255));
        }
      }
      
      ctx.putImageData(imgData, 0, 0);
      try {
        setDataUrl(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error("CORS / canvas read error, using original src", err);
        setDataUrl(src);
      }
    };
    img.onerror = () => {
      if (active) {
        setDataUrl(src);
      }
    };
    return () => {
      active = false;
    };
  }, [src, fallbackRGB, tolerance, feather]);

  if (!dataUrl) {
    return <div className={`animate-pulse bg-transparent ${className}`} />;
  }

  return (
    <img
      src={dataUrl}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}

export default function Hero({ onOpenAdmissions }: HeroProps) {
  return (
    <section 
      id="hero-section" 
      className="relative bg-[#F4F0EA] min-h-[720px] lg:h-[760px] flex items-center px-6 md:px-12 py-10 overflow-hidden select-none"
    >
      
      {/* ================= FLOATING DECORATIONS ================= */}
      
      {/* Upper-Left: Playful Hot Air Balloon */}
      <div className="absolute top-[12%] left-[6%] sm:left-[12%] lg:left-[14%] xl:left-[18%] z-20 pointer-events-none animate-bounce duration-[5000ms]">
        <svg width="55" height="75" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          {/* Red Balloon Envelope */}
          <path d="M30 5C17.29 5 7 15.29 7 28C7 38.64 13.56 44.52 19.33 49.64C21.43 51.5 23.57 53.4 24.5 56H35.5C36.43 53.4 38.57 51.5 40.67 49.64C46.44 44.52 53 38.64 53 28C53 15.29 42.71 5 30 5Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="2.5" />
          {/* Vertical white stripes */}
          <path d="M30 5C24 5 17 15 17 28C17 38 21.5 44.5 24.5 56" stroke="white" strokeWidth="3.5" fill="none" />
          <path d="M30 5C36 5 43 15 43 28C43 38 38.5 44.5 35.5 56" stroke="white" strokeWidth="3.5" fill="none" />
          {/* Basket connectors */}
          <line x1="22" y1="56" x2="24" y2="66" stroke="#3A2318" strokeWidth="2" />
          <line x1="38" y1="56" x2="36" y2="66" stroke="#3A2318" strokeWidth="2" />
          {/* Basket */}
          <rect x="23" y="66" width="14" height="8" rx="1.5" fill="#EAB308" stroke="#3A2318" strokeWidth="2" />
        </svg>
      </div>

      {/* Upper-Right: Playful Sparkly Tennis Ball */}
      <div className="absolute top-[12%] right-[6%] sm:right-[12%] lg:right-[14%] xl:right-[18%] z-20 pointer-events-none animate-bounce duration-[4500ms]">
        <svg width="65" height="65" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-12 drop-shadow-sm">
          {/* Orange sparkles */}
          <line x1="52" y1="18" x2="62" y2="10" stroke="#FF8A3D" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="28" x2="66" y2="28" stroke="#FF8A3D" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="12" x2="52" y2="4" stroke="#FF8A3D" strokeWidth="3" strokeLinecap="round" />
          {/* Lime ball body */}
          <circle cx="30" cy="40" r="20" fill="#A4D826" stroke="#3A2318" strokeWidth="2.5" />
          {/* Seams */}
          <path d="M14 27C21 30 21 44 14 53" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M46 27C39 30 39 44 46 53" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>


      {/* ================= SYMMETRICAL THREE-COLUMN GRID ================= */}
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 h-full">
        
        {/* LEFT COLUMN: Child with Green Leaf Backdrop & Target */}
        <div id="hero-left-column" className="hidden lg:flex lg:col-span-3 items-end justify-center h-full pb-4">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            {/* Custom organic shape backdrop with flat bottom */}
            <div className="relative w-[280px] h-[340px] flex items-end justify-center">
              {/* Organic green shape backdrop - no outline, no gradient */}
              <div className="absolute bottom-0 inset-x-0 h-[260px] bg-[#5BB35A] rounded-t-[100px] rounded-br-[100px] rounded-bl-none" />
              {/* True transparent PNG cutout child */}
              <CutoutImage
                src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=500"
                alt="Cheerful boy standing wearing bright green clothing"
                fallbackRGB={[242, 206, 52]}
                tolerance={95}
                feather={20}
                className="relative z-10 w-[240px] h-[310px] object-contain object-bottom select-none mb-1"
              />

              {/* Floating Target & Dart overlay */}
              <div className="absolute bottom-[20%] -left-8 z-20 pointer-events-none transform -rotate-12 animate-pulse">
                <svg width="85" height="85" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="45" cy="45" r="32" fill="#3A2318" />
                  <circle cx="45" cy="45" r="30" fill="#3498DB" stroke="white" strokeWidth="3" />
                  <circle cx="45" cy="45" r="20" fill="white" />
                  <circle cx="45" cy="45" r="10" fill="#3498DB" />
                  <line x1="12" y1="78" x2="45" y2="45" stroke="#E67E22" strokeWidth="3" strokeLinecap="round" />
                  <path d="M8 82L4 86L10 88L14 84L8 82Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
                  <path d="M12 78L10 74L4 76L8 82L12 78Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
                  <polygon points="41,45 45,41 47,47" fill="#BDC3C7" stroke="#3A2318" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>


        {/* CENTER COLUMN: Perfectly Centered Content Hub */}
        <div id="hero-center-column" className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center text-center space-y-6 md:space-y-7 px-4">
          
          {/* Headline - Occupies ~55% and uses elegant Playfair Display styling */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 w-full"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-bold text-[#3A2318] leading-[1.12] tracking-tight max-w-[90%] mx-auto">
              Putting your child’s <span className="italic font-normal">Future</span> <br className="hidden sm:inline" /> in great motion
            </h1>
          </motion.div>

          {/* Three Trust Indicators in a horizontal row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs font-semibold text-[#3A2318]"
          >
            <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-[#3A2318]/5">
              <span className="text-[#5CB35C] mr-1.5 font-bold">✓</span> No Credit Card
            </span>
            <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-[#3A2318]/5">
              <span className="text-[#5CB35C] mr-1.5 font-bold">✓</span> 14 Days Trial
            </span>
            <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-[#3A2318]/5">
              <span className="text-[#5CB35C] mr-1.5 font-bold">✓</span> Free For Teachers
            </span>
          </motion.div>

          {/* Centered Matte Orange CTA button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-2"
          >
            <button
              onClick={onOpenAdmissions}
              className="bg-[#FF8A3D] text-white font-bold px-10 py-4.5 rounded-[16px] shadow-sm hover:bg-[#e67425] transition-all duration-300 flex items-center space-x-2 text-sm uppercase tracking-wider font-sans transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Learning</span>
              <span className="text-lg font-light">↗</span>
            </button>
          </motion.div>

          {/* Center Quote/Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-[#3A2318]/90 max-w-md mx-auto font-sans font-medium leading-relaxed"
          >
            We just don't give our students only lecture but real life experiences.
          </motion.p>

          {/* Educational hand-drawn doodle illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full pt-1"
          >
            <svg width="220" height="135" viewBox="0 0 220 135" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              {/* Laptop Screen Frame */}
              <rect x="55" y="35" width="90" height="60" rx="10" stroke="#3A2318" strokeWidth="2.5" fill="white" />
              {/* Keyboard Bottom Base */}
              <path d="M45 95C45 95 48 105 58 105H142C152 105 155 95 155 95" stroke="#3A2318" strokeWidth="2.5" fill="#F4F0EA" />
              <line x1="50" y1="95" x2="150" y2="95" stroke="#3A2318" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Cute eye logo on screen */}
              <path d="M80 65C80 65 90 55 100 55C110 55 120 65 120 65C120 65 110 75 100 75C90 75 80 65 80 65Z" stroke="#3A2318" strokeWidth="2" fill="white" />
              <circle cx="100" cy="65" r="5" fill="#3A2318" />
              <circle cx="102" cy="63" r="1.5" fill="white" />

              {/* Blue accent line below eye */}
              <path d="M65 82H135" stroke="#5B92E5" strokeWidth="2.5" strokeLinecap="round" />

              {/* Foliage/Leaves on right side */}
              <path d="M145 85C155 75 160 62 158 48C156 34 168 26 174 38C179 51 170 65 165 74" stroke="#3A2318" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Hand-drawn leaf blobs */}
              <path d="M158 48C164 46 170 49 168 55C166 61 160 58 158 48Z" fill="#5B92E5" stroke="#3A2318" strokeWidth="1.5" />
              <path d="M152 63C158 63 162 67 159 72C156 77 152 73 152 63Z" fill="#5B92E5" stroke="#3A2318" strokeWidth="1.5" />
              <path d="M162 36C168 32 174 35 172 42C170 49 164 44 162 36Z" fill="#5B92E5" stroke="#3A2318" strokeWidth="1.5" />
              
              {/* Little Flower on top left */}
              <path d="M50 32C48 27 52 24 55 27C58 24 62 27 60 32C62 37 58 40 55 37C52 40 48 37 50 32Z" fill="#EAB308" stroke="#3A2318" strokeWidth="1.5" />
              <circle cx="55" cy="32" r="2" fill="#E78F68" />
              <path d="M55 37C54 41 51 46 53 50" stroke="#3A2318" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Orange drop petal */}
              <path d="M135 24C140 20 145 23 143 28C141 33 137 30 135 24Z" fill="#E78F68" stroke="#3A2318" strokeWidth="1.5" />
              
              {/* Spark lines */}
              <path d="M40 60L34 62" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
              <path d="M42 54L37 52" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

        </div>


        {/* RIGHT COLUMN: Child with Yellow Leaf Backdrop & Backpack */}
        <div id="hero-right-column" className="hidden lg:flex lg:col-span-3 items-end justify-center h-full pb-4">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            {/* Custom organic shape backdrop with flat bottom */}
            <div className="relative w-[280px] h-[340px] flex items-end justify-center">
              {/* Organic yellow shape backdrop - no outlines, no gradients */}
              <div className="absolute bottom-0 inset-x-0 h-[260px] bg-[#F7CE22] rounded-t-[100px] rounded-bl-[100px] rounded-br-none" />
              {/* True transparent PNG cutout child */}
              <CutoutImage
                src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=500"
                alt="Cheerful girl standing wearing warm orange/brown clothing"
                fallbackRGB={[245, 245, 245]}
                tolerance={65}
                feather={20}
                className="relative z-10 w-[240px] h-[310px] object-contain object-bottom select-none mb-1"
              />

              {/* Floating Cozy Red Backpack overlay */}
              <div className="absolute bottom-[20%] -right-6 z-20 pointer-events-none transform rotate-12 animate-pulse">
                <svg width="70" height="70" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                  <rect x="18" y="22" width="38" height="42" rx="14" fill="#E74C3C" stroke="#3A2318" strokeWidth="2.5" />
                  <path d="M30 22V14C30 14 32 10 37 10C42 10 44 14 44 14V22" stroke="#3A2318" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <rect x="23" y="42" width="28" height="18" rx="6" fill="#C0392B" stroke="#3A2318" strokeWidth="1.5" />
                  <path d="M23 45H51" stroke="#3A2318" strokeWidth="1.5" />
                  <circle cx="37" cy="45" r="2.5" fill="#EAB308" />
                  <rect x="12" y="35" width="6" height="15" rx="2" fill="#C0392B" stroke="#3A2318" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
