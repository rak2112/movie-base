import React, {PropTypes} from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { paths } from './../constants/locationSvc';
export default class MovieDetails extends React.Component {
  constructor(props) { 
    super(props);
  }
  render() {
    return (
      <div className="movie-detailst col-lg-12 col-md-12 col-sm-12">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="trail">
            <p>
            {
              this.props.video.results.map((trail, index) => {
                return <span className="trailers" key={index}><a onClick={this.props.clickHandler.bind(this, trail.key)}><i className= "glyphicon glyphicon-play-circle"/>{trail.name}</a></span>;
              })
            }
            </p>
          </div>
          <Carousel>
            {
              this.props.images.map((img, index)=> {
              return <CarouselItem key={index}><img key={index} width={900} height={500} src={paths['imgPath500']+ img.file_path}/></CarouselItem>;
              })
            }
          </Carousel>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <h3>{this.props.data.original_title}</h3>
          <div>
          <span className="attr-name">Storyline:</span>
            <p>
              <span>{this.props.data.overview}</span>
            </p>
          </div>
          <p><span className="attr-name">Ratings:</span> <span>{this.props.data.vote_average}</span><span className="fa fa-star"/></p>
          <p><span className="attr-name">Status:</span> <span>{this.props.data.status}</span></p>
          
          <p><span className="attr-name">Language:</span>
            {
            this.props.data.spoken_languages.map((lang, index)=>{
              return <span key={index} className="btn btn-sm btn-warning">{lang.name}</span>;
            })
            }
          </p>
          <p><span className="attr-name">RunTime:</span> <span>{this.props.data.runtime} mins</span></p>
          <p><span className="attr-name">Release Date:</span> <span>{this.props.data.release_date}</span></p>
          <p><span className="attr-name">Genres:</span>
            <span>{
              this.props.data.genres.map((genre, index) => {
                if(index < this.props.data.genres.length) {
                  return <span key={index} className="btn btn-sm btn-warning"> {genre.name}</span>;
                }
              })
            }</span>
          </p>
          <p><span className="attr-name">Website</span> <span><a href={this.props.data.homepage}>{this.props.data.homepage}</a></span></p>


        </div>
         <div className="cast clearfix">
          <p className="attr-name">Top Cast</p>
            {   this.props.castCrew.cast.map((actor, index) => {
                    if(actor.order < 6 ){
                      return (
                        <li key={index}>
                          <div className="cast-detail">
                            <div className="profile">
                              {
                                actor.profile_path ? <img src={'https://image.tmdb.org/t/p/w264_and_h264_bestv2'+actor.profile_path} alt="PP" />
                                : <div className="initials">{actor.name}</div>
                              }
                            </div>
                            <p>
                              <span>{actor.name}</span>
                              <span>{actor.character}</span>
                            </p>
                          </div>
                        </li>  
                      );
                    }
                })
            }
          </div>
          <div className="crew cast clearfix">
            <p className="attr-name">Crew</p>
              {   this.props.castCrew.crew.map((crew, index) => {
                      if(index < 6 ){
                        return (
                          <li key={index}>
                            <div className="cast-detail">
                              <div className="profile">
                                {
                                  crew.profile_path ? <img src={'https://image.tmdb.org/t/p/w264_and_h264_bestv2'+crew.profile_path} alt="PP" />
                                  : <div className="initials">{crew.name}</div>
                                }
                              </div>
                              <p>
                                <span>{crew.name}</span>
                                <span>{crew.job}</span>
                              </p>
                            </div>
                          </li>  
                        );
                      }
                  })
              }
          </div>
      </div>
  );
}
}
MovieDetails.propTypes = {
  data: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
  video: PropTypes.object.isRequired,
  castCrew: PropTypes.object.isRequired,
  clickHandler: PropTypes.func
};
