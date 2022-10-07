import React, { useEffect, useState } from 'react';
import { ReactComponent as Clear } from "../../assets/clear.svg"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg"
import '../../styles/edit_modal.css'



function EditModal({ row, modalOpen, updateRow }) {
    const { orderNo, date, customer, trackingNo, status, consignee } = row;

    const [shipment, setShipment] = useState({
        orderNo: "",
        date: "",
        customer: "",
        trackingNo: "",
        status: "",
        consignee: "",
        ...row,
    });

    function handleChange(event) {
        setShipment(prevShipment => {
            return {
                ...prevShipment,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit() {
        updateRow(shipment);
    }


    //Close with click outside the container.
    function handleClick(event) {
        event.target.className === "modal" && modalOpen();
    }

    //Close with Escape.
    useEffect(() => {
        const close = (event) => {
            event.key === "Escape" && modalOpen();
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    })

    return (
        <div className="modal" onClick={handleClick}>
            <div className="edit-container">

                <div className="modal-header">
                    <Clear className="modal-close" onClick={modalOpen} />
                </div>

                <div className="grid">
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
                    <label>
                        DATE:
                        <input
                            type="text"
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
                </div>

                <div className="modal-footer">
                    <button className="edit btn" onClick={handleSubmit}>
                        <EditIcon className="icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditModal;