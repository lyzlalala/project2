import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/configureStore';
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.min.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);//edit 123 4312345444444