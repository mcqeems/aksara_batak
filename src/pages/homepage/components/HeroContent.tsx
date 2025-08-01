import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroContent() {
  return (
    <motion.div
      className="relative flex flex-col gap-8 text-center lg:text-left"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Background decorative elements */}
      <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ecbb88]/5 to-transparent blur-xl"></div>
      <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-tl from-[#ecbb88]/5 to-transparent blur-xl"></div>

      <div className="relative z-10 space-y-6">
        <div className="space-y-3">
          <motion.h2
            className="font-bawor text-2xl font-medium tracking-wide text-[#ecbb88] md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Mulai Belajar
          </motion.h2>
          <motion.h1
            className="font-bawor text-foreground relative text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Aksara Batak!
            {/* Decorative underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-[#ecbb88] via-[#ecbb88]/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </motion.h1>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="absolute top-1/2 -left-4 h-1 w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#ecbb88] to-transparent"></div>
          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed md:text-xl md:leading-relaxed">
            Pelajari aksara Batak, diakritik, tata bahasa dasar, dan kosakata
            harian dengan pelajaran interaktif, animasi lucu, dan kuis seru.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-4 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <Link to="/mulai">
          <Button
            size="lg"
            className="group relative w-full overflow-hidden px-8 py-3 text-base font-semibold sm:w-auto"
          >
            <span className="relative z-10">Mulai Sekarang</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ecbb88]/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </Link>
        <Link to="/pengenalan">
          <Button
            variant="secondary"
            size="lg"
            className="group relative w-full overflow-hidden px-8 py-3 text-base font-semibold sm:w-auto"
          >
            <span className="relative z-10">Pelajari Dasar</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ecbb88]/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
