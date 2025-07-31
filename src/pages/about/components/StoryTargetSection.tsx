import { motion } from 'framer-motion';
import { BookOpen, Heart, Users, Lightbulb } from 'lucide-react';

export function StoryTargetSection() {
  return (
    <div className="px-4 py-20 md:px-8">
      <div className="container mx-auto space-y-32">
        {/* Our Story - Left Aligned */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="relative flex w-full"
        >
          {/* Sidebar Title - OUTSIDE CARD */}
          <div className="mr-4 flex w-16 flex-col items-center justify-center text-white">
            <div className="-rotate-90 transform text-center whitespace-nowrap">
              <h3 className="text-4xl font-bold">Our Story</h3>
              <p className="mt-1 text-xs opacity-70">
                Bagaimana PodaHoras dimulai.
              </p>
            </div>
          </div>

          {/* Card Content */}
          <motion.div
            className="group bg-card/90 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Blob */}
            <div className="bg-primary/15 group-hover:bg-primary/25 absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-destructive/10 group-hover:bg-destructive/20 absolute -bottom-20 -left-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-6 md:p-10">
              {/* Image with enhanced styling */}
              <div className="mb-6 overflow-hidden rounded-xl">
                <motion.img
                  src="/assets/images/about/story.png"
                  alt="Awal Mula PodaHoras"
                  className="h-64 w-full rounded-xl object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Image overlay gradient */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Text with enhanced styling */}
              <div className="text-center">
                <motion.h3
                  className="mb-4 text-2xl font-bold text-[#ecbb88]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Awal Mula PodaHoras
                </motion.h3>
                <motion.p
                  className="text-lg leading-relaxed text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  PodaHoras lahir dari kepedulian kami terhadap pelestarian
                  budaya Batak yang mulai tergerus zaman. Kami menyadari bahwa
                  generasi muda kian jauh dari akar tradisinya, terutama dalam
                  mengenal aksara Batak dan kearifan lokal yang menyertainya.
                  Dari kegelisahan itu, kami memulai inisiatif kecil untuk
                  memperkenalkan kembali warisan ini melalui pendekatan digital
                  yang modern.
                </motion.p>
                <motion.p
                  className="text-lg leading-relaxed text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Dengan semangat kebersamaan, PodaHoras dibangun sebagai ruang
                  belajar dan eksplorasi budaya Batak secara menyenangkan. Kami
                  ingin menjembatani nilai-nilai tradisi dengan teknologi, agar
                  budaya ini tak hanya dikenang, tetapi juga terus hidup dan
                  relevan di tengah dunia yang terus berubah.
                </motion.p>
              </div>

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
        </motion.div>

        {/* Our Target - Right Aligned */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="relative flex w-full flex-row-reverse"
        >
          {/* Sidebar Title - OUTSIDE CARD */}
          <div className="ml-4 flex w-16 flex-col items-center justify-center text-white">
            <div className="rotate-90 transform text-center whitespace-nowrap">
              <h3 className="text-4xl font-bold">Our Target</h3>
              <p className="mt-1 text-xs opacity-70">
                Siapa yang ingin kami jangkau.
              </p>
            </div>
          </div>

          {/* Card Content */}
          <motion.div
            className="group bg-card/90 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Blob */}
            <div className="bg-destructive/15 group-hover:bg-destructive/25 absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-20 -right-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-6 md:p-10">
              {/* Image with enhanced styling */}
              <div className="mb-6 overflow-hidden rounded-xl">
                <motion.img
                  src="/assets/images/about/target.png"
                  alt="Menjangkau Generasi Muda"
                  className="h-64 w-full rounded-xl object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Image overlay gradient */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Text with enhanced styling */}
              <div className="text-center">
                <motion.h3
                  className="mb-4 text-2xl font-bold text-[#ecbb88]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Menjangkau Generasi Muda
                </motion.h3>
                <motion.p
                  className="text-lg leading-relaxed text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Target kami adalah seluruh generasi muda yang tertarik untuk
                  mengenal dan melestarikan kekayaan budaya Nusantara, khususnya
                  warisan aksara Batak. Kami percaya bahwa budaya bukan hanya
                  milik satu suku, tetapi warisan bersama yang layak untuk
                  dipelajari dan dihargai oleh siapa pun.
                </motion.p>
                <motion.p
                  className="text-lg leading-relaxed text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  PodaHoras hadir sebagai ruang terbuka bagi siapa saja yang
                  ingin belajar dengan cara yang modern dan menyenangkan. Lewat
                  pendekatan visual, teknologi, dan interaktif, kami ingin
                  membangun jembatan antara masa lalu dan masa kini — agar
                  budaya tetap hidup, relevan, dan menginspirasi lintas
                  generasi.
                </motion.p>
              </div>

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
        </motion.div>
      </div>
    </div>
  );
}
