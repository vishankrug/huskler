import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import {BrowserRouter} from 'react-router-dom'
import SAMPLE_EVENTS from './events.json'
import SAMPLE_PEOPLE from './people.json'


ReactDOM.render(
  <BrowserRouter>
    <App events={SAMPLE_EVENTS} people={SAMPLE_PEOPLE}/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

