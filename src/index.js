import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';

import './App.css';

try {
    const string_state = localStorage.getItem("storedState");
    const state = string_state ? JSON.parse(string_state) : null;
    ReactDOM.render(<App storedState={state} />, document.getElementById('root'));
} catch (error) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

