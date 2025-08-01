import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Heart, BookMarked } from 'lucide-react';

export function CallToActionSection() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 pt-24 text-center"
      style={{ backgroundColor: 'var(--background)' }}
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
            backgroundSize: '30px 30px',
          }}
        ></div>

        {/* Dots Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        ></div>

        {/* Diagonal Lines */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.03) 3px,
                rgba(255,255,255,0.03) 6px
              )
            `,
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="from-primary/8 to-destructive/8 absolute inset-0 bg-gradient-to-br via-transparent"></div>
      </div>

      {/* Multiple Animated Background Blobs */}
      <motion.div
        className="bg-primary/15 absolute top-1/6 left-1/6 h-72 w-72 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="bg-destructive/15 absolute right-1/6 bottom-1/6 h-56 w-56 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="bg-primary/10 absolute top-1/3 right-1/4 h-40 w-40 rounded-full blur-xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="bg-destructive/10 absolute bottom-1/3 left-1/4 h-32 w-32 rounded-full blur-lg"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="text-primary/30 absolute top-1/4 left-1/8"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Star size={20} />
      </motion.div>
      <motion.div
        className="text-destructive/30 absolute top-1/3 right-1/8"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -360, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <Sparkles size={18} />
      </motion.div>
      <motion.div
        className="text-primary/25 absolute bottom-1/4 left-1/6"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <Heart size={16} />
      </motion.div>
      <motion.div
        className="text-destructive/25 absolute right-1/6 bottom-1/3"
        animate={{
          y: [0, 20, 0],
          x: [0, -12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <BookMarked size={22} />
      </motion.div>
      <motion.div
        className="text-primary/20 absolute top-1/2 left-1/12"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      >
        <Star size={14} />
      </motion.div>
      <motion.div
        className="text-destructive/20 absolute top-1/2 right-1/12"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      >
        <Sparkles size={12} />
      </motion.div>

      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Elements */}
          <div className="border-primary absolute -top-8 -left-8 h-16 w-16 border-t-2 border-l-2 opacity-60"></div>
          <div className="border-primary absolute -top-8 -right-8 h-16 w-16 border-t-2 border-r-2 opacity-60"></div>
          <div className="border-primary absolute -bottom-8 -left-8 h-16 w-16 border-b-2 border-l-2 opacity-60"></div>
          <div className="border-primary absolute -right-8 -bottom-8 h-16 w-16 border-r-2 border-b-2 opacity-60"></div>

          {/* Main Content */}
          <div className="bg-card/60 border-border/50 relative rounded-3xl border p-12 shadow-2xl backdrop-blur-sm">
            {/* Floating Elements around content */}
            <motion.div
              className="text-primary/40 absolute -top-4 -left-4"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Star size={24} />
            </motion.div>
            <motion.div
              className="text-destructive/40 absolute -top-4 -right-4"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -360, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              <Sparkles size={20} />
            </motion.div>
            <motion.div
              className="text-primary/30 absolute -bottom-4 -left-4"
              animate={{
                y: [0, 8, 0],
                rotate: [0, 180, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            >
              <Heart size={18} />
            </motion.div>
            <motion.div
              className="text-destructive/30 absolute -right-4 -bottom-4"
              animate={{
                y: [0, -8, 0],
                rotate: [0, -180, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5,
              }}
            >
              <BookMarked size={22} />
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-primary text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                  Siapkah Anda Menjadi{' '}
                  <span className="text-foreground">Penjaga</span>{' '}
                  <span className="from-primary to-destructive bg-gradient-to-r bg-clip-text text-transparent">
                    Aksara Batak?
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
                  Bergabunglah dengan ribuan orang lain dalam melestarikan salah
                  satu warisan budaya Indonesia yang tak ternilai harganya.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center gap-6"
              >
                <Link to="/mulai">
                  <Button size="lg" className="w-full sm:w-auto">
                    Mulai Belajar Gratis
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
