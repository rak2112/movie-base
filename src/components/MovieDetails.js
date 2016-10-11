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
          <p><span className="attr-name">Ratings:</span> <span>{this.props.data.vote_average}</span></p>
          <p><span className="attr-name">Status:</span> <span>{this.props.data.status}</span></p>
          <p><span className="attr-name">Language:</span> <span>{this.props.data.original_language}</span></p>
          <p><span className="attr-name">RunTime:</span> <span>{this.props.data.runtime} mins</span></p>
          <p><span className="attr-name">Release Date:</span> <span>{this.props.data.release_date}</span></p>
          <p><span className="attr-name">Genres:</span>
            <span>{
              this.props.data.genres.map((genre, index) => {
                if(index < this.props.data.genres.length-1) {
                  return <span key={index}> {genre.name},</span>;
                }
                else {
                  return <span key={index}> {genre.name}</span>;
                }
              })
            }</span>
          </p>
          <p><span className="attr-name">Website</span> <span><a href={this.props.data.runtime}/></span></p>
          <div><span className="attr-name">Cast</span>
            <p>
              {
                this.props.castCrew.cast.map((actor, index) => {
                  if(actor.order < 5 ){
                    return <span key={index}>{actor.name}, </span>;
                  }
                  if(actor.order === 5 ){
                    return <span key={index}>{actor.name}.</span>;
                  }
                })
              }
            </p>
          </div>
          <div><span className="attr-name">Crew</span>
            <p>
              {
                this.props.castCrew.crew.map((crew, index) => {
                  if(index < 5 ) {
                    return <span key={index}>{crew.name}, </span>;
                  }
                  if(index === 5 ){
                    return <span key={index}>{crew.name}.</span>;
                  }
                })
              }
            </p>
          </div>
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
