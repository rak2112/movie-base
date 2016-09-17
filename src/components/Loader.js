import React from 'react';
class Loader extends React.Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div className="alert alert-info" role="alert">
      <i className="glyphicon glyphicon-repeat gly-spin"/>
      <span>Loading....</span>
      </div>
    );
  }
}
export default Loader;
