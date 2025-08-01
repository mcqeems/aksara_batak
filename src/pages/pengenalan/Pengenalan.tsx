import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  PengenalanHeader,
  LearningSection,
  AnimatedBackground,
} from './components';

function Pengenalan() {
  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col overflow-hidden">
      <AnimatedBackground />
      <Navbar />

      <div className="relative z-10 mt-16 flex flex-1 items-center justify-center px-4 py-4">
        <motion.div
          className="bg-card/50 border-border/50 w-full max-w-6xl rounded-2xl border p-6 shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <PengenalanHeader />
          <LearningSection />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default Pengenalan;
