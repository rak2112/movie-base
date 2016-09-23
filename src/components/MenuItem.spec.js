import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import MenuItem from '../components/MenuItem';

describe('<MenuItem />', () => {

  it(`should give a 'menu-item' class`, () => {
    const state = {
      menu: {routeName: 'home', displayName: 'Home'}
    };
    const wrapper = shallow(<MenuItem menu={state.menu}/>);
    const actual = wrapper.find('.menu-item').length;
    expect(actual).to.equal(1);
  });

  it(`should have a '<link/>' component with correct props`, () => {
    const state = {
      menu: {routeName: 'home', displayName: 'Home'}
    };
    const wrapper = shallow(<MenuItem menu={state.menu}/>);
    const link = wrapper.find('Link');
    const actual = wrapper.find('.menu-item').length;
    expect(actual).to.equal(1);
    expect(link.prop('to')).to.equal('home');
    expect(link.prop('children')).to.equal('Home');
  });

});
