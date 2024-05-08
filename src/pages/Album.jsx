import React, { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/Playlist.css";
import { faEdit, faPlayCircle, faTrashCan, faCheck, faAdd, faSpinner} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlaylistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/Cassettelogosq.png";
import cassette_api from "../api";
import { Tooltip } from "@mui/material";
import DeleteAlbumModal from "../Components/Artist/DeleteAlbumModal";
import DeleteMusicModal from "../Components/Artist/DeleteMusicModal";
import { toast, ToastContainer } from "react-toastify";
import AddToPlaylistModal from "../Components/AddToPlaylistModal";

function Album() {

  const [role, setRole] = useState(localStorage.getItem('user_type'))
  const [edit, setEdit] = useState(false)
  const [canEdit, setCanEdit] = useState(false);
  const userId = localStorage.getItem("ID")
  const [showModal, setShowModal] = useState(false)
  const { index } = useParams();
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(2);
  const [isFinalPage, setIsFinalPage] = useState(false)

  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [musicId, setMusicId] = useState();

  const handleDoubleClick = (e) => {
    setEditTitle(true);
    setNewTitle(e.target.textContent)
  };

  const handleMusicTitleChange = (e) => {
    setPlaylistTracks(e.target.value);
  };

  const handleBlur = (id) => {
    setEditTitle(false);
    alert(id)
  };

  const [playlistData, setPlaylistData] = useState({
      type: "Album",
      name: "My Album",
      songs: "78",
      image: AlbumImg,
    });

    
  // Field for updated album
  const [newAlbumData, setNewAlbumData] = useState({...playlistData, id: index});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAlbumData({ ...newAlbumData, [name]: value });
    setPlaylistData({...playlistData, [name]: value})
  };

    const handleDeleteModal = (id) => {
      setShowModal(true)
    }

    const handleClose = () => {
      setShowModal(false)
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }      

    useEffect( () => {
        
        cassette_api.get(`/albums/${index}`)
        .then(response => {
            const responseData = response.data;
            const paginate = response.data.pagination;
            setPlaylistData({
            ...playlistData,
            name: responseData.title,
            songs: responseData.music.length,
            image: responseData.cover_image,
            pagination: paginate
            });
            setPlaylistTracks(response.data.music)
            setCanEdit(userId == responseData.artist || role === "admin")
            setIsFinalPage(paginate.current_page === paginate.last_page)
        })
        .catch(error => {
            console.log(error);
        });

    }, [index])

    const playAlbum = () => {

      navigate(`/player/album/${index}`);
    }

    const handleEditClick = () => {
      setEdit(true)
    }
    const handleSaveClick = (e) => {
      e.preventDefault();

      cassette_api.post('album/update/', newAlbumData)
        .then(response => {
          toast.success(response.data.message)
        })
        .catch(err => console.error("Error: " , err))

      setPlaylistData({
        ...playlistData,
        name: newAlbumData.name,
        });
      setEdit(false)
    }

    // Music Delete modal
    const [showMusicDelete, setShowMusicDelete] = useState(false);
    const deleteMusicModal = (id) => {
      setShowMusicDelete(true)
      setMusicId(id)
      console.log(id)
    }
    const handleCloseMusic = () => {
      setShowMusicDelete(false)
    }

    // Adding to playlist
    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false)
    const [musicToAdd, setMusicToAdd] = useState()

    const closeAddToPlaylist = () => {
      setShowAddToPlaylist(false)
    }

    const handleAddClick = (id) => {
      setShowAddToPlaylist(true)
      setMusicToAdd(id)
    }
    const fetchTracks = () => {
      setFetching(true)
      cassette_api.get(`/albums/${index}?page=${page}&per_page=10`)
        .then(response => {
          const fetchedTrack = response.data.music;
          setPlaylistTracks([...playlistTracks,...fetchedTrack]);
          setPage(prev => prev + 1)
        })
        .catch(error => {
          toast.error(error);
        })
        .finally(() => {
          setFetching(false);
        });
    }
    

  return (
    <LayoutMP activePage={"Music"}>
      <div className="playlist-container">
        <DeleteAlbumModal show={showModal} handleClose={handleClose} albumId={index}/>
        <DeleteMusicModal show={showMusicDelete} musicId={musicId} handleClose={handleCloseMusic} albumId={index}/>
        <AddToPlaylistModal show={showAddToPlaylist} handleClose={closeAddToPlaylist} musicId={musicToAdd}/>
        <div className="top-container position-relative ">
          {
            canEdit && (
              <>
                <Tooltip data-toggle="tooltip" data-html="true" title={`${edit ? 'Save' : 'Edit'}`}>
                  <FontAwesomeIcon icon={edit ? faCheck : faEdit} className="albumEditIcon" onClick={edit ?(e) => handleSaveClick(e) : handleEditClick}/>
                </Tooltip>
                <Tooltip data-toggle="tooltip" data-html="true" title="Delete">
                  <FontAwesomeIcon icon={faTrashCan} className="albumDeleteIcon" onClick={handleDeleteModal}/>
                </Tooltip>
              </>
            )
          }
          <ToastContainer containerId={"album"}/>
          <div className="top-mid-container">
            <div className="p-image">
              <img src={playlistData.image} alt="Playlist" />
            </div>
            <div className="p-info">
              <div className="type">{playlistData.type}</div>
              {edit ? (
                  <input
                      type="text"
                      name="name"
                      value={playlistData.name}
                      className="albumEdit-name"
                      onChange={(e) => handleChange(e)}
                  />
              ) : (
                  <div className="p-name">{playlistData.name}</div>
              )}
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
                  <th className="albumMusicDate">Date Added</th>
                  <th className="albumMusicDuration">Duration</th>
                  {
                    edit ? (<th className="albumMusicControl">Control</th>) : <th className="albumMusicControl addToPlaylist">Add to Playlist</th>
                  }
                </tr>
              </thead>
              <tbody>
                {playlistTracks.map((track, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="p-track-info">
                        <img src={playlistData.image} alt={`Track ${track.number}`} className="p-track-image" />
                        <div className="p-track-details w-100">

                          {edit ? (
                            <input
                              type="text"
                              value={track.title}
                              className="albumMusicTitle w-75"
                              onChange={handleChange}
                              onBlur={() => handleBlur(id)}
                              autoFocus
                            />
                          ) : (
                            <span className="p-track-title" onDoubleClick={e => handleDoubleClick(e)}>{track.title}</span>
                          )}

                          <span className="p-track-singer">{track.singer}</span>
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(track.updated_at)}</td>
                    <td>{track.duration}</td>
                    {
                      edit ? (<td className="albumMusicDelete" >
                        <Tooltip data-toggle="tooltip" data-html="true" title="Delete">
                          <FontAwesomeIcon icon={faTrashCan} className="albumMusicDelete" onClick={(e) => deleteMusicModal(track.id)}/>
                        </Tooltip></td>)
                        :
                        <td className="text-center">
                        <Tooltip data-toggle="tooltip" data-html="true" title="Add">
                          <FontAwesomeIcon icon={faAdd} className="addToPlaylistIcon" onClick={() => handleAddClick(track.id)}/>
                        </Tooltip>
                        </td>
                    
                    }
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={`w-100 text-center viewMore ${isFinalPage && "d-none"}`} onClick={fetchTracks}>Load More Tracks {fetching && <FontAwesomeIcon icon={faSpinner} spin/>} </p>
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default Album;
