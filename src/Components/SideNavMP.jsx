import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMusic,
  faPodcast,
  faVideo,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/side-navMP.css";
import { Link } from "react-router-dom";
import playlist from "../assets/img/artist-img.jpg";
import song from "../assets/img/song.png";

function SideNavMP({ activePage }) {
  const active = activePage;
  const navItems = [
    { text: "Home", icon: faHome, link: "/Home" },
    { text: "Music", icon: faMusic, link: "/music-player" },
    { text: "Podcasts", icon: faPodcast, link: "/Podcasts" },
    { text: "Videocasts", icon: faVideo, link: "/Videocasts" },
    { text: "Live", icon: faBroadcastTower, link: "/Live" },
  ];

  return (
    <nav className="side-nav-mp">
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
          <Link to="/playlist">
            <button className="playlist-button">
              <img src={playlist} alt="Playlist 1" className="playlist-image" />
              <span className="playlist-name">Playlist</span>
            </button>
          </Link>
          <Link to="/playlist">
            <button className="playlist-button">
              <img src={song} alt="Playlist 2" className="playlist-image" />
              <span className="playlist-name">Playlist</span>
            </button>
          </Link>
        </div>
        <Link to="/create-playlist">
          <button className="create-playlist-button">Create Playlist</button>
        </Link>
      </div>

      {/* Profile/Logout */}
    </nav>
  );
}

export default SideNavMP;
