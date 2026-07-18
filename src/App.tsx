import React, { useState, useEffect } from 'react';
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
import VLeoChatbot from './components/VLeoChatbot';

// Custom router integration
import { RouterProvider, Route, useRouter } from './lib/router';

// Page components
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

function AppContent() {
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);
  const { path, navigate } = useRouter();

  const openAdmissions = () => setIsAdmissionsOpen(true);
  const closeAdmissions = () => setIsAdmissionsOpen(false);

  // Clean redirection for old admin/login/dashboard/settings paths to the public homepage
  useEffect(() => {
    const obsoleteRoutes = ['/admin', '/admin/login', '/dashboard', '/settings', '/login'];
    if (obsoleteRoutes.includes(path) || path.startsWith('/dashboard/') || path.startsWith('/admin/')) {
      navigate('/');
    }
  }, [path, navigate]);

  return (
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

        {/* Global Floating AI Chatbot Assistant */}
        <VLeoChatbot />
      </div>
  );
}
