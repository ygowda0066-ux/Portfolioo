import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioConfig } from "../config";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ activePage, setActivePage, darkMode, setDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for shadow effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "welcome", label: "Welcome" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <motion.div
            id="nav-logo-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActivePage("home")}
          >
            {portfolioConfig.personalInfo.logo ? (
              <img
                src={portfolioConfig.personalInfo.logo}
                alt="Photography Logo"
                className="h-10 w-10 rounded-full object-cover border border-[#7ED957]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Camera className="h-6 w-6 text-[#7ED957]" />
            )}
            <div>
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-[#7ED957] to-[#5ba83c] bg-clip-text text-transparent">
                {portfolioConfig.personalInfo.name}
              </span>
              <p className="text-[9px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-mono -mt-1">
                Visual Artist
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div id="desktop-nav" className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                    activePage === item.id
                      ? "text-[#7ED957]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#7ED957]"
                  }`}
                >
                  {item.label}
                  {activePage === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#7ED957] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dark/Light mode sliding capsule toggle */}
            <div
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="h-10 w-20 bg-zinc-150 dark:bg-zinc-800 rounded-full flex items-center p-1 cursor-pointer relative shadow-inner border border-zinc-200/50 dark:border-zinc-700/50 transition-colors duration-500"
              role="button"
              aria-label="Toggle Theme"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="h-8 w-8 bg-white dark:bg-zinc-900 rounded-full shadow-md flex items-center justify-center absolute"
                style={{
                  left: darkMode ? "calc(100% - 36px)" : "4px"
                }}
              >
                {darkMode ? (
                  <Sun className="h-4.5 w-4.5 text-[#7ED957]" />
                ) : (
                  <Moon className="h-4.5 w-4.5 text-zinc-700" />
                )}
              </motion.div>
            </div>
          </div>

          {/* Mobile Hamburguer and Theme Toggle button */}
          <div id="mobile-nav-controls" className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-4 w-4 text-[#7ED957]" /> : <Moon className="h-4 w-4 text-zinc-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#7ED957] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-gray-100 dark:border-zinc-800"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full px-3 py-3 text-base font-medium rounded-md transition-colors ${
                    activePage === item.id
                      ? "bg-[#7ED957]/10 text-[#7ED957]"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-[#7ED957]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
