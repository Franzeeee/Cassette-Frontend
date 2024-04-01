import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../../assets/css/RequestForm.module.css'
import cassette_api from '../../api';

const RequestForm = ({ show, handleClose }) => {
  const [id, setId] = useState(null);
  const [requesting, setRequesting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fetchId = async () => {
      const storedId = await localStorage.getItem("ID");
      setId(storedId);
    };

    fetchId();
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    // Check if the button has a class of 'bg-success'
    if (!e.target.classList.contains('bg-success')) {
      setRequesting(true);
      cassette_api.post('/artist_request', {"id": id})
        .then(response => {
          console.log(response.data.message);
          setRequesting(false);
          setSent(true);
        })
        .catch(err => {
          console.error("Error: ", err);
          setRequesting(false);
        });
    } else {
      // If the button has a class of 'bg-success', do nothing
      return;
    }
  };


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
        <Button variant="primary" className={`text-white p-2 ${sent ? 'bg-success' : 'bg-danger'}`} disabled={requesting} onClick={(e) => handleRequest(e)}>
          {!requesting ? sent ? "Request Sent" : "Confirm"  : "Loading..."}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestForm;
