import { motion } from 'framer-motion';
import { History, BookOpen } from 'lucide-react';
import { LearningCard } from './LearningCard';

export function LearningSection() {
  return (
    <>
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="font-bawor mb-3 text-2xl font-bold md:text-3xl">
          Pilih Jalur Pembelajaran
        </h2>
        <p className="text-muted-foreground font-inter mx-auto max-w-2xl text-sm md:text-base">
          Mulai perjalanan Anda dalam memahami aksara Batak dari perspektif yang
          berbeda
        </p>
      </motion.div>

      <div className="grid h-[40vh] w-full grid-cols-1 gap-6 md:grid-cols-2">
        <LearningCard
          title="Sejarah Aksara Batak"
          description="Telusuri asal-usul, perkembangan, dan upaya pelestarian aksara kuno yang telah bertahan ratusan tahun."
          to="/pengenalan/sejarah"
          icon={History}
          delay={0.4}
          gradient="bg-gradient-to-br from-[#ecbb88]/90 via-[#d8a56e]/90 to-[#cc9900]/90"
          accentColor="text-[#ffddb8]"
        />
        <LearningCard
          title="Struktur Aksara Batak"
          description="Pahami sejarah perkembangan setiap huruf aksara Batak dari masa ke masa."
          to="/pengenalan/penjelasan"
          icon={BookOpen}
          delay={0.6}
          gradient="bg-gradient-to-br from-[#9c9c9c]/90 via-[#696969]/90 to-[#3f3f46]/90"
          accentColor="text-[#e4e4e7]"
        />
      </div>
    </>
  );
}
