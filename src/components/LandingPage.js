import React, { PropTypes } from 'react';
import { paths } from './../constants/locationSvc';

const LandingPage = (props) => {
  return (
    <div className="home">
      <div className="container">
        <header>
          <h3>React Movie Base</h3>
          <p>Developed By: Khurram Raja, @rak2112</p>
        </header>
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
