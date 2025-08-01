import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 100,
  delay = 0,
  loop = false,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isWaveActive, setIsWaveActive] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Start wave animation after typing is complete
      const waveTimer = setTimeout(() => {
        setIsWaveActive(true);
      }, 500); // Wait 500ms after typing completes
      return () => clearTimeout(waveTimer);
    }
  }, [currentIndex, text, speed, isTyping, loop]);

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{
            opacity: index < currentIndex ? 1 : 0,
            y: index < currentIndex ? 0 : 20,
            scale: index < currentIndex ? 1 : 0.5,
            // Wave animation after typing is complete
            ...(isWaveActive && {
              y: [0, -8, 0],
            }),
          }}
          transition={{
            duration: 0.15,
            ease: 'easeOut',
            delay: index < currentIndex ? index * (speed / 1000) : 0,
            // Wave animation properties
            ...(isWaveActive && {
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.1, // Stagger wave effect
              },
            }),
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};
