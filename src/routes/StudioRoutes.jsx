import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function StudioRoutes({ role }) {
  const isLoggedIn = !!localStorage.getItem('jwt_token');
  const isArtist = role === 'admin' || role === 'artist';

  return isLoggedIn && isArtist ? <Outlet /> : <Navigate to="/" />;
}

export default StudioRoutes;
