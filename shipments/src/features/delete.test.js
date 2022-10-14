import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, setupStore } from '../utils/testUtils'
import mockAxios from "../__mocks__/axios";
import DeleteModal from "./delete";
import { ROW_1, ROW_2, INITIAL_SHIPMENTS, modalOpen } from '../data/testData'

afterEach(() => {
    mockAxios.reset();
})

test('Renders DeleteModal with text and buttons ', () => {
    renderWithProviders(<DeleteModal row={ROW_1} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const text = screen.getByText(/are you sure?/i);
    expect(text).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close-button/i });
    expect(closeButton).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /delete-button/i });
    expect(deleteButton).toBeInTheDocument();
})



test('fires modalOpen when close-button is pressed', () => {
    renderWithProviders(<DeleteModal row={ROW_1} modalOpen={modalOpen} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close-button/i });
    userEvent.click(closeButton);
    expect(modalOpen).toBeCalledTimes(1);
})


test('Deletes shipment when delete-button is pressed', async () => {
    //Sets up store with 2 shipments
    const store = setupStore(INITIAL_SHIPMENTS);
    renderWithProviders(<DeleteModal row={ROW_1} modalOpen={modalOpen} />, { store })

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    //Shipments length = 2
    expect(store.getState().shipments.shipments.length).toBe(2);

    const deleteButton = screen.getByRole('button', { name: /delete-button/i });
    expect(deleteButton).toBeInTheDocument();

    //Press delete button.
    userEvent.click(deleteButton);

    //Check if contains loading spinner
    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).toBeInTheDocument();

    //Wait for spinner to be removed
    await waitForElementToBeRemoved(() => screen.getByLabelText(/spinner/i));

    // Make sure modalOpen is called
    expect(modalOpen).toBeCalledTimes(1);

    //Shipments length = 1
    expect(store.getState().shipments.shipments.length).toBe(1);
})