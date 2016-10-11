import Movies from './../containers/Movies'; // eslint-disable-line import/no-named-as-default
import React, { PropTypes } from 'react';

class Latest extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (<Movies route={this.props.route} pageName={"Latest Movies"}/>);
  }
}
Latest.propTypes = {
  route: PropTypes.object.isRequired
};
export default Latest;
