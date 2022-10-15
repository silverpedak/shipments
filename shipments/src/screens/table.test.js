import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { renderWithProviders } from '../utils/testUtils'
import Table from "./table";
import { server } from '../mocks/server';
import { rest } from 'msw';
import userEvent from "@testing-library/user-event";



test('Renders Table when API request is successful', async () => {
    renderWithProviders(<Table />);

    expect(screen.queryByLabelText(/spinner/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByLabelText(/spinner/i));
    expect(screen.getByRole('table')).toBeInTheDocument();
})


test('Renders error message when API request failes', async () => {
    server.use(
        rest.get('data.json', (req, res, ctx) => {
            return res(
                ctx.status(404),
            )
        }),
    )
    renderWithProviders(<Table />);

    expect(screen.queryByLabelText(/spinner/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByLabelText(/spinner/i));

    expect(screen.getByText(/fetching data failed/i)).toBeInTheDocument();
})


test('Deletes shipment when delete-button is clicked inside DeleteModal', async () => {
    renderWithProviders(<Table />);

    expect(screen.queryByLabelText(/spinner/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByLabelText(/spinner/i));

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toEqual(3);

    userEvent.click(screen.getAllByRole('button', { name: /open-delete/i })[0]);
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /delete-button/i }));

    expect(screen.queryByLabelText(/spinner/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByLabelText(/spinner/i));

    expect(screen.getAllByRole('row').length).toEqual(2);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
})


test('Changes shipment values when input values are changed and edit-button is pressed', async () => {
    const newOrderNo = '12345';
    const newDate = '4/20/2020';
    const newCustomer = 'Foo LLC';
    const newTrackingNo = '678910';
    const newStatus = 'Shipped';
    const newConsignee = 'Bar LLC';

    renderWithProviders(<Table />);
    await waitForElementToBeRemoved(() => screen.queryByLabelText(/spinner/i));

    expect(screen.getByText(/abc inc/i)).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('button', { name: /open-edit/i })[0]);

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

    userEvent.click(screen.getByRole('button', { name: /edit-button/i }));

    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByLabelText(/spinner/i));

    expect(screen.getByText(newOrderNo)).toBeInTheDocument();
    expect(screen.getByText(newDate)).toBeInTheDocument();
    expect(screen.getByText(newCustomer)).toBeInTheDocument();
    expect(screen.getByText(newTrackingNo)).toBeInTheDocument();
    expect(screen.getByText(newStatus)).toBeInTheDocument();
    expect(screen.getByText(newConsignee)).toBeInTheDocument();
})
