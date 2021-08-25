import { initialState } from "./reducer";

const CHARACTERS = "CHARACTERS";

export const saveCharacters = (characters) => {
    localStorage.setItem(CHARACTERS, JSON.stringify(characters));
};

export const getInitialCharacters = () => {
    let characters = initialState;
    try {
        const characters_str = localStorage.getItem(CHARACTERS);
        characters = characters_str ? JSON.parse(characters_str) : initialState;
    } catch (error) {
        console.error("Error on getCharacters from characters manager", error);
    }
    return characters;
};