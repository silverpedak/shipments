import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, setupStore } from '../utils/testUtils'
import { ROW_1, INITIAL_SHIPMENTS, modalOpen } from '../data/testData';
import EditModal from "./editModal";

test('Renders EditModal with correct inputs and buttons', () => {
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/orderno:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/customer:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/trackingno:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/consignee:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit-button/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close-button/i })).toBeInTheDocument();
})


test('Fires openModal when close-button is clicked', () => {
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />)

    userEvent.click(screen.getByRole('button', { name: /close-button/i }));
    expect(modalOpen).toBeCalledTimes(1);
})

test('Fires openModal when Escape is pressed', () => {
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />)

    userEvent.keyboard('{Escape}')
    expect(modalOpen).toBeCalledTimes(1);
})


test('Message displayed when input value(s) empty, edit-button disabled', () => {
    const store = setupStore(INITIAL_SHIPMENTS);
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />, { store })

    const orderNoInput = screen.getByLabelText(/orderno/i);
    while (orderNoInput.value !== '') {
        userEvent.type(orderNoInput, '{Backspace}')
    }

    expect(screen.queryByText(/fill all fields/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /edit-button/i }));

    expect(screen.queryByLabelText(/spinner/i)).not.toBeInTheDocument();
    expect(modalOpen).not.toBeCalled();
})

test('Message displayed when invalid date, edit-button disabled', () => {
    const store = setupStore(INITIAL_SHIPMENTS);
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />, { store })

    //MM out of range
    const dateInput = screen.getByLabelText(/date/i);
    while (dateInput.value !== '') {
        userEvent.type(dateInput, '{Backspace}')
    }
    userEvent.type(dateInput, '13/13/2020');
    expect(screen.queryByText(/date is not valid, use mm\/dd\/yyyy/i));

    //DD out of range
    while (dateInput.value !== '') {
        userEvent.type(dateInput, '{Backspace}')
    }
    userEvent.type(dateInput, '12/32/2020');
    expect(screen.queryByText(/date is not valid, use mm\/dd\/yyyy/i));

    //YYYY out of range
    while (dateInput.value !== '') {
        userEvent.type(dateInput, '{Backspace}')
    }
    userEvent.type(dateInput, '12/30/20200');
    expect(screen.queryByText(/date is not valid, use mm\/dd\/yyyy/i));

    // wrong format
    while (dateInput.value !== '') {
        userEvent.type(dateInput, '{Backspace}')
    }
    userEvent.type(dateInput, '12.30.2020');
    expect(screen.queryByText(/date is not valid, use mm\/dd\/yyyy/i));

    // wrong format
    while (dateInput.value !== '') {
        userEvent.type(dateInput, '{Backspace}')
    }
    userEvent.type(dateInput, '12-30-2020');
    expect(screen.queryByText(/date is not valid, use mm\/dd\/yyyy/i));

    userEvent.click(screen.getByRole('button', { name: /edit-button/i }));
    expect(screen.queryByLabelText(/spinner/i)).not.toBeInTheDocument();
    expect(modalOpen).not.toBeCalled();
})