import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SejarahNavbar } from '@/components/layout/SejarahNavbar';
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

const Penjelasan: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const globalBgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sectionAudioPlayersRef = useRef<(HTMLAudioElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
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
      globalBgMusicRef.current?.pause();
      sectionAudioPlayersRef.current.forEach((a) => a?.pause());
    };
  }, []);

  // Handle user interaction for audio autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      // Try to play background music on first interaction
      if (globalBgMusicRef.current && globalBgMusicRef.current.paused) {
        globalBgMusicRef.current.play().catch(() => {});
      }
      // Remove event listeners after first interaction
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
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

  // Auto-scroll functionality
  const handleAutoScrollToggle = useCallback(
    (isPlaying: boolean) => {
      setIsAutoScrolling(isPlaying);

      if (isPlaying) {
        // Start auto-scroll based on audio completion
        const startAutoScroll = () => {
          const currentAudio = sectionAudioPlayersRef.current[currentSection];
          if (currentAudio) {
            // Listen for audio end event
            const handleAudioEnd = () => {
              const nextSection = currentSection + 1;
              if (nextSection < 8) {
                setCurrentSection(nextSection);
                navigateToSection(nextSection);
                // Start next audio and continue auto-scroll
                setTimeout(() => {
                  if (isAutoScrolling) {
                    startAutoScroll();
                  }
                }, 1000); // Small delay before next section
              } else {
                setIsAutoScrolling(false);
              }
            };

            currentAudio.addEventListener('ended', handleAudioEnd, {
              once: true,
            });
            currentAudio.play().catch(() => {
              // If audio fails, move to next section after 3 seconds
              setTimeout(() => {
                if (isAutoScrolling) {
                  const nextSection = currentSection + 1;
                  if (nextSection < 8) {
                    setCurrentSection(nextSection);
                    navigateToSection(nextSection);
                    startAutoScroll();
                  } else {
                    setIsAutoScrolling(false);
                  }
                }
              }, 3000);
            });
          } else {
            // If no audio, move to next section after 3 seconds
            setTimeout(() => {
              if (isAutoScrolling) {
                const nextSection = currentSection + 1;
                if (nextSection < 8) {
                  setCurrentSection(nextSection);
                  navigateToSection(nextSection);
                  startAutoScroll();
                } else {
                  setIsAutoScrolling(false);
                }
              }
            }, 3000);
          }
        };

        startAutoScroll();
      } else {
        // Stop auto-scroll
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = null;
        }
      }
    },
    [navigateToSection, currentSection, isAutoScrolling]
  );

  // Sound toggle functionality
  const handleSoundToggle = useCallback((isMuted: boolean) => {
    setIsSoundMuted(isMuted);

    if (isMuted) {
      // Mute all audio
      if (globalBgMusicRef.current) {
        globalBgMusicRef.current.volume = 0;
      }
      sectionAudioPlayersRef.current.forEach((audio) => {
        if (audio) audio.volume = 0;
      });
    } else {
      // Unmute all audio
      if (globalBgMusicRef.current) {
        globalBgMusicRef.current.volume = 0.3;
      }
      sectionAudioPlayersRef.current.forEach((audio) => {
        if (audio) audio.volume = 1;
      });
    }
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
        // Simulate wheel event to trigger GSAP animation
        const wheelEvent = new WheelEvent('wheel', { deltaY: 1 });
        componentRef.current.dispatchEvent(wheelEvent);
      }
    }
  }, [currentSection, isAutoScrolling]);

  // GSAP Observer Animations and audio play on section enter
  useEffect(() => {
    if (isLoading || !componentRef.current) return;

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
        if (!userInteracted) return; // Only play audio after user interaction

        const currentSectionAudioPlayer =
          sectionAudioPlayersRef.current[newIndex];
        const oldSectionAudioPlayer =
          oldIndex >= 0 ? sectionAudioPlayersRef.current[oldIndex] : null;

        if (oldSectionAudioPlayer && oldIndex !== newIndex) {
          oldSectionAudioPlayer.pause();
          oldSectionAudioPlayer.currentTime = 0;
        }

        if (currentSectionAudioPlayer) {
          currentSectionAudioPlayer.currentTime = 0;
          currentSectionAudioPlayer.play().catch((e) => {
            // Only log error if user has interacted
            if (userInteracted) {
              console.warn(`Failed to play section ${newIndex} audio:`, e);
            }
          });
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

        animating = true;
        const oldCurrentIndex = currentIndex;
        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        // Update current section state
        setCurrentSection(index);

        const tl = gsap.timeline({
          defaults: { duration: 1.25, ease: 'power1.inOut' },
          onComplete: () => {
            animating = false;
            currentIndex = index;
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

          // Animate text content based on section
          const textElement = currentSection.querySelector('p');
          if (textElement) {
            // Different animation directions for different sections
            const animationDirection = index % 2 === 0 ? -30 : 30;
            tl.fromTo(
              textElement,
              { autoAlpha: 0, xPercent: animationDirection },
              { autoAlpha: 1, xPercent: 0, duration: 1, ease: 'power2.out' },
              contentAnimationStartTime
            );
          }
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
  }, [isLoading, userInteracted]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="penjelasan-page bg-background text-foreground min-h-screen overflow-x-hidden">
      <SejarahNavbar
        onAutoScrollToggle={handleAutoScrollToggle}
        onSoundToggle={handleSoundToggle}
        onSectionChange={handleSectionChange}
        currentSection={currentSection}
        totalSections={8}
        isAutoScrolling={isAutoScrolling}
        isSoundMuted={isSoundMuted}
      />
      <div
        ref={componentRef}
        className="scroll-animation-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* SECTION 1 */}
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
              <div className="bg one flex flex-col">
                <img
                  className="md:h-[400px]"
                  src="/assets/logo/podahorasOriginal.svg"
                  alt="PodaHoras Logo"
                />
                <h2 className="section-heading text-center text-4xl md:text-5xl">
                  <b>Penjelasan Aksara Batak</b>
                  <br />
                  <span className="text-lg text-blue-300 md:text-xl">
                    Scroll ke bawah untuk memulai
                  </span>
                </h2>
                <div className="arrowCta scale-70 md:scale-100"></div>
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
                <p className="absolute top-20 z-50 px-2 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[0].text}
                </p>
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
                <p className="absolute top-20 z-50 w-full max-w-[600px] px-2 text-center text-xl text-shadow-md sm:right-20 sm:text-3xl md:px-0 md:text-right">
                  {batakPenjelasanContent[1].text}
                </p>
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
                <p className="absolute top-20 z-50 w-full max-w-[500px] px-2 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[2].text}
                </p>
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
                <p className="absolute top-20 right-2 z-50 w-full max-w-[600px] px-2 text-center text-xl text-shadow-md sm:right-20 sm:text-3xl md:px-0 md:text-right">
                  {batakPenjelasanContent[3].text}
                </p>
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
                <p className="absolute top-20 z-50 w-full max-w-[500px] px-2 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[4].text}
                </p>
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
                <p className="absolute top-20 z-50 w-full max-w-[600px] px-2 text-center text-xl text-shadow-md sm:left-25 sm:text-3xl md:px-0 md:text-left">
                  {batakPenjelasanContent[5].text}
                </p>
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
                <div className="absolute top-20 z-50 w-full max-w-[700px] sm:left-25">
                  <p className="px-2 text-center text-xl text-shadow-md sm:text-3xl md:px-0 md:text-left">
                    {batakPenjelasanContent[6].text}
                  </p>
                  <div className="mt-4 flex flex-row justify-center gap-5 md:justify-start">
                    <a href="/learn" className="w-full max-w-[130px]">
                      <button className="w-full max-w-[130px] cursor-pointer border-2 border-white bg-transparent text-white hover:border-blue-300 hover:bg-blue-300/60">
                        <b>Belajar</b>
                      </button>
                    </a>
                    <a href="/register" className="w-full max-w-[130px]">
                      <button className="w-full max-w-[130px] cursor-pointer border-2 border-white bg-transparent text-white hover:border-blue-300 hover:bg-blue-300/60">
                        <b>Daftar</b>
                      </button>
                    </a>
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
