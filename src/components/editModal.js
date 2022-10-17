import React, { useEffect, useState } from 'react';
import EditButton from '../components/buttons/editButton';
import ClearButton from '../components/buttons/closeButton';
import '../styles/modals.css';
import { useDispatch } from 'react-redux';
import { updateShipment } from '../features/shipmentsSlice';
import LoadingSpinner from '../components/spinner';
import validateForm from '../utils/validateForm';
import useHotKey from '../hooks/useHotKey';


export default function EditModal({ row, modalOpen }) {
    const dispatch = useDispatch();
    const { orderNo, date, customer, trackingNo, status, consignee } = row;

    const [formError, setFormError] = useState('');
    const [pending, setPending] = useState(false);

    const [shipment, setShipment] = useState({
        orderNo: "",
        date: "",
        customer: "",
        trackingNo: "",
        status: "",
        consignee: "",
        ...row,
    });


    // Form validation after each keystroke.
    useEffect(() => {
        setFormError(validateForm(shipment))
    }, [shipment])

    //Input changes.
    function handleChange(event) {
        setShipment(prevShipment => {
            return {
                ...prevShipment,
                [event.target.name]: event.target.value
            }
        })
    }

    //Update shipment details. If form is not valid, will not call dispatch.
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formError) {
            return
        }
        setPending(true);

        //setTimeout to mock POST request.
        setTimeout(() => {
            dispatch(updateShipment({ shipment, orderNo: row.orderNo }))
            modalOpen();
            setPending(false);
        }, 300)
    }

    const handleClose = () => {
        modalOpen();
    }

    //Close with click outside the container.
    const handleClick = (event) => {
        event.target.className === "modal" && modalOpen();
    }

    //Close with Escape.
    useHotKey('Escape', () => modalOpen());


    return (
        <div className="modal" onClick={handleClick}>
            <div role="dialog" className="edit-container">

                {pending ?
                    <LoadingSpinner />
                    : <>
                        <div className="modal-header">
                            <ClearButton handleClose={handleClose} />
                            <div className="error">{formError}</div>
                        </div>

                        <form className="grid">
                            <label htmlFor="orderNo">
                                ORDERNO:
                                <input
                                    type="text"
                                    name="orderNo"
                                    id="orderNo"
                                    placeholder={orderNo}
                                    onChange={handleChange}
                                    value={shipment.orderNo}
                                ></input>
                            </label>
                            <label htmlFor="date">
                                DATE:
                                <input
                                    type="text"
                                    name="date"
                                    id="date"
                                    placeholder={date}
                                    onChange={handleChange}
                                    value={shipment.date}
                                ></input>
                            </label>
                            <label htmlFor="customer">
                                CUSTOMER:
                                <input
                                    type="text"
                                    name="customer"
                                    id="customer"
                                    placeholder={customer}
                                    onChange={handleChange}
                                    value={shipment.customer}
                                ></input>
                            </label>
                            <label htmlFor="trackingNo">
                                TRACKINGNO:
                                <input
                                    type="text"
                                    name="trackingNo"
                                    id="trackingNo"
                                    placeholder={trackingNo}
                                    onChange={handleChange}
                                    value={shipment.trackingNo}
                                ></input>
                            </label>
                            <label htmlFor="status">
                                STATUS:
                                <input
                                    type="text"
                                    name="status"
                                    id="status"
                                    placeholder={status}
                                    onChange={handleChange}
                                    value={shipment.status}
                                ></input>
                            </label>
                            <label htmlFor="consignee">
                                CONSIGNEE:
                                <input
                                    type="text"
                                    name="consignee"
                                    id="consignee"
                                    placeholder={consignee}
                                    onChange={handleChange}
                                    value={shipment.consignee}
                                ></input>
                            </label>
                        </form>

                        <div className="modal-footer">
                            <EditButton onClick={handleSubmit} label="edit-button" />
                        </div>
                    </>}
            </div>
        </div >
    )
}