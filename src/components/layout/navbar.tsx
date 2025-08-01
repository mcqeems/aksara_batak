import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from '../ui/switch';
import { useTheme } from './theme-provider';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  return (
    <header className="bg-background/80 fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b px-4 backdrop-blur-sm md:px-8">
      <Link to="/" className="flex items-center gap-2 font-bold">
        <img
          className="fill-primary max-h-[40px]"
          src="/assets/logo/podahorasOriginal.svg"
          alt="Logo"
        />
        <span className="font-bawor text-3xl text-[#ecbb88] sm:inline-block">
          PodaHoras
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center justify-center gap-6 text-sm font-medium md:flex">
        <Switch
          variant="theme"
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          IconOn={MoonIcon}
          IconOff={SunIcon}
        />
        <Link
          to="/translate"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Translate
        </Link>
        <Link
          to="/chatbot"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Chatbot
        </Link>
        <Link
          to="/pengenalan"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Pengenalan
        </Link>
        <Link
          to="/about"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Tentang
        </Link>
        <Link
          to="/contact"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Hubungi Kami
        </Link>
        <Link to="/mulai">
          <Button variant="default" size="sm">
            Mulai
          </Button>
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Button variant="default" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 px-3 py-10">
              <Link
                to="/translate"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Translate
              </Link>
              <Link
                to="/chatbot"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Chatbot
              </Link>
              <Link
                to="/pengenalan"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pengenalan
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Tentang
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Hubungi Kami
              </Link>
              <Link to="/mulai">
                <Button variant="default" className="w-full">
                  Mulai
                </Button>
              </Link>
            </div>
            <div className="flex h-full w-full flex-row items-end justify-between px-5 py-5">
              {isDarkMode ? (
                <p className="text-muted-foreground text-sm">
                  Apakah terlalu gelap?
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Apakah terlalu terang?
                </p>
              )}
              <Switch
                variant="theme"
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
                IconOn={MoonIcon}
                IconOff={SunIcon}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
