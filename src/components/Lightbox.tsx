import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MediaItem } from "../config";

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [currentIndex]);

  // Handle keyboard shortcuts (Esc, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null) return null;
  const currentItem = items[currentIndex];

  return (
    <AnimatePresence>
      <div
        id="lightbox-backdrop"
        className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white backdrop-blur-sm"
      >
        {/* Top Control Bar */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="text-zinc-400 text-sm font-mono">
            {currentIndex + 1} / {items.length}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white hover:text-[#7ED957] transition-all cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Display Area */}
        <div className="flex-1 flex justify-between items-center px-4">
          {/* Left Arrow */}
          <button
            onClick={onPrev}
            className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-[#7ED957] transition-all cursor-pointer disabled:opacity-20"
            disabled={items.length <= 1}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Media Center */}
          <div className="max-w-5xl max-h-[70vh] w-full flex justify-center items-center relative px-2">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-[70vh] flex flex-col items-center"
            >
              {currentItem.type === "video" ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden max-h-[65vh] shadow-2xl bg-zinc-900 border border-zinc-800">
                  <video
                    src={currentItem.url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <img
                  src={currentItem.url}
                  alt={currentItem.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl border border-zinc-800"
                />
              )}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={onNext}
            className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-[#7ED957] transition-all cursor-pointer disabled:opacity-20"
            disabled={items.length <= 1}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>

        {/* Caption Info Area */}
        <div className="w-full text-center px-6 py-6 bg-gradient-to-t from-black/80 to-transparent">
          <motion.div
            key={`caption-${currentItem.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto"
          >
            <h3 className="text-lg font-bold tracking-wide text-white">
              {currentItem.title}
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              {currentItem.description}
            </p>
            {currentItem.type === "video" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-2 rounded-full text-[10px] font-medium bg-[#7ED957]/20 text-[#7ED957] border border-[#7ED957]/30 uppercase tracking-widest font-mono">
                <Play className="h-2.5 w-2.5 fill-current" /> Video Playback
              </span>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
