// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LayoutSidebar from './LayoutSidebar';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <LayoutSidebar>
      <Outlet />
    </LayoutSidebar>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
