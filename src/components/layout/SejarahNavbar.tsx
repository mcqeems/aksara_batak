import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowLeft } from 'lucide-react';

interface SejarahNavbarProps {
  onAutoScrollToggle?: (isPlaying: boolean) => void;
  onSoundToggle?: (isMuted: boolean) => void;
  onSectionChange?: (sectionIndex: number) => void;
  currentSection?: number;
  totalSections?: number;
  isAutoScrolling?: boolean;
  isSoundMuted?: boolean;
}

export function SejarahNavbar({
  onAutoScrollToggle,
  onSoundToggle,
  onSectionChange,
  currentSection = 0,
  totalSections = 8,
  isAutoScrolling = false,
  isSoundMuted = false,
}: SejarahNavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 2000);
  };

  const handleAutoScrollToggle = () => {
    onAutoScrollToggle?.(!isAutoScrolling);
  };

  const handleSoundToggle = () => {
    onSoundToggle?.(!isSoundMuted);
  };

  const handleSectionClick = (sectionIndex: number) => {
    onSectionChange?.(sectionIndex);
  };

  const sectionTitles = [
    'Selamat Datang',
    'Asal Usul',
    'Media Tulis',
    'Struktur Aksara',
    'Kemunduran',
    'Pelestarian',
    'Ayo Ikut',
  ];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed top-4 left-4 z-50 flex flex-col gap-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Navbar */}
      <motion.header
        className={cn(
          'rounded-2xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl',
          'flex items-center gap-2 p-2 transition-all duration-500 ease-out'
        )}
        initial={{ width: '3.5rem', height: '3.5rem' }}
        animate={{
          width: isExpanded || isHovered ? 'auto' : '3.5rem',
          height: '3.5rem',
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Back Button */}
        <motion.button
          onClick={() => window.history.back()}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 transition-all duration-200 hover:bg-white/20"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          title="Kembali"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </motion.button>

        {/* Logo Section */}
        <div className="flex items-center gap-2 overflow-hidden">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 overflow-hidden px-1 py-1"
          >
            <motion.img
              className="h-6 w-6 flex-shrink-0"
              src="/assets/logo/podahorasOriginal.svg"
              alt="Logo"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <AnimatePresence>
              {(isExpanded || isHovered) && (
                <motion.span
                  className="font-bawor text-2xl whitespace-nowrap text-[#ecbb88]"
                  initial={{ width: 0, opacity: 0, x: -10 }}
                  animate={{ width: 'auto', opacity: 1, x: 0 }}
                  exit={{ width: 0, opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  PodaHoras
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Control Buttons */}
        <AnimatePresence>
          {(isExpanded || isHovered) && (
            <motion.div
              className="flex items-center gap-1 border-l border-white/20 pl-2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Auto Scroll Toggle */}
              <motion.button
                onClick={handleAutoScrollToggle}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200',
                  isAutoScrolling
                    ? 'border-primary/50 bg-primary/30 border'
                    : 'bg-white/10 hover:bg-white/20'
                )}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={
                  isAutoScrolling ? 'Pause Auto Scroll' : 'Play Auto Scroll'
                }
              >
                {isAutoScrolling ? (
                  <Pause className="text-primary h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 text-white" />
                )}
              </motion.button>

              {/* Sound Toggle */}
              <motion.button
                onClick={handleSoundToggle}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200',
                  isSoundMuted
                    ? 'border-destructive/50 bg-destructive/30 border'
                    : 'bg-white/10 hover:bg-white/20'
                )}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isSoundMuted ? (
                  <VolumeX className="text-destructive h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4 text-white" />
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Section Navigation */}
      <AnimatePresence>
        {(isExpanded || isHovered) && (
          <motion.div
            className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: -20, scale: 0.9, height: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: 'auto' }}
            exit={{ opacity: 0, y: -20, scale: 0.9, height: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.div
              className="mb-3 text-center text-sm font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Navigasi Section
            </motion.div>
            <div className="flex flex-col gap-1">
              {Array.from({ length: totalSections }, (_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSectionClick(index)}
                  className={cn(
                    'rounded-xl px-3 py-2 text-left text-sm transition-all duration-200',
                    'hover:bg-white/10 active:bg-white/20',
                    currentSection === index
                      ? 'border-primary/50 bg-primary/20 border text-white shadow-lg'
                      : 'text-white/80 hover:text-white'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={cn(
                        'h-2 w-2 rounded-full',
                        currentSection === index ? 'bg-primary' : 'bg-white/40'
                      )}
                      animate={
                        currentSection === index ? { scale: [1, 1.2, 1] } : {}
                      }
                      transition={{ duration: 0.3 }}
                    />
                    <span className="truncate font-medium">
                      {index === 0
                        ? 'Intro'
                        : index === totalSections - 1
                          ? 'Penutup'
                          : sectionTitles[index - 1] || `Section ${index + 1}`}
                    </span>
                    {currentSection === index && (
                      <motion.div
                        className="bg-primary h-1 w-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
