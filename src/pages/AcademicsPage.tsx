import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Cpu, Compass, Laptop, Award, Layers, Sparkles, BookOpen, CircleDot, PlayCircle, Globe, Activity, Wifi, Volume2, Maximize2, Play, PenTool, RotateCcw, Pencil, Book, Star, Puzzle, GraduationCap } from 'lucide-react';

const CLASS_DETAILS = [
  {
    grade: 'Pre KG',
    title: 'Sensory Explorers & Early Wonder',
    ageGroup: '2.5 to 3.5 Years',
    color: '#86EFAC', // Soft Green
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    description: 'A completely joyful, play-based immersion that focuses on muscle grip, language sounds, and initial social confidence.',
    milestones: [
      'Basic letter & phonetic sound recognition',
      'Tactile work with sand boards & sorting beads',
      'Fine and gross motor coordination through games',
      'Joyful circle play, rhymes & structured storytelling'
    ],
  },
  {
    grade: 'LKG',
    title: 'Foundational Tracing & Speech Mastery',
    ageGroup: '3.5 to 4.5 Years',
    color: '#FED7AA', // Soft Orange
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200',
    description: 'Fosters formal letter identification, neat numeric tracing, tactile object counting, and cooperative social interactions.',
    milestones: [
      'Alphabet tracing and full sound-spelling',
      'Primary number writing (1 to 50)',
      'Identification of global colors, shapes, and birds',
      'Cooperative clay modeling & group singing'
    ],
  },
  {
    grade: 'UKG',
    title: 'Confident Speakers & Math Builders',
    ageGroup: '4.5 to 5.5 Years',
    color: '#FDE047', // Soft Yellow
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    description: 'Prepares kids for primary standards by consolidating reading phonics, introductory math operations, and regional geography.',
    milestones: [
      'Simple sentence writing and phonetic reading',
      'Basic addition & subtraction using bead bars',
      'Basic environmental science (water cycle, plants)',
      'Bi-lingual recitation (Tamil & English)'
    ],
  },
  {
    grade: 'Grade 1',
    title: 'Creative Writers & Logical Inquirers',
    ageGroup: '5.5 to 6.5 Years',
    color: '#93C5FD', // Soft Blue
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
    description: 'Enters the exciting world of structured textbooks, sentence grammar, mental calculations, and introductory computers.',
    milestones: [
      'Spelling mechanics & creative paragraph writing',
      'Double digit arithmetic, mental calculation drills',
      'Living things vs non-living things classification',
      'Structured physical sports and track play'
    ],
  },
  {
    grade: 'Grade 2',
    title: 'Critical Thinkers & Young Historians',
    ageGroup: '6.5 to 7.5 Years',
    color: '#C084FC', // Soft Purple
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200',
    description: 'Develops advanced narrative skills, multi-digit counting, natural science wonders, and digital spelling puzzles.',
    milestones: [
      'Reading multi-paragraph books with fluid rhythm',
      'Multiplication tables (1-10) and fractions',
      'Community helper studies & global history maps',
      'Smart classroom interactive quizzes'
    ],
  },
  {
    grade: 'Grade 3',
    title: 'Science Explorers & Creative Artists',
    ageGroup: '7.5 to 8.5 Years',
    color: '#F472B6', // Soft Pink
    textColor: 'text-pink-800',
    borderColor: 'border-pink-200',
    description: 'Enhances independent analytical research, basic geometry, state history, and structured computer keyboard typing.',
    milestones: [
      'Independent reading comprehension & poetry',
      'Introduction to standard division & basic geometry',
      'Human sensory systems and environmental cycles',
      'Keyboard typing practice & MS Paint operations'
    ],
  },
  {
    grade: 'Grade 4',
    title: 'Active Thinkers & Smart Creators',
    ageGroup: '8.5 to 9.5 Years',
    color: '#99F6E4', // Soft Teal
    textColor: 'text-teal-800',
    borderColor: 'border-teal-200',
    description: 'Encourages collaborative team assignments, real-life problem solving, regional literature, and visual presentation skills.',
    milestones: [
      'Comprehensive essays and Tamil poetry writing',
      'Complex division, measurement unit conversions',
      'Earth systems: oceans, continents, and weather patterns',
      'Introductory scratch block programming blocks'
    ],
  },
  {
    grade: 'Grade 5',
    title: 'Future Leaders & Innovators',
    ageGroup: '9.5 to 10.5 Years',
    color: '#FCA5A5', // Soft Red
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    description: 'Our final primary standard focuses on preparing students for advanced secondary modules, logic, science labs, and social poise.',
    milestones: [
      'Analytical book reports & dramatic speech writing',
      'Percentages, basic decimals, introductory variables',
      'Basic plant/animal cells & physics of energy forces',
      'Weekly student-led general assemblies & group projects'
    ],
  }
];

export default function AcademicsPage() {
  const [selectedClass, setSelectedClass] = useState(CLASS_DETAILS[0]);

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
            Learning Experience
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Academic Programs & <span className="text-[#E78F68] italic font-normal">Methodologies</span>
          </h1>
          <p className="text-sm md:text-base text-[#F5F1EB]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Delivering structured primary frameworks focused on creative concept mastery, hands-on physical tool training, and high interactive digital support.
          </p>
        </div>
      </div>

      {/* Interactive Class Explorer Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-20 space-y-10 sm:space-y-12 overflow-hidden"
      >
        {/* Background Details - Subtle Floating Educational Symbols (< 4% opacity) */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.035]">
          <div className="absolute top-10 left-8 transform -rotate-12">
            <Pencil className="w-16 h-16 text-[#3B231A]" />
          </div>
          <div className="absolute top-1/4 right-12 transform rotate-12">
            <Book className="w-20 h-20 text-[#3B231A]" />
          </div>
          <div className="absolute bottom-20 left-16 transform rotate-45">
            <Star className="w-16 h-16 text-[#3B231A]" />
          </div>
          <div className="absolute bottom-10 right-20 transform -rotate-15">
            <Puzzle className="w-20 h-20 text-[#3B231A]" />
          </div>
          <div className="absolute top-1/2 left-1/3 transform -rotate-6">
            <GraduationCap className="w-24 h-24 text-[#3B231A]" />
          </div>
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex space-x-12 text-3xl font-serif font-black text-[#3B231A]">
            <span>A</span><span>B</span><span>C</span>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(#3B231A_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 text-center space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest text-[#E78F68] font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre KG to Grade 5</span>
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#3B231A]"
          >
            Explore Our Classes
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base text-[#3B231A]/70 max-w-lg mx-auto font-sans font-light leading-relaxed"
          >
            Each grade is custom-crafted to align with childhood developmental stages, ensuring appropriate cognitive expansion.
          </motion.p>
        </div>

        {/* Grade Navigation - Segmented Control */}
        <div className="relative z-10 flex justify-center max-w-5xl mx-auto px-2">
          <div className="inline-flex flex-wrap sm:flex-nowrap justify-center p-1.5 bg-[#3B231A]/[0.06] border border-[#3B231A]/10 rounded-2xl sm:rounded-full shadow-inner relative max-w-full gap-1">
            {CLASS_DETAILS.map((c) => {
              const isSelected = selectedClass.grade === c.grade;
              return (
                <motion.button
                  key={c.grade}
                  onClick={() => setSelectedClass(c)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer select-none flex items-center justify-center ${
                    isSelected
                      ? 'text-[#F5F1EB] font-bold'
                      : 'text-[#3B231A]/80 hover:text-[#3B231A] hover:bg-white/40'
                  }`}
                >
                  {/* Active Segmented Pill Background */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeGradePill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-[#3B231A] rounded-xl sm:rounded-full shadow-md shadow-[#3B231A]/25 scale-[1.02]"
                    />
                  )}

                  {/* Button Text & Active Underline Indicator */}
                  <span className="relative z-10 flex items-center space-x-1.5">
                    <span>{c.grade}</span>
                    {isSelected && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#E78F68] inline-block ml-0.5"
                      />
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Grade Detail Card (Apple Product Showcase Style) */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="bg-white rounded-[32px] sm:rounded-[36px] border border-[#3B231A]/10 shadow-[0_10px_35px_-10px_rgba(59,35,26,0.06)] hover:shadow-[0_25px_60px_-15px_rgba(59,35,26,0.12)] hover:border-[#3B231A]/20 transition-all duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)] overflow-hidden grid grid-cols-1 md:grid-cols-12"
          >
            {/* Left Panel: Soft Gradient, Subtle Texture, Shimmer & Corner Filigree */}
            <div 
              className="relative md:col-span-4 p-8 sm:p-10 md:p-12 flex flex-col justify-between text-[#3B231A] overflow-hidden transition-colors duration-500"
              style={{ 
                backgroundColor: selectedClass.color,
                backgroundImage: `radial-gradient(circle at 10% 20%, rgba(255,255,255,0.45) 0%, transparent 60%), linear-gradient(135deg, ${selectedClass.color} 0%, ${selectedClass.color}DF 100%)` 
              }}
            >
              {/* Subtle Dot Grid Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#3B231A_1px,transparent_1px)] [background-size:12px_12px]" />

              {/* Animated Vertical Shimmer Light Line */}
              <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-6 w-0.5 h-32 bg-gradient-to-b from-transparent via-white/60 to-transparent pointer-events-none"
              />

              {/* Tiny Decorative Corner Accents */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#3B231A]/20 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#3B231A]/20 rounded-bl-lg pointer-events-none" />

              {/* Top Section: Age Badge & Animated Grade Title */}
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center space-x-1.5 bg-white/50 backdrop-blur-md border border-white/60 text-[#3B231A] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm mb-6"
                >
                  <Sparkles className="w-3 h-3 text-[#E78F68]" />
                  <span>{selectedClass.ageGroup}</span>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.h3
                    key={selectedClass.grade}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    className="text-5xl sm:text-6xl font-serif font-extrabold tracking-tighter leading-none mt-1 text-[#3B231A]"
                  >
                    {selectedClass.grade}
                  </motion.h3>
                </AnimatePresence>
              </div>

              {/* Bottom Section: Curriculum Focus Title */}
              <div className="relative z-10 mt-10 md:mt-12">
                <span className="text-[11px] uppercase font-mono font-bold tracking-widest block opacity-70 text-[#3B231A]">
                  Curriculum Focus
                </span>
                
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedClass.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    className="font-serif font-bold text-lg sm:text-xl mt-1.5 text-[#3B231A] leading-snug"
                  >
                    {selectedClass.title}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Panel: Core Content Area */}
            <div className="md:col-span-8 p-8 sm:p-10 md:p-12 space-y-8 flex flex-col justify-between bg-white relative">
              {/* Overview Section */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E78F68] font-mono flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </h4>
                
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedClass.description}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    className="text-sm sm:text-base text-[#3B231A]/85 leading-relaxed font-light"
                  >
                    {selectedClass.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Learning Milestones Section */}
              <div className="space-y-4">
                <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#198C52] font-mono flex items-center space-x-1.5">
                  <GraduationCap className="w-4 h-4 text-[#198C52]" />
                  <span>Learning Milestones</span>
                </h4>

                <AnimatePresence mode="wait">
                  <motion.ul
                    key={selectedClass.grade}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.04,
                        }
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                  >
                    {selectedClass.milestones.map((m, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] } }
                        }}
                        className="group/item flex items-start text-xs sm:text-sm text-[#3B231A]/90 bg-[#F5F1EB]/50 hover:bg-[#F5F1EB] p-2.5 rounded-xl border border-[#3B231A]/5 transition-colors duration-200"
                      >
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className="mr-2.5 shrink-0 mt-0.5 p-0.5 rounded-full bg-[#198C52]/10 text-[#198C52]"
                        >
                          <CircleDot className="w-3.5 h-3.5" />
                        </motion.div>
                        <span className="font-sans leading-normal group-hover/item:text-[#3B231A] transition-colors">
                          {m}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              {/* Bottom Information Bar */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedClass.grade + "-footer"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                  className="border-t border-[#3B231A]/10 pt-6 flex flex-wrap items-center justify-between text-xs font-mono text-[#3B231A]/70 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#E78F68]" />
                    <span className="font-semibold text-[#3B231A]">Primary Division</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#198C52]" />
                    <span>Individual Assessment Framework Included</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Teaching Methodology Section */}
      <div className="bg-[#EAE4D9] py-20 border-y border-[#3B231A]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-0.5 w-8 bg-[#E78F68]"></span>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#E78F68]">Aarohan Framework</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Our Advanced Teaching Methodology
            </h2>
            <p className="text-sm md:text-base text-[#3B231A]/80 leading-relaxed font-light">
              We operate on the <strong>Aarohan Joyful Learning</strong> model. This multi-sensory pedagogical system blends tactile physical tools with spatial smart-boards to ensure learning is never abstract.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#3B231A]/10">
                  <span className="text-[#E78F68] font-bold text-sm">A</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm">Activity & Play-Based Setup</h4>
                  <p className="text-xs text-[#3B231A]/70 mt-0.5">Kids learn decimal place values, phonics, and logic via blocks, clay, and puzzles.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#3B231A]/10">
                  <span className="text-[#E78F68] font-bold text-sm">B</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm">Bilingual Flawlessness</h4>
                  <p className="text-xs text-[#3B231A]/70 mt-0.5">Dual fluency in spoken English articulation and deep literary Tamil heritage.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#3B231A]/10">
                  <span className="text-[#E78F68] font-bold text-sm">C</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm">Continuous Mind Assessment</h4>
                  <p className="text-xs text-[#3B231A]/70 mt-0.5">No stressful quarterly exams; we monitor development daily through joyful tasks.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#3B231A]/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#3B231A]/5 pb-4">
                <h3 className="text-lg font-serif font-bold text-[#3B231A] flex items-center">
                  <Layers className="w-5 h-5 text-[#E78F68] mr-2" />
                  Tactile Materials Used In Lab
                </h3>
                <span className="text-xs font-mono bg-[#E78F68]/10 text-[#E78F68] px-3 py-1 rounded-full uppercase">Montessori standard</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F5F1EB] p-4.5 rounded-2xl border border-[#3B231A]/5">
                  <h4 className="text-xs font-mono font-bold text-[#3B231A]/50 uppercase">Phonetic Board</h4>
                  <p className="text-xs text-[#3B231A]/80 mt-1 leading-relaxed">
                    Sandpaper characters that children trace with their index fingers, cementing phonetic recognition through motor memory.
                  </p>
                </div>
                <div className="bg-[#F5F1EB] p-4.5 rounded-2xl border border-[#3B231A]/5">
                  <h4 className="text-xs font-mono font-bold text-[#3B231A]/50 uppercase">Decimal Bead Chains</h4>
                  <p className="text-xs text-[#3B231A]/80 mt-1 leading-relaxed">
                    Colored wire beads that allow students to physically feel tens, hundreds, and thousands—making math operations natural.
                  </p>
                </div>
                <div className="bg-[#F5F1EB] p-4.5 rounded-2xl border border-[#3B231A]/5">
                  <h4 className="text-xs font-mono font-bold text-[#3B231A]/50 uppercase">Geographical Wooden Puzzles</h4>
                  <p className="text-xs text-[#3B231A]/80 mt-1 leading-relaxed">
                    Self-correcting map puzzles representing Indian states and global continents to visually stimulate spatial layout memory.
                  </p>
                </div>
                <div className="bg-[#F5F1EB] p-4.5 rounded-2xl border border-[#3B231A]/5">
                  <h4 className="text-xs font-mono font-bold text-[#3B231A]/50 uppercase">Botanical Botany Cards</h4>
                  <p className="text-xs text-[#3B231A]/80 mt-1 leading-relaxed">
                    Beautiful local leaf charts matching actual school garden crops, encouraging hands-on soil planting and biology interest.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Smart Classroom Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Premium 3D Interactive Smart Board Showcase */}
        <div className="relative w-full max-w-[620px] mx-auto order-last lg:order-first">
          {/* Ambient Background Radial Glows & Circuit Accents */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-[#E78F68]/25 via-[#4B8B77]/15 to-[#3B231A]/20 blur-3xl rounded-full opacity-80 pointer-events-none" />
          <div className="absolute -inset-10 opacity-20 pointer-events-none flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 500 350" fill="none">
              <circle cx="250" cy="175" r="160" stroke="#E78F68" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="250" cy="175" r="220" stroke="#E78F68" strokeWidth="0.8" strokeDasharray="4 8" />
              <path d="M 50 175 H 450 M 250 25 V 325" stroke="#E78F68" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Wall Mount Bracket Top Accent */}
          <div className="w-36 h-2.5 bg-gradient-to-r from-[#1A1613] via-[#3D352F] to-[#1A1613] rounded-t-md mx-auto relative z-0 shadow-md border-t border-white/10" />

          {/* 3D Smart Board Main Console Unit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-gradient-to-b from-[#2B2622] via-[#1A1613] to-[#0D0B0A] p-3 sm:p-4 rounded-[26px] sm:rounded-[34px] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.6)] border border-white/20"
          >
            {/* Bezel Top Bar with Camera & Status LED */}
            <div className="flex items-center justify-between px-3 pb-2 pt-0.5 text-[10px] font-mono text-white/50">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-[#E78F68] font-bold tracking-wider">SMART HUB 4K</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-[9px] text-white/70">AI SENSOR ACTIVE</span>
              </div>
            </div>

            {/* Interactive Screen Container */}
            <div className="relative rounded-[18px] sm:rounded-[24px] overflow-hidden bg-[#0A0D14] aspect-[16/10] text-white shadow-2xl border border-white/10 flex flex-col justify-between p-4 sm:p-5 select-none">
              {/* Cosmic Learning Background Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,_#1E293B_0%,_#0F172A_50%,_#020617_100%)] z-0" />
              
              {/* Subtle Coordinate Grid Lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Screen Top Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E78F68]/20 border border-[#E78F68]/40 text-[#E78F68] text-[10px] sm:text-xs font-semibold tracking-wide">
                    GRADE 4 ASTRONOMY
                  </span>
                  <span className="hidden sm:inline-block text-[11px] text-white/60 font-mono">
                    LESSON #08 • ORBITAL DYNAMICS
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <Volume2 className="w-3.5 h-3.5" />
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Screen Center Interactive Solar Orbit Graphic */}
              <div className="relative z-10 my-auto flex items-center justify-center py-2">
                {/* Orbit Rings SVG */}
                <svg className="absolute w-full h-full max-h-[180px] pointer-events-none overflow-visible" viewBox="0 0 300 160">
                  <ellipse cx="150" cy="80" rx="60" ry="32" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                  <ellipse cx="150" cy="80" rx="110" ry="56" fill="none" stroke="rgba(231,143,104,0.3)" strokeWidth="1.2" />
                  <ellipse cx="150" cy="80" rx="140" ry="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </svg>

                {/* Central Glowing Sun */}
                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.85)] flex items-center justify-center animate-pulse">
                  <span className="text-[9px] sm:text-[10px] font-bold text-amber-950 uppercase tracking-tighter">SUN</span>
                </div>

                {/* Orbiting Earth Node */}
                <div className="absolute left-[72%] top-[25%] z-20 flex items-center space-x-1.5 bg-black/70 border border-[#5B92E5]/50 px-2.5 py-1 rounded-full backdrop-blur-md shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                  <span className="w-3 h-3 rounded-full bg-[#5B92E5] shadow-[0_0_8px_#5B92E5] inline-block" />
                  <div className="text-[10px] leading-tight">
                    <span className="font-bold text-white block">Earth</span>
                    <span className="text-[8px] text-white/70">29.8 km/s</span>
                  </div>
                </div>

                {/* Orbiting Mars Node */}
                <div className="absolute left-[20%] top-[68%] z-20 flex items-center space-x-1 bg-black/60 border border-red-500/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="text-[9px] text-white/80 font-medium">Mars</span>
                </div>
              </div>

              {/* Screen Bottom Interactive Toolbar (Samsung Flip Style) */}
              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[10px] sm:text-xs">
                <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/10">
                  <button className="p-1 rounded-lg bg-[#E78F68] text-white">
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                  <button className="p-1 rounded-lg hover:bg-white/10 text-white/80">
                    <PenTool className="w-3 h-3" />
                  </button>
                  <button className="p-1 rounded-lg hover:bg-white/10 text-white/80">
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-white/70 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">120Hz 4K UHD</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">10-TOUCH ACTIVE</span>
                </div>
              </div>

              {/* Glass Reflection Highlight Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none z-30" />
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none z-30" />
            </div>

            {/* Bottom Bezel Laser Etched Emblem */}
            <div className="text-center pt-2 pb-0.5 text-[9px] font-mono tracking-[0.25em] text-white/30 uppercase">
              VIVEKANANDHA SMART CLASSROOM HUB
            </div>
          </motion.div>

          {/* Wall Mount Stand Shadow Underneath */}
          <div className="w-4/5 h-5 mx-auto bg-black/45 blur-xl rounded-full mt-3" />
        </div>

        {/* Right Side: Unchanged Content */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <span className="h-0.5 w-8 bg-[#E78F68]"></span>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#E78F68]">Interactive Digital Learning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Smart Classroom Visual Hubs
          </h2>
          <p className="text-sm md:text-base text-[#3B231A]/85 font-light leading-relaxed">
            Every classroom in our school is fitted with standard, wide-screen smart LED console computers. Instead of abstract chalk boards, our certified educators utilize premium visual modules, animation cycles, and touch-interactive quizzes to render difficult science and history lessons beautifully clear.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2.5">
              <Monitor className="w-5 h-5 text-[#E78F68] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif font-bold text-sm">Visual Lesson Retention</h5>
                <p className="text-xs text-[#3B231A]/70 mt-0.5">Studies show children retain concepts 4x better through motion diagrams.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <Cpu className="w-5 h-5 text-[#E78F68] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif font-bold text-sm">Adaptive Tech Integration</h5>
                <p className="text-xs text-[#3B231A]/70 mt-0.5">Lessons match visual scripts crafted under central academic guidelines.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
