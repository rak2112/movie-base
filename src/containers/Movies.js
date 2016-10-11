import React, { PropTypes } from 'react';
import MovieList from './../components/MovieList';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MoviesPagination from './../components/Pagination';
import { connect } from 'react-redux';
import { getMovies, loadingReq } from './../actions/movieActions';

export class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    let { dispatch, route } = this.props;
    const pageNo = 1;
    let path = route.path;
    getMovies(pageNo, path, dispatch);
  }
  componentWillUnmount() {
    let {dispatch} = this.props;
    dispatch(loadingReq());
  }

  handlePageChange(pageNo=1) {
    const {dispatch, route } = this.props;
    let path = route.path;
    dispatch(loadingReq());
    getMovies(pageNo, path, dispatch);
    this.refs.movies.childNodes[1].scrollTop = 0;

    //window.scrollTo(0, 0);
  }
  handleRefreshClick(evt) {
    evt.preventDefault();
  }
  render() {
    const {items, isFetching, isError, errorStatus, genres, pageNo, totalPages} = this.props;
    let pages = (totalPages>1000) ? 1000 : totalPages ; //api doesnt support pages more then 1000
    if(isFetching) {
      return (<Loader/>);
    }
    if(isError) {
      return (<Error errorStatus={errorStatus}/>);
    }

    return (
      <div ref="movies" className="movies-app">
        <h4>{this.props.pageName || 'All Movies'}</h4>
        <MovieList data={items} genre={genres}/>
        <div className="footer">
          <MoviesPagination onPageChange={this.handlePageChange} itemToDisplay={pages} pageNo={pageNo}/>
        </div>
      </div>
    );
  }
}

function mapStateProps(state) {
  const { movies, getGenres } = state;
  const { isFetching, isError, errorStatus, items, pageNo, totalPages } = movies;
  const { genres } = getGenres;
  return {
    items, isFetching, isError, errorStatus, genres, pageNo, totalPages
  };
}

Movies.propTypes = {
  pageNo: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  items : PropTypes.array.isRequired,
  pageName: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  genres: PropTypes.array.isRequired,
  isError: PropTypes.bool,
  errorStatus: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired
};

export default connect(mapStateProps) (Movies);
