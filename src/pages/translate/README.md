# Translate Page Refactor Documentation

## Struktur File

```
src/pages/translate/
├── Translate.tsx                    # File utama
├── README.md                        # Dokumentasi ini
├── hooks/
│   └── useTranslation.ts            # Custom hook untuk translation logic
└── components/
    ├── index.ts                     # Barrel file untuk export
    ├── TranslateHeader.tsx          # Header section dengan animasi
    ├── LanguageSelector.tsx         # Dropdown bahasa dan swap button
    ├── TranslationInput.tsx         # Input textarea untuk source text
    ├── TranslationOutput.tsx        # Output textarea dan copy button
    ├── TranslateButton.tsx          # Button untuk translate
    └── AnimatedBackground.tsx       # Background animasi reusable
```

### Komponen Utama

- **`Translate.tsx`** - File utama yang mengimpor dan menggunakan semua komponen

### Komponen yang Dipisah

#### 1. `TranslateHeader.tsx`

- **Fungsi**: Menampilkan header section dengan animasi
- **Fitur**:
  - Judul dan deskripsi halaman translate
  - Animated language icon
  - Responsive design

#### 2. `LanguageSelector.tsx`

- **Fungsi**: Dropdown bahasa dan swap button
- **Props**: `sourceLang`, `targetLang`, `onSourceLangChange`, `onTargetLangChange`, `onSwapLanguages`
- **Fitur**:
  - Dropdown untuk source dan target language
  - Swap button untuk menukar bahasa
  - Language options (Latin, Aksara Batak)
  - Responsive design

#### 3. `TranslationInput.tsx`

- **Fungsi**: Input textarea untuk source text
- **Props**: `inputText`, `onInputChange`
- **Fitur**:
  - Textarea untuk input text
  - Character counter
  - Placeholder text
  - Auto-resize functionality

#### 4. `TranslationOutput.tsx`

- **Fungsi**: Output textarea dan copy button
- **Props**: `outputText`, `onCopyToClipboard`
- **Fitur**:
  - Textarea untuk output text (read-only)
  - Copy to clipboard button
  - Loading state
  - Error handling

#### 5. `TranslateButton.tsx`

- **Fungsi**: Button untuk translate
- **Props**: `onTranslate`, `disabled`, `isMobile`
- **Fitur**:
  - Primary translate button
  - Disabled state ketika tidak ada input
  - Responsive design (mobile/desktop)
  - Loading state

#### 6. `AnimatedBackground.tsx`

- **Fungsi**: Background animasi yang dapat digunakan kembali
- **Fitur**:
  - Gradient backgrounds
  - Floating elements
  - Grid patterns
  - Animated icons

### Custom Hook

- **`useTranslation.ts`** - Hook untuk mengelola state translation dan API calls

### File Index

- **`index.ts`** - Barrel file untuk export semua komponen

## Penggunaan

```tsx
import { useTranslation } from './hooks/useTranslation';
import {
  TranslateHeader,
  LanguageSelector,
  TranslationInput,
  TranslationOutput,
  TranslateButton,
} from './components';

// Dalam komponen utama
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

<TranslateHeader />
<LanguageSelector
  sourceLang={sourceLang}
  targetLang={targetLang}
  onSourceLangChange={setSourceLang}
  onTargetLangChange={setTargetLang}
  onSwapLanguages={handleSwapLanguages}
/>
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
```

## Struktur Data

### Language Options

```tsx
interface LanguageOption {
  value: string;
  label: string;
  flag?: string;
}

const languages: LanguageOption[] = [
  { value: 'latin', label: 'Latin' },
  { value: 'batak', label: 'Aksara Batak' },
];
```

### Translation State

```tsx
interface TranslationState {
  inputText: string;
  outputText: string;
  sourceLang: string;
  targetLang: string;
  isLoading: boolean;
  error: string | null;
}
```

## Catatan Penting

- Semua komponen menggunakan Framer Motion untuk animasi
- Background animasi dapat digunakan kembali di halaman lain
- Translation logic dikelola dengan custom hook untuk separation of concerns
- Responsive design untuk mobile dan desktop
- Copy to clipboard functionality
- Props interface didefinisikan dengan TypeScript untuk type safety
