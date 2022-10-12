import React from 'react';
import '../styles/style.css'
import { ReactComponent as EditIcon } from "../assets/edit.svg"
import { ReactComponent as DeleteIcon } from "../assets/delete.svg"
import { useState } from 'react';
import EditModal from '../features/edit';
import DeleteModal from '../features/delete';
import DeleteButton from './buttons/deleteButton';
import EditButton from './buttons/editButton';

// Retruns 2 buttons that handle editing and deleting.
export default function Edit({ row }) {
    const [editModalOpen, setEditOpen] = useState(false);
    const [deleteModalOpen, setDeleteOpen] = useState(false);

    const handleEditOpen = () => {
        setEditOpen(!editModalOpen);
    }

    const handleDeleteOpen = () => {
        setDeleteOpen(!deleteModalOpen);
    }

    return (
        <div className="buttons-container">

            <EditButton onClick={handleEditOpen} />
            <DeleteButton onClick={handleDeleteOpen} />

            {editModalOpen &&
                <EditModal row={row} modalOpen={handleEditOpen} />}

            {deleteModalOpen &&
                <DeleteModal row={row} modalOpen={handleDeleteOpen} />}
        </div >
    )
}