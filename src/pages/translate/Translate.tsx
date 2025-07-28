import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowRightLeft,
  Copy,
  Volume2,
  Languages,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/layout/footer';

function Translate() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('id');
  const [targetLang, setTargetLang] = useState('btk');

  const dictionary: { [key: string]: { [key: string]: string } } = {
    id: {
      selamat: 'horas',
      pagi: 'pagi',
      siang: 'arian',
      malam: 'borngin',
      terima: 'jalo',
      kasih: 'asi',
      halo: 'horas',
      baik: 'bagus',
    },
    btk: {
      horas: 'selamat',
      pagi: 'pagi',
      arian: 'siang',
      borngin: 'malam',
      jalo: 'terima',
      asi: 'kasih',
      bagus: 'baik',
    },
  };

  const simulateTranslation = (text: string, from: string) => {
    const words = text.toLowerCase().split(' ');
    const translatedWords = words.map((word) => {
      return dictionary[from]?.[word] || word;
    });
    return translatedWords.join(' ');
  };

  const handleTranslateText = () => {
    const translated = simulateTranslation(inputText, sourceLang);
    setOutputText(translated);
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && outputText) {
      const utterance = new SpeechSynthesisUtterance(outputText);
      utterance.lang = targetLang === 'id' ? 'id-ID' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
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
                <Languages className="text-primary h-12 w-12" />
              </motion.div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Terjemahkan
              <span className="text-primary block">Aksara Batak</span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              Terjemahkan teks dari dan ke Bahasa Batak dengan mudah dan cepat.
              Pelajari kosakata dan ungkapan tradisional Batak.
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

      {/* Translation Tool Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-card/50 border-border/50 mx-auto w-full max-w-6xl rounded-2xl border p-8 shadow-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Language Selection */}
            <div className="mb-8">
              <motion.div
                className="flex items-center justify-between gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex-1">
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Pilih Bahasa Sumber" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">🇮🇩 Indonesia</SelectItem>
                      <SelectItem value="btk">🏛️ Batak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleSwapLanguages}
                    className="h-12 w-12 rounded-full"
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                  </Button>
                </motion.div>

                <div className="flex-1">
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Pilih Bahasa Target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">🇮🇩 Indonesia</SelectItem>
                      <SelectItem value="btk">🏛️ Batak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Card className="bg-background/50 border-0 shadow-lg backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Teks Sumber
                    </CardTitle>
                    <CardDescription>
                      Masukkan teks yang ingin diterjemahkan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Ketik teks di sini..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={10}
                      className="resize-none border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Card className="bg-background/50 border-0 shadow-lg backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Hasil Terjemahan
                    </CardTitle>
                    <CardDescription>
                      Terjemahan akan muncul di sini
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <Textarea
                      placeholder="Terjemahan akan muncul di sini..."
                      value={outputText}
                      readOnly
                      rows={10}
                      className="resize-none border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <div className="absolute right-4 bottom-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyToClipboard}
                        disabled={!outputText}
                        className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSpeak}
                        disabled={!outputText}
                        className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Translate Button */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <Button
                size="lg"
                onClick={handleTranslateText}
                disabled={!inputText}
                className="h-14 px-8 text-lg font-semibold"
              >
                <Languages className="mr-2 h-5 w-5" />
                Terjemahkan Sekarang
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Fitur Terjemahan
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Nikmati pengalaman terjemahan yang mudah dan akurat
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
                  <Languages className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Terjemahan Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Terjemahkan teks dengan cepat dan akurat antara Bahasa
                  Indonesia dan Batak.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-0 text-center shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
                  <Volume2 className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Text-to-Speech</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Dengarkan pengucapan hasil terjemahan untuk membantu
                  pembelajaran.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-0 text-center shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
                  <Copy className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Salin Mudah</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Salin hasil terjemahan ke clipboard dengan satu klik untuk
                  penggunaan selanjutnya.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Translate;
