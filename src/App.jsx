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
import Music from './pages/Music';  //New page for Music
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

// Pages for music categories
import TopCharts from './pages/MusicBrowseCards/TopCharts';
import NewReleases from './pages/MusicBrowseCards/NewReleases'
import Recommended from './pages/MusicBrowseCards/Recommended';
import ArtistSpotlight from './pages/MusicBrowseCards/ArtistSpotlight'
import Rock from './pages/MusicBrowseCards/Rock'
// import Pop from './pages/music/Pop';
// import HipHop from './pages/music/HipHop';
// import Rap from './pages/music/Rap';
// import Electronic from './pages/music/Electronic';
// import Jazz from './pages/music/Jazz';
// import Blues from './pages/music/Blues';
// import MusicHistory from './pages/music/MusicHistory';
// import MusicEducation from './pages/music/MusicEducation';
// import FeaturedLabels from './pages/music/FeaturedLabels';
// import Collaborations from './pages/music/Collaborations';
// import MusicChallenges from './pages/music/MusicChallenges';
// import MusicNews from './pages/music/MusicNews';
// import MusicReviews from './pages/music/MusicReviews';
// import MusicDiscovery from './pages/music/MusicDiscovery';
// import MusicRecommendations from './pages/music/MusicRecommendations';

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
          <Route path="/music" element={<Music />} />

          {/* Rooutes for Music Cards Categories */}
          <Route path="/music/top-charts" element={<TopCharts />} />
          <Route path="/music/new-releases" element={<NewReleases />} />
          <Route path="/music/recommended-for-you" element={<Recommended />} />
          <Route path="/music/artist-spotlight" element={<ArtistSpotlight />} />
          <Route path="/music/rock" element={<Rock />} />
          {/* <Route path="/music/pop" element={<Pop />} />
          <Route path="/music/hip-hop" element={<HipHop />} />
          <Route path="/music/rap" element={<Rap />} />
          <Route path="/music/electronic" element={<Electronic />} />
          <Route path="/music/jazz" element={<Jazz />} />
          <Route path="/music/blues" element={<Blues />} />
          <Route path="/music/music-history" element={<MusicHistory />} />
          <Route path="/music/music-education" element={<MusicEducation />} />
          <Route path="/music/featured-labels" element={<FeaturedLabels />} />
          <Route path="/music/collaborations" element={<Collaborations />} />
          <Route path="/music/music-challenges" element={<MusicChallenges />} />
          <Route path="/music/music-news" element={<MusicNews />} />
          <Route path="/music/music-reviews" element={<MusicReviews />} />
          <Route path="/music/music-discovery" element={<MusicDiscovery />} />
          <Route path="/music/music-recommendations" element={<MusicRecommendations />} />  */}

          <Route path="/album/:index" element={<Album />} />
          <Route path="/" element={<MusicMP />} />
          <Route path="/player/:type/:index" element={<MusicPlayer />} />
          <Route path="/playlist/:index" element={<Playlist />} />
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
