import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import UpComing from '../components/UpComing';

describe('<UpComing Component/>', () => {

  it(`should have correct props`, () => {
    const state = {
      route: {path: 'upComing'}
    };
    const wrapper = shallow(<UpComing route={state.route}/>);
    const movies = wrapper.find('Connect(Movies)');
    expect(movies.prop('route').path).to.equal('upComing');
    expect(movies.prop('pageName')).to.equal('Up Coming Movies');
  });
});
