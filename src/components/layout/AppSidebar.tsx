import { Bot, Home, Settings, WholeWord } from 'lucide-react';

import LeaderboardIcon from '/assets/icons/ranking-stroke-rounded.svg';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
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
    title: 'Pengaturan',
    url: '',
    icon: Settings,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="font-bawor text-primary items-center text-5xl">
        PodaHoras
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
