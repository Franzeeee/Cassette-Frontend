import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/Playlist.css";
import { faEdit, faPlayCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlaylistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/default-playlilst.jpg";
import { useParams, useNavigate } from "react-router-dom";
import cassette_api from "../api";
import { Tooltip } from "@mui/material";
import DeletePlaylistModal from "../Components/DeletePlaylistModal";
import EditPlaylistModal from "../Components/EditPlaylistModal";

function Playlist() {

  const { index } = useParams();
  const navigate = useNavigate();

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [playlistData, setPlaylistData] = useState({
    type: "Playlist",
    name: "Loading...",
    songs: 0,
    image: AlbumImg,
  });

  function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  useEffect(()=>{
    cassette_api.post('/playlist/fetchMusic', {"id": index})
      .then(response => {
        const playlistDetail = response.data.playlist;
        const fetchedTracks = response.data.music;

        // Update playlistData state
        setPlaylistData({
          type: "Playlist",
          name: playlistDetail.name,
          songs: fetchedTracks.length,
          image: AlbumImg, // Assuming AlbumImg is a static image
        });

        // Update playlistTracks state
        setPlaylistTracks(fetchedTracks);
        console.log(fetchedTracks)

      })
      .catch(err => {
        console.log(err)
      });
  },[])

  // All about managing album
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const hideDeletemodal = () => {
    setShowDeleteModal(false)
  }

  const hideEditModal = () => {
    setShowEditModal(false)
  }
  
  return (
    <LayoutMP activePage={"Music"}>
      <div className="playlist-container">
        <DeletePlaylistModal show={showDeleteModal} handleClose={hideDeletemodal} playlistId={index}/>
        <EditPlaylistModal show={showEditModal} onClose={hideEditModal} playlistData={index}/>
        <div className="top-container position-relative ">
          <div className="Playlist-ControlContainer">
            <Tooltip data-toggle="tooltip" data-html="true" title="Edit Details">
              <FontAwesomeIcon icon={faEdit} onClick={() => setShowEditModal(true)}/>
            </Tooltip>
            <Tooltip data-toggle="tooltip" data-html="true" title="Delete Playlist">
              <FontAwesomeIcon icon={faTrashCan} className="PlaylistControlDelete" onClick={() => setShowDeleteModal(true)}/>
            </Tooltip>
          </div>
          <div className="top-mid-container">
            <div className="p-image">
              <img src={playlistData.image} alt="Playlist" />
            </div>
            <div className="p-info">
              <div className="type">{playlistData.type}</div>
              <div className="p-name">{playlistData.name}</div>
              <div className="p-songs">{playlistData.songs} song(s)</div>
            </div>
            <button className="p-playbutton" onClick={() => navigate(`/player/playlist/${index}`)}>
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
                    <td>{index + 1}</td>
                    <td>
                      <div className="p-track-info">
                        <img src={track.album_cover} alt={`Track ${track.number}`} className="p-track-image" />
                        <div className="p-track-details">
                          <span className="p-track-title">{track.title}</span>
                          <span className="p-track-singer">{track.artist_name}</span>
                        </div>
                      </div>
                    </td>
                    <td>{track.album_name}</td>
                    <td>{formatDate(track.created_at)}</td>
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
