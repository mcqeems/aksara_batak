import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRightLeft, Copy, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/layout/footer';

// Placeholder for textured background
const TexturedBackground = () => (
  <div className="absolute inset-0 -z-10 opacity-10">
    {/* Replace with your actual texture image */}
    <img
      src="/assets/logo/podahorasBlack.png" // Placeholder, ganti dengan tekstur Anda
      alt="Background Texture"
      className="h-full w-full object-cover opacity-20 dark:opacity-10"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-transparent"></div>
  </div>
);

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
    },
    btk: {
      horas: 'selamat',
      pagi: 'pagi',
      arian: 'siang',
      borngin: 'malam',
      jalo: 'terima',
      asi: 'kasih',
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
      utterance.lang = targetLang === 'id' ? 'id-ID' : 'en-US'; // Batak lang code not standard
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech tidak didukung atau tidak ada teks.');
    }
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4 pt-24 relative">
        <TexturedBackground />
        <motion.div
          className="w-full text-center mb-8 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Terjemahkan Aksara Batak
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Terjemahkan teks dari dan ke Aksara Batak dengan mudah dan cepat.
          </p>
        </motion.div>
        <motion.div
          className="bg-card/50 border-border/50 w-full max-w-4xl rounded-xl border p-6 shadow-lg backdrop-blur-sm relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Language Selection */}
          <div className="mb-4 flex items-center justify-between gap-2 md:gap-4">
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Bahasa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Indonesia</SelectItem>
                <SelectItem value="btk">Batak</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="icon" onClick={handleSwapLanguages}>
              <ArrowRightLeft className="h-5 w-5" />
            </Button>

            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Bahasa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Indonesia</SelectItem>
                <SelectItem value="btk">Batak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Textarea
              placeholder="Masukkan teks..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <div className="bg-muted/50 relative rounded-md p-4">
              <Textarea
                placeholder="Terjemahan"
                value={outputText}
                readOnly
                rows={8}
                className="border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="absolute bottom-2 right-2 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyToClipboard}
                  disabled={!outputText}
                >
                  <Copy className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSpeak}
                  disabled={!outputText}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Translate Button */}
          <div className="mt-6 text-center">
            <Button size="lg" onClick={handleTranslateText} disabled={!inputText}>
              Terjemahkan
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default Translate;
