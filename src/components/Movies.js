import React, { PropTypes } from 'react';
import MovieList from './../containers/MovieList';
// import MovieDetails from './../containers/MovieDetails';
import PaginationAdvanced from './../containers/Pagination';
import { connect } from 'react-redux';
import { getMovies } from './../actions/movieActions'
class Movies extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log('propsss in moutn......',this.props);
    let { dispatch, route } = this.props;
    //dispatch(loadData());
    const pageNo = 1;
    let path = route.path;
    getMovies(pageNo, path, dispatch);
  }
    handlePageChange(pageNo) {
      const {dispatch, totalItems, route } = this.props;
      let path = route.path;
      getMovies(pageNo, path, dispatch);
    }
    handleRefreshClick(evt) {
      evt.preventDefault();
      const {dispatch } = this.props;
    }
    render() { console.log('renddddrrrrrrrrrrrrrrrr');
    const {items, isFetching, isError, totalPages, genres} = this.props;
    let pages = 1000; //api doesnt support pages more then 1000
    if(isFetching) {
        return (
          <div className="alert alert-info" role="alert">
            <i className="glyphicon glyphicon-repeat gly-spin"></i>
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
      <PaginationAdvanced onPageChange={this.handlePageChange.bind(this)} itemToDisplay={pages}/>
    </div>
    )
 }
}
//App.propTypes = { // items : React.propTypes.array.isRequired, // handlePageChange: React.propTypes.function //}
function mapStateProps(state) {
  console.log('mappppping',state)
  const { movies, getGenres } = state
  const { totalItems, isFetching, isError, totalPages, items } = movies;
  const { genres } = getGenres;
  return {
    items, isFetching, isError, totalPages, totalItems, genres
  }
}
export default connect(mapStateProps) (Movies)
