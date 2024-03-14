import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ArtistManagement from './pages/ArtistManagement'
import UserManagement from './pages/UserManagement';
import ArtistContent from './pages/Artist/ArtistContent';
import MusicPlayer from './pages/MusicPlayer';
import ContentManagement from './pages/Admin/ContentManagement';
import HomeMP from './pages/HomeMP';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('jwt_token');
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);

    // Check if the user is an admin (you need to implement this logic)
    const userRole = localStorage.getItem('user_type');
    const isAdminUser = userRole === 'admin';
    setIsAdmin(isAdminUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn  ? <HomeMP /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/dashboard" element={isAdmin ? (isAdmin ? <Dashboard /> : <Navigate to={'/login'} />) : <Dashboard />} /> 
        {/* <Route path="/artist_approval" element={isAdmin ? (isAdmin ? <ArtistManagement /> : <Navigate to={'/login'} />) : <ArtistManagement />} /> */}
        <Route path='/user_management' element={<UserManagement />} />
        <Route path='/artist_management' element={<ArtistManagement/>} />
        <Route path='/artist/content' element={<ArtistContent />}/>
        <Route path='/content_management' element={<ContentManagement/>} />
        <Route path='/music_player' element={<MusicPlayer/>} />
        <Route path='/home_mp' element={<HomeMP/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
