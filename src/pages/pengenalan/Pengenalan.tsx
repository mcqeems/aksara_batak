import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, History, ArrowRight, Sparkles } from 'lucide-react';

const LearningCard = ({
  title,
  description,
  to,
  imageSrc,
  icon: Icon,
  delay,
  gradient,
}: {
  title: string;
  description: string;
  to: string;
  imageSrc: string;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
  gradient: string;
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate(to)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 ${gradient} opacity-80`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <motion.div
            className="rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRight className="h-5 w-5 text-white" />
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              {title}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-white/90">
              {description}
            </p>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="w-fit border-white/30 bg-white/20 text-white hover:bg-white/30"
          >
            Mulai Belajar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

function Pengenalan() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="from-background via-background/95 to-muted/20 relative overflow-hidden bg-gradient-to-br py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                className="bg-primary/10 rounded-full p-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Sparkles className="text-primary h-12 w-12" />
              </motion.div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Jelajahi
              <span className="text-primary block">Aksara Batak</span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              Temukan warisan budaya tertua Nusantara melalui pembelajaran
              interaktif. Pilih jalur yang sesuai dengan minat Anda.
            </p>
          </motion.div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="bg-primary/5 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="bg-destructive/5 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>
      </section>

      {/* Learning Cards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Pilih Jalur Pembelajaran
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Mulai perjalanan Anda dalam memahami aksara Batak dari perspektif
              yang berbeda
            </p>
          </motion.div>

          <div className="grid h-[70vh] w-full grid-cols-1 gap-8 md:grid-cols-2">
            <LearningCard
              title="Sejarah Aksara Batak"
              description="Telusuri asal-usul, perkembangan, dan upaya pelestarian aksara kuno yang telah bertahan ratusan tahun."
              to="/pengenalan/sejarah"
              imageSrc="https://picsum.photos/seed/batak-history/800/600"
              icon={History}
              delay={0.4}
              gradient="bg-gradient-to-br from-orange-600/80 to-red-600/80"
            />
            <LearningCard
              title="Struktur Aksara Batak"
              description="Pahami ina ni surat, anak ni surat, dan aturan penulisan yang membentuk sistem aksara yang unik."
              to="/pengenalan/penjelasan"
              imageSrc="https://picsum.photos/seed/batak-structure/800/600"
              icon={BookOpen}
              delay={0.6}
              gradient="bg-gradient-to-br from-blue-600/80 to-purple-600/80"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-background/50 border-0 text-center shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
                  <BookOpen className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">
                  Pembelajaran Interaktif
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Belajar melalui animasi, audio, dan latihan yang menarik untuk
                  pengalaman yang lebih mendalam.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-0 text-center shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
                  <History className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Warisan Budaya</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pelajari nilai-nilai budaya dan filosofi yang terkandung dalam
                  setiap aksara Batak.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-0 text-center shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
                  <Sparkles className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Pelestarian Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Ikut berkontribusi dalam melestarikan aksara Batak di era
                  digital melalui pembelajaran modern.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Pengenalan;
