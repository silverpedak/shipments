import React from 'react';
import '../styles/style.css'
import { ReactComponent as EditIcon } from "../assets/edit.svg"
import { ReactComponent as DeleteIcon } from "../assets/delete.svg"
import { useState } from 'react';
import EditModal from './modals/edit_modal';
import DeleteModal from './modals/delete_modal';


// Retruns 2 buttons that handle editing and deleting.
export default function Edit({ row, deleteShipment, updateShipment }) {

    const [deleteModalOpen, setDeleteOpen] = useState(false);
    const [editModalOpen, setEditOpen] = useState(false);

    function handleEditOpen() {
        setEditOpen(!editModalOpen);
    }

    function handleDeleteOpen() {
        setDeleteOpen(!deleteModalOpen);
    }

    function deleteRow() {
        deleteShipment(row);
        setDeleteOpen(false);
    }

    function updateRow(shipment) {
        updateShipment(row, shipment);
        setEditOpen(false);
    }

    return (
        <div className="buttons-container">

            <button
                className="edit btn"
                onClick={handleEditOpen}>
                <EditIcon className="icon" />
            </button>

            <button
                className="delete btn"
                onClick={handleDeleteOpen}>
                <DeleteIcon className="icon" />
            </button>

            {editModalOpen &&
                <EditModal row={row} modalOpen={handleEditOpen} updateRow={updateRow} />}

            {deleteModalOpen &&
                <DeleteModal row={row} modalOpen={handleDeleteOpen} deleteRow={deleteRow} />}

        </div >
    )
}