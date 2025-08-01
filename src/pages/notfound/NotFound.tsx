import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { NotFoundBackground, NotFoundContent } from './components';

function NotFound() {
  return (
    <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden">
      <Navbar />

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4 text-center">
        {/* Background Texture */}
        <NotFoundBackground />

        {/* Main Content */}
        <NotFoundContent />
      </div>

      <Footer />
    </div>
  );
}

export default NotFound;
