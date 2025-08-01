import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Star, Sparkles, Heart, BookMarked } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  videoSrc: string;
}

interface PreviewsSectionProps {
  features: Feature[];
}

export function PreviewsSection({ features }: PreviewsSectionProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.play();
      setPlaying(index);
    }
  };

  return (
    <div
      id="previews"
      className="relative px-4 py-20 md:px-8"
      style={{ backgroundColor: 'var(--muted)' }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        ></div>

        {/* Dots Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        ></div>

        {/* Diagonal Lines */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.05) 2px,
                rgba(255,255,255,0.05) 4px
              )
            `,
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="relative">
            {/* Decorative Lines */}
            <div className="border-primary absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2"></div>
            <div className="border-primary absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2"></div>

            <h2 className="text-primary text-3xl font-bold tracking-tight md:text-4xl">
              Lihat Fitur Kami Beraksi
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Setiap fitur dirancang untuk memberikan pengalaman belajar yang
            menarik dan efektif.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group bg-card/80 border-border/50 relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-sm"
              whileHover={{ y: -5, scale: 1.01 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Background Blobs */}
              <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-32 -right-32 h-64 w-64 rounded-full blur-3xl transition-all duration-500"></div>
              <div className="bg-destructive/10 group-hover:bg-destructive/20 absolute -bottom-32 -left-32 h-48 w-48 rounded-full blur-2xl transition-all duration-500"></div>

              <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                {/* Content Side */}
                <motion.div
                  className={`flex flex-col justify-center p-8 lg:p-12 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}
                  initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Header */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-4 shadow-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-foreground text-2xl font-bold lg:text-3xl">
                        {feature.title}
                      </h3>
                      <div className="bg-primary mt-2 h-1 w-16 rounded-full"></div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
                    {feature.description}
                  </p>

                  {/* Floating Elements */}
                  <motion.div
                    className={`absolute ${index % 2 !== 0 ? 'left-8' : 'right-8'} text-primary/30 top-8`}
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 360, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Star size={20} />
                  </motion.div>
                  <motion.div
                    className={`absolute ${index % 2 !== 0 ? 'left-8' : 'right-8'} text-destructive/30 bottom-8`}
                    animate={{
                      y: [0, 8, 0],
                      rotate: [0, -360, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                  >
                    <Sparkles size={18} />
                  </motion.div>
                </motion.div>

                {/* Video Side */}
                <motion.div
                  className={`relative p-8 lg:p-12 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}
                  initial={{ opacity: 0, x: index % 2 !== 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <div className="relative aspect-video">
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el;
                        }}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        onEnded={() => setPlaying(null)}
                      >
                        <source src={feature.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {playing !== index && (
                        <div
                          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center"
                          onClick={() => handlePlay(index)}
                        >
                          <div className="bg-background/90 border-border/50 rounded-full border p-6 shadow-2xl backdrop-blur-sm transition-transform duration-200 hover:scale-110">
                            <Play size={32} className="text-primary" />
                          </div>
                        </div>
                      )}

                      <div className="bg-primary/90 absolute top-4 left-4 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
                        Demo Video
                      </div>
                      <div className="bg-destructive/90 shadow-blur-sm absolute right-4 bottom-4 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg">
                        {feature.title}
                      </div>

                      <div className="from-background/20 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
                    </div>
                  </div>

                  <motion.div
                    className={`absolute top-1/4 ${index % 2 !== 0 ? 'left-4' : '-right-4'} text-primary/40`}
                    animate={{
                      x: [0, index % 2 !== 0 ? -5 : 5, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Heart size={16} />
                  </motion.div>
                  <motion.div
                    className={`absolute bottom-1/4 ${index % 2 !== 0 ? '-left-4' : 'left-4'} text-destructive/40`}
                    animate={{
                      x: [0, index % 2 !== 0 ? 5 : -5, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.5,
                    }}
                  >
                    <BookMarked size={18} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
