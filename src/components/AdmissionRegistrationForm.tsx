import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Feather, 
  BookOpen, 
  User, 
  Calendar, 
  Users, 
  GraduationCap, 
  Camera, 
  Phone, 
  Mail, 
  Home, 
  Building2, 
  Trophy, 
  Palette, 
  Bell, 
  Trees, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle,
  FileText,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
// Pre-populated local submit simulation for static mode without database writes

interface FormData {
  // Step 1: Student Details
  studentName: string;
  dob: string;
  gender: string;
  applyingClass: string;
  studentPhoto: string; // Base64 string

  // Step 2: Parent Details
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  emailAddress: string;
  residentialAddress: string;

  // Step 3: Academic Details
  previousSchool: string;
  currentGrade: string;
  specialAchievements: string;
  childInterests: string;

  // Step 4: Additional Details
  transportRequired: boolean;
  hostelRequired: boolean;
  additionalNotes: string;
}

const INITIAL_FORM_DATA: FormData = {
  studentName: '',
  dob: '',
  gender: '',
  applyingClass: '',
  studentPhoto: '',
  fatherName: '',
  motherName: '',
  mobileNumber: '',
  emailAddress: '',
  residentialAddress: '',
  previousSchool: '',
  currentGrade: '',
  specialAchievements: '',
  childInterests: '',
  transportRequired: false,
  hostelRequired: false,
  additionalNotes: '',
};

const CLASS_OPTIONS = [
  'Pre KG',
  'LKG',
  'UKG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12'
];

export default function AdmissionRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveMsg, setAutoSaveMsg] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('vleo_admission_form_progress');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
        setAutoSaveMsg('Draft restored from previous visit.');
        setTimeout(() => setAutoSaveMsg(''), 4000);
      } catch (e) {
        console.error('Failed to load draft from localStorage', e);
      }
    }
  }, []);

  // Auto-save to localStorage on form change
  const handleFieldChange = (field: keyof FormData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem('vleo_admission_form_progress', JSON.stringify(updated));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }

    setAutoSaveMsg('Auto-saved Draft...');
    const timer = setTimeout(() => setAutoSaveMsg(''), 1500);
    return () => clearTimeout(timer);
  };

  // Drag and Drop handlers for photo upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          handleFieldChange('studentPhoto', e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Custom step validation
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (step === 1) {
      if (!formData.studentName.trim()) newErrors.studentName = 'Student full name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Please select a gender';
      if (!formData.applyingClass) newErrors.applyingClass = 'Please select a class for application';
    } else if (step === 2) {
      if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
      if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required";
      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = 'Mobile number is required';
      } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.mobileNumber.trim())) {
        newErrors.mobileNumber = 'Please enter a valid phone number (min 10 digits)';
      }
      if (!formData.emailAddress.trim()) {
        newErrors.emailAddress = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
        newErrors.emailAddress = 'Invalid email address';
      }
      if (!formData.residentialAddress.trim()) newErrors.residentialAddress = 'Residential address is required';
    } else if (step === 3) {
      // Academic details are optional but recommended; validation could go here
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: document.getElementById('admission-registration-section')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: document.getElementById('admission-registration-section')?.offsetTop || 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Clean, premium static-only visual simulation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Successful submission
      setIsSubmitted(true);
      localStorage.removeItem('vleo_admission_form_progress');
    } catch (err) {
      console.error('Failed to submit application:', err);
      setIsSubmitted(true);
      localStorage.removeItem('vleo_admission_form_progress');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Student', desc: 'Personal Info' },
      { number: 2, title: 'Parents', desc: 'Contact Details' },
      { number: 3, title: 'Academic', desc: 'Past & Hobbies' },
      { number: 4, title: 'Review', desc: 'Submit Request' }
    ];

    return (
      <div className="w-full py-6">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => {
            const isActive = currentStep === s.number;
            const isCompleted = currentStep > s.number;
            return (
              <React.Fragment key={s.number}>
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-1 relative">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 font-bold border-2 ${
                      isCompleted 
                        ? 'bg-[#4B8B77] border-[#4B8B77] text-white' 
                        : isActive 
                        ? 'bg-[#D9A441] border-[#D9A441] text-white shadow-md shadow-[#D9A441]/20' 
                        : 'bg-white border-[#3B231A]/20 text-[#3B231A]/40'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : s.number}
                  </div>
                  
                  <span className={`text-[11px] font-bold mt-2 tracking-tight ${isActive ? 'text-[#3B231A]' : 'text-[#3B231A]/60'}`}>
                    {s.title}
                  </span>
                  <span className="text-[9px] text-[#3B231A]/40 hidden md:block mt-0.5 uppercase font-mono">
                    {s.desc}
                  </span>
                </div>

                {/* Progress bar line connecting steps */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-[2px] bg-[#3B231A]/10 relative -top-3">
                    <div 
                      className="absolute top-0 left-0 h-full bg-[#4B8B77] transition-all duration-500"
                      style={{ width: currentStep > idx + 1 ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section 
      id="admission-registration-section" 
      className="bg-[#F8F5F0] py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden font-sans text-[#3B231A]"
    >
      {/* Decorative Traditional Element: Lotus / Palms Watermark */}
      <div className="absolute top-10 left-10 opacity-5 pointer-events-none hidden lg:block select-none">
        <Bell className="w-40 h-40" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none hidden lg:block select-none">
        <Trees className="w-40 h-40" />
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center space-x-3 text-[#D9A441] bg-[#D9A441]/10 px-4 py-2 rounded-full border border-[#D9A441]/20">
            <Feather className="w-4 h-4" />
            <span className="text-xs uppercase font-bold tracking-widest font-mono">Akshara Admissions Portal</span>
            <BookOpen className="w-4 h-4" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight">
            Begin Your Child's Journey With Us
          </h2>
          
          <p className="text-sm md:text-base text-[#3B231A]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Register your interest for admission at Vivekanandha School and our admissions team will guide you through every step.
          </p>

          <div className="flex justify-center pt-2">
            <div className="flex items-center space-x-2 text-xs text-[#4B8B77] font-semibold bg-[#4B8B77]/10 px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Premium Classical Education Since 1991</span>
            </div>
          </div>
        </div>

        {/* Wizard Form Card */}
        <div className="bg-white rounded-[24px] border border-[#3B231A]/10 shadow-xl overflow-hidden relative">
          
          {/* Draft Notification / Status Line */}
          <div className="bg-[#3B231A] text-[#F8F5F0]/90 px-6 py-2.5 flex justify-between items-center text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#D9A441] animate-ping" />
              <span className="font-mono uppercase font-bold text-[10px] tracking-wider">Admissions desk is active</span>
            </div>
            <div className="text-[10px] font-mono text-[#D9A441] italic">
              {autoSaveMsg || 'Progress auto-saves to browser storage'}
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-6">
            
            {/* Step Indicator */}
            {!isSubmitted && renderStepIndicator()}

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success Screen */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 px-4 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-[#4B8B77]/10 border border-[#4B8B77]/20 rounded-full flex items-center justify-center mx-auto text-[#4B8B77] relative">
                    <CheckCircle className="w-10 h-10" />
                    <motion.div 
                      className="absolute inset-0 rounded-full border-4 border-[#4B8B77]/30"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-[#3B231A]">
                      Application Filed Successfully!
                    </h3>
                    <p className="text-sm text-[#3B231A]/80 font-light max-w-md mx-auto leading-relaxed">
                      Thank you for trusting Vivekanandha Matriculation School. We have generated a premium admission reference ticket for <strong>{formData.studentName}</strong>.
                    </p>
                  </div>

                  <div className="bg-[#F8F5F0] p-6 rounded-2xl border border-[#3B231A]/10 max-w-lg mx-auto text-left space-y-3 font-sans">
                    <div className="flex justify-between items-center pb-2 border-b border-[#3B231A]/10 text-xs text-[#3B231A]/60">
                      <span>REFERENCE TICKET</span>
                      <span className="font-mono font-bold text-[#D9A441]">VMS-2027-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                    <div className="text-sm space-y-1.5 font-light">
                      <p>👦 <strong className="font-semibold">Student:</strong> {formData.studentName}</p>
                      <p>🏫 <strong className="font-semibold">Applied Class:</strong> {formData.applyingClass}</p>
                      <p>📱 <strong className="font-semibold">Primary contact:</strong> {formData.mobileNumber}</p>
                      <p>📧 <strong className="font-semibold">Primary email:</strong> {formData.emailAddress}</p>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs text-[#4B8B77] font-semibold tracking-wider uppercase">
                    ⭐️ Admissions Team will contact you within 24 hours.
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#D9A441] border border-[#D9A441]/30 hover:border-[#D9A441] px-5 py-2.5 rounded-full hover:bg-[#D9A441]/5 transition-colors uppercase tracking-wider"
                    >
                      <span>File Another Admission Request</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Step-by-Step Form Content */
                <form key="step-form" onSubmit={handleSubmit} className="space-y-8">
                  
                  {currentStep === 1 && (
                    /* Step 1: Student Information */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: -20 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-[#3B231A]/10 pb-3">
                        <h3 className="text-lg font-serif font-black flex items-center gap-2">
                          <span className="text-[#D9A441]">👦</span> Student Information
                        </h3>
                        <p className="text-xs text-[#3B231A]/60">Provide the physical birth metrics and identity of your child.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Student Name */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#D9A441]" />
                            Student Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={formData.studentName}
                              onChange={(e) => handleFieldChange('studentName', e.target.value)}
                              placeholder="e.g. Sanjay Swaminathan"
                              className={`w-full bg-[#F8F5F0] border ${errors.studentName ? 'border-red-500' : 'border-[#3B231A]/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light transition-all`}
                            />
                            {formData.studentName.trim().length > 2 && !errors.studentName && (
                              <CheckCircle className="w-4 h-4 text-[#4B8B77] absolute right-3 top-3.5" />
                            )}
                          </div>
                          {errors.studentName && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.studentName}</p>
                          )}
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                            Date of Birth <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => handleFieldChange('dob', e.target.value)}
                            className={`w-full bg-[#F8F5F0] border ${errors.dob ? 'border-red-500' : 'border-[#3B231A]/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light transition-all`}
                          />
                          {errors.dob && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.dob}</p>
                          )}
                        </div>

                        {/* Gender Selection */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#D9A441]" />
                            Gender <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['Male', 'Female', 'Other'].map((g) => (
                              <button
                                key={g}
                                type="button"
                                onClick={() => handleFieldChange('gender', g)}
                                className={`py-3 text-xs rounded-xl border font-bold transition-all ${
                                  formData.gender === g
                                    ? 'bg-[#4B8B77] border-[#4B8B77] text-white shadow-sm'
                                    : 'bg-[#F8F5F0] border-[#3B231A]/15 text-[#3B231A]/70 hover:bg-[#3B231A]/5'
                                }`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                          {errors.gender && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.gender}</p>
                          )}
                        </div>

                        {/* Applying For Class */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-[#D9A441]" />
                            Applying For Class <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.applyingClass}
                            onChange={(e) => handleFieldChange('applyingClass', e.target.value)}
                            className={`w-full bg-[#F8F5F0] border ${errors.applyingClass ? 'border-red-500' : 'border-[#3B231A]/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-medium transition-all`}
                          >
                            <option value="">-- Choose Target Class --</option>
                            {CLASS_OPTIONS.map((cls) => (
                              <option key={cls} value={cls}>{cls}</option>
                            ))}
                          </select>
                          {errors.applyingClass && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.applyingClass}</p>
                          )}
                        </div>

                        {/* Student Photo Upload */}
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-[#D9A441]" />
                            Student Photo Upload
                          </label>
                          
                          <div 
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-6 transition-all text-center cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                              dragActive 
                                ? 'border-[#D9A441] bg-[#D9A441]/5' 
                                : formData.studentPhoto 
                                ? 'border-[#4B8B77] bg-[#4B8B77]/5' 
                                : 'border-[#3B231A]/20 bg-[#F8F5F0] hover:bg-[#3B231A]/5'
                            }`}
                          >
                            <input 
                              ref={fileInputRef}
                              type="file" 
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            {formData.studentPhoto ? (
                              <div className="space-y-3">
                                <img 
                                  src={formData.studentPhoto} 
                                  alt="Student Thumbnail" 
                                  className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-[#4B8B77]"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="text-xs font-semibold text-[#4B8B77] flex items-center justify-center gap-1">
                                  <Check className="w-4 h-4" /> Photo Captured Successfully!
                                </div>
                                <span className="text-[10px] text-[#3B231A]/50 underline hover:text-red-500 transition-colors">
                                  Click or Drag to replace
                                </span>
                              </div>
                            ) : (
                              <>
                                <div className="p-3 bg-white rounded-full shadow-sm text-[#3B231A]/50">
                                  <Camera className="w-6 h-6 text-[#D9A441]" />
                                </div>
                                <p className="text-sm font-semibold">Drag & Drop student photo or <span className="text-[#D9A441] underline">Browse</span></p>
                                <p className="text-[10px] text-[#3B231A]/50">PNG, JPG or JPEG (Max 2MB file size for visual index card)</p>
                              </>
                            )}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    /* Step 2: Parent Information */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: -20 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-[#3B231A]/10 pb-3">
                        <h3 className="text-lg font-serif font-black flex items-center gap-2">
                          <span className="text-[#D9A441]">👨‍👩‍👧</span> Parent Information
                        </h3>
                        <p className="text-xs text-[#3B231A]/60">Provide contact points for emergency communications and billing updates.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Father Name */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#D9A441]" />
                            Father's Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.fatherName}
                            onChange={(e) => handleFieldChange('fatherName', e.target.value)}
                            placeholder="e.g. Swaminathan G"
                            className={`w-full bg-[#F8F5F0] border ${errors.fatherName ? 'border-red-500' : 'border-[#3B231A]/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light transition-all`}
                          />
                          {errors.fatherName && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.fatherName}</p>
                          )}
                        </div>

                        {/* Mother Name */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#D9A441]" />
                            Mother's Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.motherName}
                            onChange={(e) => handleFieldChange('motherName', e.target.value)}
                            placeholder="e.g. Radha Swaminathan"
                            className={`w-full bg-[#F8F5F0] border ${errors.motherName ? 'border-red-500' : 'border-[#3B231A]/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light transition-all`}
                          />
                          {errors.motherName && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.motherName}</p>
                          )}
                        </div>

                        {/* Mobile Number */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#D9A441]" />
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            inputMode="tel"
                            value={formData.mobileNumber}
                            onChange={(e) => handleFieldChange('mobileNumber', e.target.value)}
                            placeholder="e.g. 9876543210"
                            className={`w-full bg-[#F8F5F0] border ${errors.mobileNumber ? 'border-red-500' : 'border-[#3B231A]/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light transition-all`}
                          />
                          {errors.mobileNumber && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.mobileNumber}</p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#D9A441]" />
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            inputMode="email"
                            value={formData.emailAddress}
                            onChange={(e) => handleFieldChange('emailAddress', e.target.value)}
                            placeholder="e.g. parent@example.com"
                            className={`w-full bg-[#F8F5F0] border ${errors.emailAddress ? 'border-red-500' : 'border-[#3B231A]/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light transition-all`}
                          />
                          {errors.emailAddress && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.emailAddress}</p>
                          )}
                        </div>

                        {/* Residential Address */}
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Home className="w-3.5 h-3.5 text-[#D9A441]" />
                            Residential Address <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            rows={3}
                            value={formData.residentialAddress}
                            onChange={(e) => handleFieldChange('residentialAddress', e.target.value)}
                            placeholder="e.g. 14, West Car Street, Elayampalayam, Tiruchengode, Namakkal, Tamil Nadu - 637205"
                            className={`w-full bg-[#F8F5F0] border ${errors.residentialAddress ? 'border-red-500' : 'border-[#3B231A]/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light resize-none transition-all`}
                          />
                          {errors.residentialAddress && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.residentialAddress}</p>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    /* Step 3: Academic Details */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: -20 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-[#3B231A]/10 pb-3">
                        <h3 className="text-lg font-serif font-black flex items-center gap-2">
                          <span className="text-[#D9A441]">🏫</span> Academic Details
                        </h3>
                        <p className="text-xs text-[#3B231A]/60">Provide historical school records and special talents to help us tailor early tutoring.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Previous School */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#D9A441]" />
                            Previous School (if any)
                          </label>
                          <input
                            type="text"
                            value={formData.previousSchool}
                            onChange={(e) => handleFieldChange('previousSchool', e.target.value)}
                            placeholder="e.g. Little Angels Nursery"
                            className="w-full bg-[#F8F5F0] border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light"
                          />
                        </div>

                        {/* Current Grade */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#D9A441]" />
                            Current Grade / Percentage
                          </label>
                          <input
                            type="text"
                            value={formData.currentGrade}
                            onChange={(e) => handleFieldChange('currentGrade', e.target.value)}
                            placeholder="e.g. UKG / 92% A+"
                            className="w-full bg-[#F8F5F0] border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light"
                          />
                        </div>

                        {/* Special Achievements */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-[#D9A441]" />
                            Special Achievements
                          </label>
                          <input
                            type="text"
                            value={formData.specialAchievements}
                            onChange={(e) => handleFieldChange('specialAchievements', e.target.value)}
                            placeholder="e.g. 1st Place in district coloring contest"
                            className="w-full bg-[#F8F5F0] border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light"
                          />
                        </div>

                        {/* Child Interests */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 flex items-center gap-1.5">
                            <Palette className="w-3.5 h-3.5 text-[#D9A441]" />
                            Child Interests / Hobbies
                          </label>
                          <input
                            type="text"
                            value={formData.childInterests}
                            onChange={(e) => handleFieldChange('childInterests', e.target.value)}
                            placeholder="e.g. Painting, Clay sculpting, Storytelling"
                            className="w-full bg-[#F8F5F0] border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light"
                          />
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    /* Step 4: Review and Submit */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: -20 }}
                      className="space-y-8"
                    >
                      <div className="border-b border-[#3B231A]/10 pb-3">
                        <h3 className="text-lg font-serif font-black flex items-center gap-2">
                          <span className="text-[#D9A441]">📝</span> Additional Details & Review
                        </h3>
                        <p className="text-xs text-[#3B231A]/60">Select services and review your data before filing the official registration.</p>
                      </div>

                      {/* Optional Services */}
                      <div className="bg-[#F8F5F0] p-6 rounded-2xl border border-[#3B231A]/10 space-y-4">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B231A]/60">Requested School Services</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          {/* Transport Toggle */}
                          <label className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#3B231A]/10 cursor-pointer hover:border-[#D9A441] transition-colors select-none">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">🚌 School Transport Bus</span>
                              <span className="text-[10px] text-[#3B231A]/50">Check if daily route pick-up is needed</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={formData.transportRequired}
                              onChange={(e) => handleFieldChange('transportRequired', e.target.checked)}
                              className="w-5 h-5 accent-[#4B8B77] cursor-pointer"
                            />
                          </label>

                          {/* Hostel Toggle */}
                          <label className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#3B231A]/10 cursor-pointer hover:border-[#D9A441] transition-colors select-none">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">🍱 Secure Campus Hostel</span>
                              <span className="text-[10px] text-[#3B231A]/50">Requires residential lodging facility</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={formData.hostelRequired}
                              onChange={(e) => handleFieldChange('hostelRequired', e.target.checked)}
                              className="w-5 h-5 accent-[#4B8B77] cursor-pointer"
                            />
                          </label>

                        </div>

                        {/* Additional Notes */}
                        <div className="space-y-1.5 pt-2">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/60">
                            Additional Notes or Custom Request
                          </label>
                          <textarea
                            rows={2}
                            value={formData.additionalNotes}
                            onChange={(e) => handleFieldChange('additionalNotes', e.target.value)}
                            placeholder="Mention sibling records, fee query preference, scheduling a physical tour on a Saturday, etc..."
                            className="w-full bg-white border border-[#3B231A]/15 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 text-[#3B231A] font-light resize-none"
                          />
                        </div>
                      </div>

                      {/* Detailed Summary */}
                      <div className="border border-[#3B231A]/10 rounded-2xl overflow-hidden text-xs">
                        <div className="bg-[#3B231A] text-white px-4 py-3 font-serif font-bold tracking-wide flex justify-between items-center">
                          <span>Review Registration Sheet</span>
                          <span className="text-[10px] font-mono text-[#D9A441]">VMS Admissions 2027</span>
                        </div>
                        
                        <div className="p-4 md:p-6 bg-[#F8F5F0]/50 divide-y divide-[#3B231A]/10 space-y-3 font-light">
                          
                          {/* Student */}
                          <div className="pt-1 grid grid-cols-1 md:grid-cols-3 gap-y-1 md:gap-x-4">
                            <span className="font-semibold text-[#3B231A]/60 uppercase tracking-wider font-mono text-[9px]">👦 Student Name:</span>
                            <span className="col-span-2 font-bold text-sm text-[#3B231A]">{formData.studentName}</span>
                          </div>

                          {/* DOB & Gender */}
                          <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-y-1 md:gap-x-4">
                            <span className="font-semibold text-[#3B231A]/60 uppercase tracking-wider font-mono text-[9px]">🎂 DoB & Class:</span>
                            <span className="col-span-2 text-[#3B231A]">
                              {formData.dob} — Applying for <strong className="font-bold text-[#D9A441]">{formData.applyingClass}</strong> ({formData.gender})
                            </span>
                          </div>

                          {/* Parents */}
                          <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-y-1 md:gap-x-4">
                            <span className="font-semibold text-[#3B231A]/60 uppercase tracking-wider font-mono text-[9px]">👨‍👩‍👦 Parents:</span>
                            <span className="col-span-2 text-[#3B231A]">
                              Father: {formData.fatherName} | Mother: {formData.motherName}
                            </span>
                          </div>

                          {/* Contact */}
                          <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-y-1 md:gap-x-4">
                            <span className="font-semibold text-[#3B231A]/60 uppercase tracking-wider font-mono text-[9px]">📱 Contact Points:</span>
                            <span className="col-span-2 text-[#3B231A]">
                              Phone: <strong className="font-bold">{formData.mobileNumber}</strong> | Email: {formData.emailAddress}
                            </span>
                          </div>

                          {/* Address */}
                          <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-y-1 md:gap-x-4">
                            <span className="font-semibold text-[#3B231A]/60 uppercase tracking-wider font-mono text-[9px]">🏠 Address:</span>
                            <span className="col-span-2 text-[#3B231A] italic">{formData.residentialAddress}</span>
                          </div>

                          {/* Academics */}
                          <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-y-1 md:gap-x-4">
                            <span className="font-semibold text-[#3B231A]/60 uppercase tracking-wider font-mono text-[9px]">🏫 Past Academy:</span>
                            <span className="col-span-2 text-[#3B231A]">
                              {formData.previousSchool ? `${formData.previousSchool} (${formData.currentGrade || 'N/A'})` : 'No formal school history recorded.'}
                            </span>
                          </div>

                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between border-t border-[#3B231A]/10 pt-6">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#3B231A]/60 hover:text-[#3B231A] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous Step</span>
                      </button>
                    ) : (
                      <div className="w-10" />
                    )}

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-[#3B231A] hover:bg-[#2A1812] text-white font-mono font-bold py-3 px-6 rounded-full transition-all duration-300 uppercase text-xs tracking-wider flex items-center space-x-2 shadow-md shadow-[#3B231A]/10"
                      >
                        <span>Continue Registration</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="text-center w-full md:w-auto">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#D9A441] hover:bg-[#C28E2E] text-white font-mono font-black py-4 px-10 rounded-full transition-all duration-300 uppercase text-xs tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-[#D9A441]/30 hover:scale-[1.02]"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Filing Application...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Admission Application</span>
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                        <p className="text-[10px] text-[#3B231A]/50 mt-2 italic font-mono">
                          Admissions Team will contact you within 24 hours.
                        </p>
                      </div>
                    )}
                  </div>

                </form>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
