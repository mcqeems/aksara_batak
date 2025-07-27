import { useAuthStore } from '@/store/auth';

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  return { isAuthenticated, user };
};
