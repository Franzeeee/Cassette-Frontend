import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import '../assets/css/createPlaylistModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash, faMinus, faPlus, faRemove, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import cassette_api from './../api'

function CreatePlaylistModal({ show, onClose, confirmUpdate }) {
    const [playlistName, setPlaylistName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(true);
    
    const [dummyMusic, setDummyMusic] = useState([
        { id: 1, title: 'Song 1' },
        { id: 2, title: 'Song 2' },
        { id: 3, title: 'Song 3' },
        // Add more dummy music as needed
    ]);

    const handleSongSelect = (song) => {
        setSelectedSongs([...selectedSongs, song]);
        const updatedFilteredMusic = filteredMusic.filter(item => item.id !== song.id);
        setDummyMusic(updatedFilteredMusic);
    };

    const reset = () => {
        setPlaylistName('');
        setSearchQuery('');
        setSelectedSongs([]);
        setShowSearchResults(true);
        setDummyMusic([
            { id: 1, title: 'Song 1' },
            { id: 2, title: 'Song 2' },
            { id: 3, title: 'Song 3' },
        ]);
    }

    const handleClose = () => {
        
        reset()
    
        if(!toast.isActive()){
            toast.dismiss();
            setTimeout(() => {
                onClose();
            },200)
        }else {
            onClose();
        }
    };
    const handleConfirm = () => {
        // Perform validation here
        if (!playlistName) {
            toast.error('Please enter a playlist name');
            return;
        }

        const formData = {
            name: playlistName,
            user_id: localStorage.getItem('ID')
        }

        cassette_api.post('/playlist/create', formData)
            .then(response => {
                toast.success(response.data.message, {autoClose: 3000})
                confirmUpdate(true);
                reset();
                toast.dismiss({delay: 2500})
                setTimeout(() => {
                    onClose()
                }, 3000)
            })
            .catch(err => toast.error("Error: ", err))
    };


    const filteredMusic = dummyMusic.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClearSearch = () => {
        resetState()
    }

    const handleRemoveSong = (id) => {
        const removedSong = selectedSongs.find(song => song.id === id);
        const updatedSelectedSongs = selectedSongs.filter(song => song.id !== id);
        setSelectedSongs(updatedSelectedSongs);
        setDummyMusic([...dummyMusic, removedSong]); // Add the removed song back to music list
    };

    const toggleSearchResults = () => {
        setShowSearchResults(!showSearchResults); // Toggle visibility of search results
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop={'static'} className='createPlaylist-modalContainer'>
            <ToastContainer />
            <Modal.Header closeButton style={{ backgroundColor: '#d11f1f' }}>
                <Modal.Title className='text-light'>Create New Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-black text-light'>
                <Form className='position-relative'>
                    <Form.Group controlId="playlistName">
                        <Form.Label className='mb-1'>Playlist Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter playlist name"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            required
                            className='createPlaylistModal-PlaylistName mb-2'
                        />
                    </Form.Group>
                    <Form.Group controlId="searchMusic" className='position-relative '>
                        <Form.Label className='m-0'>Search Music</Form.Label>
                        <div className='position-relative'>
                            <Form.Control
                                type="text"
                                placeholder="Enter Music Name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='createPlaylistModal-PlaylistName'
                                autoComplete='off'
                            />
                            {
                                searchQuery && (
                                    <>
                                        <Tooltip title="Clear">
                                            <FontAwesomeIcon icon={faClose} className='createPlaylistModal-clearSearch' onClick={() => handleClearSearch()}/>
                                        </Tooltip>
                                        <Tooltip title={showSearchResults ? "Hide Result(s)" : "Show Result(s)"}>
                                            <FontAwesomeIcon icon={showSearchResults ? faEye : faEyeSlash} 
                                                className={`createPlaylistModal-hideSearch ${!showSearchResults ? 'hiddenSearchResult' : 'showSearchResult'}`} 
                                                onClick={() => toggleSearchResults()}/>
                                        </Tooltip>
                                        
                                    </>
                                )
                            }
                        </div>
                    </Form.Group>
                    {showSearchResults && (
                        <ListGroup className='createPlaylistModal-searchResult'>
                            {filteredMusic.length > 0 && searchQuery !== '' &&
                                filteredMusic.map(song => (
                                    <ListGroup.Item key={song.id} onClick={() => handleSongSelect(song)}>
                                        {song.title}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )}
                    <Form.Label className='mb-0 mt-3'>Songs (Optional):</Form.Label>
                    <ListGroup className="createPlaylistModal-selectedMusic">
                        {
                            selectedSongs.length > 0 ? 
                            selectedSongs.map(song => (
                                <ListGroup.Item key={song.id}>
                                    <div className='createPlaylistModal-selectedMusic-item'>
                                        <div className='d-flex flex-column '>
                                            <p>{song.title}</p>
                                            <p>Arist</p>
                                        </div>
                                        <button variant="danger" size="sm">
                                        <Tooltip title="Remove">
                                                <FontAwesomeIcon icon={faRemove} onClick={() => handleRemoveSong(song.id)}/>
                                        </Tooltip>
                                        </button>
                                    </div>
                                    
                                </ListGroup.Item>
                            )) : <div className='no-song-alert'><p>No Song(s) added.</p></div>
                        }
                    </ListGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer className='bg-black'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreatePlaylistModal;
