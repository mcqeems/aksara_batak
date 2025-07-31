# Pengenalan Page Refactor Documentation

## Struktur File

```
src/pages/pengenalan/
├── Pengenalan.tsx                  # File utama
├── README.md                        # Dokumentasi ini
└── components/
    ├── index.ts                     # Barrel file untuk export
    ├── PengenalanHeader.tsx        # Header section dengan animasi
    ├── LearningCard.tsx             # Card untuk learning paths
    ├── LearningSection.tsx          # Section dengan learning cards
    └── AnimatedBackground.tsx       # Background animasi reusable
```

### Komponen Utama

- **`Pengenalan.tsx`** - File utama yang mengimpor dan menggunakan semua komponen

### Komponen yang Dipisah

#### 1. `PengenalanHeader.tsx`

- **Fungsi**: Menampilkan header section dengan animasi
- **Fitur**:
  - Judul dan deskripsi halaman pengenalan
  - Animated sparkles icon
  - Responsive design

#### 2. `LearningCard.tsx`

- **Fungsi**: Card untuk learning paths
- **Props**: `title`, `description`, `to`, `icon`, `delay`, `gradient`, `accentColor`
- **Fitur**:
  - Navigation ke halaman yang sesuai
  - Hover animations
  - Gradient backgrounds
  - Icon animations
  - Staggered animations dengan delay

#### 3. `LearningSection.tsx`

- **Fungsi**: Section dengan learning cards
- **Fitur**:
  - Subtitle "Pilih Jalur Pembelajaran"
  - Grid layout untuk cards
  - Two LearningCard instances
  - Responsive design

#### 4. `AnimatedBackground.tsx`

- **Fungsi**: Background animasi yang dapat digunakan kembali
- **Fitur**:
  - Gradient backgrounds
  - Floating elements
  - Grid patterns
  - Animated icons

### File Index

- **`index.ts`** - Barrel file untuk export semua komponen

## Penggunaan

```tsx
import {
  PengenalanHeader,
  LearningSection,
} from './components';

// Dalam komponen utama
<PengenalanHeader />
<LearningSection />
```

## Struktur Data

### Learning Card Props

```tsx
interface LearningCardProps {
  title: string;
  description: string;
  to: string;
  icon: React.ReactNode;
  delay: number;
  gradient: string;
  accentColor: string;
}
```

### Learning Paths

```tsx
const learningPaths = [
  {
    title: 'Sejarah Aksara Batak',
    description: 'Pelajari sejarah dan asal-usul Aksara Batak',
    to: '/pengenalan/sejarah',
    icon: <History size={32} />,
    delay: 0.2,
    gradient: 'from-blue-500 to-purple-600',
    accentColor: 'text-blue-500',
  },
  {
    title: 'Penjelasan Aksara Batak',
    description: 'Pahami struktur dan aturan Aksara Batak',
    to: '/pengenalan/penjelasan',
    icon: <BookOpen size={32} />,
    delay: 0.4,
    gradient: 'from-green-500 to-teal-600',
    accentColor: 'text-green-500',
  },
];
```

## Catatan Penting

- Semua komponen menggunakan Framer Motion untuk animasi
- Background animasi dapat digunakan kembali di halaman lain
- Learning cards dengan navigation ke halaman yang sesuai
- Staggered animations untuk visual appeal
- Props interface didefinisikan dengan TypeScript untuk type safety
- Responsive design untuk mobile dan desktop
