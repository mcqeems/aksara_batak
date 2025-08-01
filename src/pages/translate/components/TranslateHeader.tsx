import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';

export function TranslateHeader() {
  return (
    <motion.div
      className="mb-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-3 flex justify-center">
        <motion.div
          className="bg-primary/10 rounded-full p-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Languages className="text-primary h-8 w-8" />
        </motion.div>
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
        Terjemahkan
        <span className="text-primary block">Aksara Batak</span>
      </h1>

      <p className="text-muted-foreground mx-auto hidden max-w-lg text-base leading-relaxed md:block">
        Terjemahkan teks dari dan ke Bahasa Batak dengan mudah dan cepat.
        Pelajari kosakata dan ungkapan tradisional Batak.
      </p>
    </motion.div>
  );
}
