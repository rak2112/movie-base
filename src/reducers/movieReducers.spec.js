import * as Reducers from './../reducers/movieReducers';
import { expect } from 'chai';

const genreState = {
  genres: ['adventure']
};

describe(`Reducer getGenres`, () => {
  it('should set initial state by default', ()=>{
    const action = {type: 'unknown'};
    const expectedState = {genres: []};
    expect(Reducers.getGenres(undefined, action)).to.deep.equal(expectedState);
  });

  it('should set state when called with correct action type', ()=>{
    const action = {type: 'LOADING_GENRE', res: {genres:['action']}};
    const expectedState = {genres: [ 'action' ]};
    expect(Reducers.getGenres(genreState, action)).to.deep.equal(expectedState);
  });

  it('should set state when called with correct action type', ()=>{
    const action = {type: 'LOADING_GENRE', res: {genres:['fantasy', 'thriller']}};
    const expectedState = {genres: [ 'fantasy', 'thriller' ]};
    expect(Reducers.getGenres(genreState, action)).to.deep.equal(expectedState);
  });
});

const detailsDefaultState = {
  errorDetails: false,
  fetchingDetails:true,
  fetchingVideos: true,
  fetchingCast:true,
  fetchingImgs:true,
  showModal:false,
  utubeKey:null,
  details:{},
  videos:{},
  images:{}
};

describe(`Reducer getDetails`, () => {
  it('should set initial state by default', ()=>{
    const action = {type: 'unknown'};

    expect(Reducers.getDetails(undefined, action)).to.deep.equal(detailsDefaultState);
  });

  it('should set state with action type of `ERROR_DETAILS`', ()=>{
    const action = {type: 'ERROR_DETAILS'};
    expect(Reducers.getDetails(detailsDefaultState, action).errorDetails).to.equal(true);
  });

  it('should set state with action type of `LOADING_DETAILS`', ()=>{
    const action = {type: 'LOADING_DETAILS', res: {details: 'details'}};
    expect(Reducers.getDetails(detailsDefaultState, 'unknown').fetchingDetails).to.equal(true);
    expect(Reducers.getDetails(detailsDefaultState, action).fetchingDetails).to.equal(false);
    expect(Reducers.getDetails(detailsDefaultState, action).details).to.deep.equal({ details: 'details' });
  });

  it('should set state with action type of `OPEN_MODAL`', ()=>{
    const action = {type: 'OPEN_MODAL', key: 'videoKey/XYZ_MOCK'};
    expect(Reducers.getDetails(detailsDefaultState, 'unknown').showModal).to.equal(false);
    expect(Reducers.getDetails(detailsDefaultState, action).showModal).to.equal(true);
    expect(Reducers.getDetails(detailsDefaultState, action).utubeKey).to.equal('videoKey/XYZ_MOCK');
  });

});

const moviesDefaultState = {
  isFetching:true,
  pageNo:1,
  totalPages: 1,
  items: [],
  totalItems:[]
};

describe(`Reducer movies`, () => {
  it('should set initial state by default', ()=>{
    const action = {type: 'unknown'};

    expect(Reducers.movies(undefined, action)).to.deep.equal(moviesDefaultState);
  });

  it('should set state with action type of `LOAD_SUCCESS`', ()=>{
    const action = {type: 'LOAD_SUCCESS', pageNo: 4, res:{total_results:25, total_pages: 2, results:['results']}};
    expect(Reducers.movies(moviesDefaultState, action).isFetching).to.equal(false);
    expect(Reducers.movies(moviesDefaultState, action).pageNo).to.equal(4);
    expect(Reducers.movies(moviesDefaultState, action).totalItems).to.equal(25);
    expect(Reducers.movies(moviesDefaultState, action).items).to.deep.equal(['results']);
  });

});
