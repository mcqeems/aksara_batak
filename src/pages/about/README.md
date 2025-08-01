# About Page Structure

## Struktur File

```
src/pages/about/
├── About.tsx                        # File utama
├── README.md                        # Dokumentasi ini
└── components/
    ├── index.ts                     # Barrel file untuk export
    ├── AboutHero.tsx                # Hero section dengan background
    ├── AnimatedBackground.tsx       # Background animasi reusable
    ├── VisionMissionSection.tsx     # Section visi & misi
    ├── StoryTargetSection.tsx       # Section story & target zigzag
    ├── ImpactSection.tsx            # Section statistik dampak
    ├── TestimonialSection.tsx       # Section testimonial carousel
    ├── CallToActionSection.tsx      # Section call-to-action
    ├── ExpertCard.tsx               # Card untuk individual expert
    └── ExpertsSection.tsx           # Section tim experts
```

### Komponen Utama

- **`About.tsx`** - File utama yang mengimpor dan menggunakan semua komponen

### Komponen yang Dipisah

#### 1. `AboutHero.tsx`

- **Fungsi**: Hero section dengan background animasi dan konten utama
- **Fitur**:
  - Background animasi dengan floating elements
  - Typing effect untuk judul "About PodaHoras"
  - Responsive design

#### 2. `AnimatedBackground.tsx`

- **Fungsi**: Background animasi yang dapat digunakan kembali
- **Fitur**:
  - Gradient backgrounds
  - Floating elements
  - Grid patterns
  - Animated icons (BookOpen, Heart, Users, Lightbulb, Star)

#### 3. `VisionMissionSection.tsx`

- **Fungsi**: Section untuk visi dan misi perusahaan
- **Fitur**:
  - Cards untuk visi dan misi
  - Animasi hover
  - Background blobs
  - Icon animations

#### 4. `StoryTargetSection.tsx`

- **Fungsi**: Section untuk story dan target dengan layout zigzag
- **Fitur**:
  - Layout zigzag (kiri-kanan)
  - Image dengan hover effects
  - Sidebar titles
  - Floating elements

#### 5. `ImpactSection.tsx`

- **Fungsi**: Section untuk menampilkan statistik dampak
- **Fitur**:
  - 3 cards statistik (1000+ Pengguna, 50+ Materi, 100% Dedikasi)
  - Background texture
  - Animated counters
  - Icon animations

#### 6. `TestimonialSection.tsx`

- **Fungsi**: Section untuk testimonial dengan carousel
- **Fitur**:
  - Auto-rotating carousel
  - Manual navigation
  - Smooth transitions
  - TestimonialCard component

#### 7. `CallToActionSection.tsx`

- **Fungsi**: Section call-to-action dengan background animasi
- **Fitur**:
  - CTA button "Mulai Belajar Gratis"
  - Background textures
  - Floating elements
  - Info badges

#### 8. `ExpertCard.tsx`

- **Fungsi**: Card untuk menampilkan informasi expert/team member
- **Props**: `name`, `role`, `motto`, `photoSrc`, social links
- **Fitur**:
  - Photo dengan gradient overlay
  - Social media links (Instagram, GitHub, LinkedIn)
  - Hover animations
  - Floating elements

#### 9. `ExpertsSection.tsx`

- **Fungsi**: Section untuk menampilkan tim experts
- **Fitur**:
  - Grid layout
  - Background texture
  - Multiple ExpertCard instances
  - Team overview

### File Index

- **`index.ts`** - Barrel file untuk export semua komponen

## Penggunaan

```tsx
import {
  AboutHero,
  VisionMissionSection,
  StoryTargetSection,
  ImpactSection,
  TestimonialSection,
  CallToActionSection,
  ExpertsSection,
} from './components';

// Dalam komponen utama
<AboutHero />
<VisionMissionSection />
<StoryTargetSection />
<ImpactSection />
<TestimonialSection />
<CallToActionSection />
<ExpertsSection />
```

## Struktur Data

### Expert Card Props

```tsx
interface ExpertCardProps {
  name: string;
  role: string;
  motto: string;
  photoSrc: string;
  instagramLink?: string;
  githubLink?: string;
  linkedinLink?: string;
  instagramUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
}
```

### Testimonial Data

```tsx
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}
```

## Catatan Penting

- Semua komponen menggunakan Framer Motion untuk animasi
- Background animasi dapat digunakan kembali di halaman lain
- Zigzag layout memberikan visual appeal yang unik
- Carousel testimonial dengan auto-rotation
- Props interface didefinisikan dengan TypeScript untuk type safety
- Expert cards dengan social media integration
