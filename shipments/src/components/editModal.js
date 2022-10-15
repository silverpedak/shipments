import React, { useEffect, useState } from 'react';
import EditButton from '../components/buttons/editButton';
import ClearButton from '../components/buttons/closeButton';
import '../styles/edit.css';
import { useDispatch } from 'react-redux';
import { updateShipment } from '../features/shipmentsSlice';
import LoadingSpinner from '../components/spinner';
import validateForm from '../utils/validateForm';

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

    //Form validation
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

    //Update shipment details
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

    //Handle keydown events
    useEffect(() => {
        const close = (event) => {
            event.key === "Escape" && modalOpen();
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    })

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
                            <label>
                                ORDERNO:
                                <input
                                    type="text"
                                    placeholder={orderNo}
                                    onChange={handleChange}
                                    value={shipment.orderNo}
                                    name="orderNo"
                                ></input>
                            </label>
                            <label htmlFor="date">
                                DATE:
                                <input
                                    type="text"
                                    id="date"
                                    placeholder={date}
                                    onChange={handleChange}
                                    value={shipment.date}
                                    name="date"
                                ></input>
                            </label>
                            <label>
                                CUSTOMER:
                                <input
                                    type="text"
                                    placeholder={customer}
                                    onChange={handleChange}
                                    value={shipment.customer}
                                    name="customer"
                                ></input>
                            </label>
                            <label>
                                TRACKINGNO:
                                <input
                                    type="text"
                                    placeholder={trackingNo}
                                    onChange={handleChange}
                                    value={shipment.trackingNo}
                                    name="trackingNo"
                                ></input>
                            </label>
                            <label>
                                STATUS:
                                <input
                                    type="text"
                                    placeholder={status}
                                    onChange={handleChange}
                                    value={shipment.status}
                                    name="status"
                                ></input>
                            </label>
                            <label>
                                CONSIGNEE:
                                <input
                                    type="text"
                                    placeholder={consignee}
                                    onChange={handleChange}
                                    value={shipment.consignee}
                                    name="consignee"
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