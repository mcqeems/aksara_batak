import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { useContact } from './hooks/useContact';
import {
  ContactHeader,
  ContactForm,
  TeamCard,
  TeamOverviewCard,
  AnimatedBackground,
} from './components';

function Contact() {
  const { formData, handleChange, handleSubmit } = useContact();

  return (
    <div className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      <AnimatedBackground />

      {/* Team Cards */}
      <TeamCard
        title="Fullstack Developer"
        subtitle="Mustaqim Nawahhudi Ma'arif"
        username="mcqeems"
        email="mcqeemsofficial@gmail.com"
        phone="+62 881-1558-295"
        position="top-left"
        delay={0.3}
      />

      <TeamOverviewCard />

      <TeamCard
        title="Backend Developer"
        subtitle="Rizky Cahyono Putra"
        username="rizkycahyono97"
        email="rizkycahyonoputra2004@gmail.com"
        phone="+62 858-4376-1913"
        position="top-right"
        delay={0.5}
      />

      <TeamCard
        title="Frontend Developer"
        subtitle="Muhammad Umar Baihaqi"
        username="mubaihaqi"
        email="muhammadbaihaqidev@gmail.com"
        phone="+62 821-4142-3737"
        position="bottom-right"
        delay={0.6}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-4 py-4">
          <motion.div
            className="bg-card/50 border-border/50 mt-16 w-full max-w-2xl rounded-2xl border p-6 shadow-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ContactHeader />
            <ContactForm
              formData={formData}
              onFormChange={handleChange}
              onSubmit={handleSubmit}
            />
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
