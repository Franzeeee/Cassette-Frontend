import React from "react";
import { Link } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/artist.css";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/Cassettelogosq.png";

function Artist() {
  
  const artistData = {
    type: "Artist",
    name: "Artist",
    songs: "78",
    image: AlbumImg,
  };

  const artistTracks = [
    { number: 1, title: "Track 1", total_listens: "1,982,092", duration: "3:45", image: ArtistImg },
    { number: 2, title: "Track 2", total_listens: "1,982,092", duration: "3:45", image: ArtistImg },
    { number: 3, title: "Track 3", total_listens: "1,982,092", duration: "3:45", image: ArtistImg },
    { number: 4, title: "Track 4", total_listens: "1,982,092", duration: "3:45", image: ArtistImg },
    // Add more tracks as needed
  ];

  return (
    <LayoutMP activePage={"Artist"}>
      <div className="artist-container">
        <div className="a-top-container">
          <div className="a-top-mid-container">
            <div className="a-image">
              <img src={artistData.image} alt="Artist" />
            </div>
            <div className="p-info">
              <div className="type">{artistData.type}</div>
              <div className="p-name">{artistData.name}</div>
              <div className="p-songs">{artistData.songs} songs</div>
            </div>
            <button className="p-playbutton">
              <FontAwesomeIcon icon={faPlayCircle} size="3x" /> {/* Play button icon */}
            </button>
          </div>
        </div>
        <div className="bottom-container">
          <div className="artist-table-container">
            <table className="artist-table">
                <h4>Popular Tracks</h4>
              <tbody>
                {artistTracks.map((track, index) => (
                  <tr key={index}>
                    <td>{track.number}</td>
                    <td>
                      <div className="a-track-info">
                        <img src={track.image} alt={`Track ${track.number}`} className="a-track-image" />
                        <div className="a-track-details">
                          <span className="a-track-title">{track.title}</span>
                        </div>
                      </div>
                    </td>
                    <td>{track.total_listens}</td>
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

export default Artist;
