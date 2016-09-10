import React from 'react';
import MenuBar from './menuBar';

let menuData = [
  {id:1, routeName:'movies', displayName:'All Movies'},
  {id:2, routeName:'latest', displayName:'Latest'},
  {id:3, routeName:'popular', displayName:'Popular'},
  {id:4, routeName:'upComing', displayName:'Up Coming'}
];

class Home extends React.Component {
  constructor (props) {
    super(props); //context.router;
    this.state = {menuData: menuData};
  }
  render() {
    return (
    <div>
      <div>HOME PAGE...</div>
      <MenuBar data={this.state.menuData}/> {this.props.children}
    </div>
  );
 }
};
//Home.contextTypes = { // router: React.PropTypes.func //};
 export default Home;
