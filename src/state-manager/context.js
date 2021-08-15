import React, { createContext, useContext, useReducer, useEffect } from 'react';
import isEqual from 'lodash/isEqual';

import { reducer, initialState, init, STORED_STATE } from './reducer';

export const StateContext = createContext();


export const ContextWrapper = ({ children }) => {
    const store = useReducer(reducer, initialState, init);

    useEffect(() => {
        // Persist state on local storage.
        const [ state ] = store;
        if(!isEqual(state, initialState)){
            localStorage.setItem(STORED_STATE, JSON.stringify(state));
        }
    }, [store]);

    return (
        <StateContext.Provider value={store}>
            { children }
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);