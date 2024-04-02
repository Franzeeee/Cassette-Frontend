import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import cassette_api from '../api';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

function DeletePlaylistModal({ show, handleClose, playlistId }) {

    const id = playlistId;
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false)

    const handleConfirm = () => {
        cassette_api.post(`/playlists/delete`, {"id": id})
            .then(response => {
                setDeleted(true)
                toast.success("Playlist Deleted Sucessfully!", {autoClose: 3000});
                setTimeout(() => {navigate('/')}, 3500)
            })
            .catch(err => console.error('Error: ', err))
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop={'static'}>
        <ToastContainer />
        <Modal.Header closeButton>
            <Modal.Title>Delete Playlist?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='mb-0'>Are you sure you want to <span className='text-danger' style={{marginLeft: '-0px'}}>Delete</span> this playlist?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm} disabled={deleted}>
                {!deleted ? "Confirm" : "Deleted"}
            </Button>
        </Modal.Footer>
        </Modal>
    );
    }

export default DeletePlaylistModal;
