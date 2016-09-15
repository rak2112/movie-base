import React, {PropTypes} from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { paths } from './../constants/locationSvc';
export default class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="movie-details col-md-12">
        <div className="col-md-6">
          <Carousel>
          {
            this.props.images.map((img, index)=> {
            return <CarouselItem key={index}><img key={index} width={900} height={500} src={paths['imgPath500']+ img.file_path}/></CarouselItem>;
            })
          }
        </Carousel>
        <div><span className="attr-name">Trailers:</span>
        <p>
        {
          this.props.video.results.map((trail, index) => {
            return <span className="trailers" key={index}><a onClick={this.props.clickHandler.bind(this, trail.key)}><i className= "glyphicon glyphicon-play-circle"/>{trail.name}</a></span>;
          })
        }
        </p>
      </div>
    </div>
    <div className="col-md-6">
      <h3>{this.props.data.original_title}</h3>
      <div><span className="attr-name">Storyline:</span>
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
            return <span key={index}>{genre.name},</span>;
          })
        }</span>
      </p>
      <p><span className="attr-name">Website</span> <span><a href={this.props.data.runtime}/></span></p>
      <div><span className="attr-name">Cast</span>
        <p>
          {
            this.props.castCrew.cast.map((actor, index) => {
              return <span key={index}>{actor.name}, </span>;
            })
          }
        </p>
      </div>
      <div><span className="attr-name">Crew</span>
        <p>
          {
            this.props.castCrew.crew.map((crew, index) => {
              return <span key={index}>{crew.name}, </span>;
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
