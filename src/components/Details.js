import React, { PropTypes } from 'react';
import MovieDetails from '../containers/MovieDetails';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { openModal, closeModal, getMoviesDetails, unLoad } from './../actions/movieActions';

class Details extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    let { dispatch, params } = this.props;
    const id = params.movieId;
    if(id) {
      dispatch(getMoviesDetails(id));
    }
  }
  componentWillUnmount() {
    let { dispatch } = this.props;
    dispatch(unLoad());
  }
  render() {
    const { fetchingDetails,
            fetchingVideos,
            fetchingCast,
            fetchingImgs,
            showModal,
            details,
            videos,
            utubeKey,
            images,
            castCrew
          } = this.props.getDetails;
    if(fetchingDetails && fetchingVideos && fetchingCast && fetchingImgs) {
      return (
        <div className="alert alert-info" role="alert">
        <i className="glyphicon glyphicon-repeat gly-spin"/>
        <span>Loading....</span>
        </div>
      );
    }
    if(!fetchingDetails && !fetchingVideos && !fetchingCast && !fetchingImgs) {
      return (
        <div className="movie-details">
          <div>
            <Modal show={showModal} onHide={this.close}>
              <div className="modal-body">
                <iframe width="400" height="300" frameBorder="0" allowFullScreen="" src = {'http://www.youtube.com/v/'+utubeKey+ '&amp;autoplay=1'}/>
              </div>
              <Modal.Footer>
              <Button onClick={this.props.closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <MovieDetails data={details} video={videos} images={images} castCrew={castCrew} clickHandler={this.props.getModal}/>
        </div>
      );
    }
    return <p>Not able to reterive any data.</p>;
  }
}

Details.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  getDetails: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  getModal: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    dispatch:dispatch,
    closeModal: function() {
      dispatch(closeModal());
    },
    getModal: function(key) {
      dispatch(openModal(key));
    }
  };
}

function mapStateToProps (state) {
  const { getDetails } = state;
  return {
    getDetails
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Details);
