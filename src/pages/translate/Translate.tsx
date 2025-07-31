import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { useTranslation } from './hooks/useTranslation';
import {
  TranslateHeader,
  LanguageSelector,
  TranslationInput,
  TranslationOutput,
  TranslateButton,
  AnimatedBackground,
} from './components';

function Translate() {
  const {
    inputText,
    outputText,
    sourceLang,
    targetLang,
    setInputText,
    setSourceLang,
    setTargetLang,
    handleTranslateText,
    handleSwapLanguages,
    handleCopyToClipboard,
  } = useTranslation();

  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10 mt-16 flex flex-1 items-center justify-center px-4 py-4">
        <motion.div
          className="bg-card/50 border-border/50 w-full max-w-5xl rounded-2xl border p-6 shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <TranslateHeader />

          <LanguageSelector
            sourceLang={sourceLang}
            targetLang={targetLang}
            onSourceLangChange={setSourceLang}
            onTargetLangChange={setTargetLang}
            onSwapLanguages={handleSwapLanguages}
          />

          <div className="mb-4 flex flex-col gap-4 md:grid md:grid-cols-2">
            <TranslationInput
              inputText={inputText}
              onInputChange={setInputText}
            />

            <TranslateButton
              onTranslate={handleTranslateText}
              disabled={!inputText}
              isMobile={true}
            />

            <TranslationOutput
              outputText={outputText}
              onCopyToClipboard={handleCopyToClipboard}
            />
          </div>

          <TranslateButton
            onTranslate={handleTranslateText}
            disabled={!inputText}
            isMobile={false}
          />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default Translate;
