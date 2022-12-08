import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import store from './store';
import { Provider } from 'react-redux';

// styles
import 'slick-carousel/slick/slick.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-input-range/lib/css/index.css';
import './css/2.3aa93140.chunk.css'
import './css/main.2be75501.chunk.css'
import './css/main.7190ffe9.chunk.css'
//import './scss/style.scss';

const rootElement = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <Root/>
    </Provider>),
  rootElement);


