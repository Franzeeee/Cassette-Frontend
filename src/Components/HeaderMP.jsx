import React, { useState } from "react";
import "../assets/css/headerMP.css";
import logo from "../assets/img/Cassette-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronLeft, faChevronRight, faPlusCircle, faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";

function HeaderMP() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="w-100 p-2 row m-0 text-light bg-black">
      <div className="col-lg-2 col-md-2 col-sm-4 d-flex gap-2">
        <div className="logo-container d-flex align-items-center justify-content-start gap-2">
          <img src={logo} alt="cassette logo" className="logo" />
          <h1 className="mb-0 ml-2" style={{fontSize: '1.7rem'}}>Cassette</h1>
        </div>
      </div>

      <div className="col-lg-1 col-md-1 col-sm-2 d-flex justify-content-end">
        <button className="navigation-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="navigation-button">
          <FontAwesomeIcon icon={faChevronRight} />
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
        <button className="icon-button" onClick={handleMenuClick} title="Upload Content">
          <FontAwesomeIcon icon={faPlusCircle} className="upload-icon" />
        </button>
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
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
    </header>
  );
}

export default HeaderMP;
