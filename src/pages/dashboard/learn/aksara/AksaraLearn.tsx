import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// In a real application, this would likely come from an API
// and have a more defined structure.
interface LearnLevel {
  id: number;
  title: string;
  path: string;
  isCompleted: boolean;
}

const mockLevels: LearnLevel[] = [
  {
    id: 1,
    title: 'Belajar Huruf Vokal Aksara Batak',
    path: '/learn/aksara/vokal',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Belajar Huruf Konsonan Aksara Batak',
    path: '/learn/aksara/konsonan',
    isCompleted: false,
  },
];

function AksaraLearn() {
  // The state can be initialized with mock data or fetched from an API.
  const [levels] = useState<LearnLevel[]>(mockLevels);

  return (
    <div className="w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Judul Halaman */}
        <div className="bg-sidebar-border rounded-2xl border p-6">
          <h1 className="font-sora text-primary text-center text-2xl font-bold md:text-3xl">
            Pilih level
          </h1>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          {levels.map((level) => (
            <Link to={level.path} key={level.id}>
              <Card className="hover:shadow-primary p-4 transition ease-linear hover:opacity-85">
                <CardContent className="p-0">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-start gap-4">
                      <p className="font-bold">{level.id}.</p>
                      <p>{level.title}</p>
                    </div>
                    {level.isCompleted && (
                      <Check className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AksaraLearn;
