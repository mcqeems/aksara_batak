import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EmojiSad from '@/components/icon/EmojiSad';

export function NotFoundContent() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-8"
      >
        {/* 404 Number with Fail Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <h1 className="text-primary/10 absolute inset-0 flex items-center justify-center text-8xl font-black select-none md:text-[10rem]">
            404
          </h1>
          <div className="relative z-10 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="h-32 w-32 md:h-36 md:w-36"
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
          className="space-y-4"
        >
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg text-lg leading-relaxed">
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
            <Link to="/" className="flex items-center justify-center">
              Kembali ke Beranda
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-64 sm:w-48"
          >
            <Link to="/pengenalan" className="flex items-center justify-center">
              Jelajahi Konten
            </Link>
          </Button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-border/50 border-t pt-6"
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
  );
}
