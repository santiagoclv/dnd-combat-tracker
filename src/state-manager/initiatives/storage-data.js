import { initialState } from "./reducer";

export const STORED_STATE = "storedState";

export const saveState = (states) => {
    localStorage.setItem(STORED_STATE, JSON.stringify(states));
};

export const getInitialState = () => {
    let state = initialState;
    try {
        const string_state = localStorage.getItem(STORED_STATE);
        state = string_state ? JSON.parse(string_state) : initialState;
        state.selected = null;
    } catch (error) {
        console.error("Error on init reducer", error);
        state = initialState;
    }
    return state;
};