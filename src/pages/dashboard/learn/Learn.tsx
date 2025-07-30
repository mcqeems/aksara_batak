import { CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { slugify } from '@/lib/utils';

interface Lessons {
  id: number;
  title: string;
  description: string;
  icon_url: string;
}

interface ApiResponse<T> {
  data: T;
}

function Learn() {
  const [Lessons, setLessons] = useState<Lessons[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get<ApiResponse<Lessons[]>>('v1/lessons');
        setLessons(response.data.data);
      } catch (error) {
        console.log('Gagal mengambil data: ' + error);
      }
    };
    fetchLessons();
  }, []);

  return (
    <div className="w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Judul Halaman */}
        <div className="bg-sidebar-border motion-preset-expand rounded-2xl border p-6">
          <h1 className="font-sora text-primary text-center text-2xl font-bold md:text-3xl">
            Apa yang ingin anda pelajari hari ini?
          </h1>
        </div>
        <div className="my-5 grid grid-cols-2 gap-5">
          {Lessons.map((lesson) => (
            <Link
              to={`/learn/${slugify(lesson.title)}`}
              key={lesson.id}
              className="group relative block h-[300px] w-full overflow-hidden rounded-lg"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `url(/assets/lesson_icons/${lesson.icon_url})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/5 transition-all duration-300 group-hover:from-black/50 group-hover:to-black/20" />
              <div className="relative flex h-full flex-col items-center justify-end text-center">
                <CardTitle className="w-full transform py-2 text-white transition-transform duration-300 ease-in-out group-hover:-translate-y-15">
                  {lesson.title}
                </CardTitle>
                <div className="absolute -bottom-full px-4 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-4 group-hover:opacity-100">
                  <p className="text-primary text-sm">{lesson.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learn;
