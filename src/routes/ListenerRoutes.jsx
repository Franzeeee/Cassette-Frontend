import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ListenerRoutes() {
  const isLoggedIn = !!localStorage.getItem('jwt_token');

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ListenerRoutes;
