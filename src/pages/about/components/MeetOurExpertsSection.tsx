import { motion } from 'framer-motion';
import { Heart, Instagram, Github, Linkedin } from 'lucide-react';

interface Expert {
  name: string;
  title: string;
  quote: string;
  social: {
    instagram: string;
    github: string;
    linkedin: string;
  };
  image: string;
}

const experts: Expert[] = [
  {
    name: 'Rizky Cahyono Putra',
    title: 'Backend Developer',
    quote: 'The only way to do great work is to love what you do. - Steve Jobs',
    social: {
      instagram: '@riz.cahyono',
      github: '@rizkycahyono97',
      linkedin: '@rizky-cahyono',
    },
    image: '/assets/images/dev/github/rizcon.jpeg',
  },
  {
    name: "Mustaqim Nawahhudi Ma'arif",
    title: 'Fullstack Developer',
    quote:
      'Programs must be written for people to read, and only incidentally for machines to execute.',
    social: {
      instagram: '@mcqeems',
      github: '@mcqeems',
      linkedin: '@mcqeems',
    },
    image: '/assets/images/dev/github/mcqeems.jpg',
  },
  {
    name: 'Muhammad Umar Baihaqi',
    title: 'Frontend Developer',
    quote:
      'Coding is a blank canvas, where every line of code is a brushstroke from your imagination.',
    social: {
      instagram: '@haq_xgi',
      github: '@mubaihaqi',
      linkedin: '@mubaihaqi',
    },
    image: '/assets/images/dev/github/mubaihaqi.jpeg',
  },
];

export function MeetOurExpertsSection() {
  return (
    <div className="px-4 py-20 md:px-8">
      {/* Background Texture */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '25px 25px',
          }}
        ></div>
        {/* Dots Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)
            `,
            backgroundSize: '35px 35px',
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="from-primary/5 to-destructive/5 absolute inset-0 bg-gradient-to-br via-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="relative">
            {/* Decorative Lines */}
            <div className="border-primary absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2"></div>
            <div className="border-primary absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2"></div>

            <h2 className="text-primary text-3xl font-bold tracking-tight md:text-4xl">
              Meet Our Experts
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Tim di balik PodaHoras.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.name}
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              className="group bg-card/95 border-primary/30 hover:shadow-primary/20 hover:border-primary/50 relative overflow-hidden rounded-2xl border-2 shadow-2xl backdrop-blur-sm transition-all duration-300"
            >
              {/* Background Blob */}
              <div className="bg-primary/25 group-hover:bg-primary/35 absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"></div>
              <div className="bg-destructive/20 group-hover:bg-destructive/30 absolute -bottom-20 -left-20 h-32 w-32 rounded-full blur-2xl transition-all duration-500"></div>
              <div className="bg-primary/15 group-hover:bg-primary/25 absolute top-1/2 -left-10 h-24 w-24 -translate-y-1/2 rounded-full blur-2xl transition-all duration-700"></div>

              <div className="relative z-10 flex h-full">
                {/* Expert Image - 2/5 width, full height */}
                <div className="h-full w-2/5 p-4">
                  <div className="h-full w-full overflow-hidden rounded-xl border-2 border-white/30 shadow-lg">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${expert.image})`,
                      }}
                    />
                  </div>
                </div>

                {/* Expert Info - 3/5 width */}
                <div className="flex h-full w-3/5 flex-col justify-center p-4">
                  <div className="mb-4">
                    <h3 className="text-primary group-hover:text-primary/80 mb-1 text-xl font-bold transition-colors duration-300">
                      {expert.name}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-muted-foreground/80 mb-3 text-sm transition-colors duration-300">
                      {expert.title}
                    </p>

                    {/* Quote */}
                    <div className="bg-muted/60 border-muted/30 group-hover:bg-muted/70 rounded-lg border p-3 transition-all duration-300">
                      <p className="text-muted-foreground group-hover:text-muted-foreground/90 text-sm italic transition-colors duration-300">
                        "{expert.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="space-y-2">
                    <a
                      href={`https://instagram.com/${expert.social.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1 hover:scale-105"
                    >
                      <div className="rounded bg-orange-500/30 p-1 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500/40">
                        <Instagram size={14} />
                      </div>
                      <span className="text-xs text-white transition-colors duration-300 group-hover:text-white/90">
                        {expert.social.instagram}
                      </span>
                    </a>
                    <a
                      href={`https://github.com/${expert.social.github.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1 hover:scale-105"
                    >
                      <div className="rounded bg-orange-500/30 p-1 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500/40">
                        <Github size={14} />
                      </div>
                      <span className="text-xs text-white transition-colors duration-300 group-hover:text-white/90">
                        {expert.social.github}
                      </span>
                    </a>
                    <a
                      href={`https://linkedin.com/in/${expert.social.linkedin.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1 hover:scale-105"
                    >
                      <div className="rounded bg-orange-500/30 p-1 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500/40">
                        <Linkedin size={14} />
                      </div>
                      <span className="text-xs text-white transition-colors duration-300 group-hover:text-white/90">
                        {expert.social.linkedin}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="text-primary/60 group-hover:text-primary/80 absolute top-4 right-4 transition-colors duration-300"
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
                  <Heart size={18} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
