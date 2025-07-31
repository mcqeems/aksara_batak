import { motion } from 'framer-motion';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <div id="features" className="px-4 py-20 md:px-8">
      <div className="container mx-auto">
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
              Kenapa PodaHoras?
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Kami menyediakan alat yang Anda butuhkan untuk menguasai Aksara
            Batak.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card/50 border-border/50 rounded-xl border p-6 shadow-lg backdrop-blur-sm"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-col items-start gap-4">
                {/* Illustration Placeholder */}
                <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-lg p-4">
                  {feature.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-foreground text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
