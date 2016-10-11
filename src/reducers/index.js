import { combineReducers } from 'redux';
import {getDetails, movies, getGenres} from './movieReducers';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  movies,
  getGenres,
  getDetails,
  routing: routerReducer
});

export default rootReducer;
