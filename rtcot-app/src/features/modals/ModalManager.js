// src/features/modals/ModalManager.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from './modalSlice';

const ModalManager = () => {
  const dispatch = useDispatch();
  const { showModal, modalContent } = useSelector((state) => state.modal);

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>  {/* Render the string content */}
      <Modal.Footer>
        <button onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalManager;

