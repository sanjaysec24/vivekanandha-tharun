import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from '../lib/router';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, PhoneCall } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    mobileNumber: '',
    emailAddress: '',
    gradeApplying: 'Pre KG',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.studentName || !formData.mobileNumber || !formData.emailAddress || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate premium submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F5F1EB] min-h-screen text-[#3B231A]"
    >
      {/* Page Header */}
      <div className="relative overflow-hidden pt-16 pb-12 px-6 md:px-12 text-center max-w-4xl mx-auto space-y-4">
        <span className="inline-block bg-[#E78F68]/15 border border-[#E78F68]/30 text-[#E78F68] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          GET IN TOUCH
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#3B231A]">
          Contact Vivekanandha School
        </h1>
        <p className="text-base md:text-lg text-[#3B231A]/80 max-w-2xl mx-auto font-sans font-light leading-relaxed">
          "We are always happy to help parents and students with admissions, academics and general enquiries."
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Address Card */}
          <div className="bg-[#FAF7F2] p-6 md:p-8 rounded-[24px] border-[1.5px] border-[#E6DCCF] shadow-sm flex items-start space-x-5 transition-all duration-300 hover:shadow-md flex-1">
            <div className="w-12 h-12 rounded-2xl bg-[#E78F68]/10 text-[#E78F68] flex items-center justify-center shrink-0 border border-[#E78F68]/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-[#3B231A] text-lg">School Address</h4>
              <p className="text-sm text-[#3B231A]/85 leading-relaxed font-sans font-normal">
                <strong>Vivekanandha School</strong><br />
                Vedapalayam Road,<br />
                Near Angalamman Kovil,<br />
                Uthiramerur,<br />
                Kanchipuram District,<br />
                Tamil Nadu - 603406
              </p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-[#FAF7F2] p-6 md:p-8 rounded-[24px] border-[1.5px] border-[#E6DCCF] shadow-sm flex items-start space-x-5 transition-all duration-300 hover:shadow-md flex-1">
            <div className="w-12 h-12 rounded-2xl bg-[#198C52]/10 text-[#198C52] flex items-center justify-center shrink-0 border border-[#198C52]/20">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-2 w-full">
              <h4 className="font-serif font-bold text-[#3B231A] text-lg">Phone Numbers</h4>
              <div className="text-sm text-[#3B231A]/85 leading-relaxed font-sans space-y-2">
                <div className="border-b border-[#E6DCCF]/50 pb-2">
                  <p className="text-xs font-semibold text-[#198C52] uppercase tracking-wider">Admissions Office</p>
                  <p className="text-base font-medium">+91 94445 47474</p>
                </div>
                <div className="border-b border-[#E6DCCF]/50 pb-2">
                  <p className="text-xs font-semibold text-[#3B231A]/60 uppercase tracking-wider">Principal Office</p>
                  <p className="text-base font-medium">+91 44 2727 4747</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#3B231A]/60 uppercase tracking-wider">Administration Office</p>
                  <p className="text-base font-medium">+91 44 2727 4848</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-[#FAF7F2] p-6 md:p-8 rounded-[24px] border-[1.5px] border-[#E6DCCF] shadow-sm flex items-start space-x-5 transition-all duration-300 hover:shadow-md flex-1">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 border border-[#2563EB]/20">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-[#3B231A] text-lg">Email Address</h4>
              <div className="text-sm text-[#3B231A]/85 leading-relaxed font-sans space-y-1">
                <p className="font-semibold text-[#2563EB]">admissions@vivekanandhaschool.edu.in</p>
                <p className="text-[#3B231A]/80">info@vivekanandhaschool.edu.in</p>
              </div>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="bg-[#FAF7F2] p-6 md:p-8 rounded-[24px] border-[1.5px] border-[#E6DCCF] shadow-sm flex items-start space-x-5 transition-all duration-300 hover:shadow-md flex-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-[#3B231A] text-lg">Working Hours</h4>
              <div className="text-sm text-[#3B231A]/85 leading-relaxed font-sans space-y-2">
                <div>
                  <span className="font-semibold">Monday - Friday</span>
                  <p className="text-sm text-[#3B231A]/70">8:30 AM - 5:00 PM</p>
                </div>
                <div>
                  <span className="font-semibold">Saturday</span>
                  <p className="text-sm text-[#3B231A]/70">9:00 AM - 1:00 PM</p>
                </div>
                <div>
                  <span className="font-semibold text-red-600">Sunday</span>
                  <p className="text-sm text-red-600/80">Holiday</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Enquiry Form Container */}
        <div className="lg:col-span-7">
          <div className="bg-[#FAF7F2] rounded-[28px] p-8 md:p-10 border-[1.5px] border-[#E6DCCF] shadow-sm h-full flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="enquiry-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2 border-b border-[#E6DCCF] pb-4">
                    <h3 className="text-2xl font-serif font-bold text-[#3B231A]">Interactive Enquiry Form</h3>
                    <p className="text-sm text-[#3B231A]/70 font-sans">
                      Fill out the form below to register an official inquiry with our administrative admissions desk.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Parent Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#3B231A]/70">
                        Parent Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="e.g. S. Ramkumar"
                        className="w-full bg-[#F5F1EB] border border-[#E6DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-medium transition-all"
                      />
                    </div>

                    {/* Student Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#3B231A]/70">
                        Student Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="e.g. R. Kavya"
                        className="w-full bg-[#F5F1EB] border border-[#E6DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Mobile Number */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#3B231A]/70">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        required
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 94445 47474"
                        className="w-full bg-[#F5F1EB] border border-[#E6DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-medium transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#3B231A]/70">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="emailAddress"
                        required
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        placeholder="e.g. ramkumar@gmail.com"
                        className="w-full bg-[#F5F1EB] border border-[#E6DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-medium transition-all"
                      />
                    </div>
                  </div>

                  {/* Grade Applying For */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#3B231A]/70">
                      Grade Applying For <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gradeApplying"
                      value={formData.gradeApplying}
                      onChange={handleInputChange}
                      className="w-full bg-[#F5F1EB] border border-[#E6DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-medium transition-all"
                    >
                      <option value="Pre KG">Pre KG</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#3B231A]/70">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share details about the student's prior academic history or any specific inquiries..."
                      className="w-full bg-[#F5F1EB] border border-[#E6DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-medium resize-none transition-all"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#E78F68] hover:bg-[#d47c55] text-white font-serif font-bold py-3.5 px-6 rounded-xl transition-all duration-300 uppercase text-xs tracking-wider flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    
                    <Link
                      to="/admissions"
                      className="flex-1 border-[1.5px] border-[#E6DCCF] hover:bg-[#F5F1EB] text-[#3B231A] font-serif font-bold py-3.5 px-6 rounded-xl transition-all duration-300 uppercase text-xs tracking-wider flex items-center justify-center space-x-2 text-center"
                    >
                      Apply for Admission
                    </Link>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#198C52]/10 text-[#198C52] flex items-center justify-center mx-auto border border-[#198C52]/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-[#3B231A]">Enquiry Logged Successfully!</h3>
                    <p className="text-sm text-[#3B231A]/70 max-w-sm mx-auto font-sans">
                      Thank you, <strong>{formData.parentName}</strong>, for contacting Vivekanandha School regarding <strong>{formData.gradeApplying}</strong> admission for <strong>{formData.studentName}</strong>.
                    </p>
                  </div>
                  
                  <div className="bg-[#F5F1EB] p-4 rounded-xl max-w-md mx-auto space-y-1 border border-[#E6DCCF] text-left">
                    <p className="text-xs font-semibold uppercase text-[#3B231A]/50 tracking-wider">Inquiry Summary</p>
                    <p className="text-sm text-[#3B231A]"><strong>Mobile:</strong> {formData.mobileNumber}</p>
                    <p className="text-sm text-[#3B231A]"><strong>Email:</strong> {formData.emailAddress}</p>
                  </div>

                  <p className="text-xs text-[#3B231A]/60 max-w-sm mx-auto">
                    Our dedicated admissions officer will connect with you via mobile and email within 1 working day.
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          parentName: '',
                          studentName: '',
                          mobileNumber: '',
                          emailAddress: '',
                          gradeApplying: 'Pre KG',
                          message: '',
                        });
                      }}
                      className="text-xs font-serif font-bold text-[#E78F68] underline hover:text-[#d47c55]"
                    >
                      Register another enquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Google Map Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 space-y-8">
        
        {/* Info Badge Above Map */}
        <div className="flex justify-center">
          <span className="inline-block bg-[#198C52]/10 border border-[#198C52]/20 text-[#198C52] text-xs font-bold px-4 py-2 rounded-full text-center tracking-wide max-w-2xl">
            "Located in the heart of Uthiramerur, serving families across Kanchipuram district."
          </span>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-3xl font-serif font-bold text-[#3B231A]">Find Us On Map</h2>
        </div>

        {/* Responsive Google Maps Container */}
        <div className="w-full max-w-5xl mx-auto h-[420px] bg-white p-2 rounded-[28px] border-[1.5px] border-[#E6DCCF] shadow-sm overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Vivekandha%20nursery%20%26%20primary%20school%2C%20JQ82%2BC7H%2C%20Uthiramerur%20Road%2C%20Uttiramerur%2C%20Tamil%20Nadu%20603406&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '20px' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location Map"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Admissions Help Banner */}
      <div className="bg-[#FAF7F2] border-t border-b border-[#E6DCCF] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3B231A]">
            Need help with admissions?
          </h3>
          <p className="text-sm md:text-base text-[#3B231A]/80 font-sans max-w-xl mx-auto">
            Our admissions team will guide you through every step of the process.
          </p>
          <a
            href="tel:+919444547474"
            className="inline-flex bg-[#198C52] hover:bg-[#157544] text-white font-serif font-bold py-3.5 px-8 rounded-xl transition-all duration-300 uppercase text-xs tracking-wider items-center space-x-2.5 shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Talk To Admissions Team</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
