// LayoutSidebar.tsx (Kode Baru)

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';

export default function LayoutSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* --- PERUBAHAN DI SINI --- */}
      <main className="relative flex-1">
        <div className="absolute top-4 left-4 z-20">
          <SidebarTrigger />
        </div>
        {/* Konten halaman sekarang akan memiliki ruang yang benar */}
        <div className="bg-background h-full w-full overflow-y-auto p-4 pt-16 sm:p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
