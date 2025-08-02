import { useState } from 'react';
import api from '@/services/api';

export function useTranslation() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('id');
  const [targetLang, setTargetLang] = useState('batak_aksara');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslateText = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setOutputText('');

    const directionId = `${sourceLang}_to_${targetLang}`;

    try {
      const response = await api.post('v1/translate', {
        text: inputText,
        direction: directionId,
      });

      if (response.data && response.data.data.translated_text) {
        setOutputText(response.data.data.translated_text);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = 'Gagal menerjemahkan. Silakan coba lagi nanti.';
      setError(errorMessage);
      console.error('Translation API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    // Optional: swap text as well
    const currentInput = inputText;
    setInputText(outputText);
    setOutputText(currentInput);
  };

  const handleCopyToClipboard = () => {
    if (outputText && !isLoading && !error) {
      navigator.clipboard.writeText(outputText);
    }
  };

  return {
    inputText,
    outputText,
    sourceLang,
    targetLang,
    isLoading,
    error,
    setInputText,
    setSourceLang,
    setTargetLang,
    handleTranslateText,
    handleSwapLanguages,
    handleCopyToClipboard,
  };
}
