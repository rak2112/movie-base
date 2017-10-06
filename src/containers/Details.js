import React, { PropTypes, Component } from 'react';
import MovieDetails from '../components/MovieDetails';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MovieModal from '../components/Modal';
import { connect } from 'react-redux';

import { openModal, closeModal, getMoviesDetails, loadingReq } from './../actions/movieActions';
const propTypes = {
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loadingReq: PropTypes.func.isRequired,
  getMoviesDetails: PropTypes.func.isRequired,
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
export class Details extends Component {
  componentWillMount() {
    let { params, getMoviesDetails, loadingReq } = this.props;
    loadingReq();
    const id = params.movieId;
    if(id) {
      getMoviesDetails(id);
    }
  }
  componentWillReceiveProps(props) {
    if(props.params.movieId !== this.props.params.movieId) {
      let { getMoviesDetails, loadingReq } = this.props;
      const id = props.params.movieId;
      if(id) {
        loadingReq();
        getMoviesDetails(id);
      }
    }
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
            <MovieDetails data={details} video={videos} images={images} castCrew={castCrew} clickHandler={this.props.openModal}/>
            </div>
          }
          {
            errorDetails && <Error/>
          }
        </div>

      );
  }
}

function mapStateToProps (state) {
  const { getDetails } = state;
  return {
    getDetails
  };
}

Details.propTypes = propTypes;
export default connect( mapStateToProps, {
  loadingReq,
  getMoviesDetails,
  closeModal,
  openModal

})(Details);
