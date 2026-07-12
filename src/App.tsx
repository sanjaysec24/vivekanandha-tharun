import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import FeatureCards from './components/FeatureCards';
import Categories from './components/Categories';
import PromoSections from './components/PromoSections';
import EventSection from './components/EventSection';
import Footer from './components/Footer';
import { CurriculumWidget, AdmissionsDrawer } from './components/InteractiveWidget';

export default function App() {
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);

  const openAdmissions = () => setIsAdmissionsOpen(true);
  const closeAdmissions = () => setIsAdmissionsOpen(false);

  return (
    <div id="school-landing-app" className="min-h-screen bg-[#F4F0EA] text-[#3A2318] selection:bg-[#E78F68]/35 overflow-x-hidden font-sans">
      {/* 1. Header Navigation Bar */}
      <Navbar onOpenAdmissions={openAdmissions} />

      {/* 2. Headline & Dynamic Arched Hero section */}
      <Hero onOpenAdmissions={openAdmissions} />

      {/* 3. Dark Chocolate Statistics Board */}
      <StatsBar />

      {/* 4. Three Colorful Educational Feature Cards */}
      <FeatureCards onOpenAdmissions={openAdmissions} />

      {/* Premium Added Component: Dynamic Interactive Curriculum Timeline picker */}
      <CurriculumWidget />

      {/* 5. Four Educational Category cards (with circular badged portraits) */}
      <Categories />

      {/* 6 & 7. Large Promocards + Two-column 'Empower Children' grid with live stats */}
      <PromoSections onOpenAdmissions={openAdmissions} />

      {/* 8. Split Event board */}
      <EventSection onOpenAdmissions={openAdmissions} />

      {/* 9. Premium Footer */}
      <Footer />

      {/* Interactive slideout booking drawer */}
      <AdmissionsDrawer isAdmissionsOpen={isAdmissionsOpen} onCloseAdmissions={closeAdmissions} />
    </div>
  );
}
