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
import MusicMP from './pages/MusicMP';
import Playlist from './pages/Playlist';
import Artist from './pages/Artist';
import AdminRoutes from './routes/AdminRoutes'
import ListenerRoutes from './routes/ListenerRoutes';
import StudioRoutes from './routes/StudioRoutes';
import UnauthenticatedRoutes from './routes/UnauthenticatedRoutes';
import NotFound from './pages/NotFound';
import { TestTrack } from './pages/TestTrack';
import ArtistUpload from './pages/Artist/ArtistUpload';
import Album from './pages/Album';

function App() {
  const isLoggedIn= useState(!!localStorage.getItem('jwt_token'));
  const role = localStorage.getItem('user_type');
  


  return (
    <BrowserRouter>
      <Routes>

        <Route path='test' element={<ArtistUpload />} />

        {/* Route for Unauthenticated users */}
        <Route element={<UnauthenticatedRoutes loggedIn={isLoggedIn}/>}>
          <Route path="/login" element={<Login />} />

        </Route>
        <Route path="/register" element={<Register />}/>
        <Route path="/album/:index" element={<Album />}/> 
        {/* Route for unassigned routes and for 404 Error page*/}
        <Route path="*" element={<NotFound />} />


        {/* Routes for Listeners or Authenticated Users */}
        <Route element={<ListenerRoutes loggedIn={isLoggedIn}/>}>
          <Route path="/" element={<MusicMP />} />
          <Route path='/music_player' element={<MusicPlayer/>} />
          <Route path='/playlist' element={<Playlist/>} />
          <Route path='/artist' element={<Artist/>} />
        </Route>

        {/* Routes for Admin and Super Admin */}
        <Route element={<AdminRoutes loggedIn={isLoggedIn} isAdmin={role === 'admin'} />}>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/artist_management' element={<ArtistManagement />} />
          <Route path='/user_management' element={<UserManagement />} />
          <Route path='/content_management' element={<ContentManagement/>} />
        </Route>

        {/* Routes for Studio Page (only for artist, admin, super admin) */}
        <Route element={<StudioRoutes loggedIn={isLoggedIn} role={role} />}>
          <Route path='/studio/content' element={<ArtistContent />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
