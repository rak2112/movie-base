import React, { PropTypes } from 'react';
import {Pagination} from 'react-bootstrap';

export default
class MoviesPagination extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(activePage) {
    this.props.onPageChange(activePage);
  }
  render() {
    return (
     <div className="footer"> 
      <Pagination
        prev
        next
        first
        last
        ellipsis
        maxButtons={5}
        items={this.props.itemToDisplay}
        activePage={this.props.pageNo}
        onSelect={this.handleSelect} />
      </div>  
    );
  }
}

MoviesPagination.propTypes = {
  pageNo: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemToDisplay: PropTypes.number
};
