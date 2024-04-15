import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import LayoutMP from '../Layout/LayoutMP';
import '../assets/css/playlists.css';
import '../assets/css/Circular.css';
import DefImage from "../assets/img/Cassettelogosq.png";
import cassette_api from '../api';
import defaultImage from '../assets/img/default-playlilst.jpg';

function Playlists() {
  const userId = localStorage.getItem("ID");
  const [playlistData, setPlaylistData] = useState([
    {
      title: 'Playlist 1',
      description: 'Description for Playlist 1',
      imageUrl: DefImage,
    },
    {
      title: 'Playlist 2',
      description: 'Description for Playlist 2',
      imageUrl: DefImage,
    },
    {
      title: 'Playlist 3',
      description: 'Description for Playlist 3',
      imageUrl: DefImage,
    },
  ]);

  useEffect(() => {
    cassette_api.post('/playlists', {id: userId})
    .then(response => {
      const playlistsData = response.data;
      setPlaylistData(playlistsData.playlists);
    })
    .catch(error => {
      console.error("Error fetching playlists: ", error)
    })
  },[])

  return (
    <LayoutMP activePage="Playlists">
      <div className="ppplaylist-container">
        <h2 className="plplaylist-title">Playlists</h2>
        <div className="pplaylist-cards-container">
          {playlistData.map((item, index) => (
            <Link to={`/playlist/${item.id}`} key={index} className="playlist-link"> {/* Wrap each card in a Link component */}
              <div className="playlist-card">
                <div className="pplaylist-image-container">
                  <img src={defaultImage} alt={item.title} className="pplaylist-image" />
                </div>
                <div className="pplaylist-info-container">
                  <h4 className="pplaylist-title">{item.name}</h4>
                  <p className="pplaylist-description">Sample Description</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </LayoutMP>
  );
}

export default Playlists;
