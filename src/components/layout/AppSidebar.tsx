// AppSidebar.tsx

import {
  Book,
  Bot,
  Home,
  LogOut,
  MoonIcon,
  SunIcon,
  WholeWord,
} from 'lucide-react';
import { LeaderboardIcon } from '../icon/LeaderboardIcon';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Switch } from '../ui/switch';
import { useTheme } from './theme-provider'; // <-- 1. Impor useTheme
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Belajar',
    url: '/learn',
    icon: Book,
  },
  {
    title: 'Huruf Aksara',
    url: '/aksara',
    icon: WholeWord,
  },
  {
    title: 'AI Chatbot',
    url: '/chat',
    icon: Bot,
  },
  {
    title: 'Leaderboard',
    url: '/leaderboard',
    icon: LeaderboardIcon,
  },
  {
    title: 'Keluar',
    url: '/settings',
    icon: LogOut,
    isDestructive: true,
    isLogout: true,
  },
];

export default function AppSidebar() {
  // 2. Ambil theme dan fungsi setTheme dari context
  const { theme, setTheme } = useTheme();

  // 3. Tentukan apakah switch harus dalam keadaan "checked" (dark mode)
  // Kita cek tema sistem jika tema belum diatur secara eksplisit
  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const signOut = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    signOut();
  };

  return (
    <Sidebar>
      <SidebarHeader className="font-bawor text-primary items-center text-5xl">
        <Link to={'/'}> PodaHoras</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      'font-sora transition',
                      item.isDestructive &&
                        'text-red-500 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/40 dark:hover:text-red-300'
                    )}
                    asChild
                  >
                    {item.isLogout ? (
                      <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* 4. Tambahkan elemen switch di footer sidebar */}
      <SidebarFooter>
        <div className="flex w-full items-center justify-between p-2">
          {isDarkMode ? (
            <p className="text-muted-foreground text-sm">
              Apakah terlalu gelap?
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Apakah terlalu terang?
            </p>
          )}

          <Switch
            variant="theme"
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
            IconOn={MoonIcon}
            IconOff={SunIcon}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
