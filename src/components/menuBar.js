import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MenuItem from '../components/MenuItem';

const MenuBar = (props) => {
    const hasMovies = props.moviesFound;
    return (
    <div className="menu-Items">
      <nav className="navbar navbar-inverse">
          {
          props.data.map((menu)=>{
            return <MenuItem menu={menu} key={menu.id} />;
          })
          }


      </nav>
      <div className="container search-container">
        <span className="fa fa-search"/>
        <input
          className="form-control"
          placeholder="Search for movies"
          type="text"
          value={props.movieToFind}
          onChange={props.clickHandler}/>
      </div>
      {
        hasMovies.length > 0 &&
        <div className="movies-found" onMouseLeave={props.onFocusOut}>
          {
            props.moviesFound.map((movie)=> {
            return (
              <div key={movie.id} className="details">
                <Link to={{pathname: '/movieDetails/'+ movie.id }}>

                  <img src={'https://image.tmdb.org/t/p/w45_and_h67_bestv2'+movie.poster_path} alt="MP" />
                  <div>
                    <span>{movie.title}</span>
                    <span>{movie.releaseYear}</span>
                  </div>
                </Link>
              </div>
            );
            })
          }
        </div>
      }
    </div>
  );
};

MenuBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    routeName: PropTypes.string.isRequired,
    displayName: PropTypes.string
  })),
  movieToFind: PropTypes.string.isRequired,
  moviesFound: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.number
  })),
  onFocusOut: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired
};
export default MenuBar;
