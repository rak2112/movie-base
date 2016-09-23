import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
const MovieModal = (props) => {
  return (
    <div className="movie-modal">
      <Modal show={props.showModal} onHide={props.close}>
        <div className="modal-body">
          <iframe width="400" height="300" frameBorder="0" allowFullScreen="" src = {'http://www.youtube.com/v/'+props.videoKey+ '&amp;autoplay=1'}/>
        </div>
        <Modal.Footer>
        <Button onClick={props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

MovieModal.propTypes = {
  close: PropTypes.bool,
  videoKey: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default MovieModal;
