import { motion } from 'framer-motion';
import { WelcomeCard } from './WelcomeCard';

export function HeroLeftSection() {
  return (
    <motion.div
      className="relative flex items-center justify-start pl-14"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex items-start gap-8">
        <WelcomeCard text1="" text2="Selamat Datang!" />
        <WelcomeCard
          text1=""
          text2="tondimangido hita!"
          rotation={[1, -1.5, 1.5, -1.5, 1]}
          delay={0.8}
        />
        <WelcomeCard
          text1=""
          text2="ᯖᯧᯉ᯲ᯑᯪᯔᯰᯑᯬ ᯂᯪᯖ"
          rotation={[-1.2, 1.2, -1, 1, -1.2]}
          delay={1}
        />
      </div>

      {/* Additional decorative elements around the card */}
      <motion.div
        className="absolute -top-4 -right-4 h-8 w-8 rounded-full border-2 border-[#ecbb88]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-6 -left-6 h-4 w-4 rounded-full bg-[#ecbb88]/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
