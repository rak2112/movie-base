import React, { PropTypes } from 'react';
import { paths } from './../constants/locationSvc';

const LandingPage = (props) => {
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
          props.movies.items.map( (movie, index) => {
            if(index < 9) {
              return <div  key={index} className="col-lg-4 col-md-6 col-sm-6 movie-img"><img src={paths[ 'imgPath500']+ movie.backdrop_path} alt="" /></div>;
            }
          })
        }
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  movies: PropTypes.object.isRequired
};
export default LandingPage;
