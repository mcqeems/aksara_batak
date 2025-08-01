import { motion } from 'framer-motion';
import { TypingEffect } from '@/components/ui/typing-effect';
import { AnimatedBackground } from './AnimatedBackground.js';

export function AboutHero() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden pt-16 text-center">
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <motion.div
          className="flex max-w-4xl flex-col gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6">
            <h1 className="font-bawor text-6xl font-extrabold tracking-tight text-[#ecbb88] md:text-8xl lg:text-9xl">
              <span className="block whitespace-nowrap">
                <TypingEffect
                  text="About PodaHoras"
                  speed={50}
                  delay={300}
                  loop={false}
                  className="text-center whitespace-nowrap"
                />
              </span>
            </h1>
            <div className="text-muted-foreground text-xl font-medium md:text-2xl lg:text-3xl">
              <p className="text-center">
                Jembatan Ilmu dan Budaya: Melestarikan Aksara Batak untuk
                Generasi Mendatang.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
