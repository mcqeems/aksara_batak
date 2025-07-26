import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
        <div className="bg-sidebar-border rounded-2xl border p-6">
          <h1 className="font-sora text-primary text-center text-2xl font-bold md:text-3xl">
            Apa yang ingin anda pelajari hari ini?
          </h1>
        </div>
        <div className="my-5 grid grid-cols-2 gap-5">
          {Lessons.map((lesson) => (
            <Link to={`/learn/${slugify(lesson.title)}`} key={lesson.id}>
              <Card className="hover:shadow-primary p-5 transition ease-linear hover:opacity-85">
                <CardContent>
                  <img
                    className="h-full max-h-[300px] w-full max-w-[300px] self-center justify-self-center rounded-3xl"
                    src={'/assets/lesson_icons/' + lesson.icon_url}
                    alt={lesson.title}
                  />
                </CardContent>
                <CardTitle className="text-center">{lesson.title}</CardTitle>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learn;