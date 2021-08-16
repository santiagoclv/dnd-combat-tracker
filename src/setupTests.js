// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

beforeAll(() => {
    const localStorageMock = {
        storage: {},
        getItem: jest.fn(key => localStorageMock.storage[key]),
        setItem: jest.fn((key, val) => localStorageMock.storage[key] = val),
        removeItem: jest.fn(key => localStorageMock.storage[key] = undefined),
        clear: jest.fn(() => localStorageMock.storage = {}),
    };
    
    global.localStorage = localStorageMock;

    global.console.error = jest.fn();
});