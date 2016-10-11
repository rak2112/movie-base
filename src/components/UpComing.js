import Movies from './../containers/Movies'; // eslint-disable-line import/no-named-as-default
import React, { PropTypes } from 'react';

class UpComing extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (<Movies route={this.props.route} pageName={"Up Coming Movies"}/>);
  }
}

UpComing.propTypes = {
  route: PropTypes.object.isRequired
};

export default UpComing;
