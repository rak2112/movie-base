import React, { propTypes } from 'react';
import { Link } from 'react-router';

const ACTIVE = { background: '#000', color: '#ff5c00'}


class MenuItem extends React.Component{
  render() {
    return (
      <li className="menu-item">
        <Link to={this.props.menu.routeName} activeStyle={ACTIVE}>{this.props.menu.displayName}</Link>
      </li>
    );
  }
}

export default class MenuBar extends React.Component{
  constructor(){
    super()
  }
  render() {
    var menuNodes = this.props.data.map(function (menu) {
      return (
        <MenuItem menu ={menu} key= {menu.id} />
      );
    });
    return (
      <div className="menu-Items">
      <nav className="navbar navbar-inverse">
         {menuNodes}
      </nav>

      </div>
    );
  }
}
