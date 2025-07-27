import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Mail, Send, Phone } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:podahoras@example.com?subject=Pesan dari ${name}&body=${encodeURIComponent(
      message
    )}%0A%0AFrom: ${name}%0AEmail: ${email}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto flex flex-1 max-w-4xl flex-col items-center px-4 pt-32">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Hubungi Kami
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Punya pertanyaan, masukan, atau ingin berkolaborasi? Kami siap
            mendengar dari Anda.
          </p>
        </motion.div>

        <motion.div
          className="bg-card/50 border-border/50 mt-12 w-full rounded-xl border p-8 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Tulis nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Alamat Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Pesan Anda</Label>
              <Textarea
                id="message"
                placeholder="Apa yang ingin Anda sampaikan?"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-right">
              <Button type="submit" size="lg">
                Kirim Pesan
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          className="mt-16 w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold">Informasi Kontak Lainnya</h3>
          <div className="text-muted-foreground mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="mailto:podahoras@example.com"
              className="hover:text-primary flex items-center gap-2 transition-colors"
            >
              <Mail className="h-5 w-5" />
              podahoras@example.com
            </a>
            <a
              href="tel:+621234567890"
              className="hover:text-primary flex items-center gap-2 transition-colors"
            >
              <Phone className="h-5 w-5" />
              +62 123 456 7890
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
