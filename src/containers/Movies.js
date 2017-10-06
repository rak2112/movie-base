import React, { PropTypes } from 'react';
import MovieList from './../components/MovieList';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MoviesPagination from './../components/Pagination';
import { connect } from 'react-redux';
import { getMovies, loadingReq } from './../actions/movieActions';

const propTypes = {
  pageNo: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  items : PropTypes.arrayOf(PropTypes.object.isRequired),
  pageName: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })),
  hasError: PropTypes.bool,
  errorStatus: PropTypes.string,
  getMovies: PropTypes.func.isRequired,
  loadingReq: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired
};

export class Movies extends React.Component {
  componentDidMount() {
    let { route, getMovies, loadingReq } = this.props;
    const pageNo = 1;
    let path = route.path;
    loadingReq();
    getMovies({pageNo, path});
  }
  
  handlePageChange(pageNo=1) {
    const { loadingReq, getMovies, route } = this.props;
    let path = route.path;
    loadingReq();
    getMovies({pageNo, path});
    this.refs.movies.childNodes[1].scrollTop = 0;
    //window.scrollTo(0, 0);
  }
  handleRefreshClick(evt) {
    evt.preventDefault();
  }
  render() {
    const {items, isFetching, hasError, errorStatus, genres, pageNo, totalPages} = this.props;
    let pages = (totalPages>1000) ? 1000 : totalPages ; //api doesnt support pages more then 1000
    return (
      <div>
        {
          isFetching && <Loader/>
        }
        {
          hasError && <Error errorStatus={errorStatus}/>
        }
        { !isFetching && !hasError &&
          <div ref="movies" className="movies-app">
            <MovieList data={items} genre={genres} pageName={this.props.pageName}/>
            <MoviesPagination onPageChange={this.handlePageChange.bind(this)} itemToDisplay={pages} pageNo={pageNo}/>
          </div>
        }
      </div>
    );
  }
}

function mapStateProps(state) {
  const { movies, getGenres } = state;
  const { isFetching, hasError, errorStatus, items, pageNo, totalPages } = movies;
  const { genres } = getGenres;
  return {
    items, isFetching, hasError, errorStatus, genres, pageNo, totalPages
  };
}

Movies.propTypes = propTypes;

export default connect(mapStateProps, {
  loadingReq,
  getMovies
}) (Movies);
