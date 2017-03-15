import { combineReducers } from 'redux';
import {getDetails, movies, getGenres, searchedMovies} from './movieReducers';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  movies,
  searchedMovies,
  getGenres,
  getDetails,
  routing: routerReducer
});

export default rootReducer;
