import { motion } from 'framer-motion';
import { Star, Heart, Sparkles, BookMarked } from 'lucide-react';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="bg-background via-background/95 to-muted/20 absolute inset-0 bg-gradient-to-br"
        style={{
          background:
            'linear-gradient(to bottom right, var(--background), rgba(var(--background), 0.95), rgba(var(--muted), 0.2))',
        }}
      ></div>

      {/* Animated Blur Circles */}
      <motion.div
        className="bg-primary/70 absolute top-24 left-1/4 h-16 w-16 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.7)' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.7, 0.7],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className="bg-destructive/70 absolute top-1/2 left-10 h-20 w-20 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.7)' }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 0.7, 0.7],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      />
      <motion.div
        className="bg-primary/70 absolute right-1/4 bottom-32 h-24 w-24 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.7)' }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.7, 0.7, 0.7],
        }}
        transition={{
          duration: 5.1,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.1,
        }}
      />
      <motion.div
        className="bg-destructive/70 absolute bottom-16 left-1/3 h-32 w-32 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.7)' }}
        animate={{
          scale: [1, 1.09, 1],
          opacity: [0.7, 0.7, 0.7],
        }}
        transition={{
          duration: 4.7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.7,
        }}
      />
      <motion.div
        className="bg-primary/70 absolute top-1/4 right-20 h-40 w-40 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.7)' }}
        animate={{
          scale: [1, 1.13, 1],
          opacity: [0.7, 0.7, 0.7],
        }}
        transition={{
          duration: 4.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Dot Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      ></div>

      {/* Diagonal Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 3px,
              rgba(255,255,255,0.08) 3px,
              rgba(255,255,255,0.08) 6px
            )
          `,
        }}
      ></div>

      {/* Small Animated Dots */}
      <motion.div
        className="bg-primary/20 absolute top-1/4 left-1/4 h-2 w-2 rounded-full"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.2)' }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="bg-primary/30 absolute top-1/3 right-1/3 h-1 w-1 rounded-full"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.3)' }}
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="bg-destructive/20 absolute right-1/4 bottom-1/4 h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.2)' }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* More Animated Dots */}
      <motion.div
        className="bg-primary/40 absolute top-1/6 left-1/3 h-3 w-3 rounded-full"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.4)' }}
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />
      <motion.div
        className="bg-destructive/30 absolute top-2/3 left-1/6 h-2 w-2 rounded-full"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.3)' }}
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
      <motion.div
        className="bg-primary/25 absolute right-1/6 bottom-1/3 h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.25)' }}
        animate={{
          y: [0, -18, 0],
          x: [0, 12, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
      />

      {/* Animated Icons */}
      <motion.div
        className="text-primary/30 absolute top-1/4 right-1/4"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 360, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Star size={16} />
      </motion.div>
      <motion.div
        className="text-destructive/30 absolute top-1/3 left-1/5"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -360, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      >
        <Heart size={14} />
      </motion.div>
      <motion.div
        className="text-primary/25 absolute bottom-1/4 left-1/3"
        animate={{
          y: [0, -12, 0],
          x: [0, 8, 0],
          rotate: [0, 180, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      >
        <Sparkles size={12} />
      </motion.div>
      <motion.div
        className="text-destructive/25 absolute right-1/4 bottom-1/3"
        animate={{
          y: [0, 16, 0],
          x: [0, -10, 0],
          rotate: [0, -180, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.1,
        }}
      >
        <BookMarked size={18} />
      </motion.div>
      <motion.div
        className="text-primary/20 absolute top-1/2 left-1/2"
        animate={{
          y: [0, -8, 0],
          x: [0, 6, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      >
        <Star size={10} />
      </motion.div>

      {/* Larger Animated Elements */}
      <motion.div
        className="bg-primary/15 absolute top-1/5 right-1/5 h-4 w-4 rounded-full"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.15)' }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.8,
        }}
      />
      <motion.div
        className="bg-destructive/20 absolute bottom-1/5 left-1/4 h-3 w-3 rounded-full"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.2)' }}
        animate={{
          y: [0, 25, 0],
          x: [0, -12, 0],
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
        }}
      />

      {/* Emoji Animations */}
      <motion.div
        className="absolute top-1/6 right-1/6 text-2xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute right-1/6 bottom-1/6 text-xl"
        animate={{
          y: [0, 18, 0],
          rotate: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.6,
        }}
      >
        🎯
      </motion.div>
      <motion.div
        className="absolute top-2/3 left-1/8 text-lg"
        animate={{
          y: [0, -12, 0],
          x: [0, 8, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      >
        📚
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/8 text-xl"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 25, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.3,
        }}
      >
        🌟
      </motion.div>
      <motion.div
        className="absolute right-1/5 bottom-1/4 text-lg"
        animate={{
          y: [0, -10, 0],
          x: [0, -5, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
      >
        💫
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-1/6 text-xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4.0,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
        }}
      >
        🎨
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/5 text-lg"
        animate={{
          y: [0, 12, 0],
          x: [0, -6, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.1,
        }}
      >
        🔮
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4 text-xl"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3.7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute bottom-1/6 left-1/3 text-lg"
        animate={{
          y: [0, 14, 0],
          x: [0, 4, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4.1,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.4,
        }}
      >
        🎪
      </motion.div>
      <motion.div
        className="absolute top-3/4 left-1/6 text-xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -25, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3.9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
      >
        🌈
      </motion.div>
    </div>
  );
}
