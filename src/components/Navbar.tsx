import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { navigationItems } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useRouter } from '../lib/router';

interface NavbarProps {
  onOpenAdmissions: () => void;
}

export default function Navbar({ onOpenAdmissions }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { path } = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav id="navbar-container" className="sticky top-0 z-50 bg-[#F4F0EA]/95 backdrop-blur-md border-b border-[#3A2318]/10 px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link id="brand-logo" to="/" className="flex items-center space-x-2 text-2xl font-serif font-bold text-[#3A2318] tracking-tight group">
          <span className="relative">
            Vivekanandha School
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E78F68] transition-all duration-300 group-hover:w-full"></span>
          </span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#E78F68] animate-pulse"></span>
        </Link>

        {/* Desktop Navigation Items */}
        <div id="desktop-menu" className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => {
            const isItemActive = path === item.href;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center text-sm font-medium transition-colors duration-200 py-2 relative ${
                    isItemActive
                      ? 'text-[#E78F68] font-semibold'
                      : 'text-[#3A2318] hover:text-[#E78F68]'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200" />
                  )}
                  {isItemActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E78F68] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Programs Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-[#F4F0EA] border border-[#3A2318]/15 rounded-2xl shadow-xl p-4 space-y-2 z-50">
                    {item.dropdownItems?.map((dropItem) => (
                      <Link
                        key={dropItem}
                        to="/academics"
                        className="block text-sm text-[#3A2318]/85 hover:text-[#3A2318] hover:bg-[#E78F68]/10 rounded-xl px-3 py-2 transition-colors duration-150 font-medium"
                      >
                        {dropItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            id="navbar-cta-admissions"
            onClick={onOpenAdmissions}
            className="flex items-center space-x-1 border border-[#3A2318]/30 text-sm font-semibold text-[#3A2318] px-5 py-2.5 rounded-full hover:bg-[#3A2318] hover:text-[#F4F0EA] transition-all duration-200 shadow-sm animate-pulse"
          >
            <span>Admissions Open 2027-2028</span>
            <Sparkles className="w-4 h-4 text-[#E78F68]" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={toggleMenu}
          className="md:hidden p-1 text-[#3A2318] hover:text-[#E78F68] transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden mt-4 overflow-hidden border-t border-[#3A2318]/10 bg-[#F4F0EA]"
          >
            <div className="py-4 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <Link
                    to={item.href}
                    onClick={() => !item.hasDropdown && setIsOpen(false)}
                    className={`block text-base font-semibold px-2 py-1 ${
                      path === item.href ? 'text-[#E78F68]' : 'text-[#3A2318] hover:text-[#E78F68]'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4 space-y-1.5 border-l border-[#3A2318]/10 ml-2">
                      {item.dropdownItems?.map((dropItem) => (
                        <Link
                          key={dropItem}
                          to="/academics"
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-[#3A2318]/70 hover:text-[#3A2318] py-1"
                        >
                          {dropItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-[#3A2318]/10">
                <button
                  id="mobile-cta-admissions"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmissions();
                  }}
                  className="w-full text-center block bg-[#E78F68] hover:bg-[#d07b53] text-white font-semibold py-3 px-5 rounded-full transition-all duration-200"
                >
                  Admissions Open 2027-2028
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
