import React from 'react';
import '../styles/style.css'
import { useState } from 'react';
import EditModal from './editModal';
import DeleteModal from './deleteModal';
import DeleteButton from './buttons/deleteButton';
import EditButton from './buttons/editButton';

export default function Buttons({ row }) {
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

            <EditButton onClick={handleEditOpen} label="open-edit" />
            <DeleteButton onClick={handleDeleteOpen} label="open-delete" />

            {editModalOpen &&
                <EditModal row={row} modalOpen={handleEditOpen} />}

            {deleteModalOpen &&
                <DeleteModal row={row} modalOpen={handleDeleteOpen} />}
        </div >
    )
}