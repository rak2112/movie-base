import React from 'react';
import {Pagination} from 'react-bootstrap';

let mountNode = document.getElementById('pagination');
export default
class PaginationAdvanced extends React.Component {
  constructor() {
    super();
    this.state = {activePage: 1};
  }

  handleSelect(event, selectedEvent) { //console.log('evt',event,'thissss',selectedEvent);
    event.preventDefault();
    this.setState({
      activePage: selectedEvent.eventKey
    });
    this.props.onPageChange(selectedEvent.eventKey);
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
        onSelect={this.handleSelect.bind(this)} />
    );
  }
}
