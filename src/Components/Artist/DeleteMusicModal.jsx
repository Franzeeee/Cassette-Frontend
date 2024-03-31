import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import cassette_api from '../../api';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

function DeleteMusicModal({ show, handleClose, musicId }) {

    const id = musicId;
    const navigate = useNavigate();

    const handleConfirm = () => {
        cassette_api.get(`/music/delete/${id}`)
            .then(response => {
                toast.success("Album Deleted Sucessfully!");
            })
            .catch(err => console.error('Error: ', err))
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop={'static'}>
        <ToastContainer />
        <Modal.Header closeButton>
            <Modal.Title>Delete Music?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='mb-0'>Are you sure you want to <span className='text-danger' style={{marginLeft: '-0px'}}>Delete</span> this music?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
                Confirm
            </Button>
        </Modal.Footer>
        </Modal>
    );
    }

export default DeleteMusicModal;
