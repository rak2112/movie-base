import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import LadingPage from '../components/LandingPage';

describe('<LadingPage />', () => {

  it(`should give a 'home' class and have one image`, () => {
    const state = {
      movies: {items:[{backdrop_path: 'XYZ'}]}
    };
    const wrapper = shallow(<LadingPage movies={state.movies}/>);
    const actual = wrapper.find('.home').length;
    const img = wrapper.find('img');
    expect(actual).to.equal(1);
    expect(img.prop('src')).to.equal('http://image.tmdb.org/t/p/w500XYZ');
  });

  it(`should give a 'home' class and have two image`, () => {
    const state = {
      movies: {items:[{backdrop_path: 'XYZ'}, {backdrop_path: 'ABC'}]}
    };
    const wrapper = shallow(<LadingPage movies={state.movies}/>);
    const actual = wrapper.find('.home').length;
    const img = wrapper.find('.movie-img').length;
    expect(actual).to.equal(1);
    expect(img).to.equal(2);
  });
});
