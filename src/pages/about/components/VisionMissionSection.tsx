import { motion } from 'framer-motion';
import { Lightbulb, BookOpen, Heart, Users } from 'lucide-react';

export function VisionMissionSection() {
  return (
    <div className="px-4 py-20 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="relative">
            {/* Decorative Lines */}
            <div className="border-primary absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2"></div>
            <div className="border-primary absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2"></div>

            <h2 className="text-primary text-3xl font-bold tracking-tight md:text-4xl">
              Visi & Misi Kami
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Membangun masa depan yang menghargai akar budaya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group bg-card/80 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            {/* Background Blob */}
            <div className="bg-primary/15 group-hover:bg-primary/25 absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-destructive/10 group-hover:bg-destructive/20 absolute -bottom-20 -left-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-8">
              <div className="bg-primary/10 text-primary mb-6 inline-flex rounded-xl p-4 shadow-lg">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-foreground mb-4 text-2xl font-bold">Visi</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Menjadi platform terdepan dalam pelestarian dan pembelajaran
                Aksara Batak, menjadikannya relevan dan mudah diakses oleh semua
                kalangan di era digital.
              </p>

              {/* Floating Elements */}
              <motion.div
                className="text-primary/40 absolute top-4 right-4"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <BookOpen size={18} />
              </motion.div>
              <motion.div
                className="text-destructive/30 absolute bottom-4 left-4"
                animate={{
                  y: [0, 6, 0],
                  rotate: [0, -180, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <Heart size={16} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group bg-card/80 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            {/* Background Blob */}
            <div className="bg-destructive/15 group-hover:bg-destructive/25 absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-20 -right-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-8">
              <div className="bg-primary/10 text-primary mb-6 inline-flex rounded-xl p-4 shadow-lg">
                <BookOpen size={32} />
              </div>
              <h3 className="text-foreground mb-4 text-2xl font-bold">Misi</h3>
              <ul className="text-muted-foreground list-disc space-y-3 pl-5 text-lg leading-relaxed">
                <li>
                  Menyediakan materi belajar yang interaktif dan komprehensif.
                </li>
                <li>
                  Mengembangkan teknologi terjemahan Aksara Batak yang akurat.
                </li>
                <li>Membangun komunitas pembelajar yang aktif dan suportif.</li>
                <li>
                  Mendorong penggunaan Aksara Batak dalam kehidupan sehari-hari.
                </li>
              </ul>

              {/* Floating Elements */}
              <motion.div
                className="text-destructive/40 absolute top-4 left-4"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -360, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Users size={18} />
              </motion.div>
              <motion.div
                className="text-primary/30 absolute right-4 bottom-4"
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, 180, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
              >
                <Lightbulb size={16} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
