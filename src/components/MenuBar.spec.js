import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import MenuBar from '../components/menuBar';

describe('<MenuBar />', () => {

  it(`should give a 'menu-items' class`, () => {
    const state = {
      data: [{menu: 'menu', id: 1, routeName: 'root', displayName: 'something'}],
      movieToFind: '',
      onFocusOut: ()=>{},
      clickHandler:()=>{},
      moviesFound: [{movie: 1, id: 1, title: 'abc'}, {movie: 2, id:2, title: 'xyz'}]
    };
    const wrapper = shallow(<MenuBar {...state} />);
    const item = wrapper.find('MenuItem');
    const actual = wrapper.find('.menu-Items').length;
    expect(actual).to.equal(1);
    expect(item.prop('menu').menu).to.equal('menu');
  });
});
