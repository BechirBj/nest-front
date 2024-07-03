// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  roles: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, userRole } = useAuth();
  return isAuthenticated && userRole === roles ? children : <Navigate to="/LoginPage" />;
};

export default ProtectedRoute;
