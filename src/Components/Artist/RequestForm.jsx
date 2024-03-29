import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../../assets/css/RequestForm.module.css'
import cassette_api from '../../api';

const RequestForm = ({ show, handleClose }) => {
  const [id, setId] = useState(null);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    setId(localStorage.getItem("ID"))
    console.log(id)
  }, [id, setId]);

  const handleRequest = (e) => {
    e.preventDefault();
    alert();
    setRequesting(true);
    cassette_api.post('/artist_request', {"id": id})
      .then(response => {
        console.log(response.data.message)
        setRequesting(false)
      })
      .catch(err => {
        console.error("Error: ", err)
      })
  }


  return (
    <Modal show={show} onHide={handleClose} className={`${styles.modal}`} backdrop="static">
      <Modal.Header closeButton className={`${styles.modalHeader}`}>
        <Modal.Title  className='text-light '>Artist Request</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-light bg-dark '>
        Send an artist request to the admin?
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" className='text-white bg-danger p-2' disabled={requesting} onClick={(e) => handleRequest(e)}>
          {!requesting ? "Confirm" : "Loading..."}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestForm;
