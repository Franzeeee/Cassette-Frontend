import React, { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/Playlist.css";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlaylistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/Cassettelogosq.png";
import cassette_api from "../api";

function Album() {

    const [playlistData, setPlaylistData] = useState({
        type: "Album",
        name: "My Album",
        songs: "78",
        image: AlbumImg,
    });

    const [playlistTracks, setPlaylistTracks] = useState([]);
    const navigate = useNavigate();

    const { index } = useParams();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }      

    useEffect( () => {
        
        cassette_api.get(`/albums/${index}`)
        .then(response => {
            const responseData = response.data;
            setPlaylistData({
            ...playlistData,
            name: responseData.title,
            songs: responseData.music.length,
            image: responseData.cover_image
            });
            setPlaylistTracks(response.data.music)
        })
        .catch(error => {
            console.log(error);
        });

    }, [index])

    const playAlbum = () => {

      navigate(`/player/${index}`);
    }

  return (
    <LayoutMP activePage={"Music"}>
      <div className="playlist-container">
        <div className="top-container">
          <div className="top-mid-container">
            <div className="p-image">
              <img src={playlistData.image} alt="Playlist" />
            </div>
            <div className="p-info">
              <div className="type">{playlistData.type}</div>
              <div className="p-name">{playlistData.name}</div>
              <div className="p-songs">{playlistData.songs} songs</div>
            </div>
            <button className="p-playbutton" onClick={playAlbum}>
              <FontAwesomeIcon icon={faPlayCircle} size="3x" /> {/* Play button icon */}
            </button>
          </div>
        </div>
        <div className="bottom-container">
          <div className="playlist-table-container">
            <table className="playlist-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Date Added</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {playlistTracks.map((track, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="p-track-info">
                        <img src={playlistData.image} alt={`Track ${track.number}`} className="p-track-image" />
                        <div className="p-track-details">
                          <span className="p-track-title">{track.title}</span>
                          <span className="p-track-singer">{track.singer}</span>
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(track.updated_at)}</td>
                    <td>{track.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default Album;
