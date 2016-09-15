import Movies from './Movies';
import React, { PropTypes } from 'react';

class UpComing extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (<Movies route={this.props.route}/>);
  }
}

UpComing.propTypes = {
  route: PropTypes.object.isRequired
};

export default UpComing;
