import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import App from '../App';

describe('App', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should render with initial state on store', () => {
        render(<App />);

        const noDataMessage = screen.getByText(/No Data/i);
        expect(noDataMessage).toBeInTheDocument();

        const nextChatacterBtn = screen.getByRole('button', { name: /next character/i });
        expect(nextChatacterBtn).toBeDisabled();

        const goBackBtn = screen.getByRole('button', { name: /go back/i });
        expect(goBackBtn).toBeDisabled();
    });

    test('should add new character to the list', async () => {
        render(<App />);

        const noDataMessage = screen.getByText(/No Data/i);
        expect(noDataMessage).toBeInTheDocument();

        // character name
        fireEvent.click(screen.getByRole('button', { name: "a" }));
        fireEvent.click(screen.getByRole('button', { name: "b" }));
        fireEvent.click(screen.getByRole('button', { name: "Next" }));
        // character initiative
        fireEvent.click(screen.getByRole('button', { name: "2" }));
        fireEvent.click(screen.getByRole('button', { name: "Next" }));
        // hp initiative
        fireEvent.click(screen.getByRole('button', { name: "2" }));
        fireEvent.click(screen.getByRole('button', { name: "4" }));
        fireEvent.click(screen.getByRole('button', { name: "Create as a Player" }));
        
        await waitFor(() => {
            const name = screen.getByRole('cell', { name: "ab" });
            expect(name).toBeInTheDocument();
        });
    });
    
});