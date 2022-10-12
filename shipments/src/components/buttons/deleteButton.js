import React from 'react';
import '../../styles/buttons.css'
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg"

export default function DeleteButton({ onClick }) {
    return (
        <button
            className="delete btn"
            onClick={onClick}
            aria-label="delete-button">
            <DeleteIcon className="icon" aria-label="delete-icon" />
        </button>
    )
}