import React from 'react';
import { Route, IndexRoute } from 'react-router';

import TopMenu from './containers/TopMenu';
import HomePage from './containers/HomePage'; // eslint-disable-line import/no-named-as-default
import Latest from './components/Latest';
import Popular from './components/Popular';
import Movies from './containers/Movies'; // eslint-disable-line import/no-named-as-default
import UpComing from './components/UpComing';
import Details from './containers/Details'; // eslint-disable-line import/no-named-as-default

import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={TopMenu}>
    <IndexRoute component={HomePage}/>
    <Route path="home" component={HomePage} />
    <Route path="movies" component={Movies} />
    <Route path="latest" component={Latest} />
    <Route path="popular" component={Popular} />
    <Route path="upComing" component={UpComing} />
    <Route path="movieDetails/:movieId" component={Details} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);