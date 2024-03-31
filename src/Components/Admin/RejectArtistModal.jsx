import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import cassette_api from '../../api';

function RejectArtistModal({ show, handleClose, user, removeData }) {

  const [deleted, setDeleted] = useState(false);

  const handleConfirm = () => {
    cassette_api.get(`/artist_requests/${user.id}`)
      .then(response => {
        setDeleted(true);
        removeData(user.id);
      })
      .catch(err => console.error("Error: ", err))
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop={'static'} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Reject Artist Request?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to reject<span className='text-danger'>{user != null ? user.name : " "}</span>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {deleted ? 'Close' : "Cancel"}
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={deleted} style={{background: deleted && 'red'}}>
          {deleted ? 'Deleted Successfully' : 'Confirm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectArtistModal;
