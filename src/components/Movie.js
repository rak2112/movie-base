import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './../styles/styles.scss';
import { paths } from './../constants/locationSvc';
export default class Movie extends React.Component {
  render() {
    return (
      <div className="col-md-4 movie">
        <div>
          <img src={paths[ 'imgPath500']+ this.props.movie.backdrop_path} alt="" />
          <div className="detail">
            <h3>{this.props.movie.title}</h3>
            {
              this.props.genres.map(function (genre)
                {
                  return <span className="genre" key={genre.id}>{genre.name}</span>;
              })
            }
            <p>Rating: {this.props.movie.vote_average}</p>
            <Link to={{pathname: '/movieDetails/'+this.props.movie.id }}>View Details</Link>
          </div>
        </div>
      </div>
   );
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired
};
