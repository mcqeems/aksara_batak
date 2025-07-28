import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Mail, Send, Phone, MessageCircle, Users, Heart } from 'lucide-react';
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
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="flex h-64 w-full items-center justify-center bg-red-500">
        <h2 className="text-center text-6xl font-bold">tester</h2>
      </div>

      {/* Hero Section */}
      <section className="from-background via-background/95 to-muted/20 relative overflow-hidden bg-gradient-to-br py-20">
        <div className="h-64 w-full bg-green-500">
          <h2 className="text-center text-6xl font-bold">shiball</h2>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            className="space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                className="bg-primary/10 rounded-full p-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MessageCircle className="text-primary h-12 w-12" />
              </motion.div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Hubungi
              <span className="text-primary block">Kami</span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              Punya pertanyaan, masukan, atau ingin berkolaborasi dalam
              melestarikan aksara Batak? Kami siap mendengar dari Anda.
            </p>
          </motion.div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="bg-primary/5 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="bg-destructive/5 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-card/50 border-border/50 mx-auto w-full max-w-4xl rounded-2xl border p-8 shadow-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Card className="bg-background/50 border-0 shadow-lg backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
                  <MessageCircle className="text-primary h-8 w-8" />
                  Kirim Pesan
                </CardTitle>
                <CardDescription className="text-lg">
                  Isi formulir di bawah ini dan kami akan segera menghubungi
                  Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Label htmlFor="name" className="text-base font-medium">
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        placeholder="Tulis nama Anda"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 text-base"
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <Label htmlFor="email" className="text-base font-medium">
                        Alamat Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@contoh.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 text-base"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <Label htmlFor="message" className="text-base font-medium">
                      Pesan Anda
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Apa yang ingin Anda sampaikan? Beritahu kami tentang pertanyaan, saran, atau kolaborasi yang Anda inginkan."
                      rows={8}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="resize-none text-base"
                    />
                  </motion.div>
                  <motion.div
                    className="pt-4 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="h-14 px-8 text-lg font-semibold"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Kirim Pesan
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Informasi Kontak
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Hubungi kami melalui berbagai saluran yang tersedia
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <Card className="bg-background/50 border-0 text-center shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
                  <Mail className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  <a
                    href="mailto:podahoras@example.com"
                    className="hover:text-primary font-medium transition-colors"
                  >
                    podahoras@example.com
                  </a>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-0 text-center shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
                  <Phone className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Telepon</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  <a
                    href="tel:+621234567890"
                    className="hover:text-primary font-medium transition-colors"
                  >
                    +62 123 456 7890
                  </a>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-0 text-center shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
                  <Users className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Tim</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tim pengembang dan ahli budaya Batak siap membantu Anda
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                className="bg-primary/10 rounded-full p-4"
                whileHover={{ scale: 1.1 }}
              >
                <Heart className="text-primary h-12 w-12" />
              </motion.div>
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Bersama Melestarikan Budaya
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Kami berkomitmen untuk melestarikan dan memperkenalkan aksara
              Batak kepada generasi muda. Setiap pesan, saran, dan dukungan Anda
              sangat berarti bagi perjalanan kami dalam menjaga warisan budaya
              yang berharga ini.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
