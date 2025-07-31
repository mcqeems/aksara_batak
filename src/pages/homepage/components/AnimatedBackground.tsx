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

      <motion.div
        className="bg-primary/25 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.25)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="bg-destructive/25 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.25)' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="bg-primary/20 absolute top-1/3 left-1/4 h-64 w-64 rounded-full blur-2xl"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.2)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="bg-destructive/20 absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.2)' }}
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 3px,
              rgba(255,255,255,0.05) 3px,
              rgba(255,255,255,0.05) 6px
            )
          `,
        }}
      ></div>

      {/* Floating Elements */}
      <motion.div
        className="bg-primary/30 absolute top-1/4 left-1/4 h-3 w-3 rounded-full"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.3)' }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="bg-primary/40 absolute top-1/3 right-1/3 h-2 w-2 rounded-full"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.4)' }}
        animate={{
          y: [0, 25, 0],
          x: [0, -10, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="bg-destructive/30 absolute right-1/4 bottom-1/4 h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.3)' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 12, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className="bg-destructive/25 absolute bottom-1/3 left-1/5 h-2 w-2 rounded-full"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.25)' }}
        animate={{
          y: [0, 18, 0],
          x: [0, -8, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="text-primary/40 absolute top-1/4 right-1/4"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Star size={20} />
      </motion.div>
      <motion.div
        className="text-destructive/40 absolute top-1/3 left-1/5"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -360, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      >
        <Heart size={18} />
      </motion.div>
      <motion.div
        className="text-primary/35 absolute bottom-1/4 left-1/3"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          rotate: [0, 180, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      >
        <Sparkles size={16} />
      </motion.div>
      <motion.div
        className="text-destructive/35 absolute right-1/6 bottom-1/3"
        animate={{
          y: [0, 20, 0],
          x: [0, -12, 0],
          rotate: [0, -180, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.1,
        }}
      >
        <BookMarked size={14} />
      </motion.div>
      <motion.div
        className="text-primary/30 absolute top-1/2 left-1/2"
        animate={{
          y: [0, -10, 0],
          x: [0, 8, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      >
        <Star size={12} />
      </motion.div>

      <motion.div
        className="bg-primary/20 absolute top-1/5 right-1/5 h-4 w-4 rounded-full"
        style={{ backgroundColor: 'rgba(236, 187, 136, 0.2)' }}
        animate={{
          y: [0, -35, 0],
          x: [0, 18, 0],
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.8,
        }}
      />
      <motion.div
        className="bg-destructive/25 absolute bottom-1/5 left-1/4 h-3 w-3 rounded-full"
        style={{ backgroundColor: 'rgba(255, 102, 102, 0.25)' }}
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
        }}
      />

      <motion.div
        className="absolute top-1/6 right-1/6 text-3xl"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 20, 0],
          opacity: [0.4, 0.9, 0.4],
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
        className="absolute right-1/6 bottom-1/6 text-2xl"
        animate={{
          y: [0, 22, 0],
          rotate: [0, -25, 0],
          opacity: [0.3, 0.7, 0.3],
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
        className="absolute top-2/3 left-1/8 text-xl"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          opacity: [0.4, 0.8, 0.4],
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
        className="absolute right-1/8 bottom-1/3 text-lg"
        animate={{
          y: [0, 18, 0],
          x: [0, -8, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4.1,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.3,
        }}
      >
        💡
      </motion.div>
    </div>
  );
}
