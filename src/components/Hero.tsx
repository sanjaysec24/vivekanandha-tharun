import React, { useState } from 'react';
import { motion } from 'motion/react';
import { IllustrationDefs } from './TamilIllustrations';

interface HeroProps {
  onOpenAdmissions: () => void;
}

export default function Hero({ onOpenAdmissions }: HeroProps) {
  // Click-to-animate state triggers
  const [balloonTrigger, setBalloonTrigger] = useState(0);
  const [ballTrigger, setBallTrigger] = useState(0);
  const [airplaneTrigger, setAirplaneTrigger] = useState(0);
  const [rocketTrigger, setRocketTrigger] = useState(0);
  const [boatTrigger, setBoatTrigger] = useState(0);
  const [kiteTrigger, setKiteTrigger] = useState(0);
  const [pencilTrigger, setPencilTrigger] = useState(0);
  const [rainbowTrigger, setRainbowTrigger] = useState(0);
  const [targetTrigger, setTargetTrigger] = useState(0);
  const [backpackTrigger, setBackpackTrigger] = useState(0);
  const [starTrigger, setStarTrigger] = useState(0);

  // Helper to render the BOY frame
  const renderBoyFrame = (isMobile = false) => (
    <div className={`relative ${isMobile ? 'w-[130px] h-[165px] sm:w-[160px] sm:h-[200px]' : 'w-[250px] h-[310px] sm:w-[280px] sm:h-[340px]'} flex items-end justify-center`}>
      {/* Organic green shape backdrop */}
      <div className={`absolute bottom-0 inset-x-0 ${isMobile ? 'h-[125px] sm:h-[155px] rounded-t-[50px] rounded-br-[50px]' : 'h-[230px] sm:h-[260px] rounded-t-[100px] rounded-br-[100px]'} rounded-bl-none bg-[#5BB35A]`} />
      
      {/* White dashed/stitch border inside */}
      <div className={`absolute ${isMobile ? 'bottom-[2px] left-[2px] right-[2px] h-[121px] sm:h-[151px] rounded-t-[48px] rounded-br-[48px]' : 'bottom-[4px] left-[4px] right-[4px] h-[222px] sm:h-[252px] rounded-t-[96px] rounded-br-[96px]'} rounded-bl-none border-[1.5px] sm:border-2 border-dashed border-white/60 pointer-events-none`} />
      
      {/* Boy emerging waist-up */}
      <div className={`absolute bottom-0 w-full ${isMobile ? 'h-[185px] sm:h-[225px]' : 'h-[360px] sm:h-[410px]'} overflow-visible pointer-events-none flex items-end justify-center`}>
        <div className="relative w-full h-full flex items-end justify-center">
          <img 
            src="/images/school_boy.png" 
            alt="Vivekanandha School Boy" 
            className="h-full w-auto object-contain z-10 select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Target & Dart overlay */}
      <motion.div 
        animate={targetTrigger > 0 ? { scale: [1, 1.15, 1], rotate: [0, -15, 15, 0] } : {}}
        transition={{ duration: 0.6 }}
        onClick={(e) => {
          e.stopPropagation();
          setTargetTrigger(p => p + 1);
        }}
        className={`absolute ${isMobile ? 'bottom-[10%] -left-3 w-10 h-10 sm:w-12 sm:h-12' : 'bottom-[18%] -left-8 w-[85px] h-[85px]'} z-20 cursor-pointer drop-shadow-md`}
      >
        <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="45" cy="45" r="32" fill="#3A2318" />
          <circle cx="45" cy="45" r="30" fill="#3498DB" stroke="white" strokeWidth="3" />
          <circle cx="45" cy="45" r="20" fill="white" />
          <circle cx="45" cy="45" r="10" fill="#3498DB" />
          <line x1="12" y1="78" x2="45" y2="45" stroke="#E67E22" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 82L4 86L10 88L14 84L8 82Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
          <path d="M12 78L10 74L4 76L8 82L12 78Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
          <polygon points="41,45 45,41 47,47" fill="#BDC3C7" stroke="#3A2318" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );

  // Helper to render the GIRL frame
  const renderGirlFrame = (isMobile = false) => (
    <div className={`relative ${isMobile ? 'w-[130px] h-[165px] sm:w-[160px] sm:h-[200px]' : 'w-[250px] h-[310px] sm:w-[280px] sm:h-[340px]'} flex items-end justify-center`}>
      {/* Organic yellow shape backdrop */}
      <div className={`absolute bottom-0 inset-x-0 ${isMobile ? 'h-[125px] sm:h-[155px] rounded-t-[50px] rounded-bl-[50px]' : 'h-[230px] sm:h-[260px] rounded-t-[100px] rounded-bl-[100px]'} rounded-br-none bg-[#F7CE22]`} />
      
      {/* White dashed/stitch border inside */}
      <div className={`absolute ${isMobile ? 'bottom-[2px] left-[2px] right-[2px] h-[121px] sm:h-[151px] rounded-t-[48px] rounded-bl-[48px]' : 'bottom-[4px] left-[4px] right-[4px] h-[222px] sm:h-[252px] rounded-t-[96px] rounded-bl-[96px]'} rounded-br-none border-[1.5px] sm:border-2 border-dashed border-white/60 pointer-events-none`} />
      
      {/* Girl emerging waist-up */}
      <div className={`absolute bottom-0 w-full ${isMobile ? 'h-[185px] sm:h-[225px]' : 'h-[360px] sm:h-[410px]'} overflow-visible pointer-events-none flex items-end justify-center`}>
        <div className="relative w-full h-full flex items-end justify-center">
          <img 
            src="/images/school_girl.png" 
            alt="Vivekanandha School Girl" 
            className="h-full w-auto object-contain z-10 select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Cozy Red Backpack overlay */}
      <motion.div 
        animate={backpackTrigger > 0 ? { scale: [1, 1.15, 1], y: [0, -10, 0] } : {}}
        transition={{ duration: 0.6 }}
        onClick={(e) => {
          e.stopPropagation();
          setBackpackTrigger(p => p + 1);
        }}
        className={`absolute ${isMobile ? 'bottom-[10%] -right-2 w-10 h-10 sm:w-11 sm:h-11' : 'bottom-[18%] -right-6 w-[70px] h-[70px]'} z-20 cursor-pointer drop-shadow-md`}
      >
        <svg viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="18" y="22" width="38" height="42" rx="14" fill="#E74C3C" stroke="#3A2318" strokeWidth="2.5" />
          <path d="M30 22V14C30 14 32 10 37 10C42 10 44 14 44 14V22" stroke="#3A2318" strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="23" y="42" width="28" height="18" rx="6" fill="#C0392B" stroke="#3A2318" strokeWidth="1.5" />
          <path d="M23 45H51" stroke="#3A2318" strokeWidth="1.5" />
          <circle cx="37" cy="45" r="2.5" fill="#EAB308" />
          <rect x="12" y="35" width="6" height="15" rx="2" fill="#C0392B" stroke="#3A2318" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );

  return (
    <section 
      id="hero-section" 
      className="relative bg-[#F4F0EA] min-h-[780px] lg:h-[820px] flex items-center px-4 sm:px-8 md:px-12 py-12 lg:py-4 overflow-hidden select-none box-border"
    >
      <IllustrationDefs />
      
      {/* ================= PLAYFUL DECORATIVE DOODLES ================= */}
      
      {/* Upper-Left: Playful Hot Air Balloon */}
      <motion.div 
        animate={balloonTrigger > 0 
          ? { y: [0, -35, 0], rotate: [0, -5, 5, 0] } 
          : { y: [0, -8, 0] }
        }
        transition={balloonTrigger > 0 
          ? { duration: 1.2, ease: "easeInOut" } 
          : { repeat: Infinity, repeatType: "mirror", duration: 4, ease: "easeInOut" }
        }
        onClick={() => setBalloonTrigger(p => p + 1)}
        className="absolute top-[8%] left-[4%] sm:left-[8%] lg:left-[10%] xl:left-[14%] z-20 cursor-pointer select-none"
      >
        <svg width="55" height="75" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          <path d="M30 5C17.29 5 7 15.29 7 28C7 38.64 13.56 44.52 19.33 49.64C21.43 51.5 23.57 53.4 24.5 56H35.5C36.43 53.4 38.57 51.5 40.67 49.64C46.44 44.52 53 38.64 53 28C53 15.29 42.71 5 30 5Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="2.5" />
          <path d="M30 5C24 5 17 15 17 28C17 38 21.5 44.5 24.5 56" stroke="white" strokeWidth="3.5" fill="none" />
          <path d="M30 5C36 5 43 15 43 28C43 38 38.5 44.5 35.5 56" stroke="white" strokeWidth="3.5" fill="none" />
          <line x1="22" y1="56" x2="24" y2="66" stroke="#3A2318" strokeWidth="2" />
          <line x1="38" y1="56" x2="36" y2="66" stroke="#3A2318" strokeWidth="2" />
          <rect x="23" y="66" width="14" height="8" rx="1.5" fill="#EAB308" stroke="#3A2318" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Upper-Right: Playful Sparkly Tennis Ball */}
      <motion.div 
        animate={ballTrigger > 0 
          ? { scale: [1, 1.2, 1], rotate: [12, 372, 12] } 
          : { y: [0, -6, 0] }
        }
        transition={ballTrigger > 0 
          ? { duration: 0.8, ease: "easeOut" } 
          : { repeat: Infinity, repeatType: "mirror", duration: 3.2, ease: "easeInOut" }
        }
        onClick={() => setBallTrigger(p => p + 1)}
        className="absolute top-[8%] right-[4%] sm:right-[8%] lg:right-[10%] xl:right-[14%] z-20 cursor-pointer select-none"
      >
        <svg width="55" height="55" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <line x1="52" y1="18" x2="62" y2="10" stroke="#FF8A3D" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="28" x2="66" y2="28" stroke="#FF8A3D" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="12" x2="52" y2="4" stroke="#FF8A3D" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="40" r="20" fill="#A4D826" stroke="#3A2318" strokeWidth="2.5" />
          <path d="M14 27C21 30 21 44 14 53" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M46 27C39 30 39 44 46 53" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      {/* Upper-Right Center: Paper Airplane */}
      <motion.div 
        animate={airplaneTrigger > 0 
          ? { x: [0, 80, -120, 0], y: [0, -40, -10, 0], rotate: [0, -15, 10, 0] } 
          : { y: [0, -5, 0], x: [0, 5, 0] }
        }
        transition={airplaneTrigger > 0 
          ? { duration: 1.8, ease: "easeInOut" } 
          : { repeat: Infinity, repeatType: "mirror", duration: 5, ease: "easeInOut" }
        }
        onClick={() => setAirplaneTrigger(p => p + 1)}
        className="absolute top-[15%] right-[25%] lg:right-[28%] z-20 cursor-pointer select-none hidden sm:block"
      >
        <div className="relative">
          <svg width="45" height="35" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-12 drop-shadow-sm">
            <path d="M5 20L45 5L30 35L22 25L5 20Z" fill="#F5F5F5" stroke="#3A2318" strokeWidth="2" strokeLinejoin="round" />
            <path d="M45 5L22 25L18 35L22 25" fill="#E5E5E5" stroke="#3A2318" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <svg className="absolute top-6 -left-12 w-12 h-6 overflow-visible" viewBox="0 0 50 20" fill="none">
            <path d="M0 15 C 15 15, 30 10, 45 5" stroke="#3A2318" strokeWidth="1.5" strokeDasharray="3,3" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </motion.div>

      {/* Upper-Left Center: Rainbow + Clouds */}
      <motion.div 
        animate={rainbowTrigger > 0 
          ? { scale: [1, 1.12, 1], rotate: [0, -5, 5, 0] } 
          : { y: [0, -4, 0] }
        }
        transition={rainbowTrigger > 0 
          ? { duration: 0.8 } 
          : { repeat: Infinity, repeatType: "mirror", duration: 6, ease: "easeInOut" }
        }
        onClick={() => setRainbowTrigger(p => p + 1)}
        className="absolute top-[15%] left-[25%] lg:left-[28%] z-20 cursor-pointer select-none hidden sm:block"
      >
        <svg width="55" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <path d="M 12 30 A 18 18 0 0 1 48 30" stroke="#FF4D4D" strokeWidth="3.5" fill="none" />
          <path d="M 16 30 A 14 14 0 0 1 44 30" stroke="#FF9F43" strokeWidth="3.5" fill="none" />
          <path d="M 20 30 A 10 10 0 0 1 40 30" stroke="#4CD137" strokeWidth="3.5" fill="none" />
          <path d="M 24 30 A 6 6 0 0 1 36 30" stroke="#00A8FF" strokeWidth="3.5" fill="none" />
          <circle cx="12" cy="30" r="6" fill="white" stroke="#3A2318" strokeWidth="1.5" />
          <circle cx="16" cy="32" r="5" fill="white" stroke="#3A2318" strokeWidth="1.5" />
          <circle cx="48" cy="30" r="6" fill="white" stroke="#3A2318" strokeWidth="1.5" />
          <circle cx="44" cy="32" r="5" fill="white" stroke="#3A2318" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Middle-Right: Space Rocket */}
      <motion.div 
        animate={rocketTrigger > 0 
          ? { y: [0, -70, 0], x: [0, 15, 0], rotate: [0, 15, 0] } 
          : { y: [0, -6, 0] }
        }
        transition={rocketTrigger > 0 
          ? { duration: 1.4, ease: "easeInOut" } 
          : { repeat: Infinity, repeatType: "mirror", duration: 3.5, ease: "easeInOut" }
        }
        onClick={() => setRocketTrigger(p => p + 1)}
        className="absolute top-[48%] right-[2%] sm:right-[4%] lg:right-[15%] z-20 cursor-pointer select-none"
      >
        <svg width="45" height="55" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-12 drop-shadow-sm">
          <path d="M20 45 L25 58 L30 45 Z" fill="#FF8A3D" />
          <path d="M22 45 L25 52 L28 45 Z" fill="#FFC048" />
          <path d="M25 5 C15 15 15 45 15 45 L35 45 C35 45 35 15 25 5 Z" fill="#F1F2F6" stroke="#3A2318" strokeWidth="2" />
          <path d="M25 5 C21 15 21 45 21 45" stroke="#3A2318" strokeWidth="1.5" fill="none" />
          <path d="M15 35 L5 45 L15 45 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="2" strokeLinejoin="round" />
          <path d="M35 35 L45 45 L35 45 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="25" cy="22" r="5" fill="#3498DB" stroke="#3A2318" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Middle-Left: Childhood Kite */}
      <motion.div 
        animate={kiteTrigger > 0 
          ? { rotate: [15, -15, 15, 15], y: [0, -15, 0] } 
          : { rotate: [15, 5, 15], y: [0, -5, 0] }
        }
        transition={kiteTrigger > 0 
          ? { duration: 1.0 } 
          : { repeat: Infinity, repeatType: "mirror", duration: 4.5, ease: "easeInOut" }
        }
        onClick={() => setKiteTrigger(p => p + 1)}
        className="absolute top-[48%] left-[2%] sm:left-[4%] lg:left-[15%] z-20 cursor-pointer select-none"
      >
        <div className="relative">
          <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
            <path d="M25 2 L45 22 L25 42 L5 22 Z" fill="#FED7AA" stroke="#3A2318" strokeWidth="2" />
            <line x1="25" y1="2" x2="25" y2="42" stroke="#3A2318" strokeWidth="1.5" />
            <line x1="5" y1="22" x2="45" y2="22" stroke="#3A2318" strokeWidth="1.5" />
            <path d="M5 22 Q25 10 45 22" stroke="#3A2318" strokeWidth="1.5" fill="none" />
            <path d="M25 42 L20 48 L30 48 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
          </svg>
          <svg className="absolute top-11 left-4 w-6 h-8 overflow-visible" viewBox="0 0 20 30" fill="none">
            <path d="M8 0 Q18 10, 2 20 T15 30" stroke="#3A2318" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
          </svg>
        </div>
      </motion.div>

      {/* Bottom-Left: Paper Origami Boat */}
      <motion.div 
        animate={boatTrigger > 0 
          ? { rotate: [0, -20, 20, 0], scale: [1, 1.15, 1] } 
          : { rotate: [-3, 3, -3], y: [0, 2, 0] }
        }
        transition={boatTrigger > 0 
          ? { duration: 1.2 } 
          : { repeat: Infinity, repeatType: "mirror", duration: 4.8, ease: "easeInOut" }
        }
        onClick={() => setBoatTrigger(p => p + 1)}
        className="absolute bottom-[6%] left-[4%] sm:left-[10%] lg:left-[18%] z-20 cursor-pointer select-none hidden sm:block"
      >
        <svg width="50" height="30" viewBox="0 0 60 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <path d="M 5 25 L 18 32 L 42 32 L 55 25 L 30 15 Z" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 30 5 L 30 15 L 45 15 Z" fill="#E5E5E5" stroke="#3A2318" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 30 5 L 15 15 L 30 15 Z" fill="#F5F5F5" stroke="#3A2318" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 2 33 Q 15 31, 30 33 T 58 33" stroke="#3498DB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      {/* Near boy: Pencil doodle */}
      <motion.div 
        animate={pencilTrigger > 0 
          ? { rotate: [0, 360], scale: [1, 1.3, 1] } 
          : { rotate: [5, -5, 5], y: [0, -3, 0] }
        }
        transition={pencilTrigger > 0 
          ? { duration: 0.8 } 
          : { repeat: Infinity, repeatType: "mirror", duration: 3.8 }
        }
        onClick={() => setPencilTrigger(p => p + 1)}
        className="absolute bottom-[35%] left-[20%] lg:left-[23%] z-20 cursor-pointer select-none hidden md:block"
      >
        <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-45">
          <rect x="12" y="5" width="8" height="25" rx="1.5" fill="#F1C40F" stroke="#3A2318" strokeWidth="1.5" />
          <polygon points="12,30 20,30 16,36" fill="#F5D2B8" stroke="#3A2318" strokeWidth="1.5" />
          <polygon points="15,34 17,34 16,36" fill="#1C2833" />
          <rect x="12" y="5" width="8" height="4" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
          <line x1="16" y1="9" x2="16" y2="30" stroke="#3A2318" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Twinkling Star */}
      <motion.div 
        animate={starTrigger > 0 
          ? { scale: [1, 1.6, 0.8, 1.2, 1] } 
          : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }
        }
        transition={starTrigger > 0 
          ? { duration: 0.8 } 
          : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
        }
        onClick={() => setStarTrigger(p => p + 1)}
        className="absolute top-[28%] left-[10%] lg:left-[21%] z-20 cursor-pointer select-none hidden sm:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 9L22 10L17 15L19 22L12 18L5 22L7 15L2 10L9 9L12 2Z" fill="#F1C40F" stroke="#3A2318" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Orange Star */}
      <motion.div 
        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
        transition={{ repeat: Infinity, duration: 2.8, delay: 0.5 }}
        className="absolute top-[28%] right-[10%] lg:right-[21%] z-20 select-none hidden sm:block"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 9L22 10L17 15L19 22L12 18L5 22L7 15L2 10L9 9L12 2Z" fill="#FF8A3D" stroke="#3A2318" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Floating Music Note near girl */}
      <motion.div 
        animate={{ y: [0, -4, 0], rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 3 }}
        className="absolute bottom-[35%] right-[20%] lg:right-[23%] z-20 select-none hidden md:block cursor-pointer"
        onClick={() => setBalloonTrigger(p => p + 1)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A2318" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" fill="none" />
          <circle cx="6" cy="18" r="3" fill="#FF8A3D" />
          <circle cx="18" cy="16" r="3" fill="#FF8A3D" />
        </svg>
      </motion.div>

      {/* Red Heart floating over central column */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute top-[26%] left-[48%] -translate-x-1/2 z-20 select-none hidden lg:block cursor-pointer"
        onClick={() => setStarTrigger(p => p + 1)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#E74C3C" stroke="#3A2318" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>


      {/* ================= SYMMETRICAL THREE-COLUMN GRID ================= */}
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 h-full box-border">
        
        {/* DESKTOP LEFT COLUMN: Boy in Green Stitched Frame */}
        <div id="hero-left-column" className="hidden lg:flex lg:col-span-3 items-end justify-center h-full pb-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -6, 0]
            }}
            transition={{ 
              x: { duration: 0.9, ease: "easeOut" },
              opacity: { duration: 0.9, ease: "easeOut" },
              y: { repeat: Infinity, repeatType: "mirror", duration: 4.2, ease: "easeInOut" }
            }}
            className="relative"
          >
            {renderBoyFrame(false)}
          </motion.div>
        </div>


        {/* CENTER COLUMN: Central content with perfect layout and custom typography */}
        <div id="hero-center-column" className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-7 px-2">
          
          {/* Header & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-4 w-full"
          >
            {/* Playful bold chunky headline */}
            <h1 className="text-[34px] sm:text-[54px] md:text-[64px] lg:text-[68px] xl:text-[76px] font-bungee text-[#3B231A] leading-[1.08] tracking-tight max-w-[98%] mx-auto block uppercase">
              BUILDING <br /> AMBITIOUS MINDS
            </h1>

            {/* Handwritten cursive orange subtitle */}
            <div className="relative mt-2 inline-block">
              <span className="font-caveat text-4xl sm:text-[44px] md:text-[52px] lg:text-[56px] xl:text-[62px] font-bold text-[#FF8A3D] tracking-wide block transform -rotate-1 px-4">
                for Tomorrow's World
              </span>
              {/* Hand-drawn Underline & Strokes */}
              <svg className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-48 sm:w-64 md:w-80 h-3 overflow-visible" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M5 8C50 3 150 3 195 8" stroke="#FF8A3D" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M192 3C195 5 198 2 199 4" stroke="#FF8A3D" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M4 2C2 4 1 2 0 3" stroke="#FF8A3D" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>

          {/* Symmetrical Benefit Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs font-semibold text-[#3B231A]"
          >
            <span className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-full shadow-[0_2px_8px_rgba(59,35,26,0.03)] border border-[#3B231A]/5 text-[10px] sm:text-xs">
              <span className="text-[#5BB35A] mr-1.5 font-bold">✓</span> Safe Learning Environment
            </span>
            <span className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-full shadow-[0_2px_8px_rgba(59,35,26,0.03)] border border-[#3B231A]/5 text-[10px] sm:text-xs">
              <span className="text-[#5BB35A] mr-1.5 font-bold">✓</span> Activity Based Education
            </span>
            <span className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-full shadow-[0_2px_8px_rgba(59,35,26,0.03)] border border-[#3B231A]/5 text-[10px] sm:text-xs">
              <span className="text-[#5BB35A] mr-1.5 font-bold">✓</span> Individual Student Attention
            </span>
          </motion.div>

          {/* MOBILE ONLY: Symmetrical side-by-side children framing layout */}
          <div className="lg:hidden w-full flex items-center justify-center gap-4 sm:gap-8 py-3 box-border overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -4, 0]
              }}
              transition={{ 
                scale: { duration: 0.8, delay: 0.3 },
                opacity: { duration: 0.8, delay: 0.3 },
                y: { repeat: Infinity, repeatType: "mirror", duration: 4.0, ease: "easeInOut" }
              }}
            >
              {renderBoyFrame(true)}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -4, 0]
              }}
              transition={{ 
                scale: { duration: 0.8, delay: 0.3 },
                opacity: { duration: 0.8, delay: 0.3 },
                y: { repeat: Infinity, repeatType: "mirror", duration: 4.5, ease: "easeInOut", delay: 0.2 }
              }}
            >
              {renderGirlFrame(true)}
            </motion.div>
          </div>

          {/* Centered CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="pt-2 flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-center justify-center w-full max-w-md mx-auto"
          >
            <button
              onClick={onOpenAdmissions}
              className="w-full sm:w-auto bg-[#FF8A3D] text-white font-bold px-8 py-4 rounded-[16px] shadow-[0_4px_12px_rgba(255,138,61,0.15)] hover:bg-[#e67425] hover:shadow-[0_6px_16px_rgba(255,138,61,0.22)] transition-all duration-300 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider font-sans transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Apply Now</span>
              <span className="text-lg font-light leading-none">↗</span>
            </button>
            <button
              onClick={onOpenAdmissions}
              className="w-full sm:w-auto border-2 border-[#3B231A]/15 text-[#3B231A] bg-transparent hover:bg-[#3B231A]/5 font-bold px-8 py-4 rounded-[16px] transition-all duration-300 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider font-sans transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Book a School Visit</span>
            </button>
          </motion.div>

          {/* Center Quote/Supporting Sentence */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-[13px] sm:text-base text-[#3B231A]/85 max-w-xl mx-auto font-sans font-normal leading-relaxed px-2"
          >
            We don't just teach lessons. We inspire creativity, confidence, curiosity and character through joyful learning experiences.
          </motion.p>

        </div>


        {/* DESKTOP RIGHT COLUMN: Girl in Yellow Stitched Frame */}
        <div id="hero-right-column" className="hidden lg:flex lg:col-span-3 items-end justify-center h-full pb-4">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -6, 0]
            }}
            transition={{ 
              x: { duration: 0.9, ease: "easeOut" },
              opacity: { duration: 0.9, ease: "easeOut" },
              y: { repeat: Infinity, repeatType: "mirror", duration: 4.8, ease: "easeInOut", delay: 0.3 }
            }}
            className="relative"
          >
            {renderGirlFrame(false)}
          </motion.div>
        </div>

      </div>

    </section>
  );
}
