import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import MenuBar from '../components/menuBar';

describe('<MenuBar />', () => {

  it(`should give a 'menu-items' class`, () => {
    const state = {
      data: [{menu: 'menu', id: 'myId'}]
    };
    const wrapper = shallow(<MenuBar data={state.data}/>);
    const item = wrapper.find('MenuItem');
    const actual = wrapper.find('.menu-Items').length;
    expect(actual).to.equal(1);
    expect(item.prop('menu').menu).to.equal('menu');
  });
});
