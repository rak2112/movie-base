import React, { PropTypes } from 'react';
import {Pagination} from 'react-bootstrap';

export default
class MoviesPagination extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {activePage: 1};
  }

  handleSelect(activePage) {
    this.setState({
      activePage: activePage
    });
    this.props.onPageChange(activePage);
  }

  render() {
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        maxButtons={5}
        items={this.props.itemToDisplay}
        activePage={this.state.activePage}
        onSelect={this.handleSelect} />
    );
  }
}

MoviesPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  itemToDisplay: PropTypes.number.isRequired
};
