import React, { PropTypes } from 'react';
import MenuBar from './menuBar';
import { menuData } from './../constants/locationSvc';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {menuData: menuData};
  }
  render() {
    return (
    <div>
      <div>HOME PAGE...</div>
      <MenuBar data={this.state.menuData}/>
       {this.props.children}
    </div>
  );
 }
}

Home.propTypes = {
  children: PropTypes.object.isRequired
};

export default Home;
