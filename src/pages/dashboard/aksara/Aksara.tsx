import { Button } from '@/components/ui/button';
import useSound from 'use-sound';

// Komponen Tombol Terpisah untuk memanggil hook dengan benar
const AksaraButton = ({
  huruf,
  latin,
  audio,
}: {
  huruf: string;
  latin: string;
  audio: string;
}) => {
  // Panggil useSound di level atas komponen
  const [play] = useSound(`/assets/audio/${audio}`);

  return (
    <Button
      variant="secondary"
      className="flex h-28 flex-col items-center justify-center gap-2"
      onClick={() => play()}
    >
      <span className="font-batak text-5xl font-normal">{huruf}</span>
      <span className="text-foreground/70 text-sm">{latin}</span>
    </Button>
  );
};

function Aksara() {
  // Data aksara (tidak ada perubahan di sini)
  const aksaraVokal = [
    { huruf: 'ᯀ', latin: 'a', audio: 'a.mp3' },
    { huruf: 'ᯁ', latin: 'i', audio: 'i.mp3' },
    { huruf: 'ᯂ', latin: 'u', audio: 'u.mp3' },
    { huruf: 'ᯃ', latin: 'e', audio: 'e.mp3' },
    { huruf: 'ᯄ', latin: 'o', audio: 'o.mp3' },
  ];

  const aksaraKonsonan = [
    {
      base: 'h',
      variations: [
        { huruf: 'ᯂ', latin: 'ha', audio: 'ha.mp3' },
        { huruf: 'ᯂ᯦', latin: 'hi', audio: 'hi.mp3' },
        { huruf: 'ᯂᯧ', latin: 'hu', audio: 'hu.mp3' },
        { huruf: 'ᯂᯨ', latin: 'he', audio: 'he.mp3' },
        { huruf: 'ᯂᯩ', latin: 'ho', audio: 'ho.mp3' },
      ],
    },
    {
      base: 'b',
      variations: [
        { huruf: 'ᯅ', latin: 'ba', audio: 'ba.mp3' },
        { huruf: 'ᯅ᯦', latin: 'bi', audio: 'bi.mp3' },
        { huruf: 'ᯅᯧ', latin: 'bu', audio: 'bu.mp3' },
        { huruf: 'ᯅᯨ', latin: 'be', audio: 'be.mp3' },
        { huruf: 'ᯅᯩ', latin: 'bo', audio: 'bo.mp3' },
      ],
    },
    {
      base: 'k',
      variations: [
        { huruf: 'ᯆ', latin: 'ka', audio: 'ka.mp3' },
        { huruf: 'ᯆ᯦', latin: 'ki', audio: 'ki.mp3' },
        { huruf: 'ᯆᯧ', latin: 'ku', audio: 'ku.mp3' },
        { huruf: 'ᯆᯨ', latin: 'ke', audio: 'ke.mp3' },
        { huruf: 'ᯆᯩ', latin: 'ko', audio: 'ko.mp3' },
      ],
    },
    {
      base: 'd',
      variations: [
        { huruf: 'ᯇ', latin: 'da', audio: 'da.mp3' },
        { huruf: 'ᯇ᯦', latin: 'di', audio: 'di.mp3' },
        { huruf: 'ᯇᯧ', latin: 'du', audio: 'du.mp3' },
        { huruf: 'ᯇᯨ', latin: 'de', audio: 'de.mp3' },
        { huruf: 'ᯇᯩ', latin: 'do', audio: 'do.mp3' },
      ],
    },
    {
      base: 'g',
      variations: [
        { huruf: 'ᯈ', latin: 'ga', audio: 'ga.mp3' },
        { huruf: 'ᯈ᯦', latin: 'gi', audio: 'gi.mp3' },
        { huruf: 'ᯈᯧ', latin: 'gu', audio: 'gu.mp3' },
        { huruf: 'ᯈᯨ', latin: 'ge', audio: 'ge.mp3' },
        { huruf: 'ᯈᯩ', latin: 'go', audio: 'go.mp3' },
      ],
    },
    {
      base: 'j',
      variations: [
        { huruf: 'ᯉ', latin: 'ja', audio: 'ja.mp3' },
        { huruf: 'ᯉ᯦', latin: 'ji', audio: 'ji.mp3' },
        { huruf: 'ᯉᯧ', latin: 'ju', audio: 'ju.mp3' },
        { huruf: 'ᯉᯨ', latin: 'je', audio: 'je.mp3' },
        { huruf: 'ᯉᯩ', latin: 'jo', audio: 'jo.mp3' },
      ],
    },
    {
      base: 'l',
      variations: [
        { huruf: 'ᯊ', latin: 'la', audio: 'la.mp3' },
        { huruf: 'ᯊ᯦', latin: 'li', audio: 'li.mp3' },
        { huruf: 'ᯊᯧ', latin: 'lu', audio: 'lu.mp3' },
        { huruf: 'ᯊᯨ', latin: 'le', audio: 'le.mp3' },
        { huruf: 'ᯊᯩ', latin: 'lo', audio: 'lo.mp3' },
      ],
    },
    {
      base: 'm',
      variations: [
        { huruf: 'ᯋ', latin: 'ma', audio: 'ma.mp3' },
        { huruf: 'ᯋ᯦', latin: 'mi', audio: 'mi.mp3' },
        { huruf: 'ᯋᯧ', latin: 'mu', audio: 'mu.mp3' },
        { huruf: 'ᯋᯨ', latin: 'me', audio: 'me.mp3' },
        { huruf: 'ᯋᯩ', latin: 'mo', audio: 'mo.mp3' },
      ],
    },
    {
      base: 'n',
      variations: [
        { huruf: 'ᯌ', latin: 'na', audio: 'na.mp3' },
        { huruf: 'ᯌ᯦', latin: 'ni', audio: 'ni.mp3' },
        { huruf: 'ᯌᯧ', latin: 'nu', audio: 'nu.mp3' },
        { huruf: 'ᯌᯨ', latin: 'ne', audio: 'ne.mp3' },
        { huruf: 'ᯌᯩ', latin: 'no', audio: 'no.mp3' },
      ],
    },
    {
      base: 'ng',
      variations: [
        { huruf: 'ᯍ', latin: 'nga', audio: 'nga.mp3' },
        { huruf: 'ᯍ᯦', latin: 'ngi', audio: 'ngi.mp3' },
        { huruf: 'ᯍᯧ', latin: 'ngu', audio: 'ngu.mp3' },
        { huruf: 'ᯍᯨ', latin: 'nge', audio: 'nge.mp3' },
        { huruf: 'ᯍᯩ', latin: 'ngo', audio: 'ngo.mp3' },
      ],
    },
    {
      base: 'p',
      variations: [
        { huruf: 'ᯎ', latin: 'pa', audio: 'pa.mp3' },
        { huruf: 'ᯎ᯦', latin: 'pi', audio: 'pi.mp3' },
        { huruf: 'ᯎᯧ', latin: 'pu', audio: 'pu.mp3' },
        { huruf: 'ᯎᯨ', latin: 'pe', audio: 'pe.mp3' },
        { huruf: 'ᯎᯩ', latin: 'po', audio: 'po.mp3' },
      ],
    },
    {
      base: 'r',
      variations: [
        { huruf: 'ᯏ', latin: 'ra', audio: 'ra.mp3' },
        { huruf: 'ᯏ᯦', latin: 'ri', audio: 'ri.mp3' },
        { huruf: 'ᯏᯧ', latin: 'ru', audio: 'ru.mp3' },
        { huruf: 'ᯏᯨ', latin: 're', audio: 're.mp3' },
        { huruf: 'ᯏᯩ', latin: 'ro', audio: 'ro.mp3' },
      ],
    },
    {
      base: 's',
      variations: [
        { huruf: 'ᯐ', latin: 'sa', audio: 'sa.mp3' },
        { huruf: 'ᯐ᯦', latin: 'si', audio: 'si.mp3' },
        { huruf: 'ᯐᯧ', latin: 'su', audio: 'su.mp3' },
        { huruf: 'ᯐᯨ', latin: 'se', audio: 'se.mp3' },
        { huruf: 'ᯐᯩ', latin: 'so', audio: 'so.mp3' },
      ],
    },
    {
      base: 't',
      variations: [
        { huruf: 'ᯑ', latin: 'ta', audio: 'ta.mp3' },
        { huruf: 'ᯑ᯦', latin: 'ti', audio: 'ti.mp3' },
        { huruf: 'ᯑᯧ', latin: 'tu', audio: 'tu.mp3' },
        { huruf: 'ᯑᯨ', latin: 'te', audio: 'te.mp3' },
        { huruf: 'ᯑᯩ', latin: 'to', audio: 'to.mp3' },
      ],
    },
    {
      base: 'w',
      variations: [
        { huruf: 'ᯒ', latin: 'wa', audio: 'wa.mp3' },
        { huruf: 'ᯒ᯦', latin: 'wi', audio: 'wi.mp3' },
        { huruf: 'ᯒᯧ', latin: 'wu', audio: 'wu.mp3' },
        { huruf: 'ᯒᯨ', latin: 'we', audio: 'we.mp3' },
        { huruf: 'ᯒᯩ', latin: 'wo', audio: 'wo.mp3' },
      ],
    },
    {
      base: 'y',
      variations: [
        { huruf: 'ᯓ', latin: 'ya', audio: 'ya.mp3' },
        { huruf: 'ᯓ᯦', latin: 'yi', audio: 'yi.mp3' },
        { huruf: 'ᯓᯧ', latin: 'yu', audio: 'yu.mp3' },
        { huruf: 'ᯓᯨ', latin: 'ye', audio: 'ye.mp3' },
        { huruf: 'ᯓᯩ', latin: 'yo', audio: 'yo.mp3' },
      ],
    },
  ];

  // Fungsi render (tidak ada perubahan)
  // --- FUNGSI RENDER SECTION DIUBAH DI SINI ---
  const renderSection = (
    title: string,
    data: { huruf: string; latin: string; audio: string }[]
  ) => (
    <div className="mt-8">
      <div className="flex items-center">
        <div className="border-border intersect:motion-preset-expand intersect-once flex-grow border-t"></div>
        <h2 className="font-sora text-foreground/80 intersect:motion-preset-expand intersect-once mx-4 shrink-0 text-center text-2xl font-bold">
          {title}
        </h2>
        <div className="border-border intersect:motion-preset-expand intersect-once flex-grow border-t"></div>
      </div>
      <div className="intersect:motion-preset-expand intersect-once mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => (
          <AksaraButton key={item.latin} {...item} />
        ))}
      </div>
    </div>
  );
  // --- AKHIR PERUBAHAN ---

  return (
    <div className="w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="bg-sidebar-border motion-preset-expand rounded-2xl border p-6">
          <h1 className="font-sora text-primary text-center text-3xl font-bold">
            Aksara Batak
          </h1>
        </div>
        <div className="mt-6">
          {renderSection('Vokal', aksaraVokal)}
          {renderSection(
            'Konsonan + A',
            aksaraKonsonan.map((k) => k.variations[0])
          )}
          {renderSection(
            'Konsonan + I',
            aksaraKonsonan.map((k) => k.variations[1])
          )}
          {renderSection(
            'Konsonan + U',
            aksaraKonsonan.map((k) => k.variations[2])
          )}
          {renderSection(
            'Konsonan + E',
            aksaraKonsonan.map((k) => k.variations[3])
          )}
          {renderSection(
            'Konsonan + O',
            aksaraKonsonan.map((k) => k.variations[4])
          )}
        </div>
      </div>
    </div>
  );
}

export default Aksara;
