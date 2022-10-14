import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, setupStore } from '../utils/testUtils'
import mockAxios from "../__mocks__/axios";
import EditModal from "./edit";
import { ROW_1, INITIAL_SHIPMENTS, modalOpen } from '../data/testData';


test('Renders EditModal with correct inputs and buttons', () => {
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByLabelText(/orderno:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/customer:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/trackingno:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/consignee:/i)).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: /edit-button/i });
    expect(editButton).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close-button/i });
    expect(closeButton).toBeInTheDocument();
})


test('Fires openModal when close-button is pressed', () => {
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close-button/i });
    userEvent.click(closeButton);

    expect(modalOpen).toBeCalledTimes(1);
})


test('Changes shipment values in state when input values are changed and edit-button is pressed', async () => {
    const newDate = '4/20/2020';
    const newOrderNo = '12345';
    const newCustomer = 'Foo LLC';
    const newTrackingNo = '678910';
    const newStatus = 'Shipped';
    const newConsignee = 'Bar LLC';

    const store = setupStore(INITIAL_SHIPMENTS);
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />, { store })

    expect(store.getState().shipments.shipments.length).toBe(2);

    const orderNoInput = screen.getByLabelText(/orderno/i);
    const dateInput = screen.getByLabelText(/date/i);
    const customerInput = screen.getByLabelText(/customer/i);
    const trackingNoInput = screen.getByLabelText(/trackingno/i);
    const statusInput = screen.getByLabelText(/status/i);
    const consigneeInput = screen.getByLabelText(/consignee/i);

    //CLear inputs
    while (orderNoInput.value !== '') {
        userEvent.type(orderNoInput, '{Backspace}');
    }
    while (dateInput.value !== '') {
        userEvent.type(dateInput, '{Backspace}');
    }
    while (customerInput.value !== '') {
        userEvent.type(customerInput, '{Backspace}');
    }
    while (trackingNoInput.value !== '') {
        userEvent.type(trackingNoInput, '{Backspace}');
    }
    while (statusInput.value !== '') {
        userEvent.type(statusInput, '{Backspace}');
    }
    while (consigneeInput.value !== '') {
        userEvent.type(consigneeInput, '{Backspace}');
    }

    userEvent.type(orderNoInput, newOrderNo);
    userEvent.type(dateInput, newDate);
    userEvent.type(customerInput, newCustomer);
    userEvent.type(trackingNoInput, newTrackingNo);
    userEvent.type(statusInput, newStatus);
    userEvent.type(consigneeInput, newConsignee);

    const editButton = screen.getByRole('button', { name: /edit-button/i });
    userEvent.click(editButton);

    //Check if contains loading spinner
    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByLabelText(/spinner/i));
    expect(modalOpen).toBeCalledTimes(1);

    expect(store.getState().shipments.shipments[0].orderNo).toBe(newOrderNo);
    expect(store.getState().shipments.shipments[0].date).toBe(newDate);
    expect(store.getState().shipments.shipments[0].customer).toBe(newCustomer);
    expect(store.getState().shipments.shipments[0].trackingNo).toBe(newTrackingNo);
    expect(store.getState().shipments.shipments[0].status).toBe(newStatus);
    expect(store.getState().shipments.shipments[0].consignee).toBe(newConsignee);
})


test('Message displayed when input value(s) empty, edit-button disabled', () => {
    const store = setupStore(INITIAL_SHIPMENTS);
    renderWithProviders(<EditModal row={ROW_1} modalOpen={modalOpen} />, { store })

    const orderNoInput = screen.getByLabelText(/orderno/i);

    while (orderNoInput.value !== '') {
        userEvent.type(orderNoInput, '{Backspace}')
    }

    const message = screen.queryByText(/fill all fields/i);
    expect(message).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: /edit-button/i });
    userEvent.click(editButton);

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

    expect(screen.queryByLabelText(/spinner/i)).not.toBeInTheDocument();
    expect(modalOpen).not.toBeCalled();
})