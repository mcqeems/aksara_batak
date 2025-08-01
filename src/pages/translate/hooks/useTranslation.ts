import { useState } from 'react';

export function useTranslation() {
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

  return {
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
  };
}
