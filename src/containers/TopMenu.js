import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuBar from './../components/menuBar';
import { menuData } from './../constants/locationSvc';
import { searchMovies, resetQuickSearch } from '../actions/movieActions';

class TopMenu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {menuData: menuData, movieToFind: ''};
  }
  render() {
    return (
    <div>
      <MenuBar 
        data={this.state.menuData} 
        movieToFind={this.state.movieToFind} 
        moviesFound={this.props.moviesFound}
        onFocusOut={this.props.onFocusOut.bind(this)}
        clickHandler={this.props.handleNameChange.bind(this)}/>
       {this.props.children}
    </div>
  );
 }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch: dispatch,
    onFocusOut() {
      let { dispatch } = this.props;
      this.setState({movieToFind: ''});
      dispatch(resetQuickSearch());
    },
    updateSearch() {
      let { dispatch } = this.props;
      dispatch(searchMovies(this.state.movieToFind));
    },
    handleNameChange: function(event) {
      event.persist();
      this.setState({ movieToFind: event.target.value }, this.props.updateSearch);
    }
  };
}

function mapStateProps(state) {
  const { searchedMovies } = state;
  const { moviesFound } = searchedMovies;
  return {
    moviesFound
  };
}

TopMenu.propTypes = {
  children: PropTypes.object.isRequired,
  moviesFound: PropTypes.array.isRequired,
  onFocusOut: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired
};

export default connect(mapStateProps, mapDispatchToProps) (TopMenu);
