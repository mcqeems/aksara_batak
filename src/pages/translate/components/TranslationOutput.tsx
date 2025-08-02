import { motion } from 'framer-motion';
import { Copy, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TypingLoader from '@/components/ui/loader/TypingLoader';

interface TranslationOutputProps {
  outputText: string;
  onCopyToClipboard: () => void;
  isLoading: boolean;
  error: string | null;
}

export function TranslationOutput({
  outputText,
  onCopyToClipboard,
  isLoading,
  error,
}: TranslationOutputProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex min-h-[150px] items-center justify-center">
          <TypingLoader />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex min-h-[150px] flex-col items-center justify-center text-center text-destructive">
          <AlertTriangle className="mb-2 h-8 w-8" />
          <p className="font-semibold">Terjadi Kesalahan</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    return (
      <>
        <Textarea
          placeholder="Terjemahan akan muncul di sini..."
          value={outputText}
          readOnly
          rows={8}
          className="resize-none border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="absolute right-4 bottom-4 flex gap-2">
          <Button
            variant="link"
            size="icon"
            onClick={onCopyToClipboard}
            disabled={!outputText}
            className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Card className="bg-background/50 border-0 shadow-lg backdrop-blur-sm">
        <CardHeader className="hidden pb-3 md:block">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4" />
            Hasil Terjemahan
          </CardTitle>
          <CardDescription className="text-xs">
            {isLoading
              ? 'Sedang menerjemahkan...'
              : 'Terjemahan akan muncul di sini'}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">{renderContent()}</CardContent>
      </Card>
    </motion.div>
  );
}
