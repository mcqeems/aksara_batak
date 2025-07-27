import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Lightbulb, Heart, Instagram, Github, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/layout/footer';
import { useState, useEffect, useCallback } from 'react';

// Placeholder for textured background
const TexturedBackground = () => (
  <div className="absolute inset-0 -z-10 opacity-10">
    {/* Replace with your actual texture image */}
    <img
      src="/assets/logo/podahorasBlack.png" // Placeholder, ganti dengan tekstur Anda
      alt="Background Texture"
      className="h-full w-full object-cover opacity-20 dark:opacity-10"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-transparent"></div>
  </div>
);

// Reusable component for Story/Target sections
const ContentImageSection = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  reverse = false,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  reverse?: boolean;
}) => {
  const content = (
    <motion.div
      className="bg-card/50 border-border/50 flex flex-col gap-4 rounded-xl border p-6 shadow-lg backdrop-blur-sm"
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-lg">{description}</p>
      <Link to={buttonLink}>
        <Button>{buttonText}</Button>
      </Link>
    </motion.div>
  );

  const image = (
    <motion.div
      className="overflow-hidden rounded-xl shadow-lg"
      initial={{ opacity: 0, x: reverse ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <img src={imageSrc} alt={title} className="h-full w-full object-cover" />
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      {reverse ? image : content}
      {reverse ? content : image}
    </div>
  );
};

// Expert Card Component
const ExpertCard = ({
  name,
  role,
  photoSrc,
  instagramLink,
  githubLink,
  linkedinLink,
}: {
  name: string;
  role: string;
  photoSrc: string;
  instagramLink?: string;
  githubLink?: string;
  linkedinLink?: string;
}) => (
  <motion.div
    className="bg-card/50 border-border/50 flex flex-col items-center gap-4 rounded-xl border p-6 text-center shadow-lg backdrop-blur-sm"
    whileHover={{ y: -5, scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={photoSrc}
      alt={name}
      className="h-32 w-32 rounded-full object-cover shadow-md"
    />
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-muted-foreground">{role}</p>
    <div className="flex gap-4">
      {instagramLink && (
        <a href={instagramLink} target="_blank" rel="noopener noreferrer">
          <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
        </a>
      )}
      {githubLink && (
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
        </a>
      )}
      {linkedinLink && (
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
        </a>
      )}
    </div>
  </motion.div>
);

// Testimonial Card Component
const TestimonialCard = ({
  quote,
  name,
  title,
}: { quote: string; name: string; title: string }) => (
  <motion.div
    className="bg-card/50 border-border/50 flex flex-col items-center gap-4 rounded-xl border p-8 text-center shadow-lg backdrop-blur-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-muted-foreground text-lg italic">"{quote}"</p>
    <div className="mt-4">
      <h4 className="text-xl font-bold">{name}</h4>
      <p className="text-muted-foreground text-sm">{title}</p>
    </div>
  </motion.div>
);

// Testimonial Carousel Component
const TestimonialCarousel = ({
  testimonials,
}: { testimonials: { quote: string; name: string; title: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds

    return () => {
      clearInterval(timer);
    };
  }, [handleNext]);

  return (
    <div className="relative flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className="absolute left-0 z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <div className="w-full max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <TestimonialCard key={currentIndex} {...testimonials[currentIndex]} />
        </AnimatePresence>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className="absolute right-0 z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

function About() {
  const testimonials = [
    {
      quote:
        "PodaHoras benar-benar mengubah cara saya belajar Aksara Batak. Interaktif dan sangat membantu!",
      name: "Rina S. - Pelajar",
      title: "Mahasiswa",
    },
    {
      quote:
        "Sebagai budayawan, saya sangat mengapresiasi upaya PodaHoras dalam melestarikan Aksara Batak. Aplikasi yang luar biasa!",
      name: "Bapak Togar - Budayawan",
      title: "Pemerhati Budaya",
    },
    {
      quote:
        "Fitur terjemahannya sangat akurat dan cepat. Memudahkan saya dalam pekerjaan sehari-hari.",
      name: "Dewi L. - Peneliti",
      title: "Peneliti Bahasa",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden pt-16 text-center">
        <TexturedBackground />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 p-4"
        >
          <h1 className="font-bawor text-5xl font-extrabold tracking-tight text-[#ecbb88] md:text-7xl">
            About PodaHoras
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-lg md:text-xl">
            Jembatan Ilmu dan Budaya: Melestarikan Aksara Batak untuk Generasi
            Mendatang.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="relative z-10 mt-8"
        >
          <img
            src="/assets/hurufaksara/a.png" // Placeholder, ganti dengan foto yang sesuai
            alt="About PodaHoras"
            className="max-h-80 w-auto rounded-lg shadow-xl"
          />
        </motion.div>
      </section>

      {/* Our Mission & Vision */}
      <section className="px-4 py-20 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Visi & Misi Kami
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Membangun masa depan yang menghargai akar budaya.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/50 border-border/50 flex flex-col rounded-xl border p-8 shadow-lg backdrop-blur-sm"
            >
              <div className="bg-primary/10 text-primary mb-4 inline-flex rounded-full p-3">
                <Lightbulb size={32} />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Visi</h3>
              <p className="text-muted-foreground text-lg">
                Menjadi platform terdepan dalam pelestarian dan pembelajaran
                Aksara Batak, menjadikannya relevan dan mudah diakses oleh
                semua kalangan di era digital.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-card/50 border-border/50 flex flex-col rounded-xl border p-8 shadow-lg backdrop-blur-sm"
            >
              <div className="bg-primary/10 text-primary mb-4 inline-flex rounded-full p-3">
                <BookOpen size={32} />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Misi</h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-lg">
                <li>Menyediakan materi belajar yang interaktif dan komprehensif.</li>
                <li>Mengembangkan teknologi terjemahan Aksara Batak yang akurat.</li>
                <li>Membangun komunitas pembelajar yang aktif dan suportif.</li>
                <li>Mendorong penggunaan Aksara Batak dalam kehidupan sehari-hari.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-4 py-20 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Our Story
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Bagaimana PodaHoras dimulai.
            </p>
          </motion.div>
          <ContentImageSection
            title="Awal Mula PodaHoras"
            description="Berawal dari kepedulian terhadap warisan budaya yang mulai terlupakan, kami bertekad menciptakan platform yang memudahkan siapa saja belajar Aksara Batak."
            buttonText="Baca Lebih Lanjut"
            buttonLink="/about#story-detail"
            imageSrc="https://via.placeholder.com/600x400?text=Our+Story" // Placeholder
            reverse={false} // Image on right
          />
        </div>
      </section>

      {/* Our Target Section */}
      <section className="px-4 py-20 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Our Target
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Siapa yang ingin kami jangkau.
            </p>
          </motion.div>
          <ContentImageSection
            title="Menjangkau Generasi Muda"
            description="Kami menargetkan generasi muda Batak dan non-Batak untuk kembali mengenal dan mencintai Aksara Batak melalui pendekatan modern dan interaktif."
            buttonText="Lihat Target Kami"
            buttonLink="/about#target-detail"
            imageSrc="https://via.placeholder.com/600x400?text=Our+Target" // Placeholder
            reverse={true} // Image on left
          />
        </div>
      </section>

      {/* Dampak Kami Sejauh Ini (Impact Section) */}
      <section className="px-4 py-20 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Dampak Kami Sejauh Ini
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Angka-angka yang berbicara tentang dedikasi kami.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/50 border-border/50 flex flex-col items-center justify-center rounded-xl border p-8 text-center shadow-lg backdrop-blur-sm"
            >
              <Users size={48} className="text-primary mb-4" />
              <h3 className="text-5xl font-bold text-primary">1000+</h3>
              <p className="text-muted-foreground mt-2 text-lg">Pengguna Aktif</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card/50 border-border/50 flex flex-col items-center justify-center rounded-xl border p-8 text-center shadow-lg backdrop-blur-sm"
            >
              <BookOpen size={48} className="text-primary mb-4" />
              <h3 className="text-5xl font-bold text-primary">50+</h3>
              <p className="text-muted-foreground mt-2 text-lg">Materi Pelajaran</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-card/50 border-border/50 flex flex-col items-center justify-center rounded-xl border p-8 text-center shadow-lg backdrop-blur-sm"
            >
              <Heart size={48} className="text-primary mb-4" />
              <h3 className="text-5xl font-bold text-primary">100%</h3>
              <p className="text-muted-foreground mt-2 text-lg">Dedikasi Budaya</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Our Customers Are Saying Section */}
      <section className="px-4 py-20 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What Our Customers Are Saying
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Dengar langsung dari mereka yang telah merasakan manfaat PodaHoras.
            </p>
          </motion.div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Call to Action with Textured Background */}
      <section className="relative px-4 py-20 text-center md:px-8">
        <TexturedBackground />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Siapkah Anda Menjadi Penjaga Aksara Batak?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 mb-8 max-w-xl text-lg">
            Bergabunglah dengan ribuan orang lain dalam melestarikan salah satu
            warisan budaya Indonesia yang tak ternilai harganya.
          </p>
          <Link to="/mulai">
            <Button size="lg" className="shadow-primary/30 shadow-2xl">
              Mulai Belajar Gratis
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Meet Our Experts Section */}
      <section className="px-4 py-20 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Meet Our Experts
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Tim di balik PodaHoras.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ExpertCard
              name="John Doe"
              role="Lead Developer"
              photoSrc="https://via.placeholder.com/150?text=Expert+1"
              instagramLink="#"
              githubLink="#"
              linkedinLink="#"
            />
            <ExpertCard
              name="Jane Smith"
              role="Cultural Advisor"
              photoSrc="https://via.placeholder.com/150?text=Expert+2"
              instagramLink="#"
              linkedinLink="#"
            />
            <ExpertCard
              name="Peter Jones"
              role="UI/UX Designer"
              photoSrc="https://via.placeholder.com/150?text=Expert+3"
              githubLink="#"
              linkedinLink="#"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;