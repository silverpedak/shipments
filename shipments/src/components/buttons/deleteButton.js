import React from 'react';
import '../../styles/buttons.css'
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg"

export default function DeleteButton({ onClick, label }) {
    return (
        <button
            className="delete btn"
            onClick={onClick}
            aria-label={label}>
            <DeleteIcon className="icon" aria-label="delete-icon" />
        </button>
    )
}