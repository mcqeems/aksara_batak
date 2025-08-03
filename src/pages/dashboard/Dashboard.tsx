import Loader from '@/components/ui/loader';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { Flame, Trophy, Star, Medal } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { slugify } from '@/lib/utils'; // Pastikan utilitas slugify diimpor

// Interface untuk data profil pengguna
interface UserProfileData {
  name: string;
  total_xp: number;
  current_streak: number;
}

// Interface untuk data riwayat pengerjaan, tambahkan completed_at
interface AttemptsData {
  quiz_title: string;
  completed_at: string; // Diperlukan untuk pengurutan
}

// Interface untuk data leaderboard
interface LeaderboardData {
  rank: number;
  name: string;
}

// Interface untuk data pelajaran (dari v1/lessons)
interface LessonData {
  id: number;
  title: string;
  description: string;
  icon_url: string;
}

// Interface generik untuk respons API
interface ApiResponse<T> {
  data: T;
}

function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfileData>();
  const [userRank, setUserRank] = useState<LeaderboardData>();
  const [lastActivityLessons, setLastActivityLessons] = useState<LessonData[]>(
    []
  ); // State baru untuk aktivitas terakhir
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Menggunakan Promise.all untuk fetch semua data secara paralel
        const [
          profileResponse,
          leaderboardResponse,
          attemptsResponse,
          lessonsResponse,
        ] = await Promise.all([
          api.get<ApiResponse<UserProfileData>>('v1/users/profile'),
          api.get<ApiResponse<LeaderboardData[]>>('v1/leaderboard'),
          api.get<ApiResponse<AttemptsData[]>>('v1/users/profile/attempts'),
          api.get<ApiResponse<LessonData[]>>('v1/lessons'), // Fetch data pelajaran
        ]);

        const userProfileData = profileResponse.data.data;
        const leaderboardData = leaderboardResponse.data.data;
        const attemptsData = attemptsResponse.data.data;
        const allLessonsData = lessonsResponse.data.data;

        // Set state untuk profil dan leaderboard
        setUserProfile(userProfileData);
        if (userProfileData && leaderboardData) {
          const currentUserRankData = leaderboardData.find(
            (entry) => entry.name === userProfileData.name
          );
          setUserRank(currentUserRankData);
        }

        // --- LOGIKA UTAMA UNTUK AKTIVITAS TERAKHIR ---
        if (attemptsData && allLessonsData) {
          // 1. Urutkan attempts berdasarkan tanggal selesai (terbaru lebih dulu)
          const sortedAttempts = [...attemptsData].sort(
            (a, b) =>
              new Date(b.completed_at).getTime() -
              new Date(a.completed_at).getTime()
          );

          // 2. Buat peta untuk memastikan setiap pelajaran hanya muncul sekali
          const uniqueLessonsMap = new Map<string, LessonData>();

          for (const attempt of sortedAttempts) {
            let lessonTitleKey: string | null = null;

            if (attempt.quiz_title.includes('Aksara')) {
              lessonTitleKey = 'Aksara Batak';
            } else if (attempt.quiz_title.includes('Toba')) {
              lessonTitleKey = 'Bahasa Batak Toba';
            }

            // Jika kunci ditemukan dan belum ada di peta, tambahkan
            if (lessonTitleKey && !uniqueLessonsMap.has(lessonTitleKey)) {
              const lessonDetail = allLessonsData.find(
                (l) => l.title === lessonTitleKey
              );
              if (lessonDetail) {
                uniqueLessonsMap.set(lessonTitleKey, lessonDetail);
              }
            }
          }

          // 3. Set state dengan hasil yang sudah unik dan terurut
          setLastActivityLessons(Array.from(uniqueLessonsMap.values()));
        }
      } catch (error) {
        console.log('Gagal mengambil data dasbor: ' + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Medal className="h-8 w-8 text-amber-600" />;
      default:
        return <Star className="text-primary h-8 w-8" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const streak = userProfile?.current_streak ?? 0;
  const streakDays = Array.from({ length: 7 }, (_, index) => ({
    completed: index < streak,
  }));

  return (
    <div className="h-full w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* ... (Kode untuk Sambutan dan Streak Card tetap sama) ... */}
        <div className="md:py-6">
          <h1 className="font-sora text-primary motion-preset-expand mb-2 text-center text-2xl font-bold md:text-left md:text-3xl">
            Selamat Datang {userProfile?.name}!
          </h1>
        </div>
        <Card
          className={`border-primary motion-preset-expand w-full border-2 bg-gradient-to-br ${userProfile?.current_streak != 0 ? 'from-amber-900 to-stone-900' : 'from-stone-600 to-stone-900'} mb-4 text-white`}
        >
          <CardContent className="px-4 md:px-6">
            <div className="mb-4 flex items-center justify-between md:mb-10">
              <div>
                {userProfile?.current_streak != 0 ? (
                  <>
                    <h2 className="mb-2 text-xl font-bold text-amber-400 md:text-3xl">
                      {userProfile?.current_streak} Hari Beruntun
                    </h2>
                    <p className="text-md text-gray-300 md:text-lg">
                      Kerjakan pelajaran hari ini untuk memperpanjang streakmu!
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-muted-foreground mb-2 text-xl font-bold md:text-3xl">
                      Belum ada streak.
                    </h2>
                    <p className="text-md text-gray-300 md:text-lg">
                      Mulai belajar sekarang untuk mendapatkan streak!
                    </p>
                  </>
                )}
              </div>
              <div className="relative">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-amber-400/20 md:h-16 md:w-16">
                  <Flame className="h-8 w-8 text-amber-400" />
                </div>
                <div className="absolute -top-[1px] -right-[-1px] h-3 w-3 rounded-full bg-amber-400 md:-top-1 md:-right-0 md:h-4 md:w-4"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {streakDays.map((dayData, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      dayData.completed
                        ? 'border-amber-400 bg-amber-400'
                        : 'border-amber-600/50'
                    }`}
                  >
                    {dayData.completed && (
                      <Flame className="h-5 w-5 text-gray-800" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ... (Kode untuk Leaderboard Card tetap sama) ... */}
        <Link to="/leaderboard">
          <Card className="border-primary hover:shadow-primary/30 motion-preset-expand w-full border-2 transition-all hover:bg-black/10 hover:shadow-lg">
            <CardContent className="">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-primary text-2xl font-bold">
                  Leaderboard Anda
                </h3>
                <Badge className="text-sm">
                  Peringkat Anda: {userRank?.rank ?? 'N/A'}
                </Badge>
              </div>

              {/* Current User Stats */}
              <div className="mb-6 rounded-lg border-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(userRank?.rank ?? 0)}
                    </div>
                    <div>
                      <p className="text-primary font-semibold">
                        {userProfile?.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {userProfile?.total_xp.toLocaleString()} XP
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary text-2xl font-bold">
                      {userProfile?.total_xp.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Skor Anda Sekarang
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* --- TAMPILAN KARTU AKTIVITAS TERAKHIR --- */}
        <div className="w-full">
          <h1 className="text-primary mt-4 text-2xl font-bold">
            Aktivitas Terakhir
          </h1>
          {lastActivityLessons && lastActivityLessons.length > 0 ? (
            <div className="my-5 grid grid-cols-2 gap-5">
              {lastActivityLessons.map((lesson) => (
                <Link
                  to={`/learn/${slugify(lesson.title)}`}
                  key={lesson.id}
                  className="group motion-preset-expand relative block h-[150px] w-full overflow-hidden rounded-lg md:h-[300px]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url(/assets/lesson_icons/${lesson.icon_url})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-black/5 transition-all duration-300 group-hover:from-black/60 group-hover:to-black/10" />
                  <div className="relative flex h-full flex-col items-center justify-end text-center">
                    <CardTitle className="w-full transform py-2 text-white transition-transform duration-300 ease-in-out group-hover:-translate-y-15">
                      {lesson.title}
                    </CardTitle>
                    <div className="absolute -bottom-full px-4 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-4 group-hover:opacity-100">
                      <p className="text-primary text-sm">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground mt-2">
              Belum ada aktivitas belajar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
