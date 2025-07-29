// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LayoutSidebar from './LayoutSidebar';
import ObserverProvider from './ObserverProvider';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <LayoutSidebar>
      <ObserverProvider>
        <Outlet />
      </ObserverProvider>
    </LayoutSidebar>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
