import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { HeroVisualPlacementConfig } from '../types/heroVisuals';
import { DEFAULT_HERO_VISUALS_CONFIG, THEME_PRESETS } from '../data/heroVisualPresets';

const CMS_COLLECTION = 'website_cms';
const HERO_VISUALS_DOC = 'hero_visuals';
const HERO_DOC = 'hero';

export function subscribeToHeroVisuals(
  callback: (config: HeroVisualPlacementConfig) => void
): () => void {
  if (!db) {
    callback(DEFAULT_HERO_VISUALS_CONFIG);
    return () => {};
  }

  // Subscribe to hero_visuals document
  const unsub = onSnapshot(
    doc(db, CMS_COLLECTION, HERO_VISUALS_DOC),
    (docSnap) => {
      if (docSnap.exists()) {
        const remoteData = docSnap.data() as Partial<HeroVisualPlacementConfig>;
        
        // Merge safely with default config structure
        const mergedConfig: HeroVisualPlacementConfig = {
          activeThemePreset: remoteData.activeThemePreset || 'default',
          enableParallax: remoteData.enableParallax ?? true,
          enableSubtleInteractions: remoteData.enableSubtleInteractions ?? true,
          slots: {
            left_character: {
              ...DEFAULT_HERO_VISUALS_CONFIG.slots.left_character,
              ...(remoteData.slots?.left_character || {}),
            },
            right_character: {
              ...DEFAULT_HERO_VISUALS_CONFIG.slots.right_character,
              ...(remoteData.slots?.right_character || {}),
            },
            left_decorative: remoteData.slots?.left_decorative
              ? {
                  ...DEFAULT_HERO_VISUALS_CONFIG.slots.left_decorative,
                  ...remoteData.slots.left_decorative,
                }
              : DEFAULT_HERO_VISUALS_CONFIG.slots.left_decorative,
            right_decorative: remoteData.slots?.right_decorative
              ? {
                  ...DEFAULT_HERO_VISUALS_CONFIG.slots.right_decorative,
                  ...remoteData.slots.right_decorative,
                }
              : DEFAULT_HERO_VISUALS_CONFIG.slots.right_decorative,
            center_background: remoteData.slots?.center_background
              ? {
                  ...DEFAULT_HERO_VISUALS_CONFIG.slots.center_background,
                  ...remoteData.slots.center_background,
                }
              : DEFAULT_HERO_VISUALS_CONFIG.slots.center_background,
          },
          lastUpdated: remoteData.lastUpdated,
          updatedBy: remoteData.updatedBy,
        };

        callback(mergedConfig);
      } else {
        // First time initialization: provide default config
        callback(DEFAULT_HERO_VISUALS_CONFIG);
      }
    },
    (error) => {
      console.warn('Hero visuals subscription error, using default config:', error);
      callback(DEFAULT_HERO_VISUALS_CONFIG);
    }
  );

  return unsub;
}

export async function saveHeroVisuals(
  config: HeroVisualPlacementConfig
): Promise<boolean> {
  if (!db) return false;

  try {
    const payload: HeroVisualPlacementConfig = {
      ...config,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Admin Portal',
    };

    // 1. Save to website_cms/hero_visuals
    await setDoc(doc(db, CMS_COLLECTION, HERO_VISUALS_DOC), payload, { merge: true });

    // 2. Synchronize main character images with website_cms/hero doc for legacy compatibility
    const heroUpdates: Record<string, any> = {};
    if (config.slots.left_character?.imageUrl) {
      heroUpdates.boyImage = config.slots.left_character.imageUrl;
      heroUpdates.heroBoyImage = config.slots.left_character.imageUrl;
    }
    if (config.slots.right_character?.imageUrl) {
      heroUpdates.girlImage = config.slots.right_character.imageUrl;
      heroUpdates.heroGirlImage = config.slots.right_character.imageUrl;
    }

    if (Object.keys(heroUpdates).length > 0) {
      await setDoc(doc(db, CMS_COLLECTION, HERO_DOC), heroUpdates, { merge: true });
    }

    return true;
  } catch (error) {
    console.error('Failed to save hero visuals config to Firestore:', error);
    throw error;
  }
}

export async function applyThemePreset(presetId: string): Promise<boolean> {
  const preset = THEME_PRESETS.find((p) => p.id === presetId);
  if (!preset) {
    throw new Error(`Theme preset "${presetId}" not found`);
  }

  return await saveHeroVisuals(preset.config);
}

export async function resetToDefaultHeroVisuals(): Promise<boolean> {
  return await saveHeroVisuals(DEFAULT_HERO_VISUALS_CONFIG);
}
