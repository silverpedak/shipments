import React, { useState } from 'react';
import '../styles/modals.css';
import { useDispatch } from 'react-redux';
import { deleteShipment } from '../features/shipmentsSlice';
import DeleteButton from '../components/buttons/deleteButton';
import LoadingSpinner from '../components/spinner';
import ClearButton from '../components/buttons/closeButton';
import useHotKey from '../hooks/useHotKey';


const DeleteModal = ({ row, modalOpen }) => {
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

    //Close with click outside the container.
    const handleClick = (event) => {
        event.target.className === "modal" && modalOpen();
    }

    // Close with Escape key.
    useHotKey("Escape", () => modalOpen());

    return (
        <div className="modal" onClick={handleClick}>
            <div role="dialog" className="del-container">

                {pending ?
                    <LoadingSpinner />
                    : <>
                        <div className="modal-header">
                            <ClearButton handleClose={handleClose} />
                        </div>

                        <div className="del-body">
                            Are you sure?
                        </div>

                        <div className="modal-footer">
                            <DeleteButton onClick={removeShipment} label="delete-button" />
                        </div>
                    </>}

            </div>
        </div>
    )
}

export default DeleteModal;