import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import App from '../App';

describe('App', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should render with initial state on store', () => {
        render(<App />);

        const noDataMessages = screen.getAllByText(/No Data/i);
        expect(noDataMessages).toHaveLength(2);

        const nextChatacterBtn = screen.getByTitle('Next turn');
        expect(nextChatacterBtn).toBeDisabled();

        const goBackBtn = screen.getByTitle('Previous turn');
        expect(goBackBtn).toBeDisabled();
    });

    test('should add new character to the list', async () => {
        render(<App />);

        const noDataMessages = screen.getAllByText(/No Data/i);
        expect(noDataMessages).toHaveLength(2);

        // character name
        fireEvent.click(screen.getByRole('button', { name: "a" }));
        fireEvent.click(screen.getByRole('button', { name: "b" }));
        fireEvent.click(screen.getByTitle('Next Character Options'));
        // character initiative
        fireEvent.click(screen.getByRole('button', { name: "2" }));
        fireEvent.click(screen.getByTitle('Next Character Options'));
        // hp initiative
        fireEvent.click(screen.getByRole('button', { name: "2" }));
        fireEvent.click(screen.getByRole('button', { name: "4" }));
        fireEvent.click(screen.getByTitle('Add character as a Player'));
        
        await waitFor(() => {
            const name = screen.getByRole('cell', { name: "ab" });
            expect(name).toBeInTheDocument();
        });
    });
    
});