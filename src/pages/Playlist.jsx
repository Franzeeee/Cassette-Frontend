import React, { useState } from "react";
import { Link } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/Playlist.css";
import ArtistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/Cassettelogosq.png";

function Playlist() {
  return (
    <LayoutMP activePage={"Playlist"}>
        <div className="playlist-container">
             <div class="top-container">1</div>
             <div class="bottom-container">2</div>
        </div>
    </LayoutMP>
  );
}

export default Playlist;
