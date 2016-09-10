import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import App from './components/App';
import Home from './components/Home';
import HomePage from './components/HomePage';
import Latest from './components/Latest';
import Movies from './components/Movies';
import Details from './components/Details';

import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={Home}>
    <IndexRoute component={HomePage}/>
    <Route path="movies" component={Movies} />
      <Route path="latest" component={Latest} />
      <Route path="movieDetails/:movieId" component={Details} />

    <Route path="fuel-savings" component={FuelSavingsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
