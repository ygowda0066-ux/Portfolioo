import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Play, Eye, ExternalLink, Calendar, Video, Image as ImageIcon } from "lucide-react";
import { portfolioConfig, MediaItem } from "../config";
import Lightbox from "./Lightbox";

export default function Work({ setActivePage }: { setActivePage?: (page: string) => void } = {}) {
  const [activeCategory, setActiveCategory] = useState<"travel" | "commercial" | "prewedding" | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Cover image paths generated previously
  const categoryCovers = {
    travel: "/src/assets/images/travel_cover_1782800509673.jpg",
    commercial: "/src/assets/images/commercial_cover_1782800523688.jpg",
    prewedding: "/src/assets/images/prewedding_cover_1782800546053.jpg",
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const currentGalleryItems = activeCategory ? portfolioConfig.galleries[activeCategory] : [];

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : currentGalleryItems.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < currentGalleryItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div id="work-page-section" className="min-h-[85vh] py-12 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Elegant Go Back Button at the top left */}
      {activeCategory === null && setActivePage && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 flex justify-start"
        >
          <button
            id="btn-back-to-menu-work"
            onClick={() => setActivePage("welcome")}
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-700 dark:text-zinc-300 hover:text-[#7ED957] dark:hover:text-[#7ED957] transition-all cursor-pointer group bg-zinc-100/50 hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 px-4 py-2 rounded-full border border-gray-200/50 dark:border-zinc-800"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Go Back to Menu</span>
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {activeCategory === null ? (
          /* ================= MAIN CATEGORY GRID ================= */
          <motion.div
            key="main-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-12">
              <span className="text-[#7ED957] text-xs font-mono font-bold tracking-widest uppercase">My Creative Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-1">
                My Work
              </h2>
              <p className="text-gray-500 dark:text-zinc-400 mt-3 max-w-xl mx-auto text-sm">
                A showcase of storytelling through sharp cinematography, editorial travel films, and pristine pre-wedding visuals.
              </p>
            </div>

            <div id="category-cards-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {/* Card 1: Travel Videos */}
              <motion.div
                id="card-travel"
                whileHover={{ y: -8 }}
                className="frosted-panel overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img
                    src={categoryCovers.travel}
                    alt="Travel Videos Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono bg-black/60 text-[#7ED957] font-semibold border border-[#7ED957]/30">
                    Travel
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Travel Videos</h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      Cinematic documentaries, travel films, and immersive scenery highlighting majestic landscapes and visual pacing.
                    </p>
                  </div>
                  <button
                    id="btn-view-travel"
                    onClick={() => setActiveCategory("travel")}
                    className="w-full py-3 bg-zinc-900 hover:bg-[#7ED957] dark:bg-zinc-800 dark:hover:bg-[#7ED957] text-white hover:text-zinc-950 font-bold text-sm tracking-wide rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Videos</span>
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </motion.div>

              {/* Card 2: Commercial Videos */}
              <motion.div
                id="card-commercial"
                whileHover={{ y: -8 }}
                className="frosted-panel overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img
                    src={categoryCovers.commercial}
                    alt="Commercial Videos Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono bg-black/60 text-[#7ED957] font-semibold border border-[#7ED957]/30">
                    Commercial
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Commercial Videos</h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      High-end commercial films, lifestyle advertisement reels, and corporate promo content driving core brands.
                    </p>
                  </div>
                  <button
                    id="btn-view-commercial"
                    onClick={() => setActiveCategory("commercial")}
                    className="w-full py-3 bg-zinc-900 hover:bg-[#7ED957] dark:bg-zinc-800 dark:hover:bg-[#7ED957] text-white hover:text-zinc-950 font-bold text-sm tracking-wide rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Videos</span>
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </motion.div>

              {/* Card 3: Pre-Wedding Shoots */}
              <motion.div
                id="card-prewedding"
                whileHover={{ y: -8 }}
                className="frosted-panel overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img
                    src={categoryCovers.prewedding}
                    alt="Prewedding Shoots Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono bg-black/60 text-[#7ED957] font-semibold border border-[#7ED957]/30">
                    Weddings
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pre-Wedding Shoots</h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      Dreamy pre-wedding love story films, candid photography portraits, and timeless frames capturing deep romance.
                    </p>
                  </div>
                  <button
                    id="btn-view-prewedding"
                    onClick={() => setActiveCategory("prewedding")}
                    className="w-full py-3 bg-zinc-900 hover:bg-[#7ED957] dark:bg-zinc-800 dark:hover:bg-[#7ED957] text-white hover:text-zinc-950 font-bold text-sm tracking-wide rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Gallery</span>
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ================= SUB-GALLERY GRID ================= */
          <motion.div
            key="sub-gallery"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="px-2"
          >
            {/* Header / Back Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <button
                id="btn-back-categories"
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-zinc-400 hover:text-[#7ED957] dark:hover:text-[#7ED957] transition-all cursor-pointer w-fit group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Back to All Categories</span>
              </button>
              
              <div className="text-left sm:text-right">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Selected Gallery</span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white capitalize">
                  {activeCategory === "prewedding" ? "Pre-Wedding Shoots" : `${activeCategory} Videos`}
                </h3>
              </div>
            </div>

            {/* Media Items Cards Grid */}
            <div id="media-items-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentGalleryItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layoutId={`media-${item.id}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleOpenLightbox(idx)}
                  className="frosted-panel overflow-hidden shadow-sm hover:shadow-md cursor-pointer group flex flex-col"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/45 transition-colors duration-300 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 scale-90 group-hover:scale-100 group-hover:bg-[#7ED957] group-hover:text-zinc-950 group-hover:border-transparent transition-all duration-300">
                        {item.type === "video" ? <Play className="h-5 w-5 fill-current" /> : <Eye className="h-5 w-5" />}
                      </div>
                    </div>
                    {/* Corner item tag */}
                    <div className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10 text-[9px] font-mono flex items-center gap-1 uppercase tracking-wider">
                      {item.type === "video" ? (
                        <>
                          <Video className="h-3 w-3 text-[#7ED957]" />
                          <span>Video</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-3 w-3 text-emerald-400" />
                          <span>Photo</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Details Card info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#7ED957] transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7ED957] font-semibold mt-4">
                      <span>Preview in Lightbox</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty gallery fallback */}
            {currentGalleryItems.length === 0 && (
              <div className="text-center py-16 bg-gray-50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-850 mt-4">
                <p className="text-gray-400 text-sm">No items configured in this gallery.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Trigger */}
      {lightboxIndex !== null && (
        <Lightbox
          items={currentGalleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
