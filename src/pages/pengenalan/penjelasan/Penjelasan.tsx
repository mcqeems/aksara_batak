import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollingNavbar } from '@/components/layout/ScrollingNavbar';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import './penjelasan.css';
import { batakPenjelasanContent } from './penjelasanData';
import Loader from '@/components/ui/loader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer, SplitText);
}

const GLOBAL_BACKGROUND_MUSIC_SRC = '/assets/sounds/BgMusic.mp3';

const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center text-2xl text-white">
    <Loader />
  </div>
);

const sectionTitles = [
  'Bentuk Budaya',
  'Asal Bentuk',
  'Kendala Historis',
  'Varian Regional',
  'Anatomi Huruf',
  'Variasi Ina',
  'Variasi Anak',
  'Aturan Penulisan',
  'Pengaruh Media',
  'Gaya Individu',
  'Pengaruh Linguistik',
  'Pelestarian Modern',
  'Akhir Perjalanan',
];

const Penjelasan: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const globalBgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sectionAudioPlayersRef = useRef<(HTMLAudioElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<Observer | null>(null);
  const gotoSectionRef = useRef<
    ((index: number, direction: number) => void) | null
  >(null);

  // Preload all audio assets
  useEffect(() => {
    let loadedCount = 0;
    const total = 1 + batakPenjelasanContent.length;
    const done = () => {
      if (++loadedCount === total) setIsLoading(false);
    };

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 second timeout

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
    sectionAudioPlayersRef.current = batakPenjelasanContent.map((s) => {
      const audio = new Audio(s.audio);
      audio.preload = 'auto';
      audio.addEventListener('canplaythrough', done);
      audio.addEventListener('error', done);
      return audio;
    });

    return () => {
      clearTimeout(timeout);
      globalBgMusicRef.current?.pause();
      sectionAudioPlayersRef.current.forEach((a) => a?.pause());
    };
  }, []);

  // Cleanup audio on page unload/hide
  useEffect(() => {
    const handlePageHide = () => {
      if (globalBgMusicRef.current) {
        globalBgMusicRef.current.pause();
      }
      sectionAudioPlayersRef.current.forEach((audio) => {
        if (audio) {
          audio.pause();
        }
      });
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, []);

  // Direct section navigation for auto-scroll
  const navigateToSection = useCallback(
    (targetIndex: number) => {
      if (!componentRef.current) return;

      const sections = gsap.utils.toArray<HTMLElement>(
        '.section-item',
        componentRef.current
      );
      if (sections[targetIndex]) {
        // Calculate direction
        const direction = targetIndex > currentSection ? 1 : -1;

        // Use the stored gotoSection function if available
        if (gotoSectionRef.current) {
          gotoSectionRef.current(targetIndex, direction);
        } else {
          // Fallback to wheel event
          const wheelEvent = new WheelEvent('wheel', { deltaY: direction });
          componentRef.current.dispatchEvent(wheelEvent);
        }
      }
    },
    [currentSection]
  );

  const handleAutoScrollToggle = useCallback((isPlaying: boolean) => {
    setIsAutoScrolling(isPlaying);

    // If auto-scrolling is explicitly stopped, pause any playing section audio.
    if (!isPlaying) {
      sectionAudioPlayersRef.current.forEach((audio) => {
        if (audio && !audio.paused) {
          audio.pause();
          audio.currentTime = 0; // Reset for next play
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isAutoScrolling) {
      // If auto-scrolling is stopped, clear any pending timers.
      if (autoScrollIntervalRef.current) {
        clearTimeout(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      return;
    }

    // --- Auto-scrolling is active ---

    const advance = () => {
      // Don't advance if still animating
      if (isAnimating) {
        return;
      }

      const nextSection = currentSection + 1;
      // There are 13 content items (0-12), plus 1 intro section. So 14 sections total (0-13).
      if (nextSection <= batakPenjelasanContent.length) {
        navigateToSection(nextSection);
      } else {
        setIsAutoScrolling(false); // End of the journey
      }
    };

    // Handle intro section (no audio, just a delay)
    if (currentSection === 0) {
      autoScrollIntervalRef.current = setTimeout(advance, 2000);
      return () => {
        if (autoScrollIntervalRef.current) {
          clearTimeout(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = null;
        }
      };
    }

    // For auto-scroll, we only need to advance to the next section
    // Audio playback is handled by manageAudioPlayback in gotoSection
    const audioIndex = currentSection - 1;
    const audio = sectionAudioPlayersRef.current[audioIndex];

    if (audio) {
      // Section has audio - wait for audio to finish then advance
      const handleAudioEnd = () => {
        advance();
      };

      // Add event listener to current audio if it's playing
      if (audio && !audio.paused) {
        audio.addEventListener('ended', handleAudioEnd, { once: true });
      } else {
        // If audio is not playing (e.g., user paused), advance after a delay
        autoScrollIntervalRef.current = setTimeout(advance, 3000);
      }

      return () => {
        if (audio) {
          audio.removeEventListener('ended', handleAudioEnd);
        }
        if (autoScrollIntervalRef.current) {
          clearTimeout(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = null;
        }
      };
    } else {
      // Section has no audio, advance after a delay
      autoScrollIntervalRef.current = setTimeout(advance, 3000);
      return () => {
        if (autoScrollIntervalRef.current) {
          clearTimeout(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = null;
        }
      };
    }
  }, [isAutoScrolling, currentSection, navigateToSection, isAnimating]);

  // Adjust background music volume based on section
  useEffect(() => {
    if (globalBgMusicRef.current) {
      if (isSoundMuted) {
        globalBgMusicRef.current.volume = 0;
      } else {
        globalBgMusicRef.current.volume = currentSection === 0 ? 0.3 : 0.07;
      }
    }
  }, [currentSection, isSoundMuted]);

  // Sound toggle functionality
  const handleSoundToggle = useCallback((isMuted: boolean) => {
    setIsSoundMuted(isMuted);
  }, []);

  // Section navigation
  const handleSectionChange = useCallback(
    (sectionIndex: number) => {
      setCurrentSection(sectionIndex);
      // Use the navigateToSection function for consistent behavior
      navigateToSection(sectionIndex);
    },
    [navigateToSection]
  );

  // Cleanup auto-scroll on unmount
  useEffect(() => {
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  // Handle auto-scroll section changes
  useEffect(() => {
    if (isAutoScrolling && componentRef.current) {
      // Trigger section change through GSAP observer
      const sections = gsap.utils.toArray<HTMLElement>(
        '.section-item',
        componentRef.current
      );
      if (sections[currentSection]) {
        // Prevent scrollbars during auto-scroll transitions
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Simulate wheel event to trigger GSAP animation
        const wheelEvent = new WheelEvent('wheel', { deltaY: 1 });
        componentRef.current.dispatchEvent(wheelEvent);
      }
    }
  }, [currentSection, isAutoScrolling]);

  // Prevent scrollbars on this page
  useEffect(() => {
    // Store original overflow values
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Add CSS classes to prevent scrollbars
    document.body.classList.add('penjelasan-page-active');
    document.documentElement.classList.add('penjelasan-page-active');

    // Hide scrollbars for this page
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Cleanup function to restore original overflow
    return () => {
      document.body.classList.remove('penjelasan-page-active');
      document.documentElement.classList.remove('penjelasan-page-active');
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // GSAP Observer Animations and audio play on section enter
  useEffect(() => {
    if (isLoading || !componentRef.current) return;

    // Ensure no scrollbars during animations
    const preventScrollbars = () => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    };

    // Apply immediately
    preventScrollbars();

    // Handle autoplay audio yang diblokir browser
    if (globalBgMusicRef.current && globalBgMusicRef.current.paused) {
      globalBgMusicRef.current.currentTime = 6;
      globalBgMusicRef.current.play().catch((error) => {
        console.warn('Global background music autoplay was blocked:', error);
        const playOnFirstInteraction = () => {
          if (globalBgMusicRef.current && globalBgMusicRef.current.paused) {
            globalBgMusicRef.current.currentTime = 6;
            globalBgMusicRef.current
              .play()
              .catch((e) =>
                console.error('Failed to play global on interaction:', e)
              );
          }
          window.removeEventListener('click', playOnFirstInteraction, true);
          window.removeEventListener('scroll', playOnFirstInteraction, true);
          window.removeEventListener(
            'touchstart',
            playOnFirstInteraction,
            true
          );
        };
        window.addEventListener('click', playOnFirstInteraction, {
          once: true,
          capture: true,
        });
        window.addEventListener('scroll', playOnFirstInteraction, {
          once: true,
          capture: true,
        });
        window.addEventListener('touchstart', playOnFirstInteraction, {
          once: true,
          capture: true,
        });
      });
    }

    const container = componentRef.current;
    const sections = gsap.utils.toArray<HTMLElement>(
      '.section-item',
      container
    );
    const images = gsap.utils.toArray<HTMLElement>('.bg', container);
    const headings = gsap.utils.toArray<HTMLElement>(
      '.section-heading',
      container
    );
    const outerWrappers = gsap.utils.toArray<HTMLElement>('.outer', container);
    const innerWrappers = gsap.utils.toArray<HTMLElement>('.inner', container);

    if (sections.length === 0) return;

    // Wait for fonts to load before creating SplitText
    const createSplitText = () => {
      return headings.map((heading) => {
        try {
          return new SplitText(heading, {
            type: 'chars,words,lines',
            linesClass: 'clip-text',
          });
        } catch (error) {
          console.warn('SplitText failed, using fallback:', error);
          return null;
        }
      });
    };

    // Wait for fonts to load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const splitHeadings = createSplitText();
        initializeAnimations(splitHeadings);
      });
    } else {
      // Fallback if fonts API is not available
      setTimeout(() => {
        const splitHeadings = createSplitText();
        initializeAnimations(splitHeadings);
      }, 1000);
    }

    function initializeAnimations(splitHeadings: (SplitText | null)[]) {
      let currentIndex = -1;
      let animating = false;
      let observerInstance: Observer | null = null;

      // Store observer instance for external control
      observerRef.current = observerInstance;

      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
      gsap.set(sections, { autoAlpha: 0, zIndex: 0 });

      function manageAudioPlayback(newIndex: number, oldIndex: number) {
        // Jangan play audio section jika di section 0 (welcome)
        const audioIndex = newIndex - 1;

        // Pause semua audio section jika pindah ke section 0
        if (newIndex === 0) {
          sectionAudioPlayersRef.current.forEach((audio) => {
            if (audio && !audio.paused) {
              audio.pause();
              audio.currentTime = 0;
            }
          });
          return;
        }

        if (
          audioIndex < 0 ||
          audioIndex >= sectionAudioPlayersRef.current.length
        )
          return;
        const currentSectionAudioPlayer =
          sectionAudioPlayersRef.current[audioIndex];
        const oldAudioIndex = oldIndex - 1;
        const oldSectionAudioPlayer =
          oldAudioIndex >= 0
            ? sectionAudioPlayersRef.current[oldAudioIndex]
            : null;

        if (oldSectionAudioPlayer && oldAudioIndex !== audioIndex) {
          oldSectionAudioPlayer.pause();
          oldSectionAudioPlayer.currentTime = 0;
        }

        // Play audio for the new section
        if (currentSectionAudioPlayer) {
          currentSectionAudioPlayer.currentTime = 0;
          currentSectionAudioPlayer
            .play()
            .catch((e) =>
              console.warn(`Failed to play section ${newIndex} audio:`, e)
            );
        }
      }

      function gotoSection(index: number, direction: number) {
        if (
          index < 0 ||
          index >= sections.length ||
          (index === currentIndex && !animating)
        ) {
          animating = false;
          return;
        }

        // Prevent scrollbars during section transitions
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        animating = true;
        const oldCurrentIndex = currentIndex;
        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        // Update current section state
        setCurrentSection(index);

        const tl = gsap.timeline({
          defaults: { duration: 1.25, ease: 'power1.inOut' },
          onStart: () => {
            setIsAnimating(true);
          },
          onComplete: () => {
            animating = false;
            currentIndex = index;
            setIsAnimating(false);
            // Always manage audio playback on section change.
            // For auto-scroll, this ensures audio stops/starts correctly.
            // For manual scroll, this adds the missing audio playback.
            manageAudioPlayback(currentIndex, oldCurrentIndex);
          },
        });

        if (
          oldCurrentIndex >= 0 &&
          oldCurrentIndex < sections.length &&
          sections[oldCurrentIndex] &&
          oldCurrentIndex !== index
        ) {
          gsap.set(sections[oldCurrentIndex], { zIndex: 0 });
          if (images[oldCurrentIndex]) {
            tl.to(images[oldCurrentIndex], { yPercent: -15 * dFactor });
          }
          tl.set(sections[oldCurrentIndex], { autoAlpha: 0 });
        }

        if (sections[index]) {
          gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
          const currentSection = sections[index];
          const contentAnimationStartTime = 0.4;

          // Default animation for all sections (including section 0)
          const textElement = currentSection.querySelector('p, h2');
          if (textElement) {
            // Special animation for final section (index 13) - text comes from top
            if (index === 13) {
              tl.fromTo(
                textElement,
                { autoAlpha: 0, yPercent: -50 },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 1.2,
                  ease: 'power2.out',
                },
                contentAnimationStartTime
              );
            } else {
              // Default animation for other sections
              const animationDirection = index % 2 === 0 ? -30 : 30;
              tl.fromTo(
                textElement,
                { autoAlpha: 0, xPercent: animationDirection },
                {
                  autoAlpha: 1,
                  xPercent: 0,
                  duration: 1,
                  ease: 'power2.out',
                },
                contentAnimationStartTime
              );
            }
          }

          // Image animations for sections 2-14
          const imageConfigs = [
            { id: 'bentuk-budaya-img', index: 1, direction: 'up' },
            { id: 'asal-bentuk-img', index: 2, direction: 'left' },
            { id: 'kendala-historis-img', index: 3, direction: 'right' },
            { id: 'varian-regional-img', index: 4, direction: 'left' },
            { id: 'anatomi-huruf-img', index: 5, direction: 'right' },
            { id: 'variasi-ina-img', index: 6, direction: 'right' },
            { id: 'variasi-anak-img', index: 7, direction: 'right' },
            { id: 'aturan-penulisan-img', index: 8, direction: 'left' },
            { id: 'pengaruh-media-img', index: 9, direction: 'right' },
            { id: 'gaya-individu-img', index: 10, direction: 'left' },
            { id: 'pengaruh-linguistik-img', index: 11, direction: 'right' },
            { id: 'pelestarian-modern-img', index: 12, direction: 'left' },
            { id: 'akhir-perjalanan-img', index: 13, direction: 'right' },
          ];

          // Special animation for final section buttons
          if (index === 13) {
            const buttonsContainer = currentSection.querySelector(
              '.absolute.bottom-20.z-50.w-full.flex.flex-col.items-center.gap-4'
            );
            if (buttonsContainer) {
              tl.fromTo(
                buttonsContainer,
                { autoAlpha: 0, yPercent: 30 },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 1,
                  ease: 'power2.out',
                },
                contentAnimationStartTime + 0.3
              );
            }
          }

          imageConfigs.forEach((config) => {
            if (index === config.index) {
              const imageElement = document.getElementById(config.id);
              if (imageElement) {
                const fromProps: gsap.TweenVars = { autoAlpha: 0 };
                const toProps: gsap.TweenVars = {
                  autoAlpha: 1,
                  duration: 1.2,
                  ease: 'power2.out',
                };

                if (config.direction === 'up') {
                  fromProps.yPercent = 30;
                  toProps.yPercent = 0;
                } else {
                  fromProps.xPercent = config.direction === 'left' ? -30 : 30;
                  toProps.xPercent = 0;
                }

                tl.fromTo(
                  imageElement,
                  fromProps,
                  toProps,
                  contentAnimationStartTime + 0.2
                );
              }
            }
          });
        }

        if (outerWrappers[index] && innerWrappers[index]) {
          tl.fromTo(
            [outerWrappers[index], innerWrappers[index]],
            { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
            { yPercent: 0 },
            0
          );
        }
        if (images[index]) {
          tl.fromTo(
            images[index],
            { yPercent: 15 * dFactor },
            { yPercent: 0 },
            0
          );
        }

        if (
          splitHeadings[index] &&
          splitHeadings[index]?.chars &&
          splitHeadings[index]?.chars.length > 0
        ) {
          tl.fromTo(
            splitHeadings[index]!.chars,
            { autoAlpha: 0, yPercent: 150 * dFactor },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              ease: 'power2',
              stagger: { each: 0.02, from: 'random' },
            },
            0.2
          );
        } else if (headings[index]) {
          tl.fromTo(
            headings[index],
            { autoAlpha: 0, yPercent: 30 * dFactor },
            { autoAlpha: 1, yPercent: 0, duration: 1, ease: 'power2' },
            0.2
          );
        }
      }

      observerInstance = Observer.create({
        target: container,
        type: 'wheel,touch,pointer',
        wheelSpeed: -1,
        onDown: () =>
          !animating && currentIndex > 0 && gotoSection(currentIndex - 1, -1),
        onUp: () =>
          !animating &&
          currentIndex < sections.length - 1 &&
          gotoSection(currentIndex + 1, 1),
        tolerance: 10,
        preventDefault: true,
      });

      // Store observer instance for external control
      observerRef.current = observerInstance;

      // Create external navigation function
      const externalGotoSection = (targetIndex: number) => {
        if (targetIndex >= 0 && targetIndex < sections.length) {
          const direction = targetIndex > currentIndex ? 1 : -1;
          gotoSection(targetIndex, direction);
        }
      };
      gotoSectionRef.current = externalGotoSection;

      if (sections.length > 0) {
        currentIndex = -1;
        gotoSection(0, 1);
      }

      return () => {
        if (observerInstance) observerInstance.kill();
        splitHeadings.forEach(
          (sh) => sh && typeof sh.revert === 'function' && sh.revert()
        );
        gsap.killTweensOf([
          sections,
          images,
          headings,
          outerWrappers,
          innerWrappers,
        ]);
        sections.forEach((section) => {
          gsap.utils
            .toArray<HTMLElement>(section.querySelectorAll('p, img, a'))
            .forEach((el) => {
              gsap.set(el, {
                clearProps: 'autoAlpha,xPercent,yPercent,scale,rotate',
              });
            });
        });
        gsap.set(outerWrappers, { clearProps: 'yPercent' });
        gsap.set(innerWrappers, { clearProps: 'yPercent' });
        gsap.set(sections, { clearProps: 'autoAlpha,zIndex' });
        gsap.set(images, { clearProps: 'yPercent' });
        headings.forEach((h) =>
          gsap.set(
            h.querySelectorAll('.clip-text div, .clip-text, .section-heading'),
            {
              clearProps: 'autoAlpha,yPercent,opacity,transform',
            }
          )
        );
      };
    }
  }, [isLoading]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="penjelasan-page bg-background text-foreground min-h-screen overflow-hidden">
      <ScrollingNavbar
        onAutoScrollToggle={handleAutoScrollToggle}
        onSoundToggle={handleSoundToggle}
        onSectionChange={handleSectionChange}
        currentSection={currentSection}
        totalSections={batakPenjelasanContent.length + 1}
        isAutoScrolling={isAutoScrolling}
        isSoundMuted={isSoundMuted}
        sectionTitles={sectionTitles}
      />
      <div
        ref={componentRef}
        className="scroll-animation-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          maxWidth: '100vw',
          maxHeight: '100vh',
          overscrollBehavior: 'none',
        }}
      >
        {/* SECTION 1 - Welcome */}
        <section
          id="scene-first"
          className="section-item first"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg one relative flex flex-col items-center justify-center">
                <svg
                  className="relative z-10 mb-8 h-auto w-full max-w-md"
                  viewBox="0 0 450 250"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0 C0.81742676 0.18191895 1.63485352 0.36383789 2.47705078 0.55126953 C11.0833577 2.53488589 19.17589102 5.29978659 27.25 8.875 C28.00039551 9.20725586 28.75079102 9.53951172 29.52392578 9.88183594 C33.0879638 11.5094576 36.45540142 13.22732079 39.75 15.3515625 C43.08567196 17.44888809 46.11761527 19.09532253 50 20 C53.83044618 18.75213388 56.83776415 16.81136532 60.11328125 14.5390625 C71.738637 6.53731279 87.36439292 2.27711842 101 -1 C101.6712793 -1.16371094 102.34255859 -1.32742187 103.03417969 -1.49609375 C129.56500442 -7.60790678 162.69166617 -7.09879129 187 6 C198.93845101 13.52484185 206.6637257 23.75633576 209.8125 37.5625 C209.9053125 39.2640625 209.9053125 39.2640625 210 41 C210.05027344 41.74894531 210.10054688 42.49789062 210.15234375 43.26953125 C211.33107075 74.71796762 193.02248764 100.59204975 173.43261719 123.32910156 C172.00929423 124.9891599 170.60067069 126.66065665 169.1953125 128.3359375 C163.64130121 134.9282414 157.89297492 141.26736348 151.9375 147.5 C144.04417315 155.7914817 136.77893765 164.39214232 130.3515625 173.875 C129.91440918 174.51284424 129.47725586 175.15068848 129.02685547 175.80786133 C128.20476129 177.01805313 127.39772939 178.23868658 126.60986328 179.47143555 C123.58074666 183.95334541 120.98297 185.34850137 116 187 C110.02669667 187.76023861 105.92555494 186.20781939 101 183 C94.40488321 177.12174373 94.40488321 177.12174373 93.59375 172.87109375 C93.07634327 159.44007737 104.01402752 149.40584266 112.5625 140.09765625 C118.86434767 133.30363982 125.29443698 126.66412891 131.87890625 120.14453125 C135.08850036 116.89947202 138.0485117 113.47875624 141 110 C141.84433594 109.03320312 142.68867188 108.06640625 143.55859375 107.0703125 C149.94346577 99.71660848 155.66758121 92.15485138 161 84 C161.5775 83.12472656 162.155 82.24945313 162.75 81.34765625 C169.12174326 71.26437255 173.25083532 60.04848727 172 48 C170.67854119 42.93738417 168.18183223 39.7764396 164 36.6875 C154.39394969 31.07553891 143.89812448 30.46991442 133 30.5625 C131.73051514 30.57079834 130.46103027 30.57909668 129.15307617 30.58764648 C91.94819854 31.24886782 60.15307558 49.72327305 33 74 C32.47003418 74.47356934 31.94006836 74.94713867 31.39404297 75.43505859 C27.88949169 78.58185139 24.43278815 81.77510597 21 85 C20.34386719 85.61359375 19.68773437 86.2271875 19.01171875 86.859375 C14.70236269 91.02013258 10.98891348 95.60097315 7.23828125 100.265625 C5.30558026 102.62669078 3.3155385 104.88117292 1.25 107.125 C-13.1059367 123.12973735 -25.36001381 141.41129008 -37.1875 159.3125 C-46.14744557 172.83686597 -46.14744557 172.83686597 -50.625 178.8125 C-51.69621094 180.24529297 -51.69621094 180.24529297 -52.7890625 181.70703125 C-55.83268261 184.8635772 -58.88256176 186.80294568 -63.30859375 187.21484375 C-71.85778173 186.10109633 -76.82334014 182.53516517 -82.71484375 176.48828125 C-84.68582327 172.67212941 -84.61028708 169.20641587 -84 165 C-83.07552646 162.27564837 -81.75533043 159.94406374 -80.25 157.5 C-79.85095459 156.82348389 -79.45190918 156.14696777 -79.04077148 155.44995117 C-63.21860982 129.15417687 -42.65972428 104.9316452 -22.0546875 82.2734375 C-20.13063862 80.14454691 -18.24854188 77.98580858 -16.375 75.8125 C-13.60896221 72.63123713 -10.68936678 69.66432944 -7.6796875 66.71484375 C-6.04072708 65.04157951 -4.55147639 63.30689297 -3.0625 61.5 C2.20845249 55.2529452 8.70209757 50.36223561 15.21484375 45.48046875 C17.11400327 44.10781932 17.11400327 44.10781932 18 42 C17.15050781 41.73058594 16.30101562 41.46117187 15.42578125 41.18359375 C10.74512341 39.56644515 6.25879995 37.53580879 1.73046875 35.53515625 C-11.28992746 30.81207135 -25.19592492 30.48681715 -38.875 30.625 C-39.70861053 30.62998505 -40.54222107 30.63497009 -41.40109253 30.6401062 C-53.44787088 30.72451691 -65.2910539 30.88193004 -77 34 C-77.76779785 34.19916016 -78.5355957 34.39832031 -79.32666016 34.60351562 C-95.19075249 38.90327761 -109.71682592 46.35139077 -124.33056641 53.71240234 C-128.88140187 55.90749163 -132.98002787 56.6791727 -138 56 C-142.85649157 53.3510046 -145.31386173 49.1490674 -147 44 C-147.62284369 39.84770875 -147.47707793 36.33581822 -146.0625 32.375 C-129.1861661 12.94164581 -99.33504678 3.80922411 -75 -1 C-74.21786133 -1.16371094 -73.43572266 -1.32742187 -72.62988281 -1.49609375 C-48.80509834 -6.3718636 -23.62574648 -5.33937483 0 0 Z"
                    fill="#ecbb88"
                    transform="translate(185,50)"
                  />
                </svg>
                <h2 className="section-heading text-foreground text-center text-4xl md:text-5xl">
                  <b>Perkembangan Aksara Batak</b>
                  <br />
                  <span className="text-muted-foreground scroll-text text-lg md:text-xl">
                    Scroll ke bawah untuk memulai
                  </span>
                </h2>
                <div className="arrowCta scale-70 md:scale-100">
                  <div className="arrow-container">
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section
          id="scene-second"
          className="section-item second"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 px-4 text-center text-xl text-shadow-md sm:text-3xl md:px-32">
                  {batakPenjelasanContent[0].text}
                </p>
                <img
                  id="bentuk-budaya-img"
                  className="relative top-[220px] h-[450px] object-cover md:top-[120px] md:h-[700px]"
                  src="/assets/images/aksara/ilustrasi/1.png"
                  alt="Ilustrasi Aksara Batak"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section
          id="scene-third"
          className="section-item third"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[600px] px-4 text-center text-xl text-shadow-md sm:right-20 sm:text-3xl md:px-0 md:text-right">
                  {batakPenjelasanContent[1].text}
                </p>
                <img
                  id="asal-bentuk-img"
                  className="relative top-[210px] h-[500px] object-cover sm:right-52 md:top-[120px] md:h-[700px]"
                  src="/assets/images/aksara/ilustrasi/2.png"
                  alt="Ilustrasi Jejak Awal"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 */}
        <section
          id="scene-fourth"
          className="section-item fourth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[500px] px-4 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[2].text}
                </p>
                <img
                  id="kendala-historis-img"
                  className="relative top-[210px] h-[450px] scale-x-[-1] object-cover md:top-[120px] md:left-56 md:h-[800px]"
                  src="/assets/images/aksara/ilustrasi/3.png"
                  alt="Ilustrasi Evolusi Lokal"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 */}
        <section
          id="scene-fifth"
          className="section-item fifth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 right-2 z-50 w-full max-w-[600px] px-4 text-center text-xl text-shadow-md sm:right-20 sm:text-3xl md:px-0 md:text-right">
                  {batakPenjelasanContent[3].text}
                </p>
                <img
                  id="varian-regional-img"
                  className="relative top-[200px] h-[410px] object-cover md:top-[120px] md:right-56 md:h-[750px]"
                  src="/assets/images/aksara/ilustrasi/4.png"
                  alt="Ilustrasi Para Datu dan Raja"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 */}
        <section
          id="scene-sixth"
          className="section-item sixth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[500px] px-4 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[4].text}
                </p>
                <img
                  id="anatomi-huruf-img"
                  className="relative top-[210px] h-[500px] scale-x-[-1] object-cover md:top-[120px] md:left-64 md:h-[800px]"
                  src="/assets/images/aksara/ilustrasi/5.png"
                  alt="Ilustrasi Varian Aksara"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 */}
        <section
          id="scene-seventh"
          className="section-item seventh"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[600px] px-4 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[5].text}
                </p>
                <img
                  id="variasi-ina-img"
                  className="relative top-[210px] h-[500px] object-cover md:top-[120px] md:left-64 md:h-[800px]"
                  src="/assets/images/aksara/ilustrasi/6.png"
                  alt="Ilustrasi Pengaruh Islam"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 */}
        <section
          id="scene-eight"
          className="section-item eighth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[700px] px-4 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[6].text}
                </p>
                <img
                  id="variasi-anak-img"
                  className="relative top-[180px] h-[500px] object-cover md:top-[120px] md:left-64 md:h-[800px]"
                  src="/assets/images/aksara/ilustrasi/7.png"
                  alt="Ilustrasi Zaman Kolonial"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 */}
        <section
          id="scene-ninth"
          className="section-item ninth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[600px] px-4 text-center text-xl text-shadow-md sm:right-20 sm:text-3xl md:px-0 md:text-right">
                  {batakPenjelasanContent[7].text}
                </p>
                <img
                  id="aturan-penulisan-img"
                  className="relative top-[210px] h-[550px] scale-x-[-1] object-cover md:top-[98px] md:right-64 md:h-[800px]"
                  src="/assets/images/aksara/ilustrasi/8.png"
                  alt="Ilustrasi Dokumentasi"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10 */}
        <section
          id="scene-tenth"
          className="section-item tenth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[650px] px-4 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[8].text}
                </p>
                <img
                  id="pengaruh-media-img"
                  className="relative top-[210px] h-[510px] object-cover md:top-[120px] md:left-56 md:h-[800px] md:scale-x-[-1]"
                  src="/assets/images/aksara/ilustrasi/9.png"
                  alt="Ilustrasi Menjelang Kepunahan"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11 */}
        <section
          id="scene-eleventh"
          className="section-item eleventh"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[700px] px-5 text-center text-xl text-shadow-md sm:right-20 sm:text-3xl md:px-0 md:text-right">
                  {batakPenjelasanContent[9].text}
                </p>
                <img
                  id="gaya-individu-img"
                  className="relative top-[210px] h-[510px] scale-x-[-1] object-cover md:top-[120px] md:right-64 md:h-[800px]"
                  src="/assets/images/aksara/ilustrasi/10.png"
                  alt="Ilustrasi Kebangkitan"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 12 */}
        <section
          id="scene-twelfth"
          className="section-item twelfth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[600px] px-5 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[10].text}
                </p>
                <img
                  id="pengaruh-linguistik-img"
                  className="relative top-[210px] h-[510px] object-cover md:top-[120px] md:left-56 md:h-[800px]"
                  src="/assets/images/aksara/ilustrasi/11.png"
                  alt="Ilustrasi Era Digital"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 13 */}
        <section
          id="scene-thirteenth"
          className="section-item thirteenth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <p className="text-foreground absolute top-20 z-50 w-full max-w-[750px] px-5 text-center text-xl text-shadow-md sm:right-20 sm:text-3xl md:px-0 md:text-right">
                  {batakPenjelasanContent[11].text}
                </p>
                <img
                  id="pelestarian-modern-img"
                  className="relative top-[210px] h-[510px] object-cover md:top-[120px] md:right-68 md:h-[800px]"
                  src="/assets/images/aksara/ilustrasi/12.png"
                  alt="Ilustrasi Struktur Aksara"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 14 - Final Section with Buttons */}
        <section
          id="scene-fourteenth"
          className="section-item fourteenth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <div className="absolute top-1/3 z-50 w-full max-w-[700px] px-4 md:top-40 md:max-w-[1100px]">
                  <p className="text-foreground text-center text-xl font-medium text-shadow-md sm:text-3xl md:px-0 md:text-4xl md:font-semibold">
                    {batakPenjelasanContent[12].text}
                  </p>

                  <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:top-[350px]">
                    <Button>
                      <a href="/learn" className="px-12 py-6">
                        <b>Mulai Belajar</b>
                      </a>
                    </Button>
                    <Button>
                      <a href="/register" className="px-12 py-6">
                        <b>Daftar Sekarang</b>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Penjelasan;
