import { AnimatedBackground } from './AnimatedBackground';
import { FloatingElements } from './FloatingElements';
import { HeroLeftSection } from './HeroLeftSection';
import { HeroContent } from './HeroContent';
import { HeroBottomBar } from './HeroBottomBar';

export function HomepageHero() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden pt-16">
      <AnimatedBackground />
      <FloatingElements />

      <div className="relative z-10 flex items-center justify-center px-4 pb-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <HeroLeftSection />
          <HeroContent />
        </div>
      </div>

      <HeroBottomBar />
    </div>
  );
}
