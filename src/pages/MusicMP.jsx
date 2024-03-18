import React, { useState } from "react";
import { Link } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/musicMP.css";
import ArtistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/Cassettelogosq.png";

function MusicMP() {
  const [showArtistPlayButton, setShowArtistPlayButton] = useState(null); // State to control play button visibility for artist cards
  const [showAlbumPlayButton, setShowAlbumPlayButton] = useState(null); // State to control play button visibility for album cards

  const artists = [
    { id: 1, name: "Dyo", description: "Artist", image: ArtistImg },
    { id: 2, name: "J. Poole", description: "Artist", image: ArtistImg },
    { id: 3, name: "19 Savage", description: "Artist", image: ArtistImg },
    { id: 4, name: "Yoyoy", description: "Artist", image: ArtistImg },
    { id: 5, name: "Hev Agi", description: "Artist", image: ArtistImg }
  ];

  const albums = [
    { id: 1, name: "Album 1", description: "Description 1", image: AlbumImg },
    { id: 2, name: "Album 2", description: "Description 2", image: AlbumImg },
    { id: 3, name: "Album 3", description: "Description 3", image: AlbumImg },
    { id: 4, name: "Album 4", description: "Description 4", image: AlbumImg },
    { id: 5, name: "Album 5", description: "Description 5", image: AlbumImg }
  ];

  return (
    <LayoutMP activePage={"MusicMP"}>
      <div className="dashboard-container">
        <div className="artist-title-viewmore">
          <h5 className="artist-title">Artists you may know</h5>
          <Link to="/artists" className="view-morebtn">Show all</Link>
        </div>
        <div className="artists-container">
          <div className="artist-cards-container">
            {artists.map(artist => (
              <div
                key={artist.id}
                className="artist-card"
                onMouseEnter={() => setShowArtistPlayButton(artist.id)}
                onMouseLeave={() => setShowArtistPlayButton(null)}
              >
                <div className="image-container">
                  <img src={artist.image} alt={artist.name} className="artist-image" />
                  {showArtistPlayButton === artist.id && (
                    <div className="play-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="artist-name-container">
                  <h4 className="artist-name">{artist.name}</h4>
                  <p className="artist-description">{artist.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="albums-title-viewmore">
          <h5 className="albums-title">Popular Albums</h5>
          <Link to="/albums" className="view-morebtn">Show all</Link>
        </div>
        <div className="albums-container">
          <div className="album-cards-container">
            {albums.map(album => (
              <div
                key={album.id}
                className="album-card"
                onMouseEnter={() => setShowAlbumPlayButton(album.id)}
                onMouseLeave={() => setShowAlbumPlayButton(null)}
              >
                <div className="image-container">
                  <img src={album.image} alt={album.name} className="album-image" />
                  {showAlbumPlayButton === album.id && (
                    <div className="play-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg> 
                    </div>
                  )}
                </div>
                <div className="album-name-container">
                  <h4 className="album-name">{album.name}</h4>
                  <p className="album-description">{album.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default MusicMP;
