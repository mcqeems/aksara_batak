import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EmojiSad from '@/components/icon/EmojiSad';

function NotFound() {
  return (
    <div className="from-background via-background/95 to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* Main Content */}
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

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2, delay: 1 }}
            className="bg-primary absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.02 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="bg-destructive absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
