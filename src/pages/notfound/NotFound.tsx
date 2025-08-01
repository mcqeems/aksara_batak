import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EmojiSad from '@/components/icon/EmojiSad';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BookOpen, Users, Lightbulb, Heart, Star } from 'lucide-react';

function NotFound() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden p-4 text-center">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Background */}
          <div
            className="bg-background via-background/95 to-muted/20 absolute inset-0 bg-gradient-to-br"
            style={{
              background:
                'linear-gradient(to bottom right, var(--background), rgba(var(--background), 0.95), rgba(var(--muted), 0.2))',
            }}
          ></div>

          {/* Multiple Animated Circles */}
          <motion.div
            className="bg-primary/25 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(236, 187, 136, 0.25)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="bg-destructive/25 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(255, 102, 102, 0.25)' }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div
            className="bg-primary/20 absolute top-1/3 left-1/4 h-64 w-64 rounded-full blur-2xl"
            style={{ backgroundColor: 'rgba(236, 187, 136, 0.2)' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
          <motion.div
            className="bg-destructive/20 absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full blur-xl"
            style={{ backgroundColor: 'rgba(255, 102, 102, 0.2)' }}
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          ></div>

          {/* Dots Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          ></div>

          {/* Diagonal Lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 3px,
                  rgba(255,255,255,0.05) 3px,
                  rgba(255,255,255,0.05) 6px
                )
              `,
            }}
          ></div>

          {/* Floating Elements */}
          <motion.div
            className="bg-primary/30 absolute top-1/4 left-1/4 h-3 w-3 rounded-full"
            style={{ backgroundColor: 'rgba(236, 187, 136, 0.3)' }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="bg-primary/40 absolute top-1/3 right-1/3 h-2 w-2 rounded-full"
            style={{ backgroundColor: 'rgba(236, 187, 136, 0.4)' }}
            animate={{
              y: [0, 25, 0],
              x: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
          <motion.div
            className="bg-destructive/30 absolute right-1/4 bottom-1/4 h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: 'rgba(255, 102, 102, 0.3)' }}
            animate={{
              y: [0, -20, 0],
              x: [0, 12, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
          <motion.div
            className="bg-destructive/25 absolute bottom-1/3 left-1/5 h-2 w-2 rounded-full"
            style={{ backgroundColor: 'rgba(255, 102, 102, 0.25)' }}
            animate={{
              y: [0, 18, 0],
              x: [0, -8, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />

          {/* Floating Icons */}
          <motion.div
            className="text-primary/40 absolute top-1/4 right-1/4"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <BookOpen size={20} />
          </motion.div>
          <motion.div
            className="text-destructive/40 absolute top-1/3 left-1/5"
            animate={{
              y: [0, 25, 0],
              rotate: [0, -360, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.2,
            }}
          >
            <Heart size={18} />
          </motion.div>
          <motion.div
            className="text-primary/35 absolute bottom-1/4 left-1/3"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          >
            <Users size={16} />
          </motion.div>
          <motion.div
            className="text-destructive/35 absolute right-1/6 bottom-1/3"
            animate={{
              y: [0, 20, 0],
              x: [0, -12, 0],
              rotate: [0, -180, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.1,
            }}
          >
            <Lightbulb size={14} />
          </motion.div>
          <motion.div
            className="text-primary/30 absolute top-1/2 left-1/2"
            animate={{
              y: [0, -10, 0],
              x: [0, 8, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.9,
            }}
          >
            <Star size={12} />
          </motion.div>

          {/* Floating Emoji Elements */}
          <motion.div
            className="absolute top-1/6 right-1/6 text-3xl"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 20, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute right-1/6 bottom-1/6 text-2xl"
            animate={{
              y: [0, 22, 0],
              rotate: [0, -25, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.6,
            }}
          >
            🎯
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-1/8 text-xl"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.9,
            }}
          >
            📚
          </motion.div>
          <motion.div
            className="absolute right-1/8 bottom-1/3 text-lg"
            animate={{
              y: [0, 18, 0],
              x: [0, -8, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4.1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.3,
            }}
          >
            💡
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-12"
          >
            {/* 404 Number with Fail Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <h1 className="text-primary/10 absolute inset-0 flex items-center justify-center text-9xl font-black select-none md:text-[12rem]">
                404
              </h1>
              <div className="relative z-10 flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="h-32 w-32 md:h-40 md:w-40"
                >
                  <EmojiSad />
                </motion.div>
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-foreground text-3xl font-bold md:text-4xl">
                Halaman Tidak Ditemukan
              </h2>
              <p className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed">
                Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin URL
                salah atau halaman telah dipindahkan.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button asChild size="lg" className="w-64 sm:w-48">
                <Link to="/" className="flex items-center justify-center gap-3">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Kembali ke Beranda
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="w-64 sm:w-48"
              >
                <Link
                  to="/pengenalan"
                  className="flex items-center justify-center gap-3"
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  Jelajahi Konten
                </Link>
              </Button>
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="border-border/50 border-t pt-10"
            >
              <p className="text-muted-foreground text-sm">
                Jika Anda yakin ini adalah kesalahan, silakan{' '}
                <Link to="/contact" className="text-primary hover:underline">
                  hubungi kami
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
