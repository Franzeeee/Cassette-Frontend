import React from "react";
import LayoutMP from "../Layout/LayoutMP";
import { Card, Typography } from "@mui/material";

import "../assets/css/musicMP.css";
import ArtistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/Cassette-logo.png";

function MusicMP() {
  const artists = [
    { id: 1, name: "Artist 1", image: ArtistImg },
    { id: 2, name: "Artist 2", image: ArtistImg },
    { id: 3, name: "Artist 3", image: ArtistImg },
    { id: 4, name: "Artist 4", image: ArtistImg },
    { id: 5, name: "Artist 5", image: ArtistImg },
    { id: 6, name: "Artist 6", image: ArtistImg },
    { id: 7, name: "Artist 7", image: ArtistImg },
    { id: 8, name: "Artist 8", image: ArtistImg }

  ];

  const albums = [
    { id: 1, name: "Album 1", image: AlbumImg },
    { id: 2, name: "Album 2", image: AlbumImg },
    { id: 3, name: "Album 3", image: AlbumImg },
    { id: 4, name: "Album 4", image: AlbumImg },
    { id: 5, name: "Album 5", image: AlbumImg },
    { id: 6, name: "Album 6", image: AlbumImg },
    { id: 6, name: "Album 6", image: AlbumImg }
  ];

  return (
    <LayoutMP activePage={"MusicMP"}>
      <div className="dashboard-container">
      <div className="artist-title-viewmore">
      <Typography className="artist-title" variant="h6" gutterBottom>
            Artists you may know
          </Typography>
      <button className="view-morebtn">View More</button>
      </div>
        <div className="artists-container">
          <div className="artist-cards-container">
            {artists.map(artist => (
              <Card key={artist.id} className="artist-card">
                {/* Artist card content */}
                <img src={artist.image} alt={artist.name} className="artist-image" />
                <div className="artist-name-container">
                  <Typography className="artist-name">{artist.name}</Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="albums-title-viewmore">
      <Typography className="albums-title" variant="h6" gutterBottom>
            Popular Albums
          </Typography>
      <button className="view-morebtn">View More</button>
      </div>
        <div className="albums-container">
          <div className="album-cards-container">
            {albums.map(album => (
              <Card key={album.id} className="album-card">
                {/* Album card content */}
                <img src={album.image} alt={album.name} className="album-image" />
                <div className="album-name-container">
                  <Typography className="album-name">{album.name}</Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default MusicMP;
