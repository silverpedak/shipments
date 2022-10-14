import React from 'react'
import { render } from '@testing-library/react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import shipmentsReducer from '../features/shipmentsSlice';


export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}


// import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    shipments: shipmentsReducer
})

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}
