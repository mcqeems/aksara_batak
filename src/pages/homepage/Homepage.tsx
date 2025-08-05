import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  HomepageHero,
  FeaturesSection,
  PreviewsSection,
  ProgressSection,
  CallToActionSection,
} from './components';
import { BookOpen, Bot, Gamepad2, Award } from 'lucide-react';

function Homepage() {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: 'Materi Terstruktur',
      description:
        'Pelajari setiap karakter, diakritik, dan aturan penulisan Aksara Batak dari dasar hingga mahir.',
      videoSrc: '/assets/videos/preview/materi-terstruktur.mp4',
    },
    {
      icon: <Bot size={32} />,
      title: 'Penerjemah Cerdas',
      description:
        'Konversi instan dari Latin ke Aksara Batak dan sebaliknya, didukung teknologi AI terkini.',
      videoSrc: '/assets/videos/preview/ai-translation.mp4',
    },
    {
      icon: <Gamepad2 size={32} />,
      title: 'Kuis Interaktif',
      description:
        'Asah kemampuan dengan kuis menarik: menulis, menebak aksara, dan tantangan seru lainnya.',
      videoSrc: '/assets/videos/preview/kuiz-interaktif.mp4',
    },
    {
      icon: <Award size={32} />,
      title: 'Pantau Kemajuan',
      description:
        'Lihat kemajuan belajar Anda dari waktu ke waktu dan dapatkan lencana pencapaian.',
      videoSrc: '/assets/videos/preview/pantau-kemajuan.mp4',
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <HomepageHero />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Previews Section */}
      <PreviewsSection features={features} />

      {/* Progress Section */}
      <ProgressSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      <Footer />
    </div>
  );
}

export default Homepage;
