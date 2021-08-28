import cloneDeep from 'lodash/cloneDeep';
import maxBy from 'lodash/maxBy';
import { rollIt } from '../../helpers/rolling';

import {
    ADD_INITIATIVE,
    DELETE_ALL,
    LOAD_STATE,
    SET_INITIATIVES,
    REMOVE_CHARACTER,
    WRITE_INPUT_ALL,
    WRITE_INPUT_INITIATIVE,
    WRITE_INPUT_NAME,
    WRITE_INPUT_HP,
    DELETE_INPUT_INITIATIVE,
    DELETE_INPUT_NAME,
    DELETE_INPUT_HP,
    NEXT,
    BACK,
    SELECT,
    EDIT_HP,
    EDIT_CONDITION,
    REMOVE_CONDITION
} from './actions';

export const initialState = {
    initiatives: [],
    selected: null,
    inputInitiative: [],
    inputName: '',
    inputHitpoints: 0,
    time: 0,
    rounds: 0,
    firstTurn: null,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_INITIATIVE: {
            const { monster, hitpoints, name, initiative } = action.value;
            const character = {
                initiative: rollIt(initiative ?? []),
                name: name ?? '',
                hitpoints: hitpoints ?? 0,
                id: Date.now(),
                monster,
                conditions: [],
                counter: 0
            };

            if (state.initiatives.find(({ name: chName }) => chName === name)) {
                const chs = state.initiatives.filter(({ name: chName }) => chName.search(name) >= 0);
                const max = maxBy(chs, 'counter') ?? chs[0];
                character.counter = (max.counter ?? 0) + 1;
                character.name = character.name + `_${character.counter}`;
            }

            const initiatives = [...state.initiatives, character].sort((a, b) => b.initiative - a.initiative);
            const firstTurn = initiatives[0].id;

            return {
                ...state,
                firstTurn,
                initiatives,
                inputInitiative: [],
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
            const firstTurn = action.value[0].id;
            return { ...state, initiatives: action.value, firstTurn };
        }
        case REMOVE_CHARACTER: {
            const initiatives = state.initiatives.filter(({ id }) => id !== action.value);
            const selected = state.selected === action.value ? null : state.selected
            const firstTurn = initiatives[0]?.id ?? null;
            return {
                ...state,
                initiatives,
                selected,
                firstTurn
            };
        }
        case WRITE_INPUT_ALL: {
            const { name, initiative, hitpoints } = action.value;
            return {
                ...state,
                inputName: name,
                inputHitpoints: hitpoints,
                inputInitiative: initiative
            };
        }
        case WRITE_INPUT_INITIATIVE: {
            const value = action.value;
            const roll = state.inputInitiative ?? [];
            const isNaNValue = isNaN(parseInt(value));
            const lastValue = roll.length > 0 ? roll[roll.length - 1] : null;
            const isLastNaN = isNaN(parseInt(lastValue));

            if (isNaNValue || isLastNaN) {
                let rollSplit = [...roll];
                const isValueSing = ["-", "+"].includes(value);
                const isLastValueSing = ["-", "+"].includes(lastValue);
                if (!isValueSing && !isLastValueSing
                    && isLastNaN && !!lastValue) {
                    rollSplit.push('+');
                }
                rollSplit.push(value);
                return { ...state, inputInitiative: rollSplit };
            }

            return { ...state, inputInitiative: [...roll?.slice(0, -1), lastValue + value] };
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
            return { ...state, inputInitiative: (state.inputInitiative ?? [])?.slice(0, -1) };
        }
        case DELETE_INPUT_HP: {
            return { ...state, inputHitpoints: 0 };
        }
        case DELETE_INPUT_NAME: {
            return { ...state, inputName: state?.inputName?.slice(0, -1) ?? '' };
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
                selected: character.id
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