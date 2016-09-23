import React, { PropTypes } from 'react';
import MenuItem from '../components/MenuItem';

 const MenuBar = (props)=>{
  return (
    <div className="menu-Items">
      <nav className="navbar navbar-inverse">
        {
         props.data.map( (menu)=>{
           return <MenuItem menu ={menu} key= {menu.id} />;
         })
        }
      </nav>
    </div>
  );
};

MenuBar.propTypes = {
  data: PropTypes.array.isRequired
};

export default MenuBar;
