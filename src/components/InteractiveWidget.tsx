import React, { useState } from 'react';
import { curriculumMilestones } from '../data';
import { Check, Calendar, Mail, Smile, Compass, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveWidgetProps {
  isAdmissionsOpen: boolean;
  onCloseAdmissions: () => void;
}

export function CurriculumWidget() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const milestone = curriculumMilestones[activeTab];

  return (
    <section id="curriculum-interactive" className="bg-[#F5F1EB] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto bg-white border border-[#3B231A]/10 rounded-[36px] p-8 md:p-14 shadow-lg space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#E78F68]">Interactive Program Guide</p>
          <h2 className="text-3xl font-serif font-bold text-[#3B231A] tracking-tight">
            Explore our custom Montessori path
          </h2>
          <p className="text-sm text-[#3B231A]/70 font-sans font-light">
            Select an academic tier below to preview how our curated environments adapt as children mature.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {curriculumMilestones.map((item, index) => (
            <button
              key={item.ageGroup}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === index
                  ? 'bg-[#3B231A] text-white shadow-md'
                  : 'bg-[#F5F1EB] text-[#3B231A] hover:bg-[#3B231A]/5'
              }`}
            >
              {item.ageGroup}
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
          
          {/* Detailed Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-serif font-semibold text-[#E78F68] uppercase tracking-wider">CORE FOCUS</span>
              <h3 className="text-2xl font-serif font-bold text-[#3B231A]">{milestone.focus}</h3>
              <p className="text-sm text-[#3B231A]/80 font-sans font-light leading-relaxed">
                {milestone.description}
              </p>
            </div>

            {/* Three key pillars */}
            <div className="space-y-4 pt-2">
              {[milestone.pillar1, milestone.pillar2, milestone.pillar3].map((pillar, i) => (
                <div key={pillar.title} className="flex items-start space-x-3.5 bg-[#F5F1EB]/40 p-4 rounded-2xl border border-[#3B231A]/5">
                  <div className="w-6 h-6 bg-[#4B8B77] rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#3B231A]">{pillar.title}</h4>
                    <p className="text-xs text-[#3B231A]/70 font-sans font-light mt-0.5">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Schedule Card Previewer (5 Cols) */}
          <div className="lg:col-span-5 bg-[#F5F1EB] rounded-[28px] p-8 border border-[#3B231A]/10 space-y-6">
            <div className="flex items-center justify-between border-b border-[#3B231A]/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3B231A]/70">Sample Daily Flow</span>
              <span className="text-[10px] bg-[#E78F68]/20 text-[#E78F68] font-bold px-2.5 py-1 rounded-full">Atelier View</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-[#3B231A]/5">
                <span className="font-semibold opacity-60">08:30 AM</span>
                <span className="font-medium text-[#3B231A]">Gentle Greeting & Outdoor Gathering</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#3B231A]/5">
                <span className="font-semibold opacity-60">09:15 AM</span>
                <span className="font-medium text-[#4B8B77] font-semibold">Uninterrupted Work Cycle</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#3B231A]/5 font-semibold text-[#E78F68]">
                <span className="opacity-80">10:00 AM</span>
                <span>{milestone.dailyHighlight.split(' — ')[1]}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#3B231A]/5">
                <span className="font-semibold opacity-60">12:00 PM</span>
                <span className="font-medium text-[#3B231A]">Organic Lunch & Garden Harvest</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold opacity-60">02:30 PM</span>
                <span className="font-medium text-[#3B231A]">Sensory Synthesis & Farewell Circle</span>
              </div>
            </div>

            <div className="bg-white/70 p-4 rounded-xl border border-[#3B231A]/5 text-center">
              <p className="text-[11px] font-sans font-light text-[#3B231A]/85">
                Each child’s cycle is recorded in real time and available to parents through our custom Vivekanandha portal.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export function AdmissionsDrawer({ isAdmissionsOpen, onCloseAdmissions }: InteractiveWidgetProps) {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    childName: '',
    childAge: 'toddler',
    desiredDate: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isAdmissionsOpen && (
        <div id="admissions-modal-backdrop" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Black Translucent Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onCloseAdmissions}
            className="fixed inset-0 bg-black"
          />

          {/* Drawer / Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative bg-[#F5F1EB] max-w-lg w-full rounded-[32px] p-8 md:p-10 shadow-2xl border border-[#3B231A]/15 z-10 max-h-[90vh] overflow-y-auto text-[#3B231A]"
          >
            {/* Close Button */}
            <button
              onClick={onCloseAdmissions}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white border border-[#3B231A]/10 flex items-center justify-center hover:bg-[#3B231A] hover:text-[#F5F1EB] transition-colors"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Heading */}
                <div className="space-y-2 pr-8">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#E78F68] flex items-center">
                    <Compass className="w-4 h-4 mr-1 animate-spin" />
                    Admissions Form 2027-2028
                  </span>
                  <h3 className="text-2xl font-serif font-bold">Apply for Admissions</h3>
                  <p className="text-xs opacity-75">
                    Join the school for ambitious minds. Complete our form to submit your application for the 2027-2028 academic year.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Parent Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold block uppercase tracking-wider text-[#3B231A]/80">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Katherine Sterling"
                      className="w-full bg-white border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E78F68] transition-colors"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold block uppercase tracking-wider text-[#3B231A]/80">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.parentEmail}
                        onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                        placeholder="katherine@example.com"
                        className="w-full bg-white border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E78F68] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold block uppercase tracking-wider text-[#3B231A]/80">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        placeholder="(555) 019-2834"
                        className="w-full bg-white border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E78F68] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Child Name & Selected Age Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold block uppercase tracking-wider text-[#3B231A]/80">Child’s Name</label>
                      <input
                        type="text"
                        required
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                        placeholder="e.g. Liam"
                        className="w-full bg-white border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E78F68] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold block uppercase tracking-wider text-[#3B231A]/80">Age Group / Grade</label>
                      <select
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        className="w-full bg-white border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E78F68] transition-colors"
                      >
                        <option value="prekg">Pre KG</option>
                        <option value="lkg">LKG</option>
                        <option value="ukg">UKG</option>
                        <option value="grade12">Grade 1 - 2</option>
                        <option value="grade35">Grade 3 - 5</option>
                      </select>
                    </div>
                  </div>

                  {/* Desired Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold block uppercase tracking-wider text-[#3B231A]/80">Preferred Tour Date</label>
                    <input
                      type="date"
                      required
                      value={formData.desiredDate}
                      onChange={(e) => setFormData({ ...formData, desiredDate: e.target.value })}
                      className="w-full bg-white border border-[#3B231A]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E78F68] transition-colors"
                    />
                  </div>
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-[#E78F68] hover:bg-[#d07b53] text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300"
                >
                  <span>Submit Admissions Form</span>
                  <Send className="w-4 h-4" />
                </button>

              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-[#4B8B77] mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold">Application Registered!</h3>
                  <p className="text-sm text-[#3B231A]/85 max-w-sm mx-auto">
                    Thank you, <strong className="font-semibold">{formData.parentName}</strong>. We have registered your admissions inquiry for <strong className="font-semibold">{formData.childName}</strong>.
                  </p>
                  <p className="text-xs text-[#3B231A]/60">
                    A confirmation email and physical prospectus booklet have been dispatched to <strong className="font-semibold">{formData.parentEmail}</strong>.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      onCloseAdmissions();
                    }}
                    className="bg-[#3B231A] text-white font-semibold px-6 py-2.5 rounded-full hover:bg-[#E78F68] transition-colors text-sm"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
