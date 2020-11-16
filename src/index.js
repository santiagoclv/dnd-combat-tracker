import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import './App.css';

const initialState = { initiatives: [], selected: null, inputInitiative: 0, inputName: '', inputHitpoints: 0 };

try {
    const string_state = localStorage.getItem("storedState");
    const state = string_state ? JSON.parse(string_state) : initialState;
    state.selected = null;
    ReactDOM.render(<App storedState={state} initialState={initialState} />, document.getElementById('root'));
} catch (error) {
    ReactDOM.render(<App initialState={initialState}  />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();