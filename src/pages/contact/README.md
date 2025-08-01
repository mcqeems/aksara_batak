# Contact Page Structure

## Struktur File

```
src/pages/contact/
├── Contact.tsx                      # File utama
├── README.md                        # Dokumentasi ini
├── hooks/
│   └── useContact.ts                # Custom hook untuk form logic
└── components/
    ├── index.ts                     # Barrel file untuk export
    ├── ContactHeader.tsx            # Header section dengan animasi
    ├── ContactForm.tsx              # Form input dan submit button
    ├── TeamCard.tsx                 # Card untuk individual developer
    ├── TeamOverviewCard.tsx         # Card untuk team overview
    └── AnimatedBackground.tsx       # Background animasi reusable
```

### Komponen Utama

- **`Contact.tsx`** - File utama yang mengimpor dan menggunakan semua komponen

### Komponen yang Dipisah

#### 1. `ContactHeader.tsx`

- **Fungsi**: Menampilkan header section dengan animasi
- **Fitur**:
  - Judul dan deskripsi halaman contact
  - Animated message icon
  - Responsive design

#### 2. `ContactForm.tsx`

- **Fungsi**: Form input dan submit button
- **Props**: `formData`, `onFormChange`, `onSubmit`
- **Fitur**:
  - Input fields untuk nama, email, subject, message
  - Submit button dengan loading state
  - Form validation

#### 3. `TeamCard.tsx`

- **Fungsi**: Card untuk menampilkan informasi individual developer
- **Props**: `title`, `subtitle`, `username`, `email`, `phone`, `position`, `delay`
- **Fitur**:
  - Position-based layout (top-left, top-right, bottom-right)
  - Social media links
  - Hover animations
  - Staggered animations dengan delay

#### 4. `TeamOverviewCard.tsx`

- **Fungsi**: Card untuk menampilkan overview tim
- **Fitur**:
  - Team avatars
  - GitHub links
  - Project description

#### 5. `AnimatedBackground.tsx`

- **Fungsi**: Background animasi yang dapat digunakan kembali
- **Fitur**:
  - Gradient backgrounds
  - Floating elements
  - Grid patterns
  - Animated icons

### Custom Hook

- **`useContact.ts`** - Hook untuk mengelola state form dan submission logic

### File Index

- **`index.ts`** - Barrel file untuk export semua komponen

## Penggunaan

```tsx
import { useContact } from './hooks/useContact';
import {
  ContactHeader,
  ContactForm,
  TeamCard,
  TeamOverviewCard,
} from './components';

// Dalam komponen utama
const { formData, handleChange, handleSubmit } = useContact();

<ContactHeader />
<ContactForm
  formData={formData}
  onFormChange={handleChange}
  onSubmit={handleSubmit}
/>
<TeamCard
  title="Fullstack Developer"
  subtitle="Mustaqim Nawahhudi Ma'arif"
  username="mcqeems"
  email="mcqeemsofficial@gmail.com"
  phone="+62 881-1558-295"
  position="top-left"
  delay={0.3}
/>
```

## Struktur Data

### Team Card Props

```tsx
interface TeamCardProps {
  title: string;
  subtitle: string;
  username: string;
  email: string;
  phone: string;
  position: 'top-left' | 'top-right' | 'bottom-right';
  delay: number;
}
```

### Form Data

```tsx
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

## Catatan Penting

- Semua komponen menggunakan Framer Motion untuk animasi
- Background animasi dapat digunakan kembali di halaman lain
- Form state dikelola dengan custom hook untuk separation of concerns
- Team cards menggunakan position-based layout untuk visual appeal
- Props interface didefinisikan dengan TypeScript untuk type safety
