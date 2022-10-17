import { configureStore } from '@reduxjs/toolkit';
import shipmentsReducer from '../features/shipmentsSlice';

export default configureStore({
    reducer: {
        shipments: shipmentsReducer,
    }
})