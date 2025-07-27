import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground container mx-auto flex flex-col items-center justify-between px-4 py-6 text-sm md:flex-row md:px-8">
        <p className="">
          &copy; {new Date().getFullYear()} PodaHoras. Semua Hak Cipta
          Dilindungi.
        </p>
        <div className="mt-4 flex gap-4 md:mt-0">
          <Link to="/about" className="hover:text-primary transition-colors">
            Tentang
          </Link>
          <Link
            to="/contact"
            className="hover:text-primary transition-colors"
          >
            Kontak
          </Link>
          <Link
            to="/pengenalan"
            className="hover:text-primary transition-colors"
          >
            Pengenalan
          </Link>
        </div>
      </div>
    </footer>
  );
}
