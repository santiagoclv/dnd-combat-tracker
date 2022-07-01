import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import App from '../App';

describe('App', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should render with initial state on store', () => {
        render(<App />);

        const noDataMessages = screen.getAllByText(/No Data/i);
        expect(noDataMessages).toHaveLength(3);

        const nextChatacterBtn = screen.getByTitle('Next turn');
        expect(nextChatacterBtn).toBeDisabled();

        const goBackBtn = screen.getByTitle('Previous turn');
        expect(goBackBtn).toBeDisabled();
    });

    test('should add new character to the list', async () => {
        render(<App />);

        const noDataMessages = screen.getAllByText(/No Data/i);
        expect(noDataMessages).toHaveLength(3);

        // character name
        fireEvent.keyDown(screen.getByRole('textbox', {
            name: /name/i
        }), {key: 'a', code: 'KeyA'});
        fireEvent.click(screen.getByTitle('Next Character Options'));
        // character initiative
        fireEvent.click(screen.getByRole('button', {
            name: /3/i
        }));
        fireEvent.click(screen.getByTitle('Next Character Options'));
        // hp initiative
        fireEvent.keyDown(screen.getByRole('spinbutton', {
            name: /hp/i
        }), {key: '5', code: 'Digit5'});
        fireEvent.click(screen.getByTitle('Add character as a Player'));
    });
    
});