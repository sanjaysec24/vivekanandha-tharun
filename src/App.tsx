import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VijayadasamiSection from './components/VijayadasamiSection';
import StatsBar from './components/StatsBar';
import FeatureCards from './components/FeatureCards';
import Categories from './components/Categories';
import PromoSections from './components/PromoSections';
import EventSection from './components/EventSection';
import Footer from './components/Footer';
import { CurriculumWidget, AdmissionsDrawer } from './components/InteractiveWidget';

// Custom router integration
import { RouterProvider, Route } from './lib/router';

// Page components
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);

  const openAdmissions = () => setIsAdmissionsOpen(true);
  const closeAdmissions = () => setIsAdmissionsOpen(false);

  return (
    <RouterProvider>
      <div id="school-landing-app" className="min-h-screen bg-[#F4F0EA] text-[#3A2318] selection:bg-[#E78F68]/35 overflow-x-hidden font-sans">
        {/* 1. Header Navigation Bar (Global) */}
        <Navbar onOpenAdmissions={openAdmissions} />

        {/* --- Routing Pages --- */}
        
        {/* Home Page Route */}
        <Route path="/" element={
          <>
            {/* 2. Headline & Dynamic Arched Hero section */}
            <Hero onOpenAdmissions={openAdmissions} />

            {/* Seasonal: Vijayadasami Admissions 2027 */}
            <VijayadasamiSection onOpenAdmissions={openAdmissions} />

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
          </>
        } />

        {/* Dedicated Menu Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* 9. Premium Footer (Global) */}
        <Footer />

        {/* Interactive slideout booking drawer (Global) */}
        <AdmissionsDrawer isAdmissionsOpen={isAdmissionsOpen} onCloseAdmissions={closeAdmissions} />
      </div>
    </RouterProvider>
  );
}
