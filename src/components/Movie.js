import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './../styles/styles.scss';
import { paths } from './../constants/locationSvc';
const Movie = (props) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-6 movie">
      <div>
        <img src={paths[ 'imgPath500']+ props.movie.backdrop_path} alt="" />
        <div className="detail">
          <h3>{props.movie.title}</h3>
          {
            props.genres.map(function (genre)
              {
                return <span className="genre" key={genre.id}>{genre.name}</span>;
            })
          }
          <p>Rating: {props.movie.vote_average}</p>
          <Link to={{pathname: '/movieDetails/'+props.movie.id }}>View Details</Link>
        </div>
      </div>
    </div>
 );
};
export default Movie;

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired
};
