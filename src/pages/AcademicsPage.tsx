import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Cpu, Compass, Laptop, Award, Layers, Sparkles, BookOpen, CircleDot, PlayCircle } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Pre KG to Grade 5</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Explore Our Classes</h2>
          <p className="text-sm text-[#3B231A]/70 max-w-lg mx-auto font-sans font-light">
            Each grade is custom-crafted to align with childhood developmental stages, ensuring appropriate cognitive expansion.
          </p>
        </div>

        {/* Grade tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
          {CLASS_DETAILS.map((c) => (
            <button
              key={c.grade}
              onClick={() => setSelectedClass(c)}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 border ${
                selectedClass.grade === c.grade
                  ? 'bg-[#3B231A] text-[#F5F1EB] border-[#3B231A] shadow-md scale-105'
                  : 'bg-white text-[#3B231A] hover:bg-[#3B231A]/5 border-[#3B231A]/10'
              }`}
            >
              {c.grade}
            </button>
          ))}
        </div>

        {/* Selected Grade Detail Card (Duo-Tone Premium Layout) */}
        <motion.div
          key={selectedClass.grade}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[32px] border border-[#3B231A]/10 shadow-sm max-w-4xl mx-auto overflow-hidden grid grid-cols-1 md:grid-cols-12"
        >
          {/* Side Color Accent Strip with Big Text */}
          <div 
            className="md:col-span-4 p-8 md:p-12 flex flex-col justify-between text-[#3B231A]"
            style={{ backgroundColor: selectedClass.color }}
          >
            <div>
              <span className="inline-block bg-white/40 border border-white/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                {selectedClass.ageGroup}
              </span>
              <h3 className="text-5xl md:text-6xl font-serif font-extrabold tracking-tighter leading-none mt-2">
                {selectedClass.grade}
              </h3>
            </div>
            
            <div className="mt-12">
              <span className="text-xs uppercase font-mono tracking-widest block opacity-75">Curriculum Focus</span>
              <p className="font-serif font-bold text-lg mt-1">{selectedClass.title}</p>
            </div>
          </div>

          {/* Core Content Area */}
          <div className="md:col-span-8 p-8 md:p-12 space-y-8 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[#E78F68] font-mono">Overview</h4>
              <p className="text-sm md:text-base text-[#3B231A]/85 leading-relaxed font-light">
                {selectedClass.description}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[#198C52] font-mono">Learning Milestones</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedClass.milestones.map((m, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-[#3B231A]/95">
                    <CircleDot className="w-4 h-4 text-[#198C52] mr-2 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#3B231A]/5 pt-6 flex items-center justify-between text-xs font-mono text-[#3B231A]/60">
              <span>Primary Division</span>
              <span>Individual Assessment Framework Included</span>
            </div>
          </div>
        </motion.div>
      </div>

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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-white rounded-[32px] border border-[#3B231A]/10 p-8 flex flex-col justify-between shadow-sm relative overflow-hidden aspect-video max-w-[540px] mx-auto order-last lg:order-first">
          {/* Mock Smart Screen graphic */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B18] to-[#3B231A] p-6 flex flex-col justify-between text-white z-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center text-xs font-mono text-[#E78F68] animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#E78F68] mr-2"></span>
                SMART BOARD CONSOLE ACTIVE
              </span>
              <span className="text-[10px] font-mono text-white/40">V_SCHOOL_SYSTEM_V2</span>
            </div>
            
            <div className="space-y-2 text-center my-auto">
              <span className="text-[10px] font-mono tracking-widest text-[#E78F68] uppercase">Grade 3 Space Module</span>
              <h4 className="text-2xl font-serif font-bold text-[#F5F1EB]">Interactive Solar Orbit Simulator</h4>
              <p className="text-xs text-white/60 max-w-sm mx-auto font-light">Touch elements to calculate dynamic planetary intervals and speeds.</p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-white/30 pt-3 border-t border-white/10">
              <span>Dual Audio Output</span>
              <span>120Hz Ultra HD LED</span>
            </div>
          </div>
        </div>

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
