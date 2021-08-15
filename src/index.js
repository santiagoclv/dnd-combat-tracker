import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';

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