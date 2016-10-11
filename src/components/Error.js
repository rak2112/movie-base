import React, {PropTypes} from 'react';
const Error = (props) => {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Oh snap!</strong> Sorry not able to complete your request  <strong>( Status: {props.errorStatus}</strong> )
    </div>
  );
};

Error.propTypes = {
  errorStatus: PropTypes.string
};
export default Error;
