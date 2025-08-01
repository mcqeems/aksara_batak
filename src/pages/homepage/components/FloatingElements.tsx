import { motion } from 'framer-motion';

export function FloatingElements() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Batak characters */}
      <motion.div
        className="font-bawor absolute top-20 left-10 text-4xl text-[#ecbb88]/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ᯀ
      </motion.div>
      <motion.div
        className="font-bawor absolute top-40 right-20 text-3xl text-[#ecbb88]/15"
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        ᯅ
      </motion.div>
      <motion.div
        className="font-bawor absolute bottom-40 left-20 text-2xl text-[#ecbb88]/10"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        ᯎ
      </motion.div>
      <motion.div
        className="font-bawor absolute right-10 bottom-20 text-3xl text-[#ecbb88]/20"
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        ᯔ
      </motion.div>

      {/* Decorative circles */}
      <motion.div
        className="absolute top-32 left-1/4 h-2 w-2 rounded-full bg-[#ecbb88]/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-1/4 bottom-32 h-3 w-3 rounded-full bg-[#ecbb88]/20"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 h-1 w-1 rounded-full bg-[#ecbb88]/40"
        animate={{ scale: [1, 2, 1], opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </motion.div>
  );
}
