import { renderHook, act } from '@testing-library/react-hooks';

import {
    ADD_INITIATIVE,
    DELETE_ALL,
    // LOAD_STATE,
    // SET_INITIATIVES,
    // REMOVE_CHARACTER,
    // WRITE_INPUT_INITIATIVE,
    // WRITE_INPUT_NAME,
    // WRITE_INPUT_HP,
    // DELETE_INPUT_INITIATIVE,
    // DELETE_INPUT_NAME,
    // DELETE_INPUT_HP,
    // NEGATIVE_INPUT_INITIATIVE,
    // NEXT,
    // BACK,
    // SELECT,
    // EDIT_HP,
    // EDIT_CONDITION,
    // REMOVE_CONDITION
} from './actions';
import { init, initialState, STORED_STATE } from './reducer';
import { ContextWrapper, useStateValue } from './context';

describe('State Manager', () => {
    describe('init function', () => {
        beforeEach(() => {
            localStorage.clear();
        });

        test('should return stored data under STORED_STATE', () => {
            const data = { movie: "robocop" };

            localStorage.setItem(STORED_STATE, JSON.stringify(data));

            expect(init()).toMatchObject(data);
        });

        test('should return initial state if data saved under STORED_STATE key', () => {
            expect(init()).toMatchObject(initialState);
        });

        test('should return initial state if data saved under STORED_STATE key is malformed', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify("{data: data"));

            expect(init()).toMatchObject(initialState);
        });
    });

    describe('Reducer + Actions', () => {
        beforeEach(() => {
            localStorage.clear();

            Date.now = jest.fn(() => 1234);
        });

        test('should have initialState as initial value for state', () => {
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [state] = result.current;
            expect(state).toBe(initialState);
        });

        test('should process correctly actions and persist the state on localstorage.', () => {
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const preStoredState = JSON.parse(localStorage.getItem(STORED_STATE));
            expect(preStoredState).toBe(null);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: ADD_INITIATIVE, monster: true });
            });

            const [state] = result.current;
            const storedState = JSON.parse(localStorage.getItem(STORED_STATE));

            expect(state).toEqual(storedState);
        });

        test('should process correctly ADD_INITIATIVE', () => {
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: ADD_INITIATIVE, monster: true });
            });

            const [{ initiatives }] = result.current;
            expect(initiatives).toHaveLength(1);
            expect(initiatives).toEqual([
                {
                    value: 0,
                    name: '',
                    id: 1234,
                    hitpoints: 0,
                    monster: true,
                    conditions: []
                }
            ]);
        });

        test('should process correctly DELETE_ALL', () => {
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: ADD_INITIATIVE, monster: true });
                dispatch({ type: DELETE_ALL });
                
            });

            const [state] = result.current;
            expect(state).toBe(initialState);
        });
    });
});
