import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground, ChatbotContent } from './components';

function Chatbot() {
  return (
    <div className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-1 flex-col">
        <Navbar />

        <div className="flex flex-1 items-center justify-center px-4 py-4">
          <ChatbotContent />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Chatbot;
