import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Admissions Inquiry',
    phone: '',
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
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
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
      {/* Banner */}
      <div className="relative overflow-hidden bg-[#3B231A] text-[#F5F1EB] py-20 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block bg-[#E78F68]/20 border border-[#E78F68]/30 text-[#E78F68] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Vanakkam
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Connect With <span className="text-[#E78F68] italic font-normal">Our Academy</span>
          </h1>
          <p className="text-sm md:text-base text-[#F5F1EB]/80 max-w-2xl mx-auto font-light leading-relaxed">
            We are eager to assist you. Reach out to our admissions office, schedule physical tours, or submit questions directly through the channels below.
          </p>
        </div>
      </div>

      {/* Symmetrical Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Details Cards (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Contact Details</span>
            <h2 className="text-3xl font-serif font-bold">Office Information</h2>
            <p className="text-sm text-[#3B231A]/70 font-sans font-light">
              Visit our primary school administrative hub or get in touch through our priority phone lines.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#E78F68]/10 text-[#E78F68] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3B231A] text-sm">School Address</h4>
                <p className="text-xs text-[#3B231A]/75 mt-1 leading-relaxed font-sans font-light">
                  Vivekanandha Nursery and Primary School,<br />
                  NH-47 Bypass Road, Avinashi Main Road,<br />
                  Coimbatore, Tamil Nadu — 641014, India.
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#198C52]/10 text-[#198C52] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3B231A] text-sm">Admissions Hotline</h4>
                <p className="text-xs text-[#3B231A]/75 mt-1 leading-relaxed font-sans font-light">
                  Principal Desk: +91 94432 10815<br />
                  Registrar Enquiry: +91 422 268 7747
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3B231A] text-sm">Official Email</h4>
                <p className="text-xs text-[#3B231A]/75 mt-1 leading-relaxed font-mono">
                  admissions@vivekanandha.edu.in<br />
                  office.vschool@gmail.com
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#3B231A]/10 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#3B231A] text-sm">Working Hours</h4>
                <div className="text-xs text-[#3B231A]/75 mt-1 leading-relaxed font-sans font-light space-y-1">
                  <p><strong>Monday – Friday:</strong> 8:30 AM – 4:00 PM</p>
                  <p><strong>Saturday:</strong> 8:30 AM – 12:30 PM (Enquiry Only)</p>
                  <p><strong>Sunday:</strong> Closed (Academic Holiday)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (7 columns) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#3B231A]/10 shadow-sm h-full flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold text-[#3B231A]">Send a Direct Message</h3>
                    <p className="text-xs text-[#3B231A]/60 font-sans font-light">
                      For parent queries, student transfer records, or general greetings.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. S. Ramkumar"
                        className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. ramkumar@gmail.com"
                        className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                        Subject of Inquiry
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-medium"
                      >
                        <option value="Admissions Inquiry">Admissions Inquiry</option>
                        <option value="Fees Structure">Fees Structure</option>
                        <option value="Parent Association">Parent Association</option>
                        <option value="Career Openings">Career Openings</option>
                        <option value="General Greetings">General Greetings</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-[#3B231A]/60">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your comprehensive question or request details here..."
                      className="w-full bg-[#F5F1EB] border border-[#3B231A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E78F68]/30 text-[#3B231A] font-light resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF8A3D] hover:bg-[#e67425] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 uppercase text-xs tracking-wider font-mono flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <span>Submit Direct Query</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-contact"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 text-[#198C52] flex items-center justify-center mx-auto border border-green-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#3B231A]">Message Sent Successfully!</h3>
                  <p className="text-sm text-[#3B231A]/70 max-w-sm mx-auto font-light">
                    Vanakkam <strong>{formData.name}</strong>. Thank you for reaching out to us. We have securely logged your <strong>{formData.subject}</strong>.
                  </p>
                  <p className="text-xs text-[#3B231A]/50 bg-[#F5F1EB] p-3 rounded-lg max-w-md mx-auto font-mono">
                    Our admin team will respond to <strong>{formData.email}</strong> within 1 working day.
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          subject: 'Admissions Inquiry',
                          phone: '',
                          message: '',
                        });
                      }}
                      className="text-xs font-mono text-[#E78F68] underline font-bold hover:text-[#d07b53]"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Google Maps Location Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E78F68]">Locate Us</span>
          <h2 className="text-3xl font-serif font-bold">Interactive Google Maps</h2>
          <p className="text-sm text-[#3B231A]/70 max-w-lg mx-auto font-sans font-light">
            Conveniently situated right beside the NH-47 Bypass Expressway, ensuring easy transport and school bus routing.
          </p>
        </div>

        {/* Real standard styled responsive Google Maps iframe */}
        <div className="w-full max-w-5xl mx-auto aspect-video max-h-[440px] bg-white p-3 rounded-[32px] border border-[#3B231A]/10 shadow-sm overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44154425338!2d76.88483254929845!3d11.01201452296155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f978647%3A0x2560a85076b1f237!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715456209802!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '20px' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location Map"
          />
        </div>
      </div>
    </motion.div>
  );
}
