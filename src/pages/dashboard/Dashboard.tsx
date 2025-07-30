import Loader from '@/components/ui/loader';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { Flame, Trophy, Star, Medal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
}

interface ApiResponse<T> {
  data: T;
}

function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfileData>();
  const [attemptsUser, setAttemptsUser] = useState<AttemptsData[]>();
  const [leaderboardRank, setLeaderboardRank] = useState<LeaderboardData[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const responseProfile =
          await api.get<ApiResponse<UserProfileData>>('v1/users/profile');
        const responseAttempts = await api.get<ApiResponse<AttemptsData[]>>(
          'v1/users/profile/attempts'
        );
        const responseLeaderboard =
          await api.get<ApiResponse<LeaderboardData[]>>('v1/leaderboard');
        setUserProfile(responseProfile.data.data);
        setAttemptsUser(responseAttempts.data.data);
        setLeaderboardRank(responseLeaderboard.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log('Gagal mengambil data profil: ' + error);
      }
    };
    fetchUserProfile();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <Star className="h-5 w-5 text-blue-500" />;
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
        return 'bg-blue-500 text-white';
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
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();
  const streak = userProfile?.current_streak ?? 0;
  const completedDays = new Set<number>();

  if (streak > 0) {
    // Limit the visual representation to the last 7 days
    for (let i = 0; i < Math.min(streak, 7); i++) {
      let dayIndex = today - i;
      if (dayIndex < 0) {
        dayIndex += 7; // Wrap around the week
      }
      completedDays.add(dayIndex);
    }
  }

  const streakDays = weekDays.map((day, index) => ({
    day,
    completed: completedDays.has(index),
    isToday: index === today,
  }));

  return (
    <div className="h-full w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Judul Halaman */}
        <div className="md:py-6">
          <h1 className="font-sora text-primary motion-preset-expand text-center text-2xl font-bold md:text-left md:text-3xl">
            Selamat Datang {userProfile?.name}!
          </h1>
        </div>
        <Card className="w-full border-2 border-yellow-500/50 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-yellow-400">
                  {userProfile?.current_streak} day streak
                </h2>
                <p className="text-lg text-gray-300">
                  Do a lesson today to extend your streak!
                </p>
              </div>
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/20">
                  <Flame className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-yellow-400"></div>
              </div>
            </div>

            {/* Week Days */}
            <div className="flex items-center justify-between">
              {streakDays.map((dayData, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <span className="text-sm font-medium text-gray-300">
                    {dayData.day}
                  </span>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      dayData.completed
                        ? 'border-yellow-400 bg-yellow-400'
                        : 'border-yellow-400/50'
                    } ${dayData.isToday ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-800' : ''}`}
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
      </div>
    </div>
  );
}

export default Dashboard;
