import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import round from './../utils/roundingNumber';
import './../styles/styles.scss';
import { paths } from './../constants/locationSvc';
const Movie = (props) => {
  const moviePoster = props.movie.backdrop_path;
  return (
    <div className="col-lg-4 col-md-6 col-sm-6 movie">
      <div>
        {
          moviePoster ? (
            <Link to={{pathname: '/movieDetails/'+props.movie.id }}>
              <img src={paths[ 'imgPath500']+ props.movie.backdrop_path} alt="" />
            </Link>
          ) :
          (
            <div className="no-poster">No Image Available</div>
          )
        }
        <div className="detail">
          <h3>{props.movie.title}</h3>
          {
            props.genres.map(function (genre)
              {
                return <span className="genre" key={genre.id}>{genre.name}</span>;
            })
          }
          <p>Rating: {round(props.movie.vote_average, 1)}<span className="fa fa-star"/></p>
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
