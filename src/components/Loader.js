import React from 'react';
const Loader = () => {
  return (
    <div className="alert alert-info" role="alert">
      <i className="glyphicon glyphicon-repeat gly-spin"/>
      <span>Loading....</span>
    </div>
  );
};
export default Loader;
