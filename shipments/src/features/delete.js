import React, { useEffect, useState } from 'react';
import { ReactComponent as Clear } from "../assets/clear.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import '../styles/delete.css';
import { useDispatch } from 'react-redux';
import { deleteShipment } from './shipmentsSlice';
import DeleteButton from '../components/buttons/deleteButton';
import LoadingSpinner from '../components/spinner';
import ClearButton from '../components/buttons/clearButton';




function DeleteModal({ row, modalOpen }) {
    const dispatch = useDispatch();
    const { orderNo } = row;
    const [pending, setPending] = useState(false);

    const removeShipment = () => {
        setPending(true);
        setTimeout(() => {
            dispatch(deleteShipment({ orderNo }))
            modalOpen();
            setPending(false);
        }, 200)
    }

    const handleClose = () => {
        modalOpen();
    }

    //Close with click outside the container
    const handleClick = (event) => {
        event.target.className === "modal" && modalOpen();
    }

    //Close with Escape
    useEffect(() => {
        const close = (event) => {
            event.key === "Escape" && modalOpen();
        }
        window.addEventListener('keydown', close);
    })

    return (
        <div className="modal" onClick={handleClick}>
            <div className="delete-container">

                {pending ?
                    <LoadingSpinner />
                    : <>
                        <div className="del-header">
                            <ClearButton handleClose={handleClose} />
                        </div>

                        <span className="del-mid">
                            Are you sure?
                        </span>

                        <div className="del-footer">
                            <DeleteButton onClick={removeShipment} />
                        </div>
                    </>}

            </div>
        </div>
    )
}

export default DeleteModal;