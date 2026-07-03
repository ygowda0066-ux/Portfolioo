import { motion } from "motion/react";
import { Linkedin, Instagram, Mail, ArrowRight, Video, Camera, Sparkles } from "lucide-react";
import { portfolioConfig } from "../config";

interface HomeProps {
  setActivePage: (page: string) => void;
}

export default function Home({ setActivePage }: HomeProps) {
  const { name, subtitle, bio, profilePicture, logo, email } = portfolioConfig.personalInfo;
  const { linkedin, instagram } = portfolioConfig.socialLinks;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const socialLinksContent = (
    <>
      <motion.a
        id="social-linkedin"
        whileHover={{ y: -4, scale: 1.05 }}
        href="https://www.linkedin.com/in/yogesh-gowda-77bb5a41a?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-[#7ED957]/15 hover:text-[#7ED957] dark:hover:bg-[#7ED957]/20 transition-all shadow-sm cursor-pointer border border-gray-200/50 dark:border-zinc-800"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </motion.a>

      <motion.a
        id="social-instagram"
        whileHover={{ y: -4, scale: 1.05 }}
        href="https://www.instagram.com/green_film06?igsh=NWFlczhscml1cmdr"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-[#7ED957]/15 hover:text-[#7ED957] dark:hover:bg-[#7ED957]/20 transition-all shadow-sm cursor-pointer border border-gray-200/50 dark:border-zinc-800"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5" />
      </motion.a>

      <motion.a
        id="social-gmail"
        whileHover={{ y: -4, scale: 1.05 }}
        href="mailto:greenfilm0606@gmail.com"
        className="p-3.5 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-[#7ED957]/15 hover:text-[#7ED957] dark:hover:bg-[#7ED957]/20 transition-all shadow-sm cursor-pointer border border-gray-200/50 dark:border-zinc-800"
        aria-label="Gmail"
      >
        <Mail className="h-5 w-5" />
      </motion.a>
    </>
  );

  return (
    <motion.div
      id="home-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[88vh] py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center relative"
    >
      {/* Visual background ambient glow elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#7ED957]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Modern Split-Grid Layout for Balanced Spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative z-10">
        
        {/* LEFT PANEL: The Artist Logo, Picture & Social Media */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          
          {/* Photography Logo - Newly placed in the top-left area */}
          {logo && (
            <motion.div
              id="hero-brand-logo"
              variants={itemVariants}
              className="relative group mb-2"
            >
              <div className="absolute inset-0 bg-[#7ED957]/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-all duration-500" />
              <div className="relative p-1.5 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-gray-200/60 dark:border-zinc-800/80 shadow-md flex items-center justify-center w-24 h-24">
                <img
                  src={logo}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="block text-[8px] font-mono tracking-[0.25em] text-[#7ED957] uppercase mt-2 font-bold text-center lg:text-left">
                
              </span>
            </motion.div>
          )}

          {/* Profile Picture Frame with glowing backdrop - Made larger */}
          <motion.div
            id="hero-profile-picture"
            variants={itemVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7ED957] to-emerald-400 rounded-full blur-2xl opacity-20 group-hover:opacity-45 transition-all duration-500" />
            <div className="relative p-1 bg-white dark:bg-zinc-900 rounded-full border border-[#7ED957]/30 shadow-2xl">
              <img
                src={profilePicture}
                alt="Green Films"
                referrerPolicy="no-referrer"
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Decorative Camera Badge */}
              <div className="absolute bottom-2 right-2 p-2.5 bg-[#7ED957] rounded-full text-zinc-900 border-2 border-white dark:border-zinc-900 shadow-lg">
                <Camera className="h-5 w-5" />
              </div>
            </div>
          </motion.div>

          {/* Subtitle Badge containing "Visual Artist" */}
          <motion.div
            id="hero-badge"
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7ED957]/10 text-[#7ED957] text-xs font-semibold uppercase tracking-wider border border-[#7ED957]/20 shadow-sm"
          >
            <Video className="h-3 w-3" />
            <span>Green Films</span>
            <Sparkles className="h-3 w-3" />
          </motion.div>

          {/* Social Media Links - Desktop Only */}
          <motion.div
            id="hero-social-links-desktop"
            variants={itemVariants}
            className="hidden lg:flex items-center justify-start gap-4"
          >
            {socialLinksContent}
          </motion.div>
        </div>

        {/* RIGHT PANEL: Official Brand Identity & Navigation */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          
          {/* Main Welcome Heading */}
          <motion.div variants={itemVariants} className="w-full">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#7ED957] font-semibold mb-2 block">
      
            </span>
            <h1
              id="hero-name"
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight"
            >
              Hi, I'm <span className="bg-gradient-to-r from-[#7ED957] to-emerald-500 bg-clip-text text-transparent">Yogesh Gowda S R(Green)</span>
            </h1>
          </motion.div>

          {/* About Me Description Wrapped in Frosted Panel */}
          <motion.div
            id="hero-bio-container"
            variants={itemVariants}
            className="w-full p-6 sm:p-8 frosted-panel shadow-sm text-center lg:text-left hover:border-[#7ED957]/20 transition-all duration-300"
          >
            <p
              id="hero-bio"
              className="text-base md:text-lg text-gray-700 dark:text-zinc-300 leading-relaxed italic"
            >
              "I'm a Videographer, Photographer, Cinematographer, Video Editor, and FPV Drone Pilot passionate about cinematic storytelling. I specialize in travel, fashion, food, hospitality, and brand content, creating high-quality visuals from concept to final edit. Skilled in DaVinci Resolve, CapCut, Photoshop, and Lightroom, I focus on delivering creative and impactful content that brings every story to life."
            </p>
          </motion.div>

          {/* Navigation Action Button */}
          <motion.div variants={itemVariants} className="mt-2 w-full flex justify-center lg:justify-start">
            <motion.button
              id="hero-click-here-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePage("welcome")}
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-[#7ED957] hover:bg-[#6ec248] text-zinc-950 text-base font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-[#7ED957]/20 transition-all duration-300 group cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Social Media Links - Mobile Only (Rendered at the bottom) */}
      <motion.div
        id="hero-social-links-mobile"
        variants={itemVariants}
        className="flex lg:hidden items-center justify-center gap-5 mt-12 relative z-10 w-full"
      >
        {socialLinksContent}
      </motion.div>
    </motion.div>
  );
}
