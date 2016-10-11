import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import App from './components/App';
import Home from './components/Home';
import HomePage from './containers/HomePage';
import Latest from './components/Latest';
import Popular from './components/Popular';
import Movies from './containers/Movies'; // eslint-disable-line import/no-named-as-default
import UpComing from './components/UpComing';
import Details from './containers/Details'; // eslint-disable-line import/no-named-as-default

import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={Home}>
    <IndexRoute component={HomePage}/>
    <Route path="movies" component={Movies} />
      <Route path="latest" component={Latest} />
      <Route path="popular" component={Popular} />
      <Route path="upComing" component={UpComing} />
      <Route path="movieDetails/:movieId" component={Details} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
