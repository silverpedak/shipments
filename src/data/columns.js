import Buttons from "../components/buttons";

const ORDER_WIDTH = '225px';
const DELIVERY_WIDTH = '125px';
const STATUS_WIDTH = '125px';
const CONSIGNEE_WIDTH = '250px';
const EDIT_WIDTH = '150px';
const TRACKINNO_WIDTH = '225px';

const columns = [
    {
        name: 'ORDERNO',
        selector: row => row.orderNo,
        width: ORDER_WIDTH,
        grow: 2,
    },
    {
        name: 'DELIVERYDATE',
        selector: row => row.date,
        maxWidth: DELIVERY_WIDTH,
        hide: 'sm',
    },
    {
        name: 'CUSTOMER',
        selector: row => row.customer,
        sortable: true,
        hide: 'lg',
    },
    {
        name: 'TRACKINGNO',
        selector: row => row.trackingNo,
        sortable: true,
        maxWidth: TRACKINNO_WIDTH,
        hide: 'md',
    },
    {
        name: 'STATUS',
        selector: row => row.status,
        sortable: true,
        maxWidth: STATUS_WIDTH,
        hide: 'sm',
    },
    {
        name: 'CONSIGNEE',
        selector: row => row.consignee,
        sortable: true,
        maxWidth: CONSIGNEE_WIDTH,
        hide: 'lg',
    },
    {
        name: '',
        cell: (row) => <Buttons row={row} />,
        width: EDIT_WIDTH,
    },
];

export default columns