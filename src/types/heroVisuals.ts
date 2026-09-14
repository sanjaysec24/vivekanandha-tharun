export type HeroVisualZone = 
  | 'left_character' 
  | 'right_character' 
  | 'left_decorative' 
  | 'right_decorative' 
  | 'center_background';

export type HeroAnimationStyle = 
  | 'float' 
  | 'drift' 
  | 'gentle_bounce' 
  | 'twinkle' 
  | 'pulse' 
  | 'subtle_parallax' 
  | 'still';

export interface HeroVisualSlot {
  id: string;
  zone: HeroVisualZone;
  name: string;
  role: string;
  imageUrl: string;
  altText: string;
  enabled: boolean;
  animation: HeroAnimationStyle;
  opacity: number; // 0 to 1 (default 1, center bg default ~0.2)
  scale: number; // 0.6 to 1.4 (default 1)
  offsetX?: number; // px shift
  offsetY?: number; // px shift
  badgeText?: string;
}

export interface HeroVisualPlacementConfig {
  activeThemePreset: string;
  enableParallax: boolean;
  enableSubtleInteractions: boolean;
  slots: {
    left_character: HeroVisualSlot;
    right_character: HeroVisualSlot;
    left_decorative?: HeroVisualSlot;
    right_decorative?: HeroVisualSlot;
    center_background?: HeroVisualSlot;
  };
  lastUpdated?: string;
  updatedBy?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  iconName: string;
  badgeColor: string;
  description: string;
  config: HeroVisualPlacementConfig;
}
