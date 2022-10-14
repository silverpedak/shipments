import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, setupStore } from '../utils/testUtils'
import mockAxios from "../__mocks__/axios";
import Edit from "./edit";
import { ROW_1, INITIAL_SHIPMENTS, modalOpen } from '../data/testData';

test('Renders Edit with correct buttons', () => {
    renderWithProviders(<Edit row={ROW_1} />);

    expect(screen.getByRole('button', { name: /edit-button/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete-button/i })).toBeInTheDocument();
})


test('Opens EditModal when edit-button is clicked', () => {
    renderWithProviders(<Edit row={ROW_1} />);

    const editButton = screen.getByRole('button', { name: /edit-button/i });
    userEvent.click(editButton);

    expect(screen.getByLabelText(/orderno:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/customer:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/trackingno:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/consignee:/i)).toBeInTheDocument();
})


test('Closes EditModal when close-button is clicked', () => {
    renderWithProviders(<Edit row={ROW_1} />);

    const editButton = screen.getByRole('button', { name: /edit-button/i });
    userEvent.click(editButton);

    const closeButton = screen.getByRole('button', { name: /close-button/i });
    userEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/orderno:/i)).not.toBeInTheDocument();
})


test('Opens DeleteModal when delete-button is clicked', () => {
    renderWithProviders(<Edit row={ROW_1} />);

    const deleteButton = screen.getByRole('button', { name: /delete-button/i });
    userEvent.click(deleteButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByText(/are you sure?/i)).toBeInTheDocument();
})


test('Closes DeleteModal when close-button is pressed', () => {
    renderWithProviders(<Edit row={ROW_1} />);

    const deleteButton = screen.getByRole('button', { name: /delete-button/i });
    userEvent.click(deleteButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByText(/are you sure?/i)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close-button/i });
    userEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText(/are you sure?/i)).not.toBeInTheDocument();
})
