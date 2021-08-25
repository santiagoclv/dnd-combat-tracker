import {
    ADD_CHARACTER,
    DELETE_CHARACTER
} from './actions';

export const initialState = [];

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_CHARACTER: {
            const filteredState = state?.filter(character => action.value.name !== character.name);
            const newState = [action.value, ...filteredState];
            return newState;
        }
        case DELETE_CHARACTER: {
            const newState = state?.filter(character => action.value !== character.name);
            return newState;
        }
        default:
            throw new Error(`Unknow action ${action.type}`);
    }
};