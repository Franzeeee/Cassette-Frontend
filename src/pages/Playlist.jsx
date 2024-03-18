import React from "react";
import { Link } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/Playlist.css";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlaylistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/Cassettelogosq.png";

function Playlist() {
  
  const playlistData = {
    type: "Playlist",
    name: "My Playlist",
    songs: "78",
    image: AlbumImg,
  };

  const playlistTracks = [
    { number: 1, title: "Track 1", singer: "Artist 1", album: "Album 1", dateadded: "March 23, 2024", duration: "3:45", image: PlaylistImg },
    { number: 2, title: "Track 2", singer: "Artist 2", album: "Album 2", dateadded: "March 23, 2024", duration: "3:45", image: PlaylistImg },
    { number: 3, title: "Track 3", singer: "Artist 3", album: "Album 3", dateadded: "March 23, 2024", duration: "3:45", image: PlaylistImg },
    { number: 4, title: "Track 4", singer: "Artist 4", album: "Album 4", dateadded: "March 23, 2024", duration: "3:45", image: PlaylistImg },
    { number: 5, title: "Track 5", singer: "Artist 5", album: "Album 5", dateadded: "March 23, 2024", duration: "3:45", image: PlaylistImg },
    // Add more tracks as needed
  ];

  return (
    <LayoutMP activePage={"Playlist"}>
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
            <button className="p-playbutton">
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
                  <th>Album</th>
                  <th>Date Added</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {playlistTracks.map((track, index) => (
                  <tr key={index}>
                    <td>{track.number}</td>
                    <td>
                      <div className="p-track-info">
                        <img src={track.image} alt={`Track ${track.number}`} className="p-track-image" />
                        <div className="p-track-details">
                          <span className="p-track-title">{track.title}</span>
                          <span className="p-track-singer">{track.singer}</span>
                        </div>
                      </div>
                    </td>
                    <td>{track.album}</td>
                    <td>{track.dateadded}</td>
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

export default Playlist;
