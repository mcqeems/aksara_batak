import { motion } from 'framer-motion';

export function HeroBottomBar() {
  return (
    <motion.div
      className="absolute right-0 bottom-0 left-0 z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="bg-primary/90 border-primary/20 border-t backdrop-blur-sm">
        <div className="container mx-auto overflow-hidden px-4 py-3">
          <div className="carousel-scroll flex items-center gap-8 font-medium text-white">
            <span className="whitespace-nowrap">
              ᯔᯔ᯲ᯕᯞᯒᯪ ᯘᯮᯒᯒᯖ᯲ ᯅᯖᯂ᯲ ᯂᯬ ᯔᯒᯞᯘᯉᯪᯒᯬᯂ
            </span>
            <span className="whitespace-nowrap">
              Mamelajari surat Batak on marlasniroha!
            </span>
            <span className="whitespace-nowrap">
              Belajar aksara Batak itu menyenangkan!
            </span>
            <span className="whitespace-nowrap">PODA HORAS</span>
            <span className="whitespace-nowrap">
              ᯘᯀᯮ ᯔᯔ᯲ᯕᯞᯒᯪ ᯑᯬ ᯂᯪᯖ ᯔᯒ᯲ᯘᯉᯒ᯲
            </span>
            <span className="whitespace-nowrap">
              Sai mamelajari do hita marsianjar!
            </span>
            <span className="whitespace-nowrap">Ayo belajar bersama!</span>
            <span className="whitespace-nowrap">
              ᯔᯔ᯲ᯕᯞᯒᯪ ᯘᯮᯒᯒᯖ᯲ ᯅᯖᯂ᯲ ᯂᯬ ᯔᯒᯞᯘᯉᯪᯒᯬᯂ
            </span>
            <span className="whitespace-nowrap">
              Mamelajari surat Batak on marlasniroha!
            </span>
            <span className="whitespace-nowrap">
              Belajar aksara Batak itu menyenangkan!
            </span>
            <span className="whitespace-nowrap">PODAHORAS</span>
            <span className="whitespace-nowrap">
              ᯘᯀᯮ ᯔᯔ᯲ᯕᯞᯒᯪ ᯑᯬ ᯂᯪᯖ ᯔᯒ᯲ᯘᯉᯒ᯲
            </span>
            <span className="whitespace-nowrap">
              Sai mamelajari do hita marsianjar!
            </span>
            <span className="whitespace-nowrap">Ayo belajar bersama!</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
