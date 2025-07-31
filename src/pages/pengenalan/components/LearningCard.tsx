import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TreePine } from 'lucide-react';

interface LearningCardProps {
  title: string;
  description: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
  gradient: string;
  accentColor: string;
}

export function LearningCard({
  title,
  description,
  to,
  icon: Icon,
  delay,
  gradient,
  accentColor,
}: LearningCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ scale: 1.05, y: -8 }}
      onClick={() => navigate(to)}
    >
      {/* Enhanced gradient background */}
      <div className={`absolute inset-0 ${gradient} opacity-95`}></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-4 right-4 opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon className={`h-12 w-12 ${accentColor}`} />
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-4 opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <TreePine className={`h-8 w-8 ${accentColor}`} />
        </motion.div>
      </div>

      {/* Floating particles */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-white/40"
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute right-1/3 bottom-1/3 h-1.5 w-1.5 rounded-full bg-white/30"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <motion.div
            className="rounded-2xl border border-white/40 bg-white/30 p-4 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
          <motion.div
            className="rounded-full border border-white/40 bg-white/30 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
            whileHover={{ scale: 1.2, rotate: 15 }}
          >
            <ArrowRight className="h-4 w-4 text-white" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <div>
            <motion.h3
              className="font-bawor text-2xl font-bold text-white md:text-3xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="font-inter mt-3 text-sm leading-relaxed text-white/90 md:text-base"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Interactive hint */}
          <motion.div
            className="flex items-center gap-2 text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            <span className="text-xs font-medium">
              Klik untuk mulai belajar
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowRight className="h-3 w-3" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={false}
      />
    </motion.div>
  );
}
