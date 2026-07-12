import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Palette, Atom, Flame, Sun, Sparkles, Award, Star, Compass } from 'lucide-react';

const ACTIVITIES = [
  {
    title: 'Sports & Athletics',
    category: 'Physical Somatic Mastery',
    icon: Trophy,
    color: 'bg-[#5B92E5]/10',
    iconColor: '#5B92E5',
    borderColor: 'border-[#5B92E5]/20',
    desc: 'From daily track practice to inter-school matches, we nurture genuine sportsmanship, teamwork, physical endurance, and body-balance.',
    features: ['Standard sized safe running track & field', 'Weekly yoga, martial arts & self-defense training', 'Dedicated football & target tennis practice yards', 'Quarterly competitive sports meets']
  },
  {
    title: 'Arts & Creative Crafts',
    category: 'Imagination & Fine Expression',
    icon: Palette,
    color: 'bg-[#E78F68]/10',
    iconColor: '#E78F68',
    borderColor: 'border-[#E78F68]/20',
    desc: 'Encourages unstructured sketching, hand-molded clay modeling, paper origami designs, and traditional fabric paintings.',
    features: ['Dedicated indoor atelier and sketch tables', 'Handmade natural clay modeling and baking', 'Origami, paper crafts, and cardboard building', 'Annual school-wide art gallery displays']
  },
  {
    title: 'STEM & Science Discovery',
    category: 'Logic & Spatial Reason',
    icon: Atom,
    color: 'bg-[#4B8B77]/10',
    iconColor: '#4B8B77',
    borderColor: 'border-[#4B8B77]/20',
    desc: 'Provides introductory botany seed-planting, basic computer lab exposure, water-pressure trials, and fun block-programming block labs.',
    features: ['Weekly hands-on botanical laboratory experiments', 'Age-appropriate block programming (Scratch)', 'Interactive gravity, water and friction trials', 'Science Exhibition and Model Contest days']
  },
  {
    title: 'Cultural Heritage & Recitation',
    category: 'Tamil Literature & Poise',
    icon: Compass,
    color: 'bg-yellow-500/10',
    iconColor: '#D97706',
    borderColor: 'border-yellow-500/20',
    desc: 'Instills deep love for classical Tamil reciting, stage plays, regional Thirukkural memorization, and classical musical instruments.',
    features: ['Weekly bilingual stage reading & recitation sessions', 'Thirukkural couplet recital contests', 'Classical vocal training and percussion beats', 'Traditional folk dance & drama ensembles']
  }
];

export default function ActivitiesPage() {
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
            Beyond Books
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Co-Curricular <span className="text-[#E78F68] italic font-normal">Activities</span>
          </h1>
          <p className="text-sm md:text-base text-[#F5F1EB]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Nurturing well-rounded, expressive individuals through a rich array of sports, arts, STEM projects, and traditional cultural festivals.
          </p>
        </div>
      </div>

      {/* Symmetrical Grid of core Activities (Sports, Arts, STEM, Cultural) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Weekly Enrichment</span>
          <h2 className="text-3xl font-serif font-bold">Our Active Pillars</h2>
          <p className="text-sm text-[#3B231A]/70 max-w-lg mx-auto font-sans font-light">
            We integrate these modules seamlessly into the daily schedule to ensure a healthy mind-body rhythm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {ACTIVITIES.map((act) => {
            const IconComponent = act.icon;
            return (
              <motion.div
                key={act.title}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-[32px] p-8 border ${act.borderColor} shadow-sm space-y-6 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B231A]/50 bg-[#F5F1EB] px-3 py-1 rounded-full border border-[#3B231A]/5">
                      {act.category}
                    </span>
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: act.color.replace('/10', '/20') }}
                    >
                      <IconComponent size={24} color={act.iconColor} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#3B231A]">
                    {act.title}
                  </h3>
                  
                  <p className="text-sm text-[#3B231A]/85 font-sans font-light leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <div className="border-t border-[#3B231A]/5 pt-5">
                  <h4 className="text-xs font-mono font-bold text-[#E78F68] uppercase tracking-wider mb-3">Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3B231A]/90 font-light">
                    {act.features.map((f, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E78F68] mr-2 shrink-0"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Annual Day Celebrations section */}
      <div className="bg-[#EAE4D9] py-16 border-y border-[#3B231A]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-0.5 w-8 bg-[#E78F68]"></span>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#E78F68]">The Grand Gala</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3B231A] tracking-tight">
              Our Spectacular Annual Day
            </h2>
            
            <p className="text-sm md:text-base text-[#3B231A]/85 font-sans font-light leading-relaxed">
              Every year, Vivekanandha School hosts its celebrated <strong>Annual Day</strong>—a grand thematic stage production where 100% of our nursery and primary children participate. No child is left out. From colorful, coordinated synchronized dances representing seasonal rain patterns to powerful historical dramas of ancient Kings and poets, our children build massive stage confidence and collaborative memories.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/80 p-4 rounded-xl border border-[#3B231A]/5">
                <div className="font-serif font-bold text-lg text-[#E78F68]">100%</div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#3B231A]/60 mt-1">Student Stage Participation</div>
              </div>
              <div className="bg-white/80 p-4 rounded-xl border border-[#3B231A]/5">
                <div className="font-serif font-bold text-lg text-[#198C52]">2,000+</div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#3B231A]/60 mt-1">Enthusiastic Spectators</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full max-w-[420px] aspect-[4/3] bg-white rounded-3xl border-[5px] border-[#E5DEC9] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-[#E78F68]/15 text-[#E78F68] px-3 py-1 rounded-full">ANNUAL DAY GALA</span>
                <Sparkles className="w-5 h-5 text-[#E78F68] animate-pulse" />
              </div>
              
              <div className="space-y-2 text-center my-auto">
                <p className="text-[10px] font-mono tracking-widest text-[#E78F68] uppercase">Next Scheduled Event</p>
                <h4 className="text-2xl font-serif font-bold text-[#3B231A]">"Nirmala Vazhvu" Ensembles</h4>
                <p className="text-xs text-[#3B231A]/60 font-sans">A celebration of pure nature, rain conservation, and peaceful rural living through plays and songs.</p>
              </div>

              <div className="border-t border-[#3B231A]/5 pt-4 text-center">
                <span className="text-xs font-semibold text-[#198C52]">Coming This December 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitions and Achievements */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Prizes & Standards</span>
          <h2 className="text-3xl font-serif font-bold">Interschool Competitions</h2>
          <p className="text-sm text-[#3B231A]/70 max-w-lg mx-auto font-sans font-light">
            Our students consistently secure gold plaques and merit awards in regional academic and athletic showcases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E78F68]/10 text-[#E78F68] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-[#3B231A]">State Level Thirukkural Recital</h4>
            <p className="text-xs text-[#3B231A]/70 leading-relaxed font-sans font-light">
              Our primary Grade 4 representatives secured the prestigious <strong>First Place</strong> by memorizing and reciting 150 couplets flawlessly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#198C52]/10 text-[#198C52] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-[#3B231A]">District Junior Chess Trophy</h4>
            <p className="text-xs text-[#3B231A]/70 leading-relaxed font-sans font-light">
              Grade 5 students clinched the gold and silver shields at the District Under-11 chess tournaments held in Coimbatore.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-[#3B231A]">Young Innovator STEM Challenge</h4>
            <p className="text-xs text-[#3B231A]/70 leading-relaxed font-sans font-light">
              Recognized with the <strong>Most Creative Prototype</strong> award for building an organic seed-irrigation model using simple cardboard pulleys.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
