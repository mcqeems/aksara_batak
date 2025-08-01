import { motion } from 'framer-motion';
import { Users, BookOpen, Heart } from 'lucide-react';

export function ImpactSection() {
  return (
    <div
      className="px-4 py-20 md:px-8"
      style={{ backgroundColor: 'var(--muted)' }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '25px 25px',
          }}
        ></div>
        {/* Dots Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)
            `,
            backgroundSize: '35px 35px',
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="from-primary/5 to-destructive/5 absolute inset-0 bg-gradient-to-br via-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="relative">
            {/* Decorative Lines */}
            <div className="border-primary absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2"></div>
            <div className="border-primary absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2"></div>

            <h2 className="text-primary text-3xl font-bold tracking-tight md:text-4xl">
              Dampak Kami Sejauh Ini
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Angka-angka yang berbicara tentang dedikasi kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group bg-card/90 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            {/* Background Blob */}
            <div className="bg-primary/15 group-hover:bg-primary/25 absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-destructive/10 group-hover:bg-destructive/20 absolute -bottom-20 -left-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-8 text-center">
              <div className="bg-primary/10 text-primary mb-6 inline-flex rounded-xl p-4 shadow-lg">
                <Users size={48} />
              </div>
              <h3 className="text-primary text-5xl font-bold">1000+</h3>
              <p className="text-muted-foreground mt-2 text-lg">
                Pengguna Aktif
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
                <Heart size={18} />
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
                <BookOpen size={16} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group bg-card/90 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            {/* Background Blob */}
            <div className="bg-destructive/15 group-hover:bg-destructive/25 absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-20 -right-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-8 text-center">
              <div className="bg-primary/10 text-primary mb-6 inline-flex rounded-xl p-4 shadow-lg">
                <BookOpen size={48} />
              </div>
              <h3 className="text-primary text-5xl font-bold">50+</h3>
              <p className="text-muted-foreground mt-2 text-lg">
                Materi Pelajaran
              </p>

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
                <Heart size={16} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group bg-card/90 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            {/* Background Blob */}
            <div className="bg-primary/15 group-hover:bg-primary/25 absolute -top-20 -left-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-destructive/15 group-hover:bg-destructive/25 absolute -right-20 -bottom-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-8 text-center">
              <div className="bg-primary/10 text-primary mb-6 inline-flex rounded-xl p-4 shadow-lg">
                <Heart size={48} />
              </div>
              <h3 className="text-primary text-5xl font-bold">100%</h3>
              <p className="text-muted-foreground mt-2 text-lg">
                Dedikasi Budaya
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
                className="text-destructive/40 absolute bottom-4 left-4"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -360, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <Users size={20} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
