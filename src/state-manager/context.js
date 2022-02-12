import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

import { 
    reducer as initiativesReducer,
    initialState as initiativesInitialState,
} from './initiatives/reducer';
import { saveState, getInitialState } from './initiatives/storage-data';

import { 
    reducer as charactersReducer,
    initialState as charactersInitialState,
} from './characters/reducer';
import { saveCharacters, getInitialCharacters } from './characters/storage-data';

const StateContext = createContext();

export const ContextWrapper = ({ children }) => {
    const [ isKeyboardMode, setKeyboardMode ] = useState(true);
    const initiativesStore = useReducer(initiativesReducer, initiativesInitialState, getInitialState);
    const charactersStore = useReducer(charactersReducer, charactersInitialState, getInitialCharacters);

    useEffect(() => {
        const [ state ] = initiativesStore;
        saveState(state);
    }, [initiativesStore]);

    useEffect(() => {
        const [ state ] = charactersStore;
        saveCharacters(state);
    }, [charactersStore]);

    return (
        <StateContext.Provider value={[initiativesStore, charactersStore, { isKeyboardMode, setKeyboardMode } ]}>
            { children }
        </StateContext.Provider>
    );
};

export const useStateValueKeyboard = () => useContext(StateContext)[2];

export const useStateValueInitiatives = () => useContext(StateContext)[0];

export const useStateValueCharacters = () => useContext(StateContext)[1];