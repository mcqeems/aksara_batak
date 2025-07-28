export interface PenjelasanSection {
  id: number;
  title: string;
  text: string;
  audio: string;
}

export const batakPenjelasanContent: PenjelasanSection[] = [
  {
    id: 1,
    title: 'Selamat Datang',
    text: `Selamat datang di penjelasan Aksara Batak.\nMari kita pelajari bersama struktur dan cara menulis aksara yang telah diwariskan turun-temurun ini.`,
    audio: '/assets/sounds/1.mp3',
  },
  {
    id: 2,
    title: 'Struktur Dasar Aksara Batak',
    text: `Aksara Batak terdiri dari 19 huruf dasar yang disebut "ina ni surat".\nSetiap huruf memiliki bentuk yang unik dan dapat dimodifikasi dengan tanda vokal.\nMari kita mulai dengan huruf-huruf dasar ini.`,
    audio: '/assets/sounds/2.mp3',
  },
  {
    id: 3,
    title: 'Huruf Vokal',
    text: `Aksara Batak memiliki 5 huruf vokal: a, e, i, o, u.\nHuruf vokal ini adalah fondasi dari sistem penulisan Batak.\nMereka dapat berdiri sendiri atau digabung dengan huruf konsonan.`,
    audio: '/assets/sounds/3.mp3',
  },
  {
    id: 4,
    title: 'Huruf Konsonan',
    text: `Huruf konsonan Batak terdiri dari 14 huruf: ba, ca, da, ga, ha, ja, ka, la, ma, na, nga, pa, ra, sa, ta, wa, ya.\nSetiap konsonan dapat digabung dengan vokal untuk membentuk suku kata.`,
    audio: '/assets/sounds/4.mp3',
  },
  {
    id: 5,
    title: 'Cara Menulis',
    text: `Aksara Batak ditulis dari kiri ke kanan tanpa spasi.\nSetiap huruf memiliki bentuk yang khas dan harus ditulis dengan urutan yang benar.\nMari kita pelajari cara menulis huruf demi huruf.`,
    audio: '/assets/sounds/5.mp3',
  },
  {
    id: 6,
    title: 'Tanda Vokal',
    text: `Tanda vokal atau "anak ni surat" digunakan untuk memodifikasi huruf konsonan.\nTanda ini ditambahkan di atas, bawah, atau samping huruf konsonan.\nIni membuat aksara Batak menjadi sistem yang fleksibel.`,
    audio: '/assets/sounds/6.mp3',
  },
  {
    id: 7,
    title: 'Praktik Menulis',
    text: `Sekarang saatnya untuk praktik.\nCoba tulis namamu dalam aksara Batak.\nAtau mulai dengan huruf-huruf sederhana terlebih dahulu.\nMari kita lestarikan warisan ini bersama.`,
    audio: '/assets/sounds/7.mp3',
  },
];
