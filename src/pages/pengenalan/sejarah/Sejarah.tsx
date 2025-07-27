import React, { useEffect, useRef, useState } from 'react';
import { SejarahNavbar } from '@/components/layout/SejarahNavbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { batakNarrationContent } from './sejarahData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GLOBAL_BACKGROUND_MUSIC_SRC = '/assets/sounds/BgMusic.mp3';

const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#12151e] text-2xl text-white">
    Loading...
  </div>
);

const Sejarah: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globalBgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sectionAudioPlayersRef = useRef<(HTMLAudioElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Preload all audio assets
  useEffect(() => {
    let loadedCount = 0;
    const total = 1 + batakNarrationContent.length;
    const done = () => {
      if (++loadedCount === total) setIsLoading(false);
    };

    // Global background music
    const globalAudio = new Audio(GLOBAL_BACKGROUND_MUSIC_SRC);
    globalAudio.loop = true;
    globalAudio.volume = 0.3;
    globalAudio.preload = 'auto';
    globalAudio.addEventListener('canplaythrough', () => {
      globalBgMusicRef.current = globalAudio;
      done();
    });
    globalAudio.addEventListener('error', done);

    // Section-specific audio
    sectionAudioPlayersRef.current = batakNarrationContent.map((s) => {
      const audio = new Audio(s.audio);
      audio.preload = 'auto';
      audio.addEventListener('canplaythrough', done);
      audio.addEventListener('error', done);
      return audio;
    });

    return () => {
      globalBgMusicRef.current?.pause();
      sectionAudioPlayersRef.current.forEach((a) => a?.pause());
    };
  }, []);

  // Play global music after user interaction (for autoplay policy)
  useEffect(() => {
    if (isLoading) return;
    const tryPlay = () => {
      globalBgMusicRef.current?.play().catch(() => {});
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
    };
    window.addEventListener('click', tryPlay, { once: true });
    window.addEventListener('touchstart', tryPlay, { once: true });
  }, [isLoading]);

  // GSAP Scroll Animations and audio play on section enter
  useEffect(() => {
    if (isLoading || !containerRef.current) return;

    // Clean up previous triggers
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Fade/reveal animation for each section
    batakNarrationContent.forEach((section, idx) => {
      const el = document.getElementById(`section-${section.id}`);
      if (!el) return;

      // Section fade in on scroll
      gsap.fromTo(
        el.querySelector('.section-content'),
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 70%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // Play section audio
              const current = sectionAudioPlayersRef.current[idx];
              if (current) {
                current.currentTime = 0;
                current.play().catch(() => {});
              }
            },
            onLeaveBack: () => {
              // Pause section audio when leaving back
              const current = sectionAudioPlayersRef.current[idx];
              current?.pause();
            },
          },
        }
      );

      // Animate heading reveal (with slight delay for smoothness)
      gsap.fromTo(
        el.querySelector('.section-heading'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.utils
        .toArray('.section-content')
        .forEach((el) =>
          gsap.set(el as gsap.TweenTarget, { clearProps: 'opacity,y' })
        );
      gsap.utils
        .toArray('.section-heading')
        .forEach((el) =>
          gsap.set(el as gsap.TweenTarget, { clearProps: 'opacity,y' })
        );
    };
  }, [isLoading]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <SejarahNavbar />
      <main
        ref={containerRef}
        className="h-screen overflow-y-scroll scroll-smooth"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {batakNarrationContent.map((section) => (
          <section
            id={`section-${section.id}`}
            key={section.id}
            className="relative flex min-h-screen w-full items-center justify-center"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://picsum.photos/1920/1080?random=${section.id})`,
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="section-content relative z-10 max-w-3xl p-8 text-center text-white">
              <h2 className="section-heading mb-4 text-5xl font-bold">
                {section.title}
              </h2>
              <p className="text-lg whitespace-pre-line">{section.text}</p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Sejarah;
