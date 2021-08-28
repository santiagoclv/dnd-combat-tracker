export const magicDice = (max) => {
    return Math.floor(Math.random() * max) + 1;
};

export const getDice = (string = '') => {
    const match = string?.match(/^d\d*/g);
    if (match) {
        const [ dice ] = match;
        const number = dice.slice(1);
        return () => magicDice(parseInt(number));
    }
    return () => 0
};

export const nDices = (amountStr, diceStr) => {
    const amount = parseInt(amountStr);
    const dice = getDice(diceStr);
    let total = 0;
    for(let i = 0; i < amount; i++){
        total += dice();
    }
    return total;
};

export const rollIt = (roll = []) => {
    const numbers = roll.reduce((acc, value, idx) => {
        const isNaNValue = isNaN(parseInt(value));
        const isValueSing = ["-", "+"].includes(value);
        const isADice = value.search('d');
        const lastValue = acc.length > 0 ? acc[acc.length - 1] : null;

        if(isValueSing && value === '-'){
            acc.push(value);
        } else if(!isNaNValue){
            let numValue = parseInt(value);
            if(lastValue === '-'){
                numValue = numValue * -1;
                acc[acc.length - 1] = numValue;
            } else {
                acc.push(numValue);
            }
        } else if (isADice) {
            const preItem = roll[(idx - 1) > - 1 ? idx - 1 : -1];
            const preIsNaN = isNaN(parseInt(preItem));
            let result = 0;
            if(!preIsNaN || !preItem){
                result = nDices(preItem ?? "1", value);
                if(!preIsNaN){
                    acc[acc.length - 1] = result;
                } else {
                    acc.push(result);
                }
            } else {
                result = nDices("1", value);
                acc.push(result);
            }
        }

        return acc;
    }, []);

    return numbers.reduce((acc, cur) => cur !== '-' ? acc + cur : acc, 0);
};