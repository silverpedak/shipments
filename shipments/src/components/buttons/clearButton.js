import React from 'react';
import '../../styles/buttons.css'
import { ReactComponent as Clear } from "../../assets/clear.svg";

export default function ClearButton({ handleClose }) {
    return (
        <button
            className="clear"
            onClick={handleClose}
            aria-label="clear-button">
            <Clear
                className="icon"
                aria-label="clear-icon"
            />
        </button>
    )
}