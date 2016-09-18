import React, { PropTypes } from 'react';
import MovieList from './../containers/MovieList';
import Loader from '../components/Loader';
import MoviesPagination from './../containers/Pagination';
import { connect } from 'react-redux';
import { getMovies, unLoad } from './../actions/movieActions';
import $ from 'jquery';
import ReactDom from 'react-dom';
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
    getMovies(pageNo, path, dispatch); console.log('rdom', this.refs)
    this.refs.movies.childNodes[1].scrollTo(0, 0);
    //$('.movieList').animate({ scrollTop: 0 }, 'slow');
    //window.scrollTo(0, 0);
  }
  handleRefreshClick(evt) {
    evt.preventDefault();
  }
  render() { console.log('movies props', this.props);
    const {items, isFetching, isError, genres} = this.props;
    let pages = 1000; //api doesnt support pages more then 1000
    if(isFetching) {
      return (
        <Loader></Loader>
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
      <div ref="movies" className="movies-app">
        <h4>{this.props.pageName || 'All Movies'}</h4>
        <MovieList data={items} genre={genres}/>
        <div className="footer">
          <MoviesPagination onPageChange={this.handlePageChange.bind(this)} itemToDisplay={pages}/>
        </div>
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
