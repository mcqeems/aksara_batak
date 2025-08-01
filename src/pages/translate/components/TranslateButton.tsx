import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TranslateButtonProps {
  onTranslate: () => void;
  disabled: boolean;
  isMobile?: boolean;
}

export function TranslateButton({
  onTranslate,
  disabled,
  isMobile = false,
}: TranslateButtonProps) {
  return (
    <motion.div
      className={
        isMobile ? 'text-center md:hidden' : 'hidden text-center md:block'
      }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isMobile ? 0.6 : 0.9 }}
    >
      <Button
        size="lg"
        onClick={onTranslate}
        disabled={disabled}
        className="text-base font-semibold"
      >
        <Languages className="mr-2 h-4 w-4" />
        Terjemahkan Sekarang
      </Button>
    </motion.div>
  );
}
