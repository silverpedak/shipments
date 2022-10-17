import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from '../utils/testUtils'
import Buttons from "./buttons";
import { ROW_1 } from '../data/testData';


test('Renders Buttons with correct buttons', () => {
    renderWithProviders(<Buttons row={ROW_1} />);

    expect(screen.getByRole('button', { name: /open-edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open-delete/i })).toBeInTheDocument();
})


test('Renders EditModal with correct inputs when open-edit is clicked', () => {
    renderWithProviders(<Buttons row={ROW_1} />);

    const openEdit = screen.getByRole('button', { name: /open-edit/i });
    userEvent.click(openEdit);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/orderno:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/customer:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/trackingno:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/consignee:/i)).toBeInTheDocument();
})


test('Closes EditModal when close-button is clicked', () => {
    renderWithProviders(<Buttons row={ROW_1} />);

    userEvent.click(screen.getByRole('button', { name: /open-edit/i }));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /close-button/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
})


test('Renders DeleteModal when open-delete is clicked', () => {
    renderWithProviders(<Buttons row={ROW_1} />);

    userEvent.click(screen.getByRole('button', { name: /open-delete/i }));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByText(/are you sure?/i)).toBeInTheDocument();
})


test('Closes DeleteModal when close-button is pressed', () => {
    renderWithProviders(<Buttons row={ROW_1} />);

    userEvent.click(screen.getByRole('button', { name: /open-delete/i }));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /close-button/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
})
