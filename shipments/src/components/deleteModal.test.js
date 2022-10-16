import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, setupStore } from '../utils/testUtils'
import DeleteModal from "./deleteModal";
import { ROW_1, modalOpen } from '../data/testData';

test('Renders DeleteModal with text and buttons ', () => {
    renderWithProviders(<DeleteModal row={ROW_1} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/are you sure?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close-button/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete-button/i })).toBeInTheDocument();
})


test('fires modalOpen when close-button is clicked', () => {
    renderWithProviders(<DeleteModal row={ROW_1} modalOpen={modalOpen} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /close-button/i }));
    expect(modalOpen).toBeCalledTimes(1);
})


test('fires modalOpen when Escape is pressed', () => {
    renderWithProviders(<DeleteModal row={ROW_1} modalOpen={modalOpen} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    userEvent.keyboard('{Escape}');
    expect(modalOpen).toBeCalledTimes(1);
})