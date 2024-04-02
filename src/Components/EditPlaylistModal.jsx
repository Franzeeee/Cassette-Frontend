import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cassette_api from './../api';

function EditPlaylistModal({ show, onClose, playlistId }) {
    const [playlistName, setPlaylistName] = useState('');

    const handleClose = () => {
        setPlaylistName(''); // Reset playlist name when closing modal
        onClose();
    };

    const handleConfirm = () => {
        // Perform validation here
        if (!playlistName) {
            toast.error('Please enter a playlist name');
            return;
        }
    
        const formData = {
            id: 19,
            name: playlistName
        }
        
        // Make API call to update playlist name
        cassette_api.post(`/playlists/${playlistId}/edit`, formData)
            .then(response => {
                const successToastId = toast.success(response.data.message, { autoClose: 3000 });
    
                // Dismiss the success toast after a delay
                setTimeout(() => {
                    toast.dismiss(successToastId);
                }, 3500);
    
                // Close modal after a delay
                setTimeout(() => {
                    handleClose();
                    window.location.reload();
                }, 4000);
            })
            .catch(error => {
                console.error('Error updating playlist name:', error);
                toast.error('Failed to update playlist name');
            });
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop={'static'} className='createPlaylist-modalContainer'>
            <ToastContainer />
            <Modal.Header closeButton style={{ backgroundColor: '#d11f1f' }}>
                <Modal.Title className='text-light'>Edit Playlist</Modal.Title>
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

export default EditPlaylistModal;
