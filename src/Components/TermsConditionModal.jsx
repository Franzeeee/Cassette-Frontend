import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TermsConditionModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title  className='text-black '>Terms and Condition</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-black '>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ea et tempora? Harum id pariatur repellat deserunt debitis sed illum fugiat, nulla quo eveniet consequatur rerum beatae accusamus. Nulla, accusantium!
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
      <Modal.Header>
        <Modal.Title  className='text-black '>Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body  className='text-black '>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ea et tempora? Harum id pariatur repellat deserunt debitis sed illum fugiat, nulla quo eveniet consequatur rerum beatae accusamus. Nulla, accusantium!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className='w-100 text-white bg-danger p-2' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsConditionModal;
