export interface NarrationSection {
  id: number;
  title: string;
  text: string;
  audio: string;
}

export const batakNarrationContent: NarrationSection[] = [
  {
    id: 1,
    title: 'Selamat Datang',
    text: `Selamat datang di perjalanan mempelajari salah satu warisan budaya tertua Nusantara: Aksara Batak.\nYuk, kita telusuri bersama bagaimana aksara ini lahir, tumbuh, dan bertahan hingga kini.`,
    audio: '/assets/sounds/1.mp3',
  },
  {
    id: 2,
    title: 'Asal Usul dan Penyebaran',
    text: `Aksara Batak berasal dari rumpun aksara India kuno.\nMelalui jalur budaya, aksara ini berkembang dari aksara Pallava dan Kawi, lalu menyebar ke wilayah Angkola–Mandailing.\nDari sana, menyebar ke Toba, Simalungun, Pakpak–Dairi, hingga Karo.`,
    audio: '/assets/sounds/2.mp3',
  },
  {
    id: 3,
    title: 'Media Tulis Tradisional',
    text: `Orang Batak dulu menulis aksara ini di atas bambu, tulang, dan kulit kayu yang disebut laklak.\nMereka menggunakan pisau atau logam untuk mengukir, lalu menghitamkannya dengan jelaga.\nHasilnya? Naskah-naskah ritual seperti pustaha, yang panjangnya bisa mencapai belasan meter.`,
    audio: '/assets/sounds/3.mp3',
  },
  {
    id: 4,
    title: 'Struktur Aksara Batak',
    text: `Aksara Batak terdiri dari 19 huruf dasar yang disebut ina ni surat.\nSetiap huruf dapat dimodifikasi dengan tanda vokal, atau anak ni surat.\nUniknya, tulisan ini ditulis dari kiri ke kanan… tanpa spasi!`,
    audio: '/assets/sounds/4.mp3',
  },
  {
    id: 5,
    title: 'Kemunduran Aksara',
    text: `Seiring masuknya kolonialisme dan pendidikan modern, penggunaan aksara Batak mulai tergeser.\nBanyak naskah dihancurkan, bahkan dilarang.\nAksara yang dulu hidup di setiap desa… nyaris punah.`,
    audio: '/assets/sounds/5.mp3',
  },
  {
    id: 6,
    title: 'Upaya Pelestarian',
    text: `Tapi harapan belum padam.\nAksara Batak mulai diajarkan kembali di sekolah-sekolah lokal.\nDi era digital ini, aksara kuno pun bangkit… dalam bentuk baru—di layar seperti yang kamu lihat sekarang.`,
    audio: '/assets/sounds/6.mp3',
  },
  {
    id: 7,
    title: 'Ayo Ikut Melestarikan',
    text: `Sekarang giliranmu.\nMari kita lestarikan warisan ini bersama.\nCoba tulis namamu dalam aksara Batak.\nJelajahi artikel kami, atau daftar dan mulai belajar hari ini.`,
    audio: '/assets/sounds/7.mp3',
  },
];
