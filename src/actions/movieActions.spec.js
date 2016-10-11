
import * as ActionCreators from './movieActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import fetchMock from 'fetch-mock';
chai.use(sinonChai);

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions', () => {
  beforeEach(()=>{
    fetchMock.restore();
  });


  it('should create an action to load Success', () => {
    const expected = {
      type: 'LOAD_SUCCESS',
      res: 'res',
      pageNo: 1
    };
    expect(ActionCreators.loadSuccess('res', 1)).to.deep.equal(expected);
  });
  it('should create an action to load error', () => {
    const expected = {
      type: 'LOAD_ERROR',
      res: 'res'
    };
    expect(typeof (ActionCreators.loadError())).to.equal('object');
    expect(ActionCreators.loadError('res')).to.deep.equal(expected);
  });
  it('should create an action to open Modal', () => {
    const expected = {
      type: 'OPEN_MODAL',
      key: 'KEY_2'
    };
    expect(typeof (ActionCreators.openModal())).to.equal('object');
    expect(ActionCreators.openModal('KEY_2')).to.deep.equal(expected);
  });

  it('should create an action to load genres', () => {
    fetchMock.get('*', ['genres']);
    const expected = [{type:'LOADING_GENRE',res:[ 'genres' ]}];
    const store = mockStore({ res: [] });
    return store.dispatch(ActionCreators.loadGenres())
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expected);
      });
  });

  it('should create an action to load Movies', () => {
    fetchMock.get('*', ['movies']);
    const expected = [{type:'LOAD_SUCCESS',res:[ 'movies' ],pageNo: 1}];
    const store = mockStore({ res: [] });
    return store.dispatch(ActionCreators.loadMovies(1))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expected);
      });
  });
  it('should create an action to load Movies for an error', () => {
    fetchMock.get('*', 404);
    const expected = [{type:'LOAD_ERROR',res:new Error('Not Found')}];
    const store = mockStore({ res: [] });
    return store.dispatch(ActionCreators.loadMovies(1))
      .then(() => { // return of async actions
        //console.log('store',store.getActions());
        expect(store.getActions()).to.deep.equal(expected);
      });
  });

  it('should create an action to getVideoDetails', () => {
    fetchMock.get('*', ['movies']);
    const expected = [{type:'LOAD_VIDEOS',res:[ 'movies' ]}];
    const store = mockStore({ res: [] });
    return store.dispatch(ActionCreators.getVideoDetails('movieId:'))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expected);
      });
  });

  it('should create an action to getLatest', () => {
    fetchMock.get('*', ['movies']);
    const expected = [{type:'LOAD_SUCCESS',res:[ 'movies' ],pageNo: 4}];
    const store = mockStore({ res: [] });
    return store.dispatch(ActionCreators.loadMovies(4))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expected);
      });
  });

  it('should create an action to getPopular for an error', () => {
    fetchMock.get('*', 500);
    const expected = [{type:'LOAD_ERROR',res:new Error('Internal Server Error')}];
    const store = mockStore({ res: [] });
    return store.dispatch(ActionCreators.getPopular(1))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expected);
      });
  });

  it('should create an action to getUpComing', () => {
    fetchMock.get('*', ['movies']);
    const expected = [{type:'LOAD_SUCCESS',res:[ 'movies' ],pageNo: 1}];
    const store = mockStore({ res: [] });
    return store.dispatch(ActionCreators.getUpComing(1))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expected);
      });
  });
});
