import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    shipments: [],
    status: 'idle',
    error: null,
}

export const fetchShipments = createAsyncThunk('shipments/fetchShipments', async () => {
    try {
        const response = await axios.get('data.json');
        return response.data
    } catch (err) {
        return Promise.reject(err.message)
    }
})

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {
        deleteShipment(state, action) {
            state.shipments = state.shipments.filter(shipment => {
                return shipment.orderNo !== action.payload.orderNo
            })
        },
        // action.payload = {shipment, orderNo}
        // Shipment = new details of a shipment.
        // orderNo = existing shipment orderNo in the state
        updateShipment(state, action) {
            const { shipment, orderNo } = action.payload;
            let item = state.shipments.find(shipment => shipment.orderNo === orderNo);

            if (item) {
                item.orderNo = shipment.orderNo;
                item.date = shipment.date;
                item.customer = shipment.customer;
                item.trackingNo = shipment.trackingNo;
                item.status = shipment.status;
                item.consignee = shipment.consignee;
            }
        },
    },
    extraReducers(builder) {
        builder
            //pending
            .addCase(fetchShipments.pending, (state, action) => {
                state.status = 'loading';
            })
            //fulfilled
            .addCase(fetchShipments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.shipments = state.shipments.concat(action.payload);
            })
            //failed
            .addCase(fetchShipments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { deleteShipment, updateShipment } = shipmentsSlice.actions;
export default shipmentsSlice.reducer;
