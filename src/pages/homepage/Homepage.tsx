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
  const videoPlaceholders = [
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    'https://www.w3schools.com/html/movie.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    'https://www.w3schools.com/html/mov_bbb.mp4',
  ];

  const features = [
    {
      icon: <BookOpen size={32} />,
      title: 'Materi Terstruktur',
      description:
        'Pelajari setiap karakter, diakritik, dan aturan penulisan Aksara Batak dari dasar hingga mahir.',
      videoSrc: videoPlaceholders[0],
    },
    {
      icon: <Bot size={32} />,
      title: 'Penerjemah Cerdas',
      description:
        'Konversi instan dari Latin ke Aksara Batak dan sebaliknya, didukung teknologi AI terkini.',
      videoSrc: videoPlaceholders[1],
    },
    {
      icon: <Gamepad2 size={32} />,
      title: 'Kuis Interaktif',
      description:
        'Asah kemampuan dengan kuis menarik: menulis, menebak aksara, dan tantangan seru lainnya.',
      videoSrc: videoPlaceholders[2],
    },
    {
      icon: <Award size={32} />,
      title: 'Pantau Kemajuan',
      description:
        'Lihat kemajuan belajar Anda dari waktu ke waktu dan dapatkan lencana pencapaian.',
      videoSrc: videoPlaceholders[3],
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
