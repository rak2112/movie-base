import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
class MovieModal extends React.Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div className="movie-modal">
        <Modal show={this.props.showModal} onHide={this.close}>
          <div className="modal-body">
            <iframe width="400" height="300" frameBorder="0" allowFullScreen="" src = {'http://www.youtube.com/v/'+this.props.videoKey+ '&amp;autoplay=1'}/>
          </div>
          <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

MovieModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default MovieModal;
