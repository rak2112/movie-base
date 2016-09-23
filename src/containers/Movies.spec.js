import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Movies} from '../components/Movies';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MovieList from '../containers/MovieList';

describe('<Container component Movies />', () => {
  it('should contain <Loader /> if its loading', () => {
    const state = {isFetching: true, isError: false, items:[], genres:[], route:{path:''}, dispatch: ()=>{}};
    const wrapper = shallow(<Movies isFetching = {state.isFetching}
                                    isError={state.isError}
                                    items={state.items}
                                    genres={state.genres}
                                    dispatch={state.dispatch}
                                    route={state.route}/>);
    expect(wrapper.find(Loader)).to.be.length(1);
    expect(wrapper.find(MovieList)).to.be.length(0);
  });

  it('should contain <MovieList /> if loading has been done', () => {
    const state = {isFetching: false, isError: false, items:[], genres:[], route:{path:''}, dispatch: ()=>{}};
    const wrapper = shallow(<Movies isFetching = {state.isFetching}
                                    isError={state.isError}
                                    items={state.items}
                                    genres={state.genres}
                                    dispatch={state.dispatch}
                                    route={state.route}/>);

    expect(wrapper.find(Loader)).to.be.length(0);
    expect(wrapper.find(MovieList)).to.be.length(1);

  });

  it('should contain <Error /> if there is something wrong', () => {
    const state = {isFetching: false, isError: true, items:[], genres:[], route:{path:''}, dispatch: ()=>{}};
    const wrapper = shallow(<Movies isFetching = {state.isFetching}
                                    isError={state.isError}
                                    items={state.items}
                                    genres={state.genres}
                                    dispatch={state.dispatch}
                                    route={state.route}/>);

    expect(wrapper.find(Loader)).to.be.length(0);
    expect(wrapper.find(MovieList)).to.be.length(0);
    expect(wrapper.find(Error)).to.be.length(1);
  });
});
