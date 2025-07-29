// Leaderboard.tsx (Kode Final dengan Animasi)

import { useEffect, useState } from 'react';
import api from '@/services/api';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';

// Tipe untuk satu entri di leaderboard
interface LeaderboardUser {
  rank: number;
  name: string;
  total_xp: number;
  avatar_url: string;
}

// Tipe untuk respons leaderboard
interface LeaderboardResponse {
  data: LeaderboardUser[];
}

// Tipe untuk data di dalam profil pengguna
interface UserProfileData {
  uuid: string;
  name: string;
  email: string;
  avatar_url: string;
  total_xp: number;
}

// Tipe untuk keseluruhan respons profil pengguna
interface UserProfileResponse {
  data: UserProfileData;
}

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [leaderboardRes, profileRes] = await Promise.all([
          api.get<LeaderboardResponse>('v1/leaderboard'),
          api.get<UserProfileResponse>('v1/users/profile'),
        ]);

        setLeaderboardData(leaderboardRes.data.data);
        setUserProfile(profileRes.data.data);
      } catch (err) {
        setError('Gagal memuat data.');
        console.error('fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const itemsToShow = isExpanded ? leaderboardData.length : 10;
  const currentUserRank = leaderboardData.find(
    (user) => user.name === userProfile?.name
  )?.rank;

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="bg-sidebar-border motion-preset-expand rounded-2xl border p-6">
          <h1 className="font-sora text-primary text-center text-3xl font-bold">
            Leaderboard
          </h1>
        </div>

        <div className="bg-sidebar-accent/50 motion-preset-expand mt-6 flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">
              {`#${currentUserRank ?? 0}`}
            </span>
            <Avatar>
              <AvatarImage
                src={
                  userProfile?.avatar_url ||
                  `https://avatar.iran.liara.run/public/boy?username=${userProfile?.name}`
                }
              />
              <AvatarFallback>
                {userProfile?.name?.substring(0, 2).toUpperCase() ?? 'PP'}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold">{userProfile?.name}</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">
              {userProfile?.total_xp ?? 0}
            </span>
            <p className="text-muted-foreground text-sm">Skor Anda</p>
          </div>
        </div>

        <div className="motion-preset-expand mt-4 w-full overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-secondary/40 h-12 text-lg">
              <TableRow>
                <TableHead className="text-primary w-[50px] text-center font-bold">
                  <Crown className="mx-auto" />
                </TableHead>
                <TableHead className="text-primary px-5 font-bold">
                  Username
                </TableHead>
                <TableHead className="text-primary text-right font-bold">
                  Skor
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="motion-preset-fade motion-delay-200">
              {leaderboardData.length > 0 ? (
                leaderboardData.slice(0, itemsToShow).map((user) => (
                  <TableRow
                    key={user.rank}
                    className="motion-preset-fade motion-delay-75"
                  >
                    <TableCell className="text-center font-medium">
                      {user.rank}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={
                              user.avatar_url ||
                              `https://avatar.iran.liara.run/public/boy?username=${user.name}`
                            }
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <p> {user.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {user.total_xp}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    Tidak ada data untuk ditampilkan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {leaderboardData.length > 10 && (
          <div className="motion-preset-expand mt-4 flex justify-center">
            <Button variant="secondary" onClick={toggleExpanded}>
              {isExpanded ? 'Tutup' : 'Lihat Selanjutnya'}
              {isExpanded ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
