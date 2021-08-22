
const CHARACTERS = "CHARACTERS";

export const saveCharacters = (characters) => {
    localStorage.setItem(CHARACTERS, JSON.stringify(characters));
};

export const saveCharacter = (character) => {
    const characters = getCharacters();

    const characterExist = characters.find( ({name}) => name.trim().toLowerCase() === character.name.trim().toLowerCase());

    if(!characterExist){
        characters.push(character);
    }

    saveCharacters(characters);
};

export const getCharacters = () => {
    let characters = [];
    try {
        const characters_str = localStorage.getItem(CHARACTERS);
        characters = characters_str ? JSON.parse(characters_str) : [];
    } catch (error) {
        console.error("Error on getCharacters from ManageCharacters", error);
    }
    return characters;
};