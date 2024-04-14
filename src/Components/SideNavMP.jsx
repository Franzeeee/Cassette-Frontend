import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMusic,
  faPodcast,
  faVideo,
  faBroadcastTower,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/side-navMP.css";
import { Link, useNavigate } from "react-router-dom";
import playlistImg from "../assets/img/default-playlilst.jpg";
import { Tooltip } from "@mui/material";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { toast, ToastContainer } from "react-toastify";
import cassette_api from "../api";

function SideNavMP({ activePage }) {
  const navigate = useNavigate()
  const active = activePage;
  const navItems = [
    { text: "Home", icon: faHome, link: "/" },
    { text: "Music", icon: faMusic, link: "/music" },
    { text: "Podcasts", icon: faPodcast, link: "/Podcasts" },
    { text: "Videocasts", icon: faVideo, link: "/Videocasts" },
    { text: "Live", icon: faBroadcastTower, link: "/Live" },
  ];

  const [playlist, setPlaylist] = useState([])
  const userId = localStorage.getItem("ID")
  const [playlistUpdated, setPlaylistUpdated] = useState(false)

  useEffect(()=> {
    cassette_api.post('/playlist/latestTwo', {'user_id': userId})
      .then(response => {
        setPlaylist(response.data.first_two_playlists)
        setPlaylistUpdated(false);
      })
      .catch(err => {
        
      })
  }, [playlistUpdated, setPlaylistUpdated])
  
  // Modal for playlist creation
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const updatePlaylist = (status) => {
    setPlaylistUpdated(status)
  }



  return (
    <nav className="side-nav-mp">
      <ToastContainer />
      <CreatePlaylistModal confirmUpdate={updatePlaylist} show={show} onClose={handleClose} />
      <ul className="d-flex flex-column list-unstyled align-items-start gap-4 py-4 px-3 mb-0">
        {navItems.map((item, index) => (
          <Link to={item.link} key={index}>
            <li
              className={`d-flex align-items-center ${
                item.text === active ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span className="ml-2">{item.text}</span>
            </li>
          </Link>
        ))}
      </ul>
      <hr className="divider-top" />
      {/* Library */}
      <div className="library-section">
        <h3 className="library-header">Your Library</h3>
        <div className="playlist-container">
          {playlist !== null &&
            playlist.map((item, index) => ( // Added parentheses for arrow function
              <Link to={`/playlist/${item.id}`} key={index}> {/* Ensure each mapped element has a unique key */}
                <button className="playlist-button">
                  <img src={playlistImg} alt={`Playlist ${index + 1}`} className="playlist-image" /> {/* Use index for alt text */}
                  <span className="playlist-name">{item.name}</span>
                </button>
              </Link>
            ))
          }
          {
            playlist == false && <p className="text-white mb-0 playlist-reminder">You can create your own playlist.</p>
          }
          {/* <Link to="/playlist">
            <button className="playlist-button">
              <img src={playlistImg} alt="Playlist 1" className="playlist-image" />
              <span className="playlist-name">Playlist</span>
            </button>
          </Link>
          <Link to="/playlist">
            <button className="playlist-button">
              <img src={song} alt="Playlist 2" className="playlist-image" />
              <span className="playlist-name">Playlist</span>
            </button>
          </Link> */}
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
          <button className={`border-0 text-light view-playlist ${playlist == false && 'hide-viewMore'}`} onClick={() => navigate('/playlists')}>View More</button>
            <Tooltip title="Create Empty Playlist">
              <button className="create-playlist-button" onClick={handleShow}><FontAwesomeIcon icon={faPlus}/></button>
            </Tooltip>
        </div>
      </div>
    </nav>
  );
}

export default SideNavMP;
