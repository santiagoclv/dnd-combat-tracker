import { renderHook, act } from '@testing-library/react-hooks';

import {
    ADD_INITIATIVE,
    DELETE_ALL,
    NEXT,
    BACK,
    REMOVE_CHARACTER,
    LOAD_STATE,
    SET_INITIATIVES,
    WRITE_INPUT_INITIATIVE,
    WRITE_INPUT_NAME,
    WRITE_INPUT_HP,
    DELETE_INPUT_INITIATIVE,
    DELETE_INPUT_NAME,
    DELETE_INPUT_HP,
    NEGATIVE_INPUT_INITIATIVE,
    SELECT,
    EDIT_HP,
    EDIT_CONDITION,
    REMOVE_CONDITION,
} from '../state-manager/initiatives/actions';

import { initialState } from '../state-manager/initiatives/reducer';
import { getInitialState as init, STORED_STATE } from '../state-manager/initiatives/storage-data';
import { ContextWrapper, useStateValueInitiatives as useStateValue } from '../state-manager/context';

const storeState = {
    "initiatives": [
        {
            "initiative": 25,
            "name": "goblin",
            "hitpoints": 0,
            "id": 1630109390887,
            "monster": true,
            "conditions": [],
            "counter": 0
        },
        {
            "initiative": 25,
            "name": "goblin_1",
            "hitpoints": 0,
            "id": 1630109392958,
            "monster": true,
            "conditions": [],
            "counter": 1
        },
        {
            "initiative": 25,
            "name": "goblin_2",
            "hitpoints": 0,
            "id": 1630109393938,
            "monster": true,
            "conditions": [],
            "counter": 2
        }
    ],
    "selected": null,
    "inputInitiative": 0,
    "inputName": "",
    "inputHitpoints": 0,
    "time": 0,
    "rounds": 0,
    "firstTurn": 1630109390887
};

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

            expect(preStoredState).toEqual(initialState);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: ADD_INITIATIVE, value: { monster : true } });
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
                dispatch({ type: ADD_INITIATIVE, value: { monster : true } });
            });

            const [{ initiatives, firstTurn }] = result.current;
            expect(initiatives).toHaveLength(1);
            expect(initiatives).toEqual([
                {
                    initiative: 0,
                    name: '',
                    id: 1234,
                    hitpoints: 0,
                    monster: true,
                    conditions: [],
                    counter: 0
                }
            ]);
            expect(firstTurn).toEqual(initiatives[0].id);
        });

        test('should process correctly DELETE_ALL', () => {
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: ADD_INITIATIVE, value: { monster : true } });
                dispatch({ type: DELETE_ALL });
            });

            const [state] = result.current;
            expect(state).toBe(initialState);
        });

        test('should process correctly NEXT', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify(storeState));
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState.initiatives[0]).toEqual(storeState.initiatives[0]);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: NEXT });
            });

            const [ newState ] = result.current;

            expect(newState.initiatives[0]).toEqual(storeState.initiatives[1]);
        });

        test('should process correctly BACK', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify(storeState));
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState.initiatives[0]).toEqual(storeState.initiatives[0]);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: BACK });
            });

            const [ newState ] = result.current;

            expect(newState.initiatives[0]).toEqual(storeState.initiatives[2]);
        });

        test('should process correctly REMOVE_CHARACTER', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify(storeState));
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState.firstTurn).toEqual(storeState.firstTurn);
            expect(preState.initiatives[0]).toEqual(storeState.initiatives[0]);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: REMOVE_CHARACTER, value: preState.firstTurn });
            });

            const [ newState ] = result.current;

            expect(newState.firstTurn).toEqual(storeState.initiatives[1].id);
            expect(newState.initiatives[0]).toEqual(storeState.initiatives[1]);
        });

        test('should process correctly Round and Time Count', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify(storeState));
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState.rounds).toEqual(storeState.rounds);
            expect(preState.time).toEqual(storeState.time);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: NEXT });
                dispatch({ type: NEXT });
                dispatch({ type: NEXT });
            });

            const [ newState ] = result.current;

            expect(newState.time).toEqual(storeState.time + 6);
            expect(newState.rounds).toEqual(storeState.rounds + 1);
        });

        test('should process correctly LOAD_STATE', () => {
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState).toEqual(initialState);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: LOAD_STATE, value: storeState });
            });

            const [ newState ] = result.current;

            expect(newState).toEqual(storeState);
        });

        test('should process correctly SET_INITIATIVES', () => {
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState).toEqual(initialState);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: SET_INITIATIVES, value: storeState.initiatives });
            });

            const [ newState ] = result.current;

            expect(newState.initiatives).toEqual(storeState.initiatives);
            expect(newState.firstTurn).toEqual(storeState.firstTurn);
        });

        test('should process correctly WRITE_INPUT_INITIATIVE, DELETE_INPUT_INITIATIVE and NEGATIVE_INPUT_INITIATIVE', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify(storeState));
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState.inputInitiative).toEqual(0);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: WRITE_INPUT_INITIATIVE, value: "1" });
                dispatch({ type: WRITE_INPUT_INITIATIVE, value: "5" });
            });

            const [ newState ] = result.current;

            expect(newState.inputInitiative).toEqual(15);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: NEGATIVE_INPUT_INITIATIVE });
            });

            const [ nextState ] = result.current;

            expect(nextState.inputInitiative).toEqual(-15);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: DELETE_INPUT_INITIATIVE });
            });

            const [ lastState ] = result.current;

            expect(lastState.inputInitiative).toEqual(0);
        });

        test('should process correctly WRITE_INPUT_NAME and DELETE_INPUT_NAME', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify(storeState));
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState.inputName).toEqual('');

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: WRITE_INPUT_NAME, value: "a" });
                dispatch({ type: WRITE_INPUT_NAME, value: "b" });
            });

            const [ newState ] = result.current;

            expect(newState.inputName).toEqual("ab");

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: DELETE_INPUT_NAME });
            });

            const [ nextState ] = result.current;

            expect(nextState.inputName).toEqual("a");
        });

        test('should process correctly WRITE_INPUT_HP and DELETE_INPUT_HP', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify(storeState));
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState.inputHitpoints).toEqual(0);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: WRITE_INPUT_HP, value: "1" });
                dispatch({ type: WRITE_INPUT_HP, value: "4" });
            });

            const [ newState ] = result.current;

            expect(newState.inputHitpoints).toEqual(14);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: DELETE_INPUT_HP });
            });

            const [ nextState ] = result.current;

            expect(nextState.inputHitpoints).toEqual(0);
        });

        test('should process correctly SELECT, EDIT_HP, EDIT_CONDITION AND REMOVE_CONDITION', () => {
            localStorage.setItem(STORED_STATE, JSON.stringify(storeState));
            const { result } = renderHook(() => useStateValue(), {
                wrapper: ContextWrapper
            });

            const [ preState ] = result.current;

            expect(preState.selected).toEqual(null);
            expect(preState.inputInitiative).toEqual(0);
            expect(preState.inputName).toEqual('');
            expect(preState.inputHitpoints).toEqual(0);
            expect(preState.initiatives).toEqual(storeState.initiatives);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: SELECT, value: storeState.initiatives[0].id });
                dispatch({ type: EDIT_HP, value: -1 });
                dispatch({ type: EDIT_CONDITION, value: {color: "gold", condition: "Unconscious"} });
            });

            const [ newState ] = result.current;

            expect(newState.selected).toEqual(storeState.initiatives[0].id);
            expect(newState.inputInitiative).toEqual(storeState.initiatives[0].value);
            expect(newState.inputName).toEqual(storeState.initiatives[0].name);
            expect(newState.inputHitpoints).toEqual(storeState.initiatives[0].hitpoints);

            expect(newState.initiatives[0].hitpoints).toEqual(storeState.initiatives[0].hitpoints - 1);
            expect(newState.initiatives[0].conditions).toEqual([{color: "gold", condition: "Unconscious"}]);

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: REMOVE_CONDITION, value: {color: "gold", condition: "Unconscious"} });
            });

            const [ lastState ] = result.current;

            expect(lastState.initiatives[0].conditions).toEqual([]);
        });
    });
});
