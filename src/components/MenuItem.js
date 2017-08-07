import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ACTIVE = { background: '#000', color: '#ff5c00', borderBottom: '4px solid', paddingBottom: '8px'};

const MenuItem = (props) =>{
  return (
    <li className="menu-item">
      <Link to={props.menu.routeName} activeStyle={ACTIVE}>{props.menu.displayName}</Link>
    </li>
  );
};

MenuItem.propTypes = {
  menu: PropTypes.object.isRequired
};

export default MenuItem;
