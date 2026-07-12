import React from 'react';
import { Linkedin, Instagram, Twitter, MapPin, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="premium-footer" className="bg-[#3B231A] text-[#F5F1EB] pt-16 pb-8 px-6 md:px-12 border-t border-[#F5F1EB]/10 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Row 1: Directories Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-[#F5F1EB]/10">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#E78F68]">Programs</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F1EB]/70">
              <li><a href="#programs" className="hover:text-white transition-colors">For Pre-School</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">For Kindergarten</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">For Primary Academy</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Forest Schooling</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#EAB308]">Institution</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F1EB]/70">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Academics</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Faculty Directory</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#5B92E5]">Admissions</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F1EB]/70">
              <li><a href="#admissions" className="hover:text-white transition-colors">Tuition & Plans</a></li>
              <li><a href="#admissions" className="hover:text-white transition-colors">Admissions Guide</a></li>
              <li><a href="#admissions" className="hover:text-white transition-colors">Private Tour Booking</a></li>
              <li><a href="#admissions" className="hover:text-white transition-colors">Scholarship Criteria</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-400">Resources</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F1EB]/70">
              <li><a href="#about" className="hover:text-white transition-colors">Press & Media</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Parent Council Portal</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Medical Center Info</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Transportation Paths</a></li>
            </ul>
          </div>

          {/* Column 5: Social Media Profiles */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">Social Registry</h4>
            <div className="flex space-x-3.5">
              <a href="#" className="w-9 h-9 rounded-full bg-[#F5F1EB]/5 flex items-center justify-center hover:bg-[#E78F68] hover:text-white transition-all duration-300" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#F5F1EB]/5 flex items-center justify-center hover:bg-[#E78F68] hover:text-white transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#F5F1EB]/5 flex items-center justify-center hover:bg-[#E78F68] hover:text-white transition-all duration-300" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-[#F5F1EB]/50 font-sans leading-relaxed">
              *Follow our weekly forest chronicles & student highlights.
            </p>
          </div>

        </div>

        {/* Row 2: Secondary Address and Insights panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-[#F5F1EB]/10">
          
          {/* Logo brand block */}
          <div className="lg:col-span-4 space-y-2">
            <a href="#" className="text-3xl font-serif font-bold text-white tracking-tight flex items-center space-x-1.5">
              <span>Lindenwood</span>
              <span className="w-3 h-3 rounded-full bg-[#E78F68]" />
            </a>
            <p className="text-xs text-[#F5F1EB]/60 font-sans font-light">
              Nurturing exceptional childhood brilliance since 1994.
            </p>
          </div>

          {/* Action boxes */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-[#F5F1EB]/90">
            
            {/* Box 1 */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#E78F68] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-white">Find a School</h5>
                <p className="text-[11px] text-[#F5F1EB]/60 mt-0.5">24 Pinecone Ave, Hillsborough, CA</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#EAB308] shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-white">Offer Insights</h5>
                <p className="text-[11px] text-[#F5F1EB]/60 mt-0.5">feedback@lindenwood.edu</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#5B92E5] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-white">Parent Portal</h5>
                <p className="text-[11px] text-[#F5F1EB]/60 mt-0.5">Secure App & School Records</p>
              </div>
            </div>

          </div>

        </div>

        {/* Row 3: Final footer lines */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F5F1EB]/50 font-sans font-light">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Contact Registrar</a>
          </div>

          <div className="flex items-center space-x-1.5">
            <span>Design by Rylic Studio • Adapted with</span>
            <Heart className="w-3 h-3 text-[#E78F68] fill-current" />
            <span>for Lindenwood Academy.</span>
          </div>

          <div>
            <span>© 2026 Lindenwood Inc. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
