import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './../styles/styles.scss';
import { paths } from './../constants/locationSvc';
class Movie extends React.Component {
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
            <Link to={{pathname: 'movieDetails/'+this.props.movie.id }}>View Details</Link>
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
//Movie.propTypes = { // movie: React.proptTypes.object.isRequired, //};
export default class MovieList extends React.Component {
  constructor() {
    super();
   }
   render() {
     const movieNodes = this.props.data.map((movie)=> {
       let genres = [];
         movie.genre_ids.forEach((elem) => {
           let genre = this.props.genre.filter((item)=> {
             return item.id === elem;
            });
             genres = [...genres, ...genre]; //concatinating both arrays...
          });
        return (
          <Movie movie={movie} key={movie.id} genres={genres}>
            {movie.title}
          </Movie>
        );
      });

     return (
      <div className="movieList">
        {movieNodes}
      </div>
  );
  }
}
MovieList.propTypes = {
  genre: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};
