const STATES = "STATES";

export const saveStates = (states) => {
    localStorage.setItem(STATES, JSON.stringify(states));
};

export const getStates = () => {
    let states = [];
    try {
        const states_str = localStorage.getItem(STATES);
        states = states_str ? JSON.parse(states_str) : [];
    } catch (error) {
        console.error("Error on getStates from ManageScenes", error);
    }
    return states;
};