import Movies from './Movies';
import React, { PropTypes } from 'react';

class Latest extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (<Movies route={this.props.route}/>);
  }
}
Latest.propTypes = {
  route: PropTypes.object.isRequired
};
export default Latest;
