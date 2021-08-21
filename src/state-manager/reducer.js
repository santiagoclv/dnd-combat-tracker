import cloneDeep from 'lodash/cloneDeep';

import {
    ADD_INITIATIVE,
    DELETE_ALL,
    LOAD_STATE,
    SET_INITIATIVES,
    REMOVE_CHARACTER,
    WRITE_INPUT_INITIATIVE,
    WRITE_INPUT_NAME,
    WRITE_INPUT_HP,
    DELETE_INPUT_INITIATIVE,
    DELETE_INPUT_NAME,
    DELETE_INPUT_HP,
    NEGATIVE_INPUT_INITIATIVE,
    NEXT,
    BACK,
    SELECT,
    EDIT_HP,
    EDIT_CONDITION,
    REMOVE_CONDITION
} from './actions';

export const STORED_STATE = "storedState";

export const initialState = {
    initiatives: [],
    selected: null,
    inputInitiative: 0,
    inputName: '',
    inputHitpoints: 0,
    time: 0,
    rounds: 0,
    firstTurn: null,
};


export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_INITIATIVE: {
            const character = {
                value: state.inputInitiative ?? 0,
                name: state.inputName ?? '',
                hitpoints: state.inputHitpoints,
                id: Date.now(),
                monster: action.monster,
                conditions: []
            };
            const initiatives = [...state.initiatives, character].sort((a, b) => b.value - a.value);
            const firstTurn = initiatives[0].id;
            return { 
                ...state,
                firstTurn,
                initiatives,
                inputInitiative: 0,
                inputName: '',
                inputHitpoints: 0
            };
        }
        case DELETE_ALL: {
            return initialState;
        }
        case LOAD_STATE: {
            return action.value;
        }
        case SET_INITIATIVES: {
            const firstTurn = action.initiatives[0].id;
            return { ...state, initiatives: action.initiatives, firstTurn };
        }
        case REMOVE_CHARACTER: {
            const initiatives = state.initiatives.filter(({ id }) => id !== action.value);
            const selected = state.selected === action.value ? null : state.selected
            const firstTurn = initiatives[0].id;
            return { ...state,
                initiatives,
                selected,
                firstTurn
            };
        }
        case WRITE_INPUT_INITIATIVE: {
            const inputInitiative = parseInt(state.inputInitiative + action.value);
            return { ...state, inputInitiative };
        }
        case WRITE_INPUT_NAME: {
            const inputName = state.inputName + action.value;
            return { ...state, inputName };
        }
        case WRITE_INPUT_HP: {
            const inputHitpoints = parseInt(state.inputHitpoints + action.value);
            return { ...state, inputHitpoints };
        }
        case DELETE_INPUT_INITIATIVE: {
            return { ...state, inputInitiative: 0 };
        }
        case DELETE_INPUT_HP: {
            return { ...state, inputHitpoints: 0 };
        }
        case DELETE_INPUT_NAME: {
            return { ...state, inputName: state?.inputName?.slice(0, -1) ?? '' };
        }
        case NEGATIVE_INPUT_INITIATIVE: {
            return { ...state, inputInitiative: -state.inputInitiative };
        }
        case NEXT: {
            const { firstTurn } = state;
            let time = state.time ?? 0;
            let rounds = state.rounds ?? 0;

            const initiatives = state.initiatives.slice(1).concat(state.initiatives.slice(0, 1));

            if (firstTurn === initiatives[0].id) {
                rounds += 1;
                time += 6;
            }

            return {
                ...state,
                initiatives,
                time,
                rounds
            };
        }
        case BACK: {
            const initiatives = state.initiatives.slice(-1).concat(state.initiatives.slice(0, -1));
            return {
                ...state,
                initiatives
            };
        }
        case SELECT: {
            const character = state.initiatives.find(({ id }) => id === action.value);
            return {
                ...state,
                selected: character.id,
                inputInitiative: character?.value,
                inputName: character?.name,
                inputHitpoints: character?.hitpoints
            };
        }
        case EDIT_HP: {
            const initiatives = state.initiatives.map(ini => {
                if (ini.id === state.selected) {
                    const copy = cloneDeep(ini);
                    copy.hitpoints = copy.hitpoints + action.value;
                    return copy;
                }
                return ini;
            })
            return { ...state, initiatives };
        }
        case EDIT_CONDITION: {
            const initiatives = state.initiatives.map(ini => {
                if (ini.id === state.selected) {
                    const copy = cloneDeep(ini);
                    copy.conditions.push(action.value);
                    return copy;
                }
                return ini;
            })
            return { ...state, initiatives };
        }
        case REMOVE_CONDITION: {
            const initiatives = state.initiatives.map(ini => {
                if (ini.id === state.selected) {
                    const copy = cloneDeep(ini);
                    copy.conditions = copy.conditions.filter(cond => cond.condition !== action.value.condition);
                    return copy;
                }
                return ini;
            })
            return { ...state, initiatives };
        }
        default:
            throw new Error(`Unknow action ${action.type}`);
    }
};

export const init = () => {
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