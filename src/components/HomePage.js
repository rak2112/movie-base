import React from 'react';
import {Link} from 'react-router';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import { paths } from './../constants/locationSvc';
import { getMovies } from './../actions/movieActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    getMovies(1, false, dispatch);
  }
  render () {
    const { movies } = this.props;console.log('propss',movies)
    return (
      <div className="home">
        <h1>React Movie Base</h1>
        <ul>
          <li>Watch Trailers</li>
          <li>Ratings, Cast and story lines of all the Latest, Upcoming and the Super Hit Movies</li>
          <li>Creating your personal favourites and watchlist coming soon</li>
        </ul>
      <div>
          {
              movies.items.map( (movie, index) => {
                if(index < 9) {
                  return <div  key={index} className="col-lg-4 col-md-6 col-sm-6"><img src={paths[ 'imgPath500']+ movie.backdrop_path} alt="" /></div>;
                }
              })

          }
        </div>
      </div>

    );
  }
};

function mapStateToProps (state) { console.log('state', state)
  const { movies } = state;
  return {
    movies
  };
}

export default connect( mapStateToProps)(HomePage);
