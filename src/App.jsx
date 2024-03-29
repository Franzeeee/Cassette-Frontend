import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ArtistManagement from './pages/ArtistManagement';
import UserManagement from './pages/UserManagement';
import ArtistContent from './pages/Artist/ArtistContent';
import MusicPlayer from './pages/MusicPlayer';
import ContentManagement from './pages/Admin/ContentManagement';
import HomeMP from './pages/HomeMP';
import MusicMP from './pages/MusicMP';
import Playlist from './pages/Playlist';
import Artist from './pages/Artist';
import AdminRoutes from './routes/AdminRoutes';
import ListenerRoutes from './routes/ListenerRoutes';
import StudioRoutes from './routes/StudioRoutes';
import UnauthenticatedRoutes from './routes/UnauthenticatedRoutes';
import NotFound from './pages/NotFound';
import ArtistUpload from './pages/Artist/ArtistUpload';
import Album from './pages/Album';
import RequestForm from './Components/Artist/RequestForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt_token'));
  const role = localStorage.getItem('user_type');

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('jwt_token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>

      <Routes>
        {/* <Route path="/test" element={<ArtistUpload />} /> */}
        
      <Route path="test" element={<RequestForm />}/>
        
        <Route element={<UnauthenticatedRoutes loggedIn={isLoggedIn}/>} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route element={<AdminRoutes isAdmin={role === 'admin'} />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/artist_management" element={<ArtistManagement />} />
          <Route path="/user_management" element={<UserManagement />} />
          <Route path="/content_management" element={<ContentManagement />} />
        </Route>

        <Route element={<ListenerRoutes loggedIn={isLoggedIn}/>} >
          <Route path="/home" element={<Home />} />
          <Route path="/home_mp" element={<HomeMP />} />

          <Route path="/album/:index" element={<Album />} />
          <Route path="/" element={<MusicMP />} />
          <Route path="/player/:index" element={<MusicPlayer />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/artist" element={<Artist />} />
        </Route>

        <Route element={<StudioRoutes role={role} />} >
          <Route path="/studio/content" element={<ArtistUpload />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
