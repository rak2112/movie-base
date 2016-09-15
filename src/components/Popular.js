import Movies from './Movies';
import React, { PropTypes } from 'react';

class Popular extends React.Component {
  constructor () {
    super()
  }
  render () {
    return (<Movies route={this.props.route}/>);
  }
}

Popular.propTypes = {
  route: PropTypes.object.isRequired
};

export default Popular;
