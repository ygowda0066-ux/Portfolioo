import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import WelcomePage from "./components/WelcomePage";
import Work from "./components/Work";
import Contact from "./components/Contact";
import { Camera } from "lucide-react";

export default function App() {
  // Page state: 'home' | 'welcome' | 'work' | 'contact'
  const [activePage, setActivePage] = useState<string>("home");
  
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Read local storage or default to light theme as requested ("minimalist white theme as default")
    const saved = localStorage.getItem("darkMode");
    return saved === "true" ? true : false;
  });

  const [renderablePage, setRenderablePage] = useState("home");

  // Sync dark mode class with body
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  // Instantly trigger page change
  const triggerPageChange = (newPageId: string) => {
    if (newPageId === activePage) return;
    setActivePage(newPageId);
    setRenderablePage(newPageId);
  };

  const renderActiveComponent = () => {
    switch (renderablePage) {
      case "home":
        return <Home setActivePage={triggerPageChange} />;
      case "welcome":
        return <WelcomePage setActivePage={triggerPageChange} />;
      case "work":
        return <Work setActivePage={triggerPageChange} />;
      case "contact":
        return <Contact setActivePage={triggerPageChange} />;
      default:
        return <Home setActivePage={triggerPageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-[#7ED957]/30 selection:text-zinc-900 dark:selection:text-white overflow-x-hidden relative">
      
      {/* Background Mesh Gradients from the Design HTML */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#7ED957]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#7ED957]/5 blur-[120px] pointer-events-none z-0" />

      {/* Dynamic Background Noise/Artifact Overlay to give a filmic cinematic paper/grain look */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/5 dark:to-black/30 mix-blend-overlay opacity-15" />

      {/* Page Selection Indicator (Sidebar Dots) from the Design HTML */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        {["home", "welcome", "work", "contact"].map((pageId) => (
          <button
            key={pageId}
            onClick={() => triggerPageChange(pageId)}
            className="group flex items-center justify-end gap-3 cursor-pointer"
            aria-label={`Go to ${pageId}`}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7ED957] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {pageId}
            </span>
            <div
              className={`w-2.5 h-2.5 rounded-full border border-[#7ED957] transition-all duration-300 ${
                activePage === pageId
                  ? "bg-[#7ED957] scale-125"
                  : "bg-transparent group-hover:bg-[#7ED957]/40"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Global Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={triggerPageChange}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Pages with Animate Presence transitions */}
      <main id="main-content-area" className="flex-1 flex flex-col justify-center pt-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full flex-1 flex flex-col justify-center"
          >
            {renderActiveComponent()}
          </motion.div>
        </AnimatePresence>
      </main>



      {/* Footer copyright */}
      <footer className="py-6 border-t border-gray-100 dark:border-zinc-900 text-center font-mono text-[10px] text-gray-400 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Green. All cinematic rights reserved.</p>
          <div className="flex gap-4">
            <span>Cinematography</span>
            <span>•</span>
            <span>FPV Drone Filming</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
