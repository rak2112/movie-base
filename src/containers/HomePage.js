import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import { getMovies } from './../actions/movieActions';
import LandingPage from '../components/LandingPage';

export class HomePage extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const { getMovies } = this.props;
    getMovies({pageNo:1, path:false});
  }
  render () {
    const {movies} = this.props;
    const isFetching = movies.isFetching;
    return (
      <div>
      {
        isFetching ? (
          <Loader/>
        ) : (
          <LandingPage movies={movies}/>
        )
      }
      </div>
    );
  }
}
HomePage.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired
};

function mapStateToProps (state) {
  const { movies } = state;
  return {
    movies
  };
}

export default connect( mapStateToProps, {
  getMovies
})(HomePage);
