import React, { PropTypes } from 'react';
import MovieDetails from '../containers/MovieDetails';
import Loader from '../components/Loader';
import MovieModal from '../components/Modal';
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
        <Loader/>
      );
    }
    if(!fetchingDetails && !fetchingVideos && !fetchingCast && !fetchingImgs) {
      return (
        <div className="movie-details">
          <MovieModal showModal={showModal} videoKey={utubeKey} closeModal={this.props.closeModal}/>
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
