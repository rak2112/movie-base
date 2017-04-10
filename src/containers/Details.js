import React, { PropTypes } from 'react';
import MovieDetails from '../components/MovieDetails';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MovieModal from '../components/Modal';
import { connect } from 'react-redux';

import { openModal, closeModal, getMoviesDetails, unLoad } from './../actions/movieActions';

export class Details extends React.Component {
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
  componentWillReceiveProps(props) {
    if(props.params.movieId !== this.props.params.movieId) {
      let { dispatch } = this.props;
      const id = props.params.movieId;
      if(id) {
        dispatch(getMoviesDetails(id));
      }
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
            errorDetails,
            showModal,
            details,
            videos,
            utubeKey,
            images,
            castCrew
          } = this.props.getDetails;
    let loadingInProgress = fetchingDetails && fetchingVideos && fetchingCast && fetchingImgs;
    let loadingFinished = !fetchingDetails && !fetchingVideos && !fetchingCast && !fetchingImgs;   
      return (
        <div>
          {
            loadingInProgress && !errorDetails && <Loader/>
          }
          {
            loadingFinished && 
            <div className="movie-details">
            <MovieModal showModal={showModal} videoKey={utubeKey} closeModal={this.props.closeModal}/>
            <MovieDetails data={details} video={videos} images={images} castCrew={castCrew} clickHandler={this.props.getModal}/>
            </div>
          }
          {
            errorDetails && <Error/>
          }
        </div>
        
      );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch: dispatch,
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

Details.propTypes = {
  dispatch: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  getModal: PropTypes.func.isRequired,
  params: PropTypes.shape({
    movieId: PropTypes.string.isRequired
  }),
  getDetails: PropTypes.shape({
    castCrew: PropTypes.shape({
      cast: PropTypes.array,
      crew: PropTypes.array
    }),
    details: PropTypes.object.isRequired,
    fetchingDetails: PropTypes.bool.isRequired,
    errorDetails: PropTypes.bool.isRequired,
    fetchingCast: PropTypes.bool.isRequired,
    fetchingImgs: PropTypes.bool.isRequired,
    fetchingVideos: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    showModal: PropTypes.bool.isRequired,
    utubeKey: PropTypes.string,
    videos: PropTypes.object.isRequired
  })
};

export default connect( mapStateToProps, mapDispatchToProps)(Details);
