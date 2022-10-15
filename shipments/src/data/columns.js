import Buttons from "../components/buttons";

const ORDER_WIDTH = '225px';
const DELIVERY_WIDTH = '125px';
const STATUS_WIDTH = '125px';
const CONSIGNEE_WIDTH = '250px';
const EDIT_WIDTH = '150px';

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
        cell: (row) => <Buttons row={row} />,
        width: EDIT_WIDTH,
    },
];

export default columns