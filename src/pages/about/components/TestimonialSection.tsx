import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

const TestimonialCard = ({ quote, name, title }: TestimonialCardProps) => (
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

const TestimonialCarousel = ({
  testimonials,
}: {
  testimonials: { quote: string; name: string; title: string }[];
}) => {
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
    }, 5000);

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

export function TestimonialSection() {
  const testimonials = [
    {
      quote:
        'PodaHoras benar-benar mengubah cara saya belajar Aksara Batak. Interaktif dan sangat membantu!',
      name: 'Aldiyanto - Mahasiswa',
      title: 'Mahasiswa Hadits STDI',
    },
    {
      quote:
        'Sebagai pelajar bahasa, saya sangat mengapresiasi upaya PodaHoras dalam melestarikan Aksara Batak. Aplikasi yang luar biasa!',
      name: 'Syafaul Umam - Mahasiswa',
      title: 'Mahasiswa Bahasa LIPIA',
    },
    {
      quote:
        'Fitur terjemahannya sangat akurat dan cepat. Memudahkan saya dalam pekerjaan sehari-hari.',
      name: 'Firdis Firnadi - Mahasiswa',
      title: 'Mahasiswa TI Unida',
    },
  ];

  return (
    <div
      className="px-4 py-20 md:px-8"
      style={{ backgroundColor: 'var(--muted)' }}
    >
      <div className="container mx-auto">
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
              What Our Customers Are Saying
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Dengar langsung dari mereka yang telah merasakan manfaat PodaHoras.
          </p>
        </motion.div>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </div>
  );
}
