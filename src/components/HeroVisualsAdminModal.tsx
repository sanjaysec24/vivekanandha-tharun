import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Upload, 
  Check, 
  RotateCcw, 
  Save, 
  Eye, 
  Sliders, 
  Layers, 
  Image as ImageIcon,
  Palette,
  Shield,
  Smartphone,
  Monitor,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Plus,
  Trash2,
  Lock,
  Unlock
} from 'lucide-react';
import { HeroVisualPlacementConfig, HeroVisualSlot, HeroVisualZone, HeroAnimationStyle } from '../types/heroVisuals';
import { THEME_PRESETS, CURATED_HERO_ASSETS, DEFAULT_HERO_VISUALS_CONFIG } from '../data/heroVisualPresets';
import { saveHeroVisuals, resetToDefaultHeroVisuals } from '../services/heroVisualsService';

interface HeroVisualsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: HeroVisualPlacementConfig;
  onConfigChange?: (newConfig: HeroVisualPlacementConfig) => void;
}

export default function HeroVisualsAdminModal({
  isOpen,
  onClose,
  config: initialConfig,
  onConfigChange,
}: HeroVisualsAdminModalProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'zones' | 'assets' | 'preview'>('zones');
  const [activeZone, setActiveZone] = useState<HeroVisualZone>('left_character');
  const [currentConfig, setCurrentConfig] = useState<HeroVisualPlacementConfig>(initialConfig);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedAssetForZone, setSelectedAssetForZone] = useState<HeroVisualZone | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if initialConfig changes
  React.useEffect(() => {
    setCurrentConfig(initialConfig);
  }, [initialConfig]);

  if (!isOpen) return null;

  const updateSlot = (zone: HeroVisualZone, updates: Partial<HeroVisualSlot>) => {
    setCurrentConfig((prev) => {
      const existingSlot = prev.slots[zone] || {
        id: `slot-${zone}`,
        zone,
        name: getZoneDefaultName(zone),
        role: getZoneDefaultRole(zone),
        imageUrl: '',
        altText: '',
        enabled: true,
        animation: 'float',
        opacity: zone === 'center_background' ? 0.2 : 1,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
      };

      const updatedConfig: HeroVisualPlacementConfig = {
        ...prev,
        slots: {
          ...prev.slots,
          [zone]: {
            ...existingSlot,
            ...updates,
          },
        },
      };

      if (onConfigChange) onConfigChange(updatedConfig);
      return updatedConfig;
    });
  };

  const handleApplyPreset = async (presetId: string) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    
    setCurrentConfig(preset.config);
    if (onConfigChange) onConfigChange(preset.config);
    
    try {
      setIsSaving(true);
      await saveHeroVisuals(preset.config);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, WebP, SVG, JPEG).');
      return;
    }

    // Limit to reasonable size for base64
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size exceeds 2MB. Please use a compressed PNG or WebP image for optimum landing page speed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url && activeZone) {
        updateSlot(activeZone, {
          imageUrl: base64Url,
          enabled: true,
        });
      }
    };
    reader.readAsDataURL(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveHeroVisuals(currentConfig);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving hero visuals config:', err);
      alert('Failed to save to cloud Firestore. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all Hero Visual zones to the original approved default boy & girl illustrations?')) {
      setIsSaving(true);
      try {
        await resetToDefaultHeroVisuals();
        setCurrentConfig(DEFAULT_HERO_VISUALS_CONFIG);
        if (onConfigChange) onConfigChange(DEFAULT_HERO_VISUALS_CONFIG);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const getZoneLabel = (zone: HeroVisualZone) => {
    switch (zone) {
      case 'left_character': return '1. Left Hero Character';
      case 'right_character': return '2. Right Hero Character';
      case 'left_decorative': return '3. Optional Left Decorative Slot';
      case 'right_decorative': return '4. Optional Right Decorative Slot';
      case 'center_background': return '5. Center Background Feature Slot';
    }
  };

  const getZoneDefaultName = (zone: HeroVisualZone) => {
    switch (zone) {
      case 'left_character': return 'Primary Left Mascot (School Boy)';
      case 'right_character': return 'Primary Right Mascot (School Girl)';
      case 'left_decorative': return 'Optional Left Mascot / Badge';
      case 'right_decorative': return 'Optional Right Mascot / Badge';
      case 'center_background': return 'Subtle Background Illustration';
    }
  };

  const getZoneDefaultRole = (zone: HeroVisualZone) => {
    switch (zone) {
      case 'left_character': return 'Main Character (Left Frame)';
      case 'right_character': return 'Main Character (Right Frame)';
      case 'left_decorative': return 'Festival / Event Mascot';
      case 'right_decorative': return 'Achievement / STEM Mascot';
      case 'center_background': return 'Campus & Festive Artwork Layer';
    }
  };

  const currentActiveSlot = currentConfig.slots[activeZone] || {
    id: `slot-${activeZone}`,
    zone: activeZone,
    name: getZoneDefaultName(activeZone),
    role: getZoneDefaultRole(activeZone),
    imageUrl: '',
    altText: '',
    enabled: activeZone === 'left_character' || activeZone === 'right_character',
    animation: 'float',
    opacity: activeZone === 'center_background' ? 0.2 : 1,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  };

  return (
    <div id="hero-visuals-admin-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/png,image/webp,image/svg+xml,image/jpeg" 
        className="hidden" 
      />

      <div className="relative w-full max-w-5xl bg-[#FBF8F4] text-[#3A2318] rounded-3xl shadow-2xl border border-[#3A2318]/15 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#3A2318]/10 bg-[#FAF6F0]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF8A3D] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-serif font-bold text-[#3A2318] tracking-tight">
                  Admin Hero Visual Placement System
                </h2>
                <span className="bg-[#5BB35A]/15 text-[#3E8E3D] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Live Firestore Sync
                </span>
              </div>
              <p className="text-xs text-[#3A2318]/65 font-sans mt-0.5">
                Manage all 5 surrounding character & decorative slots for events (Annual Day, Spectra, Pongal, Admissions).
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#3A2318]/10 text-[#3A2318] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center px-6 border-b border-[#3A2318]/10 bg-white/70 overflow-x-auto gap-1 text-xs font-semibold text-[#3A2318]/70 select-none">
          <button
            onClick={() => setActiveTab('zones')}
            className={`flex items-center space-x-2 px-4 py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'zones' 
                ? 'border-[#FF8A3D] text-[#FF8A3D] font-bold' 
                : 'border-transparent hover:text-[#3A2318]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>5 Visual Zones</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`flex items-center space-x-2 px-4 py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'presets' 
                ? 'border-[#FF8A3D] text-[#FF8A3D] font-bold' 
                : 'border-transparent hover:text-[#3A2318]'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Seasonal & Event Presets</span>
            <span className="bg-[#FF8A3D]/20 text-[#FF8A3D] px-1.5 py-0.2 rounded-full text-[10px]">8</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center space-x-2 px-4 py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'assets' 
                ? 'border-[#FF8A3D] text-[#FF8A3D] font-bold' 
                : 'border-transparent hover:text-[#3A2318]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>School Asset Library</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 px-4 py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'preview' 
                ? 'border-[#FF8A3D] text-[#FF8A3D] font-bold' 
                : 'border-transparent hover:text-[#3A2318]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Responsive Preview</span>
          </button>
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FAF6F0]/40">
          
          {/* TAB 1: 5 VISUAL PLACEMENT ZONES */}
          {activeTab === 'zones' && (
            <div className="space-y-6">
              
              {/* Zone Selector Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {(['left_character', 'right_character', 'left_decorative', 'right_decorative', 'center_background'] as HeroVisualZone[]).map((zone) => {
                  const isCur = activeZone === zone;
                  const slot = currentConfig.slots[zone];
                  const isEnabled = slot?.enabled && !!slot?.imageUrl;

                  return (
                    <button
                      key={zone}
                      onClick={() => setActiveZone(zone)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isCur 
                          ? 'bg-white border-[#FF8A3D] shadow-md ring-2 ring-[#FF8A3D]/20' 
                          : 'bg-white/60 hover:bg-white border-[#3A2318]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[#3A2318]/70">
                          {zone.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isEnabled ? 'bg-[#5BB35A]' : 'bg-gray-300'}`} />
                      </div>
                      <div className="truncate text-xs font-semibold text-[#3A2318]">
                        {slot?.name || getZoneDefaultName(zone)}
                      </div>
                      <div className="text-[10px] text-[#3A2318]/50 mt-1 truncate">
                        {isEnabled ? 'Enabled & Live' : (slot?.imageUrl ? 'Disabled' : 'Empty')}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Zone Detail Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#3A2318]/10 shadow-sm space-y-6">
                
                {/* Zone Header and Status Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A2318]/10">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#FF8A3D]/15 text-[#FF8A3D]">
                        {getZoneLabel(activeZone)}
                      </span>
                      <span className="text-xs text-[#3A2318]/60">• {getZoneDefaultRole(activeZone)}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#3A2318] mt-1 font-serif">
                      {currentActiveSlot.name || getZoneDefaultName(activeZone)}
                    </h3>
                  </div>

                  {/* Enable / Disable Switch */}
                  <div className="flex items-center space-x-3 bg-[#FAF6F0] px-4 py-2 rounded-2xl border border-[#3A2318]/10">
                    <span className="text-xs font-semibold text-[#3A2318]">
                      Slot Status: {currentActiveSlot.enabled ? (
                        <span className="text-[#5BB35A] font-bold">Enabled (Visible)</span>
                      ) : (
                        <span className="text-gray-500 font-normal">Hidden (Clean)</span>
                      )}
                    </span>
                    <button
                      onClick={() => updateSlot(activeZone, { enabled: !currentActiveSlot.enabled })}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        currentActiveSlot.enabled ? 'bg-[#5BB35A]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          currentActiveSlot.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Main Visual Editor Layout (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Image Preview and Upload Options */}
                  <div className="md:col-span-5 space-y-4">
                    <label className="block text-xs font-bold text-[#3A2318]/80 uppercase tracking-wider">
                      Visual Asset Image
                    </label>

                    {/* Preview Box with Transparent Checkerboard */}
                    <div className="relative w-full h-56 rounded-2xl border-2 border-dashed border-[#3A2318]/20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px] bg-[#F8F9FA] flex flex-col items-center justify-center overflow-hidden group">
                      {currentActiveSlot.imageUrl ? (
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                          <img
                            src={currentActiveSlot.imageUrl}
                            alt={currentActiveSlot.altText || currentActiveSlot.name}
                            className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                            style={{
                              opacity: currentActiveSlot.opacity,
                              transform: `scale(${currentActiveSlot.scale || 1})`,
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="px-3 py-1.5 bg-white text-[#3A2318] text-xs font-bold rounded-lg shadow cursor-pointer hover:bg-[#FAF6F0]"
                            >
                              Replace
                            </button>
                            <button
                              onClick={() => updateSlot(activeZone, { imageUrl: '' })}
                              className="p-1.5 bg-red-600 text-white rounded-lg shadow cursor-pointer hover:bg-red-700"
                              title="Remove image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6 space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-full bg-[#FF8A3D]/10 text-[#FF8A3D] flex items-center justify-center">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                          <p className="text-xs font-bold text-[#3A2318]">No image assigned</p>
                          <p className="text-[11px] text-[#3A2318]/60">
                            Upload a transparent PNG/WebP or choose from Library.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-[#3A2318] hover:bg-[#281810] text-white text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Custom Image</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAssetForZone(activeZone);
                          setActiveTab('assets');
                        }}
                        className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF6F0] border border-[#3A2318]/20 text-[#3A2318] text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Pick from Library</span>
                      </button>
                    </div>

                    {/* Custom Image URL Input */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#3A2318]/70 mb-1">
                        Or enter direct Image URL:
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com/character.png"
                        value={currentActiveSlot.imageUrl || ''}
                        onChange={(e) => updateSlot(activeZone, { imageUrl: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-[#3A2318]/15 bg-[#FAF6F0]/50 focus:bg-white focus:outline-none focus:border-[#FF8A3D]"
                      />
                    </div>
                  </div>

                  {/* Right Column: Zone Tuning & Animation Controls */}
                  <div className="md:col-span-7 space-y-4">
                    
                    {/* Character Label & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#3A2318]/80 mb-1">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={currentActiveSlot.name}
                          onChange={(e) => updateSlot(activeZone, { name: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#3A2318]/15 bg-[#FAF6F0]/50 focus:bg-white focus:outline-none focus:border-[#FF8A3D]"
                          placeholder="e.g. Science Mascot"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#3A2318]/80 mb-1">
                          Alt / Accessibility Text
                        </label>
                        <input
                          type="text"
                          value={currentActiveSlot.altText}
                          onChange={(e) => updateSlot(activeZone, { altText: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#3A2318]/15 bg-[#FAF6F0]/50 focus:bg-white focus:outline-none focus:border-[#FF8A3D]"
                          placeholder="e.g. Vivekanandha student illustration"
                        />
                      </div>
                    </div>

                    {/* Badge / Pill Text (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-[#3A2318]/80 mb-1">
                        Attached Badge / Tag Pill (Optional)
                      </label>
                      <input
                        type="text"
                        value={currentActiveSlot.badgeText || ''}
                        onChange={(e) => updateSlot(activeZone, { badgeText: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-[#3A2318]/15 bg-[#FAF6F0]/50 focus:bg-white focus:outline-none focus:border-[#FF8A3D]"
                        placeholder="e.g. Admissions 2027, Spectra Winner, Class of 2027"
                      />
                      <p className="text-[10px] text-[#3A2318]/50 mt-1">
                        Shows a playful floating pill badge near the character.
                      </p>
                    </div>

                    {/* Animation Style Selector */}
                    <div>
                      <label className="block text-xs font-bold text-[#3A2318]/80 mb-1.5">
                        Animation & Living Motion
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'float', label: 'Gentle Float', desc: 'Smooth vertical breath' },
                          { id: 'drift', label: 'Playful Drift', desc: 'Soft floating + tilt' },
                          { id: 'gentle_bounce', label: 'Joyful Bounce', desc: 'Slight energetic rhythm' },
                          { id: 'pulse', label: 'Subtle Pulse', desc: 'Soft scaling glow' },
                          { id: 'twinkle', label: 'Twinkle Star', desc: 'Sparkling scale' },
                          { id: 'still', label: 'Static (Still)', desc: 'No continuous motion' },
                        ].map((anim) => {
                          const isSel = currentActiveSlot.animation === anim.id;
                          return (
                            <button
                              key={anim.id}
                              onClick={() => updateSlot(activeZone, { animation: anim.id as HeroAnimationStyle })}
                              className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                                isSel 
                                  ? 'bg-[#FF8A3D]/10 border-[#FF8A3D] text-[#3A2318] font-bold' 
                                  : 'bg-[#FAF6F0]/40 border-[#3A2318]/10 hover:bg-[#FAF6F0]'
                              }`}
                            >
                              <div className="text-xs">{anim.label}</div>
                              <div className="text-[9px] text-[#3A2318]/50 truncate">{anim.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Opacity & Scale Sliders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#3A2318]/10">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-[#3A2318]/80 mb-1">
                          <span>Opacity Emphasis</span>
                          <span>{Math.round((currentActiveSlot.opacity ?? 1) * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="1"
                          step="0.05"
                          value={currentActiveSlot.opacity ?? 1}
                          onChange={(e) => updateSlot(activeZone, { opacity: parseFloat(e.target.value) })}
                          className="w-full accent-[#FF8A3D] cursor-pointer"
                        />
                        <span className="text-[10px] text-[#3A2318]/50">
                          {activeZone === 'center_background' ? 'Recommend 15%–30% for background' : 'Recommend 90%–100% for characters'}
                        </span>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-[#3A2318]/80 mb-1">
                          <span>Scale Size</span>
                          <span>{Math.round((currentActiveSlot.scale ?? 1) * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.6"
                          max="1.4"
                          step="0.05"
                          value={currentActiveSlot.scale ?? 1}
                          onChange={(e) => updateSlot(activeZone, { scale: parseFloat(e.target.value) })}
                          className="w-full accent-[#FF8A3D] cursor-pointer"
                        />
                        <span className="text-[10px] text-[#3A2318]/50">
                          Fine-tune visual balance with surrounding hero text.
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: SEASONAL & EVENT PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-serif font-bold text-[#3A2318]">
                  School Event & Seasonal Theme Presets
                </h3>
                <p className="text-xs text-[#3A2318]/65 font-sans mt-0.5">
                  1-Click activation transforms hero characters and mascots for school calendar occasions without changing layout or text.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {THEME_PRESETS.map((preset) => {
                  const isActive = currentConfig.activeThemePreset === preset.id;

                  return (
                    <div
                      key={preset.id}
                      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                        isActive 
                          ? 'bg-white border-[#FF8A3D] shadow-lg ring-2 ring-[#FF8A3D]/20' 
                          : 'bg-white/80 hover:bg-white border-[#3A2318]/10'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${preset.badgeColor}`}>
                            {preset.tag}
                          </span>
                          {isActive && (
                            <span className="flex items-center text-[11px] font-bold text-[#FF8A3D]">
                              <Check className="w-3.5 h-3.5 mr-1" /> Active
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-[#3A2318] font-serif">
                          {preset.name}
                        </h4>
                        <p className="text-xs text-[#FF8A3D] font-semibold mt-0.5">
                          {preset.subtitle}
                        </p>
                        <p className="text-xs text-[#3A2318]/70 mt-2 line-clamp-3 leading-relaxed">
                          {preset.description}
                        </p>

                        {/* Thumbnail character visual previews */}
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#3A2318]/10">
                          {preset.config.slots.left_character?.imageUrl && (
                            <div className="w-9 h-9 rounded-xl bg-[#5BB35A]/15 p-1 border border-[#5BB35A]/20 flex items-center justify-center">
                              <img 
                                src={preset.config.slots.left_character.imageUrl} 
                                alt="Left char" 
                                className="w-full h-full object-contain" 
                              />
                            </div>
                          )}
                          {preset.config.slots.right_character?.imageUrl && (
                            <div className="w-9 h-9 rounded-xl bg-[#F7CE22]/20 p-1 border border-[#F7CE22]/30 flex items-center justify-center">
                              <img 
                                src={preset.config.slots.right_character.imageUrl} 
                                alt="Right char" 
                                className="w-full h-full object-contain" 
                              />
                            </div>
                          )}
                          {preset.config.slots.left_decorative?.enabled && preset.config.slots.left_decorative.imageUrl && (
                            <div className="w-9 h-9 rounded-xl bg-[#FF8A3D]/15 p-1 border border-[#FF8A3D]/20 flex items-center justify-center">
                              <img 
                                src={preset.config.slots.left_decorative.imageUrl} 
                                alt="Deco" 
                                className="w-full h-full object-contain" 
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleApplyPreset(preset.id)}
                        disabled={isSaving}
                        className={`w-full mt-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer ${
                          isActive 
                            ? 'bg-[#FF8A3D] text-white' 
                            : 'bg-[#3A2318] hover:bg-[#281810] text-white'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Currently Applied</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Apply Theme</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SCHOOL ASSET LIBRARY */}
          {activeTab === 'assets' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#3A2318]">
                    School World Mascot & Character Library
                  </h3>
                  <p className="text-xs text-[#3A2318]/65 font-sans mt-0.5">
                    Select any curated high-resolution character or mascot to place in any of the 5 zones.
                  </p>
                </div>

                {selectedAssetForZone && (
                  <div className="bg-[#FF8A3D]/15 px-3 py-1.5 rounded-xl text-xs font-bold text-[#FF8A3D] flex items-center space-x-2">
                    <span>Target Zone: {getZoneLabel(selectedAssetForZone)}</span>
                    <button 
                      onClick={() => setSelectedAssetForZone(null)}
                      className="text-xs underline hover:text-[#3A2318]"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {CURATED_HERO_ASSETS.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-4 rounded-3xl bg-white border border-[#3A2318]/10 hover:border-[#FF8A3D] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="w-full h-32 rounded-2xl bg-[#FAF6F0] p-2 flex items-center justify-center overflow-hidden mb-3">
                      <img
                        src={asset.imageUrl}
                        alt={asset.name}
                        className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                      />
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-[#FF8A3D] uppercase tracking-wider">
                        {asset.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#3A2318] line-clamp-1 mt-0.5">
                        {asset.name}
                      </h4>
                      <p className="text-[10px] text-[#3A2318]/60 line-clamp-2 mt-1">
                        {asset.description}
                      </p>
                    </div>

                    {/* Quick Assign Buttons */}
                    <div className="mt-3 pt-2 border-t border-[#3A2318]/10 space-y-1">
                      <button
                        onClick={() => {
                          const target = selectedAssetForZone || 'left_character';
                          updateSlot(target, { imageUrl: asset.imageUrl, name: asset.name, enabled: true });
                          setActiveTab('zones');
                          setActiveZone(target);
                        }}
                        className="w-full py-1.5 bg-[#3A2318] hover:bg-[#FF8A3D] text-white text-[11px] font-bold rounded-lg transition cursor-pointer"
                      >
                        Set for {selectedAssetForZone ? getZoneLabel(selectedAssetForZone).split('.')[0] : 'Left Char'}
                      </button>
                      <button
                        onClick={() => {
                          updateSlot('right_character', { imageUrl: asset.imageUrl, name: asset.name, enabled: true });
                          setActiveTab('zones');
                          setActiveZone('right_character');
                        }}
                        className="w-full py-1 bg-white hover:bg-[#FAF6F0] border border-[#3A2318]/15 text-[#3A2318] text-[10px] font-semibold rounded-lg transition cursor-pointer"
                      >
                        Set for Right Char
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LIVE RESPONSIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#3A2318]">
                    Live Placement Simulation
                  </h3>
                  <p className="text-xs text-[#3A2318]/65 font-sans">
                    Real-time verification ensuring characters maintain balance and never obscure hero typography.
                  </p>
                </div>

                {/* Viewport toggle */}
                <div className="flex items-center bg-white p-1 rounded-2xl border border-[#3A2318]/15 shadow-sm">
                  <button
                    onClick={() => setPreviewViewport('desktop')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      previewViewport === 'desktop' ? 'bg-[#3A2318] text-white' : 'text-[#3A2318]/70 hover:text-[#3A2318]'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setPreviewViewport('mobile')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      previewViewport === 'mobile' ? 'bg-[#3A2318] text-white' : 'text-[#3A2318]/70 hover:text-[#3A2318]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Simulation Canvas Container */}
              <div className="w-full bg-[#F4F0EA] rounded-3xl p-6 border border-[#3A2318]/15 min-h-[380px] flex items-center justify-center overflow-hidden relative">
                
                {/* Center background slot preview if enabled */}
                {currentConfig.slots.center_background?.enabled && currentConfig.slots.center_background.imageUrl && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                    style={{ opacity: currentConfig.slots.center_background.opacity }}
                  >
                    <img 
                      src={currentConfig.slots.center_background.imageUrl} 
                      alt="Background Artwork"
                      className="max-w-md max-h-72 object-contain"
                    />
                  </div>
                )}

                {previewViewport === 'desktop' ? (
                  /* Desktop 3-column simulation */
                  <div className="w-full max-w-4xl grid grid-cols-12 gap-4 items-center relative z-10">
                    
                    {/* Left Column */}
                    <div className="col-span-3 flex flex-col items-center justify-end h-64 relative">
                      {currentConfig.slots.left_character?.enabled && currentConfig.slots.left_character.imageUrl ? (
                        <div className="relative w-36 h-48 flex items-end justify-center">
                          <div className="absolute bottom-0 inset-x-0 h-32 rounded-t-[36px] rounded-br-[36px] bg-[#5BB35A]" />
                          <div className="absolute bottom-1 left-1 right-1 h-30 rounded-t-[32px] rounded-br-[32px] border-2 border-dashed border-white/60 pointer-events-none" />
                          <img
                            src={currentConfig.slots.left_character.imageUrl}
                            alt="Left"
                            className="h-full w-auto object-contain z-10"
                            style={{ opacity: currentConfig.slots.left_character.opacity }}
                          />
                          {currentConfig.slots.left_character.badgeText && (
                            <span className="absolute -top-2 -left-2 bg-[#3A2318] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                              {currentConfig.slots.left_character.badgeText}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-[11px] text-gray-400 italic">Left Slot Hidden</div>
                      )}

                      {/* Left Decorative Slot */}
                      {currentConfig.slots.left_decorative?.enabled && currentConfig.slots.left_decorative.imageUrl && (
                        <div className="absolute -bottom-2 -left-2 w-14 h-14 z-20">
                          <img 
                            src={currentConfig.slots.left_decorative.imageUrl} 
                            alt="Deco" 
                            className="w-full h-full object-contain drop-shadow" 
                          />
                        </div>
                      )}
                    </div>

                    {/* Center Column */}
                    <div className="col-span-6 text-center space-y-3 px-2">
                      <div className="inline-block px-3 py-1 rounded-full bg-white/80 border border-[#3A2318]/10 text-[10px] font-bold text-[#3A2318]">
                        VIVEKANANDHA SCHOOL • UTR
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black font-bungee text-[#3B231A] leading-tight">
                        BUILDING AMBITIOUS MINDS
                      </h2>
                      <p className="text-xs font-caveat font-bold text-[#FF8A3D] text-lg">
                        for Tomorrow's World
                      </p>
                      <div className="flex justify-center gap-2 pt-2">
                        <span className="px-4 py-2 rounded-xl bg-[#FF8A3D] text-white text-xs font-bold shadow">
                          Apply Now ↗
                        </span>
                        <span className="px-4 py-2 rounded-xl border border-[#3A2318]/20 text-[#3A2318] text-xs font-bold">
                          School Visit
                        </span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-3 flex flex-col items-center justify-end h-64 relative">
                      {currentConfig.slots.right_character?.enabled && currentConfig.slots.right_character.imageUrl ? (
                        <div className="relative w-36 h-48 flex items-end justify-center">
                          <div className="absolute bottom-0 inset-x-0 h-32 rounded-t-[36px] rounded-bl-[36px] bg-[#F7CE22]" />
                          <div className="absolute bottom-1 left-1 right-1 h-30 rounded-t-[32px] rounded-bl-[32px] border-2 border-dashed border-white/60 pointer-events-none" />
                          <img
                            src={currentConfig.slots.right_character.imageUrl}
                            alt="Right"
                            className="h-full w-auto object-contain z-10"
                            style={{ opacity: currentConfig.slots.right_character.opacity }}
                          />
                          {currentConfig.slots.right_character.badgeText && (
                            <span className="absolute -top-2 -right-2 bg-[#FF8A3D] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                              {currentConfig.slots.right_character.badgeText}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-[11px] text-gray-400 italic">Right Slot Hidden</div>
                      )}

                      {/* Right Decorative Slot */}
                      {currentConfig.slots.right_decorative?.enabled && currentConfig.slots.right_decorative.imageUrl && (
                        <div className="absolute -bottom-2 -right-2 w-14 h-14 z-20">
                          <img 
                            src={currentConfig.slots.right_decorative.imageUrl} 
                            alt="Deco" 
                            className="w-full h-full object-contain drop-shadow" 
                          />
                        </div>
                      )}
                    </div>

                  </div>
                ) : (
                  /* Mobile stacked layout simulation */
                  <div className="w-full max-w-xs bg-white rounded-2xl p-4 border border-[#3A2318]/15 shadow space-y-4 text-center">
                    <h2 className="text-base font-black font-bungee text-[#3B231A]">
                      BUILDING AMBITIOUS MINDS
                    </h2>
                    <p className="text-xs font-caveat font-bold text-[#FF8A3D] text-sm">
                      for Tomorrow's World
                    </p>

                    {/* Symmetrical mobile characters */}
                    <div className="flex items-center justify-center gap-3 py-2">
                      {currentConfig.slots.left_character?.enabled && currentConfig.slots.left_character.imageUrl && (
                        <div className="relative w-24 h-32 flex items-end justify-center">
                          <div className="absolute bottom-0 inset-x-0 h-20 rounded-t-[20px] rounded-br-[20px] bg-[#5BB35A]" />
                          <img
                            src={currentConfig.slots.left_character.imageUrl}
                            alt="Left"
                            className="h-full w-auto object-contain z-10"
                          />
                        </div>
                      )}
                      {currentConfig.slots.right_character?.enabled && currentConfig.slots.right_character.imageUrl && (
                        <div className="relative w-24 h-32 flex items-end justify-center">
                          <div className="absolute bottom-0 inset-x-0 h-20 rounded-t-[20px] rounded-bl-[20px] bg-[#F7CE22]" />
                          <img
                            src={currentConfig.slots.right_character.imageUrl}
                            alt="Right"
                            className="h-full w-auto object-contain z-10"
                          />
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-[#FF8A3D] text-white text-xs font-bold">
                      Apply Now ↗
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-[#3A2318]/10 bg-[#FAF6F0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-[#3A2318]/70">
            {saveSuccess ? (
              <span className="flex items-center text-[#5BB35A] font-bold">
                <Check className="w-4 h-4 mr-1" /> Visual placements successfully saved & live!
              </span>
            ) : (
              <span>All 5 zones automatically sync to the public school website in real time.</span>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={handleReset}
              disabled={isSaving}
              className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border border-[#3A2318]/20 bg-white hover:bg-[#FAF6F0] text-[#3A2318] text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Approved Default</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center justify-center space-x-1.5 px-6 py-2.5 rounded-xl bg-[#FF8A3D] hover:bg-[#E7782A] text-white text-xs font-bold transition shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isSaving ? (
                <span>Saving to Cloud...</span>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Placements</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
