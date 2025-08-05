export interface PenjelasanSection {
  id: number;
  title: string;
  text: string;
  audio: string;
}

export const batakPenjelasanContent: PenjelasanSection[] = [
  {
    id: 1,
    title: 'Bentuk Budaya',
    text: `Aksara Batak, atau Surat Batak, adalah sistem tulisan yang mencerminkan identitas budaya masyarakat Batak di Sumatera Utara. Lebih dari sekadar alat komunikasi, bentuk visual aksara ini kaya akan detail dan variasi. Aksara ini digunakan untuk berbagai naskah penting, seperti keagamaan dan hukum adat, yang sering ditulis pada pustaha dari kulit kayu atau bambu. Memahami evolusi bentuk hurufnya adalah kunci untuk mengapresiasi kekayaan budaya ini.`,
    audio: '/assets/sounds/aksara/1.mp3',
  },
  {
    id: 2,
    title: 'Asal Bentuk',
    text: `Secara keilmuan, Aksara Batak merupakan turunan dari aksara Brahmi India, yang masuk ke Nusantara melalui perantara aksara Kawi. Silsilah ini menunjukkan bahwa bentuk dasar huruf Batak memiliki akar kuno yang sama dengan aksara Nusantara lainnya. Namun, evolusi bentuk hurufnya di Batak tidak dapat dirunut secara pasti karena tantangan paleografi yang unik.`,
    audio: '/assets/sounds/aksara/2.mp3',
  },
  {
    id: 3,
    title: 'Kendala Historis',
    text: `Studi paleografi Aksara Batak menghadapi kendala karena naskah yang ditemukan umumnya tidak berumur lebih dari 200 tahun. Tidak ada prasasti batu atau peninggalan tua yang secara definitif disetujui sebagai purwarupa langsung Aksara Batak. Ini disebabkan media penulisan tradisional yang rentan rusak di iklim tropis, seperti bambu, kulit kayu (laklak), dan lontar. Ketiadaan bukti arkeologis yang tahan lama ini membatasi penelusuran bentuk huruf kuno.`,
    audio: '/assets/sounds/aksara/3.mp3',
  },
  {
    id: 4,
    title: 'Varian Regional',
    text: `Meskipun demikian, Aksara Batak telah terdiversifikasi menjadi lima varian utama: Karo, Toba, Pakpak-Dairi, Simalungun, dan Angkola-Mandailing. Setiap varian ini memiliki karakteristik visual huruf dasar (ina ni surat) yang unik. Perbedaan ini bukan hanya minor, melainkan melibatkan perubahan tarikan garis, sudut, dan proporsi yang mencolok, memberikan identitas visual khas pada setiap varian.`,
    audio: '/assets/sounds/aksara/4.mp3',
  },
  {
    id: 5,
    title: 'Anatomi Huruf',
    text: `Aksara Batak diklasifikasikan sebagai abugida, di mana setiap karakter dasar (ina ni surat) merepresentasikan satu suku kata dengan vokal inheren /a/. Terdapat 19 ina ni surat inti yang menjadi dasar semua varian. Bentuk hurufnya cenderung dinamis, membulat atau elips, dengan berbagai sudut kelengkungan. Goresan aksara relatif tebal dan konstan, didominasi garis horizontal.`,
    audio: '/assets/sounds/aksara/5.mp3',
  },
  {
    id: 6,
    title: 'Variasi Ina',
    text: `Perbedaan bentuk huruf dasar (ina ni surat) antar varian sangat terlihat. Misalnya, huruf 'A' (ᯀ/ᯁ) pada Karo, Pakpak, dan Toba lebih sederhana, sementara Simalungun lebih ornamen. Huruf 'Ha' (ᯂ/ᯃ/ᯄ) menunjukkan variasi substansial, dengan Mandailing memiliki bentuk khas. Kemiripan bentuk 'Na' (ᯉ/ᯊ) Mandailing dengan aksara Jawa Kuna mengindikasikan Mandailing sebagai pusat pengembangan aksara tertua, mempertahankan bentuk arkaik.`,
    audio: '/assets/sounds/aksara/6.mp3',
  },
  {
    id: 7,
    title: 'Variasi Anak',
    text: `Selain huruf dasar, tanda diakritik (anak ni surat) juga menunjukkan variasi bentuk dan nama yang signifikan antar varian. Diakritik ini mengubah bunyi vokal inheren atau menambahkan konsonan akhir. Contohnya, diakritik -i memiliki bentuk berbeda di Karo, Mandailing, Pakpak, Simalungun, dan Toba, dengan nama seperti 'kelawan' atau 'uluwa'.`,
    audio: '/assets/sounds/aksara/7.mp3',
  },
  {
    id: 8,
    title: 'Aturan Penulisan',
    text: `Aturan penulisan diakritik juga memengaruhi bentuk visual. Untuk suku kata tertutup, diakritik vokal sering diposisikan ulang, melekat pada karakter dasar kedua dan penanda konsonan akhir (pangolat). Beberapa diakritik, terutama -u, dapat membentuk ligatur (gabungan bentuk) dengan aksara dasar, menghasilkan satu kesatuan visual yang unik, bukan sekadar penambahan tanda. `,
    audio: '/assets/sounds/aksara/8.mp3',
  },
  {
    id: 9,
    title: 'Pengaruh Media',
    text: `Salah satu faktor paling signifikan yang memengaruhi bentuk Aksara Batak adalah media dan alat tulis. Penulisan pada kulit kayu (laklak) dengan pena tinta menghasilkan aksara yang cenderung lebih tebal dan lentur. Sebaliknya, ukiran pada bambu dengan pisau ukir menghasilkan aksara yang lebih ramping dan kaku, karena kesulitan menoreh pada permukaan melingkar.`,
    audio: '/assets/sounds/aksara/9.mp3',
  },
  {
    id: 10,
    title: 'Gaya Individu',
    text: `Di luar faktor material, gaya penulisan masing-masing individu juga berperan penting dalam variasi bentuk aksara. Setiap penulis memiliki ciri khas dan gaya tersendiri dalam menuliskan aksaranya, meskipun tetap dalam pakem umum. Perbedaan gaya ini menciptakan nuansa visual yang unik pada setiap manuskrip, mencerminkan kepribadian penulis.`,
    audio: '/assets/sounds/aksara/10.mp3',
  },
  {
    id: 11,
    title: 'Pengaruh Linguistik',
    text: `Adaptasi terhadap kebutuhan fonologis dan linguistik dialek-dialek Batak yang berbeda juga memengaruhi bentuk aksara. Keberadaan varian diakritik dengan nama dan bentuk yang berbeda di setiap wilayah mencerminkan upaya untuk secara akurat menangkap nuansa fonemik dalam bahasa Batak setempat, seperti pembedaan bunyi /e/ keras dan /e/ pepet.`,
    audio: '/assets/sounds/aksara/11.mp3',
  },
  {
    id: 12,
    title: 'Pelestarian Modern',
    text: `Meskipun menghadapi tantangan dari modernisasi dan dominasi aksara Latin, upaya pelestarian Aksara Batak terus dilakukan. Aksara ini telah ditambahkan ke standar Unicode, memungkinkan representasi digital dan adaptasi ke huruf Latin. Ini membantu menjaga agar bentuk-bentuk aksara tradisional tetap dikenal dan dapat diakses di era modern, meskipun penggunaannya dalam kehidupan sehari-hari terbatas.`,
    audio: '/assets/sounds/aksara/12.mp3',
  },
  {
    id: 13,
    title: 'Akhir Perjalanan',
    text: `Sekarang Anda telah memahami perkembangan dan karakteristik Aksara Batak. Mari kita lanjutkan untuk mempelajari lebih dalam tentang cara menulis dan menggunakan aksara ini dalam kehidupan sehari-hari.`,
    audio: '/assets/sounds/aksara/13.mp3',
  },
];
