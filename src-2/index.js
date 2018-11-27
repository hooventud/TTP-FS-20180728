import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Main />
    </Provider>
  </Router>,
  document.getElementById('app')
);
