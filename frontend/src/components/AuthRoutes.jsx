import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Activity } from 'lucide-react';

/**
 * Route wrapper for routes requiring user authentication (e.g. Dashboard).
 * Redirects unauthenticated users to the Login page.
 */
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Activity className="h-10 w-10 text-primary animate-pulse mb-4" />
        <span className="text-sm font-semibold text-gray-500">Checking credentials...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * Route wrapper for routes restricted to unauthenticated guests (e.g. Login, Signup).
 * Redirects authenticated users to the Dashboard page.
 */
export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Activity className="h-10 w-10 text-primary animate-pulse mb-4" />
        <span className="text-sm font-semibold text-gray-500">Checking credentials...</span>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
