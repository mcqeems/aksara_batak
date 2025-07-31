# Homepage Refactor Documentation

## Struktur File

```
src/pages/homepage/
├── Homepage.tsx                    # File utama homepage
├── README.md                       # Dokumentasi ini
└── components/
    ├── index.ts                    # Barrel file untuk export semua komponen
    ├── HomepageHero.tsx            # Main hero component (refactored)
    ├── FloatingElements.tsx        # Dekoratif floating elements
    ├── HeroLeftSection.tsx         # Bagian kiri dengan WelcomeCard
    ├── HeroContent.tsx             # Konten utama (judul, deskripsi, tombol)
    ├── HeroBottomBar.tsx           # Bottom scrolling text bar
    ├── WelcomeCard.tsx             # Card selamat datang dengan animasi
    ├── AnimatedBackground.tsx      # Background animasi reusable
    ├── FeaturesSection.tsx         # Section fitur-fitur utama
    ├── PreviewsSection.tsx         # Section preview video
    ├── ProgressSection.tsx         # Section statistik & leaderboard
    └── CallToActionSection.tsx     # Section call-to-action
```

### Komponen Utama

- **`Homepage.tsx`** - File utama yang mengimpor dan menggunakan semua komponen

- **Fungsi**: File utama yang mengimpor dan menggunakan semua komponen homepage
- **Struktur**: Menggunakan layout yang terorganisir dengan semua section

### 2. `HomepageHero.tsx` (Refactored)

- **Fungsi**: Main hero component yang mengkoordinasikan semua bagian hero
- **Komponen yang digunakan**:
  - `FloatingElements` - Elemen dekoratif mengambang
  - `HeroLeftSection` - Bagian kiri dengan WelcomeCard
  - `HeroContent` - Konten utama
  - `HeroBottomBar` - Bottom scrolling text
- **Fitur**:
  - Layout responsive dengan grid
  - Z-index management untuk layering
  - Overflow handling

### 3. `FloatingElements.tsx` (New)

- **Fungsi**: Menangani semua elemen dekoratif mengambang
- **Fitur**:
  - Karakter Batak mengambang (ᯀ, ᯅ, ᯎ, ᯔ)
  - Lingkaran dekoratif dengan animasi scale dan opacity
  - Timing animasi yang berbeda untuk setiap elemen
  - Pointer events disabled untuk tidak mengganggu interaksi

### 4. `HeroLeftSection.tsx` (New)

- **Fungsi**: Bagian kiri dengan WelcomeCard dan elemen dekoratif
- **Fitur**:
  - Multiple WelcomeCard dengan rotasi berbeda
  - Elemen dekoratif di sekitar card (lingkaran berputar, dot berkedip)
  - Animasi entrance dari kiri
  - Layout flex dengan gap

### 5. `HeroContent.tsx` (New)

- **Fungsi**: Konten utama hero section
- **Fitur**:
  - Judul dengan animasi bertahap
  - Deskripsi dengan garis dekoratif
  - Tombol CTA dengan efek hover
  - Background blur elements
  - Info cards dengan dot indicators

### 6. `HeroBottomBar.tsx` (New)

- **Fungsi**: Bottom scrolling text bar
- **Fitur**:
  - Carousel scrolling dengan teks Batak dan Indonesia
  - Backdrop blur effect
  - Animasi entrance dari bawah
  - Responsive container

### 7. `WelcomeCard.tsx`

- **Fungsi**: Card selamat datang dengan animasi
- **Props**:
  - `text1`, `text2` - Teks yang ditampilkan
  - `rotation` - Array rotasi untuk animasi
  - `delay` - Delay animasi
- **Fitur**:
  - Gradient background
  - 3D rotation animation
  - Customizable text content
  - Responsive design

### 8. `AnimatedBackground.tsx`

- **Fungsi**: Background animasi yang dapat digunakan kembali
- **Fitur**:
  - Gradient background dengan multiple layers
  - Floating blur circles
  - Grid dan dot patterns
  - Animated elements (stars, hearts, sparkles, bookmarks)
  - Emoji animations

### 9. `FeaturesSection.tsx`

- **Fungsi**: Menampilkan section fitur-fitur utama
- **Props**: `features` - Array dari objek fitur
- **Fitur**:
  - Grid layout untuk fitur
  - Hover animations
  - Icon dan deskripsi untuk setiap fitur

### 10. `PreviewsSection.tsx`

- **Fungsi**: Menampilkan preview video untuk setiap fitur
- **Props**: `features` - Array dari objek fitur dengan videoSrc
- **Fitur**:
  - Video player dengan play button
  - Alternating layout (left-right)
  - Background blobs dan floating elements
  - Video controls dan labels

### 11. `ProgressSection.tsx`

- **Fungsi**: Menampilkan statistik progress dan leaderboard
- **Fitur**:
  - Statistik harian card
  - Leaderboard global
  - Avatar customization
  - Progress bars dan XP tracking

### 12. `CallToActionSection.tsx`

- **Fungsi**: Section call-to-action terakhir
- **Fitur**:
  - Background animasi kompleks
  - Multiple animated blobs
  - Floating elements
  - Call-to-action button dan info badges

## Penggunaan

```tsx
import {
  HomepageHero,
  FeaturesSection,
  PreviewsSection,
  ProgressSection,
  CallToActionSection
} from './components';

// Dalam komponen utama
<HomepageHero />
<FeaturesSection features={features} />
<PreviewsSection features={features} />
<ProgressSection />
<CallToActionSection />
```

## Struktur Data

### Features Array

```tsx
const features = [
  {
    icon: <BookOpen size={32} />,
    title: 'Materi Terstruktur',
    description: '...',
    videoSrc: 'video-url.mp4',
  },
  // ... more features
];
```

### WelcomeCard Props

```tsx
interface WelcomeCardProps {
  text1: string;
  text2: string;
  rotation?: number[];
  delay?: number;
}
```

## Animasi dan Interaksi

### 1. **Framer Motion Integration**

- Semua komponen menggunakan Framer Motion untuk animasi
- Timing yang terkoordinasi untuk smooth user experience
- Hover effects dan micro-interactions

### 2. **Responsive Design**

- Mobile-first approach
- Breakpoint management dengan Tailwind CSS
- Flexible layouts yang adaptif

### 3. **Accessibility**

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

## Catatan Penting

- Semua komponen menggunakan TypeScript untuk type safety
- Background animasi dapat digunakan kembali di halaman lain
- Komponen mengikuti pola yang konsisten untuk maintainability
- Z-index management penting untuk layering yang benar
- Performance optimization dengan proper cleanup dan memoization

## Future Improvements

1. **Lazy Loading**: Implementasi lazy loading untuk komponen besar
2. **Error Boundaries**: Menambahkan error boundaries untuk setiap section
3. **Performance Monitoring**: Menambahkan performance monitoring
4. **A/B Testing**: Struktur yang memungkinkan A/B testing
5. **Internationalization**: Persiapan untuk multi-language support
