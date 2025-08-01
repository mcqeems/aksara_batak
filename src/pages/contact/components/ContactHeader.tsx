import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function ContactHeader() {
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
          <MessageCircle className="text-primary h-8 w-8" />
        </motion.div>
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
        Hubungi
        <span className="text-primary block">Kami</span>
      </h1>

      <p className="text-muted-foreground mx-auto max-w-lg text-base leading-relaxed">
        Punya pertanyaan, masukan, atau ingin berkolaborasi dalam melestarikan
        aksara Batak? Kami siap mendengar dari Anda.
      </p>
    </motion.div>
  );
}
