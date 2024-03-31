import React, { useEffect, useState } from "react";
import "../assets/css/headerMP.css";
import logo from "../assets/img/Cassette-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronLeft, faChevronRight, faPlusCircle, faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import RequestForm from "./Artist/RequestForm";
import LogoutButton from "./LogoutButton";
import cassette_api from "../api";


function HeaderMP({ verified }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const role = localStorage.getItem('user_type');
  const id = localStorage.getItem("ID")
  const [requestStatus, setRequestStatus] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    cassette_api.post('/artist-status', {"id": id})
      .then(response => setRequestStatus(response.data.found))
      .catch(err => console.error("ERROR: ", err))
  },[]);

  const [show, setShow] = useState(false)
  const handleOpen = (e) => {
    e.preventDefault()

    if(e.target.classList.contains('btn-success')){
      return;
    }else {
      setShow(true)
    }
  }

  const goBack = () => {
    window.history.back()
  }
  const goForward = () => {
    window.history.forward()
  }

  return (
    <header className="w-100 p-2 row m-0 text-light bg-black">
      <RequestForm
        show={show}
        handleClose={() => setShow(false)}
      />
      <div className="col-lg-2 col-md-2 col-sm-4 d-flex gap-2">
        <div className="logo-container d-flex align-items-center justify-content-start gap-2">
          <img src={logo} alt="cassette logo" className="logo" />
          <h1 className="mb-0 ml-2" style={{fontSize: '1.7rem'}}>Cassette</h1>
        </div>
      </div>

      <div className="col-lg-1 col-md-1 col-sm-2 d-flex justify-content-end">
        <button className="navigation-button">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => goBack()}/>
        </button>
        <button className="navigation-button">
          <FontAwesomeIcon icon={faChevronRight} onClick={() => goForward()}/>
        </button>
      </div>

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

      <div className="col-lg-3 col-md-4 col-sm-2 d-flex justify-content-end align-items-center">
        { 
          role != 'listener' ? 
            <button className="icon-button" onClick={handleMenuClick} title="Upload Content">
              <FontAwesomeIcon icon={faPlusCircle} className="upload-icon" />
            </button> : 
            <button className={`btn applyArtistBtn ${requestStatus ? 'btn-success cursor-notAllowed' : "applyArtistBtn-red"}`} onClick={(e) => handleOpen(e)} disabled={!verified}>{requestStatus ? "Request Pending" : "Become an Artist"}</button>
        }
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
          <Link to={'/studio/content'}><MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#c20000' }, color: 'white' }}>Music</MenuItem></Link>
          <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#c20000' } }}>Podcast</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#c20000' } }}>Videocast</MenuItem>
        </Menu>
        <button className="icon-button">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className="icon-button">
          <LogoutButton />{/* Profile/Logout */}
        </button>
      </div>
    </header>
  );
}

export default HeaderMP;
