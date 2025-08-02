import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';

interface TranslationInputProps {
  inputText: string;
  onInputChange: (value: string) => void;
}

export function TranslationInput({
  inputText,
  onInputChange,
}: TranslationInputProps) {
  const [value, setValue] = useState(inputText);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setValue(inputText);
  }, [inputText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onInputChange(newValue);
    }, 350);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="bg-background/50 border-0 shadow-lg backdrop-blur-sm">
        <CardHeader className="hidden pb-3 md:block">
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4" />
            Teks Sumber
          </CardTitle>
          <CardDescription className="text-xs">
            Masukkan teks yang ingin diterjemahkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Ketik teks di sini..."
            value={value}
            onChange={handleChange}
            rows={8}
            className="resize-none border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
