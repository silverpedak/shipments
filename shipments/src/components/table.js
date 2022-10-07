import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../styles/style.css'
// import columns from './columns'
import Edit from './edit';
import Modal from './modals/edit_modal';


const ORDER_WIDTH = '225px';
const DELIVERY_WIDTH = '125px';
const STATUS_WIDTH = '125px';
const CONSIGNEE_WIDTH = '250px';
const EDIT_WIDTH = '150px';



export default function Table() {
    const [data, setData] = useState([]);

    // GET data from api.
    useEffect(() => {
        const url = 'data.json';
        axios.get(url)
            .then(response => setData(response.data))
            .catch(error => console.log(error.message));

    }, [])

    function deleteShipment(row) {
        const filtered = data.filter(element => {
            return element.orderNo !== row.orderNo
        })
        setData(filtered);
    }

    function updateShipment(initialValue, updatedValue) {
        setData(prevData => {
            const index = data.indexOf(initialValue);
            const newData = [...prevData]
            newData[index] = updatedValue;
            return newData
        })
    }

    const columns = [
        {
            name: 'ORDERNO',
            selector: row => row.orderNo,
            width: ORDER_WIDTH,
        },
        {
            name: 'DELIVERYDATE',
            selector: row => row.date,
            maxWidth: DELIVERY_WIDTH,
        },
        {
            name: 'CUSTOMER',
            selector: row => row.customer,
            sortable: true,
        },
        {
            name: 'TRACKINGNO',
            selector: row => row.trackingNo,
            sortable: true,
        },
        {
            name: 'STATUS',
            selector: row => row.status,
            sortable: true,
            maxWidth: STATUS_WIDTH,
        },
        {
            name: 'CONSIGNEE',
            selector: row => row.consignee,
            sortable: true,
            maxWidth: CONSIGNEE_WIDTH,
        },
        {
            name: '',
            cell: (row) => <Edit row={row} deleteShipment={deleteShipment} updateShipment={updateShipment} />,
            width: EDIT_WIDTH,
        },
    ];

    return (
        <div className="table-container">
            <DataTable
                columns={columns}
                data={data}
                pagination
            />
        </div>
    )
}

