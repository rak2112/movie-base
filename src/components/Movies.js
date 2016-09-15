import React, { PropTypes } from 'react';
import MovieList from './../containers/MovieList';
// import MovieDetails from './../containers/MovieDetails';
import MoviesPagination from './../containers/Pagination';
import { connect } from 'react-redux';
import { getMovies } from './../actions/movieActions';
class Movies extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let { dispatch, route } = this.props;
    const pageNo = 1;
    let path = route.path;
    getMovies(pageNo, path, dispatch);
  }
  handlePageChange(pageNo) {
    const {dispatch, route } = this.props;
    let path = route.path;
    getMovies(pageNo, path, dispatch);
  }
  handleRefreshClick(evt) {
    evt.preventDefault();
  }
  render() {
    const {items, isFetching, isError, genres} = this.props;
    let pages = 1000; //api doesnt support pages more then 1000
    if(isFetching) {
      return (
        <div className="alert alert-info" role="alert">
          <i className="glyphicon glyphicon-repeat gly-spin"/>
          <span>Loading....</span>
        </div>
      );
    }
    if(isError) {
      return (
        <div className="alert alert-danger" role="alert">
          <strong>Oh snap!</strong> Something gone wrong. Please try Again!
        </div>
      );
    }

    return (
      <div className="moviesApp">
        <h1>Latest</h1>
        <MovieList data={items} genre={genres}/>
          <p>
            {
              !isFetching &&
              <a href="#" onClick={this.handleRefreshClick.bind(this)}>
              Refresh
              </a>
            }
          </p>
        <MoviesPagination onPageChange={this.handlePageChange.bind(this)} itemToDisplay={pages}/>
      </div>
    );
  }
}

function mapStateProps(state) {
  const { movies, getGenres } = state;
  const { totalItems, isFetching, isError, items } = movies;
  const { genres } = getGenres;
  return {
    items, isFetching, isError, totalItems, genres
  };
}

Movies.propTypes = {
  items : PropTypes.array.isRequired,
  //handlePageChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  genres: PropTypes.array.isRequired,
  isError: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired
};

export default connect(mapStateProps) (Movies);
