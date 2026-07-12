import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Info, Calendar, FileText, HelpCircle, ArrowRight, Star, Sparkles } from 'lucide-react';

const ELIGIBILITY = [
  { grade: 'Pre KG', ageRange: '2.5 to 3.5 Years', cutoff: 'Must complete 2 years and 6 months by June 1st' },
  { grade: 'LKG', ageRange: '3.5 to 4.5 Years', cutoff: 'Must complete 3 years and 6 months by June 1st' },
  { grade: 'UKG', ageRange: '4.5 to 5.5 Years', cutoff: 'Must complete 4 years and 6 months by June 1st' },
  { grade: 'Grade 1', ageRange: '5.5 to 6.5 Years', cutoff: 'Must complete 5 years and 6 months by June 1st' },
  { grade: 'Grade 2 - 5', ageRange: '6.5 to 10.5 Years', cutoff: 'Valid Transfer Certificate (TC) from recognized boards' }
];

const DOCUMENTS = [
  'Original & Photocopy of Child\'s Birth Certificate',
  'Three recent passport size photographs of the Child',
  'One passport size photograph of the Mother and Father',
  'Photocopy of Parents\' Aadhaar Cards / Address Proof',
  'Original Transfer Certificate (TC) & Report Card (For Grade 1-5 only)',
  'Community Certificate (if applicable for state scholarship metrics)'
];

const STEPS = [
  {
    num: '01',
    title: 'School Visit or Virtual Query',
    desc: 'Schedule a visit to see our beautiful, child-safe campuses, look at our smart visual consoles, or call us directly.'
  },
  {
    num: '02',
    title: 'Form Submission',
    desc: 'Obtain the physical registration form from our office or initiate the request online. Submit along with required certificates.'
  },
  {
    num: '03',
    title: 'Joyful Child Interaction',
    desc: 'Our academic principal conducts a stress-free play interaction with the child to evaluate sensory readiness.'
  },
  {
    num: '04',
    title: 'Admission Confirmation',
    desc: 'Upon validation of eligibility, pay the standard developmental contribution fee to confirm your seat.'
  }
];

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    phone: '',
    email: '',
    grade: 'LKG',
    msg: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.childName || !formData.phone) {
      alert('Please fill out the required fields (Parent Name, Child Name, Phone).');
      return;
    }
    // Simulate API call
    setFormSubmitted(true);
  };

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
            Join Our Family
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Admissions Open <span className="text-[#E78F68] italic font-normal">2027 - 2028</span>
          </h1>
          <p className="text-sm md:text-base text-[#F5F1EB]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to our transparent and simple admissions system. Find all age cutoffs, mandatory registration certificates, and fee inquiry options below.
          </p>
        </div>
      </div>

      {/* Symmetrical Two-Column: Steps vs Documents */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Step-by-Step Admissions Process (7 columns) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Step-by-Step Guide</span>
            <h2 className="text-3xl font-serif font-bold">The Admission Process</h2>
            <p className="text-sm text-[#3B231A]/70 font-sans font-light">
              We make school enrollment transparent, friendly, and stress-free for both parents and young applicants.
            </p>
          </div>

          <div className="relative border-l-2 border-[#3B231A]/10 ml-4 pl-8 space-y-8">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="relative">
                {/* Number node */}
                <div className="absolute -left-[49px] top-0.5 w-8 h-8 rounded-full bg-[#E78F68] border-4 border-[#F5F1EB] flex items-center justify-center text-white text-xs font-mono font-bold shadow-sm">
                  {idx + 1}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-serif font-bold text-[#3B231A]">{step.title}</h4>
                  <p className="text-sm text-[#3B231A]/85 font-sans font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents checklist (5 columns) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[32px] p-8 border border-[#3B231A]/10 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#3B231A]/5 pb-4">
              <FileText className="w-6 h-6 text-[#E78F68]" />
              <h3 className="text-xl font-serif font-bold">Required Documents</h3>
            </div>
            
            <p className="text-xs text-[#3B231A]/60 uppercase font-mono tracking-widest">
              Please carry duplicates & originals
            </p>

            <ul className="space-y-4">
              {DOCUMENTS.map((doc, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-[#3B231A]/90 leading-normal">
                  <CheckCircle className="w-4 h-4 text-[#198C52] shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#F5F1EB] p-4 rounded-xl border border-[#3B231A]/5 text-xs text-[#3B231A]/70 flex items-start space-x-2">
              <Info className="w-4 h-4 text-[#E78F68] shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Original Birth Certificate and TC will be returned instantly after physical cross-validation by the Registrar.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vijayadasami Admissions Special Highlight */}
      <div className="bg-[#EAE4D9] py-16 border-y border-[#3B231A]/10">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#FF8A3D]/10 border border-[#FF8A3D]/20 text-[#FF8A3D] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Star className="w-4 h-4 animate-spin duration-1000" />
            <span>Festive Auspicious Admissions</span>
            <Star className="w-4 h-4" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3B231A] tracking-tight">
            Vijayadasami Special Admissions 2027
          </h2>
          
          <p className="text-sm md:text-base text-[#3B231A]/85 max-w-3xl mx-auto leading-relaxed font-light">
            Vijayadasami is traditionally hailed as the most auspicious occasion to initiate a child's educational journey (Akshara Abhyasam / Vidyarambham). At Vivekanandha School, we celebrate this heritage by opening special mid-term batches for Pre-KG and LKG. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4 text-left">
            <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-2">
              <h4 className="font-serif font-bold text-[#FF8A3D]">Vidyarambham Ritual</h4>
              <p className="text-xs text-[#3B231A]/85 font-light leading-relaxed">
                Parents can guide their child's finger to write their first letter on auspicious raw rice grains under our peaceful guidance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-2">
              <h4 className="font-serif font-bold text-[#198C52]">Zero Registration Fees</h4>
              <p className="text-xs text-[#3B231A]/85 font-light leading-relaxed">
                To promote foundational literacy, we waive all standard file registration and application charges during the Vijayadasami week.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm space-y-2">
              <h4 className="font-serif font-bold text-[#2563EB]">Welcome Learner Kit</h4>
              <p className="text-xs text-[#3B231A]/85 font-light leading-relaxed">
                Every child admitted during this window receives a beautiful, handmade Montessori slate board and writing chalk free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Age Cutoff Matrix */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Age Requirements</span>
          <h2 className="text-3xl font-serif font-bold">Eligibility Criteria</h2>
          <p className="text-sm text-[#3B231A]/70 max-w-lg mx-auto font-sans font-light">
            We follow strict statutory state directives on age cutoffs to ensure uniform cognitive development among peers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[24px] border border-[#3B231A]/15 shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#3B231A] text-[#F5F1EB] font-serif font-bold text-sm">
                  <th className="p-4 md:p-5">Grade / Program</th>
                  <th className="p-4 md:p-5">Eligible Age Bracket</th>
                  <th className="p-4 md:p-5">Cutoff Metrics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3B231A]/10 text-xs md:text-sm text-[#3B231A]/90 font-light">
                {ELIGIBILITY.map((row) => (
                  <tr key={row.grade} className="hover:bg-[#F5F1EB]/50 transition-colors">
                    <td className="p-4 md:p-5 font-bold font-serif">{row.grade}</td>
                    <td className="p-4 md:p-5">{row.ageRange}</td>
                    <td className="p-4 md:p-5 text-[#3B231A]/75">{row.cutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fee Enquiry Form Section */}
      <div id="fee-enquiry" className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#3B231A]/10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center space-x-2">
            <span className="h-0.5 w-8 bg-[#E78F68]"></span>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#E78F68]">Quick Query</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Fee & Enrollment Enquiry
          </h2>
          <p className="text-sm md:text-base text-[#3B231A]/80 font-light leading-relaxed">
            Fill out this quick form with your child's age group and contact details. Our admissions registrar will instantly dispatch the structured fee catalog, transport routes, and school prospectus directly to your mobile via WhatsApp or email.
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3 text-sm">
              <Calendar className="w-5 h-5 text-[#E78F68]" />
              <span>Response Turnaround: Under 2 Hours</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <HelpCircle className="w-5 h-5 text-[#E78F68]" />
              <span>Admissions Desk: +91 94432 10815</span>
            </div>
          </div>
        </div>

        {/* Interactive Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#3B231A]/10 shadow-sm">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="admission-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                        Parent / Guardian Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="e.g. S. Ramkumar"
                        className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                        Child's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="childName"
                        required
                        value={formData.childName}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Ramkumar"
                        className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                        WhatsApp / Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. ramkumar@gmail.com"
                        className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                      Standard for Entry <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-medium"
                    >
                      <option value="Pre KG">Pre KG (2.5+ Years)</option>
                      <option value="LKG">LKG (3.5+ Years)</option>
                      <option value="UKG">UKG (4.5+ Years)</option>
                      <option value="Grade 1">Grade 1 (5.5+ Years)</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                      Special Queries (Optional)
                    </label>
                    <textarea
                      name="msg"
                      rows={3}
                      value={formData.msg}
                      onChange={handleInputChange}
                      placeholder="Ask about school bus routes, term plans, hostel facilities, or book a physical tour date..."
                      className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF8A3D] hover:bg-[#e67425] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 uppercase text-xs tracking-wider font-mono flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Submit Admission Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 text-[#198C52] flex items-center justify-center mx-auto border border-green-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#3B231A]">Enquiry Logged Successfully!</h3>
                  <p className="text-sm text-[#3B231A]/70 max-w-sm mx-auto font-light">
                    Vanakkam <strong>{formData.parentName}</strong>. We have registered your request for child <strong>{formData.childName}</strong> (Grade {formData.grade}). 
                  </p>
                  <p className="text-xs text-[#3B231A]/50 bg-[#F5F1EB] p-3 rounded-lg max-w-md mx-auto font-mono">
                    A confirmation SMS & WhatsApp prospectus has been dispatched to <strong>{formData.phone}</strong>.
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          parentName: '',
                          childName: '',
                          phone: '',
                          email: '',
                          grade: 'LKG',
                          msg: '',
                        });
                      }}
                      className="text-xs font-mono text-[#E78F68] underline font-bold hover:text-[#d07b53]"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
