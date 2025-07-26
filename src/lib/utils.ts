import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '') // Hapus karakter yang tidak valid
    .replace(/\-\-+/g, '-') // Ganti beberapa - dengan satu -
    .replace(/^-+/, '') // Pangkas - dari awal teks
    .replace(/-+$/, ''); // Pangkas - dari akhir teks
}
