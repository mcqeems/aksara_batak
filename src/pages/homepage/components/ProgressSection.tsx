import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Heart, BookMarked } from 'lucide-react';

export function ProgressSection() {
  return (
    <div className="px-4 py-24 md:px-8">
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
              Pantau Perjalanan Belajar Anda
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Rasakan kemajuan nyata dalam belajar Aksara Batak dengan sistem
            pelacakan pintar dan personalisasi unik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Statistik Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="group bg-card/90 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            {/* Background Blob */}
            <div className="bg-primary/15 group-hover:bg-primary/25 absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-destructive/10 group-hover:bg-destructive/20 absolute -bottom-20 -left-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-foreground text-xl font-semibold">
                  Statistik Harian
                </h3>
                <span className="from-primary/20 to-primary/30 text-primary border-primary/20 rounded-full border bg-gradient-to-r px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  🔥 5 Day Streak
                </span>
              </div>
              <div className="space-y-6">
                <div className="from-primary/5 to-primary/10 border-primary/20 flex items-center justify-between rounded-xl border bg-gradient-to-r p-4">
                  <span className="text-muted-foreground font-medium">
                    Total XP:
                  </span>
                  <span className="text-primary text-xl font-bold">850 XP</span>
                </div>
                <div className="from-primary/5 to-primary/10 border-primary/20 flex items-center justify-between rounded-xl border bg-gradient-to-r p-4">
                  <span className="text-muted-foreground font-medium">
                    Level:
                  </span>
                  <span className="text-primary text-xl font-bold">Lv. 7</span>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <Progress value={70} className="bg-primary/20 h-4" />
                    <div className="from-primary/60 to-primary/80 absolute inset-0 rounded-full bg-gradient-to-r opacity-70"></div>
                  </div>
                  <p className="text-muted-foreground text-right text-sm font-medium">
                    XP menuju Lv. 8
                  </p>
                </div>
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
                <Star size={18} />
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
                <Sparkles size={16} />
              </motion.div>
            </div>
          </motion.div>

          {/* Leaderboard Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group bg-card/90 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            {/* Background Blob */}
            <div className="bg-destructive/15 group-hover:bg-destructive/25 absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-20 -right-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-8">
              <h3 className="text-foreground mb-6 text-xl font-semibold">
                Peringkat Global
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center justify-between rounded-xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🥇</span>
                    <span className="text-foreground font-semibold">
                      Syafaul Umam
                    </span>
                  </div>
                  <span className="text-primary text-lg font-bold">
                    1520 XP
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-xl border border-gray-400/20 bg-gradient-to-r from-gray-400/10 to-gray-500/10 p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🥈</span>
                    <span className="text-foreground font-semibold">
                      Aldiyanto
                    </span>
                  </div>
                  <span className="text-primary text-lg font-bold">
                    1340 XP
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-xl border border-amber-600/20 bg-gradient-to-r from-amber-600/10 to-amber-700/10 p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🥉</span>
                    <span className="text-foreground font-semibold">
                      Firdis Firnadi
                    </span>
                  </div>
                  <span className="text-primary text-lg font-bold">
                    1250 XP
                  </span>
                </li>
              </ul>
              <div className="from-primary/10 to-destructive/10 border-primary/20 mt-6 rounded-xl border bg-gradient-to-r p-4">
                <p className="text-muted-foreground text-center text-sm">
                  Anda saat ini di{' '}
                  <span className="text-primary font-bold">peringkat 7</span>.
                </p>
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
                <Sparkles size={18} />
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
                <Star size={16} />
              </motion.div>
            </div>
          </motion.div>

          {/* Avatar Customization */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group bg-card/90 border-border/50 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            {/* Background Blob */}
            <div className="bg-primary/15 group-hover:bg-primary/25 absolute -top-20 -left-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
            <div className="bg-destructive/15 group-hover:bg-destructive/25 absolute -right-20 -bottom-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>

            <div className="relative z-10 p-8">
              <h3 className="text-foreground mb-6 text-center text-xl font-semibold">
                Avatar & Personalisasi
              </h3>
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="from-primary/20 to-destructive/20 absolute inset-0 rounded-full bg-gradient-to-r blur-xl"></div>
                  <img
                    src="/assets/images/dev/github/mubaihaqi.jpeg"
                    alt="User Avatar"
                    className="border-primary relative h-28 w-28 rounded-full border-4 shadow-2xl"
                  />
                  <div className="from-primary to-destructive absolute -right-2 -bottom-2 rounded-full border-2 border-white bg-gradient-to-r p-3 shadow-lg">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <motion.div
                    className="text-primary/60 absolute -top-2 -left-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Star size={16} />
                  </motion.div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="from-primary/10 to-destructive/10 border-primary/20 hover:from-primary/20 hover:to-destructive/20 bg-gradient-to-r shadow-lg"
                >
                  Ganti Avatar
                </Button>
              </div>
              <div className="from-primary/10 to-destructive/10 border-primary/20 mt-6 rounded-xl border bg-gradient-to-r p-4">
                <p className="text-muted-foreground text-center text-sm font-medium">
                  Tampilkan gaya Anda dalam komunitas belajar!
                </p>
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
                <Heart size={18} />
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
                <BookMarked size={20} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
