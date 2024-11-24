import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EAEDED]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9900]"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};