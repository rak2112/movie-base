import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Movies} from '../containers/Movies';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MovieList from '../components/MovieList';

describe('<Container component Movies />', () => {
  it('should contain <Loader /> if its loading', () => {
    const state = {isFetching: true, isError: false, pageNo:1, items:[], genres:[], route:{path:''}, dispatch: ()=>{}};
    const wrapper = shallow(<Movies {...state}/>);
    expect(wrapper.find(Loader)).to.be.length(1);
    expect(wrapper.find(MovieList)).to.be.length(0);
  });

  it('should contain <MovieList /> if loading has been done', () => {
    const state = {isFetching: false, isError: false, pageNo:1, items:[], genres:[], route:{path:''}, dispatch: ()=>{}};
    const wrapper = shallow(<Movies {...state}/>);

    expect(wrapper.find(Loader)).to.be.length(0);
    expect(wrapper.find(MovieList)).to.be.length(1);

  });

  it('should contain <Error /> if there is something wrong', () => {
    const state = {isFetching: false, hasError: true, pageNo:1, items:[], genres:[], route:{path:''}, dispatch: ()=>{}};
    const wrapper = shallow(<Movies {...state}/>);

    expect(wrapper.find(Loader)).to.be.length(0);
    expect(wrapper.find(MovieList)).to.be.length(0);
    expect(wrapper.find(Error)).to.be.length(1);
  });
});
