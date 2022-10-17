import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import '../styles/style.css'
import { useSelector, useDispatch } from 'react-redux'
import columns from '../data/columns';
import { fetchShipments } from '../features/shipmentsSlice';
import LoadingSpinner from './spinner';


export default function Table() {
    const dispatch = useDispatch();

    const shipments = useSelector(state => state.shipments.shipments);
    const status = useSelector(state => state.shipments.status);
    const error = useSelector(state => state.shipments.error);

    //Load data from the api.
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchShipments())
        }
    }, [status, dispatch])


    //Render content according to API request status.
    let content;

    if (status === 'loading') {
        content = <LoadingSpinner />

    } else if (status === 'succeeded') {
        content = <DataTable
            columns={columns}
            data={shipments}
            pagination
            highlightOnHover
        />

    } else if (status === 'failed') {
        content = <h1>Fetching data failed: <span>{error}</span></h1>
    }

    return (
        <div className="table-container">
            {content}
        </div >
    )
}
