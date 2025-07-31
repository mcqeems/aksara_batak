import Loader from '@/components/ui/loader';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { Flame, Trophy, Star, Medal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface UserProfileData {
  name: string;
  total_xp: number;
  current_streak: number;
}

interface AttemptsData {
  quiz_title: string;
}

interface LeaderboardData {
  rank: number;
  name: string;
}

interface ApiResponse<T> {
  data: T;
}

function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfileData>();
  const [attemptsUser, setAttemptsUser] = useState<AttemptsData[]>(); // This variable is not used
  const [userRank, setUserRank] = useState<LeaderboardData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const responseProfile =
          await api.get<ApiResponse<UserProfileData>>('v1/users/profile');
        const responseLeaderboard =
          await api.get<ApiResponse<LeaderboardData[]>>('v1/leaderboard');
        // This fetch is not used, but kept as per original code
        const responseAttempts = await api.get<ApiResponse<AttemptsData[]>>(
          'v1/users/profile/attempts'
        );

        const userProfileData = responseProfile.data.data;
        const leaderboardData = responseLeaderboard.data.data;

        setUserProfile(userProfileData);
        setAttemptsUser(responseAttempts.data.data);

        // Find the current user in the leaderboard data
        if (userProfileData && leaderboardData) {
          const currentUserRankData = leaderboardData.find(
            (entry) => entry.name === userProfileData.name
          );
          setUserRank(currentUserRankData);
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

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500 text-white';
      case 2:
        return 'bg-gray-400 text-white';
      case 3:
        return 'bg-amber-600 text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Generate week days and calculate streak
  const streak = userProfile?.current_streak ?? 0;
  // The visual representation shows up to 7 days of streak, starting from the left.
  const streakDays = Array.from({ length: 7 }, (_, index) => ({
    completed: index < streak,
  }));

  const lessonAttempts = attemptsUser?.map((attempt) => {
    if (attempt.quiz_title.includes('Aksara')) {
      return 'aksara-batak';
    }
    if (attempt.quiz_title.includes('Toba')) {
      return 'bahasa-batak-toba';
    }
    return null; // Return null for cases that don't match
  });
  const onceLessonAtttempts = [...new Set(lessonAttempts)];
  console.log(onceLessonAtttempts);

  return (
    <div className="h-full w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Judul Halaman */}
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

            {/* Week Days */}
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
        <div className="w-full">
          <h1 className="text-primary mt-4 text-2xl font-bold">
            Aktivitas terakhir
          </h1>
          {onceLessonAtttempts && onceLessonAtttempts.length > 0 ? (
            <div></div>
          ) : (
            <p className="text-muted-foreground mt-2">
              Belum ada aktivitas kuis.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
