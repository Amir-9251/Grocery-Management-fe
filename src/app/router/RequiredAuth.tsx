// src/components/RequireAuth.tsx
import type { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../utils/AppToken';

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthenticated = getToken() // replace with real logic
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, but remember where they tried to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
