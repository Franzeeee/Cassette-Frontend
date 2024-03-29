import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/musicMP.css";
import {artists} from '../logic/musicMp.logic'
import cassette_api from "../api";
import RequestForm from "../Components/Artist/RequestForm";


function MusicMP() {
  const [showArtistPlayButton, setShowArtistPlayButton] = useState(null); // State to control play button visibility for artist cards
  const [showAlbumPlayButton, setShowAlbumPlayButton] = useState(null); // State to control play button visibility for album cards
  const navigate = useNavigate();

  //Album data
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await cassette_api.get('/album/all');
        setAlbums(response.data)
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const viewAlbum = (id) => {

    navigate(`/album/${id} `);
  }

  const [show, setShow] = useState(false)
  const handleOpen = () => setShow(true)

  return (
    <LayoutMP activePage={"Home"}>
      <div className="dashboard-container">
        <RequestForm 
          show={show}
          handleClose={() => setShow(false)}
        />
        <div className="artist-title-viewmore">
          <h5 className="artist-title" onClick={handleOpen}>Artists you may know</h5>
          <Link to="/artist" className="view-morebtn">Show all</Link>
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
            {albums.map((album,index) => (
              <div
                key={index}
                className="album-card"
                onMouseEnter={() => setShowAlbumPlayButton(index)}
                onMouseLeave={() => setShowAlbumPlayButton(null)}
                onClick={() => {viewAlbum(album.id)}}
              >
                <div className="image-container">
                  <img src={album.cover_image} alt={album.title} className="album-image" />
                  {showAlbumPlayButton === index && (
                    <div className="play-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg> 
                    </div>
                  )}
                </div>
                <div className="album-name-container">
                  <h4 className="album-name">{album.title}</h4>
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

