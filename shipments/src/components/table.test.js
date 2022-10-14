import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, setupStore } from '../utils/testUtils'
import mockAxios from "../__mocks__/axios";
import Table from "./table";
import { ROW_1, INITIAL_SHIPMENTS, modalOpen } from '../data/testData';

test('Render datatable', async () => {
    const store = setupStore(INITIAL_SHIPMENTS);
    renderWithProviders(<Table />, { store });

    expect(screen.queryByLabelText(/spinner/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByLabelText(/spinner/i));
    // screen.debug()
})