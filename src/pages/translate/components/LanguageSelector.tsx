import { motion } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LanguageSelectorProps {
  sourceLang: string;
  targetLang: string;
  onSourceLangChange: (value: string) => void;
  onTargetLangChange: (value: string) => void;
  onSwapLanguages: () => void;
}

export function LanguageSelector({
  sourceLang,
  targetLang,
  onSourceLangChange,
  onTargetLangChange,
  onSwapLanguages,
}: LanguageSelectorProps) {
  return (
    <div className="mb-4">
      <motion.div
        className="flex flex-col items-center justify-between gap-2 md:flex-row"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-full md:w-auto">
          <Select value={sourceLang} onValueChange={onSourceLangChange}>
            <SelectTrigger className="h-12 w-full text-sm md:w-auto">
              <SelectValue placeholder="Pilih Bahasa Sumber" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">Indonesia</SelectItem>
              <SelectItem value="btk">Batak Toba</SelectItem>
              <SelectItem value="btk-mdl">Batak Mandailing</SelectItem>
              <SelectItem value="btk-sml">Batak Simalungun</SelectItem>
              <SelectItem value="btk-kro">Batak Karo</SelectItem>
              <SelectItem value="btk-pkp">Batak Pakpak (Dairi)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <motion.button
          onClick={onSwapLanguages}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 transition-all duration-200 hover:bg-white/20"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          title="Tukar Bahasa"
        >
          <ArrowRightLeft className="h-5 w-5 text-white" />
        </motion.button>

        <div className="w-full md:w-auto">
          <Select value={targetLang} onValueChange={onTargetLangChange}>
            <SelectTrigger className="h-12 w-full text-sm md:w-auto">
              <SelectValue placeholder="Pilih Bahasa Target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">Indonesia</SelectItem>
              <SelectItem value="btk">Batak Toba</SelectItem>
              <SelectItem value="btk-mdl">Batak Mandailing</SelectItem>
              <SelectItem value="btk-sml">Batak Simalungun</SelectItem>
              <SelectItem value="btk-kro">Batak Karo</SelectItem>
              <SelectItem value="btk-pkp">Batak Pakpak (Dairi)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>
    </div>
  );
}
