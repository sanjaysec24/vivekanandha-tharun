import { MenuItem, StatItem, FeatureCard, CategoryItem } from './types';

export const navigationItems: MenuItem[] = [
  { label: 'About', href: '#about' },
  { 
    label: 'Programs', 
    href: '#programs', 
    hasDropdown: true, 
    dropdownItems: ['Early Years (Ages 2-4)', 'Kindergarten (Ages 4-6)', 'Primary Academy (Ages 6-9)', 'Creative Arts & Expression'] 
  },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Campus Life', href: '#campus-life' },
  { label: 'Contact', href: '#contact' },
];

export const statistics: StatItem[] = [
  {
    value: '50+',
    label: 'Distinguished Scholars',
    sublabel: 'Dedicated educators with advanced degrees guiding young minds across our campuses.',
    icon: 'Compass',
  },
  {
    value: '12K+',
    label: 'Thriving Alumni',
    sublabel: 'Graduates who transition seamlessly into premier secondary academies worldwide.',
    icon: 'Users',
  },
  {
    value: '70+',
    label: 'Creative Ateliers',
    sublabel: 'Artisanal spaces designed to nurture self-expression, music, and scientific inquiry.',
    icon: 'Briefcase',
  },
];

export const features: FeatureCard[] = [
  {
    title: 'Life Skills & Character',
    tagline: 'Cultivating mindfulness, social poise, and resilience for an ever-changing world.',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600',
    bgColor: 'bg-[#E78F68]', // Warm soft orange/coral
    accentColor: '#3B231A',
    sketchType: 'cloud',
  },
  {
    title: 'Imagination is Sovereign',
    tagline: 'Encouraging unstructured play, deep storytelling, and hands-on scientific discovery.',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600',
    bgColor: 'bg-[#4B8B77]', // Premium forest soft green
    accentColor: '#F5F1EB',
    sketchType: 'loop',
  },
  {
    title: 'Spread Your Creative Wings',
    tagline: 'Integrating musical composition, fine sketching, and international sports from day one.',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600',
    bgColor: 'bg-[#5B92E5]', // Elegant soft blue
    accentColor: '#F5F1EB',
    sketchType: 'wings',
  },
];

export const categoryCards: CategoryItem[] = [
  {
    id: 'letter-id',
    title: 'Language & Phonetics',
    grade: 'Ages 2-4 • Toddler',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=300',
    color: '#86EFAC', // Soft green background
  },
  {
    id: 'general-knowledge',
    title: 'Practical Life Mastery',
    grade: 'Ages 4-6 • Kindergarten',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=300',
    color: '#FED7AA', // Soft orange background
  },
  {
    id: 'geography-quiz',
    title: 'Cosmic Geography & Culture',
    grade: 'Ages 6-8 • Lower Primary',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300',
    color: '#FDE047', // Soft yellow background
  },
  {
    id: 'visual-arts',
    title: 'Fine Arts & Clay Sculpting',
    grade: 'All Ages • Creative Studio',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=300',
    color: '#93C5FD', // Soft blue background
  },
];

export interface CurriculumMilestone {
  ageGroup: string;
  focus: string;
  description: string;
  pillar1: { title: string; desc: string };
  pillar2: { title: string; desc: string };
  pillar3: { title: string; desc: string };
  dailyHighlight: string;
}

export const curriculumMilestones: CurriculumMilestone[] = [
  {
    ageGroup: 'Toddler (Ages 2 - 4)',
    focus: 'Sensory Exploration & Language Synthesis',
    description: 'During these formative years, children learn through their senses. Our environment is meticulously curated with tactile materials that foster phonetic awareness and coordination.',
    pillar1: {
      title: 'Practical Life Mastery',
      desc: 'Developing grace, courtesy, fine motor grip, and independence through daily task integration.'
    },
    pillar2: {
      title: 'Phonetic Foundation',
      desc: 'Nurturing vocabulary through rich storytelling, tactile sandpaper letters, and auditory games.'
    },
    pillar3: {
      title: 'Somatic Coordination',
      desc: 'Balancing beams, rhythmic movement, and organic outdoor exploration in nature.'
    },
    dailyHighlight: '10:00 AM — Collaborative Painting & Sourdough Kneading'
  },
  {
    ageGroup: 'Kindergarten (Ages 4 - 6)',
    focus: 'Abstract Thought & Collaborative Discovery',
    description: 'As children mature, they enter a stage of conscious refinement. Here we introduce geometric solids, mathematical decimal systems, and early literary comprehension.',
    pillar1: {
      title: 'Mathematical Decimals',
      desc: 'Understanding units, tens, hundreds, and thousands tangibly through custom wooden beads.'
    },
    pillar2: {
      title: 'Expressive Composition',
      desc: 'Writing original journals, reading classic anthologies, and staging mini theatrical works.'
    },
    pillar3: {
      title: 'Botanical Observation',
      desc: 'Planting seeds, categorizing local flora, and studying weather patterns in our forest lab.'
    },
    dailyHighlight: '1:30 PM — Solar System Mapping & Classical Violin Introduction'
  },
  {
    ageGroup: 'Primary (Ages 6 - 9)',
    focus: 'Inquiry, Research, & Civic Engagement',
    description: 'Our primary program channels the immense curiosity of the child into structured research. Students collaborate on long-term historical projects and write multi-chapter essays.',
    pillar1: {
      title: 'Advanced Geometry',
      desc: 'Proving geometric equivalences, measuring angles, and building custom scale architectural mockups.'
    },
    pillar2: {
      title: 'Global Historiography',
      desc: 'Exploring deep timelines of Earth, researching ancient civilizations, and presenting term papers.'
    },
    pillar3: {
      title: 'Civic Responsibilities',
      desc: 'Governing their own classroom meetings, organizing local charity drives, and resolving conflicts.'
    },
    dailyHighlight: '11:00 AM — Multi-language Debate & D3-based Local Ecology Mapping'
  }
];
