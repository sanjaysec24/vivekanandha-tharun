export interface MenuItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: string[];
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
  icon: string; // lucide icon name
}

export interface FeatureCard {
  title: string;
  tagline: string;
  imageUrl: string;
  bgColor: string; // e.g. bg-[#E27244]
  accentColor: string;
  sketchType: 'cloud' | 'loop' | 'wings';
}

export interface CategoryItem {
  id: string;
  title: string;
  grade: string;
  imageUrl: string;
  color: string; // e.g. #38BDF8
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  rating: number;
}
