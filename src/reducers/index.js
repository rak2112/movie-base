import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import {getDetails, movies, getGenres} from './movieReducers';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  movies,
  getGenres,
  getDetails,
  routing: routerReducer
});

export default rootReducer;
