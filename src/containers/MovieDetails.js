/** * Created by kraja2 on 03/08/2015. */
import React, {PropTypes} from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { paths } from './../constants/locationSvc';


export default class MovieDetails extends React.Component
{
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="movie-details col-md-12">
            <div className="col-md-6">
              <Carousel>
                {
                  this.props.images.map((img, index)=> { console.log('index', index);
                    return <CarouselItem key={index}><img key={index} width={900} height={500} src={paths['imgPath500']+ img.file_path}/></CarouselItem>;
                  })
                }
              </Carousel>
              <div><span className="attr-name">Trailers:</span>
                <p>

                  {
                     this.props.video.results.map((trail) => {
                       return <span className="trailers" key={trail.id}><a onClick={this.props.clickHandler.bind(this, trail.key)}><i className= "glyphicon glyphicon-play-circle"/>{trail.name}</a></span>;
                     })
                  }

                </p>
              </div>
            </div>
            <div className="col-md-6">
              <h3>{this.props.data.original_title}</h3>
              <p><span className="attr-name">Storyline:</span>
                <p>
                  <span>{this.props.data.overview}</span>
                </p>
              </p>
              <p><span className="attr-name">Ratings:</span> <span>{this.props.data.vote_average}</span></p>
              <p><span className="attr-name">Status:</span> <span>{this.props.data.status}</span></p>
              <p><span className="attr-name">Language:</span> <span>{this.props.data.original_language}</span></p>
              <p><span className="attr-name">RunTime:</span> <span>{this.props.data.runtime} mins</span></p>
              <p><span className="attr-name">Release Date:</span> <span>{this.props.data.release_date}</span></p>
              <p><span className="attr-name">Genres:</span>
               <span>{
                 this.props.data.genres.map((genre) => {
                   return <span key={genre.id}>{genre.name},</span>;
                 })
               }</span>
               </p>
               <p><span className="attr-name">Website</span> <span><a href={this.props.data.runtime}/></span></p>

              <p><span className="attr-name">Cast</span>
                <p>
                  <span>{
                    this.props.castCrew.cast.map((actor) => {
                      return <span key={actor.id}>{actor.name}, </span>;
                    })
                  }</span>
                </p>
               </p>

               <p><span className="attr-name">Crew</span>
                <p>
                  <span>{
                    this.props.castCrew.crew.map((crew) => {
                      return <span key={crew.credit_id}>{crew.name}, </span>;
                    })
                  }</span>
                </p>

               </p>
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
