import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, Calendar, MapPin, Award, Phone, Compass, ArrowRight,
  Plus, Trash2, Edit2, X, ShieldAlert, Upload, ChevronLeft, ChevronRight, 
  Eye, EyeOff, GripVertical, Settings, HelpCircle, ExternalLink
} from "lucide-react";

export interface NoticeSlide {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  eventDate: string;
  startDate: string; // Publish start
  endDate: string; // Publish end/expiry
  venue: string;
  registrationLink: string;
  contactDetails: string;
  visible: boolean;
  priority: number;
  image?: string; // base64 or preset
  presetIndex?: number; // fallback visual preset id
}

const PRESET_BG_OPTIONS = [
  { bg: "#FDF2F8", text: "#DB2777", accent: "#EC4899", label: "Pink Rose" },
  { bg: "#EEF2FF", text: "#4F46E5", accent: "#6366F1", label: "Indigo Mist" },
  { bg: "#ECFDF5", text: "#059669", accent: "#10B981", label: "Emerald Breeze" },
  { bg: "#FEF3C7", text: "#D97706", accent: "#F59E0B", label: "Amber Glow" },
  { bg: "#ECFEFF", text: "#0891B2", accent: "#06B6D4", label: "Cyan Frost" },
  { bg: "#FFF7ED", text: "#EA580C", accent: "#F97316", label: "Warm Orange" },
];

const INITIAL_SLIDES: NoticeSlide[] = [
  {
    id: "slide-1",
    title: "Vijayadasami Admissions Open",
    shortDescription: "Admissions for Academic Year 2027-2028",
    fullDescription: "We are pleased to announce that admissions for the Academic Year 2027-2028 are officially open. Join Vivekanandha School to experience high-quality education, state-of-the-art facilities, and activity-based learning designed to build ambitious minds.",
    badge: "ADMISSIONS",
    badgeBg: "#EEF2FF",
    badgeText: "#4F46E5",
    eventDate: "October 12, 2027",
    startDate: "2026-01-01",
    endDate: "2027-10-12",
    venue: "Main Admissions Wing, School Campus",
    registrationLink: "/admissions",
    contactDetails: "+91 94445 47474",
    visible: true,
    priority: 1,
    presetIndex: 1,
  },
  {
    id: "slide-2",
    title: "Annual Day Celebration",
    shortDescription: "Registrations now open",
    fullDescription: "Vivekanandha School is hosting its grand Annual Day Celebration. Get ready for a stellar display of arts, music, dance, and drama by our talented young learners. Registrations for various performances and backstage crews are now officially open.",
    badge: "ANNUAL DAY",
    badgeBg: "#FDF2F8",
    badgeText: "#DB2777",
    eventDate: "December 18, 2027",
    startDate: "2026-01-01",
    endDate: "2027-12-18",
    venue: "School Main Auditorium",
    registrationLink: "/contact",
    contactDetails: "+91 94445 47474",
    visible: true,
    priority: 2,
    presetIndex: 0,
  },
  {
    id: "slide-3",
    title: "STEM Innovation Expo",
    shortDescription: "Science and Robotics Exhibition",
    fullDescription: "Welcome to the annual STEM Innovation Expo! This exhibition brings together science enthusiasts, budding roboticists, and tech innovators of Vivekanandha School. Witness incredible scientific experiments and custom-designed robotics projects.",
    badge: "STEM EXPO",
    badgeBg: "#ECFEFF",
    badgeText: "#0891B2",
    eventDate: "November 5, 2027",
    startDate: "2026-01-01",
    endDate: "2027-11-05",
    venue: "STEM Discovery Lab",
    registrationLink: "/contact",
    contactDetails: "+91 94445 47474",
    visible: true,
    priority: 3,
    presetIndex: 4,
  },
  {
    id: "slide-4",
    title: "Summer Camp 2027",
    shortDescription: "Creative Learning Activities",
    fullDescription: "Join our high-energy Summer Camp 2027! We offer a range of creative learning activities including public speaking, coding, archery, clay modeling, and classical dance workshops to keep minds sharp and active over the holidays.",
    badge: "SUMMER CAMP",
    badgeBg: "#FEF3C7",
    badgeText: "#D97706",
    eventDate: "May 1 - May 25, 2027",
    startDate: "2026-01-01",
    endDate: "2027-05-25",
    venue: "School Campus Grounds",
    registrationLink: "/contact",
    contactDetails: "+91 94445 47474",
    visible: true,
    priority: 4,
    presetIndex: 3,
  },
  {
    id: "slide-5",
    title: "Sports Day Festival",
    shortDescription: "Inter-house competitions",
    fullDescription: "Gear up for Sports Day 2027! Vivekanandha School will witness intense athletic duels, track events, and team tournaments as students represent their respective school houses in pursuit of the coveted championship trophy.",
    badge: "SPORTS MEETING",
    badgeBg: "#FFF7ED",
    badgeText: "#EA580C",
    eventDate: "August 20, 2027",
    startDate: "2026-01-01",
    endDate: "2027-08-20",
    venue: "Olympic Arena, School Sports Ground",
    registrationLink: "/contact",
    contactDetails: "+91 94445 47474",
    visible: true,
    priority: 5,
    presetIndex: 5,
  }
];

export default function HeroNoticeSlider() {
  const [slides, setSlides] = useState<NoticeSlide[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  // Admin dashboard state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<NoticeSlide | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("vleo_notice_slides");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sort by priority initially
          setSlides(parsed.sort((a, b) => a.priority - b.priority));
          return;
        }
      } catch (e) {
        console.error("Failed to parse saved notices", e);
      }
    }
    // Fallback to defaults
    setSlides(INITIAL_SLIDES);
    localStorage.setItem("vleo_notice_slides", JSON.stringify(INITIAL_SLIDES));
  }, []);

  // Filter visible and active slides based on schedule dates
  const getVisibleSlides = () => {
    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    return slides
      .filter(slide => {
        if (!slide.visible) return false;
        // Check publish schedule
        if (slide.startDate && todayStr < slide.startDate) return false;
        if (slide.endDate && todayStr > slide.endDate) return false;
        return true;
      })
      .sort((a, b) => a.priority - b.priority);
  };

  const visibleSlides = getVisibleSlides();

  // Reset index if visible list size shrinks below active index
  useEffect(() => {
    if (activeSlideIndex >= visibleSlides.length && visibleSlides.length > 0) {
      setActiveSlideIndex(0);
    }
  }, [visibleSlides.length, activeSlideIndex]);

  // Autoplay functionality - changes every 4 seconds (infinite loop)
  useEffect(() => {
    if (visibleSlides.length <= 1 || isAdminOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % visibleSlides.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [visibleSlides.length, isAdminOpen]);

  // Save updated slides back to localstorage
  const saveSlides = (newSlides: NoticeSlide[]) => {
    // Standardize priority indexing values to match order
    const ordered = newSlides.map((s, idx) => ({ ...s, priority: idx + 1 }));
    setSlides(ordered);
    localStorage.setItem("vleo_notice_slides", JSON.stringify(ordered));
  };

  // Admin Slide Actions
  const handleToggleVisibility = (id: string) => {
    const updated = slides.map(s => s.id === id ? { ...s, visible: !s.visible } : s);
    saveSlides(updated);
  };

  const handleDeleteSlide = (id: string) => {
    const updated = slides.filter(s => s.id !== id);
    saveSlides(updated);
    if (editingSlide?.id === id) {
      setEditingSlide(null);
    }
  };

  const handleStartAddSlide = () => {
    const newSlide: NoticeSlide = {
      id: `slide-custom-${Date.now()}`,
      title: "",
      shortDescription: "",
      fullDescription: "",
      badge: "ANNOUNCEMENT",
      badgeBg: "#EEF2FF",
      badgeText: "#4F46E5",
      eventDate: new Date(Date.now() + 86400000 * 7).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 86400000 * 30).toISOString().split("T")[0],
      venue: "School Campus Grounds",
      registrationLink: "/contact",
      contactDetails: "+91 94445 47474",
      visible: true,
      priority: slides.length + 1,
      presetIndex: Math.floor(Math.random() * PRESET_BG_OPTIONS.length)
    };
    setEditingSlide(newSlide);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    if (!editingSlide.title.trim()) {
      alert("Please enter a valid title");
      return;
    }

    const exists = slides.some(s => s.id === editingSlide.id);
    let updated: NoticeSlide[];
    if (exists) {
      updated = slides.map(s => s.id === editingSlide.id ? editingSlide : s);
    } else {
      updated = [...slides, editingSlide];
    }

    saveSlides(updated);
    setEditingSlide(null);
  };

  // Image Upload handler (supports file to base64 conversion)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !editingSlide) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setEditingSlide({
          ...editingSlide,
          image: reader.result,
          presetIndex: undefined // clear preset index when custom is uploaded
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // HTML5 Drag and Drop for admin slide reordering
  const handleDragStart = (idx: number) => {
    setDraggedIndex(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
  };

  const handleDrop = (idx: number) => {
    if (draggedIndex === null) return;
    const items = [...slides];
    const [removed] = items.splice(draggedIndex, 1);
    items.splice(idx, 0, removed);
    saveSlides(items);
    setDraggedIndex(null);
  };

  return (
    <div className="w-fit flex flex-col justify-center items-center mx-auto relative select-none">
      {/* Premium Matte Shadow Compact Slider Container */}
      <div 
        onDoubleClick={() => setIsAdminOpen(true)}
        className="relative mx-auto w-[90vw] max-w-[320px] h-[100px] sm:w-[340px] sm:h-[110px] md:w-[360px] md:h-[120px] bg-[#FAF8F5] rounded-[20px] shadow-[0_4px_12px_rgba(58,35,24,0.06)] overflow-hidden select-none cursor-pointer border border-[#E5DEC9]"
        title="Double-click to open Admin Panel"
      >
        {visibleSlides.length > 0 ? (
          <div className="flex-1 relative overflow-hidden w-full h-full">
            <AnimatePresence mode="wait">
              {visibleSlides.map((slide, index) => {
                if (index !== activeSlideIndex) return null;
                const preset = slide.presetIndex !== undefined ? PRESET_BG_OPTIONS[slide.presetIndex] : null;
                return (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full flex items-center gap-3 p-2.5 bg-[#FAF8F5]"
                  >
                    {/* Left Side: Thumbnail */}
                    <div className="relative shrink-0 w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] md:w-[88px] md:h-[88px] rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center border border-[#E5DEC9]">
                      {slide.image ? (
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center relative"
                          style={{ backgroundColor: preset?.bg || "#FDF2F8" }}
                        >
                          <div className="absolute inset-1 opacity-10 border border-dashed border-current" style={{ color: preset?.accent }} />
                          <GraduationCap size={28} style={{ color: preset?.accent }} />
                        </div>
                      )}
                    </div>

                    {/* Right Side: Title & Subtitle Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center text-left pr-1.5">
                      {slide.badge && (
                        <span 
                          className="w-fit px-1.5 py-0.5 rounded-md text-[8px] font-extrabold tracking-wider uppercase border border-[#3A2318]/10 bg-[#FAF8F5] mb-1 shrink-0"
                          style={{ color: preset?.text || "#FF8A3D" }}
                        >
                          {slide.badge}
                        </span>
                      )}
                      
                      <h3 className="text-[10px] sm:text-[11px] md:text-xs font-serif font-black text-[#3A2318] line-clamp-2 leading-tight">
                        {slide.title}
                      </h3>

                      <p className="text-[9px] sm:text-[10px] text-[#8C7A6B] truncate font-medium mt-1">
                        {slide.shortDescription || slide.eventDate}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div 
            onDoubleClick={() => setIsAdminOpen(true)}
            className="w-full h-full flex flex-col items-center justify-center text-center p-4 cursor-pointer bg-[#FAF8F5]"
          >
            <ShieldAlert size={24} className="text-[#8C7A6B]/50 mb-1" />
            <p className="text-xs text-[#8C7A6B] font-medium">No active announcements visible.</p>
            <p className="text-[10px] text-[#A8988B] mt-0.5">Double-click here to open admin panel.</p>
          </div>
        )}
      </div>

      {/* Pagination Dot indicators rendered precisely below the slider */}
      {visibleSlides.length > 1 && (
        <div className="flex justify-center space-x-1.5 mt-2">
          {visibleSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlideIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeSlideIndex ? "bg-[#3A2318] w-3" : "bg-[#E5DEC9] w-1"
              }`}
            />
          ))}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. ADMIN ANNOUNCEMENT CONTROL MODAL */}
      {/* ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 bg-[#3A2318]/50 backdrop-blur-xs flex items-center justify-center p-4 z-[9998] font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF7F2] w-full max-w-3xl h-[85vh] rounded-[28px] border-[1.5px] border-[#E6DCCF] shadow-2xl overflow-hidden flex flex-col font-sans"
            >
              {/* Admin Panel Header */}
              <div className="px-6 py-4 bg-[#4A2C21] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Settings size={18} className="text-[#FF8A3D]" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base">Slider Admin Dashboard</h2>
                    <p className="text-[10px] text-[#D5C2B1] font-light mt-0.5">Manage home-screen announcements, posters & display schedule</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsAdminOpen(false);
                    setEditingSlide(null);
                  }}
                  className="p-1.5 hover:bg-white/15 rounded-full transition-colors cursor-pointer text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Grid content split: Slide list management left & editor/creation on the right */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* LEFT LIST PANEL: Slide List & Reordering (HTML5 Drag and Drop) */}
                <div className="w-full md:w-[45%] border-r border-[#E6DCCF] flex flex-col bg-[#FAF7F2] h-full overflow-hidden">
                  <div className="p-4 bg-white/50 border-b border-[#E6DCCF] flex items-center justify-between shrink-0">
                    <span className="text-xs font-bold text-[#4A2C21] uppercase tracking-wider flex items-center gap-1">
                      <span>Live Slides</span>
                      <span className="bg-[#4A2C21] text-white text-[9px] px-1.5 py-0.5 rounded-full">
                        {slides.length}
                      </span>
                    </span>
                    <button
                      onClick={handleStartAddSlide}
                      className="px-3 py-1.5 bg-[#4A2C21] hover:bg-[#321E16] text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                    >
                      <Plus size={12} />
                      <span>Create Slide</span>
                    </button>
                  </div>

                  {/* HTML5 draggable slide list container */}
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
                    <p className="text-[9px] text-[#8C7A6B] font-bold uppercase tracking-wider mb-2">
                      💡 Hint: Drag grip handle to change priority order
                    </p>
                    
                    {slides.map((slide, idx) => {
                      return (
                        <div
                          key={slide.id}
                          draggable="true"
                          onDragStart={() => handleDragStart(idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDrop={() => handleDrop(idx)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                            draggedIndex === idx 
                              ? "bg-[#FAF7F2]/50 border-dashed border-[#FF8A3D]/40 opacity-50" 
                              : "bg-white border-[#E6DCCF] hover:border-[#4A2C21]/30 shadow-xs"
                          }`}
                        >
                          {/* Drag grip handler */}
                          <div className="text-[#A39281] cursor-grab active:cursor-grabbing p-0.5">
                            <GripVertical size={16} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-extrabold text-[#FF8A3D] bg-[#FF8A3D]/10 px-1.5 py-0.5 rounded uppercase">
                                {slide.badge}
                              </span>
                              <span className="text-[9px] text-[#A39281]">Priority {slide.priority}</span>
                            </div>
                            <h4 className="text-xs font-bold text-[#3A2318] truncate mt-1">
                              {slide.title || "(Untitled announcement)"}
                            </h4>
                          </div>

                          {/* Quick control actions */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleVisibility(slide.id)}
                              className={`p-1 rounded-lg border transition-colors cursor-pointer ${
                                slide.visible 
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" 
                                  : "bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100"
                              }`}
                              title={slide.visible ? "Visible on Slider" : "Hidden"}
                            >
                              {slide.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setEditingSlide(slide)}
                              className="p-1 bg-amber-50 border border-amber-200 text-[#EA580C] hover:bg-amber-100 rounded-lg cursor-pointer"
                              title="Edit Slide Content"
                            >
                              <Edit2 size={12} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteSlide(slide.id)}
                              className="p-1 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer"
                              title="Delete Notice"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {slides.length === 0 && (
                      <div className="text-center p-6 bg-white border border-dashed border-[#E6DCCF] rounded-xl">
                        <HelpCircle className="mx-auto text-[#A39281] mb-1.5" size={24} />
                        <p className="text-xs text-[#8C7A6B]">No custom slides created yet.</p>
                        <p className="text-[10px] text-[#A8988B] mt-1">Click "Create Slide" to get started!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT EDITOR PANEL: Slide details form */}
                <div className="w-full md:w-[55%] bg-white p-5 flex flex-col h-full overflow-y-auto">
                  {editingSlide ? (
                    <form onSubmit={handleSaveEdit} className="space-y-4 text-left flex-1">
                      <div className="flex items-center justify-between border-b border-[#E6DCCF] pb-2.5">
                        <span className="text-xs font-extrabold text-[#4A2C21] uppercase tracking-wider flex items-center gap-1.5">
                          <Edit2 size={12} />
                          {slides.some(s => s.id === editingSlide.id) ? "Edit Announcement" : "New Announcement Setup"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingSlide(null)}
                          className="text-[11px] font-bold text-red-600 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Event Title */}
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Event / Notice Title *</label>
                          <input
                            type="text"
                            required
                            value={editingSlide.title}
                            onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                            placeholder="e.g. Annual Sports Meet 2027"
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Short Description */}
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Short Description / Subtitle *</label>
                          <input
                            type="text"
                            required
                            value={editingSlide.shortDescription}
                            onChange={(e) => setEditingSlide({ ...editingSlide, shortDescription: e.target.value })}
                            placeholder="e.g. Registrations for classes Pre-KG to IX now open"
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Full Description */}
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Full Event Description *</label>
                          <textarea
                            required
                            rows={3}
                            value={editingSlide.fullDescription}
                            onChange={(e) => setEditingSlide({ ...editingSlide, fullDescription: e.target.value })}
                            placeholder="Provide a thorough, informative paragraph about dates, requirements, criteria..."
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21] font-normal leading-relaxed"
                          />
                        </div>

                        {/* Badge category */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Notice Badge</label>
                          <input
                            type="text"
                            value={editingSlide.badge}
                            onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                            placeholder="e.g. ADMISSIONS"
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Event Date Text */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Event Date Text</label>
                          <input
                            type="text"
                            value={editingSlide.eventDate}
                            onChange={(e) => setEditingSlide({ ...editingSlide, eventDate: e.target.value })}
                            placeholder="e.g. October 12, 2027"
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Publish Start Schedule */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Publish Start Date</label>
                          <input
                            type="date"
                            value={editingSlide.startDate}
                            onChange={(e) => setEditingSlide({ ...editingSlide, startDate: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Publish End Expiry Schedule */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Publish Expiry Date</label>
                          <input
                            type="date"
                            value={editingSlide.endDate}
                            onChange={(e) => setEditingSlide({ ...editingSlide, endDate: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Venue */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Venue</label>
                          <input
                            type="text"
                            value={editingSlide.venue}
                            onChange={(e) => setEditingSlide({ ...editingSlide, venue: e.target.value })}
                            placeholder="e.g. Main Auditorium"
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Registration link */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Registration Info Link</label>
                          <input
                            type="text"
                            value={editingSlide.registrationLink}
                            onChange={(e) => setEditingSlide({ ...editingSlide, registrationLink: e.target.value })}
                            placeholder="e.g. /admissions or external link"
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Contact details */}
                        <div className="space-y-1 col-span-2">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Support / Contact Hotlines</label>
                          <input
                            type="text"
                            value={editingSlide.contactDetails}
                            onChange={(e) => setEditingSlide({ ...editingSlide, contactDetails: e.target.value })}
                            placeholder="e.g. +91 94445 47474"
                            className="w-full px-3 py-1.5 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none focus:border-[#4A2C21]"
                          />
                        </div>

                        {/* Visibility & Priority Row */}
                        <div className="flex items-center space-x-6 py-2 col-span-2">
                          <label className="flex items-center space-x-2 text-xs font-semibold text-[#3A2318] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingSlide.visible}
                              onChange={(e) => setEditingSlide({ ...editingSlide, visible: e.target.checked })}
                              className="rounded border-[#E6DCCF] text-[#4A2C21] focus:ring-[#4A2C21]"
                            />
                            <span>Enable Visibility</span>
                          </label>

                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider">Priority Level:</span>
                            <input
                              type="number"
                              min={1}
                              max={99}
                              value={editingSlide.priority}
                              onChange={(e) => setEditingSlide({ ...editingSlide, priority: parseInt(e.target.value) || 1 })}
                              className="w-14 px-2 py-1 text-xs text-[#3A2318] bg-[#FAF8F5] border border-[#E6DCCF] rounded-lg focus:outline-none text-center"
                            />
                          </div>
                        </div>

                        {/* Poster Upload / Visual Presets Selection */}
                        <div className="col-span-2 border-t border-[#E6DCCF] pt-4.5 space-y-3">
                          <span className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                            Event Poster / Visual Graphic
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* File Upload Box */}
                            <div className="border border-dashed border-[#E6DCCF] hover:border-[#4A2C21]/40 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer relative bg-[#FAF8F5]">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              <Upload size={16} className="text-[#8C7A6B] mb-1" />
                              <span className="text-[10px] font-bold text-[#3A2318]">Upload Custom Poster</span>
                              <span className="text-[8px] text-[#8C7A6B] mt-0.5">PNG or JPG, under 500KB</span>
                            </div>

                            {/* visual presets pickers if no custom poster is set */}
                            <div className="space-y-1.5">
                              <span className="text-[9px] text-[#8C7A6B] font-bold uppercase tracking-wider block">Or select a color theme preset:</span>
                              <div className="grid grid-cols-3 gap-1.5">
                                {PRESET_BG_OPTIONS.map((opt, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => setEditingSlide({
                                      ...editingSlide,
                                      image: undefined, // remove custom image
                                      presetIndex: i
                                    })}
                                    className={`px-1 py-1.5 text-[9px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                                      editingSlide.presetIndex === i && !editingSlide.image
                                        ? "border-[#4A2C21] ring-2 ring-[#4A2C21]/20 font-black"
                                        : "border-[#E6DCCF]"
                                    }`}
                                    style={{ backgroundColor: opt.bg, color: opt.text }}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Preview container */}
                          {(editingSlide.image || editingSlide.presetIndex !== undefined) && (
                            <div className="flex items-center gap-3 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E6DCCF] mt-2 text-left">
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#DED4C7] flex items-center justify-center shrink-0">
                                {editingSlide.image ? (
                                  <img src={editingSlide.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                  <div 
                                    className="w-full h-full flex items-center justify-center"
                                    style={{ backgroundColor: PRESET_BG_OPTIONS[editingSlide.presetIndex!].bg }}
                                  >
                                    <GraduationCap size={16} style={{ color: PRESET_BG_OPTIONS[editingSlide.presetIndex!].accent }} />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] font-extrabold text-[#8C7A6B] uppercase block">Selected Poster Preview</span>
                                <span className="text-[10px] text-[#3A2318] font-bold truncate block">
                                  {editingSlide.image ? "Uploaded Custom Image" : `Theme: ${PRESET_BG_OPTIONS[editingSlide.presetIndex!].label}`}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#4A2C21] hover:bg-[#321E16] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm text-center uppercase tracking-wider font-sans"
                      >
                        Save Announcement Changes
                      </button>
                    </form>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
                      <Compass size={40} className="text-[#8C7A6B]/30 mb-2.5" />
                      <h3 className="text-sm font-bold text-[#3A2318]">Announcement Editor</h3>
                      <p className="text-xs text-[#8C7A6B] max-w-xs mt-1 leading-relaxed">
                        Select an announcement slide from the list on the left to edit its details, or click "Create Slide" to design a new announcement.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Panel Footer Info */}
              <div className="bg-[#FAF7F2] px-6 py-4 border-t border-[#E6DCCF] flex items-center justify-between shrink-0">
                <div className="text-[10px] text-[#8C7A6B] font-medium leading-normal flex flex-col text-left">
                  <span className="flex items-center gap-1 font-semibold text-[#4A2C21]">
                    <ShieldAlert size={12} className="text-[#FF8A3D]" />
                    <span>Double-click anywhere on the homepage poster slider to reopen this panel.</span>
                  </span>
                  <span className="text-[9px] text-[#A39281] mt-0.5">Changes are instantly saved to local storage.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to restore the default 5 slides? This will overwrite your current slides.")) {
                      saveSlides(INITIAL_SLIDES);
                      setEditingSlide(null);
                    }
                  }}
                  className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Reset to Defaults
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
