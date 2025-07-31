import { motion } from 'framer-motion';

interface WelcomeCardProps {
  text1: string;
  text2: string;
  rotation?: number[];
  delay?: number;
  animation?: {
    y?: number;
    x?: number;
  };
}

export function WelcomeCard({
  text1,
  text2,
  rotation = [-1, 1.5, -1.5, 1.5, -1],
  delay = 0.6,
  animation,
}: WelcomeCardProps) {
  return (
    <motion.div
      className="flex items-center justify-start"
      initial={{ y: '-50vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1, ...animation }}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 10,
        delay: delay,
      }}
    >
      <motion.div
        className="origin-top"
        animate={{
          rotate: rotation,
        }}
        transition={{
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Nail */}
          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-md" />

          {/* String */}
          <div className="h-24 w-0.5 bg-white/80" />

          {/* Card with Hole */}
          <div className="relative rounded-2xl border border-white/10 bg-black/20 p-6 pt-8 shadow-2xl backdrop-blur-xl">
            {/* Hole */}
            <div className="absolute top-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-gray-900/70 ring-2 ring-gray-400/50" />

            {/* Card Content */}
            <div className="font-bawor -rotate-180 text-center text-4xl leading-tight font-bold text-white drop-shadow-lg md:text-5xl">
              <div className="writing-vertical">{text1}</div>
              <div className="writing-vertical">{text2}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
