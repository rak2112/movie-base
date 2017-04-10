import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import MovieModal from '../components/Modal';
import MovieDetails from '../components/MovieDetails';
import Loader from '../components/Loader';
import Error from '../components/Error';
import {Details} from '../containers/Details';

chai.use(sinonChai);

describe('<Container component Details />', () => {
  it('should contain <Error /> if something gone wrong with req', () => {
    const state = {
      getDetails: {
        fetchingDetails: true,
        errorDetails: true,
        fetchingVideos: false,
        fetchingCast: true,
        fetchingImgs: true,
        showModal: true,
        details: {},
        videos: {},
        utubeKey: '/xyzABC',
        images: [],
        castCrew: {}
      },
      params: {movieId: '4444'},
      getModal: () =>{},
      closeModal: () =>{},
      dispatch: () =>{}};
    const wrapper = shallow(<Details {...state}/>);
    expect(wrapper.find(Loader)).to.be.length(0);
    expect(wrapper.find(Error)).to.be.length(1);
  });
  it('should contain <Loader /> if its loading', () => {
    const state = {
      getDetails: {
        fetchingDetails: true,
        errorDetails: false,
        fetchingVideos: true,
        fetchingCast: true,
        fetchingImgs: true,
        showModal: true,
        details: {},
        videos: {},
        utubeKey: '/xyzABC',
        images: [],
        castCrew: {}
      },
      params: {movieId: '4444'},
      getModal: () =>{},
      closeModal: () =>{},
      dispatch: () =>{}};
    const wrapper = shallow(<Details {...state}/>);
    expect(wrapper.find(Loader)).to.be.length(1);
  });

  it('should contain <MovieModal/> and <MovieDetails/> when loading done', () => {
    const state = {
      getDetails: {
        fetchingDetails: false,
        errorDetails: false,
        fetchingVideos: false,
        fetchingCast: false,
        fetchingImgs: false,
        showModal: false,
        details: {key: 'val'},
        videos: {results:[1,2]},
        utubeKey: '/utubeKey',
        images: [{img: 'movieImg'}],
        castCrew: {cast:[{key: 1}, {key:4}], crew: [{key:2}]}
      },
      params: {movieId: '4444'},
      getModal: () =>{},
      closeModal: sinon.spy(),
      dispatch: () =>{}};
    const wrapper = shallow(<Details {...state}/>);

    expect(wrapper.find(MovieModal).prop('closeModal')).to.be.instanceof(Function);
    wrapper.find('MovieModal').prop('closeModal')();
    expect(state.closeModal).to.have.been.called;

    expect(wrapper.find(MovieModal).prop('showModal')).to.equal(false);
    expect(wrapper.find(MovieModal).prop('videoKey')).to.equal('/utubeKey');
    expect(wrapper.find(MovieDetails).prop('data').key).to.equal('val');
    expect(wrapper.find(MovieDetails).prop('video').results.length).to.equal(2);
    expect(wrapper.find(MovieDetails).prop('images').length).to.equal(1);
    expect(wrapper.find(MovieDetails).prop('castCrew').cast.length).to.equal(2);
    expect(wrapper.find(MovieDetails).prop('castCrew').crew.length).to.equal(1);

  });
});
