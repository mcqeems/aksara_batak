import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function SejarahNavbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.header
      className={cn(
        'bg-background/80 fixed top-4 left-4 z-50 rounded-full p-3 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ width: '4rem' }} // Initial width for logo only
      animate={{ width: isHovered ? 'auto' : '4rem' }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/"
        className="flex items-center gap-2 overflow-hidden px-2 py-1"
      >
        <img
          className="fill-primary max-h-[35px]"
          src="/assets/logo/podahorassvg.svg"
          alt="Logo"
        />
        <motion.span
          className="font-bawor text-3xl whitespace-nowrap text-[#ecbb88]"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          PodaHoras
        </motion.span>
      </Link>
    </motion.header>
  );
}
