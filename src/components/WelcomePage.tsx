import { motion } from "motion/react";
import { Film, Mail, ArrowRight, Video, FileText } from "lucide-react";

interface WelcomePageProps {
  setActivePage: (page: string) => void;
}

export default function WelcomePage({ setActivePage }: WelcomePageProps) {
  return (
    <div
      id="welcome-page-container"
      className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4 md:px-8 relative overflow-hidden text-center"
    >
      {/* Decorative background elements */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7ED957]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-[#7ED957]/30 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-[#7ED957]/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mb-12"
      >
        <span className="text-[#7ED957] text-xs font-mono font-bold tracking-widest uppercase">Explore Creative Horizons</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
          Where would you like to start?
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-sm">
          Select an option below to view curated portfolio works or initiate a new project collaboration.
        </p>
      </motion.div>

      {/* Two Large Centered Navigation Buttons */}
      <div id="welcome-options-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full px-4">
        {/* Work Button Card */}
        <motion.button
          id="welcome-btn-work"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActivePage("work")}
          className="flex flex-col items-center justify-center p-8 frosted-panel shadow-md hover:shadow-xl hover:border-[#7ED957]/40 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#7ED957]" />
          <div className="p-4 bg-[#7ED957]/10 text-[#7ED957] rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
            <Film className="h-8 w-8" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">View My Work</span>
          <p className="text-gray-500 dark:text-zinc-400 text-xs text-center mt-2 max-w-[200px]">
            Explore Travel Films, Commercial Ads, and dreamy Pre-Wedding captures.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#7ED957] font-semibold tracking-wider uppercase mt-6 group-hover:underline">
            <span>Enter Gallery</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </motion.button>

        {/* Contact Button Card */}
        <motion.button
          id="welcome-btn-contact"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActivePage("contact")}
          className="flex flex-col items-center justify-center p-8 frosted-panel shadow-md hover:shadow-xl hover:border-[#7ED957]/40 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#7ED957]" />
          <div className="p-4 bg-[#7ED957]/10 text-[#7ED957] rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
            <Mail className="h-8 w-8" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Get In Touch</span>
          <p className="text-gray-500 dark:text-zinc-400 text-xs text-center mt-2 max-w-[200px]">
            Inquire about pricing, book a shoot, or discuss project concepts.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#7ED957] font-semibold tracking-wider uppercase mt-6 group-hover:underline">
            <span>Connect Now</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
