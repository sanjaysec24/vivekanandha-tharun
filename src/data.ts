import { MenuItem, StatItem, FeatureCard, CategoryItem } from './types';

export const navigationItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { 
    label: 'Academics', 
    href: '/academics', 
    hasDropdown: true, 
    dropdownItems: ['Pre KG', 'LKG', 'UKG', 'Grade 1-2', 'Grade 3-4', 'Grade 5'] 
  },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Activities', href: '/activities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
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
    title: 'Letter Identification',
    grade: 'Pre KG',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=300',
    color: '#86EFAC', // Soft green background
  },
  {
    id: 'foundational',
    title: 'Foundational Learning',
    grade: 'LKG',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=300',
    color: '#FED7AA', // Soft orange background
  },
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    grade: 'UKG',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300',
    color: '#FDE047', // Soft yellow background
  },
  {
    id: 'creative-arts',
    title: 'Creative Arts',
    grade: 'Grade 1-2',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=300',
    color: '#93C5FD', // Soft blue background
  },
  {
    id: 'science-explorer',
    title: 'Science Explorer',
    grade: 'Grade 3-4',
    imageUrl: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?auto=format&fit=crop&q=80&w=300',
    color: '#C084FC', // Soft purple background
  },
  {
    id: 'future-innovators',
    title: 'Future Innovators',
    grade: 'Grade 5',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=300',
    color: '#F472B6', // Soft pink background
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
    ageGroup: 'Pre KG & LKG',
    focus: 'Letter Identification & Foundational Learning',
    description: 'During these formative early years, our children build motor coordination, tactile focus, and initial letter/sound identification through engaging sensory materials.',
    pillar1: {
      title: 'Practical Life Mastery',
      desc: 'Developing independence, fine grip, and self-confidence through daily life tasks.'
    },
    pillar2: {
      title: 'Phonetic Foundation',
      desc: 'Recognizing sounds and letters using sandpaper boards, tactile tracing, and stories.'
    },
    pillar3: {
      title: 'Somatic Coordination',
      desc: 'Balanced physical activities, rhythmic movement, and interactive playground times.'
    },
    dailyHighlight: '10:00 AM — Letter Tracing & Cooperative Clay Play'
  },
  {
    ageGroup: 'UKG & Grade 1-2',
    focus: 'General Knowledge & Creative Arts',
    description: 'As students transition to UKG and early grades, they dive deep into world environments, basic mathematical decimals, and express their imaginations via rich artistic mediums.',
    pillar1: {
      title: 'Mathematical Operations',
      desc: 'Learning addition and subtraction with concrete bead boards and tactile blocks.'
    },
    pillar2: {
      title: 'Global Awareness',
      desc: 'Exploring general knowledge, maps, natural science cycles, and regional cultures.'
    },
    pillar3: {
      title: 'Creative Art Studios',
      desc: 'Engaging in sketch play, musical rhythm exercises, and storytelling theater.'
    },
    dailyHighlight: '1:30 PM — Science Show & Tell & Group Singing Session'
  },
  {
    ageGroup: 'Grade 3-5',
    focus: 'Science Explorer & Future Innovators',
    description: 'Our senior primary students focus on advanced logical reasoning, computer lab exposure, and science explorations to become collaborative thinkers and tomorrow\'s leaders.',
    pillar1: {
      title: 'Scientific Method',
      desc: 'Conducting small experiments, measuring water/soil, and exploring basic botany.'
    },
    pillar2: {
      title: 'Computer Lab Access',
      desc: 'Understanding basic computer parts, interactive digital tasks, and smart boards.'
    },
    pillar3: {
      title: 'Civic Responsibilities',
      desc: 'Leading assembly talks, cooperative team challenges, and problem-solving groups.'
    },
    dailyHighlight: '11:00 AM — Science Lab Exploration & Smart Board Quiz'
  }
];
