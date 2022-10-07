import React, { useEffect, useState } from 'react';
import { ReactComponent as Clear } from "../../assets/clear.svg"
import { ReactComponent as CancelIcon } from "../../assets/cancel.svg"
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg"
import '../../styles/delete_modal.css'



function DeleteModal({ row, modalOpen, deleteRow }) {
    // const { orderNo, date, customer, trackingNo, status, consignee } = row;

    //Close with click outside the container
    function handleClick(event) {
        event.target.className === "modal" && modalOpen();
    }

    //Close with Escape
    useEffect(() => {
        const close = (event) => {
            event.key === "Escape" && modalOpen();
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    })

    return (
        <div className="modal" onClick={handleClick}>
            <div className="delete-container">

                <div className="del-header">
                    <Clear className="close" onClick={modalOpen} />
                </div>

                <div className="del-mid">
                    Are you sure?
                </div>

                <div className="del-footer">
                    <button className="del-btn" onClick={deleteRow}>
                        <DeleteIcon className="icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;