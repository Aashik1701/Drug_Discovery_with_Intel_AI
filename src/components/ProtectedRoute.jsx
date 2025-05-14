import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Loader2 } from 'lucide-react';

/**
 * Component to protect routes that require authentication
 */
const ProtectedRoute = ({ redirectPath = '/signin' }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <span className="ml-2 text-lg font-medium text-gray-700">Checking authentication...</span>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    // Save the current location to redirect after login
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If logged in, render the child route elements
  return <Outlet />;
};

export default ProtectedRoute;
