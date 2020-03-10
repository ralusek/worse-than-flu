import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';

import bootstrapRouter from 'bootstrap/router';

import RootContainer from './app';
import './index.scss';


console.log('App Bootstrapping.');

const history = bootstrapRouter();



// const RootContainer = require('./app/root/root-container.js').default;
ReactDOM.render(
  <Router history={history}>
    <RootContainer />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
