import React from 'react';
import '../../styles/buttons.css'
import { ReactComponent as EditIcon } from "../../assets/edit.svg"

export default function EditButton({ onClick }) {
    return (
        <button
            type='submit'
            className="edit btn"
            onClick={onClick}
            aria-label="edit-button">
            <EditIcon className="icon" aria-label="edit-icon" />
        </button>
    )
}