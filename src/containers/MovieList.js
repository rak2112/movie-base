import React, { PropTypes } from 'react';
import './../styles/styles.scss';
import Movie from './../components/Movie';

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
