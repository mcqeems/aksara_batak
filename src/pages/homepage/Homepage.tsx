import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, BookOpen, Bot, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/layout/footer';

// Card component for the initial feature overview
const FeatureCard = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    className="bg-card/50 border-border/50 flex flex-col items-center gap-4 rounded-xl border p-6 text-center shadow-lg backdrop-blur-sm"
    whileHover={{ y: -5, scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <div className="bg-primary/10 text-primary rounded-full p-4">{icon}</div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

// Detailed component with video
const FeatureDetail = ({
  icon,
  title,
  description,
  videoSrc,
  reverse = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  videoSrc: string;
  reverse?: boolean;
}) => {
  const content = (
    <motion.div
      className="flex flex-col justify-center"
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="bg-primary/10 text-primary rounded-full p-3">
          {icon}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-lg">{description}</p>
    </motion.div>
  );

  const video = (
    <motion.div
      className="overflow-hidden rounded-xl shadow-lg"
      initial={{ opacity: 0, x: reverse ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      {reverse ? video : content}
      {reverse ? content : video}
    </div>
  );
};

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
      <div className="flex h-64 w-full items-center justify-center bg-red-500">
        <h2 className="text-center text-6xl font-bold">tester</h2>
      </div>

      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden pt-16">
        <div className="h-64 w-full bg-green-500">
          <h2 className="text-center text-6xl font-bold">shiball</h2>
        </div>
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="/assets/logo/podahorasBlack.png"
            alt="Batak Pattern"
            className="hidden h-full w-full object-cover dark:block"
          />
          <img
            src="/assets/logo/podahorasWhite.png"
            alt="Batak Pattern"
            className="block h-full w-full object-cover dark:hidden"
          />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 p-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-bawor text-5xl font-extrabold tracking-tight text-[#ecbb88] md:text-7xl">
            Aksara Batak: Jembatan Ilmu dan Budaya
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            Selamat datang di PodaHoras, platform belajar aksara Batak yang
            interaktif dan menyenangkan. Mari kita lestarikan warisan leluhur
            masa depan budaya Batak.
          </p>
          <div className="flex gap-4">
            <Link to="/mulai">
              <Button size="lg">Mulai Sekarang</Button>
            </Link>
            <Link to="/pengenalan">
              <Button variant="secondary" size="lg">
                Pelajari Dasar
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Kenapa PodaHoras?
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Kami menyediakan alat yang Anda butuhkan untuk menguasai Aksara
              Batak.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section id="previews" className="px-4 py-20 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Lihat Fitur Kami Beraksi
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Setiap fitur dirancang untuk memberikan pengalaman belajar yang
              menarik dan efektif.
            </p>
          </motion.div>
          <div className="flex flex-col gap-24">
            {features.map((feature, index) => (
              <FeatureDetail
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                videoSrc={feature.videoSrc}
                reverse={index % 2 !== 0} // Reverse for odd-indexed items
              />
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="px-4 py-24 md:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Pantau Perjalanan Belajar Anda
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Rasakan kemajuan nyata dalam belajar Aksara Batak dengan sistem
              pelacakan pintar dan personalisasi unik.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Statistik Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 border-border/50 rounded-xl border p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Statistik Harian</h3>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
                  🔥 5 Day Streak
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Total XP:{' '}
                  <span className="text-primary font-bold">850 XP</span>
                </p>
                <p className="text-muted-foreground">
                  Level: <span className="text-primary font-bold">Lv. 7</span>
                </p>
                <Progress value={70} />
                <p className="text-muted-foreground text-right text-xs">
                  XP menuju Lv. 8
                </p>
              </div>
            </motion.div>

            {/* Leaderboard Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/50 border-border/50 rounded-xl border p-6 shadow-lg backdrop-blur-sm"
            >
              <h3 className="mb-4 text-xl font-semibold">Peringkat Global</h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li>
                  🥇{' '}
                  <span className="text-foreground font-medium">Sitorus</span> –
                  1520 XP
                </li>
                <li>
                  🥈{' '}
                  <span className="text-foreground font-medium">Nababan</span> –
                  1340 XP
                </li>
                <li>
                  🥉{' '}
                  <span className="text-foreground font-medium">
                    Br. Simamora
                  </span>{' '}
                  – 1250 XP
                </li>
              </ul>
              <p className="text-muted-foreground mt-4 text-sm">
                Anda saat ini di{' '}
                <span className="text-primary font-semibold">peringkat 7</span>.
              </p>
            </motion.div>

            {/* Avatar Customization */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card/50 border-border/50 rounded-xl border p-6 shadow-lg backdrop-blur-sm"
            >
              <h3 className="mb-4 text-xl font-semibold">
                Avatar & Personalisasi
              </h3>
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/assets/avatars/avatar1.png"
                  alt="User Avatar"
                  className="border-primary h-20 w-20 rounded-full border-2 shadow-md"
                />
                <Button variant="secondary" size="sm">
                  Ganti Avatar
                </Button>
              </div>
              <p className="text-muted-foreground mt-4 text-center text-sm">
                Tampilkan gaya Anda dalam komunitas belajar!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
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

      <Footer />
    </div>
  );
}

export default Homepage;
