import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../assets/css/AddToPlaylist.css';
import cassette_api from "../api";
import { toast, ToastContainer } from 'react-toastify';

const AddToPlaylistModal = ({ show, handleClose, musicId }) => {
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem("ID"))

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await cassette_api.get(`/playlists/${userId}`);
                setPlaylists(response.data.playlists);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchPlaylists();
    }, [userId]);

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists((prevSelected) => {
            if (prevSelected.includes(playlistId)) {
                return prevSelected.filter((id) => id !== playlistId);
            } else {
                return [...prevSelected, playlistId];
            }
        });
    };

    const handleConfirm = async () => {
        try {
            await cassette_api.post('/playlists/add-music', {
                music_id: musicId,
                playlist_ids: selectedPlaylists
            });
            toast.success('Added to Playlist', {autoClose: 2000})
            toast.dismiss(2000)
            setTimeout(() => {
                handleClose();
                setSelectedPlaylists([])
            }, 3500)
        } catch (error) {
            console.error("Error adding music to playlist:", error);
        }
    };

    const close = () => {
        setSelectedPlaylists([])
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop={'static'} className='AddToPlaylist-modal'>
            <ToastContainer />
            <Modal.Header className='bg-danger'>
                <Modal.Title className='text-white'>Select Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-black bg-dark text-white AddToPlaylist-body'>
                <Form>
                    {playlists.map((item) => (
                        <Form.Check
                            key={item.id}
                            type="checkbox"
                            id={`playlist-${item.id}`}
                            label={item.name}
                            checked={selectedPlaylists.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                            className={selectedPlaylists.includes(item.id) ? 'AddToPlaylist-checkbox AddToPlaylist-selected' : 'AddToPlaylist-checkbox'}
                        />
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer className='bg-dark'>
                <Button variant="danger" className='w-100 text-white bg-danger p-2' onClick={handleConfirm}>
                    Confirm
                </Button>
                <Button variant="danger" className='w-100 text-white bg-secondary p-2' onClick={ close}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddToPlaylistModal;
