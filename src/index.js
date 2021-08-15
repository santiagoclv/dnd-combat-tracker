import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { ContextWrapper } from './state-manager/context';

import App from './App';
import './App.css';


ReactDOM.render((
    <ContextWrapper>
        <App />
    </ContextWrapper>
), document.getElementById('root'));
