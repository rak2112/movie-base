import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';


import {HomePage} from '../containers/HomePage';
import Loader from '../components/Loader';
import LandingPage from '../components/LandingPage';

describe('<Container component HomePage />', () => {
  it('should contain <Loader /> when its still fetching', () => {
    const state = {
        movies: {isFetching: true},
        getMovies: ()=>{}
      };
    const wrapper = shallow(<HomePage {...state}/>);
    expect(wrapper.find(Loader)).to.be.length(1);
    expect(wrapper.find(LandingPage)).to.be.length(0);
  });

  it('should contain <LandingPage /> when fetching done', () => {
    const state = {
        movies: {isFetching: false, results:['movie1', 'movie2']},
        getMovies: ()=>{}
      };
    const wrapper = shallow(<HomePage {...state}/>);
    //console.log('wrap',wrapper.debug());
    expect(wrapper.find(Loader)).to.be.length(0);
    expect(wrapper.find(LandingPage).prop('movies').results.length).to.equal(2);
  });
});
