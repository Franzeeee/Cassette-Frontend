import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoutes({ isAdmin }) {
  const isLoggedIn = !!localStorage.getItem('jwt_token');

  return isLoggedIn && isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
