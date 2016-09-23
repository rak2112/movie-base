import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Popular from '../components/Popular';

describe('<Popular Component/>', () => {

  it(`should have correct props`, () => {
    const state = {
      route: {path: 'Popular'}
    };
    const wrapper = shallow(<Popular route={state.route}/>);
    const movies = wrapper.find('Connect(Movies)');
    expect(movies.prop('route').path).to.equal('Popular');
    expect(movies.prop('pageName')).to.equal('Most Popular Movies');
  });
});
