// Leaderboard.tsx (Kode Final yang Diperbaiki)

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
import { Link } from 'react-router-dom';
import { Crown, ChevronDown } from 'lucide-react';
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
  // State sekarang menyimpan data pengguna yang sebenarnya
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [leaderboardRes, profileRes] = await Promise.all([
          api.get<LeaderboardResponse>('v1/leaderboard'),
          api.get<UserProfileResponse>('v1/users/profile'), // Menggunakan tipe respons yang benar
        ]);

        setLeaderboardData(leaderboardRes.data.data);
        // --- PERBAIKAN DI SINI: Menyimpan object 'data' dari dalam respons ---
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

  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 30);
  };

  const currentUserRank = leaderboardData.find(
    (user) => user.name === userProfile?.name
  )?.rank;

  // Tampilan Loading
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Tampilan Error
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full px-2 py-2 md:px-4 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Judul Halaman */}
        <div className="bg-sidebar-border rounded-2xl border p-6">
          <h1 className="font-sora text-primary text-center text-3xl font-bold">
            Leaderboard
          </h1>
        </div>

        {/* --- PERBAIKAN AKSES DATA DI SINI --- */}
        <div className="bg-sidebar-accent/50 mt-6 flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">
              {`#${currentUserRank ?? 0}`}
            </span>
            <Avatar>
              <AvatarImage
                src={userProfile?.avatar_url || '/placeholder-user.jpg'}
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

        {/* Tabel Leaderboard (tidak ada perubahan) */}
        <Table className="mt-4 w-full">
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
          <TableBody>
            {leaderboardData.length > 0 ? (
              leaderboardData.slice(0, visibleCount).map((user) => (
                <TableRow
                  key={user.rank}
                  className="transition-colors hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                >
                  <TableCell className="text-center font-medium">
                    {user.rank}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={user.avatar_url || '/placeholder-user.jpg'}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Link
                        to={`/profile/${user.name}`}
                        className="hover:underline"
                        prefetch="none"
                      >
                        {user.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{user.total_xp}</TableCell>
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

        {/* Tombol "Lihat Selanjutnya" (tidak ada perubahan) */}
        {leaderboardData.length > visibleCount && (
          <div className="mt-4 flex justify-center">
            <Button variant="secondary" onClick={showMoreItems}>
              Lihat Selanjutnya
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
