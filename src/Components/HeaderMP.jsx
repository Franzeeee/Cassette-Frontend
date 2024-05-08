import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPodcast, faVideo, faSearch, faChevronLeft, faChevronRight, faPlusCircle, faBell, faUser, faUserShield, faMicrophone, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import RequestForm from "./Artist/RequestForm";
import LogoutButton from "./LogoutButton";
import cassette_api from "../api";
import logo from "../assets/img/Cassette-logo.png";
import userlogo from "../assets/img/cassete-man.png";
import "../assets/css/headerMP.css";

function HeaderMP({ verified }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null); // State for profile dropdown
  const role = localStorage.getItem('user_type');
  const id = localStorage.getItem("ID")
  const [requestStatus, setRequestStatus] = useState(false);
  const navigate = useNavigate();

  // Function to handle menu click
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle profile dropdown menu click
  const handleProfileMenuClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  // Function to close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to close profile dropdown menu
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  // Fetch request status on component mount
  useEffect(() => {
    cassette_api.post('/artist-status', { "id": id })
      .then(response => setRequestStatus(response.data.found))
      .catch(err => console.error("ERROR: ", err))
  }, []);

  // Function to handle open
  const [show, setShow] = useState(false)
  const handleOpen = (e) => {
    e.preventDefault()
    if (e.target.classList.contains('btn-success')) {
      return;
    } else {
      setShow(true)
    }
  }

  // Function to go back
  const goBack = () => {
    window.history.back()
  }

  // Function to go forward
  const goForward = () => {
    window.history.forward()
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.log("User is not logged in");
        return;
      }
      
      await cassette_api.post('/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Clear token from local storage
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_type');
      localStorage.removeItem('ID');
      // Redirect or display success message
      console.log("Logout successful");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
      // Handle error, such as displaying an error message
    }
  };
  
  const [audioBlob, setAudioBlob] = useState()

  // useEffect(() => {
  //   async function fetchAudioBlob() {
  //     try {
  //       // Fetch audio using Laravel route
  //       const response = await fetch('http://localhost/api/audio');
        
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
        
  //       // Convert response to blob
  //       const blob = await response.blob();
  //       setAudioBlob(blob);
  //     } catch (error) {
  //       console.error('Error fetching audio blob:', error);
  //     }
  //   }
  
  //   fetchAudioBlob();
  // }, []);

  

  return (
    <header className="w-100 p-2 row m-0 text-light bg-black">
      <RequestForm
        show={show}
        handleClose={() => setShow(false)}
      />
      {/* Logo */}
      <div className="col-lg-2 col-md-2 col-sm-4 d-flex gap-2">
        <div className="logo-container d-flex align-items-center justify-content-start gap-2">
          <img src={logo} alt="cassette logo" className="logo" />
          <h1 className="mb-0 ml-2" style={{ fontSize: '1.7rem', cursor: 'pointer' }} onClick={() => navigate('/')}>Cassette</h1>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="col-lg-1 col-md-1 col-sm-2 d-flex justify-content-end">
        <button className="navigation-button">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => goBack()} />
        </button>
        <button className="navigation-button">
          <FontAwesomeIcon icon={faChevronRight} onClick={() => goForward()} />
        </button>
      </div>

      {/* Search */}
      <div className="col-lg-6 col-md-4 col-sm-6 d-flex align-items-center">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search for songs, artists etc."
            className="search-input"
          />
        </div>
      </div>

      {/* User Profile and Menu */}
      <div className="col-lg-3 col-md-4 col-sm-2 d-flex justify-content-end align-items-center">
        {/* Conditional rendering based on user role */}
        {role !== 'listener' ?
          <button className="icon-button" onClick={handleMenuClick} title="Upload Content">
            <FontAwesomeIcon icon={faPlusCircle} className="upload-icon" />
          </button> :
          <button className={`btn applyArtistBtn ${requestStatus ? 'btn-success cursor-notAllowed' : "applyArtistBtn-red"}`} onClick={(e) => handleOpen(e)} disabled={!verified}>{requestStatus ? "Request Pending" : "Become an Artist"}</button>
        }

        {/* Menu for Content */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              backgroundColor: '#080808',
              color: '#fff',
            },
          }}
        >
          <Link to={'/studio/upload'}>
            <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#c20000' }, color: 'white' }}>
              <FontAwesomeIcon icon={faMusic} style={{ marginRight: '10px' }} />
              Music
            </MenuItem>
          </Link>
          <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#c20000' } }}>
            <FontAwesomeIcon icon={faPodcast} style={{ marginRight: '10px' }} />
            Podcast
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#c20000' } }}>
            <FontAwesomeIcon icon={faVideo} style={{ marginRight: '10px' }} />
            Videocast
          </MenuItem>
        </Menu>

        {/* Notification Button */}
        <button className="icon-button">
          <FontAwesomeIcon icon={faBell} />
        </button>

        {/* User Profile Menu */}
        <button className="icon-button" onClick={handleProfileMenuClick}>
          <img src={userlogo} alt="user logo" className="user-logo" />
        </button>
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            style: {
              backgroundColor: '#080808',
              color: '#fff',
            },
          }}
        >
          {role == 'admin' && (
            <MenuItem onClick={() => navigate('/dashboard')} className="profile-menu-item">
              <FontAwesomeIcon icon={faUserShield} className="menu-icon" />
              <span className="menu-text">Go to Admin Page</span>
            </MenuItem>
          )}
          {role !== 'listener' && (
            <MenuItem onClick={() => navigate('/studio/dashboard')} className="profile-menu-item">
              <FontAwesomeIcon icon={faMicrophone} className="menu-icon" />
              <span className="menu-text">Go to Studio</span>
            </MenuItem>
          )}
          <hr className="profile-menu-divider" />
          <MenuItem onClick={handleProfileMenuClose} className="profile-menu-item">
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
            <span className="menu-text">Profile</span>
          </MenuItem>
          <MenuItem onClick={handleLogout} className="profile-menu-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
            <span className="menu-text">Logout</span>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default HeaderMP;
