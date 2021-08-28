import { getDice, nDices, magicDice, rollIt } from '../helpers/rolling';


describe('Rolling dices', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(1);
        jest.spyOn(global.Math, 'floor').mockImplementation(value => value);
    });
    
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
        jest.spyOn(global.Math, 'floor').mockRestore();
    })

    describe('magicDice', () => {

        test('should return 1', () => {
            expect(magicDice(0)).toBe(1);
        });

        test('should return 2', () => {
            expect(magicDice(1)).toBe(2);
        });
    });

    describe('getDice', () => {

        test('should roll a d4 and return 5', () => {
            const dice = getDice('d4');
            expect(dice()).toBe(5);
        });

        test('should roll a d20 and return 21', () => {
            const dice = getDice('d20');
            expect(dice()).toBe(21);
        });

        test('should try to roll a 20 and return 0', () => {
            const dice = getDice('20');
            expect(dice()).toBe(0);
        });
    });

    describe('nDices', () => {

        test('should roll a 4d4 and return 5', () => {
            const result = nDices('4', 'd4');
            expect(result).toBe(20);
        });
    });
});
