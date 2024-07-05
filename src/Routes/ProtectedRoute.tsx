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
  return isAuthenticated && roles.includes(userRole|| '')? children : <Navigate to="/" />;
};

export default ProtectedRoute;
