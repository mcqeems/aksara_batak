import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const CardLink = ({
  title,
  description,
  to,
  imageSrc,
  delay,
}: {
  title: string;
  description: string;
  to: string;
  imageSrc: string;
  delay: number;
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative flex h-full w-full cursor-pointer items-end justify-center overflow-hidden rounded-xl p-8 text-center shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
      onClick={() => navigate(to)}
    >
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/60"></div>
      <div className="relative z-10 text-white">
        <h2 className="mb-2 text-4xl font-bold">{title}</h2>
        <p className="text-lg">{description}</p>
      </div>
    </motion.div>
  );
};

function Pengenalan() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4 pt-16">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Jelajahi Aksara Batak
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Pilih jalur pembelajaran Anda: selami sejarah atau pahami
            strukturnya.
          </p>
        </motion.div>

        <div className="grid h-[60vh] w-full grid-cols-1 gap-8 md:grid-cols-2">
          <CardLink
            title="Sejarah Aksara Batak"
            description="Telusuri asal-usul, perkembangan, dan upaya pelestarian aksara kuno ini."
            to="/pengenalan/sejarah"
            imageSrc="https://picsum.photos/seed/history/800/600" // Placeholder image
            delay={0.2}
          />
          <CardLink
            title="Struktur Aksara Batak"
            description="Pahami ina ni surat, anak ni surat, dan aturan penulisan Aksara Batak."
            to="/pengenalan/penjelasan"
            imageSrc="https://picsum.photos/seed/structure/800/600" // Placeholder image
            delay={0.4}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Pengenalan;
