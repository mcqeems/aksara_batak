import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  AboutHero,
  VisionMissionSection,
  StoryTargetSection,
  ImpactSection,
  MeetOurExpertsSection,
  TestimonialSection,
  CallToActionSection,
} from './components';

function About() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <AboutHero />

      {/* Vision & Mission Section */}
      <VisionMissionSection />

      {/* Story & Target Section */}
      <StoryTargetSection />

      {/* Impact Section */}
      {/* <ImpactSection /> */}

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Meet Our Experts Section */}
      <MeetOurExpertsSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      <Footer />
    </div>
  );
}

export default About;
