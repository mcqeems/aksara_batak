import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function PengenalanHeader() {
  return (
    <motion.div
      className="mb-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-3 flex justify-center">
        <motion.div
          className="bg-primary/20 border-primary/30 rounded-full border p-3 backdrop-blur-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Sparkles className="text-primary h-8 w-8" />
        </motion.div>
      </div>

      <h1 className="font-bawor mb-3 text-3xl font-bold tracking-tight md:text-4xl">
        Jelajahi
        <span className="text-primary mt-1 block">Aksara Batak</span>
      </h1>

      <p className="text-muted-foreground font-inter mx-auto max-w-2xl text-base leading-relaxed">
        Temukan warisan budaya tertua Nusantara melalui pembelajaran interaktif
        yang hangat dan menyenangkan.
      </p>
    </motion.div>
  );
}
