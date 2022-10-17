const DATE_REGEX = /^([1-9]|1[0-2])\/([1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

const validateForm = (shipment) => {
    if (shipment.orderNo === '' || shipment.date === '' || shipment.customer === '' || shipment.trackingNo === '' || shipment.status === '' || shipment.consignee === '') {
        return 'Fill all fields'
    }
    if (shipment.date.match(DATE_REGEX) === null) {
        return 'Date is not valid, use MM/DD/yyyy'
    }
}

export default validateForm;
